import { headerAuth } from "./Authentication/Authentication";
import {
  AccountDTO,
  AppointmentDTO,
  CalendarDTO,
  ClinicDTO,
  DoctorDTO,
  EvaluateDTO,
  PackageDTO,
  ResultDTO,
  ServiceDTO,
  ServiceEntity,
  Signin,
  Signup,
} from "./Models/Model";
import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/v1";

export const API_ENDPOINTS = {
  //  ---------------- // ---------------- ADMIN ---------------- // ----------------  //

  // ---------------- calendar ---------------- //

  //http://localhost:8080/api/admin/calendar
  POST_CALENDAR: `${API_BASE_URL}/admin/calendar`,

  // ---------------- appointment ---------------- //

  //http://localhost:8080/api/admin/appointment/sum/months
  GET_APPOINTMENT_SUM_MONTHS: `${API_BASE_URL}/admin/appointment/sum/months`,

  //http://localhost:8080/api/admin/appointment/sum/status/months
  GET_APPOINTMENT_SUM_STAUS_MONTHS: `${API_BASE_URL}/admin/appointment/sum/status/months`,

  //http://localhost:8080/api/admin/appointment
  GET_APPOINTMENT_ADMIN: `${API_BASE_URL}/admin/appointment`,

  // ---------------- bill ---------------- //

  //http://localhost:8080/api/admin/bill/sum/months
  GET_BILL_SUM_MONTHS: `${API_BASE_URL}/admin/bill/sum/months`,

  //http://localhost:8080/api/admin/bill/sum/week
  GET_BILL_SUM_WEEK: `${API_BASE_URL}/admin/bill/sum/week`,

  //http://localhost:8080/api/admin/bill/all
  GET_BILL_ALL: `${API_BASE_URL}/admin/bill/all`,

  // ---------------- account ---------------- //

  //http://localhost:8080/api/admin/account/all
  GET_ACCOUNT_ALL: `${API_BASE_URL}/admin/account/all`,

  //http://localhost:8080/api/admin/account/update/role-doctor/{accountId}
  PATCH_ROLE_FROM_PATIENT_TO_DOCTOR: (accountId: string) =>
    `${API_BASE_URL}/admin/account/update/role-doctor/${accountId}`,

  //http://localhost:8080/api/admin/account/update/role-patient/{accountId}
  PATCH_ROLE_FROM_ADMIN_AND_DOCTOR_TO_PATIENT: (accountId: string) =>
    `${API_BASE_URL}/admin/account/update/role-patient/${accountId}`,

  //http://localhost:8080/api/admin/account/lock/{accountId}
  PATCH_LOCK_ACCOUNT: (accountId: string) =>
    `${API_BASE_URL}/admin/account/lock/${accountId}`,

  //http://localhost:8080/api/admin/account/unlock/{accountId}
  PATCH_UNLOCK_ACCOUNT: (accountId: string) =>
    `${API_BASE_URL}/admin/account/unlock/${accountId}`,

  // ---------------- clinic ---------------- //

  //http://localhost:8080/admin/api/clinic
  POST_CLINIC: `${API_BASE_URL}/admin/clinic`,

  // ---------------- package ---------------- //

  //http://localhost:8080/admin/api/package
  POST_PACKAGE: `${API_BASE_URL}/admin/package`,

  //http://localhost:8080/api/admin/packageService/${packageServicesId}
  DELETE_PACKAGE_SERVICE: (packageServicesId: string) =>
    `${API_BASE_URL}/admin/package/packageService/${packageServicesId}`,

  // ---------------- service ---------------- //

  //http://localhost:8080/api/admin/service
  POST_SERVICE: `${API_BASE_URL}/admin/service`,

  //  ---------------- // ---------------- DOCTOR ---------------- // ----------------  //

  // ---------------- payment ---------------- //

  //http://localhost:8080/api/doctor-side/payment/cash/{id}
  PATCH_BILL_PAYMENT_CASH: (id: string) =>
    `${API_BASE_URL}/doctor-side/payment/cash/${id}?is_pay=true`,

  // ---------------- doctor ---------------- //

  //http://localhost:8080/api/doctor-side/doctor/update
  PUT_DOCTOR_UPDATE: `${API_BASE_URL}/doctor-side/doctor/update`,
  // ---------------- result ---------------- //

  //http://localhost:8080/api/doctor-side/result
  POST_RESULT: `${API_BASE_URL}/doctor-side/result`,

  // ---------------- appointment ---------------- //

  //http://localhost:8080/api/doctor-side/appointment/${accountId}
  GET_APPOINTMENT_DOCTOR: (accountId: string) =>
    `${API_BASE_URL}/doctor-side/appointment/${accountId}`,

  //  ---------------- // ---------------- CLIENT ---------------- // ----------------  //

  // ---------------- clinic ---------------- //

  //http://localhost:8080/api/clinic/all
  GET_CLINIC_ALL: `${API_BASE_URL}/clinic/all`,

  //http://localhost:8080/api/clinic/calendar/${calendarId}
  GET_CLINIC_CALENDAR: (calendarId: string) =>
    `${API_BASE_URL}/clinic/calendar/${calendarId}`,

  // ---------------- account ---------------- //
  //http://localhost:8080/api/account/refresh-token/${accountId}
  GET_REFRESH_TOKEN: (accountId: string) =>
    `${API_BASE_URL}/account/refresh-token/${accountId}`,

  //http://localhost:8080/api/account/${accountId}
  GET_ACCOUNT: (accountId: string) => `${API_BASE_URL}/account/${accountId}`,

  //http://localhost:8080/api/account
  POST_ACCOUNT_UPDATE: `${API_BASE_URL}/account`,

  //http://localhost:8080/api/account/send-OTP-reset-password/{accountId}
  PATCH_ACCOUNT_SEND_OTP_RESET_PASSWORD: (accountId: string) =>
    `${API_BASE_URL}/account/send-OTP-reset-password/${accountId}`,

  //http://localhost:8080/api/register
  POST_ACCOUNT: `${API_BASE_URL}/auth/register`,

  //http://localhost:8080/api/auth/login
  POST_LOGIN: `${API_BASE_URL}/auth/login`,

  //http://localhost:8080/api/auth/confirm-OTP/{accountId}
  PATCH_CONFIRM_OTP: (accountId: string, otp: string) =>
    `${API_BASE_URL}/auth/confirm-OTP/${accountId}?otp=${otp}`,

  //http://localhost:8080/api/auth/forgot/{email}/{phone}
  PUT_ACCOUNT_FORGOT: (email: string, phone: string) =>
    `${API_BASE_URL}/auth/forgot/${email}/${phone}`,

  //http://localhost:8080/api/auth/reset-password
  PUT_ACCOUNT_RESET_PASSWORD: `${API_BASE_URL}/auth/reset-password`,

  // ---------------- doctor ---------------- //

  //http://localhost:8080/api/doctor/all
  GET_DOCTOR_ALL: `${API_BASE_URL}/doctor/all`,

  //http://localhost:8080/api/doctor/slides
  GET_DOCTOR_SLIDES: `${API_BASE_URL}/doctor/slides`,

  //http://localhost:8080/api/doctor/calendar
  GET_DOCTOR_CALENDAR: `${API_BASE_URL}/doctor/calendar`,

  //http://localhost:8080/api/doctor/${accountId}
  GET_DOCTOR: (accountId: string) => `${API_BASE_URL}/doctor/${accountId}`,

  //http://localhost:8080/api/doctor/calendar/${calendarId}
  GET_DOCTOR_CALENDAR_ID: (calendarId: string) =>
    `${API_BASE_URL}/doctor/calendar/${calendarId}`,

  // ---------------- patient ---------------- //

  //http://localhost:8080/api/patient/${accountId}
  GET_PATIENT: (accountId: string) => `${API_BASE_URL}/patient/${accountId}`,

  //http://localhost:8080/api/patient/update/{accountId}
  PATCH_PATIENT_BHYT: (accountId: string, bhyt: string) =>
    `${API_BASE_URL}/patient/update/${accountId}?bhyt=${bhyt}`,

  // ---------------- area ---------------- //

  //http://localhost:8080/api/area/all
  GET_AREA_ALL: `${API_BASE_URL}/area/all`,

  //http://localhost:8080/api/area/{{areaId}}
  GET_AREA: (areaId: string) => `${API_BASE_URL}/area/${areaId}`,

  // ---------------- support ---------------- //

  //http://localhost:8080/api/support/allTime
  GET_SUPPORT_ALLTIME: `${API_BASE_URL}/support/allTime`,

  //http://localhost:8080/api/support/allTimeAppointment/${calendarId}
  GET_SUPPORT_ALL_TIME_APPOINTMENT: (calendarId: string) =>
    `${API_BASE_URL}/support/allTimeAppointment/${calendarId}`,

  //http://localhost:8080/api/support/${supportId}
  GET_SUPPORT: (supportId: string) => `${API_BASE_URL}/support/${supportId}`,

  // ---------------- package ---------------- //

  //http://localhost:8080/api/package/slides
  GET_PACKAGE_SLIDES: `${API_BASE_URL}/package/slides`,

  //http://localhost:8080/api/package/calendar
  GET_PACKAGE_CALENDAR: `${API_BASE_URL}/package/calendar`,

  //http://localhost:8080/api/package/calendar/list
  GET_PACKAGE_CALENDAR_LIST: `${API_BASE_URL}/package/calendar/list`,

  //http://localhost:8080/api/package/default
  GET_PACKAGE_DEFAULT: `${API_BASE_URL}/package/default`,

  //http://localhost:8080/api/package/all
  GET_PACKAGE_ALL: `${API_BASE_URL}/package/all`,

  //http://localhost:8080/api/package/area/{medicalAreaId}
  GET_PACKAGE_AREA: (medicalAreaId: string) =>
    `${API_BASE_URL}/package/area/${medicalAreaId}`,

  //http://localhost:8080/api/package/{{packageId}}
  GET_PACKAGE: (packageId: string) => `${API_BASE_URL}/package/${packageId}`,

  // ---------------- service ---------------- //

  //http://localhost:8080/api/service/calendar
  GET_SERVICE_CALENDAR: `${API_BASE_URL}/service/calendar`,

  //http://localhost:8080/api/service/all
  GET_SERVICE_ALL: `${API_BASE_URL}/service/all`,

  //http://localhost:8080/api/service/area/{medicalAreaId}
  GET_SERVICE_AREA: (medicalAreaId: string) =>
    `${API_BASE_URL}/service/area/${medicalAreaId}`,

  //http://localhost:8080/api/service/all/select
  GET_SERVICES_NOT_SELECTED: `${API_BASE_URL}/service/all/select`,

  // ---------------- appointment ---------------- //

  //http://localhost:8080/api/appointment
  POST_APPOINTMENT: `${API_BASE_URL}/appointment`,

  //http://localhost:8080/api/appointment/calendar/${calendarId}
  GET_APPOINTMENT_CALENDAR: (calendarId: string) =>
    `${API_BASE_URL}/appointment/calendar/${calendarId}`,

  //http://localhost:8080/api/appointment/user/${accountId}
  GET_APPOINTMENT_USER: (accountId: string) =>
    `${API_BASE_URL}/appointment/user/${accountId}`,

  //http://localhost:8080/api/appointment/status/{appointmentId}
  PATCH_APPOINTMENT: (appointmentId: string) =>
    `${API_BASE_URL}/appointment/status/${appointmentId}`,

  // ---------------- calendar ---------------- //

  //http://localhost:8080/api/calendar/doctor/${doctorId}
  GET_CALENDAR_DOCTOR: (doctorId: string) =>
    `${API_BASE_URL}/calendar/doctor/${doctorId}`,

  //http://localhost:8080/api/calendar/clinic/${clinicId}
  GET_CALENDAR_CLINIC: (clinicId: string) =>
    `${API_BASE_URL}/calendar/clinic/${clinicId}`,

  //http://localhost:8080/api/calendar/${calendarId}
  GET_CALENDAR: (calendarId: string) =>
    `${API_BASE_URL}/calendar/${calendarId}`,

  // ---------------- bill ---------------- //

  //http://localhost:8080/api/bill/appointment/${appointmentId}
  GET_BILL_APPOINTMENT: (appointmentId: string) =>
    `${API_BASE_URL}/bill/appointment/${appointmentId}`,

  // ---------------- result ---------------- //

  //http://localhost:8080/api/result/appointment/${appointmentId}
  GET_RESULT_APPOINTMENT: (appointmentId: string) =>
    `${API_BASE_URL}/result/appointment/${appointmentId}`,

  // ---------------- evaluate ---------------- //

  //http://localhost:8080/api/evaluate/appointment/${appointmentId}
  GET_EVALUATE_APPOINTMENT: (appointmentId: string) =>
    `${API_BASE_URL}/evaluate/appointment/${appointmentId}`,

  //http://localhost:8080/api/evaluate
  POST_EVALUATE: `${API_BASE_URL}/evaluate`,

  //http://localhost:8080/api/evaluate/doctor/${doctorId}
  GET_EVALUATE_DOCTOR: (doctorId: string) =>
    `${API_BASE_URL}/evaluate/doctor/${doctorId}`,

  // ---------------- payment ---------------- //
  //http://localhost:8080/api/payment/paypal/{id}
  PUT_BILL_PAYMENT_PAYPAL: (id: string) =>
    `${API_BASE_URL}/payment/paypal/${id}`,
};

