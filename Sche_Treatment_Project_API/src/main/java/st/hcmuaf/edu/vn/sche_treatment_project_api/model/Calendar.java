package st.hcmuaf.edu.vn.sche_treatment_project_api.model;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import jakarta.persistence.*;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@Table(name = "calendar")
@NoArgsConstructor
@AllArgsConstructor
public class Calendar extends BaseEntity{

    @Id
    @Column(name = "id", length = 36)
    private String id;
    @Column(name = "calendar_date")
    private LocalDate calendarDate;
//    @Column(name = "create_at", updatable = false, nullable = false)
//    private LocalDateTime createdAt;
//
//    @Column(name = "update_at")
//    private LocalDateTime updatedAt;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "clinic_id")
    private Clinic clinic;

    @ManyToOne
    @JoinColumn(name = "account_id")
    private Doctor doctor;

    @ManyToOne
    @JoinColumn(name = "id_group_time")
    private GroupTime groupTime;

    @OneToMany(mappedBy = "calendar", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Appointment> appointments;
}
