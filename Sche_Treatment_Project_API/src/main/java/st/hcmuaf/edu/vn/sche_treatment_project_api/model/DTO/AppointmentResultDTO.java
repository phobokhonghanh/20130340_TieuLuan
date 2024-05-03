package st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentResultDTO {
    private String id;
    private String resultSymptom;
    private String resultDiagnostic;
    private String resultNote;
    private LocalDateTime createAt;
    private LocalDateTime updateAt;
    private String appointmentId;
}
