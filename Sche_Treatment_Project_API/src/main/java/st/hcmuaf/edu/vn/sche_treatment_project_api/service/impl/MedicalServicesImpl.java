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
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.MedicalPackageDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.MedicalServiceDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Doctor;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.MedicalPackage;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.MedicalService;
import st.hcmuaf.edu.vn.sche_treatment_project_api.repository.MedicalServicesRepository;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.MedicalServicesService;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor

public class MedicalServicesImpl implements MedicalServicesService {
    MedicalServicesRepository medicalServicesRepository;
    private MedicalServiceMapper medicalServiceMapper;
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<MedicalService> getServicesNotSelected(List<MedicalService> serviceList) {
        List<MedicalService> getAll = medicalServicesRepository.findAll();
        List<MedicalService> result = getAll.stream()
                .filter(item -> !serviceList.stream().map(MedicalService::getId).collect(Collectors.toList()).contains(item.getId()))
                .collect(Collectors.toList());
        return result;
    }

    @Override
    public List<MedicalService> getListServicesArea(String medical_area_id) {
        return medicalServicesRepository.getListServicesArea(medical_area_id);
    }

    @Override
    public Page<MedicalServiceDTO> getListServiceCalendarPageable(Integer pageNo, String sortBy, String filter, String search) {
        // Validate the filter to ensure it's a valid column
        Set<String> validFilters = Set.of("id", "service_name", "service_price"); // replace with actual column names

        // Determine the sort direction
        String sortDirection = sortBy.equalsIgnoreCase("asc") ? "ASC" : "DESC";

        String orderByClause = "";
        if (validFilters.contains(filter)) {
            orderByClause  = " ORDER BY " + filter + " " + sortDirection;
        }

        Pageable pageable = PageRequest.of(pageNo - 1, 5);

        int pageSize = pageable.getPageSize();
        int pageNumber = pageable.getPageNumber();
        int offset = pageSize * pageNumber;

        // Create search condition
        String searchCondition = "";
        if (search != null && !search.trim().isEmpty()) {
            searchCondition = " AND (service_name LIKE :search)";
        }

        // Create the native query string with the ORDER BY clause and search condition
        String queryString = "SELECT * FROM medical_service " +
                "WHERE clinic_id IN (SELECT clinic_id FROM calendar) " +
                "AND support_status_id = 'S1'" +
                searchCondition +
                orderByClause + " LIMIT :limit OFFSET :offset";

        // Create and set up the query
        Query query = entityManager.createNativeQuery(queryString, MedicalService.class);
        query.setParameter("limit", pageSize);
        query.setParameter("offset", offset);
        if (!searchCondition.isEmpty()) {
            query.setParameter("search", "%" + search + "%");
        }

        // Execute the query and get the results
        List<MedicalService> services = query.getResultList();

        // Convert the list of MedicalService entities to MedicalServiceDTO
        List<MedicalServiceDTO> serviceDTOs = medicalServiceMapper.convertListMedicalServiceETD(services);

        // Create a query to count the total number of matching records with the search condition
        String countQueryString = "SELECT COUNT(*) FROM medical_service " +
                "WHERE clinic_id IN (SELECT clinic_id FROM calendar) " +
                "AND support_status_id = 'S1'" +
                searchCondition;
        Query countQuery = entityManager.createNativeQuery(countQueryString);
        if (!searchCondition.isEmpty()) {
            countQuery.setParameter("search", "%" + search + "%");
        }
        Long total = ((Number) countQuery.getSingleResult()).longValue();

        // Return a page of MedicalServiceDTO objects
        return new PageImpl<>(serviceDTOs, pageable, total);
    }

    @Override
    public MedicalServiceDTO createService(MedicalServiceDTO medicalServiceDTO) {
        if (!medicalServicesRepository.existsById(medicalServiceDTO.getId())) {
            if (medicalServicesRepository.existsByServiceName(medicalServiceDTO.getClinic().getId(), medicalServiceDTO.getServiceName()) == 1) {
                return null;
            }
        }
        MedicalService medicalService = medicalServicesRepository.save(medicalServiceMapper.convertMedicalServiceDTE(medicalServiceDTO));
        MedicalServiceDTO saveService = medicalServiceMapper.convertMedicalServiceETD(medicalService);
        return saveService;
    }

    @Override
    public Page<MedicalServiceDTO> getAll(String keyword, Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo - 1, 10);
        Page<MedicalService> medicalServices = medicalServicesRepository.findAllByServiceNameIsContaining(keyword, pageable);
        List<MedicalServiceDTO> medicalServiceDTOs = medicalServiceMapper.convertListMedicalServiceETD(medicalServices.stream().toList());
        return new PageImpl<>(medicalServiceDTOs, pageable, medicalServices.getTotalElements());
    }
}
