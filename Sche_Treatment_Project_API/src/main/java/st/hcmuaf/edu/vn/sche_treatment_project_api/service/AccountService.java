package st.hcmuaf.edu.vn.sche_treatment_project_api.service;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Account;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.AccountDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.LoginDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.PatientDTO;

import java.util.List;

@Service
public interface AccountService {
    boolean createAccount(AccountDTO accountDTO);

    boolean updateAccount(AccountDTO accountDTO);

    boolean updateRole(String accountId, String roleId);

    boolean updateStatus(String accountId, String statusId);

    boolean deleteAccount(String idAccount);

    AccountDTO getAccount(String id);

    boolean checkEmailOrPhoneExists(String email, String phone);

    boolean checkEmailAndPhone(String email, String phone);

    String forgotPassword(String email, String phone);

    boolean resetPassword(LoginDTO loginDTO);

    boolean resetOTP(String accountId, boolean reset);

    boolean sendOTPResetPassword(String accountId);

    String checkOTP(String accountId, String otp, boolean reset);

    Account findByAccountEmailAndAccountPhoneAndSupportStatus(String email, String phone, String status);

    Account findByAccountPhone(String phone);
    List<Account> findAllByRoleAndStatus(String role,String status);
    Account findById(String id);

    boolean register(PatientDTO patientDTO);

    String login(LoginDTO loginDTO, Account account);

    String generateToken(Account account);

    Page getAll(String keyword, Integer pageNo);
}
