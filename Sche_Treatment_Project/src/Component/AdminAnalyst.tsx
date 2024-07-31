import "../assets/Admin/css/styleAdmin.css";
import {
  dataAppointment,
  dataCountAppointmentByPakage,
  dataDoanhThu,
  dataDoanhThuGoiKham,
} from "../Utils/Data";
import BarChart from "./PieChart";
import { useEffect, useState } from "react";
import { API_ENDPOINTS } from "../apiConfig";
import { formatPrice } from "../Utils/Utils";
import Preloader from "./Preloader";
import { ErrorNotifi } from "./Notification";
import { headerAuth } from "../Authentication/Authentication";
import { PackageDTO } from "../Models/Model";

// thống kê
export function Analyst() {
  const [isLoading, setLoading] = useState(false); // loading
  const [error, setError] = useState(false);
  const currentYear = new Date().getFullYear();

  // Tạo một mảng các năm từ năm hiện tại đến 5 năm sau
  const years = Array.from({ length: 5 }, (_, index) => currentYear - index);

  // Khởi tạo state với giá trị mặc định là năm hiện tại
  const [year, setYear] = useState(currentYear);

  // Khởi tạo state id gói khám
  const [id, setId] = useState("");
  const [packageData, setPackageData] = useState<PackageDTO[]>([]);
  // Hàm xử lý sự kiện khi người dùng chọn năm
  const handlePackageChange = (event: any) => {
    setId(event.target.value);
  };
  const handleYearChange = (event: any) => {
    setYear(event.target.value);
  };
  const fetchDataPackage = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.GET_PACKAGE_ALL, headerAuth());
      const data = (await response.json());
      setPackageData(data.content);
    } catch (e: any) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchDataPackage();
  }, []);
  // method call api data months
  function fetchDataMonths(api: string): number[] {
    const [charBilltData, setChartBillData] = useState<number[]>([]);
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(api, headerAuth());
        const data = (await response.json()) as number[];
        setChartBillData(data);
      } catch (e: any) {
        console.log(e);
        setError(true);
      } finally {
        const timer = setTimeout(() => {
          setLoading(false);
        }, 500);
        return () => clearTimeout(timer);
      }
    };
    useEffect(() => {
      fetchData();
    }, [year, id]);
    return charBilltData;
  }
  // method call api data weeks
  function fetchDataWeeks(api: string): number {
    const [billWeek, setBillWeek] = useState<number>(0);
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(api, headerAuth());
        const text = await response.text();
        if (text) {
          setBillWeek(parseInt(text));
        }
      } catch (e: any) {
        console.error(e);
      }
    };
    useEffect(() => {
      fetchData();
    }, []);
    return billWeek;
  }
  // doanh thu tuần hiện tại
  const billSumWeekCurrent: string = formatPrice(
    fetchDataWeeks(API_ENDPOINTS.GET_BILL_SUM_WEEK) + ""
  );
  // doanh thu các tháng
  const billSumMonths: number[] = fetchDataMonths(
    API_ENDPOINTS.GET_BILL_SUM_MONTHS + `?year=${year}`
  );
  // doanh thu tháng hiện tại
  const billSumMonthCurrent: string = formatPrice(
    billSumMonths[new Date().getMonth()] + ""
  );
  // doanh thu năm hiện tại
  const billSumYear: string = formatPrice(
    billSumMonths.reduce((sum, item) => {
      return sum + Number(item);
    }, 0) + ""
  );
  // tổng số lượng lịch hẹn các tháng
  const appoinmentSumMonths: number[] = fetchDataMonths(
    API_ENDPOINTS.GET_APPOINTMENT_SUM_MONTHS + `?year=${year}`
  );
  // tổng số lượng lịch hẹn năm hiện tại
  const appointmentSumYear: string =
    appoinmentSumMonths.reduce((sum, item) => {
      return sum + Number(item);
    }, 0) + "";
  // tổng số lịch hẹn đã hủy các tháng của năm
  const appoinmentCancelSumMonths: number[] = fetchDataMonths(
    API_ENDPOINTS.GET_APPOINTMENT_SUM_STAUS_MONTHS + `?year=${year}`
  );
  // tổng số tiền hóa đơn của gói khám
  const packageBillSumMonths: number[] = fetchDataMonths(
    API_ENDPOINTS.GET_PACKAGE_BILL_SUM_MONTHS + `?year=${year}&packageId=${id}`
  );
  // tổng số lượng lịch hẹn của gói khám
  const countPackageSumMonths: number[] = fetchDataMonths(
    API_ENDPOINTS.GET_PACKAGE_APPOINTMENT_SUM_MONTHS +
      `?year=${year}&packageId=${id}`
  );
  return (
    <>
      {isLoading && <Preloader />}
      <ErrorNotifi error={error} />
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
              <div className="panel-home panel-primary">
                <div className="panel-home-heading">
                  <div className="row">
                    <div className="col-xs-3">
                      <i className="fa fa-shopping-basket fa-3x"></i>
                    </div>
                    <div className="text-cs">Tổng số lịch hẹn</div>
                    <div className="col-xs-9 text-right">
                      <div className="huge">{appointmentSumYear}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="panel-home panel-red">
                <div className="panel-home-heading">
                  <div className="row">
                    <div className="col-xs-3">
                      <i className="fa fa-usd fa-3x"></i>
                    </div>
                    <div className="text-cs">Doanh thu năm</div>
                    <div className="col-xs-9 text-right">
                      <div className="huge">{billSumYear}</div>
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
                      <div className="huge">{billSumMonthCurrent}</div>
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
                      <div className="huge">{billSumWeekCurrent}</div>
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
                <label style={{ margin: "10px" }}>
                  <select
                    className="custom-select-input"
                    value={year}
                    onChange={handleYearChange}
                    required
                  >
                    {years.map((yearOption) => (
                      <option key={yearOption} value={yearOption}>
                        {yearOption}
                      </option>
                    ))}
                  </select>
                </label>
                <label style={{ margin: "10px" }}>
                  <select
                    className="custom-select-input"
                    value={id}
                    onChange={handlePackageChange}
                    required
                  >
                    <option value=""> Vui lòng chọn gói khám</option>
                    {packageData.map((pack) => (
                      <option key={pack.id} value={pack.id}>
                        {pack.packageName}
                      </option>
                    ))}
                  </select>
                </label>
                <div className="row">
                  <div className="col-lg-5 chart">
                    {<BarChart data={dataDoanhThu(billSumMonths)} />}
                  </div>
                  <div className="col-lg-5 chart">
                    {
                      <BarChart
                        data={dataAppointment(
                          appoinmentSumMonths,
                          appoinmentCancelSumMonths
                        )}
                      />
                    }
                  </div>
                </div>
                <div className="row" style={{ marginTop: "25px" }}>
                  <div className="col-lg-5 chart">
                    {" "}
                    {
                      <BarChart
                        data={dataDoanhThuGoiKham(packageBillSumMonths)}
                      />
                    }
                  </div>
                  <div className="col-lg-5 chart">
                    {
                      <BarChart
                        data={dataCountAppointmentByPakage(
                          countPackageSumMonths
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
