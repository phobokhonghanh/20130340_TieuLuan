package st.hcmuaf.edu.vn.sche_treatment_project_api.mapper;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.AppointmentResult;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Bill;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.AppointmentResultDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.BillDTO;

@Component
public class AppointmentResultMapper {
    @Autowired
    private ModelMapper modelMapper;
    public AppointmentResultDTO convertAppointmentResultETD(AppointmentResult appointmentResult){
        if(appointmentResult == null) {
            return null;
        }
        AppointmentResultDTO appointmentResultDTO = modelMapper.map(appointmentResult, AppointmentResultDTO.class);
        return appointmentResultDTO;
    }
    public AppointmentResult convertAppointmentResultDTE(AppointmentResultDTO appointmentResultDTO){
        AppointmentResult appointmentResult = modelMapper.map(appointmentResultDTO, AppointmentResult.class);
        return appointmentResult;
    }

}
