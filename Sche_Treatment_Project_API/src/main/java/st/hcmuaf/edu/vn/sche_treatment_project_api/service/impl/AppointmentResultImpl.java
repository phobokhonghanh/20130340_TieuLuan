package st.hcmuaf.edu.vn.sche_treatment_project_api.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import st.hcmuaf.edu.vn.sche_treatment_project_api.mapper.AppointmentResultMapper;
import st.hcmuaf.edu.vn.sche_treatment_project_api.mapper.BillMapper;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.AppointmentResult;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Bill;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.AppointmentDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.AppointmentResultDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.BillDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.MedicalPackage;
import st.hcmuaf.edu.vn.sche_treatment_project_api.repository.AppointmentResultRepository;
import st.hcmuaf.edu.vn.sche_treatment_project_api.repository.BillRepository;
import st.hcmuaf.edu.vn.sche_treatment_project_api.repository.MedicalPackageRepository;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.AppointmentResultService;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.AppointmentService;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.BillService;

import java.time.LocalDateTime;


@Service
@AllArgsConstructor
public class AppointmentResultImpl implements AppointmentResultService {
    private AppointmentResultRepository appointmentResultRepository;
    private AppointmentResultMapper appointmentResultMapper;

    @Override
    public AppointmentResultDTO getAppointmentResultByAppointment(String appointmentId) {
        AppointmentResult appointmentResult = appointmentResultRepository.getAppointmentResultByAppointmentId(appointmentId);
        return appointmentResultMapper.convertAppointmentResultETD(appointmentResult);
    }

    @Override
    public AppointmentResultDTO create(AppointmentResultDTO appointmentResultDTO) {
        AppointmentResult appointmentResult = appointmentResultRepository.save(appointmentResultMapper.convertAppointmentResultDTE(appointmentResultDTO));
        return appointmentResultMapper.convertAppointmentResultETD(appointmentResult);
    }

}
