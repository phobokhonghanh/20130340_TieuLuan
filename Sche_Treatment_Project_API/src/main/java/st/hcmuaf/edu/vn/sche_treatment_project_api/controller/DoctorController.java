package st.hcmuaf.edu.vn.sche_treatment_project_api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import st.hcmuaf.edu.vn.sche_treatment_project_api.Utils.MessageUtils;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Account;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.AccountDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.DoctorDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.PatientDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.SupportDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Doctor;
import st.hcmuaf.edu.vn.sche_treatment_project_api.response.doctor.DoctorResponse;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.AccountService;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.DoctorService;

import java.util.List;

@RestController
@RequestMapping("${api}")
public class DoctorController {
    @Autowired
    DoctorService doctorService;
    @Autowired
    AccountService accountService;
    @GetMapping("/doctor/all")
    public List<Account> getAllDoctor() {
        return accountService.findAllByRoleAndStatus(SupportDTO.STATUS_ROLE_DOCTOR, SupportDTO.STATUS_UNLOCK);
    }
    @GetMapping("/doctor/active")
    public List<DoctorResponse> getAllDoctorActive() {
        return doctorService.getAllByStatusAndRole(SupportDTO.STATUS_UNLOCK, SupportDTO.STATUS_ROLE_DOCTOR);
    }

    @GetMapping("/doctor/slides")
    public List<DoctorDTO> getListDoctorLimit() {
        return doctorService.getListDoctorLimit();
    }

    @GetMapping("/doctor/calendar")
    public ResponseEntity<Page<DoctorDTO>> getListDoctorCalendarPageable(
            @RequestParam(name = "page", defaultValue = "1") Integer pageNo,
            @RequestParam(name = "sort", required = false, defaultValue = "asc") String sortBy,
            @RequestParam(name = "filter", required = false, defaultValue = "id") String filter,
            @RequestParam(name = "search", required = false, defaultValue = "") String keyword
    ) {
        Page<DoctorDTO> doctors = doctorService.getListDoctorCalendarPageable(pageNo, sortBy, filter, keyword);
        return ResponseEntity.ok(doctors);
    }

    @PutMapping("/doctor-side/doctor/update")
    public ResponseEntity updateAccount(@RequestBody DoctorDTO doctorDTO) {
        if (doctorService.updateDoctor(doctorDTO)) {
            return new ResponseEntity(HttpStatus.OK);
        }
        return new ResponseEntity(MessageUtils.MESSAGE_ACCOUNT_NOT_EXISTS, HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/doctor/calendar/{calendarId}")
    public DoctorDTO getDoctorByIdCalendar(@PathVariable("calendarId") String calendarId) {
        return doctorService.getDoctorByIdCalendar(calendarId);
    }

    @GetMapping("/doctor/{accountId}")
    public ResponseEntity<DoctorDTO> getPatientById(@PathVariable("accountId") String accountId) {
        AccountDTO account = doctorService.getDoctor(accountId);
        if (account != null)
            return new ResponseEntity(account, HttpStatus.OK);
        return new ResponseEntity(MessageUtils.MESSAGE_ACCOUNT_NOT_EXISTS, HttpStatus.BAD_REQUEST);
    }
}
