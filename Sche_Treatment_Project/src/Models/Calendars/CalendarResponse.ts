import { DoctorResponse } from "../Doctors/DoctorResponse";
import { GroupTime } from "../Model";

export class CalendarResponse {
  id: string;
  calendarDate: string;
  doctor: DoctorResponse;
  groupTime: GroupTime;
  constructor(
    id: string,
    calendarDate: string,
    doctor: DoctorResponse,
    groupTime: GroupTime
  ) {
    this.id = id;
    this.calendarDate = calendarDate;
    this.doctor = doctor;
    this.groupTime = groupTime;
  }
}
