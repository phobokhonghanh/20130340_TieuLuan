package st.hcmuaf.edu.vn.sche_treatment_project_api.service;

import org.springframework.data.domain.Page;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.AccountDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.DoctorDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Doctor;

import java.util.List;

public interface DoctorService {
    public List<Doctor> getAll();

    //    public List<Doctor> getListDoctorClinic(String clinicId);
    List<DoctorDTO> getListDoctorLimit();

    Page<DoctorDTO> getListDoctorCalendarPageable(Integer pageNo);
    DoctorDTO getDoctorByIdCalendar(String idCalendar);


}
