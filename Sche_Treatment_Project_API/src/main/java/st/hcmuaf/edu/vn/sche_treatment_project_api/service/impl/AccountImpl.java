package st.hcmuaf.edu.vn.sche_treatment_project_api.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import st.hcmuaf.edu.vn.sche_treatment_project_api.Component.JwtTokenUtils;
import st.hcmuaf.edu.vn.sche_treatment_project_api.mapper.AccountMapper;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Account;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.AccountDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.LoginDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Support;
import st.hcmuaf.edu.vn.sche_treatment_project_api.repository.AccountRepository;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.AccountService;

import org.springframework.stereotype.Service;

import java.util.List;
@RequiredArgsConstructor
@Service
public class AccountImpl implements AccountService {
    @Autowired
    AccountRepository accountRepository;
    @Autowired
    private AccountMapper accountMapper;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenUtils jwtTokenUtil;
    private final PasswordEncoder passwordEncoder;


    @Override
    public boolean createAccount(AccountDTO accountDTO) {
        Account acc = accountRepository.save(accountMapper.convertAccountDTE(accountDTO));
        return acc != null ? true : false;
    }

    @Override
    public boolean updateAccount(AccountDTO accountDTO) {
        Account acc = accountRepository.save(accountMapper.convertAccountDTE(accountDTO));
        return acc != null ? true : false;
    }

    @Override
    public boolean deleteAccount(String idAccount) {
        accountRepository.deleteById(idAccount);
        return getAccount(idAccount) == null ? true : false;
    }

    @Override
    public Account getAccount(String idAccount) {
        return accountRepository.findById(idAccount).get();
    }

    @Override
    public boolean checkEmailOrPhoneAndRole(String email, String phone, String role) {
        return accountRepository.existsByAccountEmailAndSupportRoleId(email, role) || accountRepository.existsByAccountPhoneAndSupportRoleId(phone, role);
    }

    @Override
    public boolean checkOTP(String accountId, String otp) {
        if(accountRepository.getOTPById(accountId)==null)
            return false;
        if (accountRepository.getOTPById(accountId).equalsIgnoreCase(otp)) {
            Account account = accountRepository.findById(accountId).get();
            account.setAccountOTP(null);
            Support support = new Support();
            support.setId("S1");
            account.setSupportStatus(support);
            accountRepository.save(account);
            return true;
        }
        return false;
    }

    @Override
    public Account findByAccountEmailAndAccountPhoneAndSupportStatusAndSupportRole(String email, String phone, String status, String role) {
        return accountRepository.findByAccountEmailAndAccountPhoneAndSupportStatusIdAndSupportRoleId(email, phone, status, role);
    }

    @Override
    public Account findByAccountPhoneAndSupportRole(String phone, String role) {
        return accountRepository.findByAccountPhoneAndSupportRoleId(phone, role);
    }

    @Override
    public String login(LoginDTO loginDTO, Account account) {
        if(account == null) {
           return null;
        }
        if(account.getSupportStatus().getSupportValue().equalsIgnoreCase("S2")){
            return "LOCK";
        }
        if(!passwordEncoder.matches(loginDTO.getPassword(), account.getAccountPassword())){
            return "PASSWORD";
        }
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                loginDTO.getPhone(), loginDTO.getPassword(),
                account.getAuthorities()
        );
        authenticationManager.authenticate(authenticationToken);
        return jwtTokenUtil.generateToken(account);
    }

    @Override
    public List<Account> getAll() {
        return accountRepository.findAll();
    }


}
