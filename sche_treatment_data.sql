-- data support
INSERT INTO support (id, support_value, support_info)
VALUES  ('R1', 'Admin', 'ROLE'),('R2', 'Bác sĩ', 'ROLE'), ('R3', 'Quản lý', 'ROLE'),('R4', 'Bệnh nhân', 'ROLE'),
				('S1', 'Mở', 'STATUS'),('S2', 'Khóa', 'STATUS'), ('S3', 'Duyệt', 'STATUS'),('S4', 'Hủy', 'STATUS'),
				('L1', 'Info', 'LEVEL'),('L2', 'Warning', 'LEVEL'), ('L3', 'Danger', 'LEVEL'),
		('T1', '07:00 - 07:30', 'TIME'),
    ('T2', '07:30 - 08:00', 'TIME'),
    ('T3', '08:00 - 08:30', 'TIME'),
    ('T4', '08:30 - 09:00', 'TIME'),
    ('T5', '09:00 - 09:30', 'TIME'),
    ('T6', '09:30 - 10:00', 'TIME'),
    ('T7', '10:00 - 10:30', 'TIME'),
    ('T8', '10:30 - 11:00', 'TIME'),
    ('T9', '11:00 - 11:30', 'TIME'),
    ('T10', '11:30 - 12:00', 'TIME'),
    ('T11', '12:00 - 12:30', 'TIME'),
    ('T12', '12:30 - 13:00', 'TIME'),
    ('T13', '13:00 - 13:30', 'TIME'),
    ('T14', '13:30 - 14:00', 'TIME'),
    ('T15', '14:00 - 14:30', 'TIME'),
    ('T16', '14:30 - 15:00', 'TIME'),
    ('T17', '15:00 - 15:30', 'TIME'),
    ('T18', '15:30 - 16:00', 'TIME'),
    ('T19', '16:00 - 16:30', 'TIME');
		
-- data account
-- patient
INSERT INTO account (id, account_phone, account_password, account_name, account_gender, support_role_id, support_status_id)
SELECT
    UUID(), 
    CONCAT('0', FLOOR(RAND() * 1000000000)), 
    MD5('dataAccountFake'),
    CONCAT('Patient_', LPAD(FLOOR(RAND() * 10000), 4, '0')),
    FLOOR(RAND() * 2), 
    'R4',
    'S1' 
FROM
    information_schema.tables 
LIMIT
    10; 
-- doctor
INSERT INTO account (id, account_phone, account_password, account_name, account_gender, support_role_id, support_status_id)
VALUES
    (UUID(), '0987654321', MD5('dataAccountFake'), 'John Doe', 1, 'R2','S1'),
    (UUID(), '0123456789', MD5('dataAccountFake'), 'Jane Smith', 0, 'R2','S1'),
    (UUID(), '0909090909', MD5('dataAccountFake'), 'Alex Johnson', 1, 'R2','S1'),
    (UUID(), '0999999999', MD5('dataAccountFake'), 'Alice Williams', 0, 'R2','S1'),
    (UUID(), '0888888888', MD5('dataAccountFake'), 'Bob Brown', 1, 'R2','S1'),
    (UUID(), '0777777777', MD5('dataAccountFake'), 'Emily Davis', 0, 'R2','S1'),
    (UUID(), '0666666666', MD5('dataAccountFake'), 'Michael Wilson', 1, 'R2','S1'),
    (UUID(), '0555555555', MD5('dataAccountFake'), 'Jessica Taylor', 0, 'R2','S1'),
    (UUID(), '0444444444', MD5('dataAccountFake'), 'William Martinez', 1, 'R2','S1'),
    (UUID(), '0333333333', MD5('dataAccountFake'), 'Sarah Anderson', 0, 'R2','S1');
		
