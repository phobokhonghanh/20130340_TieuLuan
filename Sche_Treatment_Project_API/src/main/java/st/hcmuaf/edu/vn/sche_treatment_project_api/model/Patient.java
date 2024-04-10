package st.hcmuaf.edu.vn.sche_treatment_project_api.model;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "patient")
@NoArgsConstructor
public class Patient {

    @Column(name = "patient_bhyt", length = 20, nullable = false)
    private String patientBHYT;

    @Id
    @MapsId
    @OneToOne
    @JoinColumn(name = "account_id", referencedColumnName = "id", nullable = false)
    private Account accountId;

    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL)
    private List<Appointment> appointments;

    public Patient(String patientBHYT, Account accountId) {
        this.patientBHYT = patientBHYT;
        this.accountId = accountId;
    }
}
