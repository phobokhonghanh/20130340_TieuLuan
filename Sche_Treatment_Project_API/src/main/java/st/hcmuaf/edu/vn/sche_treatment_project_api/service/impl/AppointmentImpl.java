package st.hcmuaf.edu.vn.sche_treatment_project_api.service.impl;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import st.hcmuaf.edu.vn.sche_treatment_project_api.Utils.MessageUtils;
import st.hcmuaf.edu.vn.sche_treatment_project_api.mapper.AppointmentMapper;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.*;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.AppointmentDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.SupportDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.repository.AppointmentRepository;
import st.hcmuaf.edu.vn.sche_treatment_project_api.response.StatisticalResponse;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@AllArgsConstructor
public class AppointmentImpl implements AppointmentService {
    private AppointmentRepository appointmentRepository;
    private AppointmentMapper appointmentMapper;
    @Autowired
    private BillService billService;
    private LogService logService;

    @Autowired
    private AccountService accountService;
    @Autowired
    private MailService emailService;
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public boolean createAppointment(AppointmentDTO appointmentDTO) {
        if (!appointmentRepository.checkTimeAppointment(appointmentDTO.getCalendarId(), appointmentDTO.getSupportTimeId())) {
            Appointment appointment = appointmentMapper.convertAppointmentDTE(appointmentDTO);
            appointment.setCreatedAt(LocalDateTime.now());
            Account account = accountService.findById(appointmentDTO.getAccountId());
            appointment.setAccount(account);

            MedicalPackage medicalPackage = new MedicalPackage();
            medicalPackage.setId(appointmentDTO.getPackageId());
            appointment.setMedicalPackage(medicalPackage);
            try {
                Appointment saveAppointment = appointmentRepository.save(appointment);
                if (saveAppointment != null) {
                    Bill createBill = billService.createBill(appointmentDTO);
                    if (createBill != null) {
                        Map<String, Object> attributes = Map.of(
                                "token", appointmentDTO.getId());
                        emailService.sendAppointmentID(account.getAccountEmail(), MessageUtils.EMAIL_SUBJECT_REGISTER_APPOINTMENT, attributes);
                        return true;
                    }
                }
            } catch (DataAccessException ex) {
                System.out.println(ex.getMessage());
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
                "on appointment.calendar_id = calendar.id WHERE  calendar.account_id = :accountId and appointment.id LIKE CONCAT('%', :keyword, '%') and calendar.calendar_date >= (CURRENT_DATE  - INTERVAL 1 DAY)" +
                " ORDER BY calendar.calendar_date DESC LIMIT :limit OFFSET :offset", Appointment.class);

        query.setParameter("limit", pageSize);
        query.setParameter("offset", offset);
        query.setParameter("accountId", accountId);
        query.setParameter("keyword", keyword);

        List<Appointment> appointments = query.getResultList();

        List<AppointmentDTO> appointmentDTOs = appointmentMapper.convertListAppointmentETD(appointments);
        Query countQuery = entityManager.createNativeQuery("SELECT COUNT(*) FROM appointment join calendar on appointment.calendar_id = calendar.id " +
                " WHERE  calendar.account_id = :accountId and appointment.id LIKE CONCAT('%', :keyword, '%') and calendar.calendar_date >= (CURRENT_DATE  - INTERVAL 1 DAY)");
        countQuery.setParameter("accountId", accountId);
        countQuery.setParameter("keyword", keyword);
        Long total = (Long) countQuery.getSingleResult();

        return new PageImpl<>(appointmentDTOs, pageable, total);
    }

    @Override
    public Page<AppointmentDTO> getAll(String keyword, Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo - 1, 5, Sort.by("calendar.calendarDate").descending());
        Page<Appointment> appointments = appointmentRepository.findAllByIdContainingIgnoreCase(keyword, pageable);
        long total = appointments.getTotalElements();
        List<AppointmentDTO> appointmentDTOs = appointmentMapper.convertListAppointmentETD(appointments.stream().toList());
        return new PageImpl<>(appointmentDTOs, pageable, total);
    }

    @Override
    public void updateStatus(String appointmentId, String supportStatusId) {
        appointmentRepository.updateAppointmentBySupportStatus(appointmentId, supportStatusId);
        createAppointmentLog(appointmentId);
    }

    public void createAppointmentLog(String id) {
        Optional<Appointment> appointment = appointmentRepository.findById(id);
        if(appointment.isPresent()){
            String content = "Lịch hẹn - Lịch hẹn có mã: " + appointment.get().getId() + " đã bị hủy";
            logService.info(content);
        }
    }
    @Override
    public List<Double> sumAppointmentMonths() {
        Query query = entityManager.createNativeQuery("SELECT EXTRACT(MONTH FROM create_at) AS month, CAST(COUNT(*) AS double) AS sum FROM appointment GROUP BY month ORDER BY month", StatisticalResponse.class);
        List<StatisticalResponse> list = query.getResultList();
        List<Double> listResult = new ArrayList<>();
        for (int i = 1; i < 13; i++) {
            listResult.add(0.0);
        }
        for (StatisticalResponse s : list) {
            listResult.set(s.getMonth() - 1, s.getSum());
        }
        return listResult;
    }

    @Override
    public List<Double> sumAppointmentStatusMonths(String status) {
        Query query = entityManager.createNativeQuery("SELECT EXTRACT(MONTH FROM create_at) AS month, CAST(COUNT(*) AS double) AS sum FROM appointment WHERE support_status_id = :status GROUP BY month ORDER BY month", StatisticalResponse.class);
        query.setParameter("status", status);
        List<StatisticalResponse> list = query.getResultList();
        List<Double> listResult = new ArrayList<>();
        for (int i = 1; i < 13; i++) {
            listResult.add(0.0);
        }
        for (StatisticalResponse s : list) {
            listResult.set(s.getMonth() - 1, s.getSum());
        }
        return listResult;
    }

}
