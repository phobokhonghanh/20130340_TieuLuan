package st.hcmuaf.edu.vn.sche_treatment_project_api.model;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "account")
public class Account implements UserDetails, OAuth2User {
    @Id
    @Column(name = "id", length = 36, nullable = false)
    private String id;
    @Column(name = "account_email", nullable = false)
    private String accountEmail;
    @Column(name = "account_phone", length = 20, nullable = false)
    private String accountPhone;

    @Column(name = "account_password", length = 100, nullable = false)
    private String accountPassword;

    @Column(name = "account_name", length = 255, nullable = false)
    private String accountName;

    @Column(name = "account_OTP")
    private String accountOTP;

    @Column(name = "account_gender", nullable = false)
    private boolean accountGender;

    @Column(name = "create_at")
    private LocalDateTime createAt;

    @Column(name = "update_at")
    private LocalDateTime updateAt;

    @ManyToOne
    @JoinColumn(name = "support_role_id", referencedColumnName = "id", nullable = false)
    private Support supportRole;

    @ManyToOne
    @JoinColumn(name = "support_status_id", referencedColumnName = "id", nullable = false)
    private Support supportStatus;

    public Account(String id) {
        this.id = id;
    }

    @Override
    public String getName() {
        return accountName;
    }

    @Override
    public Map<String, Object> getAttributes() {
        return null;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<SimpleGrantedAuthority> authorityList = new ArrayList<>();
        authorityList.add(new SimpleGrantedAuthority("ROLE_"+getSupportRole().getSupportValue().toUpperCase()));
        return authorityList;
    }
    @Override
    public String getPassword() {
        return null;
    }

    @Override
    public String getUsername() {
        return accountPhone;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
