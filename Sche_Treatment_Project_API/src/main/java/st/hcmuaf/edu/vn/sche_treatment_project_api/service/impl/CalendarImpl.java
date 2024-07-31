package st.hcmuaf.edu.vn.sche_treatment_project_api.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import st.hcmuaf.edu.vn.sche_treatment_project_api.mapper.generic.GenericMapper;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Calendar;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.CalendarDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Doctor;
import st.hcmuaf.edu.vn.sche_treatment_project_api.repository.CalendarRepository;
import st.hcmuaf.edu.vn.sche_treatment_project_api.response.calendar.CalendarResponse;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.CalendarService;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class CalendarImpl implements CalendarService {
    private CalendarRepository calendarRepository;
    private GenericMapper genericMapper;

    @Override
    public CalendarDTO createCalendar(CalendarDTO calendarDTO) {
        Calendar calendar = genericMapper.convert(calendarDTO, Calendar.class);
        calendar.setCreatedAt(LocalDateTime.now());
        calendar.setDoctor(new Doctor(calendarDTO.getAccountId()));
        Calendar saveCalendar = calendarRepository.save(calendar);
        return genericMapper.convert(saveCalendar, CalendarDTO.class);
    }

    @Override
    public List<CalendarDTO> getCalendarDoctor(String doctorId) {
        List<Calendar> calendars = calendarRepository.getCalendarDoctor(doctorId);

        List<CalendarDTO> calendarDTOs = new ArrayList<>();
        for (Calendar calendar : calendars) {
            calendar.setDoctor(new Doctor(calendar.getDoctor().getId()));
            calendarDTOs.add(genericMapper.convert(calendar, CalendarDTO.class));
        }
        return calendarDTOs;
    }

    @Override
    public List<CalendarResponse> getCalendarClinic(String clinicId) {
        List<CalendarResponse> rs = genericMapper.toListConvert(calendarRepository.getCalendarClinic(clinicId), CalendarResponse.class);
        return rs;
    }

    @Override
    public CalendarDTO getCalendarById(String calendarId) {
        return genericMapper.convert(calendarRepository.findById(calendarId).get(), CalendarDTO.class);
    }

    @Override
    public List<CalendarResponse> getAllByClinic(String clinic) {
        List<CalendarResponse> rs = genericMapper.toListConvert(calendarRepository.findAllByClinicId(clinic), CalendarResponse.class);
        return rs;
    }

    @Override
    public boolean delete(String id) {
        // Kiểm tra xem calendar có tồn tại hay không
        if (calendarRepository.existsById(id)) {
            // Kiểm tra xem có appointments liên quan không
            if (calendarRepository.existsByIdAndAppointmentsExist(id) == 0) {
                calendarRepository.deleteById(id);
                return true; // Xóa thành công
            }
        }
        return false; // Không tìm thấy hoặc không xóa được
    }


}
