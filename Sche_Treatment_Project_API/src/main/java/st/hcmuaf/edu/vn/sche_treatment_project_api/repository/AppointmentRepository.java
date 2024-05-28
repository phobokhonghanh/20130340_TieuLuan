package st.hcmuaf.edu.vn.sche_treatment_project_api.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Appointment;

import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, String> {
    @Query(value = "SELECT * FROM appointment WHERE calendar_id= :calendarId ", nativeQuery = true)
    List<Appointment> getListAppointmentCalendarId(@Param("calendarId") String calendarId);
    @Query(value = "SELECT " +
            "    CASE " +
            "        WHEN EXISTS (SELECT 1 FROM appointment WHERE calendar_id= :calendarId AND support_time_id = :supportTimeId AND support_status_id ='S1') THEN 'TRUE' " +
            "        ELSE 'FALSE' " +
            "    END AS result; ", nativeQuery = true)
    boolean checkTimeAppointment(@Param("calendarId")String calendarId, @Param("supportTimeId")String supportTimeId);
    Page<Appointment> findAllByAppointmentPhoneIsContaining(String keyword, Pageable pageable);
    @Transactional
    @Modifying
    @Query(value ="UPDATE appointment SET support_status_id = :supportStatusId WHERE id = :appointmentId",nativeQuery = true)
    void updateAppointmentBySupportStatus(@Param("appointmentId") String appointmentId, @Param("supportStatusId") String supportStatusId);
}
