package st.hcmuaf.edu.vn.sche_treatment_project_api.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Appointment;

import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, String> {
    @Query(value = "SELECT * FROM appointment WHERE calendar_id= :calendarId ", nativeQuery = true)
    List<Appointment> getListAppointmentCalendarId(@Param("calendarId") String calendarId);

    @Query(value = "SELECT " +
            "    CASE " +
            "        WHEN EXISTS (SELECT 1 FROM appointment WHERE calendar_id= :calendarId AND support_time_id = :supportTimeId) THEN 'TRUE' " +
            "        ELSE 'FALSE' " +
            "    END AS result; ", nativeQuery = true)
    boolean checkTimeAppointment(@Param("calendarId")String calendarId, @Param("supportTimeId")String supportTimeId);

    Page<Appointment> findAllByAppointmentPhoneIsContaining(String keyword, Pageable pageable);
}
