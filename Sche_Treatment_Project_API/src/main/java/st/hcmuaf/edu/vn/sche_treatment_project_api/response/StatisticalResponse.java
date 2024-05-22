package st.hcmuaf.edu.vn.sche_treatment_project_api.response;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class StatisticalResponse implements Serializable {
    private Integer month;
    private Double sum;
}
