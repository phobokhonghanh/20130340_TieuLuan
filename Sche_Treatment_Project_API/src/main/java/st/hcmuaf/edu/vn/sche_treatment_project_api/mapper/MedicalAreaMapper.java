package st.hcmuaf.edu.vn.sche_treatment_project_api.mapper;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.ClinicDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.MedicalAreaDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.MedicalPackageDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.MedicalServiceDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.MedicalArea;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.MedicalPackage;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.MedicalService;

import java.util.ArrayList;
import java.util.List;

@Component

public class MedicalAreaMapper {
    @Autowired
    private ModelMapper modelMapper;
    public MedicalAreaDTO convertMedicalAreaETD(MedicalArea medicalArea) {
        MedicalAreaDTO medicalAreaDTO = modelMapper.map(medicalArea, MedicalAreaDTO.class);
        return medicalAreaDTO;
    }
    public MedicalArea convertMedicalAreaDTE(MedicalAreaDTO medicalAreaDTO) {
        MedicalArea medicalArea = modelMapper.map(medicalAreaDTO, MedicalArea.class);
        return medicalArea;
    }
}
