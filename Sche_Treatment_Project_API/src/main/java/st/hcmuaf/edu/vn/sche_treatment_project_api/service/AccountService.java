package st.hcmuaf.edu.vn.sche_treatment_project_api.service;

import org.springframework.stereotype.Service;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Account;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.AccountDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.LoginDTO;

import java.util.List;
@Service
public interface AccountService {
    boolean createAccount(AccountDTO accountDTO);
    boolean updateAccount(AccountDTO accountDTO);
    boolean deleteAccount(String idAccount);
    Account getAccount(String idAccount);
    boolean checkEmailOrPhoneAndRole(String email, String phone,String role);
    boolean checkOTP(String accountId, String otp);
    Account findByAccountEmailAndAccountPhoneAndSupportStatusAndSupportRole(String email, String phone, String status,String role);
    Account findByAccountPhoneAndSupportRole(String phone,String role);

    String login(LoginDTO loginDTO, Account account);
    List<Account> getAll();
}
