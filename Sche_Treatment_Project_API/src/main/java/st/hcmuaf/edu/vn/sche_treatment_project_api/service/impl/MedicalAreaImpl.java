package st.hcmuaf.edu.vn.sche_treatment_project_api.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import st.hcmuaf.edu.vn.sche_treatment_project_api.mapper.MedicalAreaMapper;
import st.hcmuaf.edu.vn.sche_treatment_project_api.mapper.generic.GenericMapper;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.MedicalAreaDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.MedicalServiceDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.MedicalArea;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.MedicalService;
import st.hcmuaf.edu.vn.sche_treatment_project_api.repository.MedicalAreaRepository;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.MedicalAreaService;

import java.util.List;

@Service
public class MedicalAreaImpl implements MedicalAreaService {
    @Autowired
    MedicalAreaRepository medicalAreaRepository;
    @Autowired
    MedicalAreaMapper medicalAreaMapper;
    @Autowired
    private GenericMapper genericMapper;

    @Override
    public List<MedicalArea> getAll() {
        return medicalAreaRepository.findAll();
    }

    @Override
    public MedicalAreaDTO getAreaById(String areaId) {
        return genericMapper.convert(medicalAreaRepository.findById(areaId).orElse(null), MedicalAreaDTO.class);
    }

    @Override
    public Page<MedicalAreaDTO> getAll(String keyword, Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo - 1, 10);
        Page<MedicalArea> page = medicalAreaRepository.findAllByAreaNameIsContainingIgnoreCase(keyword, pageable);
        List<MedicalAreaDTO> content = medicalAreaMapper.convertListAreaETD(page.getContent());
        return new PageImpl<>(content, pageable, page.getTotalElements());
    }

    @Override
    public MedicalAreaDTO create(MedicalAreaDTO medicalAreaDTO) {
        if (medicalAreaRepository.existsByAreaName(medicalAreaDTO.getId(), medicalAreaDTO.getAreaName()) == 1) {
            return null;
        }
        MedicalArea medicalArea = medicalAreaRepository.save(genericMapper.convert(medicalAreaDTO, MedicalArea.class));
        return genericMapper.convert(medicalArea, MedicalAreaDTO.class);
    }
}
