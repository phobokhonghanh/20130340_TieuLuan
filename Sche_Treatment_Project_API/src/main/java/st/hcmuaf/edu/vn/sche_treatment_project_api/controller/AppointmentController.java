package st.hcmuaf.edu.vn.sche_treatment_project_api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Appointment;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Bill;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.AppointmentDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.CalendarDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.MedicalPackageDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.MedicalService;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.AppointmentService;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.BillService;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.CalendarService;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("${api.v1}")
public class AppointmentController {
    @Autowired
    private AppointmentService appointmentService;
    @Autowired
    private BillService billService;

    @ExceptionHandler(DataAccessException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<Object> handleDataAccessException() {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @PostMapping("/appointment")
    public ResponseEntity<Bill> createAppointment(@RequestBody AppointmentDTO appointmentDTO) {
        boolean createAppointment = appointmentService.createAppointment(appointmentDTO);
        if (createAppointment) {
            Bill createBill = billService.createBill(appointmentDTO);
            if (createBill != null) {
                return new ResponseEntity<>(createBill, HttpStatus.CREATED);
            }
        }
        return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }
    @PatchMapping("/appointment/status/{appointmentId}")
    public ResponseEntity<?> updateAppointmentStatus(@PathVariable String appointmentId) {
        appointmentService.updateStatus(appointmentId,"S4");
        return ResponseEntity.ok().build();
    }
    @GetMapping("/appointment/calendar/{calendarId}")
    public List<Appointment> getListAppointmentCalendarId(@PathVariable("calendarId") String calendarId) {
        return appointmentService.getListAppointmentCalendarId(calendarId);
    }

    @GetMapping("/appointment/user/{accountId}")
    public ResponseEntity<Page<AppointmentDTO>> getListAppointmentUser(@PathVariable("accountId") String accountId,
                                                                       @RequestParam(name = "page", defaultValue = "1") Integer pageNo) {
        Page<AppointmentDTO> appointmentDTOs = appointmentService.getListAppointmentUser(accountId, pageNo);
        return ResponseEntity.ok(appointmentDTOs);
    }

    @GetMapping("/admin/appointment")
    public ResponseEntity<Page<AppointmentDTO>> getAll(@RequestParam(name = "keyword", defaultValue = "0") String keyword, @RequestParam(name = "page", defaultValue = "1") Integer pageNo) {
        Page<AppointmentDTO> appointmentDTOs = appointmentService.getAll(keyword, pageNo);
        return ResponseEntity.ok(appointmentDTOs);
    }

    @GetMapping("/appointment/doctor/{accountId}")
    public ResponseEntity<Page<AppointmentDTO>> getListAppointmentDoctor(@PathVariable("accountId") String accountId, @RequestParam(name = "keyword", defaultValue = "0") String keyword,
                                                                         @RequestParam(name = "page", defaultValue = "1") Integer pageNo) {
        Page<AppointmentDTO> appointmentDTOs = appointmentService.getListAppointmentDoctor(accountId, keyword, pageNo);
        return ResponseEntity.ok(appointmentDTOs);
    }
    @GetMapping("/admin/appointment/sum/months")
    public ResponseEntity<List<Double>> getSumAppointmentMonths() {
        return ResponseEntity.ok(appointmentService.sumAppointmentMonths());
    }
    @GetMapping("/admin/appointment/sum/status/months")
    public ResponseEntity<List<Double>> getSumBillMonths(@RequestParam(name = "status", defaultValue = "S4") String status) {
        return ResponseEntity.ok(appointmentService.sumAppointmentStatusMonths(status));
    }
}
