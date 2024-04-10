import { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import Department from "../Component/Department";
import TableTime from "../Component/TableTime";
import Header from "../Component/Header";
import { PackageSelected } from "../Component/Package";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "../assets/style.css";
const AppointmentForm = () => {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("male");
  const [clinic, setClinic] = useState("");
  const [isUsingBHYT, setIsUsingBHYT] = useState(false);
  const [BHYTNumber, setBHYTNumber] = useState("");

  const handleFormSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  const handleBHYTCheckboxChange = () => {
    setIsUsingBHYT(!isUsingBHYT);
  };

  return (
    <>
      <Header />
      <Container>
        <Row className="justify-content-center m-25">
          <Col md={8} className="width">
            <h2 className="text-center mb-4">Đăng ký khám bệnh</h2>
            <Form onSubmit={handleFormSubmit}>
              <Row>
                <Col xs={6}>
                  <Form.Group controlId="formFullName">
                    <Form.Label>Họ và tên:</Form.Label>
                    <Form.Control
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Họ và tên"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col xs={6}>
                  <Form.Group controlId="formPhoneNumber">
                    <Form.Label>Số điện thoại:</Form.Label>
                    <Form.Control
                      type="tel"
                      pattern="[0-9]*"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="Số điện thoại"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col xs={6}>
                  <Form.Group controlId="formGender">
                    <Form.Label>Giới tính:</Form.Label>
                    <Row>
                      <Col>
                        <Form.Check
                          type="radio"
                          label="Nam"
                          name="gender"
                          id="male"
                          checked={gender === "male"}
                          onChange={() => setGender("male")}
                        />
                      </Col>
                      <Col>
                        <Form.Check
                          type="radio"
                          label="Nữ"
                          name="gender"
                          id="female"
                          checked={gender === "female"}
                          onChange={() => setGender("female")}
                        />
                      </Col>
                    </Row>
                  </Form.Group>
                </Col>
                <PackageSelected />
                {/* <Col xs={6}>
                  <Form.Group controlId="formPackage">
                    <Form.Label>Chọn gói khám:</Form.Label>
                    <Form.Control
                      as="select"
                      value={packages}
                      onChange={(e) => setPackages(e.target.value)}
                      required
                    >
                      <option value="">-- Chọn gói khám --</option>
                      <option value="regular">Khám thường</option>
                      <option value="onDemand">Khám tổng quát</option>
                    </Form.Control>
                  </Form.Group>
                </Col> */}
                {/* <Col xs={6}> */}
                <Form.Group controlId="formClinic">
                  <Form.Label>Chọn khu khám bệnh:</Form.Label>
                  <Form.Control
                    as="select"
                    value={clinic}
                    onChange={(e) => setClinic(e.target.value)}
                    required
                  >
                    <option value="">-- Chọn khu khám --</option>
                    <option value="regular">Khám thường</option>
                    <option value="onDemand">Khám theo yêu cầu</option>
                  </Form.Control>
                </Form.Group>
                {/* </Col> */}
              </Row>
              {clinic === "regular" && (
                <Form.Group controlId="formBHYT">
                  <Form.Check
                    type="checkbox"
                    label="Sử dụng BHYT"
                    checked={isUsingBHYT}
                    onChange={handleBHYTCheckboxChange}
                  />
                  {isUsingBHYT && (
                    <Form.Control
                      type="text"
                      placeholder="Nhập số BHYT"
                      value={BHYTNumber}
                      onChange={(e) => setBHYTNumber(e.target.value)}
                      required
                    />
                  )}
                </Form.Group>
              )}
              <Department />
              {/* <Department /> */}
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Mô tả triệu chứng bệnh</Form.Label>
                <Form.Control as="textarea" rows={3} />
              </Form.Group>
              <TableTime />
              <div className="text-center">
                <Button variant="primary" type="submit">
                  Đăng ký
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AppointmentForm;