export const createPackage = async (packageDTO: PackageDTO) => {
  try {
    const headers = headerAuth();
    const response = await axios.post(
      API_ENDPOINTS.POST_PACKAGE,
      packageDTO,
      headers
    );
    return response;
  } catch (error) {
    console.error("Error creating package:", error);
    throw error;
  }
};

export const createService = (serviceDTO: ServiceDTO) =>
  axios.post(API_ENDPOINTS.POST_SERVICE, serviceDTO, headerAuth());

export const createCalendar = (calendar: CalendarDTO) =>
  axios.post(API_ENDPOINTS.POST_CALENDAR, calendar, headerAuth());

export const createAppointment = (appointment: AppointmentDTO) =>
  axios.post(API_ENDPOINTS.POST_APPOINTMENT, appointment, headerAuth());

export const createClinic = (clinic: ClinicDTO) =>
  axios.post(API_ENDPOINTS.POST_CLINIC, clinic, headerAuth());

export const createAppointmentResult = (result: ResultDTO) =>
  axios.post(API_ENDPOINTS.POST_RESULT, result, headerAuth());

export const createEvaluate = (evaluate: EvaluateDTO) =>
  axios.post(API_ENDPOINTS.POST_EVALUATE, evaluate, headerAuth());

export const register = (signup: Signup) =>
  axios.post(API_ENDPOINTS.POST_ACCOUNT, signup);

