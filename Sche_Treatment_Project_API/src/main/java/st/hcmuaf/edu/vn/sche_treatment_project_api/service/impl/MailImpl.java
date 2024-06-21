package st.hcmuaf.edu.vn.sche_treatment_project_api.service.impl;

import freemarker.template.Configuration;
import freemarker.template.TemplateException;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.MailService;

import java.io.IOException;
import java.io.StringWriter;
import java.util.Map;

@Service
public class MailImpl implements MailService {
    @Autowired
    private JavaMailSender emailSender;
    @Autowired
    private Configuration freemakerConfiguration;

    @Override
    public void sendMail(String to, String subject, String text) {
        try {
            MimeMessage message = emailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(text, true);

            emailSender.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void sendVerificationToken(String toEmail, String subject, Map<String, Object> attributes) {
        String text = getEmailContent("verify-email.ftlh", attributes);
        sendMail(toEmail, subject, text);
    }
    @Override
    public void sendAppointmentID(String toEmail, String subject, Map<String, Object> attributes) {
        String text = getEmailContent("notify-appointment.ftlh", attributes);
        sendMail(toEmail, subject, text);
    }

    private String getEmailContent(String template, Map<String, Object> model) {
        try {
            StringWriter stringWriter = new StringWriter();
            freemakerConfiguration.getTemplate(template).process(model, stringWriter);
            return stringWriter.getBuffer().toString();
        } catch (TemplateException | IOException e) {
            throw new RuntimeException(e);
        }
    }

}
