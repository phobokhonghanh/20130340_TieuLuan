package st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
@Data
@NoArgsConstructor
@AllArgsConstructor

public class LogDTO {
    private String id;
    private String logContent;
    private LocalDateTime createAt;
    private LocalDateTime updateAt;
    private String accountId;
    private String supportLevelId;
 }
