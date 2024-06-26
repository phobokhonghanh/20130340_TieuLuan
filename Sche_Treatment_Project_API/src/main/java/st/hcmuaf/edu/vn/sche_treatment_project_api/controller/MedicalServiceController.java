package st.hcmuaf.edu.vn.sche_treatment_project_api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.*;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.MedicalPackage;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.MedicalService;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.MedicalPackageService;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.MedicalServicesService;

import java.util.List;

@RestController
@RequestMapping("${api}")
public class MedicalServiceController {
    @Autowired
    MedicalServicesService medicalServicesService;

    @PostMapping("/admin/service")
    public ResponseEntity<MedicalServiceDTO> createService(@RequestBody MedicalServiceDTO medicalServiceDTO) {
        MedicalServiceDTO saveService = medicalServicesService.createService(medicalServiceDTO);
        if (saveService != null) {
            return new ResponseEntity<>(saveService, HttpStatus.CREATED);
        }
        return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/admin/service/all")
    public ResponseEntity<Page<MedicalServiceDTO>> getAll(@RequestParam(name = "keyword", defaultValue = "") String keyword, @RequestParam(name = "page", defaultValue = "1") Integer pageNo) {
        Page<MedicalServiceDTO> medicalServiceDTOs = medicalServicesService.getAll(keyword, pageNo);
        return ResponseEntity.ok(medicalServiceDTOs);
    }

    @PostMapping("/admin/service/all/select")
    public List<ServiceRequest> getAllServices(@RequestBody List<ServiceRequest> medicalServices) {
        return medicalServicesService.getServicesNotSelected("", "S1", medicalServices);
    }

    @GetMapping("/service/area/{medicalAreaId}")
    public List<MedicalService> getListServices(@PathVariable("medicalAreaId") String medicalAreaId) {
        return medicalServicesService.getListServicesArea(medicalAreaId);
    }

    @GetMapping("/service/calendar")
    public ResponseEntity<Page<MedicalServiceDTO>> getListServiceCalendarPageable(
            @RequestParam(name = "page", defaultValue = "1") Integer pageNo,
            @RequestParam(name = "sort", required = false, defaultValue = "asc") String sortBy,
            @RequestParam(name = "filter", required = false, defaultValue = "id") String filter,
            @RequestParam(name = "search", required = false, defaultValue = "") String keyword) {
        Page<MedicalServiceDTO> serviceDTOs = medicalServicesService.getListServiceCalendarPageable(pageNo, sortBy, filter, keyword);
        return ResponseEntity.ok(serviceDTOs);
    }

}
