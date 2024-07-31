package st.hcmuaf.edu.vn.sche_treatment_project_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Calendar;

import java.util.Date;
import java.util.List;

public interface CalendarRepository extends JpaRepository<Calendar, String > {
    @Query(value = "SELECT * FROM calendar WHERE account_id = :doctorId and calendar_date >= CURRENT_DATE", nativeQuery = true)
    List<Calendar> getCalendarDoctor(@Param("doctorId") String doctorId);
    @Query(value = "SELECT * FROM calendar WHERE clinic_id = :clinicId and calendar_date >= CURRENT_DATE", nativeQuery = true)
    List<Calendar> getCalendarClinic(@Param("clinicId") String clinicId);

    List<Calendar> findAllByClinicId(String clinicId);
    @Query(value = "SELECT CASE WHEN EXISTS (" +
            "SELECT 1 FROM appointment WHERE calendar_id = :id)" +
            "THEN true ELSE false END", nativeQuery = true)
    Integer existsByIdAndAppointmentsExist(@Param("id") String id);

}
