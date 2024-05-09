package st.hcmuaf.edu.vn.sche_treatment_project_api.model;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import jakarta.persistence.*;
@Entity
@Data
@NoArgsConstructor
@Table(name = "medical_package_service")
public class PackageService {

    @Id
    @Column(name = "id", length = 36)
    private String id;

    @ManyToOne
    @JoinColumn(name = "service_id")
    private MedicalService medicalService;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "package_id")
    private MedicalPackage medicalPackage;

    @ManyToOne
    @JoinColumn(name = "support_status_id")
    private Support supportStatus;

    public PackageService(String id, MedicalService medicalService, MedicalPackage medicalPackage) {
        this.id = id;
        this.medicalService = medicalService;
        this.medicalPackage = medicalPackage;
    }
}
