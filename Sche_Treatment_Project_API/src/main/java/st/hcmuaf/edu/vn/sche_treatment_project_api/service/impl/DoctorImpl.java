package st.hcmuaf.edu.vn.sche_treatment_project_api.service.impl;

import org.springframework.stereotype.Service;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Doctor;
import st.hcmuaf.edu.vn.sche_treatment_project_api.repository.DoctorRepository;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.DoctorService;

import java.util.List;
@Service
public class DoctorImpl implements DoctorService {
    DoctorRepository doctorRepository;

    public DoctorImpl(DoctorRepository doctorRepository) {
        this.doctorRepository = doctorRepository;
    }

//    @Override
//    public Doctor getDoctor(String idDoctor) {
//        return doctorRepository.findById(idDoctor).get();
//    }

    @Override
    public List<Doctor> getAll() {
        return doctorRepository.findAll();
    }
}
