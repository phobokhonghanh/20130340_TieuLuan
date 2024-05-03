package st.hcmuaf.edu.vn.sche_treatment_project_api.service;

import org.springframework.data.domain.Page;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Appointment;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.AppointmentDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.CalendarDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.MedicalPackageDTO;

import java.util.List;

public interface AppointmentService {
    boolean createAppointment(AppointmentDTO appointmentDTO);
    List<Appointment> getListAppointmentCalendarId(String calendarId);
    Page<AppointmentDTO> getListAppointmentUser(String accountId,Integer pageNo);
    Page<AppointmentDTO> getListAppointmentDoctor(String accountId,String keyword,Integer pageNo);
    Page<AppointmentDTO> getAll(String keyword,Integer pageNo);

}
