package st.hcmuaf.edu.vn.sche_treatment_project_api.model;
import lombok.*;
import jakarta.persistence.*;
import java.time.LocalDateTime;
@Entity
@Data
@NoArgsConstructor
    @Table(name = "log")
    public class Log {

        @Id
        @Column(name = "id", length = 36)
        private String id;

        @Column(name = "log_content", columnDefinition = "TEXT")
        private String logContent;

        @Column(name = "create_at", updatable = false, nullable = false)
        private LocalDateTime createdAt;

        @Column(name = "update_at", nullable = false)
        private LocalDateTime updatedAt;

        @ManyToOne
        @JoinColumn(name = "support_level_id")
        private Support supportLevel;
}
