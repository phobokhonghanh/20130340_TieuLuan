package st.hcmuaf.edu.vn.sche_treatment_project_api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.ClinicDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.DoctorDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.MedicalPackageDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.MedicalPackage;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.MedicalPackageService;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.PackageServiceServices;

import java.util.List;

@RestController
@RequestMapping("/api")
public class MedicalPackageController {
    @Autowired
    MedicalPackageService medicalPackageService;
    @Autowired
    PackageServiceServices packageServiceServices;
    @ExceptionHandler(DataAccessException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<Object> handleDataAccessException() {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @GetMapping("/package/all")
    public ResponseEntity<Page<MedicalPackageDTO>> getAllPackages(@RequestParam(name = "keyword", defaultValue = "") String keyword,@RequestParam(name = "page", defaultValue = "1") Integer pageNo) {
        Page<MedicalPackageDTO> medicalPackageDTOs =  medicalPackageService.getAll(keyword,pageNo);
        return ResponseEntity.ok(medicalPackageDTOs);
    }

    @GetMapping("/package/slides")
    public List<MedicalPackageDTO> getListPackageLimit() {
        return medicalPackageService.getListPackageLimit();
    }

    @GetMapping("/package/calendar")
    public ResponseEntity<Page<MedicalPackageDTO>> getListPackageCalendar(
            @RequestParam(name = "page", defaultValue = "1") Integer pageNo,
            @RequestParam(name = "sort", required = false, defaultValue = "asc") String sortBy,
            @RequestParam(name = "filter", required = false, defaultValue = "id") String filter,
            @RequestParam(name = "search", required = false, defaultValue = "") String keyword) {
        Page<MedicalPackageDTO> medicalPackageDTOs = medicalPackageService.getListPackageCalendar(pageNo,sortBy,filter,keyword);
        return ResponseEntity.ok(medicalPackageDTOs);
    }

    @GetMapping("/package/calendar/list")
    public List<MedicalPackageDTO> getListPackageCalendar() {
        return medicalPackageService.getListPackageCalendar();
    }

    @GetMapping("/package/area/{medicalAreaId}")
    public List<MedicalPackage> getListPackage(@PathVariable("medicalAreaId") String medicalAreaId) {
        return medicalPackageService.getListPackageArea(medicalAreaId);
    }

    @GetMapping("/package/default")
    public MedicalPackageDTO getPackageDefault() {
        return medicalPackageService.getPackageDefault();
    }

    @GetMapping("/package/{packageId}")
    public MedicalPackageDTO getPackageDefault(@PathVariable("packageId") String packageId) {
        return medicalPackageService.getPackage(packageId);
    }

    @PostMapping("/admin/package")
    public ResponseEntity<MedicalPackageDTO> createPackage(@RequestBody MedicalPackageDTO medicalPackageDTO) {
        MedicalPackageDTO savePackage = medicalPackageService.createPackage(medicalPackageDTO);
        if (savePackage != null) {
            return new ResponseEntity<>(savePackage, HttpStatus.CREATED);
        }
        return new ResponseEntity<>(null,HttpStatus.OK);
    }
    @DeleteMapping("/admin/package/packageService/{packageServiceId}")
    public ResponseEntity deleteServicesOfPackage(@PathVariable String packageServiceId){
        packageServiceServices.delete(packageServiceId);
        return new ResponseEntity(HttpStatus.OK);
    }
}
