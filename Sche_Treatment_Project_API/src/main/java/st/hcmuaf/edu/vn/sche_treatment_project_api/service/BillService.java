package st.hcmuaf.edu.vn.sche_treatment_project_api.service;

import org.springframework.data.domain.Page;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Bill;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.AppointmentDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.BillDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.response.StatisticalResponse;

import java.util.List;

public interface BillService {
    Bill createBill(AppointmentDTO appointmentDTO);
    Page<BillDTO> getBill(Integer pageNo);

    Bill getBillByAppointmentId(String appointmentId);

    List<Double> sumBillMonths(boolean is_pay);
    Double sumBillWeek();
}