-- data patient
INSERT INTO patient (patient_bhyt, account_id)
SELECT CONCAT('BHYT', LPAD(FLOOR(RAND() * 100000), 6, '0')), id
FROM account
ORDER BY RAND()
LIMIT 10;
-- data doctor
INSERT INTO doctor (doctor_degree, doctor_rank, doctor_specialty, doctor_introduce, doctor_exp, doctor_image, account_id)
SELECT
    CASE FLOOR(RAND() * 3)
        WHEN 0 THEN 'Thạc sĩ'
        WHEN 1 THEN 'Tiến sĩ'
        ELSE 'Tiến sĩ khoa học'
    END AS doctor_degree,
    CASE FLOOR(RAND() * 5)
       WHEN 0 THEN 'Bác sĩ'
        WHEN 1 THEN 'Bác sĩ chuyên khoa I'
        WHEN 2 THEN 'Bác sĩ chuyên khoa II'
        WHEN 3 THEN 'Giáo sư'
        ELSE 'Phó giáo sư'
    END AS doctor_rank,
    CASE FLOOR(RAND() * 5)
               WHEN 0 THEN 'Nội khoa'
               WHEN 1 THEN 'Ngoại khoa'
               WHEN 2 THEN 'Nhi khoa'
               WHEN 3 THEN 'Da liễu'
               ELSE 'Răng hàm mặt'
     END AS doctor_specialty,
		CONCAT('Tôi là bác sĩ với kinh nghiệm làm việc trong lĩnh vực hơn ', FLOOR(RAND() * 20) + 5, ' năm.') AS doctor_introduce,
    CONCAT('Kinh nghiệm làm việc hơn ', FLOOR(RAND() * 30) + 5, ' năm.') AS doctor_exp,
    'link_to_image' AS doctor_image,
    id AS account_id
FROM account 
WHERE account.support_role_id = 'R2'
ORDER BY RAND()
LIMIT 10;

-- data medical_area
INSERT INTO medical_area (id, area_name, support_status_id)
VALUES
    (UUID(), 'Khu khám thường', 'S1'),
    (UUID(), 'Khu khám theo yêu cầu', 'S1');
	
-- data clinic
-- data kham thuong
INSERT INTO clinic (id, clinic_name, medical_area_id, support_status_id)
VALUES
		(UUID(), 'Phòng Tiếp nhận gói khám bệnh', '45ff5855-f0e6-11ee-9b50-847beb19aaf6', 'S1'),
    (UUID(), 'Phòng Sản phụ khoa', '45ff5855-f0e6-11ee-9b50-847beb19aaf6', 'S1'),
    (UUID(), 'Phòng Da liễu - Thẩm mỹ', '45ff5855-f0e6-11ee-9b50-847beb19aaf6', 'S1'),
    (UUID(), 'Phòng Nhi khoa', '45ff5855-f0e6-11ee-9b50-847beb19aaf6', 'S1'),
    (UUID(), 'Phòng Tiêu hóa - Gan mật', '45ff5855-f0e6-11ee-9b50-847beb19aaf6', 'S1'),
    (UUID(), 'Phòng Nội Thần kinh', '45ff5855-f0e6-11ee-9b50-847beb19aaf6', 'S1'),
    (UUID(), 'Phòng Nam khoa', '45ff5855-f0e6-11ee-9b50-847beb19aaf6', 'S1'),
    (UUID(), 'Phòng Tai Mũi Họng', '45ff5855-f0e6-11ee-9b50-847beb19aaf6', 'S1'),
    (UUID(), 'Phòng Mắt - Khoa Mắt', '45ff5855-f0e6-11ee-9b50-847beb19aaf6', 'S1'),
    (UUID(), 'Phòng Răng Hàm Mặt', '45ff5855-f0e6-11ee-9b50-847beb19aaf6', 'S1'),
    (UUID(), 'Phòng Ung Bướu - Tiểu Đường', '45ff5855-f0e6-11ee-9b50-847beb19aaf6', 'S1'),
    (UUID(), 'Phòng Tim Mạch', '45ff5855-f0e6-11ee-9b50-847beb19aaf6', 'S1'),
    (UUID(), 'Phòng Hô hấp - Phổi', '45ff5855-f0e6-11ee-9b50-847beb19aaf6', 'S1');
		
