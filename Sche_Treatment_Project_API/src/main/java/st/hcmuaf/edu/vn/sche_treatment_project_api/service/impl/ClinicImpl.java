package st.hcmuaf.edu.vn.sche_treatment_project_api.service.impl;

import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Clinic;
import st.hcmuaf.edu.vn.sche_treatment_project_api.repository.ClinicRepository;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.ClinicService;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ClinicImpl implements ClinicService {
    ClinicRepository clinicRepository;

    public ClinicImpl(ClinicRepository clinicRepository) {
        this.clinicRepository = clinicRepository;
    }

    @Override
    public boolean createClinic(Clinic clinic) {
        Clinic cli = clinicRepository.save(clinic);
        return cli!=null ? true:false;
    }

    @Override
    public boolean updateClinic(Clinic clinic) {
        if(!clinicRepository.existsById(clinic.getId())){
            return false;
        }
       clinicRepository.save(clinic);
        return true;
    }

    @Override
    public boolean deleteClinic(String idClinic) {
        if(!clinicRepository.existsById(idClinic)){
            return false;
        }
        clinicRepository.deleteById(idClinic);
        return  true;
    }

    @Override
    public Clinic getClinic(String idClinic) {
        return  clinicRepository.findById(idClinic).get();
    }

    @Override
    public List<Clinic> getAll() {
        return clinicRepository.findAll();
    }
}
