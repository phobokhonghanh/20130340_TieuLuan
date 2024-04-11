package st.hcmuaf.edu.vn.sche_treatment_project_api.controller;

import org.springframework.web.bind.annotation.*;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Account;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.AccountService;

import java.util.List;

@RestController
@RequestMapping("/api/account")
public class AccountController {
    AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @GetMapping("{accountId}")
    public Account getAccountById(@PathVariable("accountId") String accountId) {
        return accountService.getAccount(accountId);
    }

    @GetMapping("/all")
    public List<Account> getAllAccount() {
        return accountService.getAll();
    }

    @PostMapping
    public boolean createAccount(@RequestBody Account account) {
        return accountService.createAccount(account);
    }

    @PutMapping
    public boolean updateAccount(@RequestBody Account account) {
        return accountService.updateAccount(account);
    }

    @DeleteMapping("{accountId}")
    public boolean deleteAccountById(@PathVariable("accountId") String accountId) {
        return accountService.deleteAccount(accountId);
    }
}
