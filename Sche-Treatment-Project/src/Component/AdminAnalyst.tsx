import "../assets/Admin/css/styleAdmin.css";
import { dataAppointment, dataDoanhThu } from "../Utils/Data";
import BarChart from "./PieChart";
import { useEffect, useState } from "react";
import { API_ENDPOINTS } from "../apiConfig";
import { formatPrice } from "../Utils";

export function Analyst() {
  function getData(api: string): number[] {
    const [charBilltData, setChartBillData] = useState<number[]>([]);
    const fetchData = async () => {
      try {
        const response = await fetch(api);
        const data = (await response.json()) as number[];
        setChartBillData(data);
      } catch (e: any) {
        console.log(e);
      }
    };
    useEffect(() => {
      fetchData();
    }, []);
    return charBilltData;
  }
  function getDataWeek(api: string): number {
    const [billWeek, setBillWeek] = useState<number>(0);
    const fetchData = async () => {
      try {
        const response = await fetch(api);
        const data = (await response.json()) as number;
        setBillWeek(data);
      } catch (e: any) {
        console.log(e);
      }
    };
    useEffect(() => {
      fetchData();
    }, []);
    return billWeek;
  }

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
                    <a href="/admin">Home</a>
                    <i className="fa fa-angle-right"></i>
                  </li>
                  <li>
                    <a href="">Thống kê</a>
                  </li>
                  <li style={{ textAlign: "center" }}>
                    <p
                      style={{
                        color: "red",
                        textAlign: "center",
                        fontSize: "18px",
                        marginLeft: "",
                      }}
                    ></p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="panel-home panel-red">
                <div className="panel-home-heading">
                  <div className="row">
                    <div className="col-xs-3">
                      <i className="fa fa-usd fa-3x"></i>
                    </div>
                    <div className="text-cs">Doanh thu năm</div>
                    <div className="col-xs-9 text-right">
                      <div className="huge">
                        {formatPrice(
                          getData(API_ENDPOINTS.GET_BILL_SUM_MONTHS).reduce(
                            (sum, item) => {
                              return sum + Number(item);
                            },
                            0
                          ) + ""
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="panel-home panel-primary">
                <div className="panel-home-heading">
                  <div className="row">
                    <div className="col-xs-3">
                      <i className="fa fa-shopping-basket fa-3x"></i>
                    </div>
                    <div className="text-cs">Tổng đơn hàng</div>
                    <div className="col-xs-9 text-right">
                      <div className="huge">
                        {getData(
                          API_ENDPOINTS.GET_APPOINTMENT_SUM_MONTHS
                        ).reduce((sum, item) => {
                          return sum + Number(item);
                        }, 0)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="panel-home panel-gray">
                <div className="panel-home-heading">
                  <div className="row">
                    <div className="col-xs-3">
                      <i className="fa fa-calendar-minus-o fa-3x"></i>
                    </div>
                    <div className="text-cs">Doanh thu tuần</div>
                    <div className="col-xs-9 text-right">
                      <div className="huge">
                        {formatPrice(
                          getDataWeek(API_ENDPOINTS.GET_BILL_SUM_WEEK) + ""
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="panel-home panel-darkcyan">
                <div className="panel-home-heading">
                  <div className="row">
                    <div className="col-xs-3">
                      <i className="fa fa-calendar fa-3x"></i>
                    </div>
                    <div className="text-cs">Doanh thu tháng</div>
                    <div className="col-xs-9 text-right">
                      <div className="huge">
                        {formatPrice(
                          getData(API_ENDPOINTS.GET_BILL_SUM_MONTHS)[
                            new Date().getMonth()
                          ] + ""
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="container-statistical">
              <div className="container-chart">
                <span className="text-heading">Thống kê</span>
                <div className="row">
                  <div className="col-lg-5 chart">
                    {
                      <BarChart
                        data={dataDoanhThu(
                          getData(API_ENDPOINTS.GET_BILL_SUM_MONTHS)
                        )}
                      />
                    }
                  </div>
                  <div className="col-lg-5 chart">
                    {
                      <BarChart
                        data={dataAppointment(
                          getData(API_ENDPOINTS.GET_APPOINTMENT_SUM_MONTHS),
                          getData(
                            API_ENDPOINTS.GET_APPOINTMENT_SUM_STAUS_MONTHS
                          )
                        )}
                      />
                    }
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
