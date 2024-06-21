package st.hcmuaf.edu.vn.sche_treatment_project_api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Bill;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Clinic;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.ClinicDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.MedicalPackage;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.ClinicService;

import java.util.List;

@RestController
@RequestMapping("${api}")
public class ClinicController {
    @Autowired
    ClinicService clinicService;

    @ExceptionHandler(DataAccessException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<Object> handleDataAccessException() {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    public ClinicController(ClinicService clinicService) {
        this.clinicService = clinicService;
    }

    @GetMapping("/clinic/{clinicId}")
    public Clinic getClinicById(@PathVariable("clinicId") String clinicId) {
        return clinicService.getClinic(clinicId);
    }

    @GetMapping("/clinic/all")
    public List<ClinicDTO> getAllClinic() {
        return clinicService.getAll();
    }

    @GetMapping("/clinic/service/{servicesId}")
    public List<Clinic> getListClinicService(@PathVariable("servicesId") String servicesId) {
        return clinicService.getListClinicService(servicesId);
    }

    @GetMapping("/clinic/package/{packageId}")
    public List<Clinic> getListClinicPackage(@PathVariable("packageId") String packageId) {
        return clinicService.getListClinicPackage(packageId);
    }

    @GetMapping("/clinic/calendar/{calendarId}")
    public ResponseEntity<ClinicDTO> getClinicByCalendar(@PathVariable("calendarId") String calendarId) {
        return new ResponseEntity<>(clinicService.getClinicByCalendar(calendarId), HttpStatus.OK);
    }

    @PostMapping("/admin/clinic")
    public ResponseEntity<ClinicDTO> createClinic(@RequestBody ClinicDTO clinicDTO) {
        ClinicDTO saveClinicDTO = clinicService.createClinic(clinicDTO);
        if (saveClinicDTO != null) {
            return new ResponseEntity<>(saveClinicDTO, HttpStatus.CREATED);
        }
        return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }

    @PutMapping("/admin/clinic")
    public boolean updateClinic(@RequestBody Clinic clinic) {
        return clinicService.updateClinic(clinic);
    }

    @DeleteMapping("/admin/clinic/{clinicId}")
    public boolean deleteClinicById(@PathVariable("clinicId") String clinicId) {
        return clinicService.deleteClinic(clinicId);
    }
}
