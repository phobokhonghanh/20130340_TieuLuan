import { format } from "date-fns";
import { PackageService, ServiceDTO, ServiceEntity } from "../Models/Model";

const ROLE_ADMIN = "ADMIN";
const ROLE_DOCTOR = "DOCTOR";
const ROLE_PATIENT = "PATIENT";

const STATUS_LOCK = "Khóa";

export const styleLevel = (level: string): string => {
  switch (level) {
    case "Warning":
      return "rgb(229 81 81)";
    case "Danger":
      return "rgb(239 0 0)";
    case "Info":
      return "rgb(9 171 49)";
    default:
      return "info";
  }
};

export const checkAdmin = (role: string): boolean => {
  return role === ROLE_ADMIN;
};
export const checkDoctor = (role: string): boolean => {
  return role === ROLE_DOCTOR;
};
export const checkPatient = (role: string): boolean => {
  return role === ROLE_PATIENT;
};
export const checkLockAccount = (status: string): boolean => {
  return status === STATUS_LOCK;
};
export function convertDate(dateInput: string): string {
  const date = new Date(dateInput);
  const ngay = date.getDate();
  const thang = date.getMonth() + 1;
  const nam = date.getFullYear();
  return `${ngay < 10 ? "0" + ngay : ngay}-${thang}-${nam}`;
}
export function convertDateTime(dateInput: string): string {
  const date = new Date(dateInput);
  const gio = date.getHours();
  const phut = date.getMinutes();
  const giay = date.getSeconds();
  return `${gio}:${phut}:${giay}`;
}
export function getListServices(listPackageService: PackageService[]): ServiceDTO[] {
  const result: ServiceDTO[] = listPackageService
    ? listPackageService.map((packageServices) =>
        covert(packageServices.medicalService)
      )
    : [];
  return result;
}
function covert(service: ServiceEntity): ServiceDTO {
  return {
    id: service.id,
    serviceName: service.serviceName,
    servicePrice: service.servicePrice,
    serviceDescription: service.serviceDescription,
    supportStatusId: service.supportStatusId.id,
    clinic: service.clinic.clinicName,
  };
}
export function formatPrice(price: string): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(parseFloat(price));
}

export function formatDate(date: string) {
  return format(new Date(date), "dd/MM/yyyy");
}
export function formatDateTime(date: string) {
  return format(new Date(date), "HH:mm:ss dd/MM/yyyy");
}
export function getServicesRemoved(
  listSelected: PackageService[], // lấy từ api
  listSelectedNew: ServiceDTO[] // vừa chọn
): PackageService[] {
  return listSelected.filter(
    (packageService) =>
      !listSelectedNew.some(
        (service) => service.id === packageService.medicalService.id
      )
  );
}
export function getServicesSelected(
  listSelected: ServiceDTO[],
  listSelectedNew: ServiceDTO[]
): ServiceDTO[] {
  return listSelectedNew.filter(
    (serviceNew) =>
      !listSelected.some((service) => service.id === serviceNew.id)
  );
}
