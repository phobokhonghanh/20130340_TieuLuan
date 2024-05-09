package st.hcmuaf.edu.vn.sche_treatment_project_api.mapper;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.*;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.MedicalPackage;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.MedicalService;

import java.util.ArrayList;
import java.util.List;

@Component

public class MedicalServiceMapper {
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private SupportMapper supportMapper;

    public List<MedicalServiceDTO> convertListMedicalServiceETD(List<MedicalService> listMedicalServices) {
        List<MedicalServiceDTO> listMedicalServiceDTO = new ArrayList<>();
        MedicalServiceDTO serviceDTO;
        ClinicDTO clinicDTO;
        SupportDTO supportDTO;
        for (MedicalService s : listMedicalServices) {
            serviceDTO = convertMedicalServiceETD(s);
            clinicDTO = modelMapper.map(s.getClinic(), ClinicDTO.class);
            clinicDTO.setMedicalAreaId(modelMapper.map(s.getClinic().getMedicalArea(), MedicalAreaDTO.class));
            serviceDTO.setClinic(clinicDTO);

            supportDTO = supportMapper.convertSupportETD(s.getSupportStatus());
            serviceDTO.setSupportStatusId(supportDTO);

            listMedicalServiceDTO.add(serviceDTO);
        }
        return listMedicalServiceDTO;
    }
    public MedicalServiceDTO convertMedicalServiceETD(MedicalService medicalService) {
        MedicalServiceDTO medicalServiceDTO = modelMapper.map(medicalService, MedicalServiceDTO.class);
        return medicalServiceDTO;
    }
    public MedicalService convertMedicalServiceDTE(MedicalServiceDTO medicalServiceDTO) {
        MedicalService medicalService = modelMapper.map(medicalServiceDTO, MedicalService.class);
        return medicalService;
    }
}
