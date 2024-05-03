package st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
@Data
@NoArgsConstructor
@AllArgsConstructor

public class SupportDTO {
    private String id;
    private String supportValue;
    private String supportInfo;
    private String idGroupTime;
    private LocalDateTime createAt;
    private LocalDateTime updateAt;
}
