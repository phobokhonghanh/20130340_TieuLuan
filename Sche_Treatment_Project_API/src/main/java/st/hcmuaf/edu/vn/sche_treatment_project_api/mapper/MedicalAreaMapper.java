package st.hcmuaf.edu.vn.sche_treatment_project_api.mapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import st.hcmuaf.edu.vn.sche_treatment_project_api.mapper.generic.GenericMapper;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.MedicalAreaDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.SupportDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.MedicalArea;

import java.util.ArrayList;
import java.util.List;

@Component

public class MedicalAreaMapper {
    @Autowired
    private GenericMapper genericMapper;

    public List<MedicalAreaDTO> convertListAreaETD(List<MedicalArea> inputs) {
        List<MedicalAreaDTO> output = new ArrayList<>();
        SupportDTO supportDTO;
        for (MedicalArea s : inputs) {
            MedicalAreaDTO medicalAreaDTO = genericMapper.convert(s, MedicalAreaDTO.class);
            supportDTO = genericMapper.convert(s.getSupportStatus(), SupportDTO.class);
            medicalAreaDTO.setSupportStatusId(supportDTO);
            output.add(medicalAreaDTO);
        }
        return output;
    }
}
