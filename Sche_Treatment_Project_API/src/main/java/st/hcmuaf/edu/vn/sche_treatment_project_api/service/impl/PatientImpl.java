package st.hcmuaf.edu.vn.sche_treatment_project_api.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import st.hcmuaf.edu.vn.sche_treatment_project_api.mapper.generic.GenericMapper;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.PatientDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Patient;
import st.hcmuaf.edu.vn.sche_treatment_project_api.repository.PatientRepository;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.PatientService;

import java.util.List;
import java.util.Optional;

@Service
public class PatientImpl implements PatientService {
    @Autowired
    PatientRepository patientRepository;
    @Autowired
    GenericMapper genericMapper;

    @Override
    public boolean createPatient(PatientDTO patientDTO) {
        Patient acc = patientRepository.save(genericMapper.convert(patientDTO, Patient.class));
        return acc != null ? true : false;
    }

    @Override
    public boolean updatePatient(PatientDTO patientDTO) {
        Patient acc = patientRepository.save(genericMapper.convert(patientDTO, Patient.class));
        return acc != null ? true : false;
    }

    @Override
    public boolean updateBHYT(String accountId, String bhyt) {
        Optional<Patient> account = patientRepository.findById(accountId);
        if (account.isPresent()) {
            Patient patient = account.get();
            patient.setPatientBHYT(bhyt);
            patientRepository.save(account.get());
            return true;
        }
        return false;
    }

    @Override
    public void deletePatient(String id) {
        patientRepository.deleteById(id);
    }


    @Override
    public PatientDTO getPatient(String id) {
        return genericMapper.convert(patientRepository.findById(id).get(), PatientDTO.class);

    }

    @Override
    public List<PatientDTO> getAll() {
        return genericMapper.toListConvert(patientRepository.findAll(), PatientDTO.class);
    }


}
