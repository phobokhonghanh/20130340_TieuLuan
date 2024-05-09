package st.hcmuaf.edu.vn.sche_treatment_project_api.service;

import org.springframework.data.repository.query.Param;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Clinic;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.ClinicDTO;

import java.util.List;

public interface ClinicService {
    ClinicDTO createClinic(ClinicDTO clinicDTO);

    public boolean updateClinic(Clinic clinic);

    public boolean deleteClinic(String idClinic);

    public Clinic getClinic(String idClinic);

    public List<ClinicDTO> getAll();

    /*
     * Lấy danh sách phòng chuyên khoa của gói dịch vụ và dịch vụ
     * tham số truyền vào là id gói dịch vụ hoặc id dịch vụ
     * */
    List<Clinic> getListClinicPackage(String packageId);

    List<Clinic> getListClinicService(String servicesId);
    ClinicDTO getClinicByCalendar(String calendarId);

}