export const login = (signin: Signin) =>
  axios.post(API_ENDPOINTS.POST_LOGIN, signin);

export const sendOTPRestPassword = (accountId: string) =>
  axios.patch(
    API_ENDPOINTS.PATCH_ACCOUNT_SEND_OTP_RESET_PASSWORD(accountId),
    {},
    headerAuth()
  );

export const resetPassword = (signin: Signin) =>
  axios.put(API_ENDPOINTS.PUT_ACCOUNT_RESET_PASSWORD, signin, headerAuth());

export const forgotPassword = (email: string, phone: string) =>
  axios.put(API_ENDPOINTS.PUT_ACCOUNT_FORGOT(email, phone));

export const payment_paypal = (id: string) =>
  axios.put(API_ENDPOINTS.PUT_BILL_PAYMENT_PAYPAL(id), {}, headerAuth());
export const payment_paycash = (id: string) =>
  axios.patch(API_ENDPOINTS.PATCH_BILL_PAYMENT_CASH(id), {}, headerAuth());

export const updateAccount = (account: AccountDTO) =>
  axios.post(API_ENDPOINTS.POST_ACCOUNT_UPDATE, account, headerAuth());

export const updateDoctor = (doctor: DoctorDTO) =>
  axios.put(API_ENDPOINTS.PUT_DOCTOR_UPDATE, doctor, headerAuth());

