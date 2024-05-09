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
import st.hcmuaf.edu.vn.sche_treatment_project_api.mapper.MedicalPackageMapper;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.MedicalPackageDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.MedicalPackage;
import st.hcmuaf.edu.vn.sche_treatment_project_api.repository.MedicalPackageRepository;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.MedicalPackageService;

import java.util.List;

@Service
@AllArgsConstructor
public class MedicalPackageImpl implements MedicalPackageService {
    private MedicalPackageRepository medicalPackageRepository;
    private MedicalPackageMapper medicalPackageMapper;

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Page<MedicalPackageDTO> getAll(String keyword,Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo - 1, 10);
        Page<MedicalPackage> medicalPackages =  medicalPackageRepository.findAllByPackageNameIsContaining(keyword,pageable);
        List<MedicalPackageDTO> medicalPackageDTOs = medicalPackageMapper.convertListMedicalPackageETD(medicalPackages.stream().toList());
        return new PageImpl<>(medicalPackageDTOs, pageable, medicalPackages.getTotalElements());

    }

    @Override
    public List<MedicalPackage> getListPackageArea(String medical_area_id) {
        return medicalPackageRepository.getListPackageArea(medical_area_id);
    }

    @Override
    public List<MedicalPackageDTO> getListPackageLimit() {
        List<MedicalPackage> medicalPackage = medicalPackageRepository.getListPackageLimit();
        List<MedicalPackageDTO> medicalPackageDTO = medicalPackageMapper.convertListMedicalPackageETD(medicalPackage);
        return medicalPackageDTO;
    }

    @Override
    public Page<MedicalPackageDTO> getListPackageCalendar(Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo - 1, 5);

        int pageSize = pageable.getPageSize();
        int pageNumber = pageable.getPageNumber();
        int offset = pageSize * pageNumber;

        Query query = entityManager.createNativeQuery("SELECT * FROM medical_package WHERE clinic_id IN (SELECT clinic_id FROM calendar WHERE calendar_date >= CURDATE()) LIMIT :limit OFFSET :offset", MedicalPackage.class);
        query.setParameter("limit", pageSize);
        query.setParameter("offset", offset);

        List<MedicalPackage> medicalPackages = query.getResultList();

        List<MedicalPackageDTO> medicalPackageDTOs = medicalPackageMapper.convertListMedicalPackageETD(medicalPackages);
        Query countQuery = entityManager.createNativeQuery("SELECT COUNT(*) FROM medical_package WHERE clinic_id IN (SELECT clinic_id FROM calendar WHERE calendar_date >= CURDATE())");
        Long total = (Long) countQuery.getSingleResult();

        return new PageImpl<>(medicalPackageDTOs, pageable, total);

    }

    @Override
    public List<MedicalPackageDTO> getListPackageCalendar() {
        List<MedicalPackage> medicalPackage = medicalPackageRepository.getListPackageCalendar();
        List<MedicalPackageDTO> medicalPackageDTO = medicalPackageMapper.convertListMedicalPackageETD(medicalPackage);
        return medicalPackageDTO;
    }

    @Override
    public MedicalPackageDTO getPackageDefault() {
        MedicalPackage medicalPackage = medicalPackageRepository.getPackageDefault();
        MedicalPackageDTO medicalPackageDTO = medicalPackageMapper.convertMedicalPackageETD(medicalPackage);
        return medicalPackageDTO;
    }

    @Override
    public MedicalPackageDTO createPackage(MedicalPackageDTO medicalPackageDTO) {
        if(!medicalPackageRepository.existsById(medicalPackageDTO.getId())){
            if (medicalPackageRepository.existsByPackageName(medicalPackageDTO.getClinicId().getId(), medicalPackageDTO.getPackageName()) == 1) {
                return null;
            }
        }
        MedicalPackage medicalPackage = medicalPackageRepository.save(medicalPackageMapper.convertMedicalPackageDTE(medicalPackageDTO));
        MedicalPackageDTO savePackage = medicalPackageMapper.convertMedicalPackageETD(medicalPackage);
        return savePackage;
    }

    @Override
    public MedicalPackageDTO getPackage(String idPackage) {
        return medicalPackageMapper.convertMedicalPackageETD(medicalPackageRepository.findById(idPackage).get());
    }

}
