package st.hcmuaf.edu.vn.sche_treatment_project_api.controller;

import org.springframework.web.bind.annotation.*;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Clinic;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.ClinicService;

import java.util.List;

@RestController
@RequestMapping("/api/clinic")
public class ClinicController {
    ClinicService clinicService;

    public ClinicController(ClinicService clinicService) {
        this.clinicService = clinicService;
    }

    @GetMapping("{clinicId}")
    public Clinic getClinicById(@PathVariable("clinicId") String clinicId) {
        return clinicService.getClinic(clinicId);
    }

    @GetMapping("/all")
    public List<Clinic> getAllClinic() {
        return clinicService.getAll();
    }

    @PostMapping
    public boolean createClinic(@RequestBody Clinic clinic) {
        return clinicService.createClinic(clinic);
    }

    @PutMapping
    public boolean updateClinic(@RequestBody Clinic clinic) {
        return clinicService.updateClinic(clinic);
    }

    @DeleteMapping("{clinicId}")
    public boolean deleteClinicById(@PathVariable("clinicId") String clinicId) {
        return clinicService.deleteClinic(clinicId);
    }
}
