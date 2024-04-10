package st.hcmuaf.edu.vn.sche_treatment_project_api.service;

import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Account;

import java.util.List;

public interface AccountService {
    public boolean createAccount(Account account);
    public boolean updateAccount(Account account);
    public boolean deleteAccount(String idAccount);
    public Account getAccount(String idAccount);
    public List<Account> getAll();
}
