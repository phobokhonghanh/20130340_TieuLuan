package st.hcmuaf.edu.vn.sche_treatment_project_api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.DoctorDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.MedicalServiceDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.MedicalPackage;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.MedicalService;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.MedicalPackageService;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.MedicalServicesService;

import java.util.List;

@RestController
@RequestMapping("/api/service")
public class MedicalServiceController {
    @Autowired
    MedicalServicesService medicalServicesService;

    @ExceptionHandler(DataAccessException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<Object> handleDataAccessException() {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @GetMapping("/all")
    public List<MedicalService> getAllServices() {
        return medicalServicesService.getAll();
    }

    @GetMapping("/area/{medicalAreaId}")
    public List<MedicalService> getListServices(@PathVariable("medicalAreaId") String medicalAreaId) {
        return medicalServicesService.getListServicesArea(medicalAreaId);
    }

    @GetMapping("/calendar")
    public ResponseEntity<Page<MedicalServiceDTO>> getListServiceCalendarPageable(
            @RequestParam(name = "page", defaultValue = "1") Integer pageNo) {
        Page<MedicalServiceDTO> serviceDTOs = medicalServicesService.getListServiceCalendarPageable(pageNo);
        return ResponseEntity.ok(serviceDTOs);
    }

}
