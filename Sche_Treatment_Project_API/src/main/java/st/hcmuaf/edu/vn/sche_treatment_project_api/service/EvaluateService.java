package st.hcmuaf.edu.vn.sche_treatment_project_api.service;

import org.springframework.data.domain.Page;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.EvaluateDTO;

public interface EvaluateService {
    EvaluateDTO getEvaluateByAppointment(String appointmentId);

    Page<EvaluateDTO> getAllByDoctorId(String doctorId, Integer pageNo);

    EvaluateDTO create(EvaluateDTO evaluateDTO);

}
