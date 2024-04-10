package st.hcmuaf.edu.vn.sche_treatment_project_api.model;

import jakarta.persistence.*;
import lombok.*;


import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "support")
@NoArgsConstructor
public class Support {
    @Id
    @Column(name = "id", length = 36)
    private String id;

    @Column(name = "support_value", columnDefinition = "TEXT")
    private String supportValue;

    @Column(name = "support_info", columnDefinition = "TEXT")
    private String supportInfo;

    @Column(name = "create_at", updatable = false, nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "update_at", nullable = false)
    private LocalDateTime updatedAt;

    public Support(String id, String supportValue, String supportInfo, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.supportValue = supportValue;
        this.supportInfo = supportInfo;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
