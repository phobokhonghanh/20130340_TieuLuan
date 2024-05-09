package st.hcmuaf.edu.vn.sche_treatment_project_api.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.MedicalPackage;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.MedicalService;

import java.util.List;

public interface MedicalServicesRepository extends JpaRepository<MedicalService, String> {
    /*
     * Lấy danh sách dịch vụ có trong khu vực và trong calendar và calendar date phải lớn hơn hoặc bằng ngày hiện tại
     * tham số truyền vào là id của khu vực
     * */
    @Query(value = "SELECT * FROM medical_service WHERE clinic_id IN " +
            "(SELECT clinic_id FROM calendar WHERE calendar_date >= CURDATE() and  clinic_id IN " +
            "(SELECT id FROM clinic WHERE medical_area_id = :medicalAreaId))", nativeQuery = true)
    public List<MedicalService> getListServicesArea(@Param("medicalAreaId") String medicalAreaId);

    @Query(value = "SELECT EXISTS (SELECT 1 FROM medical_service WHERE clinic_id = :clinicId and service_name LIKE :serviceName)", nativeQuery = true)
    Integer existsByServiceName(@Param("clinicId") String clinicId, @Param("serviceName") String serviceName);

    Page<MedicalService> findAllByServiceNameIsContaining(String keyword, Pageable pageable);

}
