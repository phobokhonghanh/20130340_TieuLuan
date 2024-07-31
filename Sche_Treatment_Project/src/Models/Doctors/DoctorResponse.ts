export class DoctorResponse {
  id: string;
  accountName: string;
  accountPhone: string;
  accountEmail: string;
  accountGender: number;
  doctorDegree: string;
  doctorRank: string;
  doctorSpecialty: string;
  doctorIntroduce: string;
  doctorExp: string;
  doctorImage: string;

  constructor(
    id: string,
    accountName: string,
    accountPhone: string,
    accountEmail: string,
    accountGender: number,
    doctorDegree: string,
    doctorRank: string,
    doctorSpecialty: string,
    doctorIntroduce: string,
    doctorExp: string,
    doctorImage: string
  ) {
    this.id = id;
    this.accountName = accountName;
    this.accountPhone = accountPhone;
    this.accountEmail = accountEmail;
    this.accountGender = accountGender;
    this.doctorDegree = doctorDegree;
    this.doctorRank = doctorRank;
    this.doctorSpecialty = doctorSpecialty;
    this.doctorIntroduce = doctorIntroduce;
    this.doctorExp = doctorExp;
    this.doctorImage = doctorImage;
  }

  getFullName(): string {
    return this.accountName;
  }

  getContactInfo(): string {
    return `Phone: ${this.accountPhone}, Email: ${this.accountEmail}`;
  }

  getNameDoctor(): string {
    return `${this.doctorRank}. ${this.doctorDegree} ${this.accountName}`;
  }
}
