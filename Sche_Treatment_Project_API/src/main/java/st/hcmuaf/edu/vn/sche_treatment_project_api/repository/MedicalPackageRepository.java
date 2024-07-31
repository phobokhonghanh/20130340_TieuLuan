package st.hcmuaf.edu.vn.sche_treatment_project_api.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.MedicalPackage;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Support;

import java.util.List;

public interface MedicalPackageRepository extends JpaRepository<MedicalPackage, String>, JpaSpecificationExecutor<MedicalPackage> {
    /*
     * Lấy danh sách gói dịch vụ có trong khu vực và trong calendar
     * tham số truyền vào là id của khu vực
     * */
    @Query(value = "SELECT * FROM medical_package WHERE clinic_id IN " +
            "(SELECT clinic_id FROM calendar WHERE calendar_date >= CURDATE() and  clinic_id IN " +
            "(SELECT id FROM clinic WHERE medical_area_id = :medicalAreaId))", nativeQuery = true)
    List<MedicalPackage> getListPackageArea(@Param("medicalAreaId") String medicalAreaId);

    @Query(value = "SELECT * FROM medical_package WHERE clinic_id IN " +
            "(SELECT clinic_id FROM calendar WHERE calendar_date >= CURDATE()) LIMIT 5", nativeQuery = true)
    List<MedicalPackage> getListPackageLimit();

    @Query(value = "SELECT * FROM medical_package WHERE clinic_id IN " +
            "(SELECT clinic_id FROM calendar WHERE calendar_date >= CURDATE())", nativeQuery = true)
    List<MedicalPackage> getListPackageCalendar();

    @Query(value = "SELECT * FROM medical_package where id = (SELECT support_value FROM support where support_info = 'PACKAGE_DEFAULT')", nativeQuery = true)
    MedicalPackage getPackageDefault();

    @Query(value = "SELECT EXISTS (SELECT 1 FROM medical_package WHERE clinic_id = :clinicId and package_name LIKE :packageName AND id != :packageId)", nativeQuery = true)
    Integer existsByPackageName(@Param("clinicId") String clinicId, @Param("packageName") String packageName, @Param("packageId") String packageId);

    Page<MedicalPackage> findAllByPackageNameIsContainingIgnoreCase(String searchTerm, Pageable pageable);

}
