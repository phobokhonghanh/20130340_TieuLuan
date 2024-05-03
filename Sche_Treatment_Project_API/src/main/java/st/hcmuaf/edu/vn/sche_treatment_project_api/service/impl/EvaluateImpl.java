package st.hcmuaf.edu.vn.sche_treatment_project_api.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import st.hcmuaf.edu.vn.sche_treatment_project_api.mapper.AppointmentResultMapper;
import st.hcmuaf.edu.vn.sche_treatment_project_api.mapper.EvaluateMapper;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.AppointmentResult;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.AppointmentDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.AppointmentResultDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.EvaluateDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Evaluate;
import st.hcmuaf.edu.vn.sche_treatment_project_api.repository.AppointmentResultRepository;
import st.hcmuaf.edu.vn.sche_treatment_project_api.repository.EvaluateRepository;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.AppointmentResultService;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.EvaluateService;

import java.util.List;


@Service
@AllArgsConstructor
public class EvaluateImpl implements EvaluateService {
    private EvaluateRepository evaluateRepository;
    private EvaluateMapper evaluateMapper;

    @Override
    public EvaluateDTO getEvaluateByAppointment(String appointmentId) {
        Evaluate evaluate = evaluateRepository.getEvaluateByAppointmentId(appointmentId);
        return evaluateMapper.convertEvaluateETD(evaluate);
    }

    @Override
    public Page<EvaluateDTO> getAllByDoctorId(String doctorId, Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo - 1, 5);

        Page<Evaluate> evaluate = evaluateRepository.findAllByDoctorIdOrderByCreatedAtDesc(doctorId, pageable);
        List<EvaluateDTO> evaluateDTOs = evaluateMapper.convertListEvaluateETD(evaluate.stream().toList());

        return new PageImpl<>(evaluateDTOs, pageable, evaluate.getTotalElements());
    }

    @Override
    public EvaluateDTO create(EvaluateDTO evaluateDTO) {
        Evaluate saveEvaluateDTO = evaluateRepository.save(evaluateMapper.convertEvaluateDTE(evaluateDTO));
        return evaluateMapper.convertEvaluateETD(saveEvaluateDTO);
    }
}
