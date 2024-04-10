package st.hcmuaf.edu.vn.sche_treatment_project_api.model;
import lombok.*;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@Table(name = "medical_package")

public class MedicalPackage {
    @Id
    @Column(name = "id", length = 36)
    private String id;

    @Column(name = "package_name", length = 255, nullable = false)
    private String packageName;

    @Column(name = "package_price", length = 255, nullable = false)
    private String packagePrice;

    @Column(name = "create_at", updatable = false, nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "update_at", nullable = false)
    private LocalDateTime updatedAt;

    @ManyToOne
    @JoinColumn(name = "clinic_id")
    private Clinic clinic;

    @ManyToOne
    @JoinColumn(name = "support_status_id")
    private Support supportStatus;

    @OneToMany(mappedBy = "medicalPackage", cascade = CascadeType.ALL)
    private List<MedicalPackageService> medicalPackageServices;

    @OneToMany(mappedBy = "medicalPackage", cascade = CascadeType.ALL)
    private List<Appointment> appointments;
    public MedicalPackage(String id, String packageName, String packagePrice, LocalDateTime createdAt, LocalDateTime updatedAt, Clinic clinic, Support supportStatus) {
        this.id = id;
        this.packageName = packageName;
        this.packagePrice = packagePrice;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.clinic = clinic;
        this.supportStatus = supportStatus;
    }
}
