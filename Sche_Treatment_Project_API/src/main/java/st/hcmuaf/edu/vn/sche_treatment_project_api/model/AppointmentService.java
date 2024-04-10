package st.hcmuaf.edu.vn.sche_treatment_project_api.model;
import lombok.*;
import jakarta.persistence.*;

@Entity
@Data
@NoArgsConstructor
@Table(name = "appointment_service")
public class AppointmentService {

    @Id
    @Column(name = "id", length = 36)
    private String id;

    @Column(name = "service_price", length = 255, nullable = false)
    private String servicePrice;

    @ManyToOne
    @JoinColumn(name = "appointment_id")
    private Appointment appointment;

    @ManyToOne
    @JoinColumn(name = "service_id")
    private MedicalService medicalService;

    public AppointmentService(String id, String servicePrice, Appointment appointment, MedicalService medicalService) {
        this.id = id;
        this.servicePrice = servicePrice;
        this.appointment = appointment;
        this.medicalService = medicalService;
    }
}
