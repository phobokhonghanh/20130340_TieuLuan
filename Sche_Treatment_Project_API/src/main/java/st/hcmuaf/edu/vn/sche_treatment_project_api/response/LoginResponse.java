package st.hcmuaf.edu.vn.sche_treatment_project_api.response;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponse {
    private String message;
    private String token;
    private String refreshToken;
    private String tokenType = "Bearer";
    private String id;
    private String username;
    private List<String> roles;
}
