package st.hcmuaf.edu.vn.sche_treatment_project_api.mapper;

import lombok.Data;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Calendar;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.CalendarDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.GroupTimeDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Doctor;

@Component
public class CalendarMapper {
    @Autowired
    private ModelMapper modelMapper;
    public CalendarDTO convertCalendarETD(Calendar calendar){
        calendar.setDoctor(new Doctor());
        CalendarDTO calendarDTO = modelMapper.map(calendar, CalendarDTO.class);
        return calendarDTO;
    }
    public Calendar convertCalendarDTE(CalendarDTO calendarDTO){
        Calendar calendar = modelMapper.map(calendarDTO, Calendar.class);
        return calendar;
    }

}
