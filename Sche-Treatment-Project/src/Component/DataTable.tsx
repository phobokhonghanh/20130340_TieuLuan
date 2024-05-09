import React, { useState, SetStateAction } from "react";
import { Table } from "react-bootstrap";
import { ModalAddAccount, ModalInterface } from "./Modal";
import Calendar, { TileArgs } from "react-calendar";
import { Clinic, PackageEntity } from "../Models/Model";
type Account = {
  phone: string;
  name: string;
  gender: string;
  role: string;
};

type DataTableAccountProps = {
  data: Account[];
};

type DataTableProps = {
  title: string;
  data: Account[] | Clinic[];
  isPackage?: boolean;
};
const mapGender = (genderValue: string) => {
  return genderValue === "0" ? "Nam" : "Nữ";
};
const mapStatus = (statusrValue: string) => {
  return statusrValue === "0" ? (
    <span className="label label-success">Mở</span>
  ) : (
    <span className="label label-warning">Tắt</span>
  );
};
const mapRole = (roleValue: string) => {
  switch (roleValue) {
    case "0":
      return <span className="label label-danger">Admin</span>;
    case "1":
      return <span className="label label-warning">Quản lý</span>;
    case "2":
      return <span className="label label-info">Bác sĩ</span>;
    case "3":
      return <span className="label label-success">Bệnh nhân</span>;
    default:
      return <span className="label label-default">Không xác định</span>;
  }
};

export function renderCell(key: string, value: string | object): JSX.Element {
  switch (key) {
    case "gender":
      return <>{mapGender(String(value))}</>;
    case "role":
      return <>{mapRole(String(value))}</>;
    case "status":
      return <>{mapStatus(String(value))}</>;
    default:
      return <>{String(value)}</>; // Handle non-array value

  }
}
export const DataTable: React.FC<DataTableProps> = ({
  title,
  data,
  isPackage,
}) => {
  return (
    <>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={Object.values(row)[0]}>
            <td>{++rowIndex}</td>
            {Object.entries(row).map(
              ([key, value]) =>
                key !== "description" && (
                  <td key={key}>{renderCell(key, value)}</td>
                )
            )}
            {title === "phòng khám" && (
              <td style={{ textAlign: "center" }}>
                <a
                  data-toggle="modal"
                  data-target={"#Calendar" + Object.values(row)[0]}
                  className="btn default btn-xs purple btn-edit"
                >
                  <i className="fa fa-calendar"></i>
                </a>
                <div
                  style={{ textAlign: "left" }}
                  id={"Calendar" + Object.values(row)[0]}
                  className="modal fade"
                  tabIndex={-1}
                  role="dialog"
                >
                  {/* <ModalCalendar title={"Calendar"} isCreate={false} /> */}
                </div>
              </td>
            )}
            <td style={{ textAlign: "center" }}>
              <a
                data-toggle="modal"
                data-target={"#Update" + Object.values(row)[0]}
                className="btn default btn-xs purple btn-edit"
              >
                <i className="fa fa-edit"></i>
              </a>
              <div
                style={{ textAlign: "left" }}
                id={"Update" + Object.values(row)[0]}
                className="modal fade"
                tabIndex={-1}
                role="dialog"
              >
                {title === "tài khoản" ? (
                  <ModalAddAccount
                    title={"Cập nhật " + title}
                    obj={row}
                    isCreate={false}
                  />
                ) : (
                  <ModalInterface
                    title={title}
                    isCreate={false}
                    obj={row}
                    isPackage={isPackage}
                  />
                )}
              </div>
            </td>
            <td style={{ textAlign: "center" }}>
              <a
                data-toggle="modal"
                data-target={"#Add" + rowIndex}
                className="btn default btn-xs black btn-delete"
              >
                <i className="fa fa-trash-o"></i>
              </a>
              <div
                id={"Add" + rowIndex}
                className="modal fade modal-confirm"
                role="dialog"
              >
                <div className="modal-dialog modal-sm">
                  <div className="modal-content">
                    <div className="modal-body">
                      <p className="text-content">
                        Xác nhận xóa {" " + title + " "}
                        <em>{}</em>
                      </p>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        onClick={() =>
                          (window.location.href =
                            "/Account/Account_Delete?userName=@member.UserName")
                        }
                        className="btn-cf"
                      >
                        Xác nhận
                      </button>
                      <button
                        type="button"
                        className="tbn-cancle"
                        data-dismiss="modal"
                      >
                        Hủy
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </>
  );
};
export const DataTableAccount = (data: DataTableAccountProps) => {
  const [filterText, setFilterText] = useState("");
  const [filteredRows, setFilteredRows] = useState<Account[]>(data.data);
  const [currentPage, setCurrentPage] = useState(0);
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const itemsPerPage = 10;

  const handleFilterChange = (e: { target: { value: string } }) => {
    const value = e.target.value;
    setFilterText(value);
    const filteredData = data.data.filter((row: Account) =>
      Object.values(row).some((cell) =>
        String(cell).toLowerCase().includes(value.toLowerCase())
      )
    );
    setFilteredRows(filteredData);
    setCurrentPage(0);
  };

  const handleSort = (column: string) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const totalPages = Math.ceil(filteredRows.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredRows.length);
  const currentRows = filteredRows.slice(startIndex, endIndex);

  const sortedRows = [...currentRows].sort((a, b) => {
    const columnA = a[sortColumn as keyof Account];
    const columnB = b[sortColumn as keyof Account];
    if (columnA < columnB) return sortDirection === "asc" ? -1 : 1;
    if (columnA > columnB) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const handleChangePage = (pageIndex: SetStateAction<number>) => {
    setCurrentPage(pageIndex);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Tìm kiếm ..."
        value={filterText}
        onChange={handleFilterChange}
      />
      <Table striped bordered hover>
        <thead>
          <tr className="text-small">
            <th># </th>
            <th>Điện thoại</th>
            <th>Họ Tên</th>
            <th>Giới tính</th>
            <th
              onClick={() => handleSort("role")}
              style={{ cursor: "pointer" }}
            >
              {sortColumn === "role" ? (
                <span>
                  {sortDirection === "asc" ? "Chức vụ ▲" : "Chức vụ ▼"}
                </span>
              ) : (
                "Chức vụ ▼"
              )}
            </th>
            <th className="remove" style={{ textAlign: "center" }}>
              Sửa
            </th>
            <th className="remove" style={{ textAlign: "center" }}>
              Xóa
            </th>
          </tr>
        </thead>
        <DataTable title={"tài khoản"} data={sortedRows} />
      </Table>
      <div>
        <button
          onClick={() => handleChangePage(currentPage - 1)}
          disabled={currentPage === 0}
        >
          Previous
        </button>
        <span>{`Page ${currentPage + 1} of ${totalPages}`}</span>
        <button
          onClick={() => handleChangePage(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

