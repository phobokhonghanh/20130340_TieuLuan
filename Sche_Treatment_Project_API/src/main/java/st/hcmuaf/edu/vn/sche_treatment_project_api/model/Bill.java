package st.hcmuaf.edu.vn.sche_treatment_project_api.model;
import lombok.*;
import jakarta.persistence.*;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDateTime;
@Entity
@Data
@NoArgsConstructor
@Table(name = "bill")
    public class Bill {

        @Id
        @GeneratedValue(generator = "uuid2")
        @GenericGenerator(name = "uuid2", strategy = "uuid2")
        @Column(name = "id", length = 36)
        private String id;

        @Column(name = "package_price", length = 255, nullable = false)
        private String packagePrice;

        @Column(name = "bill_sum", length = 255, nullable = false)
        private String billSum;

        @Column(name = "bill_ispay", nullable = false)
        private boolean isPaid;

        @Column(name = "create_at", updatable = false, nullable = false)
        private LocalDateTime createdAt;

        @Column(name = "update_at")
        private LocalDateTime updatedAt;

        @ManyToOne
        @JoinColumn(name = "appointment_id")
        private Appointment appointment;

    public Bill(String id, String packagePrice, String billSum, boolean isPaid, LocalDateTime createdAt, LocalDateTime updatedAt, Appointment appointment) {
        this.id = id;
        this.packagePrice = packagePrice;
        this.billSum = billSum;
        this.isPaid = isPaid;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.appointment = appointment;
    }
}
