package st.hcmuaf.edu.vn.sche_treatment_project_api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.AppointmentResult;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.AppointmentResultDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.ClinicDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Support;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.AppointmentResultService;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.SupportService;

import java.util.List;

@RestController
@RequestMapping("${api}")
public class AppointmentResultController {
    @Autowired
    AppointmentResultService appointmentResultService;

    @GetMapping("/result/appointment/{appointmentId}")
    public ResponseEntity<AppointmentResultDTO> getResultByAppointmentId(@PathVariable String appointmentId) {
        AppointmentResultDTO appointmentResultDTO = appointmentResultService.getAppointmentResultByAppointment(appointmentId);
        if (appointmentResultDTO == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(appointmentResultDTO, HttpStatus.OK);
    }

    @PostMapping("/doctor-side/result")
    public ResponseEntity<AppointmentResultDTO> createResult(@RequestBody AppointmentResultDTO appointmentResultDTO) {
        AppointmentResultDTO saveAppointmentResultDTO = appointmentResultService.create(appointmentResultDTO);
        if (saveAppointmentResultDTO != null) {
            return new ResponseEntity<>(saveAppointmentResultDTO, HttpStatus.CREATED);
        }
        return new ResponseEntity<>(null, HttpStatus.OK);

    }
}
