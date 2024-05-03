package st.hcmuaf.edu.vn.sche_treatment_project_api.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Account;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Doctor;

import java.util.List;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, String> {

    /*
     * Lấy danh sách bác sĩ của phòng chuyên khoa
     * tham số truyền vào là id phòng chuyên khoa
     * */
//    @Query(value = "SELECT * from doctor WHERE id IN (SELECT account_id from calendar WHERE clinic_id = :clinicId) ", nativeQuery = true)
//    public List<Doctor> getListDoctorClinic(@Param("clinicId") String clinicId);

    @Query(value = "SELECT account.*, doctor.* from doctor join account on doctor.id = account.id WHERE doctor.id IN (SELECT account_id from calendar WHERE calendar_date >= CURDATE()) LIMIT 5 ", nativeQuery = true)
    public List<Doctor> getListDoctorLimit();
    @Query(value = "SELECT account.*, doctor.* from doctor join account on doctor.id = account.id WHERE doctor.id IN (SELECT account_id from calendar WHERE calendar_date >= CURDATE())", nativeQuery = true)
    public List<Doctor> getListDoctorCalendar();

    @Query(value = "SELECT account.*, doctor.* from doctor join account on doctor.id = account.id where doctor.id = (SELECT account_id FROM calendar WHERE id = :idCalendar)", nativeQuery = true)
    Doctor getDoctorbyIdCalendar(@PathVariable("idCalendar") String idCalendar);

    //    @Query(value = "SELECT account.*, doctor.* from doctor join account on doctor.id = account.id WHERE doctor.id IN (SELECT account_id from calendar WHERE calendar_date >= CURDATE())", nativeQuery = true)
//    public Page<Doctor> getListDoctorCalendarPageable(Pageable pageable);

}
