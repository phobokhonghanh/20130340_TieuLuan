package st.hcmuaf.edu.vn.sche_treatment_project_api.constant;

import org.springframework.beans.factory.annotation.Value;

public class ApiConstants {
    @Value("${api}")
    private String api;

    public String getApi() {
        return api;
    }
}
