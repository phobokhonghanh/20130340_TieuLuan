package st.hcmuaf.edu.vn.sche_treatment_project_api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Calendar;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.CalendarDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.CalendarService;

import java.util.List;

@RestController
@RequestMapping("${api}")
public class CalendarController {
    @Autowired
    private CalendarService calendarService;

    @ExceptionHandler(DataAccessException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<Object> handleDataAccessException() {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @PostMapping("/admin/calendar")
    public ResponseEntity<CalendarDTO> createCalendar(@RequestBody CalendarDTO calendarDTO) {
        CalendarDTO saveCalendar = calendarService.createCalendar(calendarDTO);
        return new ResponseEntity<>(saveCalendar, HttpStatus.CREATED);
    }

    @GetMapping("/calendar/{calendarId}")
    public ResponseEntity<CalendarDTO> getCalendarById(@PathVariable("calendarId") String calendarId) {
        CalendarDTO calendarDTOs = calendarService.getCalendarById(calendarId);
        return new ResponseEntity<>(calendarDTOs, HttpStatus.OK);
    }

    @GetMapping("/calendar/doctor/{doctorId}")
    public ResponseEntity<List<CalendarDTO>> getCalendarDoctor(@PathVariable("doctorId") String doctorId) {
        List<CalendarDTO> calendarDTOs = calendarService.getCalendarDoctor(doctorId);
        return new ResponseEntity<>(calendarDTOs, HttpStatus.OK);
    }

    @GetMapping("/calendar/clinic/{clinicId}")
    public List<Calendar> getCalendarClinic(@PathVariable("clinicId") String clinicId) {
        List<Calendar> calendars = calendarService.getCalendarClinic(clinicId);
        return calendars;
    }

}
