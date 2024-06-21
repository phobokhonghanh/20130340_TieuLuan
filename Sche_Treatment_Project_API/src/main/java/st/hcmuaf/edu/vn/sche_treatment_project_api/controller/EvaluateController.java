package st.hcmuaf.edu.vn.sche_treatment_project_api.controller;

import jakarta.persistence.EntityNotFoundException;
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
@RequestMapping("${api}")
public class EvaluateController {
    @Autowired
    EvaluateService evaluateService;

    @GetMapping("/evaluate/appointment/{appointmentId}")
    public ResponseEntity<EvaluateDTO> getEvaluateByAppointmentId(@PathVariable String appointmentId) {
        EvaluateDTO evaluateDTO = evaluateService.getEvaluateByAppointment(appointmentId);
        if (evaluateDTO == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(evaluateDTO, HttpStatus.OK);
    }

    @GetMapping("/evaluate/doctor/{doctorId}")
    public ResponseEntity<Page<EvaluateDTO>> findAllByDoctorId(@RequestParam(name = "page", defaultValue = "1") Integer pageNo, @PathVariable String doctorId) {
        Page<EvaluateDTO> evaluateDTO = evaluateService.getAllByDoctorId(doctorId, pageNo);
        return new ResponseEntity<>(evaluateDTO, HttpStatus.OK);
    }

    @GetMapping("/admin/evaluate")
    public ResponseEntity<Page<EvaluateDTO>> findAll(@RequestParam(name = "page", defaultValue = "1") Integer pageNo, @RequestParam(name = "keyword", defaultValue = "") String keyword) {
        Page<EvaluateDTO> evaluateDTO = evaluateService.getAll(keyword, pageNo);
        return new ResponseEntity<>(evaluateDTO, HttpStatus.OK);
    }

    @DeleteMapping("/admin/evaluate/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable String id) {
        try {
            evaluateService.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); // 204 No Content
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // 404 Not Found
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); // 500 Internal Server Error
        }
    }


    @PostMapping("/evaluate")
    public ResponseEntity<EvaluateDTO> createEvaluate(@RequestBody EvaluateDTO evaluateDTO) {
        EvaluateDTO saveEvaluateDTO = evaluateService.create(evaluateDTO);
        if (saveEvaluateDTO != null) {
            return new ResponseEntity<>(saveEvaluateDTO, HttpStatus.CREATED);
        }
        return new ResponseEntity<>(null, HttpStatus.OK);
    }
}
