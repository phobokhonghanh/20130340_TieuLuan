package st.hcmuaf.edu.vn.sche_treatment_project_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Clinic;

public interface ClinicRepository extends JpaRepository<Clinic, String > {
}
