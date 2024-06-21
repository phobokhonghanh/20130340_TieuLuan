package st.hcmuaf.edu.vn.sche_treatment_project_api.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.io.Serializable;
import java.util.List;

@Entity
@Data
@Table(name = "doctor")
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper=false)
public class Doctor extends Account implements Serializable {
    @Column(name = "doctor_degree", length = 20)
    private String doctorDegree;

    @Column(name = "doctor_rank", length = 20)
    private String doctorRank;

    @Column(name = "doctor_specialty", length = 255)
    private String doctorSpecialty;

    @Column(name = "doctor_introduce", columnDefinition = "TEXT")
    private String doctorIntroduce;

    @Column(name = "doctor_exp", length = 255)
    private String doctorExp;

    @Column(name = "doctor_image", columnDefinition = "TEXT")
    private String doctorImage;

    public Doctor(String id) {
        super(id);
    }
}
