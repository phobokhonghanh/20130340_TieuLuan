package st.hcmuaf.edu.vn.sche_treatment_project_api.service;

import org.springframework.data.domain.Page;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.AppointmentResult;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.AppointmentResultDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.MedicalServiceDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.MedicalService;

import java.util.List;

public interface AppointmentResultService {
    AppointmentResultDTO getAppointmentResultByAppointment(String appointmentId);
    AppointmentResultDTO create(AppointmentResultDTO appointmentResultDTO );


}
