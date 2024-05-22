package st.hcmuaf.edu.vn.sche_treatment_project_api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import st.hcmuaf.edu.vn.sche_treatment_project_api.Utils.MessageUtils;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Account;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.AccountDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.LoginDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.PatientDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.SupportDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.response.LoginResponse;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.AccountService;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.DoctorService;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.MailService;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.PatientService;

import java.util.Random;

@RestController
@RequestMapping("${api.v1}")
public class AccountController {
    @Autowired
    AccountService accountService;
    @Autowired
    PatientService patientService;
    @Autowired
    DoctorService doctorService;
    @Autowired
    private MailService emailService;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
    @GetMapping("/admin/account/all")
    public ResponseEntity<Page> getAllAccount(@RequestParam(name = "keyword", defaultValue = "") String keyword, @RequestParam(name = "page", defaultValue = "1") Integer pageNo) {
        Page accountDTOs = accountService.getAll(keyword, pageNo);
        return ResponseEntity.ok(accountDTOs);
    }
    @GetMapping("/account/{accountId}")
    public ResponseEntity<AccountDTO> getAccountById(@PathVariable("accountId") String accountId) {
        AccountDTO account = accountService.getAccount(accountId);
        if (account != null)
            return new ResponseEntity(account, HttpStatus.OK);
        return new ResponseEntity(MessageUtils.MESSAGE_ACCOUNT_NOT_EXISTS, HttpStatus.BAD_REQUEST);
    }
    @GetMapping("/patient/{accountId}")
    public ResponseEntity<PatientDTO> getPatientById(@PathVariable("accountId") String accountId) {
        AccountDTO account = patientService.getPatient(accountId);
        if (account != null)
            return new ResponseEntity(account, HttpStatus.OK);
        return new ResponseEntity(MessageUtils.MESSAGE_ACCOUNT_NOT_EXISTS, HttpStatus.BAD_REQUEST);
    }
    public String renderOTP() {
        return new Random().nextInt(999999) + "";
    }
    @PatchMapping("/account/confirm-OTP/{accountId}")
    public ResponseEntity confirmOTP(@PathVariable String accountId, @RequestParam(name = "otp", defaultValue = "000000") String otp) {
        if (accountService.checkOTP(accountId, otp)) {
            return new ResponseEntity(HttpStatus.OK);
        }
        return new ResponseEntity(MessageUtils.MESSAGE_ACCOUNT_NOT_EXISTS, HttpStatus.BAD_REQUEST);
    }
    @PatchMapping("/admin/account/update/role-doctor/{accountId}")
    public ResponseEntity updateRoleDoctor(@PathVariable String accountId) {
        if (accountService.updateRole(accountId, SupportDTO.STATUS_ROLE_DOCTOR)) {
            return new ResponseEntity(HttpStatus.OK);
        }
        return new ResponseEntity(MessageUtils.MESSAGE_ACCOUNT_NOT_EXISTS, HttpStatus.BAD_REQUEST);
    }
    @PatchMapping("/admin/account/update/role-patient/{accountId}")
    public ResponseEntity updateRolePatient(@PathVariable String accountId) {
        if (accountService.updateRole(accountId, SupportDTO.STATUS_ROLE_PATIENT)) {
            return new ResponseEntity(HttpStatus.OK);
        }
        return new ResponseEntity(MessageUtils.MESSAGE_ACCOUNT_NOT_EXISTS, HttpStatus.BAD_REQUEST);
    }
    @PatchMapping("/admin/account/lock/{accountId}")
    public ResponseEntity lockAccount(@PathVariable String accountId) {
        if (accountService.updateStatus(accountId, SupportDTO.STATUS_LOCK)) {
            return new ResponseEntity(HttpStatus.OK);
        }
        return new ResponseEntity(MessageUtils.MESSAGE_ACCOUNT_NOT_EXISTS, HttpStatus.BAD_REQUEST);
    }
    @PatchMapping("/admin/account/unlock/{accountId}")
    public ResponseEntity unlockAccount(@PathVariable String accountId) {
        if (accountService.updateStatus(accountId, SupportDTO.STATUS_UNLOCK)) {
            return new ResponseEntity(HttpStatus.OK);
        }
        return new ResponseEntity(MessageUtils.MESSAGE_ACCOUNT_NOT_EXISTS, HttpStatus.BAD_REQUEST);
    }
    @PatchMapping("/patient/update/{accountId}")
    public ResponseEntity updateBHYT(@PathVariable String accountId,@RequestParam(name = "bhyt", defaultValue = "000000") String bhyt) {
        if (patientService.updateBHYT(accountId, bhyt)) {
            return new ResponseEntity(HttpStatus.OK);
        }
        return new ResponseEntity(MessageUtils.MESSAGE_ACCOUNT_NOT_EXISTS, HttpStatus.BAD_REQUEST);
    }
    @PostMapping("/account/register")
    public ResponseEntity create(@RequestBody PatientDTO patientDTO) {
        String email = patientDTO.getAccountEmail();
        // set trạng thái sang verify
        patientDTO.setSupportStatusId(SupportDTO.STATUS_VERIFY);
        // tìm tài khoản có email, phone và trạng thái là verify (get tài khoản đã đăng ký nhưng chưa verify tài khoản )
        Account account = accountService.findByAccountEmailAndAccountPhoneAndSupportStatus(email, patientDTO.getAccountPhone(), patientDTO.getSupportStatusId());
        // nếu tồn tại thì xóa tài khoản đó đi
        if (account != null) {
            if (account.getSupportRole().getId().equals(SupportDTO.STATUS_ROLE_PATIENT)) {
                patientService.deletePatient(account.getId());
            }
            if (patientDTO.getSupportRoleId().equals(SupportDTO.STATUS_ROLE_ADMIN)) {
                accountService.deleteAccount(account.getId());
            }
        }
        // kiểm tra email và phone
        if (!accountService.checkEmailOrPhone(patientDTO.getAccountEmail(), patientDTO.getAccountPhone())) {
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
                    return new ResponseEntity(patientDTO.getId(), HttpStatus.OK);
            }
            if (patientDTO.getSupportRoleId().equals(SupportDTO.STATUS_ROLE_ADMIN)) {
                if (accountService.createAccount(patientDTO))
                    return new ResponseEntity(patientDTO.getId(), HttpStatus.OK);
            }
        }
        return new ResponseEntity(MessageUtils.MESSAGE_EMAIL_OR_PHONE_EXISTS, HttpStatus.BAD_REQUEST);
    }
    @PostMapping("/account/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginDTO loginDTO) {
        try {
            if (loginDTO.getRole() == null) loginDTO.setRole(SupportDTO.STATUS_ROLE_PATIENT);
            Account accountLogin = accountService.findByAccountPhone(loginDTO.getPhone());
            String token = accountService.login(loginDTO, accountLogin);
            if (token == null) {
                return ResponseEntity.badRequest().body(
                        LoginResponse.builder()
                                .message(MessageUtils.MESSAGE_ACCOUNT_NOT_EXISTS)
                                .build()
                );
            }
            if (token.equals("VERIFY")) {
                return ResponseEntity.badRequest().body(
                        LoginResponse.builder()
                                .message(MessageUtils.MESSAGE_ACCOUNT_NOT_VERIFY)
                                .build()
                );
            }
            if (token.equals("LOCK")) {
                return ResponseEntity.badRequest().body(
                        LoginResponse.builder()
                                .message(MessageUtils.MESSAGE_ACCOUNT_LOCKED)
                                .build()
                );
            }
            if (token.equals("PASSWORD")) {
                return ResponseEntity.badRequest().body(
                        LoginResponse.builder()
                                .message(MessageUtils.MESSAGE_WRONG_PASSWORD)
                                .build()
                );
            }
            // Trả về token trong response
            return ResponseEntity.ok(LoginResponse.builder()
                    .message(MessageUtils.MESSAGE_LOGIN_SUCCESS)
                    .token(token)
                    .username(accountLogin.getAccountName())
                    .roles(accountLogin.getAuthorities().stream().map(item -> item.getAuthority()).toList())
                    .id(accountLogin.getId())
                    .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                    LoginResponse.builder()
                            .message(MessageUtils.MESSAGE_LOGIN_FAILED)
                            .build()
            );
        }
    }
    @PostMapping("/account")
    public ResponseEntity updateAccount(@RequestBody AccountDTO account) {
        if (accountService.updateAccount(account)) {
            return new ResponseEntity(HttpStatus.OK);
        }
        return new ResponseEntity(MessageUtils.MESSAGE_ACCOUNT_NOT_EXISTS, HttpStatus.BAD_REQUEST);

    }
    @DeleteMapping("/admin/account/{accountId}")
    public boolean deleteAccountById(@PathVariable("accountId") String accountId) {
        return accountService.deleteAccount(accountId);
    }
}
