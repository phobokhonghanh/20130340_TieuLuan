package st.hcmuaf.edu.vn.sche_treatment_project_api.service;

import org.springframework.data.domain.Pageable;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.MedicalPackageDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.MedicalPackage;
import org.springframework.data.domain.Page;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Support;

import java.util.List;

public interface MedicalPackageService {
    Page<MedicalPackageDTO> getAll(String keyword,Integer pageNo);

    MedicalPackageDTO getPackageDefault();
    MedicalPackageDTO createPackage(MedicalPackageDTO medicalPackageDTO);
    MedicalPackageDTO getPackage(String idPackage);

    // get package in calendar where area
    List<MedicalPackageDTO> getListPackageLimit();

    List<MedicalPackageDTO> getListPackageCalendar();

    Page<MedicalPackageDTO> getListPackageCalendar(Integer pageNo);
    List<MedicalPackage> getListPackageArea(String medical_area_id);
}
