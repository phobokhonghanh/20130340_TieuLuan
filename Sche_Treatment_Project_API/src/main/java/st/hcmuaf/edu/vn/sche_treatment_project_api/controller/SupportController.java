package st.hcmuaf.edu.vn.sche_treatment_project_api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.MedicalPackage;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Support;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.SupportService;

import java.util.List;

@RestController
@RequestMapping("${api}/support")
public class SupportController {
    @Autowired
    SupportService supportService;

    @ExceptionHandler(DataAccessException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<Object> handleDataAccessException() {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @GetMapping("/allTime")
    public List<Support> getAllTime() {
        return supportService.getAllTime();
    }

    @GetMapping("/allTimeAppointment/{calendarId}")
    public List<Support> getAllTimeAppointment(@PathVariable("calendarId") String calendarId) {
        return supportService.getAllTimeAppointment(calendarId);
    }

    @GetMapping("/{supportId}")
    public Support getSupportById(@PathVariable("supportId") String supportId) {
        return supportService.getSupportById(supportId);
    }

}
