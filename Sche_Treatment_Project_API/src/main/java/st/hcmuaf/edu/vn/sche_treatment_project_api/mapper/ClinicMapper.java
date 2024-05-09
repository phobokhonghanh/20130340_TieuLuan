package st.hcmuaf.edu.vn.sche_treatment_project_api.mapper;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Clinic;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.ClinicDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.MedicalAreaDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.MedicalPackageDTO;

import java.util.ArrayList;
import java.util.List;

@Component
public class ClinicMapper {
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private MedicalAreaMapper medicalAreaMapper;
    public ClinicDTO convertClinicETD(Clinic clinic){
        ClinicDTO clinicDTO = modelMapper.map(clinic, ClinicDTO.class);
        return clinicDTO;
    }
    public List<ClinicDTO> convertListClinicETD(List<Clinic> clinics){
        List<ClinicDTO> result = new ArrayList<>();
        ClinicDTO clinicDTO;

        for(Clinic c : clinics){
            clinicDTO = modelMapper.map(c, ClinicDTO.class);
            clinicDTO.setMedicalAreaId(medicalAreaMapper.convertMedicalAreaETD(c.getMedicalArea()));
            result.add(clinicDTO);
        }
        return result;
    }

    public Clinic convertClinicDTE(ClinicDTO clinicDTO){
        Clinic bill = modelMapper.map(clinicDTO, Clinic.class);
        return bill;
    }

}
