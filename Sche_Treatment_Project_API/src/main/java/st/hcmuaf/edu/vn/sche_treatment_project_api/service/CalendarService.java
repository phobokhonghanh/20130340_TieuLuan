package st.hcmuaf.edu.vn.sche_treatment_project_api.service;

import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Calendar;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.CalendarDTO;

import java.util.List;

public interface CalendarService {
    CalendarDTO createCalendar(CalendarDTO calendarDTO);
    List<CalendarDTO> getCalendarDoctor (String doctorId);
    List<Calendar> getCalendarClinic(String clinicId);

    CalendarDTO getCalendarById(String calendarId);
}
