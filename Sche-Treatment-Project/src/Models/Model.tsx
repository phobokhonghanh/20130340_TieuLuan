export interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  status: string;
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
export interface Doctor {
  doctorDegree: string;
  doctorRank: string;
  doctorIntroduce: string;
  doctorExp: string;
  doctorImage: string;
  accountId: Account;
}
export interface CalendarModel {
  id: string;
  createAt: string;
  updateAt: string;
  doctor: Doctor;
  timetables: Timetables[];
}
export interface Timetables {
  id: string;
  timetableDate: string;
  createAt: string;
  updateAt: string;
  supportTime: Support;
}
export interface Support {
  id: string;
  supportValue: string;
  supportInfo: string;
  createAt: string;
  updateAt: string;
}
export interface Clinic {
  id: string;
  clinicName: string;
  createAt: string;
  updateAt: string;
  supportStatus: Support;
  calendars: CalendarModel[];
}
