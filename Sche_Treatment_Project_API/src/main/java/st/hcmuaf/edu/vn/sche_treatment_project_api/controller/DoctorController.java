package st.hcmuaf.edu.vn.sche_treatment_project_api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.AccountDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.DoctorDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Doctor;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.DoctorService;

import java.util.List;

@RestController
@RequestMapping("/api/doctor")
public class DoctorController {
    @Autowired
    DoctorService doctorService;

    @ExceptionHandler(DataAccessException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<Object> handleDataAccessException() {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @GetMapping("/all")
    public List<Doctor> getAllDoctor() {
        return doctorService.getAll();
    }

    @GetMapping("/slides")
    public List<DoctorDTO> getListDoctorLimit() {
        return doctorService.getListDoctorLimit();
    }

    @GetMapping("/calendar")
    public ResponseEntity<Page<DoctorDTO>> getListDoctorCalendarPageable(
            @RequestParam(name = "page", defaultValue = "1") Integer pageNo) {
        Page<DoctorDTO> doctors = doctorService.getListDoctorCalendarPageable(pageNo);
        return ResponseEntity.ok(doctors);
    }

    @GetMapping("/calendar/{calendarId}")
    public DoctorDTO getDoctorByIdCalendar(@PathVariable("calendarId") String calendarId) {
        return doctorService.getDoctorByIdCalendar(calendarId);
    }
    //    @GetMapping("/clinic/{clinicId}")
//    public List<Doctor> getListDoctorClinic(@PathVariable("clinicId") String clinicId) {
//        return doctorService.getListDoctorClinic(clinicId);
//    }

}
