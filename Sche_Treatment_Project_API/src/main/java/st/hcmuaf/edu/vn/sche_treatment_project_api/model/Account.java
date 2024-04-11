package st.hcmuaf.edu.vn.sche_treatment_project_api.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@NoArgsConstructor
@Data
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "account")
public class Account {
    @Id
    @Column(name = "id", length = 36, nullable = false)
    private String id;

    @Column(name = "account_phone", length = 20, nullable = false)
    private String accountPhone;

    @Column(name = "account_password", length = 100, nullable = false)
    private String accountPassword;

    @Column(name = "account_name", length = 255, nullable = false)
    private String accountName;

    @Column(name = "account_gender", nullable = false)
    private Boolean accountGender;

    @Column(name = "create_at", nullable = false, updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime createAt;

    @Column(name = "update_at", nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
    private LocalDateTime updateAt;

    @ManyToOne
    @JoinColumn(name = "support_role_id", referencedColumnName = "id", nullable = false)
    private Support supportRole;

    @ManyToOne
    @JoinColumn(name = "support_status_id", referencedColumnName = "id", nullable = false)
    private Support supportStatus;

    public Account(String id, String accountPhone, String accountPassword, String accountName, Boolean accountGender, LocalDateTime createAt, LocalDateTime updateAt, Support supportRole, Support supportStatus) {
        this.id = id;
        this.accountPhone = accountPhone;
        this.accountPassword = accountPassword;
        this.accountName = accountName;
        this.accountGender = accountGender;
        this.createAt = createAt;
        this.updateAt = updateAt;
        this.supportRole = supportRole;
        this.supportStatus = supportStatus;
    }
}
