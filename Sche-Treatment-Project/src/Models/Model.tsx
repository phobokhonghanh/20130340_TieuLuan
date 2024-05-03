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
  supportStatus: Support;
  packageServices: PackageService[];
}
export interface PackageService {
  id: string;
  medicalService: ServiceEntity;
  packageId: string;
  supportStatusId: Support;
}

export interface ServiceEntity {
  id: string;
  serviceName: string;
  servicePrice: string;
  serviceDescription: string;
  supportStatusId: Support;
  createdAt: string;
  updatedAt: string;
  clinicId: Clinic;
}

export interface Account {
  id: string;
  accountPhone: string;
  accountPassword: string;
  accountName: string;
  accountGender: number;
  createAt: string;
  updateAt: string;
  supportRole: Support;
  supportStatus: Support;
}
export interface DoctorEntity {
  id: string;
  accountPhone: string;
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
export interface Patient {
  id: string;
  accountPhone: string;
  accountPassword: string;
  accountName: string;
  accountGender: number;
  createAt: string;
  updateAt: string;
  supportRole: Support;
  supportStatus: Support;
  bhyt: string;
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
  isPaid: boolean;
  createdAt: string;
  updatedAt: string;
  appointment: AppointmentEntity;
}
export interface EvaluateDTO {
  id: string;
  evaluateContent: string;
  doctorId: string;
  appointmentId: string;
}
export interface ResultDTO {
  id: string;
  resultSymptom: string;
  resultDiagnostic: string;
  resultNote: string;
  appointmentId: string;
}