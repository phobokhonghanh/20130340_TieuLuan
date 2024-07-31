package st.hcmuaf.edu.vn.sche_treatment_project_api.service;

import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Calendar;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.CalendarDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.response.calendar.CalendarResponse;

import java.util.List;

public interface CalendarService {
    CalendarDTO createCalendar(CalendarDTO calendarDTO);
    List<CalendarDTO> getCalendarDoctor (String doctorId);
    List<CalendarResponse> getCalendarClinic(String clinicId);

    CalendarDTO getCalendarById(String calendarId);
    List<CalendarResponse> getAllByClinic(String clinic);
    boolean delete(String id);
}
