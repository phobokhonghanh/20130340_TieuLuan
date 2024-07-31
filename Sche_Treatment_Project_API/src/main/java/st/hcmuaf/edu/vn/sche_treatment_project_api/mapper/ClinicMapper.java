package st.hcmuaf.edu.vn.sche_treatment_project_api.mapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import st.hcmuaf.edu.vn.sche_treatment_project_api.mapper.generic.GenericMapper;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Clinic;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.ClinicDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.MedicalAreaDTO;

import java.util.ArrayList;
import java.util.List;

@Component
public class ClinicMapper {
    @Autowired
    private GenericMapper genericMapper;

    public List<ClinicDTO> convertListClinicETD(List<Clinic> clinics){
        List<ClinicDTO> result = new ArrayList<>();
        ClinicDTO clinicDTO;
        for(Clinic c : clinics){
            clinicDTO = genericMapper.convert(c, ClinicDTO.class);
            clinicDTO.setMedicalAreaId(genericMapper.convert(c.getMedicalArea(), MedicalAreaDTO.class));
            result.add(clinicDTO);
        }
        return result;
    }
}
