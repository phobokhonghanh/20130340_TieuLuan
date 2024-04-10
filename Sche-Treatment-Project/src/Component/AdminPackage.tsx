import { Dialog } from "./AdminDialog";
import { DataTablePackage } from "./DataTable";
import { ModalInterface } from "./Modal";
interface Package {
  id: string;
  name: string;
  price: string;
  status: string;
  listServices: Service[];
}
interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  status: string;
}

const generateMockDataService = (length: number): Service[] => {
  const mockData: Service[] = [];
  for (let i = 1; i <= length; i++) {
    mockData.push({
      id: `ServiceID${i}`,
      name: `Service Number ${i}`,
      description: `Mô tả dịch vụ`,
      price: `1000$`,
      status: i % 2 === 0 ? "0" : "1",
    } as Service);
  }
  return mockData;
};
const generateMockDataPackage = (length: number): Package[] => {
  const mockData: Package[] = [];
  for (let i = 1; i <= length; i++) {
    mockData.push({
      id: `PackageServiceID${i}`,
      name: `Package Service Number ${i}`,
      price: `1000$`,
      status: i % 2 === 0 ? "0" : "1",
      listServices: generateMockDataService(i),
    } as Package);
  }
  return mockData;
};
const data: Package[] = generateMockDataPackage(5);
// const dataPackage: Package = {
//   id: `PackageServiceID`,
//   name: `Package Service Number`,
//   price: `1000$`,
//   status: "1",
//   listServices: data,
// };
export const PackageManager = () => {
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
                  <a href="/Account/Account_Manage">
                    Quản lý gói dịch vụ khám bệnh
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="panel panel-default">
              <Dialog />
              <div className="panel-heading d-flex">
                <div>
                  <i className="fa  fa-user fa-fw"></i>
                  Gói dịch vụ khám bệnh
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
                <ModalInterface title="Thêm gói dịch vụ" isCreate={true} isPackage={true}/>
              </div>
              <div className="panel-body">
                <div className="table-responsive">
                  <DataTablePackage data={data as Package[]} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
