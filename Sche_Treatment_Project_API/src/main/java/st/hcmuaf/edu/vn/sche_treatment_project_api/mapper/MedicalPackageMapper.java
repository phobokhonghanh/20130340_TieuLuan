package st.hcmuaf.edu.vn.sche_treatment_project_api.mapper;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.ClinicDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.MedicalAreaDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.MedicalPackageDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.SupportDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.MedicalPackage;

import java.util.ArrayList;
import java.util.List;

@Component

public class MedicalPackageMapper {
    @Autowired
    private ModelMapper modelMapper;
    public List<MedicalPackageDTO> convertListMedicalPackageETD(List<MedicalPackage> listMedicalPackage){
        List<MedicalPackageDTO> listMedicalPackageDTO = new ArrayList<>();
        MedicalPackageDTO medicalPackageDTO;
        ClinicDTO clinicDTO;
        SupportDTO supportDTO;
        for(MedicalPackage m : listMedicalPackage){
            medicalPackageDTO = modelMapper.map(m, MedicalPackageDTO.class);
            supportDTO = modelMapper.map(m.getSupportStatus(), SupportDTO.class);
            clinicDTO = modelMapper.map(m.getClinic(), ClinicDTO.class);
            clinicDTO.setMedicalAreaId(modelMapper.map(m.getClinic().getMedicalArea(), MedicalAreaDTO.class));
            medicalPackageDTO.setClinicId(clinicDTO);
            medicalPackageDTO.setSupportStatusId(supportDTO);
            listMedicalPackageDTO.add(medicalPackageDTO);
        }
        return listMedicalPackageDTO;
    }

    public MedicalPackage convertMedicalPackageDTE(MedicalPackageDTO medicalPackageDTO){
        MedicalPackage medicalPackage = modelMapper.map(medicalPackageDTO, MedicalPackage.class);
        return medicalPackage;
    }
    public MedicalPackageDTO convertMedicalPackageETD(MedicalPackage medicalPackage){
        MedicalPackageDTO packageDTO = modelMapper.map(medicalPackage, MedicalPackageDTO.class);
        return packageDTO;
    }
}
