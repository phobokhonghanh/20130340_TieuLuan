package st.hcmuaf.edu.vn.sche_treatment_project_api.model;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@Table(name = "medical_package")
@AllArgsConstructor
public class MedicalPackage {
    @Id
    @Column(name = "id", length = 36)
    private String id;

    @Column(name = "package_name", length = 255, nullable = false)
    private String packageName;

    @Column(name = "package_price", length = 255, nullable = false)
    private String packagePrice;

    @Column(name = "create_at")
    private LocalDateTime createdAt;

    @Column(name = "update_at")
    private LocalDateTime updatedAt;

    @ManyToOne
    @JoinColumn(name = "clinic_id")
    private Clinic clinic;

    @ManyToOne
    @JoinColumn(name = "support_status_id")
    private Support supportStatus;

    @OneToMany(mappedBy = "medicalPackage", cascade = CascadeType.ALL)
    private List<PackageService> packageServices;

    @OneToMany(mappedBy = "medicalPackage", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Appointment> appointments;

}
