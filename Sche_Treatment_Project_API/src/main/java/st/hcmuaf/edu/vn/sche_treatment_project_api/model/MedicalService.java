package st.hcmuaf.edu.vn.sche_treatment_project_api.model;
import lombok.*;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "medical_service")
public class MedicalService extends BaseEntity{

    @Id
    @Column(name = "id", length = 36)
    private String id;

    @Column(name = "service_name", length = 255, nullable = false)
    private String serviceName;

    @Column(name = "service_price", length = 255, nullable = false)
    private String servicePrice;
    @Column(name = "service_description", columnDefinition = "TEXT")
    private String serviceDescription;

//    @Column(name = "create_at")
//    private LocalDateTime createdAt;
//
//    @Column(name = "update_at")
//    private LocalDateTime updatedAt;

    @ManyToOne
    @JoinColumn(name = "clinic_id")
    private Clinic clinic;

    @ManyToOne
    @JoinColumn(name = "support_status_id")
    private Support supportStatus;

}
