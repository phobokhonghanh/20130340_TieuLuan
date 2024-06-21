package st.hcmuaf.edu.vn.sche_treatment_project_api.service;

import org.springframework.data.domain.Page;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Log;
import st.hcmuaf.edu.vn.sche_treatment_project_api.response.LogResponse;

import java.time.LocalDate;
import java.time.LocalDateTime;

public interface LogService {
    Page<LogResponse> getAll(String keyword, Integer pageNo, LocalDate date);

    Log error(String content);
    Log warn(String content);

    Log info(String content);
}
