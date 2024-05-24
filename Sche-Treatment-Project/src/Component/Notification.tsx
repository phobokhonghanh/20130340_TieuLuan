import { Alert } from "react-bootstrap";
import Header from "./Header";
import { useEffect } from "react";
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

  return (
    <>
      <Alert
        variant={variant}
        onClose={onClose}
        dismissible
        style={{ zIndex: "1900" }}
      >
        {notifications
          ? notifications.map((notify, index) => <p key={index}>{notify}</p>)
          : message}
      </Alert>
    </>
  );
};
interface ErrorProps {
  error: boolean;
}
export const ErrorNotifi: React.FC<ErrorProps> = ({ error }) => {
  return (
    <>
      {error && (
        <div
          style={{
            textAlign: "center",
            color: "rgb(116, 136, 151)",
            fontWeight: "bold",
            fontSize: "larger",
          }}
        >
          <Alert variant="danger" dismissible style={{ zIndex: "1900" }}>
            Đang gặp sự cố kỹ thuật, xin vui lòng đợi trong giây lát !
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
      <Header />
      <div style={containerStyle}>
        <div style={cardStyle}>
          <h1 style={headingStyle}>Thanh toán thành công!</h1>
          <img
            src="/src/assets/img/success.png"
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
      <Header />
      <div style={containerStyle}>
        <div style={cardStyle}>
          <h1 style={headingStyle}>Thanh toán không thành công!</h1>
          <img
            src="/src/assets/img/cancel.png"
            alt="Success"
            style={{ width: "200px", height: "200px" }}
          />
        </div>
      </div>
    </>
  );
};
