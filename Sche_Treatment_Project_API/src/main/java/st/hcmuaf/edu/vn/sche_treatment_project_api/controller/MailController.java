package st.hcmuaf.edu.vn.sche_treatment_project_api.controller;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/mail")
public class MailController {
    public String sendOTP(@RequestBody String em) {
        return em;
    }
}
