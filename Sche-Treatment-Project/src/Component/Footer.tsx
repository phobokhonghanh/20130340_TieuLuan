import "../assets/css/Footer.css";
function Footer() {
  return (
    <>
      {/* <!-- Footer Area --> */}
      <footer id="footer" className="footer">
        {/* <!-- Footer Top --> */}
        <div className="footer-top">
          <div className="container">
            <div className="row">
              <div className="custom-footer col-md-6 col-12 ">
                <div className="single-footer">
                  <h2>
                    Bệnh viện đa khoa <br />
                    Khu vực Thủ Đức
                  </h2>
                  <p> Địa chỉ: Lê Văn Chí, Thủ Đức, Tp Hồ Chí Minh</p>
                  <p> HotLine: 19008080</p>
                  <p>Email: benhviendakhoa@gmail.com</p>
                </div>
              </div>
              <div className="col-md-6 col-12 custom-footer">
                <div className="single-footer f-link">
                  <h2>Có thể bạn cần</h2>
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-12">
                      <ul className="pad-0">
                        <li>
                          <a href="#">
                            <i
                              className="fa fa-caret-right"
                              aria-hidden="true"
                            ></i>
                            Trang chủ
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i
                              className="fa fa-caret-right"
                              aria-hidden="true"
                            ></i>
                            Bác sĩ
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i
                              className="fa fa-caret-right"
                              aria-hidden="true"
                            ></i>
                            Gói khám
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i
                              className="fa fa-caret-right"
                              aria-hidden="true"
                            ></i>
                            Dịch vụ
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="col-lg-6 col-md-6 col-12">
                      <ul className="pad-0">
                        <li>
                          <a href="#">
                            <i
                              className="fa fa-caret-right"
                              aria-hidden="true"
                            ></i>
                            FAQ
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i
                              className="fa fa-caret-right"
                              aria-hidden="true"
                            ></i>
                            Điều khoản và dịch vụ
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i
                              className="fa fa-caret-right"
                              aria-hidden="true"
                            ></i>
                            Về chúng tôi
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12 custom-footer">
                <div className="single-footer">
                  <h2>Lịch trình</h2>
                  <p>Thời gian khám bệnh</p>
                  <ul className="time-sidual">
                    <li className="day">
                      Thứ 2 - Thứ 7<span>7.00 - 16.00</span>
                    </li>
                    <li className="day">
                      Chủ Nhật <span>7.00 - 11.30</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!--/ End Footer Top -->			 */}
      </footer>
      {/* <!--/ End Footer Area --> */}
    </>
  );
}
export default Footer;
