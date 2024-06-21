/*
 Navicat Premium Data Transfer

 Source Server         : sche_treatment_db
 Source Server Type    : MySQL
 Source Server Version : 80035 (8.0.35)
 Source Host           : essaydb.cri6y6i4wac4.ap-southeast-2.rds.amazonaws.com:3306
 Source Schema         : sche_treatment_db

 Target Server Type    : MySQL
 Target Server Version : 80035 (8.0.35)
 File Encoding         : 65001

 Date: 21/06/2024 14:17:50
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
  `create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
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
INSERT INTO `account` VALUES ('e4cfe261-d24a-4075-b783-a618d4d9a6c0', '0147852369', '$2a$10$wfgchgVGa/W9hPXHPZtHhu9arZfRQalplLR04NQ.WbXZ.JxEyohwK', 'nimda', 0, '2024-06-19 22:47:02', '2024-06-19 15:47:31', 'R1', 'S1', 'admin@gmail.com', '');

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
  `create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
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

-- ----------------------------
-- Table structure for appointment_result
-- ----------------------------
DROP TABLE IF EXISTS `appointment_result`;
CREATE TABLE `appointment_result`  (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `result_symptom` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `result_diagnostic` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `result_note` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `appointment_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `appointment_id`(`appointment_id` ASC) USING BTREE,
  CONSTRAINT `appointment_result_ibfk_1` FOREIGN KEY (`appointment_id`) REFERENCES `appointment` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of appointment_result
-- ----------------------------

-- ----------------------------
-- Table structure for bill
-- ----------------------------
DROP TABLE IF EXISTS `bill`;
CREATE TABLE `bill`  (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `package_price` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `bill_sum` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `bill_ispay` tinyint(1) NOT NULL,
  `create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
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

-- ----------------------------
-- Table structure for calendar
-- ----------------------------
DROP TABLE IF EXISTS `calendar`;
CREATE TABLE `calendar`  (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `calendar_date` date NULL DEFAULT NULL,
  `create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
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

-- ----------------------------
-- Table structure for clinic
-- ----------------------------
DROP TABLE IF EXISTS `clinic`;
CREATE TABLE `clinic`  (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `clinic_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
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
INSERT INTO `clinic` VALUES ('141777d8-5459-4994-97fc-56f5079f55a9', 'Phòng xét nghiệm máu', '2024-06-19 23:02:25', NULL, '156f8735-f826-11ee-87e1-847beb19aaf6', 'S1');
INSERT INTO `clinic` VALUES ('24f6098b-2274-4c73-8b05-23fb4ecb1ede', 'Phòng nội soi', '2024-06-19 23:02:44', '2024-06-19 23:02:44', '156f8735-f826-11ee-87e1-847beb19aaf6', 'S1');
INSERT INTO `clinic` VALUES ('49451b16-f826-11ee-87e1-847beb19aaf6', 'Phòng Tiếp nhận gói khám bệnh', '2024-04-12 00:09:41', '2024-04-12 00:09:41', '156f8735-f826-11ee-87e1-847beb19aaf6', 'S1');
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

-- ----------------------------
-- Table structure for evaluate
-- ----------------------------
DROP TABLE IF EXISTS `evaluate`;
CREATE TABLE `evaluate`  (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `evaluate_content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
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
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `log_content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `account_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `support_level_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `account_id`(`account_id` ASC) USING BTREE,
  INDEX `support_level_id`(`support_level_id` ASC) USING BTREE,
  CONSTRAINT `log_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `log_ibfk_2` FOREIGN KEY (`support_level_id`) REFERENCES `support` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of log
-- ----------------------------

-- ----------------------------
-- Table structure for medical_area
-- ----------------------------
DROP TABLE IF EXISTS `medical_area`;
CREATE TABLE `medical_area`  (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `area_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
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
  `create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
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
INSERT INTO `medical_package` VALUES ('44c79a43-5739-4cc2-89d9-5e48e145a0a0', 'Gói khám bệnh thường', '50000', '2024-05-08 21:56:59', '2024-05-08 21:56:59', 'S1', '49451b16-f826-11ee-87e1-847beb19aaf6');
INSERT INTO `medical_package` VALUES ('fc649acb-3e3e-48c7-980c-303b30d14171', 'Gói Xét Nghiệm Tầm Soát Viêm Gan', '779000', '2024-06-19 23:15:15', '2024-06-19 23:15:16', 'S1', 'ca40ddff-1a00-4579-9fda-935545a73068');

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
INSERT INTO `medical_package_service` VALUES ('33db4918-ec4c-402b-b3e1-f80dbda0aa2f', 'bcd50ffc-98ab-4349-bdee-82a4d819332f', 'fc649acb-3e3e-48c7-980c-303b30d14171', NULL);
INSERT INTO `medical_package_service` VALUES ('dafcdc0f-9381-4529-9c17-3bae97e68e09', 'e27ea486-e88f-4ba9-85ee-ea431040722a', 'fc649acb-3e3e-48c7-980c-303b30d14171', NULL);

-- ----------------------------
-- Table structure for medical_service
-- ----------------------------
DROP TABLE IF EXISTS `medical_service`;
CREATE TABLE `medical_service`  (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `service_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `service_price` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
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

-- ----------------------------
-- Table structure for support
-- ----------------------------
DROP TABLE IF EXISTS `support`;
CREATE TABLE `support`  (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `support_value` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `support_info` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `id_group_time` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
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
INSERT INTO `support` VALUES ('P1', '44c79a43-5739-4cc2-89d9-5e48e145a0a0', 'PACKAGE_DEFAULT', NULL, '2024-04-26 09:06:00', '2024-04-26 09:06:00');
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
