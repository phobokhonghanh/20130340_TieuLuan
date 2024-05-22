import { StatisticalResponse } from "../Models/Model";

export const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function dataDoanhThu(getdata: number[]) {
  return {
    labels: labels,
    datasets: [
      {
        label: "Doanh thu tháng",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "black",
        borderWidth: 1,
        data: getdata.map((data) => data),
      },
    ],
  };
}
export function dataAppointment(dataSum: number[], dataCacel: number[]) {
  return {
    labels: labels,
    datasets: [
      {
        label: "Tổng số lượt đăng ký",
        backgroundColor: "#2a71d0",
        borderColor: "black",
        borderWidth: 2,
        data: dataSum.map((data) => data),
      },
      {
        label: "Số lượt hủy",
        backgroundColor: "#f3ba2f",
        borderColor: "rgb(0,0,255)",
        data: dataCacel.map((data) => data),
      },
    ],
  };
}
