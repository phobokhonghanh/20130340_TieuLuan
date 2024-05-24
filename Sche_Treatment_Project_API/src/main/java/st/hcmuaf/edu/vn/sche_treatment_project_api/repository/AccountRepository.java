package st.hcmuaf.edu.vn.sche_treatment_project_api.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Account;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.MedicalPackage;

public interface AccountRepository extends JpaRepository<Account, String> {

    @Query(value = "select account_OTP from account where id=:id", nativeQuery = true)
    String getOTPById(@Param("id") String id);

    boolean existsByAccountEmailIgnoreCaseOrAccountPhone(String email, String phone);
    boolean existsByAccountEmailIgnoreCaseAndAccountPhone(String email, String phone);


    Account findByAccountEmailAndAccountPhoneAndSupportStatusId(String email, String phone, String status);

    Account findByAccountPhoneIgnoreCase(String phone);

    Page<Account> findAllByAccountPhoneIsContaining(String keyword, Pageable pageable);

}
