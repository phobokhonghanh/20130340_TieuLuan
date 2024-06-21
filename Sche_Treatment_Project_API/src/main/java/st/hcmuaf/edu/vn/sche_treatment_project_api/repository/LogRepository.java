package st.hcmuaf.edu.vn.sche_treatment_project_api.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Log;

public interface LogRepository extends JpaRepository<Log, Long> {
    Page<Log> findAll(Specification<Log> spec, Pageable pageable);

}
