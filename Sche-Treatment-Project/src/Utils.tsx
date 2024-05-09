import { PackageService, ServiceEntity } from "./Models/Model";

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
export function getListServices(
  listPackageService: PackageService[]
): ServiceEntity[] {
  const result: ServiceEntity[] = listPackageService
    ? listPackageService.map(
        (packageServices) => packageServices.medicalService
      )
    : [];
  return result;
}
export function formatPrice(price: string): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(parseFloat(price));
}
export function getServicesRemoved(
  listSelected: PackageService[], // lấy từ api
  listSelectedNew: ServiceEntity[] // vừa chọn
): PackageService[] {
  return listSelected.filter(
    (packageService) =>
      !listSelectedNew.some(
        (service) => service.id === packageService.medicalService.id
      )
  );
}
export function getServicesSelected(
  listSelected: ServiceEntity[],
  listSelectedNew: ServiceEntity[]
): ServiceEntity[] {
  return listSelectedNew.filter(
    (serviceNew) =>
      !listSelected.some((service) => service.id === serviceNew.id)
  );
}
