package st.hcmuaf.edu.vn.sche_treatment_project_api.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.MedicalArea;

public interface MedicalAreaRepository extends JpaRepository<MedicalArea, String> {
     Page<MedicalArea> findAllByAreaNameIsContainingIgnoreCase(String keyword, Pageable pageable);
     @Query(value = "SELECT EXISTS (SELECT 1 FROM medical_area WHERE area_name LIKE :name AND id != :id)", nativeQuery = true)
     Integer existsByAreaName(@Param("name") String name, @Param("id") String id);

}