export const updateBHYT_Patient = (accountId: string, bhyt: string) =>
  axios.patch(
    API_ENDPOINTS.PATCH_PATIENT_BHYT(accountId, bhyt),
    {},
    headerAuth()
  );

export const getServicesNotSelected = async (list: ServiceEntity[]) => {
  try {
    const response = await axios.post(
      API_ENDPOINTS.GET_SERVICES_NOT_SELECTED,
      list,
      headerAuth()
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateStatus = (appointmentId: string) =>
  axios.patch(API_ENDPOINTS.PATCH_APPOINTMENT(appointmentId), {}, headerAuth());

export const confirmOTP = (accountId: string, otp: string) =>
  axios.patch(
    API_ENDPOINTS.PATCH_CONFIRM_OTP(accountId, otp),
    {},
    headerAuth()
  );

export const deletePackageService = (packageServicesId: string) =>
  axios.delete(
    API_ENDPOINTS.DELETE_PACKAGE_SERVICE(packageServicesId),
    headerAuth()
  );

export const upRole = (accountId: string) =>
  axios.patch(
    API_ENDPOINTS.PATCH_ROLE_FROM_PATIENT_TO_DOCTOR(accountId),
    {},
    headerAuth()
  );

export const lowRole = (accountId: string) =>
  axios.patch(
    API_ENDPOINTS.PATCH_ROLE_FROM_ADMIN_AND_DOCTOR_TO_PATIENT(accountId),
    {},
    headerAuth()
  );
export const lockAccount = (accountId: string) =>
  axios.patch(API_ENDPOINTS.PATCH_LOCK_ACCOUNT(accountId), {}, headerAuth());

export const unlockAccount = (accountId: string) =>
  axios.patch(API_ENDPOINTS.PATCH_UNLOCK_ACCOUNT(accountId), {}, headerAuth());
