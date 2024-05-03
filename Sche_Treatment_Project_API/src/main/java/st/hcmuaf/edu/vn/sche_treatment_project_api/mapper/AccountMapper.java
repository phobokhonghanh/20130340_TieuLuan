package st.hcmuaf.edu.vn.sche_treatment_project_api.mapper;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Account;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Calendar;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.AccountDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.CalendarDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.DoctorDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.MedicalPackageDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Doctor;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.MedicalPackage;

import java.util.ArrayList;
import java.util.List;

@Component
public class AccountMapper {
    @Autowired
    private ModelMapper modelMapper;
    public DoctorDTO convertDoctorETD(Doctor doctor){
        DoctorDTO doctorDTO = modelMapper.map(doctor, DoctorDTO.class);
        return doctorDTO;
    }
    public Account convertAccountDTE(AccountDTO accountDTO){
        Account account = modelMapper.map(accountDTO, Account.class);
        return account;
    }

    public List<DoctorDTO> convertDoctorETD(List<Doctor> listDoctor){
        List<DoctorDTO> listDoctorDTO = new ArrayList<>();
        for(Doctor d : listDoctor){
            listDoctorDTO.add(modelMapper.map(d, DoctorDTO.class));
        }
        return listDoctorDTO;
    }
    public List<Doctor> convertDoctorDTE(List<DoctorDTO> listDoctorDTO){
        List<Doctor> listDoctor = new ArrayList<>();
        for(DoctorDTO dto : listDoctorDTO){
            listDoctor.add(modelMapper.map(dto, Doctor.class));
        }
        return listDoctor;
    }
}
