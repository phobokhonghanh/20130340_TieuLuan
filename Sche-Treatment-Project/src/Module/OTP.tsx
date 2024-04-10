import { useState, useRef, ChangeEvent, KeyboardEvent, useEffect } from "react";
import Header from "../Component/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "../assets/style.css";
function OTP() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpInputs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    if (otpInputs.current[0]) {
      otpInputs.current[0].focus();
    }
  }, []);

  const handleChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    // Kiểm tra xem giá trị mới nhập có phải là số không
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Focus next input
      if (
        value !== "" &&
        index < otp.length - 1 &&
        otpInputs.current[index + 1]
      ) {
        otpInputs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (
    index: number,
    event: KeyboardEvent<HTMLInputElement>
  ) => {
    // Move to previous input on backspace
    if (
      event.key === "Backspace" &&
      index > 0 &&
      otp[index] === "" &&
      otpInputs.current[index - 1]
    ) {
      otpInputs.current[index - 1].focus();
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <img
          src="src/assets/img/bg.png"
          alt="Background"
          className="background-image"
        />
        <div className="background-container m-top-5 form-control-lg">
          <h1>Xin chào!</h1>
          <p>Vui lòng nhập mã 6 số đã gửi cho bạn qua số điện thoại</p>
          <div className="col-md-4">
            <div className="input-group has-validation">
              <div className="input-group-text">
                <img src="src/assets/svg/vietnam.svg" alt="img" />
              </div>
              <input
                type="text"
                className="form-control"
                id="validationCustom01"
                value="+84"
                disabled
                required
              />
            </div>
          </div>
          <div>
            {otp.map((value, index) => (
              <input
                className="input-otp"
                key={index}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={value}
                onChange={(e) => handleChange(index, e)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                ref={(input) =>
                  (otpInputs.current[index] = input as HTMLInputElement)
                }
              />
            ))}
          </div>
          <div className="col-13">
            <button className="btn btn-primary" type="submit">
              Xác thực
            </button>
            <p>
              Bạn không nhận được mã xác nhận ? <a>Gửi lại</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
export default OTP;
