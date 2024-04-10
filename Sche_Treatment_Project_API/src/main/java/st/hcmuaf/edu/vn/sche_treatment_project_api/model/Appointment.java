package st.hcmuaf.edu.vn.sche_treatment_project_api.model;
import lombok.*;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@Table(name = "appointment")
public class Appointment {

    @Id
    @Column(name = "id", length = 36)
    private String id;

    @Column(name = "appointment_symptom", columnDefinition = "TEXT")
    private String appointmentSymptom;

    @Column(name = "create_at", updatable = false, nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "update_at", nullable = false)
    private LocalDateTime updatedAt;

    @ManyToOne
    @JoinColumn(name = "account_id")
    private Patient patient;

    @ManyToOne
    @JoinColumn(name = "package_id")
    private MedicalPackage medicalPackage;

    @ManyToOne
    @JoinColumn(name = "calendar_id")
    private Calendar calendar;

    @ManyToOne
    @JoinColumn(name = "support_status_id")
    private Support supportStatus;

    @OneToMany(mappedBy = "appointment", cascade = CascadeType.ALL)
    private List<AppointmentService> appointmentServices;

    @OneToMany(mappedBy = "appointment", cascade = CascadeType.ALL)
    private List<AppointmentResult> appointmentResults;

    @OneToMany(mappedBy = "appointment", cascade = CascadeType.ALL)
    private List<Evaluate> evaluates;

    @OneToMany(mappedBy = "appointment", cascade = CascadeType.ALL)
    private List<Bill> bills ;
    public Appointment(String id, String appointmentSymptom, LocalDateTime createdAt, LocalDateTime updatedAt, Patient patient, MedicalPackage medicalPackage, Calendar calendar, Support supportStatus) {
        this.id = id;
        this.appointmentSymptom = appointmentSymptom;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.patient = patient;
        this.medicalPackage = medicalPackage;
        this.calendar = calendar;
        this.supportStatus = supportStatus;
    }
}
