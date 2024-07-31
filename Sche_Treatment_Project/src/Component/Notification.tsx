import { Alert } from "react-bootstrap";
import { useEffect, useState } from "react";
interface NotificationProps {
  message: string;
  variant: "danger" | "success";
  onClose: () => void;
}
export const Notifi: React.FC<NotificationProps> = ({
  message,
  variant,
  onClose,
}) => {
  const notifications = message.split("\n");
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);
  return (
    <>
      <Alert
        variant={variant}
        onClose={onClose}
        dismissible
        style={{ zIndex: "1900" }}
      >
        <div
          style={{
            display: "flex",
          }}
        >
          <div style={{ alignContent: "center", width: "20%" }}>
            <img
              src={
                variant == "success" ? "/img/success.png" : "/img/cancel.png"
              }
              style={{ width: "30px" }}
              alt=""
            />
          </div>
          <div style={{ width: "80%" }}>
            {notifications
              ? notifications.map((notify) => (
                  <div key={notify}>
                    <span
                      style={{
                        fontWeight: "bold",
                        fontSize: "larger",
                      }}
                    >
                      {notify}
                    </span>
                    <br />
                  </div>
                ))
              : message}
          </div>
        </div>
      </Alert>
    </>
  );
};
interface ErrorProps {
  error: boolean;
}
export const ErrorNotifi: React.FC<ErrorProps> = ({ error }) => {
  const [showError, setShowError] = useState(error);
  useEffect(() => {
    if (error) {
      setShowError(true);
      const timer = setTimeout(() => {
        setShowError(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error]);
  return (
    <>
      {showError && (
        <div
          style={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "larger",
          }}
        >
          <Alert variant="danger" dismissible style={{ zIndex: "1900" }}>
            Đang gặp sự cố kỹ thuật, xin vui lòng thử lại!
          </Alert>
        </div>
      )}
    </>
  );
};

export const SuccessPage = () => {
  const containerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "85vh",
    backgroundColor: "#f0f8ff",
  };

  const cardStyle: React.CSSProperties = {
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
    textAlign: "center",
  };

  const headingStyle: React.CSSProperties = {
    color: "#4CAF50",
    fontSize: "24px",
    margin: "0 0 10px",
  };
  return (
    <>
      {/* <Header /> */}
      <div style={containerStyle}>
        <div style={cardStyle}>
          <h1 style={headingStyle}>Thanh toán thành công!</h1>
          <img
            src="/img/success.png"
            alt="Success"
            style={{ width: "200px", height: "200px" }}
          />
        </div>
      </div>
    </>
  );
};

export const ErrorPaymentPage = () => {
  const containerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "85vh",
    backgroundColor: "#f0f8ff",
  };

  const cardStyle: React.CSSProperties = {
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
    textAlign: "center",
  };

  const headingStyle: React.CSSProperties = {
    color: "red",
    fontSize: "24px",
    margin: "0 0 10px",
  };

  return (
    <>
      {/* <Header /> */}
      <div style={containerStyle}>
        <div style={cardStyle}>
          <h1 style={headingStyle}>Thanh toán không thành công!</h1>
          <img
            src="/img/cancel.png"
            alt="Success"
            style={{ width: "200px", height: "200px" }}
          />
        </div>
      </div>
    </>
  );
};
