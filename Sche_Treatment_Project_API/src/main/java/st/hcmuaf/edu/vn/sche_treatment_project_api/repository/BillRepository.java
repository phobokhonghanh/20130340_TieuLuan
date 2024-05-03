package st.hcmuaf.edu.vn.sche_treatment_project_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Bill;

public interface BillRepository extends JpaRepository <Bill, String > {

    @Query(value = "SELECT * FROM bill WHERE  appointment_id = :appointmentId", nativeQuery = true)
    Bill getBillByAppointmentId(String appointmentId);

}