-- data kham theo dich vu
INSERT INTO clinic (id, clinic_name, medical_area_id, support_status_id)
VALUES
		(UUID(), 'Phòng Tiếp nhận gói khám bệnh', '46008b00-f0e6-11ee-9b50-847beb19aaf6', 'S1'),
    (UUID(), 'Phòng Sản phụ khoa', '46008b00-f0e6-11ee-9b50-847beb19aaf6', 'S1'),
    (UUID(), 'Phòng Da liễu - Thẩm mỹ', '46008b00-f0e6-11ee-9b50-847beb19aaf6', 'S1'),
    (UUID(), 'Phòng Nhi khoa', '46008b00-f0e6-11ee-9b50-847beb19aaf6', 'S1'),
    (UUID(), 'Phòng Tiêu hóa - Gan mật', '46008b00-f0e6-11ee-9b50-847beb19aaf6', 'S1'),
    (UUID(), 'Phòng Nội Thần kinh', '46008b00-f0e6-11ee-9b50-847beb19aaf6', 'S1'),
    (UUID(), 'Phòng Nam khoa', '46008b00-f0e6-11ee-9b50-847beb19aaf6', 'S1'),
    (UUID(), 'Phòng Tai Mũi Họng', '46008b00-f0e6-11ee-9b50-847beb19aaf6', 'S1'),
    (UUID(), 'Phòng Mắt - Khoa Mắt', '46008b00-f0e6-11ee-9b50-847beb19aaf6', 'S1'),
    (UUID(), 'Phòng Răng Hàm Mặt', '46008b00-f0e6-11ee-9b50-847beb19aaf6', 'S1'),
    (UUID(), 'Phòng Ung Bướu - Tiểu Đường', '46008b00-f0e6-11ee-9b50-847beb19aaf6', 'S1'),
    (UUID(), 'Phòng Tim Mạch', '46008b00-f0e6-11ee-9b50-847beb19aaf6', 'S1'),
    (UUID(), 'Phòng Hô hấp - Phổi', '46008b00-f0e6-11ee-9b50-847beb19aaf6', 'S1');
		
-- data calendar
INSERT INTO calendar (id, clinic_id, account_id)
VALUES
 (UUID(), '56f297ac-f0eb-11ee-9b50-847beb19aaf6', '0fb07e02-f0dd-11ee-9b50-847beb19aaf6'),
 (UUID(), '56f44d5c-f0eb-11ee-9b50-847beb19aaf6', '0fb117c6-f0dd-11ee-9b50-847beb19aaf6'),
 (UUID(), '56f44ea4-f0eb-11ee-9b50-847beb19aaf6', '0fb118b9-f0dd-11ee-9b50-847beb19aaf6'),
 (UUID(), '56f44f1f-f0eb-11ee-9b50-847beb19aaf6', '0fb1196f-f0dd-11ee-9b50-847beb19aaf6'),
 (UUID(), '56f44f8c-f0eb-11ee-9b50-847beb19aaf6', '0fb119ea-f0dd-11ee-9b50-847beb19aaf6');
	-- data timetable 
INSERT INTO timetable (id, calendar_id, support_time_id)
SELECT UUID(), calendar.id AS calendar_id, support.id AS support_time_id
FROM calendar JOIN support
WHERE support.support_info = 'TIME';
-- data medical_package
INSERT INTO medical_package (id, package_name, package_price, support_status_id, clinic_id)
VALUES
    (UUID(), 'Gói khám tổng quát', '500000', 'S1', '3a3a8c90-f0fe-11ee-9b50-847beb19aaf6'),
    (UUID(), 'Gói khám da liễu', '300000', 'S1', '3a3a8c90-f0fe-11ee-9b50-847beb19aaf6'),
    (UUID(), 'Gói khám mắt', '400000', 'S1', '3a3a8c90-f0fe-11ee-9b50-847beb19aaf6'),
    (UUID(), 'Gói khám tai mũi họng', '350000', 'S1', '3a3a8c90-f0fe-11ee-9b50-847beb19aaf6'),
    (UUID(), 'Gói khám nội tiết', '450000', 'S1', '3a3a8c90-f0fe-11ee-9b50-847beb19aaf6'),
    (UUID(), 'Gói khám tim mạch', '600000', 'S1', '3a3a8c90-f0fe-11ee-9b50-847beb19aaf6'),
    (UUID(), 'Gói khám hô hấp', '380000', 'S1', '3a3a8c90-f0fe-11ee-9b50-847beb19aaf6'),
    (UUID(), 'Gói khám nhi khoa', '320000', 'S1', '3d35a4fc-f0fe-11ee-9b50-847beb19aaf6'),
    (UUID(), 'Gói khám ung bướu', '550000', 'S1', '3d35a4fc-f0fe-11ee-9b50-847beb19aaf6'),
    (UUID(), 'Gói khám sản phụ khoa', '700000', 'S1', '3d35a4fc-f0fe-11ee-9b50-847beb19aaf6'),
    (UUID(), 'Gói khám răng hàm mặt', '450000', 'S1', '3d35a4fc-f0fe-11ee-9b50-847beb19aaf6');
		
