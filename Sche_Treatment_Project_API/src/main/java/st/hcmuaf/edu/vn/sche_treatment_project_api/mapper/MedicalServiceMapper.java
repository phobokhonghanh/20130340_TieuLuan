package st.hcmuaf.edu.vn.sche_treatment_project_api.mapper;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.ClinicDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.MedicalAreaDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.MedicalPackageDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.MedicalServiceDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.MedicalPackage;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.MedicalService;

import java.util.ArrayList;
import java.util.List;

@Component

public class MedicalServiceMapper {
    @Autowired
    private ModelMapper modelMapper;

    public List<MedicalServiceDTO> convertMedicalServiceETD(List<MedicalService> listMedicalServices) {
        List<MedicalServiceDTO> listMedicalServiceDTO = new ArrayList<>();
        MedicalServiceDTO serviceDTO;
        ClinicDTO clinicDTO;
        for (MedicalService s : listMedicalServices) {
            serviceDTO = modelMapper.map(s, MedicalServiceDTO.class);
            clinicDTO = modelMapper.map(s.getClinic(), ClinicDTO.class);
            clinicDTO.setMedicalAreaId(modelMapper.map(s.getClinic().getMedicalArea(), MedicalAreaDTO.class));
            serviceDTO.setClinicId(clinicDTO);
            listMedicalServiceDTO.add(serviceDTO);
        }
        return listMedicalServiceDTO;
    }

    public MedicalPackage convertMedicalPackageDTE(MedicalPackageDTO medicalPackageDTO) {
        MedicalPackage medicalPackage = modelMapper.map(medicalPackageDTO, MedicalPackage.class);
        return medicalPackage;
    }
}
