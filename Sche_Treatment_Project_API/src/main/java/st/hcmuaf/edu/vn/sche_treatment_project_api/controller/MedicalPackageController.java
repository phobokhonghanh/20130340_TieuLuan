package st.hcmuaf.edu.vn.sche_treatment_project_api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.DoctorDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.MedicalPackageDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.MedicalPackage;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.MedicalPackageService;

import java.util.List;

@RestController
@RequestMapping("/api/package")
public class MedicalPackageController {
    @Autowired
    MedicalPackageService medicalPackageService;

    @ExceptionHandler(DataAccessException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<Object> handleDataAccessException() {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @GetMapping("/all")
    public List<MedicalPackage> getAllPackages() {
        return medicalPackageService.getAll();
    }

    @GetMapping("/slides")
    public List<MedicalPackageDTO> getListPackageLimit() {
        return medicalPackageService.getListPackageLimit();
    }

    @GetMapping("/calendar")
    public ResponseEntity<Page<MedicalPackageDTO>> getListPackageCalendar(
            @RequestParam(name = "page", defaultValue = "1") Integer pageNo) {
        Page<MedicalPackageDTO> medicalPackageDTOs = medicalPackageService.getListPackageCalendar(pageNo);
        return ResponseEntity.ok(medicalPackageDTOs);
    }

    @GetMapping("/calendar/list")
    public List<MedicalPackageDTO> getListPackageCalendar() {
        return medicalPackageService.getListPackageCalendar();
    }

    @GetMapping("/area/{medicalAreaId}")
    public List<MedicalPackage> getListPackage(@PathVariable("medicalAreaId") String medicalAreaId) {
        return medicalPackageService.getListPackageArea(medicalAreaId);
    }

    @GetMapping("/default")
    public MedicalPackageDTO getPackageDefault() {
        return medicalPackageService.getPackageDefault();
    }

    @GetMapping("/{packageId}")
    public MedicalPackageDTO getPackageDefault(@PathVariable("packageId") String packageId) {
        return medicalPackageService.getPackage(packageId);
    }
}
