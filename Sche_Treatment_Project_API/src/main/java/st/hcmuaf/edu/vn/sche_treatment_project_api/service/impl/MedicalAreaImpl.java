package st.hcmuaf.edu.vn.sche_treatment_project_api.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import st.hcmuaf.edu.vn.sche_treatment_project_api.mapper.MedicalAreaMapper;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.MedicalAreaDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.MedicalArea;
import st.hcmuaf.edu.vn.sche_treatment_project_api.repository.MedicalAreaRepository;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.MedicalAreaService;

import java.util.List;

@Service
public class MedicalAreaImpl implements MedicalAreaService {
    @Autowired
    MedicalAreaRepository medicalAreaRepository;
    @Autowired
    MedicalAreaMapper medicalAreaMapper;

    @Override
    public List<MedicalArea> getAll() {
        return medicalAreaRepository.findAll();
    }

    @Override
    public MedicalAreaDTO getAreaById(String areaId) {
        return medicalAreaMapper.convertMedicalAreaETD(medicalAreaRepository.findById(areaId).get());
    }
}
