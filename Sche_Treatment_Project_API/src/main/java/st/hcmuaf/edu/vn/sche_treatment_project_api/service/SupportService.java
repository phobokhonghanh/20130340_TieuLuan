package st.hcmuaf.edu.vn.sche_treatment_project_api.service;

import org.springframework.web.bind.annotation.PathVariable;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Support;

import javax.annotation.processing.SupportedOptions;
import java.util.List;

public interface SupportService {
    List<Support> getAllTime();
    List<Support> getAllTimeAppointment(String calendarId);
    Support getSupportById(String supportId);
    Support setPackageDefault(String id);
}
