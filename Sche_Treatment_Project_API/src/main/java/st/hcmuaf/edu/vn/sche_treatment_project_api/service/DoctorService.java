package st.hcmuaf.edu.vn.sche_treatment_project_api.service;

import org.springframework.data.domain.Page;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.AccountDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.DoctorDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Doctor;

import java.util.List;

public interface DoctorService {
    public List<Doctor> getAll();

    void deleteDoctor(String id);

    List<DoctorDTO> getListDoctorLimit();

    Page<DoctorDTO> getListDoctorCalendarPageable(Integer pageNo);
    DoctorDTO getDoctorByIdCalendar(String idCalendar);
    boolean createDoctor(DoctorDTO doctorDTO);

}