-- data medical_service
INSERT INTO medical_service (id, service_name, service_price, support_status_id, clinic_id)
VALUES
    (UUID(), 'Dịch vụ xét nghiệm máu', '500000', 'S1', '3a3a8c90-f0fe-11ee-9b50-847beb19aaf6'),
    (UUID(), 'Dịch vụ xét nghiệm nước tiểu', '300000', 'S1', '3a3a8c90-f0fe-11ee-9b50-847beb19aaf6'),
    (UUID(), 'Dịch vụ xét nghiệm huyết thống', '400000', 'S1', '3a3a8c90-f0fe-11ee-9b50-847beb19aaf6'),
    (UUID(), 'Dịch vụ khám chuyên khoa', '350000', 'S1', '3a3a8c90-f0fe-11ee-9b50-847beb19aaf6'),
    (UUID(), 'Dịch vụ Xét nghiệm ung thư chuyên sâu', '450000', 'S1', '3a3a8c90-f0fe-11ee-9b50-847beb19aaf6'),
    (UUID(), 'Dịch vụ Xét Nghiệm Chức Năng Gan Chuyên Sâu', '600000', 'S1', '3a3a8c90-f0fe-11ee-9b50-847beb19aaf6'),
    (UUID(), 'Dịch vụ kiểm tra sức khỏe', '380000', 'S1', '3a3a8c90-f0fe-11ee-9b50-847beb19aaf6'),
    (UUID(), 'Dịch vụ xét nghiệm COVID-19', '320000', 'S1', '3d35a4fc-f0fe-11ee-9b50-847beb19aaf6'),
    (UUID(), 'Dịch vụ xét nghiệm ung bướu', '550000', 'S1', '3d35a4fc-f0fe-11ee-9b50-847beb19aaf6'),
    (UUID(), 'Dịch vụ xét nghiệm dị ứng', '700000', 'S1', '3d35a4fc-f0fe-11ee-9b50-847beb19aaf6'),
    (UUID(), 'Dịch vụ xét nghiệm AIDS', '450000', 'S1', '3d35a4fc-f0fe-11ee-9b50-847beb19aaf6');
-- data medical_package_service
INSERT INTO medical_package_service (id, service_id, package_id, support_status_id)
VALUES
    (UUID(), '46aae66a-f104-11ee-9b50-847beb19aaf6', '8b4621e4-f0fe-11ee-9b50-847beb19aaf6', 'S1'),
    (UUID(), '46afb26c-f104-11ee-9b50-847beb19aaf6', '8b4621e4-f0fe-11ee-9b50-847beb19aaf6', 'S1'),
		(UUID(), '46afb527-f104-11ee-9b50-847beb19aaf6', '8b4621e4-f0fe-11ee-9b50-847beb19aaf6', 'S1'),
		
		(UUID(), '46afb527-f104-11ee-9b50-847beb19aaf6', '8b4b8676-f0fe-11ee-9b50-847beb19aaf6', 'S1'),
		(UUID(), '46afb666-f104-11ee-9b50-847beb19aaf6', '8b4b8676-f0fe-11ee-9b50-847beb19aaf6', 'S1'),
		(UUID(), '46b4696b-f104-11ee-9b50-847beb19aaf6', '8b4b8676-f0fe-11ee-9b50-847beb19aaf6', 'S1'),
		
		(UUID(), '46b4696b-f104-11ee-9b50-847beb19aaf6', '8b46ba77-f0fe-11ee-9b50-847beb19aaf6', 'S1'),
		(UUID(), '46b469da-f104-11ee-9b50-847beb19aaf6', '8b46ba77-f0fe-11ee-9b50-847beb19aaf6', 'S1'),
		
		(UUID(), '46afb26c-f104-11ee-9b50-847beb19aaf6', '8b4b86e7-f0fe-11ee-9b50-847beb19aaf6', 'S1'),
		(UUID(), '46aae66a-f104-11ee-9b50-847beb19aaf6', '8b4b86e7-f0fe-11ee-9b50-847beb19aaf6', 'S1');
-- Truy van		
SELECT mp.package_name, ms.service_name from medical_package_service mps join medical_package mp on mps.package_id = mp.id JOIN medical_service ms on mps.service_id = ms.id
SELECT * from account left join doctor on account.id = doctor.account_id left join patient on account.id = patient.account_id
SELECT clinic.clinic_name, account.account_name,t.timetable_date, s.support_value FROM calendar c LEFT JOIN timetable t on c.id = t.calendar_id join support s on t.support_time_id = s.id join clinic on c.clinic_id = clinic.id join account on c.account_id = account.id

SELECT clinic.* FROM clinic