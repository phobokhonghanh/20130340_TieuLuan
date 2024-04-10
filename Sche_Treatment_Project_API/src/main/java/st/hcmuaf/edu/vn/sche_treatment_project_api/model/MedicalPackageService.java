package st.hcmuaf.edu.vn.sche_treatment_project_api.model;
import lombok.*;
import jakarta.persistence.*;
@Entity
@Data
@NoArgsConstructor
@Table(name = "medical_package_service")
public class MedicalPackageService {

    @Id
    @Column(name = "id", length = 36)
    private String id;

    @ManyToOne
    @JoinColumn(name = "service_id")
    private MedicalService medicalService;

    @ManyToOne
    @JoinColumn(name = "package_id")
    private MedicalPackage medicalPackage;

    @ManyToOne
    @JoinColumn(name = "support_status_id")
    private Support supportStatus;

    public MedicalPackageService(String id, MedicalService medicalService, MedicalPackage medicalPackage, Support supportStatus) {
        this.id = id;
        this.medicalService = medicalService;
        this.medicalPackage = medicalPackage;
        this.supportStatus = supportStatus;
    }
}
