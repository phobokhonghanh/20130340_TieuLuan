const titles: Record<string, string> = {
  "/": "Trang chủ",
  "/home": "Trang chủ",
  "/register": "Đăng ký",
  "/login": "Đăng nhập",
  "/forgot-password": "Quên mật khẩu",
  "/reset-password/:accountId": "Cập nhật mật khẩu",
  "/otp/:accountId": "Nhập mã xác thực",
  "/payment/success": "Thanh toán thành công",
  "/payment/cancel": "Hủy thanh toán",
  "/doctors": "Danh sách bác sĩ",
  "/doctor-infor": "Thông tin bác sĩ",
  "/packages": "Danh sách gói khám",
  "/services": "Danh sách dịch vụ",
  "/about-us": "Về chúng tôi",
  "/error": "404",
  "/account": "Tài khoản",
  "/history": "Lịch sử",
  "/appointment": "Đăng ký lịch hẹn",
  "/appointmentDoctor": "Đăng ký lịch hẹn bác sĩ",
  "/appointmentPackageForm": "Đăng ký lịch hẹn gói khám",
  "/account-doctor": "Tài khoản bác sĩ",

};
const handler = {
  get: function (target: typeof titles, name: string) {
    // Hàm để kiểm tra các đường dẫn có tham số động
    const findMatch = (name: string) => {
      for (const key in target) {
        const dynamicPath = key.replace(/:\w+/g, "[^/]+");
        const regex = new RegExp(`^${dynamicPath}$`);
        if (regex.test(name)) {
          return target[key];
        }
      }
      return null;
    };

    const title = Object.prototype.hasOwnProperty.call(target, name)
      ? target[name]
      : findMatch(name);

    return title ? `${title} – Essay` : "Essay";
  },
};
const Titles = new Proxy(titles, handler);

export default Titles;