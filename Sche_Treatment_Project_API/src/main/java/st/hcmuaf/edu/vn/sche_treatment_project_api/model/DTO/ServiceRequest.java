package st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ServiceRequest {
    String id;
    String serviceName;
    String servicePrice;
    String clinic;
}
