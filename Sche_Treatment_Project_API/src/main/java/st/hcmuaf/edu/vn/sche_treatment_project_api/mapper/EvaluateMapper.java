package st.hcmuaf.edu.vn.sche_treatment_project_api.mapper;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Appointment;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.AppointmentResult;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.AppointmentDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.AppointmentResultDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.EvaluateDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Evaluate;

import java.util.ArrayList;
import java.util.List;

@Component
public class EvaluateMapper {
    @Autowired
    private ModelMapper modelMapper;

    public EvaluateDTO convertEvaluateETD(Evaluate evaluate) {
        if (evaluate == null) {
            return null;
        }
        return modelMapper.map(evaluate, EvaluateDTO.class);
    }

    public Evaluate convertEvaluateDTE(EvaluateDTO evaluateDTO) {
        return modelMapper.map(evaluateDTO, Evaluate.class);
    }

    public List<EvaluateDTO> convertListEvaluateETD(List<Evaluate> evaluates) {
        List<EvaluateDTO> evaluateDTOs = new ArrayList<>();
        for (Evaluate e : evaluates) {
            evaluateDTOs.add(convertEvaluateETD(e));
        }
        return evaluateDTOs;
    }

}
