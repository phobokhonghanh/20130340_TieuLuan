import { useState, useRef, ChangeEvent, KeyboardEvent, useEffect } from "react";
import Header from "../Component/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "../assets/style.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { confirmOTP } from "../apiConfig";
import { Notifi } from "../Component/Notification";
import Preloader from "../Component/Preloader";
function OTP() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpInputs = useRef<HTMLInputElement[]>([]);
  const { accountId } = useParams();
  const location = useLocation();
  const isResetPassword = new URLSearchParams(location.search).get(
    "reset-password"
  );
  const [message, setMessage] = useState("");
  const [levelMessage, setLevelMessage] = useState<"danger" | "success">(
    "danger"
  );
  const [showMess, setShowMess] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMess(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [showMess]);
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
  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setIsLoading(true);
    const data = otp.join("");
    confirmOTP(accountId ? accountId : "", data)
      .then((response: any) => {
        if (response.status === 200) {
          const timer = setTimeout(() => {
            setIsLoading(false);
            if (isResetPassword == "true") {
              navigate(`/reset-password/${accountId}`);
            } else {
              navigate("/login");
            }
          }, 2000);
          return () => clearTimeout(timer);
        }
      })
      .catch((error: any) => {
        setIsLoading(false);
        console.error(error);
        setMessage("Sai OTP, Vui lòng nhập lại");
        setLevelMessage("danger");
        setShowMess(true);
      });
  };
  return (
    <>
      {isLoading && <Preloader />}
      <Header />
      {showMess && (
        <Notifi
          message={message}
          variant={levelMessage}
          onClose={() => setShowMess(false)}
        />
      )}
      <div className="container">
        <img
          src="/src/assets/img/bg.png"
          alt="Background"
          className="background-image"
        />
        <div className="background-container m-top-5 form-control-lg">
          <h1>Xin chào!</h1>
          <p>Vui lòng nhập mã OTP đã gửi cho bạn qua email</p>
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
            <button className="btn btn-primary" onClick={handleSubmit}>
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
