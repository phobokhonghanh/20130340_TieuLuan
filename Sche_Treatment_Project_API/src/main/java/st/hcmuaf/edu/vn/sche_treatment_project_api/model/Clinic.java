package st.hcmuaf.edu.vn.sche_treatment_project_api.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "clinic")
@Data
@NoArgsConstructor
public class Clinic {
    @Id
    @Column(name = "id", length = 36)
    private String id;

    @Column(name = "clinic_name", length = 255, nullable = false)
    private String clinicName;

    @Column(name = "create_at", updatable = false, nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "update_at", nullable = false)
    private LocalDateTime updatedAt;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "medical_area_id")
    private MedicalArea medicalArea;

    @ManyToOne
    @JoinColumn(name = "support_status_id")
    private Support supportStatus;

    @OneToMany(mappedBy = "clinic", cascade = CascadeType.ALL)
    private List<Calendar> calendars;

    public Clinic(String id, String clinicName, LocalDateTime createdAt, LocalDateTime updatedAt, MedicalArea medicalArea, Support supportStatus) {
        this.id = id;
        this.clinicName = clinicName;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.medicalArea = medicalArea;
        this.supportStatus = supportStatus;
    }
}
