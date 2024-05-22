const ROLE_ADMIN = "ADMIN";
const ROLE_DOCTOR = "DOCTOR";
const ROLE_PATIENT = "PATIENT";

const STATUS_UNLOCK = "S1";
const STATUS_LOCK = "Khóa";
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