package st.hcmuaf.edu.vn.sche_treatment_project_api.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.SupportDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Support;
import st.hcmuaf.edu.vn.sche_treatment_project_api.repository.SupportRepository;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.SupportService;

import java.util.List;

@Service
public class SupportImpl implements SupportService {
    @Autowired
    SupportRepository supportRepository;

    @Override
    public List<Support> getAllTime() {
        return supportRepository.getAllTime();
    }

    @Override
    public List<Support> getAllTimeAppointment(String calendarId) {
        return supportRepository.getAllTimeAppointment(calendarId);
    }

    @Override
    public Support getSupportById(String supportId) {
        return supportRepository.findById(supportId).get();
    }

    @Override
    public Support setPackageDefault(String id) {
        try {
            Support support = supportRepository.findBySupportInfo(SupportDTO.PACKAGE_DEFAULT);
            support.setSupportValue(id);
            supportRepository.save(support);
            return support;
        }catch (Exception e){
            return null;
        }
    }


}
