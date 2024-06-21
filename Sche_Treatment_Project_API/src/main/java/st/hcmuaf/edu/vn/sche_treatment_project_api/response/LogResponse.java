package st.hcmuaf.edu.vn.sche_treatment_project_api.response;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LogResponse {
    private String logContent;
    private String level;
    private String accountName;
    private String role;
    private LocalDateTime createdAt;
}
