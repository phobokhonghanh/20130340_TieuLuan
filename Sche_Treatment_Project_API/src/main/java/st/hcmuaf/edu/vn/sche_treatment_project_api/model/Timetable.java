package st.hcmuaf.edu.vn.sche_treatment_project_api.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import jakarta.persistence.*;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "timetable")
@NoArgsConstructor
public class Timetable {

    @Id
    @Column(name = "id", length = 36)
    private String id;

    @Column(name = "timetable_date")
    private LocalDate timetableDate;

    @Column(name = "create_at", updatable = false, nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "update_at", nullable = false)
    private LocalDateTime updatedAt;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "calendar_id")
    private Calendar calendar;

    @ManyToOne
    @JoinColumn(name = "support_time_id")
    private Support supportTime;

    public Timetable(String id, LocalDate timetableDate, LocalDateTime createdAt, LocalDateTime updatedAt, Calendar calendar, Support supportTime) {
        this.id = id;
        this.timetableDate = timetableDate;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.calendar = calendar;
        this.supportTime = supportTime;
    }
}
