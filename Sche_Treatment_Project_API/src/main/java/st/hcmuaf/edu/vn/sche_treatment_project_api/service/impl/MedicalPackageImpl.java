package st.hcmuaf.edu.vn.sche_treatment_project_api.service.impl;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import st.hcmuaf.edu.vn.sche_treatment_project_api.Utils.Utils;
import st.hcmuaf.edu.vn.sche_treatment_project_api.mapper.MedicalPackageMapper;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.MedicalPackageDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.SupportDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.MedicalPackage;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Support;
import st.hcmuaf.edu.vn.sche_treatment_project_api.repository.MedicalPackageRepository;
import st.hcmuaf.edu.vn.sche_treatment_project_api.response.StatisticalResponse;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.MedicalPackageService;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.Specification.PackageSpecs;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.SupportService;

import java.util.List;
import java.util.Set;

@Service
@AllArgsConstructor
public class MedicalPackageImpl implements MedicalPackageService {
    private MedicalPackageRepository medicalPackageRepository;
    private MedicalPackageMapper medicalPackageMapper;
    private SupportService supportService;
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Page<MedicalPackageDTO> getAll(String keyword, Integer pageNo, String clinicId) {
        Pageable pageable = PageRequest.of(pageNo - 1, 10);
        Specification<MedicalPackage> spec = Specification.where(PackageSpecs.containsTextInField(keyword, "packageName"));
        if (!clinicId.trim().isEmpty()) {
            spec = spec.and(PackageSpecs.joinAttribute(clinicId, "clinic"));
        }
        Page<MedicalPackage> medicalPackages = medicalPackageRepository.findAll(spec, pageable);
        List<MedicalPackageDTO> medicalPackageDTOs = medicalPackageMapper.convertListMedicalPackageETD(medicalPackages.stream().toList());
        medicalPackageDTOs.forEach(medicalPackage -> medicalPackage.setDef(medicalPackage.getId().equals(getPackageDefault().getId())));
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
    public Page<MedicalPackageDTO> getListPackageCalendar(Integer pageNo, String sortBy, String filter, String search) {
        // Validate the filter to ensure it's a valid column
        Set<String> validFilters = Set.of("id", "package_name", "package_price"); // replace with actual column names
        // Determine the sort direction
        String sortDirection = sortBy.equalsIgnoreCase("asc") ? "ASC" : "DESC";

        String orderByClause = "";
        if (validFilters.contains(filter)) {
            orderByClause = " ORDER BY " + filter + " " + sortDirection;
        }
        Pageable pageable = PageRequest.of(pageNo - 1, 5);
        int pageSize = pageable.getPageSize();
        int pageNumber = pageable.getPageNumber();
        int offset = pageSize * pageNumber;

        // Create search condition
        String searchCondition = "";
        if (search != null && !search.trim().isEmpty()) {
            searchCondition = " AND (package_name LIKE :search)";
            offset = 0;
        }

        // Create the native query string with the ORDER BY clause and search condition
        String queryString = "SELECT * FROM medical_package " +
                "WHERE clinic_id IN (SELECT clinic_id FROM calendar WHERE calendar_date >= CURDATE()) and support_status_id = 'S1'" +
                searchCondition +
                orderByClause + " LIMIT :limit OFFSET :offset";

        // Create and set up the query
        Query query = entityManager.createNativeQuery(queryString, MedicalPackage.class);
        query.setParameter("limit", pageSize);
        query.setParameter("offset", offset);
        if (!searchCondition.isEmpty()) {
            query.setParameter("search", "%" + search + "%");
        }

        // Execute the query and get the results
        List<MedicalPackage> medicalPackages = query.getResultList();

        // Convert the list of MedicalPackage entities to MedicalPackageDTO
        List<MedicalPackageDTO> medicalPackageDTOs = medicalPackageMapper.convertListMedicalPackageETD(medicalPackages);

        // Create a query to count the total number of matching records with the search condition
        String countQueryString = "SELECT COUNT(*) FROM medical_package " +
                "WHERE clinic_id IN (SELECT clinic_id FROM calendar WHERE calendar_date >= CURDATE()) and support_status_id = 'S1'" +
                searchCondition;
        Query countQuery = entityManager.createNativeQuery(countQueryString);
        if (!searchCondition.isEmpty()) {
            countQuery.setParameter("search", "%" + search + "%");
        }
        Long total = ((Number) countQuery.getSingleResult()).longValue();

        // Return a page of MedicalPackageDTO objects
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
    public MedicalPackageDTO addPackageDefault(String id) {
        MedicalPackage medicalPackage = medicalPackageRepository.findById(id).orElse(null);
        if (medicalPackage == null || medicalPackage.getSupportStatus().getId().equals(SupportDTO.STATUS_LOCK)) {
            return null;
        }
        Support support = supportService.setPackageDefault(id);
        if (support == null) {
            return null;
        }
        MedicalPackageDTO medicalPackageDTO = medicalPackageMapper.convertMedicalPackageETD(medicalPackage);
        return medicalPackageDTO;
    }

    @Override
    public MedicalPackageDTO createPackage(MedicalPackageDTO medicalPackageDTO) {
        if (medicalPackageRepository.existsByPackageName(medicalPackageDTO.getClinicId().getId(), medicalPackageDTO.getPackageName(), medicalPackageDTO.getId()) == 1) {
            return null;
        }
        MedicalPackage medicalPackage = medicalPackageRepository.save(medicalPackageMapper.convertMedicalPackageDTE(medicalPackageDTO));
        MedicalPackageDTO savePackage = medicalPackageMapper.convertMedicalPackageETD(medicalPackage);
        return savePackage;
    }

    @Override
    public MedicalPackageDTO getPackage(String idPackage) {
        return medicalPackageMapper.convertMedicalPackageETD(medicalPackageRepository.findById(idPackage).get());
    }
    @Override
    public List<Double> sumBillMonthsByPackage(String year,String packageId) {
        Query query = entityManager.createNativeQuery("SELECT EXTRACT(MONTH FROM bill.create_at) AS month, SUM(bill_sum) AS sum " +
                "FROM bill JOIN appointment ON bill.appointment_id = appointment.id " +
                "WHERE bill_ispay = true " +
                "AND EXTRACT(YEAR FROM bill.create_at) = :year " +
                "AND appointment.package_id = :packageId " +
                "GROUP BY month " +
                "ORDER BY month", StatisticalResponse.class);
        query.setParameter("year", Integer.parseInt(year));
        query.setParameter("packageId", packageId);
        List<StatisticalResponse> list = query.getResultList();
        List<Double> listResult = Utils.initializeMonthlySumList();
        for (StatisticalResponse s : list) {
            listResult.set(s.getMonth() - 1, s.getSum());
        }
        return listResult;
    }
    @Override
    public List<Double> countAppointmentMonthsByPackage(String year, String packageId){
        Query query = entityManager.createNativeQuery("SELECT EXTRACT(MONTH FROM bill.create_at) AS month, CAST(COUNT(*) AS double) AS sum " +
                "FROM bill JOIN appointment ON bill.appointment_id = appointment.id " +
                "WHERE " +
                "EXTRACT(YEAR FROM bill.create_at) = :year " +
                "AND appointment.package_id = :packageId " +
                "GROUP BY month " +
                "ORDER BY month", StatisticalResponse.class);
        query.setParameter("year", Integer.parseInt(year));
        query.setParameter("packageId", packageId);
        List<StatisticalResponse> list = query.getResultList();
        List<Double> listResult = Utils.initializeMonthlySumList();
        for (StatisticalResponse s : list) {
            listResult.set(s.getMonth() - 1, s.getSum());
        }
        return listResult;
    }

}
