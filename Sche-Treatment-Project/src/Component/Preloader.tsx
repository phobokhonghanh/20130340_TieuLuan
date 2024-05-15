import { Spinner } from "react-bootstrap";
import "../assets/css/preload.css";

function Preloader() {

  return (
    <div className="preloader-overlay">
      <div className="preloader-content">
        <Spinner animation="border" variant="primary" />
      </div>
    </div>
  );
}

export default Preloader;
