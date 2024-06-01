package st.hcmuaf.edu.vn.sche_treatment_project_api.config.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import st.hcmuaf.edu.vn.sche_treatment_project_api.config.token.AuthTokenFilter;
import st.hcmuaf.edu.vn.sche_treatment_project_api.constant.SecurityConstants;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.impl.UserDetailServiceImpl;

@Configuration
public class WebSecurityConfig {
    @Autowired
    private UserDetailServiceImpl userDetailsService;
    @Autowired
    private PasswordEncoderConfig passwordEncoderConfig;

    @Bean
    public AuthTokenFilter authenticationJwAuthTokenFilter() {
        return new AuthTokenFilter();
    }

    //    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http
//                .authorizeHttpRequests((authorize) -> authorize
//                        .requestMatchers("/api/**").permitAll()
//                        .anyRequest().authenticated()
//                )
//                .csrf(csrf -> csrf
//                        .disable());
//        return http.build();
//    }
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests((authorize) -> authorize
                        .requestMatchers(SecurityConstants.CLIENT_API_PATHS)
                        .permitAll()
                        .requestMatchers(SecurityConstants.ADMIN_API_PATHS).hasAnyAuthority(SecurityConstants.Role.ADMIN)
                        .requestMatchers(SecurityConstants.DOCTOR_API_PATHS).hasAnyAuthority(SecurityConstants.Role.DOCTOR,SecurityConstants.Role.ADMIN)
                        .requestMatchers(SecurityConstants.PATIENT_API_PATHS).hasAnyAuthority(SecurityConstants.Role.PATIENT,SecurityConstants.Role.DOCTOR,SecurityConstants.Role.ADMIN)
                        .anyRequest().authenticated()
                )
                .csrf(csrf -> csrf
                        .disable());
        http.addFilterBefore(authenticationJwAuthTokenFilter(), UsernamePasswordAuthenticationFilter.class);
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
