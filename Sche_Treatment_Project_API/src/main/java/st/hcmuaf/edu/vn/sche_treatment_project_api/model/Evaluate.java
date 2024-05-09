package st.hcmuaf.edu.vn.sche_treatment_project_api.model;
import lombok.*;
import jakarta.persistence.*;
import java.time.LocalDateTime;
@Entity
@Data
@NoArgsConstructor
@Table(name = "evaluate")
public class Evaluate {

    @Id
    @Column(name = "id", length = 36)
    private String id;

    @Column(name = "evaluate_content", columnDefinition = "TEXT")
    private String evaluateContent;

    @Column(name = "create_at")
    private LocalDateTime createAt;

    @Column(name = "update_at")
    private LocalDateTime updateAt;

    @ManyToOne
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;

    @ManyToOne
    @JoinColumn(name = "appointment_id")
    private Appointment appointment;

    public Evaluate(String id, String evaluateContent, LocalDateTime createAt, LocalDateTime updateAt, Doctor doctor, Appointment appointment) {
        this.id = id;
        this.evaluateContent = evaluateContent;
        this.createAt = createAt;
        this.updateAt = updateAt;
        this.doctor = doctor;
        this.appointment = appointment;
    }
}
