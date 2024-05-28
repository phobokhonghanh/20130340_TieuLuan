export interface Area {
  id: string;
  areaName: string;
  createAt: string;
  updateAt: string;
  supportStatus: string;
  clinics: Clinic[];
}

export interface PackageEntity {
  id: string;
  packageName: string;
  packagePrice: string;
  createdAt: string;
  updatedAt: string;
  clinicId: Clinic;
  supportStatusId: Support;
  packageServices: PackageService[];
}
export interface PackageDTO {
  id: string;
  packageName: string;
  packagePrice: string;
  clinicId: Clinic | undefined;
  supportStatusId: string;
  packageServices: PackageServiceDTO[];
}

export interface PackageServiceDTO {
  id: string;
  medicalService: string;
  packageId: string;
  // supportStatusId: string;
}
export interface PackageService {
  id: string;
  medicalService: ServiceEntity;
  packageId: string;
  supportStatusId: Support;
}
export interface ServiceDTO {
  id: string;
  serviceName: string;
  servicePrice: string;
  serviceDescription: string;
  supportStatusId: string;
  clinic: string;
}
export interface ServiceEntity {
  id: string;
  serviceName: string;
  servicePrice: string;
  serviceDescription: string;
  supportStatusId: Support;
  createdAt: string;
  updatedAt: string;
  clinic: Clinic;
}
export interface AccountDTO {
  id: string;
  accountName: string;
  accountPhone: string;
  accountEmail: string;
  accountGender: number;
}
export interface Account {
  id: string;
  accountPhone: string;
  accountEmail: string;
  accountName: string;
  accountGender: number;
  supportRoleId: string;
  supportStatusId: string;
}
export interface AccountResponse {
  accountDTO: Account;
  countSum: number;
  countCancel: number;
  countPay: number;
}
export interface DoctorEntity {
  id: string;
  accountPhone: string;
  accountEmail: string;
  accountPassword: string;
  accountName: string;
  accountGender: number;
  createAt: string;
  updateAt: string;
  supportRole: Support;
  supportStatus: Support;
  doctorDegree: string;
  doctorRank: string;
  doctorSpecialty: string;
  doctorIntroduce: string;
  doctorExp: string;
  doctorImage: string;
}
export interface DoctorDTO {
  id: string;
  doctorDegree: string;
  doctorRank: string;
  doctorSpecialty: string;
  doctorIntroduce: string;
  doctorExp: string;
  doctorImage: string;
}
export interface Patient {
  id: string;
  accountPhone: string;
  accountEmail: string;
  accountPassword: string;
  accountName: string;
  accountGender: number;
  createAt: string;
  updateAt: string;
  supportRole: Support;
  supportStatus: Support;
  patientBhyt: string;
}
export interface Signup {
  id: string;
  accountPhone: string;
  accountEmail: string;
  accountPassword: string;
  accountName: string;
  accountGender: number;
  supportRoleId: string;
  supportStatusId: string;
}
export interface Signin {
  phone: string;
  password: string;
}
export interface LoginResponse {
  message: string | null;
  token: string | null;
  refreshToken: string | null;
  tokenType: string | null;
  id: string | null;
  username: string | null;
  roles: string[] | null;
}
export interface CalendarDTO {
  id: string;
  calendarDate: string;
  clinicId: string;
  accountId: string;
  idGroupTime: string;
}
export interface CalendarModel {
  id: string;
  calendarDate: string;
  createAt: string;
  updateAt: string;
  doctor: DoctorEntity;
  groupTime: GroupTime;
}

export interface GroupTime {
  id: string;
  groupTimeDescription: string;
  supports: Support[];
}
export interface Support {
  id: string;
  supportValue: string;
  supportInfo: string;
  createAt: string;
  updateAt: string;
  groupTime: GroupTime;
}
export interface Clinic {
  id: string;
  clinicName: string;
  createAt: string;
  updateAt: string;
  supportStatus: Support;
  medicalAreaId: Area;
  calendars: CalendarModel[];
}
export interface ClinicDTO {
  id: string;
  clinicName: string;
  supportStatusId: string;
  medicalAreaId: Area | null;
}
export interface AppointmentEntity {
  id: string;
  appointmentFullname: string;
  appointmentPhone: string;
  appointmentGender: boolean;
  appointmentBhyt: string;
  appointmentSymptom: string;
  createAt: Date;
  updateAt: Date;
  supportStatus: Support;
  account: Patient;
  medicalPackage: PackageEntity;
  calendar: CalendarModel;
  supportTime: Support;
}
export interface AppointmentDTO {
  id: string;
  appointmentFullname: string;
  appointmentPhone: string;
  appointmentGender: string;
  appointmentBhyt: string;
  appointmentSymptom: string;
  accountId: string;
  packageId: string;
  calendarId: string;
  supportTimeId: string;
  supportStatusId: string;
}
export interface Bill {
  id: string;
  packagePrice: string;
  billSum: string;
  paid: boolean;
  createdAt: string;
  updatedAt: string;
  appointment: AppointmentEntity;
}
export interface BillDTO {
  id: string;
  packagePrice: string;
  billSum: string;
  paid: boolean;
  appointmentId: string;
  paymentId: string;
}
export interface EvaluateDTO {
  id: string;
  evaluateContent: string;
  doctorId: string;
  appointmentId: string;
  createAt: string;
  updateAt: string;
}
export interface ResultDTO {
  id: string;
  resultSymptom: string;
  resultDiagnostic: string;
  resultNote: string;
  appointmentId: string;
}
export interface StatisticalResponse {
  sum: number;
}
