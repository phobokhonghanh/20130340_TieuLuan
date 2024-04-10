package st.hcmuaf.edu.vn.sche_treatment_project_api.model;
import lombok.*;
import jakarta.persistence.*;
import java.time.LocalDateTime;
@Entity
@Data
@NoArgsConstructor
@Table(name = "appointment_result")
public class AppointmentResult {

    @Id
    @Column(name = "id", length = 36)
    private String id;

    @Column(name = "result_symptom", columnDefinition = "TEXT")
    private String resultSymptom;

    @Column(name = "result_diagnostic", columnDefinition = "TEXT")
    private String resultDiagnostic;

    @Column(name = "result_note", columnDefinition = "TEXT")
    private String resultNote;

    @Column(name = "create_at", updatable = false, nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "update_at", nullable = false)
    private LocalDateTime updatedAt;

    @ManyToOne
    @JoinColumn(name = "appointment_id")
    private Appointment appointment;

    public AppointmentResult(String id, String resultSymptom, String resultDiagnostic, String resultNote, LocalDateTime createdAt, LocalDateTime updatedAt, Appointment appointment) {
        this.id = id;
        this.resultSymptom = resultSymptom;
        this.resultDiagnostic = resultDiagnostic;
        this.resultNote = resultNote;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.appointment = appointment;
    }
}
