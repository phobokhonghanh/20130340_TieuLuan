import { Alert } from "react-bootstrap";
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
  return (
    <>
      <Alert
        variant={variant}
        onClose={onClose}
        dismissible
        style={{ zIndex: "1900" }}
      >
        {message}
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
