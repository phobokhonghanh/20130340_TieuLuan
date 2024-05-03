package st.hcmuaf.edu.vn.sche_treatment_project_api.service;


import org.springframework.stereotype.Service;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.MedicalAreaDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.MedicalArea;

import java.util.List;
public interface MedicalAreaService {
    public List<MedicalArea> getAll();
    MedicalAreaDTO getAreaById(String areaId);
}
