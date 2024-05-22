package st.hcmuaf.edu.vn.sche_treatment_project_api.Utils;

import org.springframework.beans.factory.annotation.Value;

public class MessageUtils {
    public static final String MESSAGE_ACCOUNT_NOT_EXISTS = "Tài khoản không tồn tại";
    public static final String MESSAGE_ACCOUNT_NOT_VERIFY = "Tài khoản chưa được xác thực";
    public static final String MESSAGE_EMAIL_OR_PHONE_EXISTS = "Email hoặc số điện thoại đã tồn tại";
    public static final String MESSAGE_ACCOUNT_LOCKED = "Tài khoản bị khóa";
    public static final String MESSAGE_WRONG_PASSWORD = "Sai mật khẩu";
    public static final String MESSAGE_LOGIN_SUCCESS = "LOGIN SUCCESS";
    public static final String MESSAGE_LOGIN_FAILED = "LOGIN FAILED";
    public static final String HOSPITAL = "BỆNH VIỆN ĐA KHOA THỦ ĐỨC";
    public static final String SERVER = "http://localhost:5173";
    public static final String EMAIL_SUBJECT_REGISTER = HOSPITAL + " - Đăng ký tài khoản";
    public static final String EMAIL_CONTENT_REGISTER = "Vui lòng nhập mã OTP để hoàn thành việc đăng ký tài khoản: ";
    public static final String EMAIL_CONTENT_LINK_OTP = "Link để nhập mã OTP: " + SERVER + "/otp/";

}
