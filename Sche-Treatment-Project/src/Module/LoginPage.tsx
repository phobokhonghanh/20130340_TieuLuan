import { SetStateAction, useState } from "react";
import Header from "../Component/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "../assets/style.css";
function Login() {
  const [validated, setValidated] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("+84 ");

  const handleChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setPhoneNumber(event.target.value);
  };
  const handleSubmit = (event: {
    currentTarget: any;
    preventDefault: () => void;
    stopPropagation: () => void;
  }) => {
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
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
          <form
            className={` form-style row g-3 ${
              validated ? "was-validated" : ""
            }`}
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="icon-link icon-link-hove">
              <a href="">
                <img
                  className="bi back"
                  src="src/assets/svg/back.svg"
                  alt="img"
                />
              </a>
              <p className="m-top-back">
                Vui lòng nhập số điện thoại để tiếp tục
              </p>
            </div>
            <div className="col-md-4">
              <div className="has-validation">
                <div className="input-group-text">
                  <img src="src/assets/svg/vietnam.svg" alt="img" />
                  <input
                    type="text"
                    className="form-control m-lg-1"
                    id="validationCustom01"
                    value={phoneNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="input-group has-validation">
                <input
                  type="password"
                  className="form-control"
                  id="validationCustomUsername"
                  aria-describedby="inputGroupPrepend"
                  placeholder="Nhập mật khẩu"
                  required
                />
                <div className="invalid-feedback">Vui lòng nhập mật khẩu.</div>
                <div className="valid-feedback">Looks good!</div>
              </div>
            </div>
            <div className="col-13">
              <button className="btn btn-primary" type="submit">
                Tiếp tục
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
