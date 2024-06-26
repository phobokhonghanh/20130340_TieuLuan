package st.hcmuaf.edu.vn.sche_treatment_project_api.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import st.hcmuaf.edu.vn.sche_treatment_project_api.mapper.AccountMapper;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Account;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.PatientDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.SupportDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Patient;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Support;
import st.hcmuaf.edu.vn.sche_treatment_project_api.repository.AccountRepository;
import st.hcmuaf.edu.vn.sche_treatment_project_api.repository.PatientRepository;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.AccountService;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.PatientService;

import java.util.List;
import java.util.Optional;

@Service
public class PatientImpl implements PatientService {
    @Autowired
    PatientRepository patientRepository;
    @Autowired

    private AccountMapper accountMapper;

    @Override
    public boolean createPatient(PatientDTO patientDTO) {
        Patient acc = patientRepository.save(accountMapper.convertPatientDTE(patientDTO));
        return acc != null ? true : false;
    }

    @Override
    public boolean updatePatient(PatientDTO patientDTO) {
        Patient acc = patientRepository.save(accountMapper.convertPatientDTE(patientDTO));
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
        return accountMapper.convertPatientETD(patientRepository.findById(id).get());
    }

    @Override
    public List<PatientDTO> getAll() {
        return accountMapper.convertListPatientETD(patientRepository.findAll());
    }


}
