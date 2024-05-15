package st.hcmuaf.edu.vn.sche_treatment_project_api.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import st.hcmuaf.edu.vn.sche_treatment_project_api.mapper.AccountMapper;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Account;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.PatientDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Patient;
import st.hcmuaf.edu.vn.sche_treatment_project_api.repository.AccountRepository;
import st.hcmuaf.edu.vn.sche_treatment_project_api.repository.PatientRepository;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.AccountService;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.PatientService;

import java.util.List;

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
    public void deletePatient(String id) {
        patientRepository.deleteById(id);
    }


//    @Override
//    public PatientDTO getPatient(String idAccount) {
//        return accountMapper.convertPatientETD(patientRepository.findById(idAccount).get());
//    }

    @Override
    public List<PatientDTO> getAll() {
        return accountMapper.convertListPatientETD(patientRepository.findAll());
    }


}
