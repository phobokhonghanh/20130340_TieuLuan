package st.hcmuaf.edu.vn.sche_treatment_project_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Account;

public interface AccountRepository extends JpaRepository <Account, String > {

}
