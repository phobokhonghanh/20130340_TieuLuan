package st.hcmuaf.edu.vn.sche_treatment_project_api.service;

import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Clinic;

import java.util.List;

public interface ClinicService {
    public boolean createClinic(Clinic clinic);
    public boolean updateClinic(Clinic clinic);
    public boolean deleteClinic(String idClinic);
    public Clinic getClinic(String idClinic);
    public List<Clinic> getAll();
}
