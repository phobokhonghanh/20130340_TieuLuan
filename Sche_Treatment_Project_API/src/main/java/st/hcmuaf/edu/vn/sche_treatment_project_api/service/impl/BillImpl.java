package st.hcmuaf.edu.vn.sche_treatment_project_api.service.impl;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import lombok.AllArgsConstructor;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import st.hcmuaf.edu.vn.sche_treatment_project_api.mapper.BillMapper;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Bill;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.AppointmentDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.BillDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.MedicalPackage;
import st.hcmuaf.edu.vn.sche_treatment_project_api.repository.BillRepository;
import st.hcmuaf.edu.vn.sche_treatment_project_api.repository.MedicalPackageRepository;
import st.hcmuaf.edu.vn.sche_treatment_project_api.response.StatisticalResponse;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.BillService;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Service
@AllArgsConstructor
public class BillImpl implements BillService {
    private BillRepository billRepository;
    private MedicalPackageRepository medicalPackageRepository;
    private BillMapper billMapper;
    @PersistenceContext
    private EntityManager entityManager;

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
}
