package st.hcmuaf.edu.vn.sche_treatment_project_api.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "clinic")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Clinic extends BaseEntity{
    @Id
    @Column(name = "id", length = 36)
    private String id;

    @Column(name = "clinic_name", length = 255, nullable = false)
    private String clinicName;

//    @Column(name = "create_at", updatable = false, nullable = false)
//    private LocalDateTime createdAt;
//
//    @Column(name = "update_at")
//    private LocalDateTime updatedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name = "medical_area_id")
    private MedicalArea medicalArea;

    @ManyToOne
    @JoinColumn(name = "support_status_id")
    private Support supportStatus;

    @OneToMany(mappedBy = "clinic", cascade = CascadeType.ALL)
    private List<Calendar> calendars;

}
