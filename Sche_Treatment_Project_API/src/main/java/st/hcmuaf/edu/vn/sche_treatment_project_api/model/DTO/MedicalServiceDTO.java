package st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class MedicalServiceDTO {
    private String id;
    private String serviceName;
    private String servicePrice;
    private String serviceDescription;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private SupportDTO supportStatusId;
    private ClinicDTO clinicId;
 }
