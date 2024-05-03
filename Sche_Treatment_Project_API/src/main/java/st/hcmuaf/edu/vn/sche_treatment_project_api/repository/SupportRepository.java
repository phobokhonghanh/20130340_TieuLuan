package st.hcmuaf.edu.vn.sche_treatment_project_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Support;

import java.util.List;

public interface SupportRepository extends JpaRepository<Support, String> {
    @Query(value = "SELECT * FROM support where support_info = 'TIME'", nativeQuery = true)
    List<Support> getAllTime();

    @Query(value = "SELECT * FROM support WHERE id_group_time = (SELECT id_group_time FROM calendar WHERE id= :calendarId) AND id NOT IN (SELECT support_time_id FROM appointment WHERE calendar_id =:calendarId)", nativeQuery = true)
    List<Support> getAllTimeAppointment(String calendarId);

}
