package st.hcmuaf.edu.vn.sche_treatment_project_api.constant;

public interface SecurityConstants {
    String[] ADMIN_API_PATHS = {
            "/api/v1/admin"
    };
    String[] DOCTOR_API_PATHS = {
            "/api/v1/doctor-side/**"
    };

    String[] PATIENT_API_PATHS = {
            "/api/v1/account/**",
            "/api/v1/patient/**",
            "/api/v1/result/**",
            "/api/v1/appointment/**",
            "/api/v1/bill/**",
            "/api/v1/clinic/**",
            "/api/v1/images/**",
            "/api/v1/support/**"
    };
    String[] CLIENT_API_PATHS = {
            "/api/v1/doctor/**",
            "/api/v1/evaluate/**",
            "/api/v1/area/**",
            "/api/v1/package/**",
            "/api/v1/service/**",
            "/api/v1/auth/**",
            "/api/v1/payment/**",
            "/api/v1/calendar/**"
    };

    interface Role {
        String ADMIN = "ADMIN";

        String DOCTOR = "DOCTOR";

        String PATIENT = "PATIENT";
    }
}
