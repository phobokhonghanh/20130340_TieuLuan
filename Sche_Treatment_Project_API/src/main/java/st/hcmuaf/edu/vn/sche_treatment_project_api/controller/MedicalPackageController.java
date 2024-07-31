package st.hcmuaf.edu.vn.sche_treatment_project_api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import st.hcmuaf.edu.vn.sche_treatment_project_api.Utils.MessageUtils;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.ClinicDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.DoctorDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.MedicalPackageDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.SupportDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.MedicalPackage;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.MedicalPackageService;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.PackageServiceServices;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("${api}")
public class MedicalPackageController {
    @Autowired
    MedicalPackageService medicalPackageService;
    @Autowired
    PackageServiceServices packageServiceServices;

    @GetMapping("/package/all")
    public ResponseEntity<Page<MedicalPackageDTO>> getAllPackages(@RequestParam(name = "keyword", defaultValue = "") String keyword, @RequestParam(name = "page", defaultValue = "1") Integer pageNo, @RequestParam(name = "clinicId", defaultValue = "") String clinicId) {
        Page<MedicalPackageDTO> medicalPackageDTOs = medicalPackageService.getAll(keyword, pageNo,clinicId);
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
        Page<MedicalPackageDTO> medicalPackageDTOs = medicalPackageService.getListPackageCalendar(pageNo, sortBy, filter, keyword);
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
    public ResponseEntity createPackage(@RequestBody MedicalPackageDTO medicalPackageDTO) {
        if(medicalPackageDTO.getSupportStatusId().getId().equals(SupportDTO.STATUS_LOCK) && medicalPackageService.getPackageDefault().getId().equals(medicalPackageDTO.getId())){
            return new ResponseEntity<>("Gói khám mặc định không thể khóa", HttpStatus.BAD_REQUEST);
        }
        MedicalPackageDTO savePackage = medicalPackageService.createPackage(medicalPackageDTO);

        if (savePackage != null) {
            if (medicalPackageDTO.isDef()){
                ResponseEntity response = addPackageDefault(savePackage.getId());
                return response;
            }
            return new ResponseEntity<>(savePackage, HttpStatus.CREATED);
        }
        return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }
    @PatchMapping("/admin/package/default/{id}")
    public ResponseEntity addPackageDefault(@PathVariable String id) {
        MedicalPackageDTO savePackage = medicalPackageService.addPackageDefault(id);
        if (savePackage != null) {
            return new ResponseEntity<>(savePackage, HttpStatus.CREATED);
        }
        return new ResponseEntity<>("Gói khám đã bị khóa, không thể làm mặc định", HttpStatus.BAD_REQUEST);
    }


    @DeleteMapping("/admin/package/packageService/{packageServiceId}")
    public ResponseEntity deleteServicesOfPackage(@PathVariable String packageServiceId) {
        packageServiceServices.delete(packageServiceId);
        return new ResponseEntity(HttpStatus.OK);
    }
    @GetMapping("/admin/package/sum/months")
    public ResponseEntity<List<Double>> getSumBillMonthsByPackage(@RequestParam(name = "year", required = false) String year,@RequestParam(name = "packageId", required = false) String packageId) {
        if (year == null) {
            year = String.valueOf(LocalDate.now().getYear()); // Nếu năm không được cung cấp, sử dụng năm hiện tại
        }
        return ResponseEntity.ok(medicalPackageService.sumBillMonthsByPackage(year,packageId));
    }
    @GetMapping("/admin/package/count/months")
    public ResponseEntity<List<Double>> getCountAppointmentMonthsByPackage(@RequestParam(name = "year", required = false) String year,@RequestParam(name = "packageId", required = false) String packageId) {
        if (year == null) {
            year = String.valueOf(LocalDate.now().getYear()); // Nếu năm không được cung cấp, sử dụng năm hiện tại
        }
        return ResponseEntity.ok(medicalPackageService.countAppointmentMonthsByPackage(year,packageId));
    }
}
