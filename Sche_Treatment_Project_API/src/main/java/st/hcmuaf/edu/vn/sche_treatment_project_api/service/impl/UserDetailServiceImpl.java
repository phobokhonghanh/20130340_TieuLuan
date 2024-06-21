package st.hcmuaf.edu.vn.sche_treatment_project_api.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Account;
import st.hcmuaf.edu.vn.sche_treatment_project_api.repository.AccountRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserDetailServiceImpl implements UserDetailsService {
    @Autowired
    private AccountRepository accountRepository;

    @Override
    public UserDetails loadUserByUsername(String phone) throws UsernameNotFoundException {
        Account userEntity = accountRepository.findByAccountPhoneIgnoreCase(phone);
        //tìm trong dtb xem user có phone đó có tồn tại hay khong
        if (userEntity == null) throw new UsernameNotFoundException(phone + " không tồn tại trong database");
        if (userEntity.getSupportStatus().getId().equalsIgnoreCase("S2")) {
            throw new RuntimeException("[Error] Account locked");
        }
        //tạo grantedAuthority với roleNames tương ứng
        List<GrantedAuthority> grantedAuthorities = new ArrayList<>();
        grantedAuthorities.add(new SimpleGrantedAuthority(userEntity.getSupportRole().getSupportValue()));
        //tao doi tuong userdetail
        UserDetails userDetais = User.withUsername(userEntity.getAccountPhone()).password(userEntity.getAccountPassword()).authorities(grantedAuthorities).build();
        return userDetais;
    }
    public String getCurrentUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            Object principal = authentication.getPrincipal();
            if (principal instanceof UserDetails) {
                return ((UserDetails) principal).getUsername();
            } else {
                return principal.toString();
            }
        }
        return null;
    }
}
