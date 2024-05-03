package st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MedicalAreaDTO {
    private String id;
    private String areaName;
    private LocalDateTime createAt;
    private LocalDateTime updateAt;
    private String supportStatusId;
 }
