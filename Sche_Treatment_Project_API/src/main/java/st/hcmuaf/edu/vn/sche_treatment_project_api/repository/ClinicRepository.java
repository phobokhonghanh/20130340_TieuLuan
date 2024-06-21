package st.hcmuaf.edu.vn.sche_treatment_project_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Clinic;

import java.util.List;

public interface ClinicRepository extends JpaRepository<Clinic, String> {
    /*
     * Lấy danh sách phòng chuyên khoa của gói dịch vụ và dịch vụ
     * tham số truyền vào là id gói dịch vụ hoặc id dịch vụ
     * */
    @Query(value = "SELECT * FROM clinic WHERE id IN (SELECT clinic_id FROM medical_package WHERE id = :packageId) ", nativeQuery = true)
    List<Clinic> getListClinicPackage(@Param("packageId") String packageId);

    @Query(value = "SELECT * FROM clinic WHERE id IN (SELECT clinic_id FROM medical_service WHERE id = :servicesId) ", nativeQuery = true)
    List<Clinic> getListClinicService(@Param("servicesId") String servicesId);

    @Query(value = "SELECT EXISTS (SELECT 1 FROM clinic WHERE medical_area_id = :mediaAreaId and clinic_name LIKE :clinicName AND id != :clinicId)", nativeQuery = true)
    Integer existsByClinicName(@Param("mediaAreaId") String mediaAreaId, @Param("clinicName") String clinicName, @Param("clinicId") String clinicId);

    @Query(value = "SELECT * FROM clinic where id = (SELECT clinic_id from calendar where id =  :calendarId)", nativeQuery = true)
    Clinic getClinicByCalendar(@Param("calendarId") String calendarId);
}
