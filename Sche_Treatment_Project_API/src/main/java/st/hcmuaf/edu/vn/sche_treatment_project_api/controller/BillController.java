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
import st.hcmuaf.edu.vn.sche_treatment_project_api.response.StatisticalResponse;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.AppointmentService;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.BillService;

import java.util.List;

@RestController
@RequestMapping("${api.v1}")
public class BillController {
    @Autowired
    private BillService billService;

    @ExceptionHandler(DataAccessException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<Object> handleDataAccessException() {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @GetMapping("/bill/appointment/{appointmentId}")
    public ResponseEntity<Bill> getListAppointmentUser(@PathVariable String appointmentId) {
        return ResponseEntity.ok(billService.getBillByAppointmentId(appointmentId));
    }
    @GetMapping("/admin/bill/sum/months")
    public ResponseEntity<List<Double>> getSumBillMonths(@RequestParam(name = "is_pay", defaultValue = "true") boolean is_pay) {
        return ResponseEntity.ok(billService.sumBillMonths(is_pay));
    }
    @GetMapping("/admin/bill/sum/week")
    public ResponseEntity<Double> getSumBillWeek() {
        return ResponseEntity.ok(billService.sumBillWeek());
    }
}
