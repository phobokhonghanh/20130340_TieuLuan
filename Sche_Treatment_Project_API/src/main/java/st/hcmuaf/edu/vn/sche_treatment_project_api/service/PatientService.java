package st.hcmuaf.edu.vn.sche_treatment_project_api.service;

import org.springframework.stereotype.Service;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Account;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.PatientDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Patient;

import java.util.List;

@Service
public interface PatientService {
    boolean createPatient(PatientDTO patientDTO);
    boolean updatePatient(PatientDTO patientDTO);
    void deletePatient(String id);
    List<PatientDTO> getAll();
}
