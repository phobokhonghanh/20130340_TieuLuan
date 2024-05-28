package st.hcmuaf.edu.vn.sche_treatment_project_api.mapper;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Bill;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Calendar;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.BillDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.CalendarDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Doctor;

import java.util.ArrayList;
import java.util.List;

@Component
public class BillMapper {
    @Autowired
    private ModelMapper modelMapper;

    public BillDTO convertBillETD(Bill bill) {
        BillDTO billDTO = modelMapper.map(bill, BillDTO.class);
        return billDTO;
    }

    public List<BillDTO> convertListBillETD(List<Bill> bills) {
        List<BillDTO> billDTOList = new ArrayList<>();
        for (Bill billDTO : bills) {
            billDTOList.add(convertBillETD(billDTO));
        }
        return billDTOList;
    }

    public Bill convertBillDTE(BillDTO billDTO) {
        Bill bill = modelMapper.map(billDTO, Bill.class);
        return bill;
    }

}
