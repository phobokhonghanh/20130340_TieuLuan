package st.hcmuaf.edu.vn.sche_treatment_project_api.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.data.repository.query.Param;
import st.hcmuaf.edu.vn.sche_treatment_project_api.mapper.BillMapper;
import st.hcmuaf.edu.vn.sche_treatment_project_api.mapper.ClinicMapper;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Clinic;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.ClinicDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.MedicalArea;
import st.hcmuaf.edu.vn.sche_treatment_project_api.repository.ClinicRepository;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.ClinicService;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@AllArgsConstructor
public class ClinicImpl implements ClinicService {
    ClinicRepository clinicRepository;
    ClinicMapper clinicMapper;

    @Override
    public ClinicDTO createClinic(ClinicDTO clinicDTO) {
        if (clinicRepository.existsByClinicName(clinicDTO.getMedicalAreaId().getId(), clinicDTO.getClinicName(), clinicDTO.getId()) == 1) {
            return null;

        }
        Clinic clinic = clinicMapper.convertClinicDTE(clinicDTO);
        clinic.setCreatedAt(LocalDateTime.now());
        return clinicMapper.convertClinicETD(clinicRepository.save(clinic));
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
        return clinicRepository.findById(idClinic).get();
    }

    @Override
    public List<ClinicDTO> getAll() {
        List<Clinic> getAll = clinicRepository.findAll();
        List<ClinicDTO> getAllDTO = clinicMapper.convertListClinicETD(getAll);
        return getAllDTO;
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
        return clinicMapper.convertClinicETD(clinicRepository.getClinicByCalendar(calendarId));
    }

}
