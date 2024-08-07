package st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Support;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MedicalPackageDTO {
    private String id;
    private String packageName;
    private String packagePrice;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private boolean def;
    private SupportDTO supportStatusId;
    private ClinicDTO clinicId;
    private List<MedicalPackageServiceDTO> packageServices;

 }
