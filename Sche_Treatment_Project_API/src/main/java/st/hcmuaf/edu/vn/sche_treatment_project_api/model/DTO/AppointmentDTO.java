package st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentDTO {
    private String id;
    private String appointmentFullname;
    private String appointmentPhone;
    private String appointmentGender;
    private String appointmentBhyt;
    private String appointmentSymptom;
    private LocalDateTime createAt;
    private LocalDateTime updateAt;
    private String supportStatusId;
    private String accountId;
    private String packageId;
    private String calendarId;
    private String supportTimeId;
}
