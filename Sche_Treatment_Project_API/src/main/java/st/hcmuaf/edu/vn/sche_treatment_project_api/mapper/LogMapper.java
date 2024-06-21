package st.hcmuaf.edu.vn.sche_treatment_project_api.mapper;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.LogDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.SupportDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Log;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Support;
import st.hcmuaf.edu.vn.sche_treatment_project_api.response.LogResponse;

import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

@Component
public class LogMapper {
    @Autowired
    private ModelMapper modelMapper;

    public LogDTO convertETD(Log log) {
        LogDTO logDTO = modelMapper.map(log, LogDTO.class);
        return logDTO;
    }
    public Log convertDTE(LogDTO logDTO) {
        Log log = modelMapper.map(logDTO, Log.class);
        return log;
    }
    public static LogResponse toLogResponse(Log log) {
        return LogResponse.builder()
                .logContent(log.getLogContent())
                .level(log.getSupportLevel() != null ? log.getSupportLevel().getSupportValue() : null)
                .accountName(log.getAccount() != null ? log.getAccount().getAccountName() + " - " + log.getAccount().getAccountPhone() : null)
                .role(log.getAccount() != null ? log.getAccount().getSupportRole().getSupportValue() : null)
                .createdAt(log.getCreatedAt())
                .build();
    }

    public static List<LogResponse> convertListLogToResponse(List<Log> logs) {
        return logs.stream().map(LogMapper::toLogResponse).collect(Collectors.toList());
    }
}
