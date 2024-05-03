package st.hcmuaf.edu.vn.sche_treatment_project_api.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Entity
@Table(name = "group_time")
@NoArgsConstructor
@AllArgsConstructor
public class GroupTime {
    @Id
    @Column(name = "id")
    private String id;

    @Column(name = "group_time_description")
    private String groupTimeDescription;

    @OneToMany(mappedBy = "idGroupTime", cascade = CascadeType.ALL)
    private List<Support> supports;
}
