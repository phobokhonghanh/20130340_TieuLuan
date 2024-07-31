package st.hcmuaf.edu.vn.sche_treatment_project_api.service.Specification;

import jakarta.persistence.criteria.Join;
import org.springframework.data.jpa.domain.Specification;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Appointment;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Bill;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.MedicalPackage;

public class PackageSpecs {

    public static Specification<MedicalPackage> containsTextInField(String keyword, String attribute) {
        return (root, query, builder) -> builder.like(root.get(attribute), "%" + keyword + "%");
    }
    public static Specification<MedicalPackage> joinAttribute(Object active, String attribute) {
        return (root, query, builder) -> {
            if (active != null) {
                Join<Object, Object> join = root.join(attribute);
                return builder.equal(join.get("id"), active);
            }
            return null;
        };
    }
}
