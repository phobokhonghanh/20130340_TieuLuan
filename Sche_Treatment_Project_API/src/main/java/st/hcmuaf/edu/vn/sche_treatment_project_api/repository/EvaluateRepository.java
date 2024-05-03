package st.hcmuaf.edu.vn.sche_treatment_project_api.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.AppointmentResult;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Evaluate;

public interface EvaluateRepository extends JpaRepository <Evaluate, String > {
    Evaluate getEvaluateByAppointmentId(String appointmentId);

    Page<Evaluate> findAllByDoctorIdOrderByCreatedAtDesc(String doctorId, Pageable pageable);

}
