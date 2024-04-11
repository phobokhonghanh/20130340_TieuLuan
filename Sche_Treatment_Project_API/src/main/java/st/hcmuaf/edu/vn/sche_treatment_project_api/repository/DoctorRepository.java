package st.hcmuaf.edu.vn.sche_treatment_project_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Doctor;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, String> {
}
