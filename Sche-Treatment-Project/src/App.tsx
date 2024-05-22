import { Account } from "./Module/AccountPage";
import { AccountDoctorDetails } from "./Module/AccountDoctorPage";
import AppointmentForm from "./Module/AppointmentPage";
import { DoctorInfor } from "./Module/DoctorInfoPage";
import { History } from "./Module/HistoryPage";
import HomePage from "./Module/HomePage";
import ListDoctors from "./Module/DoctorsPage";
import ListPackage from "./Module/PackagePage";
import ListService from "./Module/ServicePage";
import Login from "./Module/LoginPage";
import OTP from "./Module/OTP";

import Register from "./Module/RegisterPage";
import AboutUsPage from "./Module/AboutUsPage";
import { Routes, Route } from "react-router-dom";
import ErrorPage from "./Module/ErrorPage";
import { AdminHomePage } from "./Module/Admin/AdminHomePage";
import { AdminAccountPage } from "./Module/Admin/AdminAccountPage";
import { AdminServicePage } from "./Module/Admin/AdminServicePage";
import { AdminPackagePage } from "./Module/Admin/AdminPackagePage";
import { AdminCalendarPage } from "./Module/Admin/AdminCalendarPage";
import AppointmentPackageForm from "./Module/AppointmentPackagePage";
import AppointmentDoctor from "./Module/AppointmentDoctorPage";
import { BillPage } from "./Module/BillPage";
import { AdminAppointmnetPage } from "./Module/Admin/AdminAppointmnentPage";
import {
  AdminRoutes,
  DoctorRoutes,
  UserRoutes,
} from "./Authentication/RoutesAuthentication";
function App() {
  return (
    <>
      {/* không cần đăng nhập */}
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/otp/:accountId" element={<OTP />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/doctors" element={<ListDoctors />} />
        <Route path="/doctor-infor" element={<DoctorInfor />} />
        <Route path="/packages" element={<ListPackage />} />
        <Route path="/services" element={<ListService />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route element={<UserRoutes />}>
          <Route path="/bill" element={<BillPage />} />
          <Route path="/account" element={<Account />} />
          <Route path="/history" element={<History />} />
          <Route path="/appointment" element={<AppointmentForm />} />
          <Route path="/appointmentDoctor" element={<AppointmentDoctor />} />
          <Route
            path="/appointmentPackageForm"
            element={<AppointmentPackageForm />}
          />
        </Route>
        {/* phải đăng nhập và role là doctor */}
        <Route element={<DoctorRoutes />}>
          <Route path="/account-doctor" element={<AccountDoctorDetails />} />
          <Route
            path="/admin/appointments"
            element={<AdminAppointmnetPage />}
          />
        </Route>
        {/* phải đăng nhập và role là admin */}
        <Route element={<AdminRoutes />}>
          <Route path="/admin/register" element={<Register />} />
          <Route path="/admin/home" element={<AdminHomePage />} />
          <Route path="/admin" element={<AdminHomePage />} />
          <Route path="/admin/account" element={<AdminAccountPage />} />
          <Route path="/admin/services" element={<AdminServicePage />} />
          <Route path="/admin/packages" element={<AdminPackagePage />} />
          <Route path="/admin/clinic" element={<AdminCalendarPage />} />
          <Route
            path="/admin/appointments"
            element={<AdminAppointmnetPage />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
