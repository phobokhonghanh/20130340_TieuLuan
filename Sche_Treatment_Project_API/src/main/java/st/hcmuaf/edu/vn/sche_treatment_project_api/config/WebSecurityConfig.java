package st.hcmuaf.edu.vn.sche_treatment_project_api.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.impl.UserDetailServiceImpl;

@Configuration
public class WebSecurityConfig {
    @Autowired
    private UserDetailServiceImpl userDetailsService;
    @Autowired
    private PasswordEncoderConfig passwordEncoderConfig;


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests((authorize) -> authorize
                        .requestMatchers("/api/**").permitAll()
                        .anyRequest().authenticated()
                )
                .csrf(csrf -> csrf
                        .disable());
        return http.build();
    }

    //thiết lập userDetailService với encoder
    @Bean
    public DaoAuthenticationProvider authProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoderConfig.encoder());
        return authProvider;
    }
}
