package st.hcmuaf.edu.vn.sche_treatment_project_api.service;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.DoctorDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.MedicalServiceDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.MedicalService;

import java.util.List;

public interface MedicalServicesService {
    List<MedicalService> getAll();

    List<MedicalService> getListServicesArea(String medicalAreaId);

    Page<MedicalServiceDTO> getListServiceCalendarPageable(Integer pageNo);

}
