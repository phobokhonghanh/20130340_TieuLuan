package st.hcmuaf.edu.vn.sche_treatment_project_api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import st.hcmuaf.edu.vn.sche_treatment_project_api.Utils.MessageUtils;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.AccountDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.DoctorDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.PatientDTO;
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
    @PutMapping("/update")
    public ResponseEntity updateAccount(@RequestBody DoctorDTO doctorDTO) {
        if (doctorService.updateDoctor(doctorDTO)) {
            return new ResponseEntity(HttpStatus.OK);
        }
        return new ResponseEntity(MessageUtils.MESSAGE_ACCOUNT_NOT_EXISTS, HttpStatus.BAD_REQUEST);
    }
    @GetMapping("/calendar/{calendarId}")
    public DoctorDTO getDoctorByIdCalendar(@PathVariable("calendarId") String calendarId) {
        return doctorService.getDoctorByIdCalendar(calendarId);
    }
    @GetMapping("/{accountId}")
    public ResponseEntity<DoctorDTO> getPatientById(@PathVariable("accountId") String accountId) {
        AccountDTO account = doctorService.getDoctor(accountId);
        if (account != null)
            return new ResponseEntity(account, HttpStatus.OK);
        return new ResponseEntity(MessageUtils.MESSAGE_ACCOUNT_NOT_EXISTS, HttpStatus.BAD_REQUEST);
    }
}
