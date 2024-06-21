package st.hcmuaf.edu.vn.sche_treatment_project_api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import st.hcmuaf.edu.vn.sche_treatment_project_api.Utils.MessageUtils;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.LogDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Log;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Support;
import st.hcmuaf.edu.vn.sche_treatment_project_api.response.LogResponse;
import st.hcmuaf.edu.vn.sche_treatment_project_api.response.LoginResponse;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.LogService;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.SupportService;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeFormatterBuilder;
import java.util.List;

@RestController
@RequestMapping("${api}/admin/log")
public class LogController {
    @Autowired
    LogService logService;

    @GetMapping("/all")
    public Page<LogResponse> getAllLogs(
            @RequestParam(value = "keyword", required = false) String keyword,
            @RequestParam(value = "page", defaultValue = "1") Integer pageNo,
            @RequestParam(value = "date", required = false) String dateStr) {

        LocalDate date = null;
        if (dateStr != null && !dateStr.isEmpty()) {
            DateTimeFormatter formatter = new DateTimeFormatterBuilder()
                    .appendOptional(DateTimeFormatter.ofPattern("dd-MM-yyyy"))
                    .appendOptional(DateTimeFormatter.ofPattern("yyyy-MM-dd"))
                    .appendOptional(DateTimeFormatter.ofPattern("dd/MM/yyyy"))
                    .appendOptional(DateTimeFormatter.ofPattern("yyyy/MM/dd"))
                    .toFormatter();
            date = LocalDate.parse(dateStr, formatter);
        }
        return logService.getAll(keyword, pageNo, date);
    }
}
