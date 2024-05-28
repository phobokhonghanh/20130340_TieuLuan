package st.hcmuaf.edu.vn.sche_treatment_project_api.service.impl;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import st.hcmuaf.edu.vn.sche_treatment_project_api.Utils.JwtTokenUtils;
import st.hcmuaf.edu.vn.sche_treatment_project_api.Utils.MessageUtils;
import st.hcmuaf.edu.vn.sche_treatment_project_api.Utils.Utils;
import st.hcmuaf.edu.vn.sche_treatment_project_api.mapper.AccountMapper;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Account;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.AccountDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.LoginDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.PatientDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.SupportDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Doctor;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Patient;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Support;
import st.hcmuaf.edu.vn.sche_treatment_project_api.repository.AccountRepository;
import st.hcmuaf.edu.vn.sche_treatment_project_api.repository.BillRepository;
import st.hcmuaf.edu.vn.sche_treatment_project_api.repository.DoctorRepository;
import st.hcmuaf.edu.vn.sche_treatment_project_api.response.AccountResponse;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.AccountService;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.MailService;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.PatientService;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@RequiredArgsConstructor
@Service
public class AccountImpl implements AccountService {
    @Autowired
    AccountRepository accountRepository;
    @Autowired
    DoctorRepository doctorRepository;
    @PersistenceContext
    private EntityManager entityManager;
    @Autowired
    BillRepository billRepository;
    @Autowired
    private AccountMapper accountMapper;
    @Autowired
    private MailService emailService;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenUtils jwtTokenUtil;
    private final PasswordEncoder passwordEncoder;
    @Autowired
    PatientService patientService;

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
        Optional<Account> optional = accountRepository.findById(accountId);
        if (optional.isPresent()) {
            Account account = optional.get();
            Support support = new Support();
            support.setId(roleId);
            account.setSupportRole(support);
            if (entityManager.contains(account)) {
                entityManager.detach(account);
            }
            if (roleId.equals(SupportDTO.STATUS_ROLE_PATIENT)) {
//                Account patient = new Patient();
//                patient = Utils.copyCommonAttributes(account, patient);
                accountRepository.savePatient(accountId);
            } else {
//                Account doctor = new Doctor();
//                doctor = Utils.copyCommonAttributes(account, doctor);
                accountRepository.saveDoctor(accountId);
            }
            accountRepository.save(account);

            return true;
        }
        return false;
    }

    @Override
    public boolean updateStatus(String accountId, String statusId) {
        Optional<Account> account = accountRepository.findById(accountId);
        if (account.isPresent()) {
            if (account.get().getSupportStatus().equals(SupportDTO.STATUS_VERIFY)) {
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
        for (AccountDTO acc : AccountDTOs) {
            AccountResponse accountResponse = new AccountResponse();
            accountResponse.setAccountDTO(acc);
            accountResponse.setCountSum(billRepository.getCountSumByAccountId(acc.getId()));
            accountResponse.setCountCancel(billRepository.getCountBillStatusByAccountId(acc.getId(), SupportDTO.STATUS_CANCEL));
            accountResponse.setCountPay(billRepository.getCountBillIsPayByAccountId(acc.getId(), true));
            accountResponses.add(accountResponse);
        }
        return new PageImpl<>(accountResponses, pageable, accounts.getTotalElements());
    }

    public boolean checkEmailOrPhone(String email, String phone) {
        return accountRepository.existsByAccountEmailIgnoreCaseOrAccountPhone(email, phone);
    }

    public boolean checkEmailAndPhone(String email, String phone) {
        return accountRepository.existsByAccountEmailIgnoreCaseAndAccountPhone(email, phone);
    }

    public boolean resetPassword(LoginDTO loginDTO) {
        Optional<Account> optional = accountRepository.findById(loginDTO.getPhone());
        if (optional.isPresent()) {
            Account account = optional.get();
            account.setAccountPassword(passwordEncoder.encode(loginDTO.getPassword()));
            accountRepository.save(account);
            return true;
        }
        return false;
    }

    public boolean sendOTPResetPassword(String accountId) {
        Optional<Account> optional = accountRepository.findById(accountId);
        if (optional.isPresent()) {
            Account account = optional.get();
            String otp = renderOTP();
            account.setAccountOTP(otp);
            emailService.sendMail(account.getAccountEmail(), MessageUtils.EMAIL_SUBJECT_RESET_PASSWORD, MessageUtils.EMAIL_CONTENT_RESET_PASSWORD + account.getAccountOTP());
            accountRepository.save(account);
            return true;
        }
        return false;
    }

    public String forgotPassword(String email, String phone) {
        if (checkEmailAndPhone(email, phone)) {
            Account account = findByAccountPhone(phone);
            if (sendOTPResetPassword(account.getId())) {
                return account.getId();
            }
        }
        return null;
    }

    private String generatePassword() {
        Random random = new Random();
        return String.format("%08d", random.nextInt(10000000) + 1000000);
    }

    private String renderOTP() {
        Random random = new Random();
        return String.format("%06d", random.nextInt(999999));
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
    public boolean register(PatientDTO patientDTO) {
        String email = patientDTO.getAccountEmail();
        // set trạng thái sang verify
        patientDTO.setSupportStatusId(SupportDTO.STATUS_VERIFY);
        // tìm tài khoản có email, phone và trạng thái là verify (get tài khoản đã đăng ký nhưng chưa verify tài khoản )
        Account account = findByAccountEmailAndAccountPhoneAndSupportStatus(email, patientDTO.getAccountPhone(), patientDTO.getSupportStatusId());
        // nếu tồn tại thì xóa tài khoản đó đi
        if (account != null) {
            if (account.getSupportRole().getId().equals(SupportDTO.STATUS_ROLE_PATIENT)) {
                patientService.deletePatient(account.getId());
            }
            if (patientDTO.getSupportRoleId().equals(SupportDTO.STATUS_ROLE_ADMIN)) {
                deleteAccount(account.getId());
            }
        }
        // kiểm tra email và phone
        if (!checkEmailOrPhone(patientDTO.getAccountEmail(), patientDTO.getAccountPhone())) {
            // tạo otp và set vào account
            patientDTO.setAccountOTP(renderOTP());
            // mã hóa password
            patientDTO.setAccountPassword(passwordEncoder.encode(patientDTO.getAccountPassword()));
            // send email
            emailService.sendMail(email, MessageUtils.EMAIL_SUBJECT_REGISTER, MessageUtils.EMAIL_CONTENT_REGISTER + patientDTO.getAccountOTP() + ", " + MessageUtils.EMAIL_CONTENT_LINK_OTP + patientDTO.getId());
            // set role là bệnh nhân nếu null
            if (patientDTO.getSupportRoleId() == null)
                patientDTO.setSupportRoleId(SupportDTO.STATUS_ROLE_PATIENT);

            if (patientDTO.getSupportRoleId().equals(SupportDTO.STATUS_ROLE_PATIENT)) {
                if (patientService.createPatient(patientDTO))
                    return true;
            }
            if (patientDTO.getSupportRoleId().equals(SupportDTO.STATUS_ROLE_ADMIN)) {
                if (createAccount(patientDTO))
                    return true;
            }
        }
        return false;
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
