package st.hcmuaf.edu.vn.sche_treatment_project_api.mapper;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.*;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.MedicalPackage;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.PackageService;

import java.util.ArrayList;
import java.util.List;

@Component

public class PackageServiceMapper {
    @Autowired
    private ModelMapper modelMapper;
    public PackageService convertMedicalPackageServiceDTE(MedicalPackageServiceDTO medicalPackageServiceDTO){
        PackageService packageService = modelMapper.map(medicalPackageServiceDTO, PackageService.class);
        return packageService;
    }
    public MedicalPackageServiceDTO convertMedicalPackageServiceETD(PackageService packageService){
        MedicalPackageServiceDTO packageServiceDTO = modelMapper.map(packageService, MedicalPackageServiceDTO.class);
        return packageServiceDTO;
    }
}
