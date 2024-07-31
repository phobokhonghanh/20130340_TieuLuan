package st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
@Data
@NoArgsConstructor
@AllArgsConstructor

public class EvaluateDTO {
    private String id;
    private String evaluateContent;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String doctorId;
    private String appointmentId;
 }
