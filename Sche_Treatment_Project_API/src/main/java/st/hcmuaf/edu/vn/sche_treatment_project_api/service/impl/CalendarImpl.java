package st.hcmuaf.edu.vn.sche_treatment_project_api.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import st.hcmuaf.edu.vn.sche_treatment_project_api.mapper.CalendarMapper;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Calendar;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.CalendarDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.DoctorDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Doctor;
import st.hcmuaf.edu.vn.sche_treatment_project_api.repository.CalendarRepository;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.CalendarService;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class CalendarImpl implements CalendarService {
    private CalendarRepository calendarRepository;
    private CalendarMapper calendarMapper;

    @Override
    public CalendarDTO createCalendar(CalendarDTO calendarDTO) {
        Calendar calendar = calendarMapper.convertCalendarDTE(calendarDTO);
        calendar.setCreatedAt(LocalDateTime.now());
        calendar.setDoctor(new Doctor(calendarDTO.getAccountId()));
        Calendar saveCalendar = calendarRepository.save(calendar);
        return calendarMapper.convertCalendarETD(saveCalendar);
    }

    @Override
    public List<CalendarDTO> getCalendarDoctor(String doctorId) {
        List<Calendar> calendars = calendarRepository.getCalendarDoctor(doctorId);

        List<CalendarDTO> calendarDTOs = new ArrayList<>();
        for (Calendar calendar : calendars) {
            calendar.setDoctor(new Doctor(calendar.getDoctor().getId()));
            calendarDTOs.add(calendarMapper.convertCalendarETD(calendar));
        }
        return calendarDTOs;
    }

    @Override
    public List<Calendar> getCalendarClinic(String clinicId) {
        return calendarRepository.getCalendarClinic(clinicId);
    }

    @Override
    public CalendarDTO getCalendarById(String calendarId) {
        return calendarMapper.convertCalendarETD(calendarRepository.findById(calendarId).get());
    }


}
