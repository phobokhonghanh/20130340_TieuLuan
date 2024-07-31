package st.hcmuaf.edu.vn.sche_treatment_project_api.service;

import org.springframework.data.domain.Page;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.AccountDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.DoctorDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.PatientDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Doctor;
import st.hcmuaf.edu.vn.sche_treatment_project_api.response.doctor.DoctorResponse;

import java.util.List;

public interface DoctorService {
    List<DoctorResponse> getAllByStatusAndRole(String status,String role);

    boolean updateDoctor(DoctorDTO doctorDTO);

    List<DoctorDTO> getListDoctorLimit();

    Page<DoctorDTO> getListDoctorCalendarPageable(Integer pageNo,String sortBy,String filter,String search);
    DoctorDTO getDoctorByIdCalendar(String idCalendar);
    DoctorDTO getDoctor(String id);

}
