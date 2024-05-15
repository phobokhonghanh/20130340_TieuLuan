package st.hcmuaf.edu.vn.sche_treatment_project_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Account;

public interface AccountRepository extends JpaRepository<Account, String> {

    @Query(value = "select account_OTP from account where id=:id", nativeQuery = true)
    String getOTPById(@Param("id") String id);

    boolean existsByAccountEmailAndSupportRoleId(String email, String role);

    boolean existsByAccountPhoneAndSupportRoleId(String phone, String role);

    Account findByAccountEmailAndAccountPhoneAndSupportStatusIdAndSupportRoleId(String email, String phone, String status, String role);
    Account findByAccountPhoneAndSupportRoleId(String phone, String role);
    Account findByAccountPhoneIgnoreCase(String phone);

    Account findByAccountEmailIgnoreCaseAndSupportStatusId(String email, String status);

}
