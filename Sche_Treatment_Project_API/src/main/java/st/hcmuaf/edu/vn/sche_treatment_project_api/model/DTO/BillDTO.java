package st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BillDTO {
    private String id;
    private String packagePrice;
    private String billSum;
    private boolean billIspay;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String appointmentId;

   }
