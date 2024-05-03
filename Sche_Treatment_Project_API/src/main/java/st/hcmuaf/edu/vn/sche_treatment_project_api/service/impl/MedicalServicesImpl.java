package st.hcmuaf.edu.vn.sche_treatment_project_api.service.impl;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import st.hcmuaf.edu.vn.sche_treatment_project_api.mapper.MedicalServiceMapper;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.DoctorDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.MedicalServiceDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Doctor;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.MedicalService;
import st.hcmuaf.edu.vn.sche_treatment_project_api.repository.MedicalServicesRepository;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.MedicalServicesService;

import java.util.List;

@Service
@AllArgsConstructor

public class MedicalServicesImpl implements MedicalServicesService {
    MedicalServicesRepository medicalServicesRepository;
    private MedicalServiceMapper medicalServiceMapper;
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<MedicalService> getAll() {
        return medicalServicesRepository.findAll();
    }

    @Override
    public List<MedicalService> getListServicesArea(String medical_area_id) {
        return medicalServicesRepository.getListServicesArea(medical_area_id);
    }

    @Override
    public Page<MedicalServiceDTO> getListServiceCalendarPageable(Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo - 1, 5);

        int pageSize = pageable.getPageSize();
        int pageNumber = pageable.getPageNumber();
        int offset = pageSize * pageNumber;

        Query query = entityManager.createNativeQuery("SELECT * FROM medical_service WHERE clinic_id IN (SELECT clinic_id FROM calendar WHERE calendar_date >= CURDATE()) LIMIT :limit OFFSET :offset", MedicalService.class);
        query.setParameter("limit", pageSize);
        query.setParameter("offset", offset);

        List<MedicalService> services = query.getResultList();

        List<MedicalServiceDTO> serviceDTOs = medicalServiceMapper.convertMedicalServiceETD(services);
        Query countQuery = entityManager.createNativeQuery("SELECT COUNT(*) FROM medical_service WHERE clinic_id IN (SELECT clinic_id FROM calendar WHERE calendar_date >= CURDATE())");
        Long total = (Long) countQuery.getSingleResult();

        return new PageImpl<>(serviceDTOs, pageable, total);
    }
}
