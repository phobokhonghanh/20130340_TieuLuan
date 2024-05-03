import {
  AppointmentDTO,
  CalendarDTO,
  Clinic,
  ClinicDTO,
  EvaluateDTO,
  ResultDTO,
} from "./Models/Model";
import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api"; // Thay đổi thành URL cơ sở của API của bạn

export const API_ENDPOINTS = {
  // GET
  //http://localhost:8080/api/clinic/all
  GET_CLINIC_ALL: `${API_BASE_URL}/clinic/all`,

  //http://localhost:8080/api/doctor/all
  GET_DOCTOR_ALL: `${API_BASE_URL}/doctor/all`,

  //http://localhost:8080/api/doctor/slides
  GET_DOCTOR_SLIDES: `${API_BASE_URL}/doctor/slides`,

  //http://localhost:8080/api/doctor/calendar
  GET_DOCTOR_CALENDAR: `${API_BASE_URL}/doctor/calendar`,

  //http://localhost:8080/api/area/all
  GET_AREA_ALL: `${API_BASE_URL}/area/all`,
  //http://localhost:8080/api/appointment/admin
  GET_APPOINTMENT_ADMIN: `${API_BASE_URL}/appointment/admin`,

  //http://localhost:8080/api/support/allTime
  GET_SUPPORT_ALLTIME: `${API_BASE_URL}/support/allTime`,

  //http://localhost:8080/api/package/slides
  GET_PACKAGE_SLIDES: `${API_BASE_URL}/package/slides`,

  //http://localhost:8080/api/package/calendar
  GET_PACKAGE_CALENDAR: `${API_BASE_URL}/package/calendar`,

  //http://localhost:8080/api/package/calendar/list
  GET_PACKAGE_CALENDAR_LIST: `${API_BASE_URL}/package/calendar/list`,

  //http://localhost:8080/api/service/calendar
  GET_SERVICE_CALENDAR: `${API_BASE_URL}/service/calendar`,

  //http://localhost:8080/api/package/default
  GET_PACKAGE_DEFAULT: `${API_BASE_URL}/package/default`,

  //http://localhost:8080/api/service/area/{medicalAreaId}
  GET_SERVICE_AREA: (medicalAreaId: string) =>
    `${API_BASE_URL}/service/area/${medicalAreaId}`,

  //http://localhost:8080/api/service/area/{medicalAreaId}
  GET_PACKAGE_AREA: (medicalAreaId: string) =>
    `${API_BASE_URL}/package/area/${medicalAreaId}`,

  //http://localhost:8080/api/package/{{packageId}}
  GET_PACKAGE: (packageId: string) => `${API_BASE_URL}/package/${packageId}`,

  //http://localhost:8080/api/area/{{areaId}}
  GET_AREA: (areaId: string) => `${API_BASE_URL}/area/${areaId}`,

  //http://localhost:8080/api/appointment/calendar/${calendarId}
  GET_APPOINTMENT_CALENDAR: (calendarId: string) =>
    `${API_BASE_URL}/appointment/calendar/${calendarId}`,

  //http://localhost:8080/api/appointment/user/{{accountId}}
  GET_APPOINTMENT_USER: (accountId: string) =>
    `${API_BASE_URL}/appointment/user/${accountId}`,

  //http://localhost:8080/api/appointment/doctor/{{accountId}}
  GET_APPOINTMENT_DOCTOR: (accountId: string) =>
    `${API_BASE_URL}/appointment/doctor/${accountId}`,

  //http://localhost:8080/api/calendar/doctor/${doctorId}
  GET_CALENDAR_DOCTOR: (doctorId: string) =>
    `${API_BASE_URL}/calendar/doctor/${doctorId}`,

  //http://localhost:8080/api/calendar/clinic/${clinicId}
  GET_CALENDAR_CLINIC: (clinicId: string) =>
    `${API_BASE_URL}/calendar/clinic/${clinicId}`,
  //http://localhost:8080/api/calendar/${calendarId}
  GET_CALENDAR: (calendarId: string) =>
    `${API_BASE_URL}/calendar/${calendarId}`,

  //http://localhost:8080/api/clinic/calendar/${calendarId}
  GET_CLINIC_CALENDAR: (calendarId: string) =>
    `${API_BASE_URL}/clinic/calendar/${calendarId}`,

  //http://localhost:8080/api/calendar/${calendarId}
  GET_SUPPORT: (supportId: string) => `${API_BASE_URL}/support/${supportId}`,
  //http://localhost:8080/api/support/allTimeAppointment/${calendarId}
  GET_SUPPORT_ALL_TIME_APPOINTMENT: (calendarId: string) =>
    `${API_BASE_URL}/support/allTimeAppointment/${calendarId}`,
  //http://localhost:8080/api/account/calendar/${calendarId}
  GET_DOCTOR_CALENDAR_ID: (calendarId: string) =>
    `${API_BASE_URL}/doctor/calendar/${calendarId}`,
  //http://localhost:8080/api/bill/appointment/${appointmentId}
  GET_BILL_APPOINTMENT: (appointmentId: string) =>
    `${API_BASE_URL}/bill/appointment/${appointmentId}`,

  //http://localhost:8080/api/result/appointment/${appointmentId}
  GET_RESULT_APPOINTMENT: (appointmentId: string) =>
    `${API_BASE_URL}/result/appointment/${appointmentId}`,

  //http://localhost:8080/api/evaluate/appointment/${appointmentId}
  GET_EVALUATE_APPOINTMENT: (appointmentId: string) =>
    `${API_BASE_URL}/evaluate/appointment/${appointmentId}`,

  //POST
  //http://localhost:8080/api/calendar
  POST_CALENDAR: `${API_BASE_URL}/calendar`,

  //http://localhost:8080/api/appointment
  POST_APPOINTMENT: `${API_BASE_URL}/appointment`,

  //http://localhost:8080/api/result
  POST_RESULT: `${API_BASE_URL}/result`,

  //http://localhost:8080/api/clinic
  POST_CLINIC: `${API_BASE_URL}/clinic`,

  //http://localhost:8080/api/evaluate
  POST_EVALUATE: `${API_BASE_URL}/evaluate`,
};
export const createCalendar = (calendar: CalendarDTO) =>
  axios.post(API_ENDPOINTS.POST_CALENDAR, calendar);
export const createAppointment = (appointment: AppointmentDTO) =>
  axios.post(API_ENDPOINTS.POST_APPOINTMENT, appointment);
export const createClinic = (clinic: ClinicDTO) =>
  axios.post(API_ENDPOINTS.POST_CLINIC, clinic);
export const createAppointmentResult = (result: ResultDTO) =>
  axios.post(API_ENDPOINTS.POST_RESULT, result);
export const createEvaluate = (evaluate: EvaluateDTO) =>
  axios.post(API_ENDPOINTS.POST_EVALUATE, evaluate);
