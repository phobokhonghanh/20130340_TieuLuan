package st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClinicDTO {
    private String id;
    private String clinicName;
    private LocalDateTime createAt;
    private LocalDateTime updateAt;
    private MedicalAreaDTO medicalAreaId;
    private String supportStatusId;

    public ClinicDTO(String id) {
        this.id = id;
    }
}
