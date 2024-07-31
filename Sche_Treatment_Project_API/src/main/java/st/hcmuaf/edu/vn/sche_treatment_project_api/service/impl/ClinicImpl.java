package st.hcmuaf.edu.vn.sche_treatment_project_api.service.impl;

import lombok.AllArgsConstructor;
import st.hcmuaf.edu.vn.sche_treatment_project_api.mapper.ClinicMapper;
import st.hcmuaf.edu.vn.sche_treatment_project_api.mapper.generic.GenericMapper;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Clinic;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.ClinicDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.repository.ClinicRepository;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.ClinicService;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@AllArgsConstructor
public class ClinicImpl implements ClinicService {
    private ClinicRepository clinicRepository;
    private ClinicMapper clinicMapper;
    private GenericMapper genericMapper;

    @Override
    public ClinicDTO createClinic(ClinicDTO clinicDTO) {
        if (clinicRepository.existsByClinicName(clinicDTO.getMedicalAreaId().getId(), clinicDTO.getClinicName(), clinicDTO.getId()) == 1) {
            return null;
        }
        Clinic clinic = genericMapper.convert(clinicDTO, Clinic.class);
        clinic.setCreatedAt(LocalDateTime.now());
        return genericMapper.convert(clinicRepository.save(clinic), ClinicDTO.class);
    }

    @Override
    public boolean updateClinic(Clinic clinic) {
        if (!clinicRepository.existsById(clinic.getId())) {
            return false;
        }
        clinicRepository.save(clinic);
        return true;
    }

    @Override
    public boolean deleteClinic(String idClinic) {
        if (!clinicRepository.existsById(idClinic)) {
            return false;
        }
        clinicRepository.deleteById(idClinic);
        return true;
    }

    @Override
    public Clinic getClinic(String idClinic) {
        return clinicRepository.findById(idClinic).orElse(null);
    }

    @Override
    public List<ClinicDTO> getAll() {
        List<Clinic> getAll = clinicRepository.findAll();
        return clinicMapper.convertListClinicETD(getAll);
    }

    @Override
    public List<Clinic> getListClinicPackage(String packageId) {
        return clinicRepository.getListClinicPackage(packageId);
    }

    @Override
    public List<Clinic> getListClinicService(String servicesId) {
        return clinicRepository.getListClinicService(servicesId);
    }

    @Override
    public ClinicDTO getClinicByCalendar(String calendarId) {
        return genericMapper.convert(clinicRepository.getClinicByCalendar(calendarId), ClinicDTO.class);
    }

}
