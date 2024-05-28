package st.hcmuaf.edu.vn.sche_treatment_project_api.service.impl;

import jakarta.persistence.criteria.Join;
import org.springframework.data.jpa.domain.Specification;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Appointment;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Bill;

public class BillSpecs {

public static Specification<Bill> idLike(String keyword) {
    return (root, query, cb) -> {
        Join<Bill, Appointment> appointmentJoin = root.join("appointment");
        return cb.like(appointmentJoin.get("id").as(String.class), "%" + keyword + "%");
    };
}

}
