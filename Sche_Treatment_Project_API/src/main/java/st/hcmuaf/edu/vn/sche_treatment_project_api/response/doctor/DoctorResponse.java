package st.hcmuaf.edu.vn.sche_treatment_project_api.response.doctor;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class DoctorResponse {
    private String id;
    private String accountName;
    private String accountPhone;
    private String accountEmail;
    private boolean accountGender;
    private String doctorDegree;
    private String doctorRank;
    private String doctorSpecialty;
    private String doctorIntroduce;
    private String doctorExp;
    private String doctorImage;
}
