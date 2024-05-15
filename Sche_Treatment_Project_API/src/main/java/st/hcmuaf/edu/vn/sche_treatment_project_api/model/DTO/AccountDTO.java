package st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AccountDTO {
    private String id;
    private String accountPhone;
    private String accountEmail;
    private String accountPassword;
    private String accountName;
    private String accountOTP;
    private Byte accountGender;
    private LocalDateTime createAt;
    private LocalDateTime updateAt;
    private String supportRoleId;
    private String supportStatusId;

}
