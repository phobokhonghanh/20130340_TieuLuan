package st.hcmuaf.edu.vn.sche_treatment_project_api.service;


import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.MedicalAreaDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.MedicalServiceDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.MedicalArea;

import java.util.List;
public interface MedicalAreaService {
    List<MedicalArea> getAll();
    MedicalAreaDTO getAreaById(String areaId);
    Page<MedicalAreaDTO> getAll(String keyword, Integer pageNo);
    MedicalAreaDTO create(MedicalAreaDTO medicalAreaDTO);
}
