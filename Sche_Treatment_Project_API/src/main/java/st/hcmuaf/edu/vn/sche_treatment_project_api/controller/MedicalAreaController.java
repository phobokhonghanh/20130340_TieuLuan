package st.hcmuaf.edu.vn.sche_treatment_project_api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.MedicalAreaDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.MedicalArea;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.MedicalAreaService;

import java.util.List;

import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/api/area")
public class MedicalAreaController {
    @Autowired
    MedicalAreaService medicalAreaService;

    @ExceptionHandler(DataAccessException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<Object> handleDataAccessException() {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @GetMapping("/all")
    public List<MedicalArea> getAll() {
        return medicalAreaService.getAll();
    }

    @GetMapping("/{areaId}")
    public ResponseEntity<MedicalAreaDTO> getByID(@PathVariable String areaId) {
        return new ResponseEntity<>(medicalAreaService.getAreaById(areaId), OK);
    }

}
