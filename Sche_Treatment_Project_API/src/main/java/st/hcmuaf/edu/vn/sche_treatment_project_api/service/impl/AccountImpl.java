package st.hcmuaf.edu.vn.sche_treatment_project_api.service.impl;

import st.hcmuaf.edu.vn.sche_treatment_project_api.mapper.AccountMapper;
import st.hcmuaf.edu.vn.sche_treatment_project_api.mapper.AppointmentMapper;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Account;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.AccountDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.repository.AccountRepository;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.AccountService;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AccountImpl implements AccountService {
    AccountRepository accountRepository;
    private AccountMapper accountMapper;


    public AccountImpl(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    @Override
    public boolean createAccount(Account account) {
        Account acc = accountRepository.save(account);
        return acc!=null ? true:false;
    }

    @Override
    public boolean updateAccount(Account account) {
        Account acc = accountRepository.save(account);
        return acc!=null ? true:false;
    }

    @Override
    public boolean deleteAccount(String idAccount) {
         accountRepository.deleteById(idAccount);
        return getAccount(idAccount)==null ? true:false;
    }

    @Override
    public Account getAccount(String idAccount) {
        return accountRepository.findById(idAccount).get();
    }

    @Override
    public List<Account> getAll() {
        return accountRepository.findAll();
    }


}
