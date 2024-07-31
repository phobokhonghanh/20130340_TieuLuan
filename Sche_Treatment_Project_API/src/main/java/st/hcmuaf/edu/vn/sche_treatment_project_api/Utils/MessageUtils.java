package st.hcmuaf.edu.vn.sche_treatment_project_api.Utils;

import org.springframework.beans.factory.annotation.Value;

public class MessageUtils {
    public static final String MESSAGE_ACCOUNT_NOT_EXISTS = "Tài khoản không tồn tại";
    public static final String MESSAGE_ACCOUNT_NOT_VERIFY = "Tài khoản chưa được xác thực";
    public static final String MESSAGE_EMAIL_OR_PHONE_EXISTS = "Email hoặc số điện thoại đã tồn tại";
    public static final String MESSAGE_ACCOUNT_LOCKED = "Tài khoản bị khóa";
    public static final String MESSAGE_WRONG_PASSWORD = "Sai mật khẩu";
    public static final String MESSAGE_REFRESH_TOKEN = "REFRESH";
    public static final String MESSAGE_OVER_TIME = "Thời hạn đổi mật khẩu đã hết. Vui lòng thử lại và hoàn thành quy trình đổi mật khẩu trong thời gian được quy định.";
    public static final String MESSAGE_LOGIN_SUCCESS = "LOGIN SUCCESS";
    public static final String MESSAGE_LOGIN_FAILED = "LOGIN FAILED";
    public static final String HOSPITAL = "[Essay Medical]";
    public static final String CLIENT_HOST = "http://172.16.3.200:5173";
//    public static final String CLIENT_HOST = "http://localhost:5173";
    public static final String BACKEND_HOST = "http://172.16.3.200:8080";
//    public static final String BACKEND_HOST = "http://localhost:8080";
    public static final String BACKEND_API = BACKEND_HOST + "/api/v1";
    public static final String EMAIL_SUBJECT_REGISTER_APPOINTMENT = HOSPITAL + " - Đặt lịch hẹn";
    public static final String EMAIL_SUBJECT_REGISTER = HOSPITAL + " - Đăng ký tài khoản";
    public static final String EMAIL_SUBJECT_RESET_PASSWORD = HOSPITAL + " - Cập nhật tài khoản?";
    public static final String EMAIL_LINK_OTP = CLIENT_HOST + "/otp/";

}
