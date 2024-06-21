package st.hcmuaf.edu.vn.sche_treatment_project_api.model;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@Table(name = "medical_area")
@NoArgsConstructor
@AllArgsConstructor
public class MedicalArea extends BaseEntity{

    @Id
    @Column(name = "id", length = 36)
    private String id;

    @Column(name = "area_name", length = 255, nullable = false)
    private String areaName;

//    @Column(name = "create_at", nullable = false, updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
//    private LocalDateTime createAt;
//
//    @Column(name = "update_at", nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
//    private LocalDateTime updateAt;

    @ManyToOne
    @JoinColumn(name = "support_status_id", referencedColumnName = "id", nullable = false)
    protected Support supportStatus;

    @OneToMany(mappedBy = "medicalArea", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Clinic> clinics;

}
