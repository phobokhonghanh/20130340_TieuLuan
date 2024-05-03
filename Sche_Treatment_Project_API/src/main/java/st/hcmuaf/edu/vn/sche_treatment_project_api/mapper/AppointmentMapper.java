package st.hcmuaf.edu.vn.sche_treatment_project_api.mapper;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Appointment;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.AppointmentDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.ClinicDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.MedicalAreaDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.MedicalPackageDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.MedicalPackage;

import java.util.ArrayList;
import java.util.List;

@Component
public class AppointmentMapper {
    @Autowired
    private ModelMapper modelMapper;

    public AppointmentDTO convertAppointmentETD(Appointment appointment) {
        AppointmentDTO appointmentDTO = modelMapper.map(appointment, AppointmentDTO.class);
        return appointmentDTO;
    }

    public Appointment convertAppointmentDTE(AppointmentDTO appointmentDTO) {
        Appointment appointment = modelMapper.map(appointmentDTO, Appointment.class);
        return appointment;
    }

    public List<AppointmentDTO> convertListAppointmentETD(List<Appointment> appointments) {
        List<AppointmentDTO> appointmentDTOs = new ArrayList<>();
        for (Appointment a : appointments) {
            appointmentDTOs.add(convertAppointmentETD(a));
        }
        return appointmentDTOs;
    }

}
