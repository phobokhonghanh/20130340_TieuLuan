package st.hcmuaf.edu.vn.sche_treatment_project_api.service.impl;


import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import st.hcmuaf.edu.vn.sche_treatment_project_api.mapper.AccountMapper;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.DoctorDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.PatientDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Doctor;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Patient;
import st.hcmuaf.edu.vn.sche_treatment_project_api.repository.DoctorRepository;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.DoctorService;

import java.util.List;
import java.util.Optional;
import java.util.Set;


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
    public boolean updateDoctor(DoctorDTO doctorDTO) {
        Optional<Doctor> doctorOptional = doctorRepository.findById(doctorDTO.getId());
        if (doctorOptional.isPresent()) {
            Doctor doctor = doctorOptional.get();
            doctor.setDoctorExp(doctorDTO.getDoctorExp());
            doctor.setDoctorDegree(doctorDTO.getDoctorDegree());
            doctor.setDoctorImage(doctorDTO.getDoctorImage());
            doctor.setDoctorRank(doctorDTO.getDoctorRank());
            doctor.setDoctorSpecialty(doctorDTO.getDoctorSpecialty());
            doctor.setDoctorIntroduce(doctorDTO.getDoctorIntroduce());
            doctorRepository.save(doctor);
            return true;
        }
        return false;
    }
    @Override
    public List<DoctorDTO> getListDoctorLimit() {
        List<Doctor> doctors = doctorRepository.getListDoctorLimit();
        List<DoctorDTO> listDoctorDTO = accountMapper.convertListDoctorETD(doctors);
        return listDoctorDTO;
    }
    @Override
    public Page<DoctorDTO> getListDoctorCalendarPageable(Integer pageNo, String sortBy, String filter, String search) {
        // Validate the filter to ensure it's a valid column
        Set<String> validFilters = Set.of("id","account_name"); // replace with actual column names
        if (!validFilters.contains(filter)) {
            throw new IllegalArgumentException("Invalid filter column: " + filter);
        }

        // Determine the sort direction
        String sortDirection = sortBy.equalsIgnoreCase("asc") ? "ASC" : "DESC";

        // Construct the ORDER BY clause
        String orderByClause = " ORDER BY account." + filter + " " + sortDirection;

        Pageable pageable = PageRequest.of(pageNo - 1, 5);

        int pageSize = pageable.getPageSize();
        int pageNumber = pageable.getPageNumber();
        int offset = pageSize * pageNumber;

        // Create search condition
        String searchCondition = "";
        if (search != null && !search.trim().isEmpty()) {
            searchCondition = " AND (account.account_name LIKE :search)";
        }

        // Create the native query string with the ORDER BY clause and search condition
        String queryString = "SELECT doctor.*, account.* FROM doctor " +
                "JOIN account ON doctor.id = account.id " +
                "WHERE doctor.id IN (SELECT account_id FROM calendar WHERE calendar_date >= CURDATE())" +
                searchCondition +
                orderByClause + " LIMIT :limit OFFSET :offset";

        // Create and set up the query
        Query query = entityManager.createNativeQuery(queryString, Doctor.class);
        query.setParameter("limit", pageSize);
        query.setParameter("offset", offset);
        if (!searchCondition.isEmpty()) {
            query.setParameter("search", "%" + search + "%");
        }

        // Execute the query and get the results
        List<Doctor> doctors = query.getResultList();

        // Convert the list of Doctor entities to DoctorDTO
        List<DoctorDTO> listDoctorDTO = accountMapper.convertListDoctorETD(doctors);

        // Create a query to count the total number of matching records with the search condition
        String countQueryString = "SELECT COUNT(*) FROM doctor " +
                "JOIN account ON doctor.id = account.id " +
                "WHERE doctor.id IN (SELECT account_id FROM calendar WHERE calendar_date >= CURDATE())" +
                searchCondition;
        Query countQuery = entityManager.createNativeQuery(countQueryString);
        if (!searchCondition.isEmpty()) {
            countQuery.setParameter("search", "%" + search + "%");
        }
        Long total = ((Number) countQuery.getSingleResult()).longValue();

        // Return a page of DoctorDTO objects
        return new PageImpl<>(listDoctorDTO, pageable, total);
    }


    @Override
    public DoctorDTO getDoctorByIdCalendar(String idCalendar) {
        return accountMapper.convertDoctorETD(doctorRepository.getDoctorbyIdCalendar(idCalendar));
    }
    @Override
    public DoctorDTO getDoctor(String id) {
        if(!doctorRepository.findById(id).isPresent()){
            return null;
        }
        return accountMapper.convertDoctorETD(doctorRepository.findById(id).get());
    }

}
