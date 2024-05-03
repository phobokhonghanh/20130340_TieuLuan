import { Dialog } from "./AdminDialog";
import { DataTableAccount } from "./DataTable";
import { ModalAddAccount } from "./Modal";
type Account = {
  phone: string;
  name: string;
  gender: string;
  role: string;
};
function getRandomRole(): string {
  const roles = ["0", "1", "2", "3"];
  const randomIndex = Math.floor(Math.random() * roles.length);
  return roles[randomIndex];
}
const generateMockData = (length: number): Account[] => {
  const mockData: Account[] = [];
  for (let i = 1; i <= length; i++) {
    mockData.push({
      phone: `12345678${i}`,
      name: `User ${i}`,
      gender: i % 2 === 0 ? "0" : "1",
      role: getRandomRole(),
    });
  }
  return mockData;
};
const data: Account[] = generateMockData(17);

export const AccountManager = () => {
  return (
    <div id="page-wrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="page-bar page-header">
              <ul className="page-breadcrumb">
                <li>
                  <i className="fa fa-home"></i>
                  <a href="/Admin/Index_Admin">Home</a>
                  <i className="fa fa-angle-right"></i>
                </li>
                <li>
                  <a href="/Account/Account_Manage">Quản lý tài khoản</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="panel panel-default">
              {/* <Dialog /> */}
              <div className="panel-heading d-flex">
                <div>
                  <i className="fa  fa-user fa-fw"></i>
                  Tài khoản
                </div>
                <a
                  className="add"
                  data-toggle="modal"
                  data-target="#myModal"
                  href="#"
                >
                  <div id="add" className="">
                    <i className="fa fa-plus"></i>
                    <span>Thêm mới</span>
                  </div>
                </a>
              </div>
              <div
                id="myModal"
                className="modal fade"
                tabIndex={-1}
                role="dialog"
              >
                <ModalAddAccount title="Thêm tài khoản" isCreate={true} />
              </div>
              <div className="panel-body">
                <div className="table-responsive">
                  <DataTableAccount data={data as Account[]} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
