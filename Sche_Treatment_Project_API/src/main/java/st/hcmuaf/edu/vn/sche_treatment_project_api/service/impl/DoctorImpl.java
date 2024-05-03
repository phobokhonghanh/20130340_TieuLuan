package st.hcmuaf.edu.vn.sche_treatment_project_api.service.impl;


import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import st.hcmuaf.edu.vn.sche_treatment_project_api.mapper.AccountMapper;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.AccountDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.DoctorDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Doctor;
import st.hcmuaf.edu.vn.sche_treatment_project_api.repository.DoctorRepository;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.DoctorService;

import java.math.BigInteger;
import java.time.LocalDate;
import java.util.List;


@Service
@AllArgsConstructor
@NoArgsConstructor
public class DoctorImpl implements DoctorService {
    @Autowired
    private DoctorRepository doctorRepository;
    @Autowired
    private AccountMapper accountMapper;
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<Doctor> getAll() {
        return doctorRepository.findAll();
    }

    @Override
    public List<DoctorDTO> getListDoctorLimit() {
        List<Doctor> doctors = doctorRepository.getListDoctorLimit();
        List<DoctorDTO> listDoctorDTO = accountMapper.convertDoctorETD(doctors);
        return listDoctorDTO;
    }

    @Override
    public Page<DoctorDTO> getListDoctorCalendarPageable(Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo-1,5);

        int pageSize = pageable.getPageSize();
        int pageNumber = pageable.getPageNumber();
        int offset = pageSize * pageNumber;

        Query query = entityManager.createNativeQuery("SELECT account.*, doctor.* FROM doctor JOIN account ON doctor.id = account.id WHERE doctor.id IN (SELECT account_id FROM calendar WHERE calendar_date >= CURDATE()) LIMIT :limit OFFSET :offset", Doctor.class);
        query.setParameter("limit", pageSize);
        query.setParameter("offset", offset);

        List<Doctor> doctors = query.getResultList();

        List<DoctorDTO> listDoctorDTO = accountMapper.convertDoctorETD(doctors);
        Query countQuery = entityManager.createNativeQuery("SELECT COUNT(*) FROM doctor JOIN account ON doctor.id = account.id WHERE doctor.id IN (SELECT account_id FROM calendar WHERE calendar_date >= CURDATE())");
        Long total = (Long) countQuery.getSingleResult();

        return new PageImpl<>(listDoctorDTO, pageable, total);
    }

    @Override
    public DoctorDTO getDoctorByIdCalendar(String idCalendar) {
        return accountMapper.convertDoctorETD(doctorRepository.getDoctorbyIdCalendar(idCalendar));
    }

//    @Override
//    public Doctor getDoctor(String idDoctor) {
//        return doctorRepository.findById(idDoctor).get();
//    }

//    @Override
//    public List<Doctor> getListDoctorClinic(String clinicId) {
//        return doctorRepository.getListDoctorClinic(clinicId);
//    }
}
