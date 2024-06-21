package st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
@Data
@NoArgsConstructor
@AllArgsConstructor

public class SupportDTO {
    public static final String STATUS_UNLOCK = "S1";
    public static final String STATUS_LOCK = "S2";
    public static final String STATUS_ACCEPT = "S3";
    public static final String STATUS_CANCEL = "S4";
    public static final String STATUS_VERIFY = "S5";
    public static final String STATUS_ROLE_ADMIN = "R1";
    public static final String STATUS_ROLE_DOCTOR = "R2";
    public static final String STATUS_ROLE_PATIENT = "R4";
    public static final String LEVEL_INFO = "L1";
    public static final String LEVEL_WARNING = "L2";
    public static final String LEVEL_DANGER = "L3";
    private String id;
    private String supportValue;
    private String supportInfo;
    private String idGroupTime;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public SupportDTO(String id) {
        this.id = id;
    }
}
