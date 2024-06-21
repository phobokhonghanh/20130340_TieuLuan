package st.hcmuaf.edu.vn.sche_treatment_project_api.model;

import lombok.*;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "log")
public class Log extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "log_content", columnDefinition = "TEXT")
    private String logContent;

//    @Column(name = "create_at")
//    private LocalDateTime createdAt;
//
//    @Column(name = "update_at")
//    private LocalDateTime updatedAt;

    @ManyToOne
    @JoinColumn(name = "support_level_id")
    private Support supportLevel;

    @ManyToOne
    @JoinColumn(name = "account_id")
    private Account account;
}
