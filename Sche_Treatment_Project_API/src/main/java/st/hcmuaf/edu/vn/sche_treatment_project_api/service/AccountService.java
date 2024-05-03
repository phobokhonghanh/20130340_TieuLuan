package st.hcmuaf.edu.vn.sche_treatment_project_api.service;

import org.springframework.stereotype.Service;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Account;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.AccountDTO;

import java.util.List;
@Service
public interface AccountService {
    public boolean createAccount(Account account);
    public boolean updateAccount(Account account);
    public boolean deleteAccount(String idAccount);
    public Account getAccount(String idAccount);
    public List<Account> getAll();
}
