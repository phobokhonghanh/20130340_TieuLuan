package st.hcmuaf.edu.vn.sche_treatment_project_api.service.impl;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import lombok.AllArgsConstructor;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import st.hcmuaf.edu.vn.sche_treatment_project_api.mapper.AppointmentMapper;
import st.hcmuaf.edu.vn.sche_treatment_project_api.mapper.CalendarMapper;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.*;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.AppointmentDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.CalendarDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.MedicalPackageDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.repository.AppointmentRepository;
import st.hcmuaf.edu.vn.sche_treatment_project_api.repository.CalendarRepository;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.AppointmentService;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.CalendarService;

import java.time.LocalDateTime;
import java.util.List;

@Service
@AllArgsConstructor
public class AppointmentImpl implements AppointmentService {
    private AppointmentRepository appointmentRepository;
    private AppointmentMapper appointmentMapper;

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public boolean createAppointment(AppointmentDTO appointmentDTO) {
        if (!appointmentRepository.checkTimeAppointment(appointmentDTO.getCalendarId(), appointmentDTO.getSupportTimeId())) {
            Appointment appointment = appointmentMapper.convertAppointmentDTE(appointmentDTO);
            appointment.setCreatedAt(LocalDateTime.now());
            appointment.setPatient(new Patient(appointmentDTO.getAccountId()));

            MedicalPackage medicalPackage = new MedicalPackage();
            medicalPackage.setId(appointmentDTO.getPackageId());
            appointment.setMedicalPackage(medicalPackage);
            try {
                Appointment saveAppointment = appointmentRepository.save(appointment);
                return saveAppointment != null;
            } catch (DataAccessException ex) {
                return false;
            }
        }
        return false;
    }

    @Override
    public List<Appointment> getListAppointmentCalendarId(String calendarId) {
        return appointmentRepository.getListAppointmentCalendarId(calendarId);
    }

    @Override
    public Page<AppointmentDTO> getListAppointmentUser(String accountId, Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo - 1, 5);

        int pageSize = pageable.getPageSize();
        int pageNumber = pageable.getPageNumber();
        int offset = pageSize * pageNumber;

        Query query = entityManager.createNativeQuery("SELECT appointment.* FROM appointment join calendar " +
                "on appointment.calendar_id = calendar.id WHERE  appointment.account_id = :accountId" +
                " ORDER BY calendar.calendar_date DESC LIMIT :limit OFFSET :offset", Appointment.class);

        query.setParameter("limit", pageSize);
        query.setParameter("offset", offset);
        query.setParameter("accountId", accountId);

        List<Appointment> appointments = query.getResultList();

        List<AppointmentDTO> appointmentDTOs = appointmentMapper.convertListAppointmentETD(appointments);
        Query countQuery = entityManager.createNativeQuery("SELECT COUNT(*) from appointment WHERE account_id = :accountId");
        countQuery.setParameter("accountId", accountId);
        Long total = (Long) countQuery.getSingleResult();

        return new PageImpl<>(appointmentDTOs, pageable, total);
    }

    @Override
    public Page<AppointmentDTO> getListAppointmentDoctor(String accountId, String keyword, Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo - 1, 5);

        int pageSize = pageable.getPageSize();
        int pageNumber = pageable.getPageNumber();
        int offset = pageSize * pageNumber;

        Query query = entityManager.createNativeQuery("SELECT appointment.* FROM appointment join calendar " +
                "on appointment.calendar_id = calendar.id WHERE  calendar.account_id = :accountId and appointment.appointment_phone LIKE CONCAT('%', :keyword, '%') and calendar.calendar_date >= CURRENT_DATE" +
                " ORDER BY calendar.calendar_date DESC LIMIT :limit OFFSET :offset", Appointment.class);

        query.setParameter("limit", pageSize);
        query.setParameter("offset", offset);
        query.setParameter("accountId", accountId);
        query.setParameter("keyword", keyword);

        List<Appointment> appointments = query.getResultList();

        List<AppointmentDTO> appointmentDTOs = appointmentMapper.convertListAppointmentETD(appointments);
        Query countQuery = entityManager.createNativeQuery("SELECT COUNT(*) FROM appointment join calendar on appointment.calendar_id = calendar.id " +
                " WHERE  calendar.account_id = :accountId and appointment.appointment_phone LIKE CONCAT('%', :keyword, '%') and calendar.calendar_date >= CURRENT_DATE");
        countQuery.setParameter("accountId", accountId);
        countQuery.setParameter("keyword", keyword);
        Long total = (Long) countQuery.getSingleResult();

        return new PageImpl<>(appointmentDTOs, pageable, total);
    }

    @Override
    public Page<AppointmentDTO> getAll(String keyword, Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo - 1, 5);
        Page<Appointment> appointments = appointmentRepository.findAllByAppointmentPhoneIsContaining(keyword, pageable);
        long total = appointments.getTotalElements();
        List<AppointmentDTO> appointmentDTOs = appointmentMapper.convertListAppointmentETD(appointments.stream().toList());
        return new PageImpl<>(appointmentDTOs, pageable, total);
    }

    @Override
    public void updateStatus(String appointmentId, String supportStatusId) {
        appointmentRepository.updateAppointmentBySupportStatus(appointmentId,supportStatusId);
    }

}
