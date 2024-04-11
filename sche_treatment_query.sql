
DROP TABLE IF EXISTS support;
CREATE TABLE support (
		id VARCHAR(36) NOT NULL PRIMARY KEY,
		support_value TEXT,
		support_info TEXT,
		create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
DROP TABLE IF EXISTS account;
CREATE TABLE account (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    account_phone VARCHAR(20) NOT NULL,
    account_password VARCHAR(100) NOT NULL,
    account_name VARCHAR(255) NOT NULL,
    account_gender TINYINT(1) NOT NULL,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
		support_role_id VARCHAR(36) NOT NULL,
		support_status_id VARCHAR(36) NOT NULL,
		FOREIGN KEY (support_role_id) REFERENCES support(id),
		FOREIGN KEY (support_status_id) REFERENCES support(id)
);
DROP TABLE IF EXISTS patient;
CREATE TABLE patient(
		patient_bhyt VARCHAR(20),
		account_id VARCHAR(36) NOT NULL,
    FOREIGN KEY (account_id) REFERENCES account(id)
);
DROP TABLE IF EXISTS doctor;
CREATE TABLE doctor(
		doctor_degree VARCHAR(20),
		doctor_rank VARCHAR(20),
		doctor_specialty VARCHAR(255),
		doctor_introduce TEXT,
		doctor_exp VARCHAR(255),
		doctor_image TEXT, 
		account_id VARCHAR(36) NOT NULL,
    FOREIGN KEY (account_id) REFERENCES account(id)
);
	 ALTER TABLE doctor CHANGE COLUMN account_id id VARCHAR(36) NOT NULL;

DROP TABLE IF EXISTS medical_area;
CREATE TABLE medical_area (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
		area_name VARCHAR(255) NOT NULL,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
		support_status_id VARCHAR(36) NOT NULL,
		FOREIGN KEY (support_status_id) REFERENCES support(id)
);
DROP TABLE IF EXISTS clinic;
CREATE TABLE clinic (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    clinic_name VARCHAR(255) NOT NULL,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
		medical_area_id VARCHAR(36) NOT NULL,
		support_status_id VARCHAR(36) NOT NULL,
    FOREIGN KEY (medical_area_id) REFERENCES medical_area(id),
		FOREIGN KEY (support_status_id) REFERENCES support(id)
);
DROP TABLE IF EXISTS calendar;
CREATE TABLE calendar (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    clinic_id VARCHAR(36) NOT NULL,
		account_id VARCHAR(36) NOT NULL,
    FOREIGN KEY (account_id) REFERENCES account(id),
    FOREIGN KEY (clinic_id) REFERENCES clinic(id)
);
DROP TABLE IF EXISTS timetable;
CREATE TABLE timetable (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    calendar_id VARCHAR(36) NOT NULL,
		support_time_id VARCHAR(36) NOT NULL,
    FOREIGN KEY (calendar_id) REFERENCES calendar(id),
		FOREIGN KEY (support_time_id) REFERENCES support(id)
);
ALTER TABLE timetable
ADD COLUMN timetable_date DATE DEFAULT '2024-04-08';

DROP TABLE IF EXISTS medical_package;
CREATE TABLE medical_package (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
		package_name VARCHAR(255) NOT NULL,
		package_price VARCHAR(255) NOT NULL,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
		support_status_id VARCHAR(36) NOT NULL,
    clinic_id VARCHAR(36) NOT NULL,
    FOREIGN KEY (clinic_id) REFERENCES clinic(id),
		FOREIGN KEY (support_status_id) REFERENCES support(id)
);
DROP TABLE IF EXISTS medical_service;
CREATE TABLE medical_service (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
		service_name VARCHAR(255) NOT NULL,
		service_price VARCHAR(255) NOT NULL,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
		support_status_id VARCHAR(36) NOT NULL,
    clinic_id VARCHAR(36) NOT NULL,
    FOREIGN KEY (clinic_id) REFERENCES clinic(id),
		FOREIGN KEY (support_status_id) REFERENCES support(id)
);
DROP TABLE IF EXISTS medical_package_service;
CREATE TABLE medical_package_service (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    service_id VARCHAR(36) NOT NULL,
		package_id VARCHAR(36) NOT NULL,
		support_status_id VARCHAR(36) NOT NULL,
    FOREIGN KEY (service_id) REFERENCES medical_service(id),
		FOREIGN KEY (package_id) REFERENCES medical_package(id),
		FOREIGN KEY (support_status_id) REFERENCES support(id)
);
DROP TABLE IF EXISTS appointment;
CREATE TABLE appointment (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
		appointment_symptom TEXT,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
		support_status_id VARCHAR(36) NOT NULL,
    account_id VARCHAR(36) NOT NULL,
		package_id VARCHAR(36),
		calendar_id VARCHAR(36) NOT NULL,
    FOREIGN KEY (account_id) REFERENCES account(id),
		FOREIGN KEY (package_id) REFERENCES medical_package(id),
		FOREIGN KEY (calendar_id) REFERENCES calendar(id),
		FOREIGN KEY (support_status_id) REFERENCES support(id)

);

DROP TABLE IF EXISTS appointment_service;
CREATE TABLE appointment_service (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
		service_price VARCHAR(255) NOT NULL,
		appointment_id VARCHAR(36) NOT NULL,
		service_id VARCHAR(36) NOT NULL,
    FOREIGN KEY (appointment_id) REFERENCES appointment(id),
		FOREIGN KEY (service_id) REFERENCES medical_service(id)

);
DROP TABLE IF EXISTS appointment_result;
CREATE TABLE appointment_result (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
		result_symptom TEXT,
		result_diagnostic TEXT,
		result_note TEXT,
		create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
		appointment_id VARCHAR(36) NOT NULL,
    FOREIGN KEY (appointment_id) REFERENCES appointment(id)
);
DROP TABLE IF EXISTS evaluate; 
CREATE TABLE evaluate (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
		evaluate_content TEXT,
		create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
		doctor_id VARCHAR(36) NOT NULL,
		appointment_id VARCHAR(36) NOT NULL,
		FOREIGN KEY (doctor_id) REFERENCES account(id),
    FOREIGN KEY (appointment_id) REFERENCES appointment(id)
);

DROP TABLE IF EXISTS bill;
CREATE TABLE bill (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
		package_price VARCHAR(255) NOT NULL,
		bill_sum VARCHAR(255) NOT NULL,
		bill_ispay TINYINT(1) NOT NULL,
		create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
		appointment_id VARCHAR(36) NOT NULL,
    FOREIGN KEY (appointment_id) REFERENCES appointment(id)
);

DROP TABLE IF EXISTS log;
CREATE TABLE log (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
		log_content TEXT,
		create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
		account_id VARCHAR(36) NOT NULL,
		support_level_id VARCHAR(36) NOT NULL,
    FOREIGN KEY (account_id) REFERENCES account(id),
		FOREIGN KEY (support_level_id) REFERENCES support(id)
);