package st.hcmuaf.edu.vn.sche_treatment_project_api.model;
import lombok.*;
import jakarta.persistence.*;
import java.time.LocalDateTime;
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "appointment_result")
public class AppointmentResult extends BaseEntity{

    @Id
    @Column(name = "id", length = 36)
    private String id;

    @Column(name = "result_symptom", columnDefinition = "TEXT")
    private String resultSymptom;

    @Column(name = "result_diagnostic", columnDefinition = "TEXT")
    private String resultDiagnostic;

    @Column(name = "result_note", columnDefinition = "TEXT")
    private String resultNote;

//    @Column(name = "create_at")
//    private LocalDateTime createdAt;
//
//    @Column(name = "update_at")
//    private LocalDateTime updatedAt;

    @ManyToOne
    @JoinColumn(name = "appointment_id")
    private Appointment appointment;

}
