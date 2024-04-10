export function Analyst() {
  return (
    <>
      <div id="page-wrapper">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="page-bar page-header">
                <ul className="page-breadcrumb">
                  <li>
                    <i className="fa fa-home"></i>
                    <a href="index.html">Home</a>
                    <i className="fa fa-angle-right"></i>
                  </li>
                  <li>
                    <a href="index.html">Thống kê</a>
                  </li>
                  <li style={{ textAlign: "center" }}>
                    <p
                      style={{
                        color: "red",
                        textAlign: "center",
                        fontSize: "18px",
                        marginLeft: "",
                      }}
                    >
                      {/* @(Session["messageFilter"] != null ?
                      Session["messageFilter"] as string : "") */}
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row">
            <div
              data-aos="zoom-in"
              data-aos-duration="700"
              className="col-lg-3 col-md-6"
            >
              <div className="panel panel-green">
                <div className="panel-heading">
                  <div className="row">
                    <div className="col-xs-3">
                      <i className="fa fa-envira fa-3x"></i>
                    </div>
                    <div className="text-cs">Tổng số sản phẩm</div>
                    <div className="col-xs-9 text-right">
                      <div className="huge">69</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              data-aos="zoom-in"
              data-aos-duration="700"
              className="col-lg-3 col-md-6"
            >
              <div className="panel panel-red">
                <div className="panel-heading">
                  <div className="row">
                    <div className="col-xs-3">
                      <i className="fa fa-money fa-3x"></i>
                    </div>
                    <div className="text-cs">Tổng số tiền</div>
                    <div className="col-xs-9 text-right">
                      <div className="huge">69.666.999d</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              data-aos="zoom-in"
              data-aos-duration="700"
              className="col-lg-3 col-md-6"
            >
              <div className="panel panel-primary">
                <div className="panel-heading">
                  <div className="row">
                    <div className="col-xs-3">
                      <i className="fa fa-shopping-basket fa-3x"></i>
                    </div>
                    <div className="text-cs">Tổng đơn hàng</div>
                    <div className="col-xs-9 text-right">
                      <div className="huge">69</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              data-aos="zoom-in"
              data-aos-duration="700"
              className="col-lg-3 col-md-6"
            >
              <div className="panel panel-yellow">
                <div className="panel-heading">
                  <div className="row">
                    <div className="col-xs-3">
                      <i className="fa fa-bank fa-3x"></i>
                    </div>
                    <div className="text-cs">Doanh thu hôm nay</div>
                    <div className="col-xs-9 text-right">
                      <div className="huge">20.990.000đ</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              data-aos="zoom-in"
              data-aos-duration="700"
              className="col-lg-3 col-md-6"
            >
              <div className="panel panel-gray">
                <div className="panel-heading">
                  <div className="row">
                    <div className="col-xs-3">
                      <i className="fa fa-calendar-minus-o fa-3x"></i>
                    </div>
                    <div className="text-cs">Doanh thu tuần</div>
                    <div className="col-xs-9 text-right">
                      <div className="huge">30.250.000đ</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              data-aos="zoom-in"
              data-aos-duration="700"
              className="col-lg-3 col-md-6"
            >
              <div className="panel panel-darkcyan">
                <div className="panel-heading">
                  <div className="row">
                    <div className="col-xs-3">
                      <i className="fa fa-calendar fa-3x"></i>
                    </div>
                    <div className="text-cs">Doanh thu tháng</div>
                    <div className="col-xs-9 text-right">
                      <div className="huge">50.220.000đ</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              data-aos="zoom-in"
              data-aos-duration="700"
              className="col-lg-3 col-md-6"
            >
              <div className="panel panel-cyan">
                <div className="panel-heading">
                  <div className="row">
                    <div className="col-xs-3">
                      <i className="fa fa-users fa-3x"></i>
                    </div>
                    <div className="text-cs">Tổng số thành viên</div>
                    <div className="col-xs-9 text-right">
                      <div className="huge">3</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              data-aos="zoom-in"
              data-aos-duration="700"
              className="col-lg-3 col-md-6"
            >
              <div className="panel panel-cy">
                <div className="panel-heading">
                  <div className="row">
                    <div className="col-xs-3">
                      <i className="fa fa-paw fa-3x"></i>
                    </div>
                    <div className="text-cs">Lượt truy cập</div>
                    <div className="col-xs-9 text-right">
                      <div className="huge">534</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
