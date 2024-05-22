package st.hcmuaf.edu.vn.sche_treatment_project_api.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import st.hcmuaf.edu.vn.sche_treatment_project_api.Utils.JwtTokenUtils;
import st.hcmuaf.edu.vn.sche_treatment_project_api.mapper.AccountMapper;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Account;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.AccountDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.LoginDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.SupportDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Patient;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Support;
import st.hcmuaf.edu.vn.sche_treatment_project_api.repository.AccountRepository;
import st.hcmuaf.edu.vn.sche_treatment_project_api.repository.BillRepository;
import st.hcmuaf.edu.vn.sche_treatment_project_api.response.AccountResponse;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.AccountService;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class AccountImpl implements AccountService {
    @Autowired
    AccountRepository accountRepository;
    @Autowired
    BillRepository billRepository;
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
        Optional<Account> accountOptional = accountRepository.findById(accountDTO.getId());
        if (accountOptional.isPresent()) {
            Account account = accountOptional.get();
            account.setAccountName(accountDTO.getAccountName());
            account.setAccountEmail(accountDTO.getAccountEmail());
            account.setAccountPhone(accountDTO.getAccountPhone());
            account.setAccountGender(accountDTO.getAccountGender());
            accountRepository.save(account);
            return true;
        }
        Account acc = accountRepository.save(accountMapper.convertAccountDTE(accountDTO));
        return acc != null ? true : false;
    }

    @Override
    public boolean checkOTP(String accountId, String otp) {
        if (accountRepository.getOTPById(accountId) == null)
            return false;
        if (accountRepository.getOTPById(accountId).equalsIgnoreCase(otp)) {
            Account account = accountRepository.findById(accountId).get();
            account.setAccountOTP(null);
            Support support = new Support();
            support.setId(SupportDTO.STATUS_UNLOCK);
            account.setSupportStatus(support);
            accountRepository.save(account);
            return true;
        }
        return false;
    }

    @Override
    public boolean updateRole(String accountId, String roleId) {
        Optional<Account> account = accountRepository.findById(accountId);
        if (account.isPresent()) {
            Support support = new Support();
            support.setId(roleId);
            account.get().setSupportRole(support);
            accountRepository.save(account.get());
            return true;
        }
        return false;
    }

    @Override
    public boolean updateStatus(String accountId, String statusId) {
        Optional<Account> account = accountRepository.findById(accountId);
        if (account.isPresent()) {
            if(account.get().getSupportStatus().equals(SupportDTO.STATUS_VERIFY)){
                account.get().setAccountOTP(null);
            }
            Support support = new Support();
            support.setId(statusId);
            account.get().setSupportStatus(support);
            accountRepository.save(account.get());
            return true;
        }
        return false;
    }

    @Override
    public boolean deleteAccount(String idAccount) {
        accountRepository.deleteById(idAccount);
        return getAccount(idAccount) == null ? true : false;
    }

    @Override
    public AccountDTO getAccount(String id) {
        Optional<Account> account = accountRepository.findById(id);
        if (account.isPresent()) {
            return accountMapper.convertAccountETD(account.get());
        }
        return null;
    }

    @Override
    public Page getAll(String keyword, Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo - 1, 10);
        Page<Account> accounts = accountRepository.findAllByAccountPhoneIsContaining(keyword, pageable);
        List<AccountDTO> AccountDTOs = accountMapper.convertListAccountETD(accounts.getContent());
        List<AccountResponse> accountResponses = new ArrayList<>();
        for(AccountDTO acc : AccountDTOs){
            AccountResponse accountResponse = new AccountResponse();
            accountResponse.setAccountDTO(acc);
            accountResponse.setCountSum(billRepository.getCountSumByAccountId(acc.getId()));
            accountResponse.setCountCancel(billRepository.getCountBillStatusByAccountId(acc.getId(),SupportDTO.STATUS_CANCEL));
            accountResponse.setCountPay(billRepository.getCountBillIsPayByAccountId(acc.getId(),true));
            accountResponses.add(accountResponse);
        }
        return new PageImpl<>(accountResponses, pageable, accounts.getTotalElements());
    }

    public boolean checkEmailOrPhone(String email, String phone) {
        return accountRepository.existsByAccountEmailIgnoreCaseOrAccountPhone(email, phone);
    }

    @Override
    public Account findByAccountEmailAndAccountPhoneAndSupportStatus(String email, String phone, String status) {
        return accountRepository.findByAccountEmailAndAccountPhoneAndSupportStatusId(email, phone, status);
    }

    @Override
    public Account findByAccountPhone(String phone) {
        return accountRepository.findByAccountPhoneIgnoreCase(phone);
    }

    @Override
    public String login(LoginDTO loginDTO, Account account) {
        if (account == null) {
            return null;
        }
        if (account.getSupportStatus().getId().equalsIgnoreCase(SupportDTO.STATUS_VERIFY)) {
            return "VERIFY";
        }
        if (account.getSupportStatus().getId().equalsIgnoreCase(SupportDTO.STATUS_LOCK)) {
            return "LOCK";
        }
        if (!passwordEncoder.matches(loginDTO.getPassword(), account.getAccountPassword())) {
            return "PASSWORD";
        }
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                loginDTO.getPhone(), loginDTO.getPassword(),
                account.getAuthorities()
        );
        authenticationManager.authenticate(authenticationToken);
        return jwtTokenUtil.generateToken(account);
    }


}
