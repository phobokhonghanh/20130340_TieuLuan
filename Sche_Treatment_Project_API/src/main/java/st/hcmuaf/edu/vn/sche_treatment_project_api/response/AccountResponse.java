package st.hcmuaf.edu.vn.sche_treatment_project_api.response;

import lombok.*;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.AccountDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.SupportDTO;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class AccountResponse {
    private AccountDTO accountDTO;
    private int countSum;
    private int countCancel;
    private int countPay;
}
