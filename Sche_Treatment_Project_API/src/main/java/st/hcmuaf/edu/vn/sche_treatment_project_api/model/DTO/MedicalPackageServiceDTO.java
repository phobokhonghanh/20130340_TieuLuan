package st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.MedicalService;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class MedicalPackageServiceDTO {
    private String id;
    private MedicalServiceDTO medicalService;
    private String packageId;
    private String supportStatusId;
 }
