package st.hcmuaf.edu.vn.sche_treatment_project_api.service.impl;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import lombok.AllArgsConstructor;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import st.hcmuaf.edu.vn.sche_treatment_project_api.Utils.MessageUtils;
import st.hcmuaf.edu.vn.sche_treatment_project_api.config.payment.paypal.PayPalHttpClient;
import st.hcmuaf.edu.vn.sche_treatment_project_api.mapper.BillMapper;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Bill;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.AppointmentDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.BillDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.MedicalPackage;
import st.hcmuaf.edu.vn.sche_treatment_project_api.repository.BillRepository;
import st.hcmuaf.edu.vn.sche_treatment_project_api.repository.MedicalPackageRepository;
import st.hcmuaf.edu.vn.sche_treatment_project_api.response.StatisticalResponse;
import st.hcmuaf.edu.vn.sche_treatment_project_api.response.payment.OrderIntent;
import st.hcmuaf.edu.vn.sche_treatment_project_api.response.payment.PaymentLandingPage;
import st.hcmuaf.edu.vn.sche_treatment_project_api.response.payment.PaypalRequest;
import st.hcmuaf.edu.vn.sche_treatment_project_api.response.payment.PaypalResponse;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.BillService;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
@AllArgsConstructor
public class BillImpl implements BillService {
    private BillRepository billRepository;
    private MedicalPackageRepository medicalPackageRepository;
    private BillMapper billMapper;
    @PersistenceContext
    private EntityManager entityManager;
    private final PayPalHttpClient payPalHttpClient;

    private static final int USD_VND_RATE = 23_000;

    @Override
    public Bill createBill(AppointmentDTO appointmentDTO) {
        try {
            MedicalPackage medicalPackage = medicalPackageRepository.findById(appointmentDTO.getPackageId()).get();
            BillDTO billDTO = new BillDTO();
            billDTO.setPackagePrice(medicalPackage.getPackagePrice());
            billDTO.setBillSum(billDTO.getPackagePrice());
            billDTO.setBillIspay(false);
            billDTO.setCreatedAt(LocalDateTime.now());
            billDTO.setAppointmentId(appointmentDTO.getId());
            Bill bill = billMapper.convertBillDTE(billDTO);
            bill = billRepository.save(bill);
            return bill;
        } catch (DataAccessException ex) {
            System.out.println(ex);
            return null;
        }
    }

    @Override
    public Page<BillDTO> getBill(Integer pageNo) {
        return null;
    }

    @Override
    public Bill getBillByAppointmentId(String appointmentId) {
        Bill bill = billRepository.getBillByAppointmentId(appointmentId);
        bill.getAppointment().getMedicalPackage().getClinic().setCalendars(null);
        return bill;
    }

    @Override
    public List<Double> sumBillMonths(boolean is_pay) {
        Query query = entityManager.createNativeQuery("SELECT EXTRACT(MONTH FROM create_at) AS month, SUM(bill_sum) AS sum FROM bill WHERE bill_ispay = :is_pay GROUP BY month ORDER BY month", StatisticalResponse.class);
        query.setParameter("is_pay", is_pay);
        List<StatisticalResponse> list = query.getResultList();
        List<Double> listResult = new ArrayList<>();
        for (int i = 1; i < 13; i++) {
            listResult.add(0.0);
        }
        for (StatisticalResponse s : list) {
            listResult.set(s.getMonth() - 1, s.getSum());
        }
        return listResult;
    }

    @Override
    public Double sumBillWeek() {
        return billRepository.sumBillWeek();
    }

    @Override
    public String billPayByPaypal(String id) {
        try {
            Optional<Bill> optional = billRepository.findById(id);
            if (!optional.isPresent()) {
                return null;
            }
            Bill bill = optional.get();
            // (3.2.1) Tính tổng tiền theo USD

            BigDecimal billSum = BigDecimal.valueOf(Double.parseDouble(bill.getBillSum()));
            BigDecimal totalPayUSD = billSum.divide(BigDecimal.valueOf(USD_VND_RATE), 0, BigDecimal.ROUND_HALF_UP);

            // (3.2.2) Tạo một yêu cầu giao dịch PayPal
            PaypalRequest paypalRequest = new PaypalRequest();

            paypalRequest.setIntent(OrderIntent.CAPTURE);
            paypalRequest.setPurchaseUnits(List.of(
                    new PaypalRequest.PurchaseUnit(
                            new PaypalRequest.PurchaseUnit.Money("USD", totalPayUSD.toString())
                    )
            ));

            paypalRequest.setApplicationContext(new PaypalRequest.PayPalAppContext()
                    .setBrandName("Benh vien da khoa Thu Duc")
                    .setLandingPage(PaymentLandingPage.BILLING)
                    .setReturnUrl(MessageUtils.BACKEND_HOST + "/api/payment/paypal/success")
                    .setCancelUrl(MessageUtils.BACKEND_HOST + "/api/payment/paypal/cancel"));

            PaypalResponse paypalResponse = payPalHttpClient.createPaypalTransaction(paypalRequest);
            bill.setPaymentId(paypalResponse.getId());
            billRepository.save(bill);
            // (3.2.4) Trả về đường dẫn checkout cho user
            for (PaypalResponse.Link link : paypalResponse.getLinks()) {
                if ("approve".equals(link.getRel())) {
                    return link.getHref();
                }
            }
        } catch (Exception e) {
            throw new RuntimeException("Cannot create PayPal transaction request!" + e.getMessage());
        }
        return null;
    }

    @Override
    public boolean captureTransactionPaypal(String paypalOrderId, String payerId) {
        Bill bill = billRepository.findByPaymentId(paypalOrderId);
        if (bill != null) {
            try {
                // (1) Capture
                payPalHttpClient.capturePaypalTransaction(paypalOrderId, payerId);
                bill.setPaid(true); // (2) Đã thanh toán
            } catch (Exception e) {
                System.out.println(e.getMessage());
                return false;
            }
            billRepository.save(bill);
            return true;
        }
        return false;
    }
}
