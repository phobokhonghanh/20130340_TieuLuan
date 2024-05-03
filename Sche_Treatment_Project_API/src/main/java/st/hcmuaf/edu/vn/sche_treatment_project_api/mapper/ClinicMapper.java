package st.hcmuaf.edu.vn.sche_treatment_project_api.mapper;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Bill;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Clinic;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.BillDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.ClinicDTO;

@Component
public class ClinicMapper {
    @Autowired
    private ModelMapper modelMapper;
    public ClinicDTO convertClinicETD(Clinic clinic){
        ClinicDTO clinicDTO = modelMapper.map(clinic, ClinicDTO.class);
        return clinicDTO;
    }
    public Clinic convertClinicDTE(ClinicDTO clinicDTO){
        Clinic bill = modelMapper.map(clinicDTO, Clinic.class);
        return bill;
    }

}
