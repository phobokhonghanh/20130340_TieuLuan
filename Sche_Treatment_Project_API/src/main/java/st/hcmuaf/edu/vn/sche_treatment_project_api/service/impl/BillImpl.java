package st.hcmuaf.edu.vn.sche_treatment_project_api.service.impl;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import st.hcmuaf.edu.vn.sche_treatment_project_api.Utils.MessageUtils;
import st.hcmuaf.edu.vn.sche_treatment_project_api.config.payment.paypal.PayPalHttpClient;
import st.hcmuaf.edu.vn.sche_treatment_project_api.mapper.BillMapper;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Bill;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.AppointmentDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.BillDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.SupportDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.MedicalPackage;
import st.hcmuaf.edu.vn.sche_treatment_project_api.repository.BillRepository;
import st.hcmuaf.edu.vn.sche_treatment_project_api.repository.MedicalPackageRepository;
import st.hcmuaf.edu.vn.sche_treatment_project_api.response.StatisticalResponse;
import st.hcmuaf.edu.vn.sche_treatment_project_api.response.payment.OrderIntent;
import st.hcmuaf.edu.vn.sche_treatment_project_api.response.payment.PaymentLandingPage;
import st.hcmuaf.edu.vn.sche_treatment_project_api.response.payment.PaypalRequest;
import st.hcmuaf.edu.vn.sche_treatment_project_api.response.payment.PaypalResponse;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.BillService;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.LogService;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.Specification.BillSpecs;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
@Slf4j
public class BillImpl implements BillService {
    private BillRepository billRepository;
    private LogService logService;
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
            billDTO.setPaid(false);
            billDTO.setCreatedAt(LocalDateTime.now());
            billDTO.setAppointmentId(appointmentDTO.getId());
            Bill bill = billMapper.convertBillDTE(billDTO);
            bill = billRepository.save(bill);
            return bill;
        } catch (DataAccessException ex) {
            log.warn("Cannot create bill " + ex.getMessage());
            return null;
        }
    }

    @Override
    public Page<BillDTO> getAll(Integer pageNo, String keyword) {
        Pageable pageable = PageRequest.of(pageNo - 1, 10);
        Specification<Bill> spec = Specification
                .where(BillSpecs.idLike(keyword));
        Page pageBill = billRepository.findAll(spec, pageable);
        List<BillDTO> billDTOList = billMapper.convertListBillETD(pageBill.getContent());
        return new PageImpl<>(billDTOList, pageable, pageBill.getTotalElements());
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
            // Tính tổng tiền theo USD

            BigDecimal billSum = BigDecimal.valueOf(Double.parseDouble(bill.getBillSum()));
            BigDecimal totalPayUSD = billSum.divide(BigDecimal.valueOf(USD_VND_RATE), 0, BigDecimal.ROUND_HALF_UP);

            // Tạo một yêu cầu giao dịch PayPal
            PaypalRequest paypalRequest = new PaypalRequest();

            paypalRequest.setIntent(OrderIntent.CAPTURE);
            paypalRequest.setPurchaseUnits(List.of(
                    new PaypalRequest.PurchaseUnit(
                            new PaypalRequest.PurchaseUnit.Money("USD", totalPayUSD.toString())
                    )
            ));

            paypalRequest.setApplicationContext(new PaypalRequest.PayPalAppContext()
                    .setBrandName("Essay Medical")
                    .setLandingPage(PaymentLandingPage.BILLING)
                    .setReturnUrl(MessageUtils.BACKEND_API + "/payment/paypal/success")
                    .setCancelUrl(MessageUtils.BACKEND_API + "/payment/paypal/cancel"));
            // tạo giao dịch
            PaypalResponse paypalResponse = payPalHttpClient.createPaypalTransaction(paypalRequest);
            bill.setPaymentId(paypalResponse.getId());
            billRepository.save(bill);
            // Trả về đường dẫn checkout cho user
            for (PaypalResponse.Link link : paypalResponse.getLinks()) {
                if ("approve".equals(link.getRel())) {
                    return link.getHref();
                }
            }
        } catch (Exception e) {
            log.warn("Cannot create PayPal transaction request!");
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
                log.warn("Cannot create PayPal capture transaction request!" + e.getMessage());
                return false;
            }
            billRepository.save(bill);
            return true;
        }
        return false;
    }

    @Override
    public void updateBillByPaid(String id, boolean is_pay) {
        billRepository.updateIsPaid(id, is_pay);
        createBillLog(id);
    }

    public void createBillLog(String id) {
        Optional<Bill> bill = billRepository.findById(id);
        if (bill.isPresent()) {
            String content = "Thanh toán - Lịch hẹn có mã: " + bill.get().getAppointment().getId() + " đã được thanh toán";
            logService.info(content);
        }
    }
}
