package st.hcmuaf.edu.vn.sche_treatment_project_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.PathVariable;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.AppointmentResult;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Bill;

public interface AppointmentResultRepository extends JpaRepository <AppointmentResult, String > {
    AppointmentResult getAppointmentResultByAppointmentId(String appointmentId);
}
