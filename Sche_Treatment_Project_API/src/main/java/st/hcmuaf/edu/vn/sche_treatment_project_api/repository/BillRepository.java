package st.hcmuaf.edu.vn.sche_treatment_project_api.repository;

import jakarta.persistence.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Bill;
import st.hcmuaf.edu.vn.sche_treatment_project_api.response.StatisticalResponse;

import java.util.List;

public interface BillRepository extends JpaRepository<Bill, String> {

    @Query(value = "SELECT * FROM bill WHERE  appointment_id = :appointmentId", nativeQuery = true)
    Bill getBillByAppointmentId(String appointmentId);

    @Query(value = "SELECT COUNT(*) from bill b JOIN appointment a on b.appointment_id = a.id WHERE a.account_id = :accountId AND b.bill_ispay = :is_pay", nativeQuery = true)
    Integer getCountBillIsPayByAccountId(String accountId, boolean is_pay);

    @Query(value = "SELECT COUNT(*) from bill b JOIN appointment a on b.appointment_id = a.id WHERE a.account_id = :accountId AND a.support_status_id = :status", nativeQuery = true)
    Integer getCountBillStatusByAccountId(String accountId, String status);

    @Query(value = "SELECT COUNT(*) from bill b JOIN appointment a on b.appointment_id = a.id WHERE a.account_id = :accountId", nativeQuery = true)
    Integer getCountSumByAccountId(String accountId);

    @Query(value = "SELECT SUM(bill_sum) " +
            "FROM bill " +
            "WHERE" +
            "  bill_ispay = true" +
            "  AND WEEK(create_at, 1) = WEEK(CURRENT_DATE, 1)", nativeQuery = true)
    Double sumBillWeek();

    Bill findByPaymentId(String idPayment);

    @Modifying
    @Transactional
    @Query(value = "UPDATE Bill SET bill_ispay = :isPaid WHERE id = :id", nativeQuery = true)
    void updateIsPaid(@Param("id") String id, @Param("isPaid") boolean isPaid);

    Page<Bill> findAll(Specification<Bill> spec, Pageable pageable);

}
