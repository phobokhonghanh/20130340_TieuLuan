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
import { Routes, Route, Router } from "react-router-dom";
import ErrorPage from "./Module/ErrorPage";
import { AdminHomePage } from "./Module/Admin/AdminHomePage";
import { AdminAccountPage } from "./Module/Admin/AdminAccountPage";
import { AdminServicePage } from "./Module/Admin/AdminServicePage";
import { AdminPackagePage } from "./Module/Admin/AdminPackagePage";
import { AdminCalendarPage } from "./Module/Admin/AdminCalendarPage";
import AppointmentPSDForm from "./Module/AppointmentPackagePage";
import AppointmentPackageForm from "./Module/AppointmentPackagePage";
import AppointmentDoctor from "./Module/AppointmentDoctorPage";
import { BillPage } from "./Module/BillPage";
import { AdminAppointmnetPage } from "./Module/Admin/AdminAppointmnentPage";
function App() {
  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/otp" element={<OTP />} />
      </Routes>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/account" element={<Account />} />
        <Route path="/account-doctor" element={<AccountDoctorDetails />} />
        <Route path="/appointment" element={<AppointmentForm />} />
        <Route path="/bill" element={<BillPage />} />
        <Route path="/appointmentDoctor" element={<AppointmentDoctor />} />
        <Route
          path="/appointmentPackageForm"
          element={<AppointmentPackageForm />}
        />
        <Route path="/doctor-infor" element={<DoctorInfor />} />
        <Route path="/history" element={<History />} />
        <Route path="/doctors" element={<ListDoctors />} />
        <Route path="/packages" element={<ListPackage />} />
        <Route path="/services" element={<ListService />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/error" element={<ErrorPage />} />
      </Routes>
      <Routes>
        <Route path="/admin/home" element={<AdminHomePage />} />
        <Route path="/admin" element={<AdminHomePage />} />
        <Route path="/admin/account" element={<AdminAccountPage />} />
        <Route path="/admin/services" element={<AdminServicePage />} />
        <Route path="/admin/packages" element={<AdminPackagePage />} />
        <Route path="/admin/clinic" element={<AdminCalendarPage />} />
        <Route path="/admin/appointments" element={<AdminAppointmnetPage />} />
      </Routes>

      {/* <RouterProvider router={router} /> */}

      {/* <Register /> */}
      {/* <Login /> */}
      {/* <OTP /> */}
      {/* <AppointmentForm /> */}
      {/* <HomePage /> */}
      {/* <ListPackage /> */}
      {/* <ListDoctors /> */}
      {/* <ListService /> */}
      {/* <Account /> */}
      {/* <AccountDoctorDetails /> */}
      {/* <History /> */}
      {/* <DoctorInfor/> */}
      {/* <AboutUsPage /> */}

      {/* -Admin- */}
      {/* <AdminHomePage /> */}
      {/* <AdminAccountPage /> */}
      {/* <AdminServicePage /> */}
      {/* <AdminPackagePage /> */}
      {/* <AdminCalendarPage/> */}
    </>
  );
}

export default App;
