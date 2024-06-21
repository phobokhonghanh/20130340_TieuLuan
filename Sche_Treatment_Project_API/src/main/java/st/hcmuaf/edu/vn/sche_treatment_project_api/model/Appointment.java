package st.hcmuaf.edu.vn.sche_treatment_project_api.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "appointment")
public class Appointment extends BaseEntity{

    @Id
    @Column(name = "id", length = 36)
    private String id;

    @Column(name = "appointment_fullname", columnDefinition = "TEXT", nullable = false)
    private String appointmentFullname;
    @Column(name = "appointment_gender")
    private Boolean appointmentGender;

    @Column(name = "appointment_phone", columnDefinition = "TEXT", nullable = false)
    private String appointmentPhone;

    @Column(name = "appointment_bhyt", columnDefinition = "TEXT")
    private String appointmentBhyt;

    @Column(name = "appointment_symptom", columnDefinition = "TEXT")
    private String appointmentSymptom;

//    @Column(name = "create_at", updatable = false, nullable = false)
//    private LocalDateTime createdAt;
//
//    @Column(name = "update_at")
//    private LocalDateTime updatedAt;

    @ManyToOne
    @JoinColumn(name = "account_id")
    private Account account;

    @ManyToOne
    @JoinColumn(name = "package_id")
    private MedicalPackage medicalPackage;

    @ManyToOne
    @JoinColumn(name = "calendar_id")
    private Calendar calendar;

    @ManyToOne
    @JoinColumn(name = "support_status_id")
    private Support supportStatus;

    @ManyToOne
    @JoinColumn(name = "support_time_id")
    private Support supportTime;
}
