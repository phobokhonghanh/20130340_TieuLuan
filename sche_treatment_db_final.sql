/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 100428 (10.4.28-MariaDB)
 Source Host           : localhost:3306
 Source Schema         : sche_treatment_db

 Target Server Type    : MySQL
 Target Server Version : 100428 (10.4.28-MariaDB)
 File Encoding         : 65001

 Date: 30/06/2024 10:00:56
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for account
-- ----------------------------
DROP TABLE IF EXISTS `account`;
CREATE TABLE `account`  (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `account_phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `account_password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `account_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `account_gender` tinyint(1) NOT NULL,
  `create_at` timestamp NULL DEFAULT current_timestamp,
  `update_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `support_role_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `support_status_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `account_email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `account_OTP` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `support_role_id`(`support_role_id` ASC) USING BTREE,
  INDEX `support_status_id`(`support_status_id` ASC) USING BTREE,
  CONSTRAINT `account_ibfk_1` FOREIGN KEY (`support_role_id`) REFERENCES `support` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `account_ibfk_2` FOREIGN KEY (`support_status_id`) REFERENCES `support` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of account
-- ----------------------------
INSERT INTO `account` VALUES ('08f030d7-4688-4c3b-ac30-0f2c4bda5a27', '014785236987', '$2a$10$4qvPvs1d0YTt9TnUfpbfwudsPCqLu54SoRZdj8IAey0bthFurf88y', 'toilaadmin', 0, '2024-06-26 17:23:56', '2024-06-28 21:17:37', 'R4', 'S1', 'toilaadmin123@gmail.com', NULL);
INSERT INTO `account` VALUES ('155286fa-bad3-4489-992c-83dba757e9d4', '0526989651', '$2a$10$QtlOcZI0QivQArxt5nENi.nv8tmiQX4aN0aFCJuPXDAYwaJxuHflu', 'Vũ Thu Phương', 1, '2024-06-26 17:36:32', '2024-06-30 09:02:22', 'R4', 'S1', 'thuphuong@gmail.com', NULL);
INSERT INTO `account` VALUES ('23d47246-0c11-4307-be65-6f15feb4175c', '0988901234', '$2a$10$9D./sQfssykHpV0zWXXyUua/f9DMwKJDSGKu3sDDab71QhnmZi4jG', 'Đặng Minh Tú', 0, '2024-06-28 21:11:46', '2024-06-29 00:21:09', 'R2', 'S1', 'dangminhtu@gmail.com', NULL);
INSERT INTO `account` VALUES ('27a4f109-a5d6-49fc-8bf3-86398462c14a', '0944567890', '$2a$10$K.e2/zz0RGeRl7OmukKZ3OG/bZKyzE4VDmnwtGx78PVd/.QCREKI.', 'Hoàng Văn Sơn', 0, '2024-06-28 21:10:50', '2024-06-29 00:21:11', 'R2', 'S1', 'hoangvanson@gmail.com', NULL);
INSERT INTO `account` VALUES ('30b8d9b2-f0f7-4800-bcd6-98ec8a4ae2cd', '0957890123', '$2a$10$AX/q4zkqgB9wI1cGZGH.JOFijS3gfZsBA6Nyr9QWvQkGx7dvUbTHu', 'Ngô Thị Lan', 0, '2024-06-28 21:08:27', '2024-06-29 00:21:20', 'R2', 'S1', 'ngothilan@gmail.com', NULL);
INSERT INTO `account` VALUES ('3801eb3d-f892-453e-ab38-621f3345bae4', '0980123456', '$2a$10$2S5VRxnmvhgdQfq4.1BzveRe/Xu/YjIgb4p7WPsfaUXHnmD1qcTlu', 'Nguyễn Văn Nam', 0, '2024-06-28 21:09:19', '2024-06-29 00:21:23', 'R2', 'S1', 'nguyenvannam@gmail.com', NULL);
INSERT INTO `account` VALUES ('44db40f6-004e-41a5-a208-6218198cf357', '0977890123', '$2a$10$GTQJrJ2hHVe1R/Jswu8MYuCcYZ7kzZ/q/DpddU3anTaxif8ikjhgO', 'Ngô Thị Trang', 0, '2024-06-28 21:11:32', '2024-06-29 00:21:13', 'R2', 'S1', 'ngothitrang@gmail.com', NULL);
INSERT INTO `account` VALUES ('4917099e-23c7-42d4-8ef9-765a3421f269', '0966789012', '$2a$10$9etDr/l98hlN6h0C5gTwLuiOSZ/8eTlyyaGg/XnAeXOb3.G3AO1PW', 'Đinh Văn Toàn', 0, '2024-06-28 21:11:21', '2024-06-29 00:21:27', 'R2', 'S1', 'dinhvantoan@gmail.com', NULL);
INSERT INTO `account` VALUES ('6bd0d4d9-a931-49cf-968c-86e62ca868f2', '0528700668', '$2a$10$tYkywwzdlSCm64/K6KSKP.v1zsQVdjyhafcJeISo6Ts0AX6qRlW3a', 'Nguyễn Thị Thu Hằng', 1, '2024-06-26 15:48:18', '2024-06-30 09:29:09', 'R4', 'S1', '20130340@st.hcmuaf.edu.vn', NULL);
INSERT INTO `account` VALUES ('6df6f8d3-3914-4388-bfc1-be359b33a175', '0979012345', '$2a$10$SvpoSbiOef9m8xXtPF.12uaV/rIGv3Xytdtz.sEg49zFWnDH.9rGm', 'Bùi Thị Mai', 0, '2024-06-28 21:09:04', '2024-06-29 23:36:41', 'R2', 'S1', 'buithimai@gmail.com', NULL);
INSERT INTO `account` VALUES ('73e7c43b-a277-4848-b406-fed75a85ca6a', '0905479176', '$2a$10$eUHRs.71gEqjhetDIUVL7ea2c1pcjhdTUmOJlFlbJ0FHM8xuRL5Xi', 'Nguyễn Văn Hồng', 0, '2024-06-29 23:36:17', NULL, 'R1', 'S5', 'vanhong@gmail.com', '740370');
INSERT INTO `account` VALUES ('74499e95-5154-444a-a792-7bdeca32ce01', '0923456789', '$2a$10$dT78ZTUkAwXYi2ev3HSzvuAMFpyPgkrtDZhelmv29Aclybgn0suj6', 'Hoàng Văn Đức', 0, '2024-06-28 21:06:10', '2024-06-29 00:21:36', 'R2', 'S1', 'hoangvanduc@gmail.com', NULL);
INSERT INTO `account` VALUES ('7ae5f9cb-0cfa-4570-ae87-5fbb292da8cc', '0955678901', '$2a$10$WpfwG2UOdU6oYQW4Q1r92Oe5j0OV1zkcYpgyAV4Rc9ikqxHsyptha', 'Vũ Thị Thanh', 0, '2024-06-28 21:11:03', '2024-06-29 00:21:38', 'R2', 'S1', 'vuthithanh@gmail.com', NULL);
INSERT INTO `account` VALUES ('80a9362b-6b71-4ea9-bb46-34196b4a9790', '0922345678', '$2a$10$M2a95IuUZoI0RafCdu2lwOkU0BqRqc9/B9zbAR3q18JA/3cHa1pUC', 'Lê Văn Phú', 0, '2024-06-28 21:09:57', '2024-06-29 00:21:38', 'R2', 'S1', 'levanphu@gmail.com', NULL);
INSERT INTO `account` VALUES ('827d23fb-2647-493a-9f32-8c188f246cc2', '014785236963', '$2a$10$swslsh1I/GriXsqvicm98eGvwmftLdQ2h0TSzcJMbHRB5tGx7Z3J2', 'admin', 0, '2024-06-26 17:34:25', '2024-06-30 09:08:03', 'R1', 'S2', 'admin123@gmail.com', NULL);
INSERT INTO `account` VALUES ('8612d2c6-692a-4526-8236-f646619943a2', '0901234567', '$2a$10$7yPS0Sfy04RU.i/SeS5qgebxE6Um96DwH7ds.PXJGL9TdEuAwDTTK', 'Lê Văn Cường', 0, '2024-06-28 20:57:33', '2024-06-29 00:21:40', 'R2', 'S1', 'levancuong@gmail.com', NULL);
INSERT INTO `account` VALUES ('8a141468-ed57-4411-9023-944063c48a8b', '0912345678', '$2a$10$9./CNjJxWypbitmiLGH9Z.4Qvz43Lp2mK4hKsA.ihFpNhK5ws52mW', 'Phạm Thị Diệp', 0, '2024-06-28 21:01:27', '2024-06-29 00:21:43', 'R2', 'S1', 'phamthidiep@gmail.com', NULL);
INSERT INTO `account` VALUES ('8d8bca8d-5812-4ebc-8901-22b6e604626d', '0935678901', '$2a$10$CKLDhaKLRrgyEzJEAvCup.Eqxd1ZEJ16Ayr9hQWFbR5u2wpyvuaaa', 'Vũ Thị Hoa', 0, '2024-06-28 21:07:32', '2024-06-29 00:21:50', 'R2', 'S1', 'vuthihoa@gmail.com', NULL);
INSERT INTO `account` VALUES ('8fa4b5e3-50c0-428b-bc51-c8d93722859e', '0934567890', '$2a$10$ZmeAqVmjOmFOVF.ydOkt0OYycMgEWDoznRU4kz9hZ0HSccaug/gZC', 'Nguyễn Minh Anh', 0, '2024-06-28 20:52:02', '2024-06-29 00:21:51', 'R2', 'S1', 'nguyenminhanh@gmail.com', NULL);
INSERT INTO `account` VALUES ('a29db3f7-8d45-427e-8a6f-77e57bb574c4', '0946789012', '$2a$10$r1bz9hB/QUkygJPS0dJHwuBgunNf.g.vjD8xrLmSE2tnZXXDvyuRy', 'Đinh Văn Hùng', 0, '2024-06-28 21:08:05', '2024-06-29 00:21:52', 'R2', 'S1', 'dinhvanhung@gmail.com', NULL);
INSERT INTO `account` VALUES ('a2cb9a1b-2920-4ae6-886d-e0e176f6e9e7', '0968901234', '$2a$10$b1lvH1dBFqTcDzYZXpW.f.oKM98uA8dOnbOsOqp2w/DEAWKhlFeUm', 'Đặng Minh Long', 0, '2024-06-28 21:08:49', '2024-06-29 00:21:54', 'R2', 'S1', 'dangminhlong@gmail.com', NULL);
INSERT INTO `account` VALUES ('ad2c6975-9a10-458c-8de9-e0c5ad796c3f', '0911234567', '$2a$10$K6yzKN3IYkeNFgqDD1LZr.n2.bfknPFhDU8OsxO.STx67TRCZv2EC', 'Trần Thị Ngọc', 0, '2024-06-28 21:09:39', '2024-06-29 00:21:57', 'R2', 'S1', 'tranthingoc@gmail.com', NULL);
INSERT INTO `account` VALUES ('c2737fe9-0181-4e8c-a4fe-5a1ddb751241', '0905479177', '$2a$10$zs.915jAlp.vYylqW7DocuNie7KUEECl0jrM8g2aUh0qtwQ7hKCde', 'Phan Đặng', 0, '2024-06-23 15:55:07', '2024-06-26 17:06:41', 'R2', 'S1', 'phandang@gmail.com', NULL);
INSERT INTO `account` VALUES ('d8411d4e-dd9b-4696-968c-6ea0d5fda40d', '0999012345', '$2a$10$OTIIPyKRrWEg0rLjM9CfduNTAWLeTYtJP7AvX5pEJnEgIjl/1lpdi', 'Bùi Thị Yến', 0, '2024-06-28 21:11:58', '2024-06-29 00:22:01', 'R2', 'S1', 'buithiyen@gmail.com', NULL);
INSERT INTO `account` VALUES ('e4cfe261-d24a-4075-b783-a618d4d9a6c0', '0147852369', '$2a$10$VReajn7QBxnzt71AAnmWeO0WjdPToSCBW/VzTq84iqVtVmDASwwHm', 'nimda', 0, '2024-06-19 22:47:02', '2024-06-28 22:41:30', 'R1', 'S1', 'admin@gmail.com', NULL);
INSERT INTO `account` VALUES ('ed39efac-22b0-40b1-bd6e-f15eb6f2128e', '0987654321', '$2a$10$4z0GyN9Zt9OjxqklEC93I.8L7JQf8kTC1Se5kybyOyceRhaUnqCy.', 'Trần Thị Bình', 0, '2024-06-28 20:54:01', '2024-06-29 00:22:03', 'R2', 'S1', 'tranthibinh@gmail.com', NULL);
INSERT INTO `account` VALUES ('ee225a4f-f573-4da1-b0c9-3b094c2fb7d8', '0969199759', '$2a$10$7cD.hmNtTIUtkB/sn4heU.timKGpwvTdQLkWzjtgKD5FvG0SqFsOq', 'Nguyễn Hằng Thu ', 1, '2024-06-29 22:49:14', '2024-06-29 23:30:07', 'R4', 'S1', '2053104011223@ldxh.edu.vn', NULL);
INSERT INTO `account` VALUES ('f65385fe-e0b9-4d84-acb2-2c91c4dc3c55', '0933456789', '$2a$10$L0q6vJLR8bvzKCqU2BMlI.KWomExFBlBVGqT5HYUXosgfRSRnhmlK', 'Phạm Thị Quỳnh', 0, '2024-06-28 21:10:33', '2024-06-29 00:22:04', 'R2', 'S1', 'phamthiquynh@gmail.com', NULL);

-- ----------------------------
-- Table structure for appointment
-- ----------------------------
DROP TABLE IF EXISTS `appointment`;
CREATE TABLE `appointment`  (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `appointment_fullname` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `appointment_phone` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `appointment_gender` tinyint(1) NULL DEFAULT NULL,
  `appointment_bhyt` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `appointment_symptom` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `create_at` timestamp NULL DEFAULT current_timestamp,
  `update_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `support_status_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `account_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `package_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `calendar_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `support_time_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `account_id`(`account_id` ASC) USING BTREE,
  INDEX `package_id`(`package_id` ASC) USING BTREE,
  INDEX `calendar_id`(`calendar_id` ASC) USING BTREE,
  INDEX `support_status_id`(`support_status_id` ASC) USING BTREE,
  INDEX `support_time_id`(`support_time_id` ASC) USING BTREE,
  CONSTRAINT `appointment_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `appointment_ibfk_2` FOREIGN KEY (`package_id`) REFERENCES `medical_package` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `appointment_ibfk_3` FOREIGN KEY (`calendar_id`) REFERENCES `calendar` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `appointment_ibfk_4` FOREIGN KEY (`support_status_id`) REFERENCES `support` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `appointment_ibfk_5` FOREIGN KEY (`support_time_id`) REFERENCES `support` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of appointment
-- ----------------------------
INSERT INTO `appointment` VALUES (' df3T7eH', 'Lên Thị Sâu', '0589657788', 1, '', 'Chướng hơi', '2024-06-26 12:48:23', '2024-06-30 09:47:56', 'S3', 'e4cfe261-d24a-4075-b783-a618d4d9a6c0', '44c79a43-5739-4cc2-89d9-5e48e145a0a0', '05d2361d-666e-43e8-8eb6-be35295591c0', 'T2');
INSERT INTO `appointment` VALUES ('kFrpW1P3', 'Hường Thu ', '0939129739', 1, '', '', '2024-06-29 23:00:13', '2024-06-30 09:51:16', 'S3', 'ee225a4f-f573-4da1-b0c9-3b094c2fb7d8', '44604acd-1d89-48b5-91b6-1c545039d6f0', 'e1584dc8-b811-4c2a-b829-e9c5e4725dcf', 'T95');
INSERT INTO `appointment` VALUES ('l mddVn5', 'Thu Hà', '0582369785', 1, '', 'Đau Nhiều đầu, ể oải', '2024-06-29 23:01:28', '2024-06-29 23:04:06', 'S4', 'ee225a4f-f573-4da1-b0c9-3b094c2fb7d8', '44c79a43-5739-4cc2-89d9-5e48e145a0a0', '1b801366-20b5-45ec-8966-b9e51ea5623c', 'T1');
INSERT INTO `appointment` VALUES ('oI3 wx5C', 'Nguyễn Đình Nguyên', '0935996512', 0, '', '', '2024-06-29 22:07:45', '2024-06-30 09:35:18', 'S3', 'e4cfe261-d24a-4075-b783-a618d4d9a6c0', '44604acd-1d89-48b5-91b6-1c545039d6f0', '44ef4492-b6fa-4b00-b929-55c2df97d41b', 'T5');
INSERT INTO `appointment` VALUES ('oQRMbLDi', 'Phan Anh Tài', '05895588969', 0, 'BHYT147852124', 'Sốt cao thường xuyên vào ban đêm', '2024-06-26 16:23:35', '2024-06-30 09:45:57', 'S3', '6bd0d4d9-a931-49cf-968c-86e62ca868f2', '44c79a43-5739-4cc2-89d9-5e48e145a0a0', '6367d749-1e9c-43bc-919f-e8b48d628712', 'T3');
INSERT INTO `appointment` VALUES ('plW6npUw', 'Thu hằng', '0969799519', 0, '', 'Đau đầu', '2024-06-26 16:39:07', '2024-06-26 09:42:00', 'S4', '6bd0d4d9-a931-49cf-968c-86e62ca868f2', '44c79a43-5739-4cc2-89d9-5e48e145a0a0', '6367d749-1e9c-43bc-919f-e8b48d628712', 'T2');
INSERT INTO `appointment` VALUES ('sHioIsQw', 'Thu Hằng', '0969199759', 1, '', '', '2024-06-29 22:58:32', '2024-06-30 09:37:36', 'S3', 'ee225a4f-f573-4da1-b0c9-3b094c2fb7d8', '44c79a43-5739-4cc2-89d9-5e48e145a0a0', '44ef4492-b6fa-4b00-b929-55c2df97d41b', 'T9');
INSERT INTO `appointment` VALUES ('VCIEHw5U', 'Nguyễn Đình Nguyên', '0935996512', 0, '', 'Đau gan, thường xuyên thấy nhức vào buổi tối. Chán ăn', '2024-06-26 16:36:13', '2024-06-26 10:08:24', 'S3', '6bd0d4d9-a931-49cf-968c-86e62ca868f2', 'fc649acb-3e3e-48c7-980c-303b30d14171', '12e703ed-54e2-449a-b318-98613409691e', 'T6');
INSERT INTO `appointment` VALUES ('xDWRa7lU', 'Nguyễn Đình Nguyên', '0935996512', 0, 'BHYT147852', 'Thường xuyên đau bụng', '2024-06-26 12:33:09', '2024-06-26 10:08:55', 'S4', 'e4cfe261-d24a-4075-b783-a618d4d9a6c0', '44c79a43-5739-4cc2-89d9-5e48e145a0a0', '05d2361d-666e-43e8-8eb6-be35295591c0', 'T1');

-- ----------------------------
-- Table structure for appointment_result
-- ----------------------------
DROP TABLE IF EXISTS `appointment_result`;
CREATE TABLE `appointment_result`  (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `result_symptom` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `result_diagnostic` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `result_note` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `create_at` timestamp NULL DEFAULT current_timestamp,
  `update_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `appointment_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `appointment_id`(`appointment_id` ASC) USING BTREE,
  CONSTRAINT `appointment_result_ibfk_1` FOREIGN KEY (`appointment_id`) REFERENCES `appointment` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of appointment_result
-- ----------------------------
INSERT INTO `appointment_result` VALUES ('3acf628a-b057-4312-a1c8-1083e86fccdd', 'Loét, nhiễm trùng bàn chân Đầy bụng, chậm tiêu, nuốt khó', 'Tiểu đường type 2 (do đường trong nước tiểu cao, gây lợi niệu thẩm thấu)', 'Ăn nhiều rau xanh hơn để giảm nguy cơ mắc bệnh tiểu đường và ngủ đủ giấc, thường xuyên vận động và tập thể dục hằng ngày', '2024-06-30 09:37:36', NULL, 'sHioIsQw');
INSERT INTO `appointment_result` VALUES ('84ec101a-a4dc-45a5-b2fe-7887f84717a3', 'Đau họng, lở loét vùng họng', 'Viêm họng hạt', 'Không nên uống đá, 10 ngày sau khi hết thuốc, hãy đến tái khám lần nữa để theo dõi biến chứng', '2024-06-30 09:35:18', NULL, 'oI3 wx5C');
INSERT INTO `appointment_result` VALUES ('8d1f207a-311d-4741-b4df-feadbaa65761', 'Thường xuyên ho, và có đờm', 'Viêm amidam', 'Không nên uống đá, 10 ngày sau khi hết thuốc, hãy đến tái khám lần nữa để theo dõi biến chứng', '2024-06-30 09:51:16', NULL, 'kFrpW1P3');
INSERT INTO `appointment_result` VALUES ('c4c8ba08-ac19-4a31-bbed-9c1d9c5e83a6', 'Sốt cao', 'Sốt rét', 'Thường xuyên chườm khăn, theo dõi nhiệt độ cơ thể', '2024-06-30 09:45:57', NULL, 'oQRMbLDi');
INSERT INTO `appointment_result` VALUES ('d28643e9-cf01-4c57-9b4b-f3425d6384a3', 'Chướng hơi', 'Đau dạ dày mức độ 1', 'Ăn đúng bữa, tránh ăn quá no, hoặc quá đói', '2024-06-30 09:47:56', NULL, ' df3T7eH');
INSERT INTO `appointment_result` VALUES ('f8f2d4dd-1322-48af-965b-c9f42ea420bb', 'Thường xuyên đau gan', 'Viêm gan giai đoạn 2', 'Nên kiêng cữ các đồ ăn dầu mỡ, ...', '2024-06-26 17:08:25', NULL, 'VCIEHw5U');

-- ----------------------------
-- Table structure for bill
-- ----------------------------
DROP TABLE IF EXISTS `bill`;
CREATE TABLE `bill`  (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `package_price` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `bill_sum` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `bill_ispay` tinyint(1) NOT NULL,
  `create_at` timestamp NULL DEFAULT current_timestamp,
  `update_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `appointment_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `payment_id` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `appointment_id`(`appointment_id` ASC) USING BTREE,
  CONSTRAINT `bill_ibfk_1` FOREIGN KEY (`appointment_id`) REFERENCES `appointment` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of bill
-- ----------------------------
INSERT INTO `bill` VALUES ('07ff82af-c9a0-48ec-b8d9-bcf90860727c', '500000', '500000', 1, '2024-06-29 22:07:45', '2024-06-30 09:34:11', 'oI3 wx5C', NULL);
INSERT INTO `bill` VALUES ('100534c2-0664-4d7f-9228-b7c8dab1719b', '500000', '500000', 1, '2024-06-29 23:00:13', '2024-06-29 23:03:00', 'kFrpW1P3', '1LT221634L737680C');
INSERT INTO `bill` VALUES ('74e8a3ee-1acf-4c34-907a-fa1f193cacce', '50000', '50000', 1, '2024-06-26 12:48:25', '2024-06-26 11:04:51', ' df3T7eH', NULL);
INSERT INTO `bill` VALUES ('8bb4a685-11b9-4fb5-80f0-01c2b0d1745c', '50000', '50000', 0, '2024-06-29 22:58:32', NULL, 'sHioIsQw', NULL);
INSERT INTO `bill` VALUES ('96784169-fcdc-48ee-ac75-27861f299747', '50000', '50000', 0, '2024-06-26 12:33:10', NULL, 'xDWRa7lU', NULL);
INSERT INTO `bill` VALUES ('9e0dbc35-77fd-4d3f-9ef5-bec9fbcf5ef7', '50000', '50000', 0, '2024-06-29 23:01:28', NULL, 'l mddVn5', NULL);
INSERT INTO `bill` VALUES ('d6edfad4-1382-479c-8361-3891fe68ef3f', '50000', '50000', 0, '2024-06-26 16:39:08', NULL, 'plW6npUw', NULL);
INSERT INTO `bill` VALUES ('d82a3904-7cb1-4ee7-9f85-600194f8ba4e', '779000', '779000', 1, '2024-06-26 16:36:14', '2024-06-26 16:41:06', 'VCIEHw5U', '2VM320571N140845L');
INSERT INTO `bill` VALUES ('d8f014da-5fbf-4a44-989b-706504e602da', '50000', '50000', 0, '2024-06-26 16:23:37', NULL, 'oQRMbLDi', NULL);

-- ----------------------------
-- Table structure for calendar
-- ----------------------------
DROP TABLE IF EXISTS `calendar`;
CREATE TABLE `calendar`  (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `calendar_date` date NULL DEFAULT NULL,
  `create_at` timestamp NULL DEFAULT current_timestamp,
  `update_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `clinic_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `account_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `id_group_time` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `account_id`(`account_id` ASC) USING BTREE,
  INDEX `clinic_id`(`clinic_id` ASC) USING BTREE,
  INDEX `id_group_time`(`id_group_time` ASC) USING BTREE,
  CONSTRAINT `calendar_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `calendar_ibfk_2` FOREIGN KEY (`clinic_id`) REFERENCES `clinic` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `calendar_ibfk_3` FOREIGN KEY (`id_group_time`) REFERENCES `group_time` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of calendar
-- ----------------------------
INSERT INTO `calendar` VALUES ('05d2361d-666e-43e8-8eb6-be35295591c0', '2024-06-27', '2024-06-26 12:32:09', NULL, '141777d8-5459-4994-97fc-56f5079f55a9', 'c2737fe9-0181-4e8c-a4fe-5a1ddb751241', '1');
INSERT INTO `calendar` VALUES ('12e703ed-54e2-449a-b318-98613409691e', '2024-06-27', '2024-06-26 15:37:16', NULL, 'ca40ddff-1a00-4579-9fda-935545a73068', 'c2737fe9-0181-4e8c-a4fe-5a1ddb751241', '1');
INSERT INTO `calendar` VALUES ('1b801366-20b5-45ec-8966-b9e51ea5623c', '2024-06-30', '2024-06-29 02:09:57', NULL, '141777d8-5459-4994-97fc-56f5079f55a9', '3801eb3d-f892-453e-ab38-621f3345bae4', '1');
INSERT INTO `calendar` VALUES ('3d22b6fb-ed6a-416c-916c-877f6bbeaf5c', '2024-06-26', '2024-06-26 15:36:47', NULL, '49451b16-f826-11ee-87e1-847beb19aaf6', 'c2737fe9-0181-4e8c-a4fe-5a1ddb751241', '1');
INSERT INTO `calendar` VALUES ('44ef4492-b6fa-4b00-b929-55c2df97d41b', '2024-06-30', '2024-06-29 02:06:19', NULL, '49451b16-f826-11ee-87e1-847beb19aaf6', '44db40f6-004e-41a5-a208-6218198cf357', '1');
INSERT INTO `calendar` VALUES ('615d4db0-4657-4c90-9d04-c49f44a284f2', '2024-06-28', '2024-06-28 22:55:30', NULL, '49451b16-f826-11ee-87e1-847beb19aaf6', '155286fa-bad3-4489-992c-83dba757e9d4', '1');
INSERT INTO `calendar` VALUES ('6367d749-1e9c-43bc-919f-e8b48d628712', '2024-06-28', '2024-06-26 15:36:58', NULL, '49451b16-f826-11ee-87e1-847beb19aaf6', 'c2737fe9-0181-4e8c-a4fe-5a1ddb751241', '1');
INSERT INTO `calendar` VALUES ('b5ee75be-5248-422b-94b3-b9b618019142', '2024-06-29', '2024-06-28 23:08:21', NULL, 'ca40ddff-1a00-4579-9fda-935545a73068', 'c2737fe9-0181-4e8c-a4fe-5a1ddb751241', '1');
INSERT INTO `calendar` VALUES ('be1d43d2-c072-4800-b77b-2dbe9815f5ab', '2024-06-27', '2024-06-26 17:46:05', NULL, 'b88b2be0-9d32-4ad8-a68d-73e258e34108', 'c2737fe9-0181-4e8c-a4fe-5a1ddb751241', '1');
INSERT INTO `calendar` VALUES ('dbbf30a0-06da-4225-9f1b-9b3c794085ea', '2024-06-30', '2024-06-29 02:06:56', NULL, 'a012dd24-3bb0-497f-921f-71c9e5620a8b', '6df6f8d3-3914-4388-bfc1-be359b33a175', '2');
INSERT INTO `calendar` VALUES ('e1584dc8-b811-4c2a-b829-e9c5e4725dcf', '2024-06-30', '2024-06-29 02:16:08', NULL, '49451b16-f826-11ee-87e1-847beb19aaf6', 'c2737fe9-0181-4e8c-a4fe-5a1ddb751241', '2');
INSERT INTO `calendar` VALUES ('fc173bbb-0224-4da8-8530-10c8aca09a94', '2024-06-28', '2024-06-28 22:43:43', NULL, '49451b16-f826-11ee-87e1-847beb19aaf6', '155286fa-bad3-4489-992c-83dba757e9d4', '2');

-- ----------------------------
-- Table structure for clinic
-- ----------------------------
DROP TABLE IF EXISTS `clinic`;
CREATE TABLE `clinic`  (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `clinic_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `create_at` timestamp NULL DEFAULT current_timestamp,
  `update_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `medical_area_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `support_status_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `medical_area_id`(`medical_area_id` ASC) USING BTREE,
  INDEX `support_status_id`(`support_status_id` ASC) USING BTREE,
  CONSTRAINT `clinic_ibfk_1` FOREIGN KEY (`medical_area_id`) REFERENCES `medical_area` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `clinic_ibfk_2` FOREIGN KEY (`support_status_id`) REFERENCES `support` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of clinic
-- ----------------------------
INSERT INTO `clinic` VALUES ('141777d8-5459-4994-97fc-56f5079f55a9', 'Phòng Xét Nghiệm Máu', '2024-06-26 11:51:59', '2024-06-26 11:51:59', '156f8735-f826-11ee-87e1-847beb19aaf6', 'S1');
INSERT INTO `clinic` VALUES ('24f6098b-2274-4c73-8b05-23fb4ecb1ede', 'Phòng Nội Soi', '2024-06-26 11:50:26', '2024-06-26 11:50:27', '156f8735-f826-11ee-87e1-847beb19aaf6', 'S1');
INSERT INTO `clinic` VALUES ('2cfafd16-667a-4d0d-88c6-e222ee7a4695', 'Phòng Chụp X-Quang', '2024-06-26 17:47:48', NULL, '156f8735-f826-11ee-87e1-847beb19aaf6', 'S1');
INSERT INTO `clinic` VALUES ('49451b16-f826-11ee-87e1-847beb19aaf6', 'Phòng Tiếp Nhận Gói Khám Bệnh', '2024-06-26 11:51:36', '2024-06-26 11:51:37', '156f8735-f826-11ee-87e1-847beb19aaf6', 'S1');
INSERT INTO `clinic` VALUES ('53b0c715-13e5-4c99-9837-7da5359ebbee', 'Phòng Xét Nghiệm Huyết Thanh Học ', '2024-06-19 23:12:54', '2024-06-19 23:12:55', '156f8735-f826-11ee-87e1-847beb19aaf6', 'S1');
INSERT INTO `clinic` VALUES ('a012dd24-3bb0-497f-921f-71c9e5620a8b', 'Phòng Siêu Âm', '2024-06-19 22:58:54', NULL, '156f8735-f826-11ee-87e1-847beb19aaf6', 'S1');
INSERT INTO `clinic` VALUES ('b88b2be0-9d32-4ad8-a68d-73e258e34108', 'Khoa Nhi', '2024-06-19 22:48:34', NULL, '156f8735-f826-11ee-87e1-847beb19aaf6', 'S1');
INSERT INTO `clinic` VALUES ('ca40ddff-1a00-4579-9fda-935545a73068', 'Khoa Nội', '2024-06-19 22:49:19', '2024-06-19 22:49:19', '156f8735-f826-11ee-87e1-847beb19aaf6', 'S1');

-- ----------------------------
-- Table structure for doctor
-- ----------------------------
DROP TABLE IF EXISTS `doctor`;
CREATE TABLE `doctor`  (
  `doctor_degree` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `doctor_rank` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `doctor_specialty` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `doctor_introduce` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `doctor_exp` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `doctor_image` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  INDEX `account_id`(`id` ASC) USING BTREE,
  CONSTRAINT `doctor_ibfk_1` FOREIGN KEY (`id`) REFERENCES `account` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of doctor
-- ----------------------------
INSERT INTO `doctor` VALUES ('', 'ThS', 'Khoa Nội', 'Là 1 bác sĩ tận tâm chăm sóc bệnh nhân', '4 năm', 'https://drive.google.com/thumbnail?id=1IYYTIlpbsMtsYZDaiRM1VqK0usbwaZN9', 'c2737fe9-0181-4e8c-a4fe-5a1ddb751241');
INSERT INTO `doctor` VALUES (NULL, NULL, NULL, NULL, NULL, NULL, '08f030d7-4688-4c3b-ac30-0f2c4bda5a27');
INSERT INTO `doctor` VALUES (NULL, NULL, NULL, NULL, NULL, NULL, '827d23fb-2647-493a-9f32-8c188f246cc2');
INSERT INTO `doctor` VALUES ('GS.', 'BSCK I', 'Khoa Nhi', 'Bác sĩ Vũ Thu Phương\nChuyên khoa: Nhi khoa\n\nHọc vấn:\nTốt nghiệp trường Đại học Y Hà Nội, chuyên ngành Bác sĩ Đa khoa.\nHoàn thành chương trình Thạc sĩ Nhi khoa tại Đại học Y Dược TP.HCM.\nKinh nghiệm:\n\nTrên 10 năm kinh nghiệm trong lĩnh vực nhi khoa tại các bệnh viện lớn như Bệnh viện Nhi Trung ương và Bệnh viện Nhi Đồng 1.\nChuyên điều trị các bệnh lý hô hấp, tiêu hóa, truyền nhiễm và các vấn đề dinh dưỡng cho trẻ em.\nThành tựu:\n\nTham gia nhiều khóa đào tạo và hội thảo quốc tế về nhi khoa.\nĐã có nhiều công trình nghiên cứu được đăng trên các tạp chí y khoa uy tín.\nDịch vụ:\n\nKhám và tư vấn sức khỏe cho trẻ sơ sinh và trẻ nhỏ.\nTiêm chủng và phòng ngừa bệnh tật.\nTư vấn dinh dưỡng và chăm sóc trẻ em.\nLiên hệ:\n\nĐiện thoại: 0123 456 789\nEmail: vuthuphuong@gmail.com', '4 năm', 'https://drive.google.com/thumbnail?id=10attai2KZYTzNylF92i1TXiP8K6iYuTy', '155286fa-bad3-4489-992c-83dba757e9d4');
INSERT INTO `doctor` VALUES (NULL, NULL, NULL, NULL, NULL, NULL, '23d47246-0c11-4307-be65-6f15feb4175c');
INSERT INTO `doctor` VALUES (NULL, NULL, NULL, NULL, NULL, NULL, '27a4f109-a5d6-49fc-8bf3-86398462c14a');
INSERT INTO `doctor` VALUES (NULL, NULL, NULL, NULL, NULL, NULL, '44db40f6-004e-41a5-a208-6218198cf357');
INSERT INTO `doctor` VALUES (NULL, NULL, NULL, NULL, NULL, NULL, '30b8d9b2-f0f7-4800-bcd6-98ec8a4ae2cd');
INSERT INTO `doctor` VALUES (NULL, NULL, NULL, NULL, NULL, NULL, '3801eb3d-f892-453e-ab38-621f3345bae4');
INSERT INTO `doctor` VALUES (NULL, NULL, NULL, NULL, NULL, NULL, '4917099e-23c7-42d4-8ef9-765a3421f269');
INSERT INTO `doctor` VALUES (NULL, NULL, NULL, NULL, NULL, NULL, '6df6f8d3-3914-4388-bfc1-be359b33a175');
INSERT INTO `doctor` VALUES (NULL, NULL, NULL, NULL, NULL, NULL, '74499e95-5154-444a-a792-7bdeca32ce01');
INSERT INTO `doctor` VALUES (NULL, NULL, NULL, NULL, NULL, NULL, '7ae5f9cb-0cfa-4570-ae87-5fbb292da8cc');
INSERT INTO `doctor` VALUES (NULL, NULL, NULL, NULL, NULL, NULL, '80a9362b-6b71-4ea9-bb46-34196b4a9790');
INSERT INTO `doctor` VALUES (NULL, NULL, NULL, NULL, NULL, NULL, '8612d2c6-692a-4526-8236-f646619943a2');
INSERT INTO `doctor` VALUES (NULL, NULL, NULL, NULL, NULL, NULL, '8a141468-ed57-4411-9023-944063c48a8b');
INSERT INTO `doctor` VALUES (NULL, NULL, NULL, NULL, NULL, NULL, '8d8bca8d-5812-4ebc-8901-22b6e604626d');
INSERT INTO `doctor` VALUES (NULL, NULL, NULL, NULL, NULL, NULL, '8fa4b5e3-50c0-428b-bc51-c8d93722859e');
INSERT INTO `doctor` VALUES (NULL, NULL, NULL, NULL, NULL, NULL, 'a29db3f7-8d45-427e-8a6f-77e57bb574c4');
INSERT INTO `doctor` VALUES (NULL, NULL, NULL, NULL, NULL, NULL, 'a2cb9a1b-2920-4ae6-886d-e0e176f6e9e7');
INSERT INTO `doctor` VALUES (NULL, NULL, NULL, NULL, NULL, NULL, 'ad2c6975-9a10-458c-8de9-e0c5ad796c3f');
INSERT INTO `doctor` VALUES (NULL, NULL, NULL, NULL, NULL, NULL, 'd8411d4e-dd9b-4696-968c-6ea0d5fda40d');
INSERT INTO `doctor` VALUES (NULL, NULL, NULL, NULL, NULL, NULL, 'ed39efac-22b0-40b1-bd6e-f15eb6f2128e');
INSERT INTO `doctor` VALUES (NULL, NULL, NULL, NULL, NULL, NULL, 'f65385fe-e0b9-4d84-acb2-2c91c4dc3c55');

-- ----------------------------
-- Table structure for evaluate
-- ----------------------------
DROP TABLE IF EXISTS `evaluate`;
CREATE TABLE `evaluate`  (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `evaluate_content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `create_at` timestamp NULL DEFAULT current_timestamp,
  `update_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `doctor_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `appointment_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `doctor_id`(`doctor_id` ASC) USING BTREE,
  INDEX `appointment_id`(`appointment_id` ASC) USING BTREE,
  CONSTRAINT `evaluate_ibfk_1` FOREIGN KEY (`doctor_id`) REFERENCES `account` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `evaluate_ibfk_2` FOREIGN KEY (`appointment_id`) REFERENCES `appointment` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of evaluate
-- ----------------------------

-- ----------------------------
-- Table structure for group_time
-- ----------------------------
DROP TABLE IF EXISTS `group_time`;
CREATE TABLE `group_time`  (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `group_time_description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of group_time
-- ----------------------------
INSERT INTO `group_time` VALUES ('1', 'Ca sáng');
INSERT INTO `group_time` VALUES ('2', 'Ca chiều');

-- ----------------------------
-- Table structure for log
-- ----------------------------
DROP TABLE IF EXISTS `log`;
CREATE TABLE `log`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `log_content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `create_at` timestamp NULL DEFAULT current_timestamp,
  `update_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `account_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `support_level_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `account_id`(`account_id` ASC) USING BTREE,
  INDEX `support_level_id`(`support_level_id` ASC) USING BTREE,
  CONSTRAINT `log_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `log_ibfk_2` FOREIGN KEY (`support_level_id`) REFERENCES `support` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 64 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of log
-- ----------------------------
INSERT INTO `log` VALUES (1, 'Thanh toán - Lịch hẹn có mã:  df3T7eH đã được thanh toán', '2024-06-26 12:50:29', NULL, 'e4cfe261-d24a-4075-b783-a618d4d9a6c0', 'L1');
INSERT INTO `log` VALUES (2, 'Lịch hẹn - Lịch hẹn có mã: plW6npUw đã bị hủy', '2024-06-26 16:42:03', NULL, '6bd0d4d9-a931-49cf-968c-86e62ca868f2', 'L1');
INSERT INTO `log` VALUES (3, 'Lịch hẹn - Lịch hẹn có mã: VCIEHw5U đã bị hủy', '2024-06-26 17:08:27', NULL, 'c2737fe9-0181-4e8c-a4fe-5a1ddb751241', 'L1');
INSERT INTO `log` VALUES (4, 'Lịch hẹn - Lịch hẹn có mã: xDWRa7lU đã bị hủy', '2024-06-26 17:08:58', NULL, 'c2737fe9-0181-4e8c-a4fe-5a1ddb751241', 'L1');
INSERT INTO `log` VALUES (5, 'Tài khoản - Tài khoản có ID: 08f030d7-4688-4c3b-ac30-0f2c4bda5a27 đã được thay đổi quyền hạn là: PATIENT', '2024-06-26 17:31:53', NULL, 'e4cfe261-d24a-4075-b783-a618d4d9a6c0', 'L2');
INSERT INTO `log` VALUES (6, 'Tài khoản - Tài khoản có ID: 08f030d7-4688-4c3b-ac30-0f2c4bda5a27 đã được thay đổi quyền hạn là: DOCTOR', '2024-06-26 17:32:10', NULL, 'e4cfe261-d24a-4075-b783-a618d4d9a6c0', 'L1');
INSERT INTO `log` VALUES (9, 'Tài khoản - Tài khoản có ID: 08f030d7-4688-4c3b-ac30-0f2c4bda5a27 đã được thay đổi trạng thái là: Khóa', '2024-06-26 17:33:42', NULL, 'e4cfe261-d24a-4075-b783-a618d4d9a6c0', 'L2');
INSERT INTO `log` VALUES (10, 'Tài khoản - Tài khoản có ID: 08f030d7-4688-4c3b-ac30-0f2c4bda5a27 đã được thay đổi trạng thái là: Mở', '2024-06-26 17:33:55', NULL, 'e4cfe261-d24a-4075-b783-a618d4d9a6c0', 'L2');
INSERT INTO `log` VALUES (16, 'Tài khoản - Tài khoản có ID: 08f030d7-4688-4c3b-ac30-0f2c4bda5a27 đã được thay đổi quyền hạn là: PATIENT', '2024-06-26 17:43:44', NULL, 'e4cfe261-d24a-4075-b783-a618d4d9a6c0', 'L2');
INSERT INTO `log` VALUES (17, 'Tài khoản - Tài khoản có ID: 155286fa-bad3-4489-992c-83dba757e9d4 đã được thay đổi quyền hạn là: DOCTOR', '2024-06-26 17:44:10', NULL, 'e4cfe261-d24a-4075-b783-a618d4d9a6c0', 'L1');
INSERT INTO `log` VALUES (18, 'Tài khoản - Tài khoản có ID: 23d47246-0c11-4307-be65-6f15feb4175c đã được thay đổi quyền hạn là: DOCTOR', '2024-06-29 00:21:09', NULL, 'e4cfe261-d24a-4075-b783-a618d4d9a6c0', 'L1');
INSERT INTO `log` VALUES (19, 'Tài khoản - Tài khoản có ID: 27a4f109-a5d6-49fc-8bf3-86398462c14a đã được thay đổi quyền hạn là: DOCTOR', '2024-06-29 00:21:11', NULL, 'e4cfe261-d24a-4075-b783-a618d4d9a6c0', 'L1');
INSERT INTO `log` VALUES (20, 'Tài khoản - Tài khoản có ID: 44db40f6-004e-41a5-a208-6218198cf357 đã được thay đổi quyền hạn là: DOCTOR', '2024-06-29 00:21:13', NULL, 'e4cfe261-d24a-4075-b783-a618d4d9a6c0', 'L1');
INSERT INTO `log` VALUES (21, 'Tài khoản - Tài khoản có ID: 30b8d9b2-f0f7-4800-bcd6-98ec8a4ae2cd đã được thay đổi quyền hạn là: DOCTOR', '2024-06-29 00:21:20', NULL, 'e4cfe261-d24a-4075-b783-a618d4d9a6c0', 'L1');
INSERT INTO `log` VALUES (22, 'Tài khoản - Tài khoản có ID: 3801eb3d-f892-453e-ab38-621f3345bae4 đã được thay đổi quyền hạn là: DOCTOR', '2024-06-29 00:21:23', NULL, 'e4cfe261-d24a-4075-b783-a618d4d9a6c0', 'L1');
INSERT INTO `log` VALUES (23, 'Tài khoản - Tài khoản có ID: 4917099e-23c7-42d4-8ef9-765a3421f269 đã được thay đổi quyền hạn là: DOCTOR', '2024-06-29 00:21:27', NULL, 'e4cfe261-d24a-4075-b783-a618d4d9a6c0', 'L1');
INSERT INTO `log` VALUES (24, 'Tài khoản - Tài khoản có ID: 6df6f8d3-3914-4388-bfc1-be359b33a175 đã được thay đổi quyền hạn là: DOCTOR', '2024-06-29 00:21:33', NULL, 'e4cfe261-d24a-4075-b783-a618d4d9a6c0', 'L1');
INSERT INTO `log` VALUES (25, 'Tài khoản - Tài khoản có ID: 74499e95-5154-444a-a792-7bdeca32ce01 đã được thay đổi quyền hạn là: DOCTOR', '2024-06-29 00:21:36', NULL, 'e4cfe261-d24a-4075-b783-a618d4d9a6c0', 'L1');
INSERT INTO `log` VALUES (26, 'Tài khoản - Tài khoản có ID: 7ae5f9cb-0cfa-4570-ae87-5fbb292da8cc đã được thay đổi quyền hạn là: DOCTOR', '2024-06-29 00:21:38', NULL, 'e4cfe261-d24a-4075-b783-a618d4d9a6c0', 'L1');
INSERT INTO `log` VALUES (27, 'Tài khoản - Tài khoản có ID: 80a9362b-6b71-4ea9-bb46-34196b4a9790 đã được thay đổi quyền hạn là: DOCTOR', '2024-06-29 00:21:38', NULL, 'e4cfe261-d24a-4075-b783-a618d4d9a6c0', 'L1');
INSERT INTO `log` VALUES (28, 'Tài khoản - Tài khoản có ID: 8612d2c6-692a-4526-8236-f646619943a2 đã được thay đổi quyền hạn là: DOCTOR', '2024-06-29 00:21:40', NULL, 'e4cfe261-d24a-4075-b783-a618d4d9a6c0', 'L1');
INSERT INTO `log` VALUES (29, 'Tài khoản - Tài khoản có ID: 8a141468-ed57-4411-9023-944063c48a8b đã được thay đổi quyền hạn là: DOCTOR', '2024-06-29 00:21:43', NULL, 'e4cfe261-d24a-4075-b783-a618d4d9a6c0', 'L1');
INSERT INTO `log` VALUES (30, 'Tài khoản - Tài khoản có ID: 8d8bca8d-5812-4ebc-8901-22b6e604626d đã được thay đổi quyền hạn là: DOCTOR', '2024-06-29 00:21:50', NULL, 'e4cfe261-d24a-4075-b783-a618d4d9a6c0', 'L1');
INSERT INTO `log` VALUES (31, 'Tài khoản - Tài khoản có ID: 8fa4b5e3-50c0-428b-bc51-c8d93722859e đã được thay đổi quyền hạn là: DOCTOR', '2024-06-29 00:21:51', NULL, 'e4cfe261-d24a-4075-b783-a618d4d9a6c0', 'L1');
INSERT INTO `log` VALUES (32, 'Tài khoản - Tài khoản có ID: a29db3f7-8d45-427e-8a6f-77e57bb574c4 đã được thay đổi quyền hạn là: DOCTOR', '2024-06-29 00:21:52', NULL, 'e4cfe261-d24a-4075-b783-a618d4d9a6c0', 'L1');
INSERT INTO `log` VALUES (33, 'Tài khoản - Tài khoản có ID: a2cb9a1b-2920-4ae6-886d-e0e176f6e9e7 đã được thay đổi quyền hạn là: DOCTOR', '2024-06-29 00:21:54', NULL, 'e4cfe261-d24a-4075-b783-a618d4d9a6c0', 'L1');
INSERT INTO `log` VALUES (34, 'Tài khoản - Tài khoản có ID: ad2c6975-9a10-458c-8de9-e0c5ad796c3f đã được thay đổi quyền hạn là: DOCTOR', '2024-06-29 00:21:57', NULL, 'e4cfe261-d24a-4075-b783-a618d4d9a6c0', 'L1');
INSERT INTO `log` VALUES (35, 'Tài khoản - Tài khoản có ID: d8411d4e-dd9b-4696-968c-6ea0d5fda40d đã được thay đổi quyền hạn là: DOCTOR', '2024-06-29 00:22:01', NULL, 'e4cfe261-d24a-4075-b783-a618d4d9a6c0', 'L1');
INSERT INTO `log` VALUES (36, 'Tài khoản - Tài khoản có ID: ed39efac-22b0-40b1-bd6e-f15eb6f2128e đã được thay đổi quyền hạn là: DOCTOR', '2024-06-29 00:22:03', NULL, 'e4cfe261-d24a-4075-b783-a618d4d9a6c0', 'L1');
INSERT INTO `log` VALUES (37, 'Tài khoản - Tài khoản có ID: f65385fe-e0b9-4d84-acb2-2c91c4dc3c55 đã được thay đổi quyền hạn là: DOCTOR', '2024-06-29 00:22:04', NULL, 'e4cfe261-d24a-4075-b783-a618d4d9a6c0', 'L1');
INSERT INTO `log` VALUES (38, 'Lịch hẹn - Lịch hẹn có mã: l mddVn5 đã bị hủy', '2024-06-29 23:04:06', NULL, 'ee225a4f-f573-4da1-b0c9-3b094c2fb7d8', 'L1');
INSERT INTO `log` VALUES (39, 'Tài khoản - Tài khoản có ID: 6df6f8d3-3914-4388-bfc1-be359b33a175 đã được thay đổi quyền hạn là: PATIENT', '2024-06-29 23:36:37', NULL, 'e4cfe261-d24a-4075-b783-a618d4d9a6c0', 'L2');
INSERT INTO `log` VALUES (40, 'Tài khoản - Tài khoản có ID: 6df6f8d3-3914-4388-bfc1-be359b33a175 đã được thay đổi quyền hạn là: DOCTOR', '2024-06-29 23:36:41', NULL, 'e4cfe261-d24a-4075-b783-a618d4d9a6c0', 'L1');
INSERT INTO `log` VALUES (41, 'Tài khoản - Tài khoản có ID: 155286fa-bad3-4489-992c-83dba757e9d4 đã được thay đổi quyền hạn là: PATIENT', '2024-06-29 23:37:23', NULL, 'e4cfe261-d24a-4075-b783-a618d4d9a6c0', 'L2');
INSERT INTO `log` VALUES (42, 'Tài khoản - Tài khoản có ID: 155286fa-bad3-4489-992c-83dba757e9d4 đã được thay đổi quyền hạn là: DOCTOR', '2024-06-29 23:40:30', NULL, 'e4cfe261-d24a-4075-b783-a618d4d9a6c0', 'L1');
INSERT INTO `log` VALUES (43, 'Tài khoản - Tài khoản có ID: 155286fa-bad3-4489-992c-83dba757e9d4 đã được thay đổi quyền hạn là: PATIENT', '2024-06-29 23:45:36', NULL, 'e4cfe261-d24a-4075-b783-a618d4d9a6c0', 'L2');
INSERT INTO `log` VALUES (44, 'Tài khoản - Tài khoản có ID: 155286fa-bad3-4489-992c-83dba757e9d4 đã được thay đổi quyền hạn là: DOCTOR', '2024-06-29 23:52:57', NULL, 'e4cfe261-d24a-4075-b783-a618d4d9a6c0', 'L1');
INSERT INTO `log` VALUES (45, 'Tài khoản - Tài khoản có ID: 155286fa-bad3-4489-992c-83dba757e9d4 đã được thay đổi quyền hạn là: PATIENT', '2024-06-29 23:53:49', NULL, 'e4cfe261-d24a-4075-b783-a618d4d9a6c0', 'L2');
INSERT INTO `log` VALUES (46, 'Tài khoản - Tài khoản có ID: 155286fa-bad3-4489-992c-83dba757e9d4 đã được thay đổi quyền hạn là: DOCTOR', '2024-06-29 23:54:04', NULL, 'e4cfe261-d24a-4075-b783-a618d4d9a6c0', 'L1');
INSERT INTO `log` VALUES (47, 'Tài khoản - Tài khoản có ID: 155286fa-bad3-4489-992c-83dba757e9d4 đã được thay đổi quyền hạn là: PATIENT', '2024-06-29 23:54:32', NULL, 'e4cfe261-d24a-4075-b783-a618d4d9a6c0', 'L2');
INSERT INTO `log` VALUES (48, 'Tài khoản - Tài khoản có ID: 155286fa-bad3-4489-992c-83dba757e9d4 đã được thay đổi quyền hạn là: DOCTOR', '2024-06-30 00:07:10', NULL, 'e4cfe261-d24a-4075-b783-a618d4d9a6c0', 'L1');
INSERT INTO `log` VALUES (49, 'Tài khoản - Tài khoản có ID: 155286fa-bad3-4489-992c-83dba757e9d4 đã được thay đổi quyền hạn là: PATIENT', '2024-06-30 00:07:29', NULL, 'e4cfe261-d24a-4075-b783-a618d4d9a6c0', 'L2');
INSERT INTO `log` VALUES (50, 'Tài khoản - Tài khoản có ID: 827d23fb-2647-493a-9f32-8c188f246cc2 đã được thay đổi quyền hạn là: PATIENT', '2024-06-30 00:08:36', NULL, 'e4cfe261-d24a-4075-b783-a618d4d9a6c0', 'L2');
INSERT INTO `log` VALUES (51, 'Tài khoản - Tài khoản có ID: 827d23fb-2647-493a-9f32-8c188f246cc2 đã được thay đổi trạng thái là: Khóa', '2024-06-30 00:16:23', NULL, 'e4cfe261-d24a-4075-b783-a618d4d9a6c0', 'L2');
INSERT INTO `log` VALUES (52, 'Tài khoản - Tài khoản có ID: 155286fa-bad3-4489-992c-83dba757e9d4 đã được thay đổi quyền hạn là: DOCTOR', '2024-06-30 09:01:52', NULL, 'e4cfe261-d24a-4075-b783-a618d4d9a6c0', 'L1');
INSERT INTO `log` VALUES (53, 'Tài khoản - Tài khoản có ID: 155286fa-bad3-4489-992c-83dba757e9d4 đã được thay đổi quyền hạn là: PATIENT', '2024-06-30 09:02:22', NULL, 'e4cfe261-d24a-4075-b783-a618d4d9a6c0', 'L2');
INSERT INTO `log` VALUES (54, 'Tài khoản - Tài khoản có ID: 827d23fb-2647-493a-9f32-8c188f246cc2 đã được thay đổi trạng thái là: Mở', '2024-06-30 09:05:21', NULL, 'e4cfe261-d24a-4075-b783-a618d4d9a6c0', 'L2');
INSERT INTO `log` VALUES (55, 'Tài khoản - Tài khoản có ID: 827d23fb-2647-493a-9f32-8c188f246cc2 đã được thay đổi trạng thái là: Khóa', '2024-06-30 09:05:42', NULL, 'e4cfe261-d24a-4075-b783-a618d4d9a6c0', 'L2');
INSERT INTO `log` VALUES (56, 'Tài khoản - Tài khoản có ID: 827d23fb-2647-493a-9f32-8c188f246cc2 đã được thay đổi trạng thái là: Mở', '2024-06-30 09:07:36', NULL, 'e4cfe261-d24a-4075-b783-a618d4d9a6c0', 'L2');
INSERT INTO `log` VALUES (57, 'Tài khoản - Tài khoản có ID: 827d23fb-2647-493a-9f32-8c188f246cc2 đã được thay đổi trạng thái là: Khóa', '2024-06-30 09:08:03', NULL, 'e4cfe261-d24a-4075-b783-a618d4d9a6c0', 'L2');
INSERT INTO `log` VALUES (58, 'Thanh toán - Lịch hẹn có mã: oI3 wx5C đã được thanh toán', '2024-06-30 09:34:11', NULL, '44db40f6-004e-41a5-a208-6218198cf357', 'L1');
INSERT INTO `log` VALUES (59, 'Lịch hẹn - Lịch hẹn có mã: oI3 wx5C đã bị hủy', '2024-06-30 09:35:18', NULL, '44db40f6-004e-41a5-a208-6218198cf357', 'L1');
INSERT INTO `log` VALUES (60, 'Lịch hẹn - Lịch hẹn có mã: sHioIsQw đã bị hủy', '2024-06-30 09:37:36', NULL, '44db40f6-004e-41a5-a208-6218198cf357', 'L1');
INSERT INTO `log` VALUES (61, 'Lịch hẹn - Lịch hẹn có mã: oQRMbLDi đã bị hủy', '2024-06-30 09:45:57', NULL, 'e4cfe261-d24a-4075-b783-a618d4d9a6c0', 'L1');
INSERT INTO `log` VALUES (62, '', '2024-06-30 09:47:56', NULL, 'e4cfe261-d24a-4075-b783-a618d4d9a6c0', 'L1');
INSERT INTO `log` VALUES (63, 'Lịch hẹn - Lịch hẹn có mã: kFrpW1P3 đã được duyệt', '2024-06-30 09:51:16', NULL, 'e4cfe261-d24a-4075-b783-a618d4d9a6c0', 'L1');

-- ----------------------------
-- Table structure for medical_area
-- ----------------------------
DROP TABLE IF EXISTS `medical_area`;
CREATE TABLE `medical_area`  (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `area_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `create_at` timestamp NULL DEFAULT current_timestamp,
  `update_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `support_status_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `support_status_id`(`support_status_id` ASC) USING BTREE,
  CONSTRAINT `medical_area_ibfk_1` FOREIGN KEY (`support_status_id`) REFERENCES `support` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of medical_area
-- ----------------------------
INSERT INTO `medical_area` VALUES ('156f8735-f826-11ee-87e1-847beb19aaf6', 'Khu khám thường', '2024-04-12 00:08:14', '2024-04-12 00:08:14', 'S1');
INSERT INTO `medical_area` VALUES ('156fa6de-f826-11ee-87e1-847beb19aaf6', 'Khu khám theo yêu cầu', '2024-04-12 00:08:14', '2024-04-12 00:08:14', 'S1');

-- ----------------------------
-- Table structure for medical_package
-- ----------------------------
DROP TABLE IF EXISTS `medical_package`;
CREATE TABLE `medical_package`  (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `package_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `package_price` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `create_at` timestamp NULL DEFAULT current_timestamp,
  `update_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `support_status_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `clinic_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `clinic_id`(`clinic_id` ASC) USING BTREE,
  INDEX `support_status_id`(`support_status_id` ASC) USING BTREE,
  CONSTRAINT `medical_package_ibfk_1` FOREIGN KEY (`clinic_id`) REFERENCES `clinic` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `medical_package_ibfk_2` FOREIGN KEY (`support_status_id`) REFERENCES `support` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of medical_package
-- ----------------------------
INSERT INTO `medical_package` VALUES ('132d1208-d767-4094-85ec-9f303a604184', 'Chụp hình X-Quang', '300000', '2024-06-26 17:50:41', '2024-06-26 17:50:41', 'S1', '2cfafd16-667a-4d0d-88c6-e222ee7a4695');
INSERT INTO `medical_package` VALUES ('44604acd-1d89-48b5-91b6-1c545039d6f0', 'Gói khám tai mũi họng', '400000', NULL, '2024-06-30 09:52:24', 'S1', '49451b16-f826-11ee-87e1-847beb19aaf6');
INSERT INTO `medical_package` VALUES ('44c79a43-5739-4cc2-89d9-5e48e145a0a0', 'Gói khám bệnh thường', '50000', NULL, '2024-06-26 17:51:15', 'S1', '49451b16-f826-11ee-87e1-847beb19aaf6');
INSERT INTO `medical_package` VALUES ('fc649acb-3e3e-48c7-980c-303b30d14171', 'Gói Xét Nghiệm Tầm Soát Viêm Gan', '779000', NULL, '2024-06-26 10:39:39', 'S1', 'ca40ddff-1a00-4579-9fda-935545a73068');

-- ----------------------------
-- Table structure for medical_package_service
-- ----------------------------
DROP TABLE IF EXISTS `medical_package_service`;
CREATE TABLE `medical_package_service`  (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `service_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `package_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `support_status_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `service_id`(`service_id` ASC) USING BTREE,
  INDEX `package_id`(`package_id` ASC) USING BTREE,
  INDEX `support_status_id`(`support_status_id` ASC) USING BTREE,
  CONSTRAINT `medical_package_service_ibfk_1` FOREIGN KEY (`service_id`) REFERENCES `medical_service` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `medical_package_service_ibfk_2` FOREIGN KEY (`package_id`) REFERENCES `medical_package` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `medical_package_service_ibfk_3` FOREIGN KEY (`support_status_id`) REFERENCES `support` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of medical_package_service
-- ----------------------------
INSERT INTO `medical_package_service` VALUES ('0016d51d-7f36-4b52-8b38-c474b6723969', 'b8773ac3-6495-4b70-bd1c-e9698b1b8c55', '44604acd-1d89-48b5-91b6-1c545039d6f0', NULL);
INSERT INTO `medical_package_service` VALUES ('33db4918-ec4c-402b-b3e1-f80dbda0aa2f', 'bcd50ffc-98ab-4349-bdee-82a4d819332f', 'fc649acb-3e3e-48c7-980c-303b30d14171', NULL);
INSERT INTO `medical_package_service` VALUES ('9b2ee20c-b662-4868-ba9a-5546738f567d', 'bcd50ffc-98ab-4349-bdee-82a4d819332f', '44604acd-1d89-48b5-91b6-1c545039d6f0', NULL);
INSERT INTO `medical_package_service` VALUES ('9da99e6a-f43f-4c56-88c8-74fd2732403b', '3cc63dd5-536a-4e45-96ca-3f1c1986e844', '44604acd-1d89-48b5-91b6-1c545039d6f0', NULL);
INSERT INTO `medical_package_service` VALUES ('dafcdc0f-9381-4529-9c17-3bae97e68e09', 'e27ea486-e88f-4ba9-85ee-ea431040722a', 'fc649acb-3e3e-48c7-980c-303b30d14171', NULL);
INSERT INTO `medical_package_service` VALUES ('ea1d171a-362a-48af-bfb5-48419c3f0fad', '02f7ca12-1023-4ec1-a5f7-65bacc5f7168', '132d1208-d767-4094-85ec-9f303a604184', NULL);

-- ----------------------------
-- Table structure for medical_service
-- ----------------------------
DROP TABLE IF EXISTS `medical_service`;
CREATE TABLE `medical_service`  (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `service_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `service_price` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `create_at` timestamp NULL DEFAULT current_timestamp,
  `update_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `support_status_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `clinic_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `service_description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `clinic_id`(`clinic_id` ASC) USING BTREE,
  INDEX `support_status_id`(`support_status_id` ASC) USING BTREE,
  CONSTRAINT `medical_service_ibfk_1` FOREIGN KEY (`clinic_id`) REFERENCES `clinic` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `medical_service_ibfk_2` FOREIGN KEY (`support_status_id`) REFERENCES `support` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of medical_service
-- ----------------------------
INSERT INTO `medical_service` VALUES ('02f7ca12-1023-4ec1-a5f7-65bacc5f7168', 'Chụp hình X-Quang', '120000', NULL, '2024-06-30 09:51:53', 'S1', '2cfafd16-667a-4d0d-88c6-e222ee7a4695', 'Chụp hình X-Quang');
INSERT INTO `medical_service` VALUES ('3cc63dd5-536a-4e45-96ca-3f1c1986e844', 'Nội Soi Họng', '150000', '2024-06-26 15:39:43', NULL, 'S1', '24f6098b-2274-4c73-8b05-23fb4ecb1ede', 'Nội Soi Họng');
INSERT INTO `medical_service` VALUES ('b8773ac3-6495-4b70-bd1c-e9698b1b8c55', 'Nội Soi Mũi', '150000', '2024-06-26 15:39:11', NULL, 'S1', '24f6098b-2274-4c73-8b05-23fb4ecb1ede', 'Nội Soi Mũi');
INSERT INTO `medical_service` VALUES ('bcd50ffc-98ab-4349-bdee-82a4d819332f', 'Xét nghiệm miễn dịch', '120000', '2024-06-19 23:14:26', NULL, 'S1', '53b0c715-13e5-4c99-9837-7da5359ebbee', 'Phát hiện các bệnh truyền nhiễm, tình trạng miễn dịch và các bệnh tự miễn.');
INSERT INTO `medical_service` VALUES ('e27ea486-e88f-4ba9-85ee-ea431040722a', 'Xét nghiệm sinh hóa máu', '100000', '2024-06-19 23:08:26', NULL, 'S1', '141777d8-5459-4994-97fc-56f5079f55a9', 'Đánh giá chức năng gan, thận, nồng độ đường, cholesterol, và các chất điện giải.');

-- ----------------------------
-- Table structure for patient
-- ----------------------------
DROP TABLE IF EXISTS `patient`;
CREATE TABLE `patient`  (
  `patient_bhyt` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  INDEX `account_id`(`id` ASC) USING BTREE,
  CONSTRAINT `patient_ibfk_1` FOREIGN KEY (`id`) REFERENCES `account` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of patient
-- ----------------------------
INSERT INTO `patient` VALUES (NULL, 'e4cfe261-d24a-4075-b783-a618d4d9a6c0');
INSERT INTO `patient` VALUES (NULL, 'c2737fe9-0181-4e8c-a4fe-5a1ddb751241');
INSERT INTO `patient` VALUES ('BHYT111', '6bd0d4d9-a931-49cf-968c-86e62ca868f2');
INSERT INTO `patient` VALUES (NULL, '08f030d7-4688-4c3b-ac30-0f2c4bda5a27');
INSERT INTO `patient` VALUES (NULL, '827d23fb-2647-493a-9f32-8c188f246cc2');
INSERT INTO `patient` VALUES (NULL, '155286fa-bad3-4489-992c-83dba757e9d4');
INSERT INTO `patient` VALUES (NULL, '8fa4b5e3-50c0-428b-bc51-c8d93722859e');
INSERT INTO `patient` VALUES (NULL, 'ed39efac-22b0-40b1-bd6e-f15eb6f2128e');
INSERT INTO `patient` VALUES (NULL, '8612d2c6-692a-4526-8236-f646619943a2');
INSERT INTO `patient` VALUES (NULL, '8a141468-ed57-4411-9023-944063c48a8b');
INSERT INTO `patient` VALUES (NULL, '74499e95-5154-444a-a792-7bdeca32ce01');
INSERT INTO `patient` VALUES (NULL, '8d8bca8d-5812-4ebc-8901-22b6e604626d');
INSERT INTO `patient` VALUES (NULL, 'a29db3f7-8d45-427e-8a6f-77e57bb574c4');
INSERT INTO `patient` VALUES (NULL, '30b8d9b2-f0f7-4800-bcd6-98ec8a4ae2cd');
INSERT INTO `patient` VALUES (NULL, 'a2cb9a1b-2920-4ae6-886d-e0e176f6e9e7');
INSERT INTO `patient` VALUES (NULL, '6df6f8d3-3914-4388-bfc1-be359b33a175');
INSERT INTO `patient` VALUES (NULL, '3801eb3d-f892-453e-ab38-621f3345bae4');
INSERT INTO `patient` VALUES (NULL, 'ad2c6975-9a10-458c-8de9-e0c5ad796c3f');
INSERT INTO `patient` VALUES (NULL, '80a9362b-6b71-4ea9-bb46-34196b4a9790');
INSERT INTO `patient` VALUES (NULL, 'f65385fe-e0b9-4d84-acb2-2c91c4dc3c55');
INSERT INTO `patient` VALUES (NULL, '27a4f109-a5d6-49fc-8bf3-86398462c14a');
INSERT INTO `patient` VALUES (NULL, '7ae5f9cb-0cfa-4570-ae87-5fbb292da8cc');
INSERT INTO `patient` VALUES (NULL, '4917099e-23c7-42d4-8ef9-765a3421f269');
INSERT INTO `patient` VALUES (NULL, '44db40f6-004e-41a5-a208-6218198cf357');
INSERT INTO `patient` VALUES (NULL, '23d47246-0c11-4307-be65-6f15feb4175c');
INSERT INTO `patient` VALUES (NULL, 'd8411d4e-dd9b-4696-968c-6ea0d5fda40d');
INSERT INTO `patient` VALUES (NULL, 'ee225a4f-f573-4da1-b0c9-3b094c2fb7d8');

-- ----------------------------
-- Table structure for support
-- ----------------------------
DROP TABLE IF EXISTS `support`;
CREATE TABLE `support`  (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `support_value` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `support_info` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `id_group_time` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `create_at` timestamp NULL DEFAULT current_timestamp,
  `update_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `id_group_time`(`id_group_time` ASC) USING BTREE,
  CONSTRAINT `support_ibfk_1` FOREIGN KEY (`id_group_time`) REFERENCES `group_time` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of support
-- ----------------------------
INSERT INTO `support` VALUES ('L1', 'Info', 'LEVEL', NULL, '2024-04-11 23:55:59', '2024-04-11 23:55:59');
INSERT INTO `support` VALUES ('L2', 'Warning', 'LEVEL', NULL, '2024-04-11 23:55:59', '2024-04-11 23:55:59');
INSERT INTO `support` VALUES ('L3', 'Danger', 'LEVEL', NULL, '2024-04-11 23:55:59', '2024-04-11 23:55:59');
INSERT INTO `support` VALUES ('P1', '44c79a43-5739-4cc2-89d9-5e48e145a0a0', 'PACKAGE_DEFAULT', NULL, '2024-04-26 09:06:00', '2024-06-26 10:36:43');
INSERT INTO `support` VALUES ('R1', 'ADMIN', 'ROLE', NULL, '2024-04-11 23:55:59', '2024-05-16 17:30:21');
INSERT INTO `support` VALUES ('R2', 'DOCTOR', 'ROLE', NULL, '2024-04-11 23:55:59', '2024-05-16 17:30:16');
INSERT INTO `support` VALUES ('R4', 'PATIENT', 'ROLE', NULL, '2024-04-11 23:55:59', '2024-05-20 00:22:34');
INSERT INTO `support` VALUES ('S1', 'Mở', 'STATUS', NULL, '2024-04-11 23:55:59', '2024-04-11 23:55:59');
INSERT INTO `support` VALUES ('S2', 'Khóa', 'STATUS', NULL, '2024-04-11 23:55:59', '2024-04-11 23:55:59');
INSERT INTO `support` VALUES ('S3', 'Duyệt', 'STATUS', NULL, '2024-04-11 23:55:59', '2024-04-11 23:55:59');
INSERT INTO `support` VALUES ('S4', 'Hủy', 'STATUS', NULL, '2024-04-11 23:55:59', '2024-04-11 23:55:59');
INSERT INTO `support` VALUES ('S5', 'Chưa xác thực', 'STATUS', NULL, '2024-05-12 16:22:01', '2024-05-12 16:22:01');
INSERT INTO `support` VALUES ('T1', '07:00 - 07:30', 'TIME', '1', '2024-04-11 23:55:59', '2024-04-11 23:55:59');
INSERT INTO `support` VALUES ('T2', '07:30 - 08:00', 'TIME', '1', '2024-04-11 23:55:59', '2024-04-11 23:55:59');
INSERT INTO `support` VALUES ('T3', '08:00 - 08:30', 'TIME', '1', '2024-04-11 23:55:59', '2024-04-11 23:55:59');
INSERT INTO `support` VALUES ('T4', '08:30 - 09:00', 'TIME', '1', '2024-04-11 23:55:59', '2024-04-11 23:55:59');
INSERT INTO `support` VALUES ('T5', '09:00 - 09:30', 'TIME', '1', '2024-04-11 23:55:59', '2024-04-11 23:55:59');
INSERT INTO `support` VALUES ('T6', '09:30 - 10:00', 'TIME', '1', '2024-04-11 23:55:59', '2024-04-11 23:55:59');
INSERT INTO `support` VALUES ('T7', '10:00 - 10:30', 'TIME', '1', '2024-04-11 23:55:59', '2024-04-11 23:55:59');
INSERT INTO `support` VALUES ('T8', '10:30 - 11:00', 'TIME', '1', '2024-04-11 23:55:59', '2024-04-11 23:55:59');
INSERT INTO `support` VALUES ('T9', '11:00 - 11:30', 'TIME', '1', '2024-04-11 23:55:59', '2024-04-11 23:55:59');
INSERT INTO `support` VALUES ('T91', '12:30 - 13:00', 'TIME', '2', '2024-04-11 23:55:59', '2024-04-11 23:55:59');
INSERT INTO `support` VALUES ('T92', '13:00 - 13:30', 'TIME', '2', '2024-04-11 23:55:59', '2024-04-11 23:55:59');
INSERT INTO `support` VALUES ('T93', '13:30 - 14:00', 'TIME', '2', '2024-04-11 23:55:59', '2024-04-11 23:55:59');
INSERT INTO `support` VALUES ('T94', '14:00 - 14:30', 'TIME', '2', '2024-04-11 23:55:59', '2024-04-11 23:55:59');
INSERT INTO `support` VALUES ('T95', '14:30 - 15:00', 'TIME', '2', '2024-04-11 23:55:59', '2024-04-11 23:55:59');
INSERT INTO `support` VALUES ('T96', '15:00 - 15:30', 'TIME', '2', '2024-04-11 23:55:59', '2024-04-11 23:55:59');
INSERT INTO `support` VALUES ('T97', '15:30 - 16:00', 'TIME', '2', '2024-04-11 23:55:59', '2024-04-11 23:55:59');
INSERT INTO `support` VALUES ('T98', '16:00 - 16:30', 'TIME', '2', '2024-04-11 23:55:59', '2024-04-11 23:55:59');
INSERT INTO `support` VALUES ('T99', '16:30 - 17:00', 'TIME', '2', '2024-04-11 23:55:59', '2024-04-11 23:55:59');

SET FOREIGN_KEY_CHECKS = 1;
