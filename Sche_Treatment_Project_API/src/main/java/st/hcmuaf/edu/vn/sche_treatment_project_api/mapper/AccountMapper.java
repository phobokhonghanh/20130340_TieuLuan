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

    // covert account
    public AccountDTO convertAccountETD(Account account) {
        return modelMapper.map(account, AccountDTO.class);
    }

    public List<AccountDTO> convertListAccountETD(List<Account> accounts) {
        List<AccountDTO> listDTO = new ArrayList<>();
        for (Account a : accounts) {
            AccountDTO accountDTO =  convertAccountETD(a);
            accountDTO.setAccountPassword(null);
            accountDTO.setSupportRoleId(a.getSupportRole().getSupportValue());
            accountDTO.setSupportStatusId(a.getSupportStatus().getSupportValue());
            listDTO.add(accountDTO);
        }
        return listDTO;
    }

}
