package st.hcmuaf.edu.vn.sche_treatment_project_api.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import st.hcmuaf.edu.vn.sche_treatment_project_api.mapper.LogMapper;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Account;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.SupportDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Log;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Support;
import st.hcmuaf.edu.vn.sche_treatment_project_api.repository.AccountRepository;
import st.hcmuaf.edu.vn.sche_treatment_project_api.repository.LogRepository;
import st.hcmuaf.edu.vn.sche_treatment_project_api.response.LogResponse;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.LogService;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.Specification.LogSpecs;

import java.time.LocalDate;
import java.util.List;

@Service
public class LogImpl implements LogService {
    @Autowired
    LogRepository logRepository;
    @Autowired
    LogMapper logMapper;
    @Autowired
    UserDetailServiceImpl userDetailService;
    @Autowired
    AccountRepository accountRepository;
    @Override
    public Page<LogResponse> getAll(String keyword, Integer pageNo, LocalDate date) {
        Pageable pageable = PageRequest.of(pageNo - 1, 10);
        Specification<Log> spec = Specification
                .where(LogSpecs.filter(keyword,date));
        Page content = logRepository.findAll(spec, pageable);
        List<LogResponse> response = logMapper.convertListLogToResponse(content.getContent());
        return new PageImpl<>(response, pageable, content.getTotalElements());
    }
    private Log init(String level){
        Log log = new Log();
        Account account = accountRepository.findByAccountPhoneIgnoreCase(userDetailService.getCurrentUsername());
        log.setAccount(account);
        Support support = new Support();
        support.setId(level);
        log.setSupportLevel(support);
        return log;
    }
    @Override
    public Log error(String content) {
        Log log = init(SupportDTO.LEVEL_DANGER);
        log.setLogContent(content);
        return logRepository.save(log);
    }

    @Override
    public Log warn(String content) {
        Log log = init(SupportDTO.LEVEL_WARNING);
        log.setLogContent(content);
        return logRepository.save(log);
    }


    @Override
    public Log info(String content) {
        Log log = init(SupportDTO.LEVEL_INFO);
        log.setLogContent(content);
        return logRepository.save(log);
    }
}
