package st.hcmuaf.edu.vn.sche_treatment_project_api.model;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import jakarta.persistence.*;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@Table(name = "calendar")
@NoArgsConstructor
public class Calendar {

    @Id
    @Column(name = "id", length = 36)
    private String id;

    @Column(name = "create_at", updatable = false, nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "update_at", nullable = false)
    private LocalDateTime updatedAt;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "clinic_id")
    private Clinic clinic;

    @ManyToOne
//    @JsonIgnore
    @JoinColumn(name = "account_id")
    private Doctor doctor;

    @OneToMany(mappedBy = "calendar", cascade = CascadeType.ALL)
    private List<Timetable> timetables;

    @OneToMany(mappedBy = "calendar", cascade = CascadeType.ALL)
    private List<Appointment> appointments;

    public Calendar(String id, LocalDateTime createdAt, LocalDateTime updatedAt, Clinic clinic, Doctor doctor) {
        this.id = id;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.clinic = clinic;
        this.doctor = doctor;
    }
}
