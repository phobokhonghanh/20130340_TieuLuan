package st.hcmuaf.edu.vn.sche_treatment_project_api.mapper;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Bill;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.BillDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.SupportDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Support;

@Component
public class SupportMapper {
    @Autowired
    private ModelMapper modelMapper;
    public SupportDTO convertSupportETD(Support support){
        SupportDTO supportDTO = modelMapper.map(support, SupportDTO.class);
        return supportDTO;
    }
    public Support convertSupportDTE(SupportDTO supportDTO){
        Support support = modelMapper.map(supportDTO, Support.class);
        return support;
    }

}
