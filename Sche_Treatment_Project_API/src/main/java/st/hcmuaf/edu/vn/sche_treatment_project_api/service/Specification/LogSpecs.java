package st.hcmuaf.edu.vn.sche_treatment_project_api.service.Specification;

import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Log;

import java.time.LocalDate;

public class LogSpecs {

    public static Specification<Log> filter(String keyword, LocalDate date) {
        return (root, query, criteriaBuilder) -> {
            Predicate predicate = criteriaBuilder.conjunction();

            if (keyword != null && !keyword.isEmpty()) {
                Predicate keywordPredicate = criteriaBuilder.like(root.get("logContent"), "%" + keyword + "%");
                predicate = criteriaBuilder.and(predicate, keywordPredicate);
            }

            if (date != null) {
                Predicate datePredicate = criteriaBuilder.equal(criteriaBuilder.function("DATE", LocalDate.class, root.get("createdAt")), date);
                predicate = criteriaBuilder.and(predicate, datePredicate);
            }
            query.orderBy(criteriaBuilder.desc(root.get("createdAt")));

            return predicate;
        };
    }
}
