package st.hcmuaf.edu.vn.sche_treatment_project_api.controller.authentication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import st.hcmuaf.edu.vn.sche_treatment_project_api.Utils.MessageUtils;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Account;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.LoginDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.PatientDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.SupportDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.response.LoginResponse;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.AccountService;

@RestController
@RequestMapping("${api}")
public class AuthController {
    @Autowired
    AccountService accountService;

    @PostMapping("/auth/register")
    public ResponseEntity create(@RequestBody PatientDTO patientDTO) {
        if (accountService.register(patientDTO)) {
            return new ResponseEntity(patientDTO.getId(), HttpStatus.OK);
        }
        return new ResponseEntity(MessageUtils.MESSAGE_EMAIL_OR_PHONE_EXISTS, HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/auth/login")
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

    @PutMapping("/auth/forgot/{email}/{phone}")
    public ResponseEntity<String> forgotPassword(@PathVariable String email, @PathVariable String phone) {
        String accountId = accountService.forgotPassword(email, phone);
        if (accountId == null) {
            return new ResponseEntity(MessageUtils.MESSAGE_ACCOUNT_NOT_EXISTS, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity(accountId, HttpStatus.OK);
    }

    @PutMapping("/auth/reset-password")
    public ResponseEntity resetPassword(@RequestBody LoginDTO loginDTO) {
        if (accountService.resetPassword(loginDTO)) {
            return new ResponseEntity(HttpStatus.OK);
        }
        return new ResponseEntity(MessageUtils.MESSAGE_ACCOUNT_NOT_EXISTS, HttpStatus.BAD_REQUEST);
    }

    @PatchMapping("/auth/confirm-OTP/{accountId}")
    public ResponseEntity confirmOTP(@PathVariable String accountId, @RequestParam(name = "otp", defaultValue = "000000") String otp) {
        if (accountService.checkOTP(accountId, otp)) {
            return new ResponseEntity(HttpStatus.OK);
        }
        return new ResponseEntity(MessageUtils.MESSAGE_ACCOUNT_NOT_EXISTS, HttpStatus.BAD_REQUEST);
    }

}
