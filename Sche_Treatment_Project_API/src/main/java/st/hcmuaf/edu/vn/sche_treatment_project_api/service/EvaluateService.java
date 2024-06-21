package st.hcmuaf.edu.vn.sche_treatment_project_api.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Account;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.EvaluateDTO;

public interface EvaluateService {
    EvaluateDTO getEvaluateByAppointment(String appointmentId);

    Page<EvaluateDTO> getAllByDoctorId(String doctorId, Integer pageNo);
    Page<EvaluateDTO> getAll(String keyword, Integer pageNo);
    EvaluateDTO create(EvaluateDTO evaluateDTO);

    void deleteById(String id);
}
