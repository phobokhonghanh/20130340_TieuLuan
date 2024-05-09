package st.hcmuaf.edu.vn.sche_treatment_project_api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.AppointmentResultDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.EvaluateDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.AppointmentResultService;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.EvaluateService;

@RestController
@RequestMapping("/api/evaluate")
public class EvaluateController {
    @Autowired
    EvaluateService evaluateService;

    @ExceptionHandler(DataAccessException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<Object> handleDataAccessException() {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @GetMapping("/appointment/{appointmentId}")
    public ResponseEntity<EvaluateDTO> getEvaluateByAppointmentId(@PathVariable String appointmentId) {
        EvaluateDTO evaluateDTO = evaluateService.getEvaluateByAppointment(appointmentId);
        if (evaluateDTO == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(evaluateDTO, HttpStatus.OK);
    }

    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<Page<EvaluateDTO>> findAllByDoctorId(@RequestParam(name = "page", defaultValue = "1") Integer pageNo, @PathVariable String doctorId) {
        Page<EvaluateDTO> evaluateDTO = evaluateService.getAllByDoctorId(doctorId, pageNo);
        return new ResponseEntity<>(evaluateDTO, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<EvaluateDTO> createEvaluate(@RequestBody EvaluateDTO evaluateDTO) {
        EvaluateDTO saveEvaluateDTO = evaluateService.create(evaluateDTO);
        if (saveEvaluateDTO != null) {
            return new ResponseEntity<>(saveEvaluateDTO, HttpStatus.CREATED);
        }
        return new ResponseEntity<>(null, HttpStatus.OK);

    }
}
