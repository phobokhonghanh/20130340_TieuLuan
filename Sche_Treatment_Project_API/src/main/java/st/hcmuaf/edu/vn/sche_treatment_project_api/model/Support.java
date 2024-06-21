package st.hcmuaf.edu.vn.sche_treatment_project_api.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;


import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "support")
@NoArgsConstructor
@AllArgsConstructor
public class Support extends BaseEntity{
    @Id
    @Column(name = "id", length = 36)
    private String id;

    @Column(name = "support_value", columnDefinition = "TEXT")
    private String supportValue;

    @Column(name = "support_info", columnDefinition = "TEXT")
    private String supportInfo;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "id_group_time")
    private GroupTime groupTime;

//    @Column(name = "create_at", nullable = false)
//    private LocalDateTime createdAt;
//
//    @Column(name = "update_at", nullable = false)
//    private LocalDateTime updatedAt;

}
