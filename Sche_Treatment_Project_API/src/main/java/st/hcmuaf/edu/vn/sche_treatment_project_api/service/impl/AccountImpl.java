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
import st.hcmuaf.edu.vn.sche_treatment_project_api.repository.SupportRepository;
import st.hcmuaf.edu.vn.sche_treatment_project_api.response.AccountResponse;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.AccountService;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.LogService;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.MailService;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.PatientService;

import java.text.MessageFormat;
import java.util.*;

@RequiredArgsConstructor
@Service
public class AccountImpl implements AccountService {
    @Autowired
    AccountRepository accountRepository;
    @Autowired
    SupportRepository supportRepository;
    @Autowired
    DoctorRepository doctorRepository;
    @Autowired
    private LogService logService;
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
            account.setAccountGender(accountDTO.getAccountGender());
            accountRepository.save(account);
            return true;
        }
        Account acc = accountRepository.save(accountMapper.convertAccountDTE(accountDTO));
        return acc != null ? true : false;
    }

    @Override
    public String checkOTP(String accountId, String otp, boolean reset) {
        Optional<Account> optional = accountRepository.findById(accountId);
        String rs = "register";
        if (optional.isPresent()) {
            Account account = optional.get();
            if (account.getAccountOTP().equalsIgnoreCase(otp)) {
                account.setAccountOTP(null);
                Support support = new Support();
                support.setId(SupportDTO.STATUS_UNLOCK);
                account.setSupportStatus(support);
                accountRepository.save(account);
                // reset password
                if (reset) {
                    rs = jwtTokenUtil.generateTokenMin(account);
                }
                return rs;
            }
        }
        return null;
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
                accountRepository.savePatient(accountId);
            } else {
                accountRepository.saveDoctor(accountId);
            }
            Account accountSave = accountRepository.save(account);
            String content = "Tài khoản - Tài khoản có ID: " + account.getId() + " đã được thay đổi quyền hạn là: " + accountSave.getSupportRole().getSupportValue();
            // nâng quyền lên bác sĩ thì info còn lên admin hoặc xuống patient thì warn
            if (roleId.equals(SupportDTO.STATUS_ROLE_DOCTOR)) {
                logService.info(content);
            } else {
                logService.warn(content);
            }
            return true;
        }
        logService.error("Thất bại - Tài khoản có ID: " + accountId + " bị thao tác thay đổi quyền hạn");
        return false;
    }

    @Override
    public boolean updateStatus(String accountId, String statusId) {
        Optional<Account> optional = accountRepository.findById(accountId);
        if (optional.isPresent()) {
            Account account = optional.get();

            if (account.getSupportStatus().equals(SupportDTO.STATUS_VERIFY)) {
                account.setAccountOTP(null);
            }
            Support support = new Support();
            support.setId(statusId);
            account.setSupportStatus(support);
            accountRepository.save(account);
            logService.warn("Tài khoản - Tài khoản có ID: " + account.getId() + " đã được thay đổi trạng thái là: " + supportRepository.findById(statusId).get().getSupportValue());
            return true;
        }
        logService.error("Thất bại - Tài khoản có ID: " + accountId + " bị thay đổi trạng thái");
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

    public boolean checkEmailOrPhoneExists(String email, String phone) {
        return accountRepository.existsByAccountEmailIgnoreCaseOrAccountPhone(email, phone);
    }

    public boolean checkEmailAndPhone(String email, String phone) {
        return accountRepository.existsByAccountEmailIgnoreCaseAndAccountPhone(email, phone);
    }

    public boolean resetPassword(LoginDTO loginDTO) {
        if (jwtTokenUtil.validateJwtToken(loginDTO.getPhone()) && !jwtTokenUtil.isTokenExpired(loginDTO.getPhone())) {
            String id = jwtTokenUtil.extractSubject(loginDTO.getPhone());
            Optional<Account> optional = accountRepository.findById(id);
            if (optional.isPresent()) {
                Account account = optional.get();
                account.setAccountPassword(passwordEncoder.encode(loginDTO.getPassword()));
                accountRepository.save(account);
                return true;
            }
        }
        return false;
    }

    @Override
    public boolean resetOTP(String accountId, boolean reset) {
        Optional<Account> optional = accountRepository.findById(accountId);
        if (optional.isPresent()) {
            Account account = optional.get();
            String otp = renderOTP();
            account.setAccountOTP(otp);
            String subject = MessageUtils.EMAIL_SUBJECT_REGISTER;
            String link = MessageUtils.EMAIL_LINK_OTP + account.getId();
            // reset password
            if (reset) {
                subject = MessageUtils.EMAIL_SUBJECT_RESET_PASSWORD;
                link += "?reset-password=true";
            }
            Map<String, Object> attributes = Map.of(
                    "token", account.getAccountOTP(),
                    "link", link
            );
            accountRepository.save(account);
            emailService.sendVerificationToken(account.getAccountEmail(), subject, attributes);
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
            Map<String, Object> attributes = Map.of(
                    "token", account.getAccountOTP(),
                    "link", MessageUtils.EMAIL_LINK_OTP + account.getId() + "?reset-password=true");
            accountRepository.save(account);
            emailService.sendVerificationToken(account.getAccountEmail(), MessageUtils.EMAIL_SUBJECT_RESET_PASSWORD, attributes);
            return true;
        }
        return false;
    }

    public String forgotPassword(String email, String phone) {
        if (checkEmailAndPhone(email, phone)) {
            Account account = findByAccountPhone(phone);
            if (account.getSupportStatus().getId().equalsIgnoreCase(SupportDTO.STATUS_LOCK)) {
                return null;
            }
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
    public List<Account> findAllByRoleAndStatus(String role, String status) {
        return accountRepository.getAllBySupportRoleIdAndSupportStatusId(role, status);
    }

    @Override
    public Account findById(String id) {
        Optional optional = accountRepository.findById(id);
        if (optional.isPresent()) {
            return (Account) optional.get();
        }
        return null;
    }

    public void deleteAccountNotVerifyExists(String email, String phone, String status) {
        // tìm tài khoản có email, phone và trạng thái là verify (get tài khoản đã đăng ký nhưng chưa verify tài khoản )
        Account account = findByAccountEmailAndAccountPhoneAndSupportStatus(email, phone, status);
        // nếu tồn tại thì xóa tài khoản đó đi
        if (account != null) {
            if (account.getSupportRole().getId().equals(SupportDTO.STATUS_ROLE_PATIENT)) {
                patientService.deletePatient(account.getId());
            }
            if (account.getSupportRole().getId().equals(SupportDTO.STATUS_ROLE_ADMIN)) {
                deleteAccount(account.getId());
            }
        }
    }

    @Override
    public boolean register(PatientDTO patientDTO) {

        String email = patientDTO.getAccountEmail();

        // xóa tài khoản đã tồn tại (trùng email và phone nhưng chưa verify)
        deleteAccountNotVerifyExists(email, patientDTO.getAccountPhone(), patientDTO.getSupportStatusId());

        // kiểm tra email và phone
        if (!checkEmailOrPhoneExists(patientDTO.getAccountEmail(), patientDTO.getAccountPhone())) {
            // tạo otp và set vào account
            patientDTO.setAccountOTP(renderOTP());
            // set trạng thái sang verify
            patientDTO.setSupportStatusId(SupportDTO.STATUS_VERIFY);
            // mã hóa password
            patientDTO.setAccountPassword(passwordEncoder.encode(patientDTO.getAccountPassword()));
            // set role là bệnh nhân nếu null
            if (patientDTO.getSupportRoleId() == null)
                patientDTO.setSupportRoleId(SupportDTO.STATUS_ROLE_PATIENT);
            // tạo tài khoản bệnh nhân
            if (patientDTO.getSupportRoleId().equals(SupportDTO.STATUS_ROLE_PATIENT)) {
                if (!patientService.createPatient(patientDTO))
                    return false;
            }
            // tạo tài khoản admin
            if (patientDTO.getSupportRoleId().equals(SupportDTO.STATUS_ROLE_ADMIN)) {
                if (!createAccount(patientDTO))
                    return false;
            }
            // send email
            Map<String, Object> attributes = Map.of(
                    "token", patientDTO.getAccountOTP(),
                    "link", MessageUtils.EMAIL_LINK_OTP + patientDTO.getId());
            emailService.sendVerificationToken(email, MessageUtils.EMAIL_SUBJECT_REGISTER, attributes);

            return true;
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
        if (!passwordEncoder.matches(loginDTO.getPassword(), account.getAccountPassword())) {
            return "PASSWORD";
        }
        if (account.getSupportStatus().getId().equalsIgnoreCase(SupportDTO.STATUS_LOCK)) {
            return "LOCK";
        }
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                loginDTO.getPhone(), loginDTO.getPassword(),
                account.getAuthorities()
        );
        authenticationManager.authenticate(authenticationToken);
        return jwtTokenUtil.generateToken(account);
    }

    public String generateToken(Account account) {
        return jwtTokenUtil.generateToken(account);
    }


}
