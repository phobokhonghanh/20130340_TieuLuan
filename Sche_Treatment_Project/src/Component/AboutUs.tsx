import "../assets/css/AboutUs.css";

function AboutUs() {
  return (
    <>
      {/* <!-- Start Feautes --> */}
      <section className="Feautes section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title-about">
                <h2>Chúng tôi luôn sẵn sàng giúp đỡ bạn và gia đình bạn</h2>
                <img src="/img/section-img.png" alt="#" />
                <p>Bạn chỉ việc tin tưởng, còn lại để chúng tôi lo</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-12">
              {/* <!-- Start Single features --> */}
              <div className="single-features">
                <div className="signle-icon">
                  <i className="fas fa-ambulance"></i>
                </div>
                <h3>Hỗ trợ cấp cứu</h3>
                <p>
                  Thời gian vàng là thời gian cứu sống bệnh nhân. Hãy tin tưởng
                  và gọi ngay cho chúng tôi!
                </p>
              </div>
              {/* <!-- End Single features --> */}
            </div>
            <div className="col-lg-4 col-12">
              {/* <!-- Start Single features --> */}
              <div className="single-features">
                <div className="signle-icon">
                  <i className="fas fa-heartbeat"></i>
                </div>
                <h3>Niềm tin hàng đầu</h3>
                <p>
                  Niềm tin là nền tảng của sự chữa lành. Khi bệnh nhân tin tưởng
                  vào sức mạnh của chúng ta, họ có thể vượt qua mọi thách thức
                </p>
              </div>
              {/* <!-- End Single features --> */}
            </div>
            <div className="col-lg-4 col-12">
              {/* <!-- Start Single features --> */}
              <div className="single-features last">
                <div className="signle-icon">
                  <i className="fas fa-stethoscope"></i>
                </div>
                <h3>Đội ngũ bác sĩ</h3>
                <p>
                  Lương y như mẹ hiền, chúng tôi sẽ nổ lực hết sức vì niềm vui
                  của bạn là nhiệm vụ của chúng tôi!
                </p>
              </div>
              {/* <!-- End Single features --> */}
            </div>
          </div>
        </div>
      </section>
      {/* <!--/ End Feautes --> */}

      {/* <!-- Start Fun-facts --> */}
      <div
        id="fun-facts"
        className="fun-facts section overlay"
        style={{ backgroundImage: 'url("/img/about.png")' }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 col-12" style={{ width: "25%" }}>
              {/* <!-- Start Single Fun --> */}
              <div className="single-fun">
                <i className="fas fa-home"></i>
                <div className="content">
                  <span className="counter">3468</span>
                  <p>Phòng khám</p>
                </div>
              </div>
              {/* <!-- End Single Fun --> */}
            </div>
            <div className="col-lg-3 col-md-6 col-12" style={{ width: "25%" }}>
              {/* <!-- Start Single Fun --> */}
              <div className="single-fun">
                <i className="fas fa-user"></i>
                <div className="content">
                  <span className="counter">557</span>
                  <p>Bác sĩ</p>
                </div>
              </div>
              {/* <!-- End Single Fun --> */}
            </div>
            <div className="col-lg-3 col-md-6 col-12" style={{ width: "25%" }}>
              {/* <!-- Start Single Fun --> */}
              <div className="single-fun">
                <i className="fas fa-smile"></i>
                <div className="content">
                  <span className="counter">4379</span>
                  <p>Bệnh nhân vui vẻ</p>
                </div>
              </div>
              {/* <!-- End Single Fun --> */}
            </div>
            <div className="col-lg-3 col-md-6 col-12" style={{ width: "25%" }}>
              {/* <!-- Start Single Fun --> */}
              <div className="single-fun">
                <i className="fas fa-table"></i>
                <div className="content">
                  <span className="counter">32</span>
                  <p>Năm kinh nghiệm</p>
                </div>
              </div>
              {/* <!-- End Single Fun --> */}
            </div>
          </div>
        </div>
      </div>
      {/* <!--/ End Fun-facts --> */}
    </>
  );
}
export default AboutUs;
