package st.hcmuaf.edu.vn.sche_treatment_project_api.service;

public interface MailService {
    void sendMail(String to, String subject, String text);
}
