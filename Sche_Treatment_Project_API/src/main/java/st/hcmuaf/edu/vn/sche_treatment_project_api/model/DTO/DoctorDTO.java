package st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Evaluate;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper=false)
public class DoctorDTO extends AccountDTO {
    private String doctorDegree;
    private String doctorRank;
    private String doctorSpecialty;
    private String doctorIntroduce;
    private String doctorExp;
    private String doctorImage;
    private String accountId;
    private List<EvaluateDTO> evaluates;

    public DoctorDTO(String accountId) {
        this.accountId = accountId;
    }
}
