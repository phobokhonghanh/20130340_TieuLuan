import Footer from "../Component/Footer";
import HeaderNav from "../Component/HeaderNav";
import Preloader from "../Component/Preloader";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "../assets/style.css";
import { useState } from "react";
export function BillPage() {
  const [selectedMethod, setSelectedMethod] = useState<string>("cash"); 

  const handlePayment = () => {
    if (selectedMethod === "cash") {
      // Xử lý thanh toán khi chọn phương thức thanh toán tiền mặt
      console.log("Thanh toán tiền mặt khi đến bệnh viện");
    } else if (selectedMethod === "paypal") {
      // Xử lý thanh toán khi chọn phương thức thanh toán qua PayPal
      console.log("Thanh toán qua PayPal");
    }
  };
  return (
    <>
      <Preloader />
      <HeaderNav />
      <div className="content-wrapper">
        <div className="container-xxl flex-grow-1 container-p-y py-3">
          <div className="row">
            <div className="col-md-8 w90">
              <div className="payment-methods">
                <h4>Chọn Phương Thức Thanh Toán</h4>
                <div className="method">
                  <input
                    type="radio"
                    id="cash"
                    name="payment-method"
                    value="cash"
                    checked={selectedMethod === "cash"}
                    onChange={() => setSelectedMethod("cash")}
                  />
                  <label htmlFor="cash">
                    <img
                      src="src/assets/img/cash_icon.png"
                      alt="Cash Icon"
                      className="method-icon"
                    />
                    Thanh toán tiền mặt khi đến bệnh viện
                  </label>
                </div>
                <div className="method">
                  <input
                    type="radio"
                    id="paypal"
                    name="payment-method"
                    value="paypal"
                    checked={selectedMethod === "paypal"}
                    onChange={() => setSelectedMethod("paypal")}
                  />
                  <label htmlFor="paypal">
                    <img
                      style={{ width: "50px" }}
                      src="src/assets/img/paypal_icon.png"
                      className="method-icon"
                      alt="PayPal Icon"
                    />
                    Thanh toán qua PayPal
                  </label>
                </div>
                <div style={{ float: "right" }}>
                  <button
                    className={
                      selectedMethod === "cash"
                        ? "payment-btn cash-btn"
                        : "payment-btn paypal-btn"
                    }
                    onClick={handlePayment}
                  >
                    {selectedMethod === "cash"
                      ? "Thanh toán"
                      : "Thanh toán qua PayPal"}
                  </button>
                </div>
              </div>
            </div>
            {/* <AppointmentDetail /> */}
          </div>
          <div style={{ marginBottom: "30px" }}></div>
        </div>
      </div>
      <Footer />
    </>
  );
}
