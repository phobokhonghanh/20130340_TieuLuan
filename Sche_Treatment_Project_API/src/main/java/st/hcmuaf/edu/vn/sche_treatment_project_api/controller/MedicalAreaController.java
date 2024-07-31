package st.hcmuaf.edu.vn.sche_treatment_project_api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.MedicalAreaDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.MedicalServiceDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.MedicalArea;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.MedicalAreaService;

import java.util.List;

import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("${api}")
public class MedicalAreaController {
    @Autowired
    MedicalAreaService medicalAreaService;

    @GetMapping("/area/all")
    public List<MedicalArea> getAll() {
        return medicalAreaService.getAll();
    }

    @GetMapping("/area/{areaId}")
    public ResponseEntity<MedicalAreaDTO> getByID(@PathVariable String areaId) {
        return new ResponseEntity<>(medicalAreaService.getAreaById(areaId), OK);
    }

    @GetMapping("/admin/area/all")
    public ResponseEntity<Page<MedicalAreaDTO>> getAll(@RequestParam(name = "keyword", defaultValue = "") String keyword, @RequestParam(name = "page", defaultValue = "1") Integer pageNo) {
        Page<MedicalAreaDTO> medicalAreaDTOS = medicalAreaService.getAll(keyword, pageNo);
        return ResponseEntity.ok(medicalAreaDTOS);
    }

    @PostMapping("/admin/area")
    public ResponseEntity<MedicalAreaDTO> create(@RequestBody MedicalAreaDTO medicalAreaDTO) {
        MedicalAreaDTO save = medicalAreaService.create(medicalAreaDTO);
        if (save != null) {
            return new ResponseEntity<>(save, HttpStatus.CREATED);
        }
        return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }
}
