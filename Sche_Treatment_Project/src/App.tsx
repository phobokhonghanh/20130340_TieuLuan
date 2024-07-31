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
import { Routes, Route, useLocation } from "react-router-dom";
import ErrorPage from "./Module/ErrorPage";
import { AdminHomePage } from "./Module/Admin/AdminHomePage";
import { AdminAccountPage } from "./Module/Admin/AdminAccountPage";
import { AdminServicePage } from "./Module/Admin/AdminServicePage";
import { AdminPackagePage } from "./Module/Admin/AdminPackagePage";
import { AdminCalendarPage } from "./Module/Admin/AdminCalendarPage";
import AppointmentPackageForm from "./Module/AppointmentPackagePage";
import AppointmentDoctor from "./Module/AppointmentDoctorPage";
import { AdminAppointmnetPage } from "./Module/Admin/AdminAppointmnentPage";
import {
  AdminRoutes,
  DoctorRoutes,
  UserRoutes,
} from "./Authentication/RoutesAuthentication";
import ForgotPassword, { ResetPassword } from "./Module/ResetPasswordPage";
import { ErrorPaymentPage, SuccessPage } from "./Component/Notification";
import { AdminBillPage } from "./Module/Admin/AdminBillPage";
import Titles from "./Utils/Titles";
import { useEffect } from "react";
import { AdminEvaluatePage } from "./Module/Admin/AdminEvaluePage";
import Layout, { LayoutAdmin } from "./Component/Layout";
import { AdminLogPage } from "./Module/Admin/AdminLogPage";
import { AdminAreaPage } from "./Module/Admin/AdminAreaPage";
function App() {
  const location = useLocation();
  const title = Titles[location.pathname];
  useEffect(() => {
    document.title = title;
  }, [location.pathname]);
  return (
    <>
      {/* không cần đăng nhập */}
      <Routes>
        <Route element={<Layout />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/reset-password/:accountId"
            element={<ResetPassword />}
          />
          <Route path="/otp/:accountId" element={<OTP />} />
          <Route path="/payment/success" element={<SuccessPage />} />
          <Route path="/payment/cancel" element={<ErrorPaymentPage />} />
          <Route path="*" element={<ErrorPage />} />

          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/doctors" element={<ListDoctors />} />
          <Route path="/doctor-infor" element={<DoctorInfor />} />
          <Route path="/packages" element={<ListPackage />} />
          <Route path="/services" element={<ListService />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route element={<UserRoutes />}>
            <Route path="/account" element={<Account />} />
            <Route path="/history" element={<History />} />
            <Route path="/appointment" element={<AppointmentForm />} />
            <Route path="/appointmentDoctor" element={<AppointmentDoctor />} />
            <Route
              path="/appointmentPackageForm"
              element={<AppointmentPackageForm />}
            />
          </Route>
        </Route>
        {/* phải đăng nhập và role là doctor */}
        <Route element={<DoctorRoutes />}>
          <Route path="/account-doctor" element={<AccountDoctorDetails />} />
        </Route>
        {/* phải đăng nhập và role là admin */}
        <Route element={<LayoutAdmin />}>
          <Route element={<DoctorRoutes />}>
            <Route
              path="/admin/appointments"
              element={<AdminAppointmnetPage />}
            />
          </Route>
          <Route element={<AdminRoutes />}>
            <Route path="/admin/register" element={<Register />} />
            <Route path="/admin/home" element={<AdminHomePage />} />
            <Route path="/admin" element={<AdminHomePage />} />
            <Route path="/admin/account" element={<AdminAccountPage />} />
            <Route path="/admin/area" element={<AdminAreaPage />} />
            <Route path="/admin/services" element={<AdminServicePage />} />
            <Route path="/admin/packages" element={<AdminPackagePage />} />
            <Route path="/admin/clinic" element={<AdminCalendarPage />} />
            <Route path="/admin/bill" element={<AdminBillPage />} />
            <Route path="/admin/log" element={<AdminLogPage />} />
            <Route
              path="/admin/appointments"
              element={<AdminAppointmnetPage />}
            />
            <Route path="/admin/evaluate" element={<AdminEvaluatePage />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
