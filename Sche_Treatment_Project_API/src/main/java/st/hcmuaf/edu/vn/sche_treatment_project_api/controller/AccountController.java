package st.hcmuaf.edu.vn.sche_treatment_project_api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Account;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.AccountDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.DoctorDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.LoginDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.PatientDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.response.LoginResponse;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.AccountService;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.DoctorService;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.MailService;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.PatientService;

import java.util.List;
import java.util.Random;

@RestController
@RequestMapping("/api/account")
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

    @GetMapping("/all")
    public List<Account> getAllAccount() {
        return accountService.getAll();
    }

    @GetMapping("{accountId}")
    public Account getAccountById(@PathVariable("accountId") String accountId) {
        return accountService.getAccount(accountId);
    }

    @GetMapping("/check-email-phone-role/{email}/{phone}/{role}")
    public ResponseEntity checkEmailOrPhoneAndRole(@PathVariable String email, @PathVariable String phone, @PathVariable String role) {
        boolean rs = accountService.checkEmailOrPhoneAndRole(email, phone, role);
        if (!rs) {
            return new ResponseEntity(HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.BAD_REQUEST);
    }

    public String renderOTP() {
        return new Random().nextInt(999999) + "";
    }

    @PatchMapping("/confirm-OTP/{accountId}")
    public ResponseEntity confirmOTP(@PathVariable String accountId, @RequestParam(name = "otp", defaultValue = "000000") String otp) {
        if (accountService.checkOTP(accountId, otp)) {
            return new ResponseEntity(HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.BAD_REQUEST);
    }

    @PostMapping(value = "/register/patient")
    public ResponseEntity<String> createPatient(@RequestBody PatientDTO patientDTO) {
        String email = patientDTO.getAccountEmail();
        patientDTO.setSupportStatusId("S5");
        patientDTO.setSupportRoleId("R4");
        Account account = accountService.findByAccountEmailAndAccountPhoneAndSupportStatusAndSupportRole(email, patientDTO.getAccountPhone(), patientDTO.getSupportStatusId(), patientDTO.getSupportRoleId());
        if (account != null) patientService.deletePatient(account.getId());
        ResponseEntity rs = checkEmailOrPhoneAndRole(email, patientDTO.getAccountPhone(), patientDTO.getSupportRoleId());
        if (rs.getStatusCode().value() == 200) {
            patientDTO.setAccountOTP(renderOTP());
            emailService.sendMail(email, "BỆNH VIỆN ĐA KHOA THỦ ĐỨC - Xác nhận email để đăng ký tài khoản", "Vui lòng nhập mã OTP để hoàn thành việc đăng ký tài khoản: " + patientDTO.getAccountOTP());
            // hash password
            patientDTO.setAccountPassword(passwordEncoder.encode(patientDTO.getAccountPassword()));
            if (patientService.createPatient(patientDTO)) {
                return new ResponseEntity(patientDTO.getId(),HttpStatus.OK);
            }
        }
        return new ResponseEntity("Tài khoản hoặc email đã tồn tại",HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/register")
    public ResponseEntity create(@RequestBody DoctorDTO doctorDTO) {
        String email = doctorDTO.getAccountEmail();
        doctorDTO.setSupportStatusId("S5");
        Account account = accountService.findByAccountEmailAndAccountPhoneAndSupportStatusAndSupportRole(email, doctorDTO.getAccountPhone(), doctorDTO.getSupportStatusId(), doctorDTO.getSupportRoleId());
        if (account != null) {
            if (account.getSupportRole().equals("R2")) {
                doctorService.deleteDoctor(account.getId());
            } else {
                accountService.deleteAccount(account.getId());
            }
        }
        ResponseEntity rs = checkEmailOrPhoneAndRole(email, doctorDTO.getAccountPhone(), doctorDTO.getSupportRoleId());
        if (rs.getStatusCode().value() == 200) {
            doctorDTO.setAccountOTP(renderOTP());
            emailService.sendMail(email, "BỆNH VIỆN ĐA KHOA THỦ ĐỨC - Xác nhận email để đăng ký tài khoản", "Vui lòng nhập mã OTP để hoàn thành việc đăng ký tài khoản: " + doctorDTO.getAccountOTP());
            doctorDTO.setAccountPassword(passwordEncoder.encode(doctorDTO.getAccountPassword()));
            if (doctorDTO.getSupportRoleId().equals("R2")) {
                if (doctorService.createDoctor(doctorDTO))
                    return new ResponseEntity(HttpStatus.OK);
            } else {
                if (accountService.createAccount(doctorDTO))
                    return new ResponseEntity(HttpStatus.OK);
            }
        }
        return new ResponseEntity(HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginDTO loginDTO) {
        try {
            if (loginDTO.getRole() == null) loginDTO.setRole("R4");
            Account accountLogin = accountService.findByAccountPhoneAndSupportRole(loginDTO.getPhone(), loginDTO.getRole());
            String token = accountService.login(loginDTO, accountLogin);
            if (token == null) {
                return ResponseEntity.badRequest().body(
                        LoginResponse.builder()
                                .message("Tài khoản không tồn tại")
                                .build()
                );
            }
            if (token == "LOCK") {
                return ResponseEntity.badRequest().body(
                        LoginResponse.builder()
                                .message("Tài khoản bị khóa")
                                .build()
                );
            }
            if (token == "PASSWORD") {
                return ResponseEntity.badRequest().body(
                        LoginResponse.builder()
                                .message("Sai mật khẩu")
                                .build()
                );
            }
            // Trả về token trong response
            return ResponseEntity.ok(LoginResponse.builder()
                    .message("LOGIN SUCCESS")
                    .token(token)
                    .username(accountLogin.getAccountName())
                    .roles(accountLogin.getAuthorities().stream().map(item -> item.getAuthority()).toList())
                    .id(accountLogin.getId())
                    .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                    LoginResponse.builder()
                            .message("LOGIN FAILED")
                            .build()
            );
        }
    }

    @PutMapping
    public boolean updateAccount(@RequestBody AccountDTO account) {
        return accountService.updateAccount(account);
    }

    @DeleteMapping("{accountId}")
    public boolean deleteAccountById(@PathVariable("accountId") String accountId) {
        return accountService.deleteAccount(accountId);
    }
}
