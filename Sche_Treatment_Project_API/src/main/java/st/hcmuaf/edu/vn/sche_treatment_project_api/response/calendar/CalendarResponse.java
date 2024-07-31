package st.hcmuaf.edu.vn.sche_treatment_project_api.response.calendar;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.GroupTimeDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.response.doctor.DoctorResponse;

import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class CalendarResponse {
    private String id;
    private LocalDate calendarDate;
    private DoctorResponse doctor;
    private GroupTimeDTO groupTime;
}
