package st.hcmuaf.edu.vn.sche_treatment_project_api.mapper;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Account;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.AccountDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.DoctorDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.PatientDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Doctor;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Patient;

import java.util.ArrayList;
import java.util.List;

@Component
public class AccountMapper {
    @Autowired
    private ModelMapper modelMapper;
    // covert doctor
    public DoctorDTO convertDoctorETD(Doctor doctor){
        DoctorDTO doctorDTO = modelMapper.map(doctor, DoctorDTO.class);
        return doctorDTO;
    }
    public List<DoctorDTO> convertListDoctorETD(List<Doctor> listDoctor){
        List<DoctorDTO> listDoctorDTO = new ArrayList<>();
        for(Doctor d : listDoctor){
            listDoctorDTO.add(convertDoctorETD(d));
        }
        return listDoctorDTO;
    }
    public Doctor convertDoctorDTE(DoctorDTO doctorDTO){
        Doctor doctor = modelMapper.map(doctorDTO, Doctor.class);
        return doctor;
    }
    public List<Doctor> convertListDoctorDTE(List<DoctorDTO> listDoctorDTO){
        List<Doctor> listDoctor = new ArrayList<>();
        for(DoctorDTO dto : listDoctorDTO){
            listDoctor.add(convertDoctorDTE(dto));
        }
        return listDoctor;
    }
    // covert patient
    public PatientDTO convertPatientETD(Patient patient){
        PatientDTO patientDTO = modelMapper.map(patient, PatientDTO.class);
        return patientDTO;
    }
    public List<PatientDTO> convertListPatientETD(List<Patient> patients){
        List<PatientDTO> listPatientDTO = new ArrayList<>();
        for(Patient p : patients){
            listPatientDTO.add(convertPatientETD(p));
        }
        return listPatientDTO;
    }
    public Patient convertPatientDTE(PatientDTO patientDTO){
        Patient patient = modelMapper.map(patientDTO, Patient.class);
        return patient;
    }


    // covert account
    public Account convertAccountDTE(AccountDTO accountDTO){
        Account account = modelMapper.map(accountDTO, Account.class);
        return account;
    }



}
