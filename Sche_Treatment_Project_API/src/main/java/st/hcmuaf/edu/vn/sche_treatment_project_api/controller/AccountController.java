package st.hcmuaf.edu.vn.sche_treatment_project_api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import st.hcmuaf.edu.vn.sche_treatment_project_api.Utils.MessageUtils;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Account;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.AccountDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.PatientDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.SupportDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.response.LoginResponse;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.AccountService;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.DoctorService;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.PatientService;

@RestController
@RequestMapping("${api}")
public class AccountController {
    @Autowired
    AccountService accountService;
    @Autowired
    PatientService patientService;
    @Autowired
    DoctorService doctorService;

    @GetMapping("/admin/account/all")
    public ResponseEntity<Page> getAllAccount(@RequestParam(name = "keyword", defaultValue = "") String keyword, @RequestParam(name = "page", defaultValue = "1") Integer pageNo) {
        Page accountDTOs = accountService.getAll(keyword, pageNo);
        return ResponseEntity.ok(accountDTOs);
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

    @DeleteMapping("/admin/account/{accountId}")
    public boolean deleteAccountById(@PathVariable("accountId") String accountId) {
        return accountService.deleteAccount(accountId);
    }

    @PatchMapping("/account/send-OTP-reset-password/{accountId}")
    public ResponseEntity sendOTPResetPassword(@PathVariable String accountId) {
        if (accountService.sendOTPResetPassword(accountId)) {
            return new ResponseEntity(HttpStatus.OK);
        }
        return new ResponseEntity(MessageUtils.MESSAGE_ACCOUNT_NOT_EXISTS, HttpStatus.BAD_REQUEST);
    }


    @PostMapping("/account/refresh-token")
    public ResponseEntity<LoginResponse> refreshToken(@RequestBody LoginResponse userRequest) {
        Account account = accountService.findById(userRequest.getId());
        if (account == null) {
            return ResponseEntity.badRequest().body(
                    LoginResponse.builder()
                            .message(MessageUtils.MESSAGE_ACCOUNT_NOT_EXISTS)
                            .build()
            );
        }

        boolean isRoleMatched = account.getAuthorities().stream()
                .anyMatch(authority -> userRequest.getRoles().stream()
                        .anyMatch(role -> authority.getAuthority().equalsIgnoreCase(role.toString())));

        if (!isRoleMatched) {
            String token = accountService.generateToken(account);
            if (token.equals("LOCK")) {
                return ResponseEntity.badRequest().body(
                        LoginResponse.builder()
                                .message(MessageUtils.MESSAGE_ACCOUNT_LOCKED)
                                .build()
                );
            }
            return ResponseEntity.ok(LoginResponse.builder()
                    .message(MessageUtils.MESSAGE_REFRESH_TOKEN)
                    .token(token)
                    .username(account.getAccountName())
                    .roles(account.getAuthorities().stream().map(item -> item.getAuthority()).toList())
                    .id(account.getId())
                    .build());
        } else {
            return ResponseEntity.noContent().build();
        }
    }


    @PostMapping("/account")
    public ResponseEntity updateAccount(@RequestBody AccountDTO account) {
        if (accountService.updateAccount(account)) {
            return new ResponseEntity(HttpStatus.OK);
        }
        return new ResponseEntity(MessageUtils.MESSAGE_ACCOUNT_NOT_EXISTS, HttpStatus.BAD_REQUEST);

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

    @PatchMapping("/patient/update/{accountId}")
    public ResponseEntity updateBHYT(@PathVariable String accountId, @RequestParam(name = "bhyt", defaultValue = "000000") String bhyt) {
        if (patientService.updateBHYT(accountId, bhyt)) {
            return new ResponseEntity(HttpStatus.OK);
        }
        return new ResponseEntity(MessageUtils.MESSAGE_ACCOUNT_NOT_EXISTS, HttpStatus.BAD_REQUEST);
    }

}
