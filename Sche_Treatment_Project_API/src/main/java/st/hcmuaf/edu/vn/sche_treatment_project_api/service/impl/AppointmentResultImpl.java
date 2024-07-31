package st.hcmuaf.edu.vn.sche_treatment_project_api.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import st.hcmuaf.edu.vn.sche_treatment_project_api.mapper.generic.GenericMapper;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.AppointmentResult;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.AppointmentResultDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.repository.AppointmentResultRepository;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.AppointmentResultService;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.AppointmentService;


@Service
@AllArgsConstructor
public class AppointmentResultImpl implements AppointmentResultService {
    private AppointmentResultRepository appointmentResultRepository;
    private GenericMapper genericMapper;
    private AppointmentService appointmentService;

    @Override
    public AppointmentResultDTO getAppointmentResultByAppointment(String appointmentId) {
        AppointmentResult appointmentResult = appointmentResultRepository.getAppointmentResultByAppointmentId(appointmentId);
        return genericMapper.convert(appointmentResult, AppointmentResultDTO.class);
    }

    @Override
    public AppointmentResultDTO create(AppointmentResultDTO appointmentResultDTO) {
        AppointmentResult appointmentResult = appointmentResultRepository.save(genericMapper.convert(appointmentResultDTO, AppointmentResult.class));
        appointmentService.updateStatus(appointmentResultDTO.getAppointmentId(), "S3");
        return genericMapper.convert(appointmentResult, AppointmentResultDTO.class);
    }

}
