package st.hcmuaf.edu.vn.sche_treatment_project_api.model;
import lombok.*;
import jakarta.persistence.*;
import java.time.LocalDateTime;
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "evaluate")
public class Evaluate extends BaseEntity{

    @Id
    @Column(name = "id", length = 36)
    private String id;

    @Column(name = "evaluate_content", columnDefinition = "TEXT")
    private String evaluateContent;

    @ManyToOne
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;

    @ManyToOne
    @JoinColumn(name = "appointment_id")
    private Appointment appointment;

}
