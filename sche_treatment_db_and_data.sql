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

 Date: 03/05/2024 15:27:06
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
  `create_at` timestamp NOT NULL DEFAULT current_timestamp,
  `update_at` timestamp NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  `support_role_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `support_status_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `support_role_id`(`support_role_id` ASC) USING BTREE,
  INDEX `support_status_id`(`support_status_id` ASC) USING BTREE,
  CONSTRAINT `account_ibfk_1` FOREIGN KEY (`support_role_id`) REFERENCES `support` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `account_ibfk_2` FOREIGN KEY (`support_status_id`) REFERENCES `support` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of account
-- ----------------------------
INSERT INTO `account` VALUES ('ea279998-f825-11ee-87e1-847beb19aaf6', '0416987854', '0419ba05dfcbf1ef51011af3230bba10', 'Patient_4028', 1, '2024-04-12 00:07:02', '2024-04-12 00:07:02', 'R4', 'S1');
INSERT INTO `account` VALUES ('ea283882-f825-11ee-87e1-847beb19aaf6', '0607852097', '0419ba05dfcbf1ef51011af3230bba10', 'Patient_7494', 1, '2024-04-12 00:07:02', '2024-04-12 00:07:02', 'R4', 'S1');
INSERT INTO `account` VALUES ('ea283b21-f825-11ee-87e1-847beb19aaf6', '0369497306', '0419ba05dfcbf1ef51011af3230bba10', 'Patient_0768', 0, '2024-04-12 00:07:02', '2024-04-12 00:07:02', 'R4', 'S1');
INSERT INTO `account` VALUES ('ea283b99-f825-11ee-87e1-847beb19aaf6', '0147779531', '0419ba05dfcbf1ef51011af3230bba10', 'Patient_9119', 0, '2024-04-12 00:07:02', '2024-04-12 00:07:02', 'R4', 'S1');
INSERT INTO `account` VALUES ('ea283c00-f825-11ee-87e1-847beb19aaf6', '0845936862', '0419ba05dfcbf1ef51011af3230bba10', 'Patient_8806', 1, '2024-04-12 00:07:02', '2024-04-12 00:07:02', 'R4', 'S1');
INSERT INTO `account` VALUES ('ea283c62-f825-11ee-87e1-847beb19aaf6', '0684903245', '0419ba05dfcbf1ef51011af3230bba10', 'Patient_8284', 0, '2024-04-12 00:07:02', '2024-04-12 00:07:02', 'R4', 'S1');
INSERT INTO `account` VALUES ('ea283ccc-f825-11ee-87e1-847beb19aaf6', '0951965917', '0419ba05dfcbf1ef51011af3230bba10', 'Patient_4974', 1, '2024-04-12 00:07:02', '2024-04-12 00:07:02', 'R4', 'S1');
INSERT INTO `account` VALUES ('ea283d32-f825-11ee-87e1-847beb19aaf6', '0664887402', '0419ba05dfcbf1ef51011af3230bba10', 'Patient_4300', 0, '2024-04-12 00:07:02', '2024-04-12 00:07:02', 'R4', 'S1');
INSERT INTO `account` VALUES ('ea283da0-f825-11ee-87e1-847beb19aaf6', '0487914043', '0419ba05dfcbf1ef51011af3230bba10', 'Patient_9727', 0, '2024-04-12 00:07:02', '2024-04-12 00:07:02', 'R4', 'S1');
INSERT INTO `account` VALUES ('ea283e03-f825-11ee-87e1-847beb19aaf6', '081165236', '0419ba05dfcbf1ef51011af3230bba10', 'Patient_2062', 1, '2024-04-12 00:07:02', '2024-04-12 00:07:02', 'R4', 'S1');
INSERT INTO `account` VALUES ('ea293a03-f825-11ee-87e1-847beb19aaf6', '0987654321', '0419ba05dfcbf1ef51011af3230bba10', 'John Doe', 1, '2024-04-12 00:07:02', '2024-04-12 00:07:02', 'R2', 'S1');
INSERT INTO `account` VALUES ('ea294989-f825-11ee-87e1-847beb19aaf6', '0123456789', '0419ba05dfcbf1ef51011af3230bba10', 'Jane Smith', 0, '2024-04-12 00:07:02', '2024-04-12 00:07:02', 'R2', 'S1');
INSERT INTO `account` VALUES ('ea294a20-f825-11ee-87e1-847beb19aaf6', '0909090909', '0419ba05dfcbf1ef51011af3230bba10', 'Alex Johnson', 1, '2024-04-12 00:07:02', '2024-04-12 00:07:02', 'R2', 'S1');
INSERT INTO `account` VALUES ('ea294a85-f825-11ee-87e1-847beb19aaf6', '0999999999', '0419ba05dfcbf1ef51011af3230bba10', 'Alice Williams', 0, '2024-04-12 00:07:02', '2024-04-12 00:07:02', 'R2', 'S1');
INSERT INTO `account` VALUES ('ea294ae1-f825-11ee-87e1-847beb19aaf6', '0888888888', '0419ba05dfcbf1ef51011af3230bba10', 'Bob Brown', 1, '2024-04-12 00:07:02', '2024-04-12 00:07:02', 'R2', 'S1');
INSERT INTO `account` VALUES ('ea294b3c-f825-11ee-87e1-847beb19aaf6', '0777777777', '0419ba05dfcbf1ef51011af3230bba10', 'Emily Davis', 0, '2024-04-12 00:07:02', '2024-04-12 00:07:02', 'R2', 'S1');
INSERT INTO `account` VALUES ('ea29643b-f825-11ee-87e1-847beb19aaf6', '0666666666', '0419ba05dfcbf1ef51011af3230bba10', 'Michael Wilson', 1, '2024-04-12 00:07:02', '2024-04-12 00:07:02', 'R2', 'S1');
INSERT INTO `account` VALUES ('ea2964e1-f825-11ee-87e1-847beb19aaf6', '0555555555', '0419ba05dfcbf1ef51011af3230bba10', 'Jessica Taylor', 0, '2024-04-12 00:07:02', '2024-04-12 00:07:02', 'R2', 'S1');
INSERT INTO `account` VALUES ('ea296543-f825-11ee-87e1-847beb19aaf6', '0444444444', '0419ba05dfcbf1ef51011af3230bba10', 'William Martinez', 1, '2024-04-12 00:07:02', '2024-04-12 00:07:02', 'R2', 'S1');
INSERT INTO `account` VALUES ('ea296595-f825-11ee-87e1-847beb19aaf6', '0333333333', '0419ba05dfcbf1ef51011af3230bba10', 'Sarah Anderson', 0, '2024-04-12 00:07:02', '2024-04-12 00:07:02', 'R2', 'S1');

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
  `create_at` timestamp NOT NULL DEFAULT current_timestamp,
  `update_at` timestamp NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
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
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of appointment
-- ----------------------------
INSERT INTO `appointment` VALUES ('1508dd8f-9a71-417c-ba4d-fca823a04672', 'Nguyễn Đình Nguyên', '0935996512', 0, '', 'test double register 2', '2024-04-27 12:42:46', '2024-04-27 12:42:46', 'S1', 'ea283c62-f825-11ee-87e1-847beb19aaf6', '44c79a43-5739-4cc2-89d9-5e48e145a0a0', 'f4dd0a1d-2147-47a8-af4a-2c8d0d0cdc11', 'T7');
INSERT INTO `appointment` VALUES ('1b9207ed-f727-4143-aa10-7324238e7798', 'Nguyễn Đình Nguyên', '0935996512', 0, '', 'test double register 1', '2024-04-27 12:42:06', '2024-04-27 12:42:06', 'S1', 'ea283c62-f825-11ee-87e1-847beb19aaf6', '44c79a43-5739-4cc2-89d9-5e48e145a0a0', 'f4dd0a1d-2147-47a8-af4a-2c8d0d0cdc11', 'T6');
INSERT INTO `appointment` VALUES ('8b586a69-046d-4fcc-b5bb-17a308e4c5dc', 'Nguyễn Đình Nguyên', '0935996512', 0, '', 'Test doctor', '2024-05-02 17:04:35', '2024-05-02 17:04:35', 'S1', 'ea283c62-f825-11ee-87e1-847beb19aaf6', '44c79a43-5739-4cc2-89d9-5e48e145a0a0', 'e28af715-a677-43b0-adee-89fa94a10e27', 'T9');
INSERT INTO `appointment` VALUES ('a30f9ada-92a7-4349-a7c4-db6a4f3f63be', 'Nguyễn Đình Nguyên', '0935996512', 0, '', 'Khám ung bướu', '2024-04-26 10:46:00', '2024-04-26 10:46:00', 'S1', 'ea283c62-f825-11ee-87e1-847beb19aaf6', '44c79a43-5739-4cc2-89d9-5e48e145a0a0', 'f4dd0a1d-2147-47a8-af4a-2c8d0d0cdc11', 'T4');
INSERT INTO `appointment` VALUES ('af16bc99-dbba-4db1-afb5-c83a1722fd09', 'Nguyễn Đình Nguyên', '0935996512', 0, '', 'Tesssst 3x', '2024-04-23 23:15:44', '2024-04-23 23:15:44', 'S1', 'ea283c62-f825-11ee-87e1-847beb19aaf6', '803a9687-fb2f-11ee-aabb-847beb19aaf6', '5efa6f63-61c2-42c4-8af1-02f7b5a754b2', 'T5');
INSERT INTO `appointment` VALUES ('c6d025d8-fc30-4442-b505-2ca200db4ab7', 'Nguyễn Đình Nguyên', '0935996512', 0, '', 'Khám bệnh online', '2024-04-20 13:57:22', '2024-04-26 15:50:09', 'S1', 'ea283c62-f825-11ee-87e1-847beb19aaf6', '803a9320-fb2f-11ee-aabb-847beb19aaf6', '7bc3d7d8-f868-11ee-a9c2-847beb19aaf6', 'T92');
INSERT INTO `appointment` VALUES ('c9101734-ab2f-4216-a678-94a336373f79', 'Nguyễn Đình Nguyên', '0935996512', 0, '', 'Vui lòng khám cho tôi', '2024-04-20 13:34:42', '2024-04-26 15:50:16', 'S1', 'ea283c62-f825-11ee-87e1-847beb19aaf6', '803a96e1-fb2f-11ee-aabb-847beb19aaf6', '7bc3db76-f868-11ee-a9c2-847beb19aaf6', 'T4');
INSERT INTO `appointment` VALUES ('ca6e4466-cef4-4627-9eeb-30c813da1108', 'Nguyễn Đình Nguyên', '0935996512', 0, '', 'test double register 4', '2024-04-27 12:43:47', '2024-04-27 12:43:47', 'S1', 'ea283c62-f825-11ee-87e1-847beb19aaf6', '44c79a43-5739-4cc2-89d9-5e48e145a0a0', 'f4dd0a1d-2147-47a8-af4a-2c8d0d0cdc11', 'T8');
INSERT INTO `appointment` VALUES ('cd4cd248-c153-4df7-bc82-65bff61e28fc', 'Nguyễn Đình Nguyên', '0935996512', 0, '', 'Khám bệnh lần đầu', '2024-04-26 10:45:15', '2024-04-26 15:50:25', 'S1', 'ea283c62-f825-11ee-87e1-847beb19aaf6', '44c79a43-5739-4cc2-89d9-5e48e145a0a0', 'f4dd0a1d-2147-47a8-af4a-2c8d0d0cdc11', 'T1');
INSERT INTO `appointment` VALUES ('d5afc985-2a4a-4299-a02c-b83547f64270', 'Nguyễn Đình Nguyên', '0935996512', 0, '', 'Đau lưng', '2024-04-19 14:13:52', '2024-04-26 15:50:29', 'S1', 'ea283c62-f825-11ee-87e1-847beb19aaf6', '803a96e1-fb2f-11ee-aabb-847beb19aaf6', '7bc3db76-f868-11ee-a9c2-847beb19aaf6', 'T1');
INSERT INTO `appointment` VALUES ('d5b49970-1e61-4b14-b4d2-8db01460bf89', 'Nguyễn Đình Nguyên', '0935996512', 0, '', 'test bill x2', '2024-04-27 10:20:50', '2024-04-27 10:20:50', 'S1', 'ea283c62-f825-11ee-87e1-847beb19aaf6', '44c79a43-5739-4cc2-89d9-5e48e145a0a0', 'f4dd0a1d-2147-47a8-af4a-2c8d0d0cdc11', 'T3');
INSERT INTO `appointment` VALUES ('e6b51b42-dc14-42f6-aa41-e090ddb33efd', 'Nguyễn Đình Nguyên', '0935996512', 0, '', 'Đau chân', '2024-04-20 13:40:09', '2024-04-26 15:50:34', 'S1', 'ea283c62-f825-11ee-87e1-847beb19aaf6', '803a92c3-fb2f-11ee-aabb-847beb19aaf6', '7bc3db76-f868-11ee-a9c2-847beb19aaf6', 'T5');
INSERT INTO `appointment` VALUES ('e78b7e15-e1a8-4119-912f-dec8972ea948', 'Nguyễn Đình Nguyên', '0825996511', 0, '', 'Đau test search', '2024-05-02 17:52:46', '2024-05-02 17:52:47', 'S1', 'ea283c62-f825-11ee-87e1-847beb19aaf6', '44c79a43-5739-4cc2-89d9-5e48e145a0a0', 'e28af715-a677-43b0-adee-89fa94a10e27', 'T4');
INSERT INTO `appointment` VALUES ('ea0d43fe-6868-41d8-b312-59b0d2fc1914', 'Nguyễn Đình Nguyên', '0935996512', 0, '', 'Đau cẳng tay', '2024-04-20 13:38:38', '2024-04-26 15:50:41', 'S1', 'ea283c62-f825-11ee-87e1-847beb19aaf6', '803a90d6-fb2f-11ee-aabb-847beb19aaf6', '7bc3db76-f868-11ee-a9c2-847beb19aaf6', 'T6');
INSERT INTO `appointment` VALUES ('ed556887-09eb-498d-8f83-4f56c65a0c55', 'Nguyễn Đình Nguyên', '0935996512', 0, '', 'Đau test appointment', '2024-04-23 23:06:39', '2024-04-26 15:49:56', 'S1', 'ea283c62-f825-11ee-87e1-847beb19aaf6', '803a97a6-fb2f-11ee-aabb-847beb19aaf6', '5efa6f63-61c2-42c4-8af1-02f7b5a754b2', 'T3');
INSERT INTO `appointment` VALUES ('fa39de74-ee2e-494b-a626-62d02d6c7e33', 'Nguyễn Đình Nguyên', '0935996512', 0, '', '', '2024-04-27 12:33:53', '2024-04-27 12:33:53', 'S1', 'ea283c62-f825-11ee-87e1-847beb19aaf6', '44c79a43-5739-4cc2-89d9-5e48e145a0a0', 'f4dd0a1d-2147-47a8-af4a-2c8d0d0cdc11', 'T2');
INSERT INTO `appointment` VALUES ('fcba7aed-bc7d-4ae5-8f84-02ab7866227e', 'Nguyễn Đình Nguyên', '0935996512', 0, '', 'Test bill x3', '2024-04-27 10:27:14', '2024-04-27 10:27:14', 'S1', 'ea283c62-f825-11ee-87e1-847beb19aaf6', '44c79a43-5739-4cc2-89d9-5e48e145a0a0', 'f4dd0a1d-2147-47a8-af4a-2c8d0d0cdc11', 'T5');

-- ----------------------------
-- Table structure for appointment_result
-- ----------------------------
DROP TABLE IF EXISTS `appointment_result`;
CREATE TABLE `appointment_result`  (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `result_symptom` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `result_diagnostic` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `result_note` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `create_at` timestamp NOT NULL DEFAULT current_timestamp,
  `update_at` timestamp NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  `appointment_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `appointment_id`(`appointment_id` ASC) USING BTREE,
  CONSTRAINT `appointment_result_ibfk_1` FOREIGN KEY (`appointment_id`) REFERENCES `appointment` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of appointment_result
-- ----------------------------
INSERT INTO `appointment_result` VALUES ('1', 'sổ mũi', 'ung thư mũi', 'Không thể chữa trị ', '2024-05-02 23:37:23', '2024-05-02 23:37:23', 'ca6e4466-cef4-4627-9eeb-30c813da1108');
INSERT INTO `appointment_result` VALUES ('7418ad17-f06a-4a1f-ab78-0ab9986ee903', 'Loét, nhiễm trùng bàn chân Đầy bụng, chậm tiêu, nuốt khó', 'Tiểu đường type 2 ', 'Nên đi khám thường xuyên', '2024-05-03 13:29:19', '2024-05-03 13:29:19', '1b9207ed-f727-4143-aa10-7324238e7798');
INSERT INTO `appointment_result` VALUES ('a6ed6352-9a99-4912-80a7-f555fa430164', 'Tiểu nhiều, chân có tình trạng lở loét', 'Tiểu đường type 2 (do đường trong nước tiểu cao, gây lợi niệu thẩm thấu)', 'Ăn nhiều rau xanh hơn để giảm nguy cơ mắc bệnh tiểu đường và ngủ đủ giấc và thường xuyên thể dục, thể thao', '2024-05-03 13:43:07', '2024-05-03 13:43:07', '1508dd8f-9a71-417c-ba4d-fca823a04672');
INSERT INTO `appointment_result` VALUES ('e8e11f54-8a08-4056-b51a-bc92327d02cf', '1', '2', '34445', '2024-05-03 13:37:09', '2024-05-03 13:37:09', '8b586a69-046d-4fcc-b5bb-17a308e4c5dc');

-- ----------------------------
-- Table structure for appointment_service
-- ----------------------------
DROP TABLE IF EXISTS `appointment_service`;
CREATE TABLE `appointment_service`  (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `service_price` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `appointment_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `service_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `appointment_id`(`appointment_id` ASC) USING BTREE,
  INDEX `service_id`(`service_id` ASC) USING BTREE,
  CONSTRAINT `appointment_service_ibfk_1` FOREIGN KEY (`appointment_id`) REFERENCES `appointment` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `appointment_service_ibfk_2` FOREIGN KEY (`service_id`) REFERENCES `medical_service` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of appointment_service
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
  `create_at` timestamp NOT NULL DEFAULT current_timestamp,
  `update_at` timestamp NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  `appointment_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `appointment_id`(`appointment_id` ASC) USING BTREE,
  CONSTRAINT `bill_ibfk_1` FOREIGN KEY (`appointment_id`) REFERENCES `appointment` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of bill
-- ----------------------------
INSERT INTO `bill` VALUES ('5749e6cb-396f-449d-a956-baa78fdf2e06', '50000', '50000', 0, '2024-04-27 12:43:47', '2024-04-27 12:43:47', 'ca6e4466-cef4-4627-9eeb-30c813da1108');
INSERT INTO `bill` VALUES ('81c2549e-d5ae-4c99-b33b-b6b99dafc798', '50000', '50000', 0, '2024-05-02 17:52:47', '2024-05-02 17:52:47', 'e78b7e15-e1a8-4119-912f-dec8972ea948');
INSERT INTO `bill` VALUES ('bc2f4719-e9e2-4195-b169-79a5927de437', '50000', '50000', 0, '2024-04-27 12:33:53', '2024-04-27 12:33:53', 'fa39de74-ee2e-494b-a626-62d02d6c7e33');
INSERT INTO `bill` VALUES ('c429ac23-128c-4d7e-a04c-3064931a84cb', '50000', '50000', 0, '2024-05-02 17:04:35', '2024-05-02 17:04:35', '8b586a69-046d-4fcc-b5bb-17a308e4c5dc');
INSERT INTO `bill` VALUES ('cb8f4833-a743-4c6d-b3a1-75ab36ca0161', '50000', '50000', 0, '2024-04-27 12:42:46', '2024-04-27 12:42:46', '1508dd8f-9a71-417c-ba4d-fca823a04672');
INSERT INTO `bill` VALUES ('d31d27b7-7eaa-4d56-bf6e-61cbbdad8777', '50000', '50000', 0, '2024-04-27 12:42:06', '2024-04-27 12:42:06', '1b9207ed-f727-4143-aa10-7324238e7798');

-- ----------------------------
-- Table structure for calendar
-- ----------------------------
DROP TABLE IF EXISTS `calendar`;
CREATE TABLE `calendar`  (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `calendar_date` date NULL DEFAULT NULL,
  `create_at` timestamp NOT NULL DEFAULT current_timestamp,
  `update_at` timestamp NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
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
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of calendar
-- ----------------------------
INSERT INTO `calendar` VALUES ('1', '2024-04-16', '2024-04-14 01:18:05', '2024-04-16 19:11:02', '49451b16-f826-11ee-87e1-847beb19aaf6', 'ea294ae1-f825-11ee-87e1-847beb19aaf6', '1');
INSERT INTO `calendar` VALUES ('11111', '2024-04-18', '2024-04-13 21:32:31', '2024-04-16 19:11:07', '49451b16-f826-11ee-87e1-847beb19aaf6', 'ea294ae1-f825-11ee-87e1-847beb19aaf6', '1');
INSERT INTO `calendar` VALUES ('11aa442e-f868-11ee-a9c2-847beb19aaf6', '2024-04-12', '2024-04-12 08:00:35', '2024-04-14 01:10:23', '49451b16-f826-11ee-87e1-847beb19aaf6', 'ea296595-f825-11ee-87e1-847beb19aaf6', '1');
INSERT INTO `calendar` VALUES ('11aa720b-f868-11ee-a9c2-847beb19aaf6', '2024-04-18', '2024-04-12 08:00:35', '2024-04-16 19:11:13', '49451b16-f826-11ee-87e1-847beb19aaf6', 'ea296595-f825-11ee-87e1-847beb19aaf6', '2');
INSERT INTO `calendar` VALUES ('12333333', '2024-04-15', '2024-04-14 08:13:34', '2024-04-16 19:09:48', '49451b16-f826-11ee-87e1-847beb19aaf6', 'ea293a03-f825-11ee-87e1-847beb19aaf6', '1');
INSERT INTO `calendar` VALUES ('1534a364-090a-432b-a772-48dcd7039e85', '2024-05-01', '2024-04-28 16:57:40', '2024-04-28 16:57:40', '49451b16-f826-11ee-87e1-847beb19aaf6', 'ea294ae1-f825-11ee-87e1-847beb19aaf6', '2');
INSERT INTO `calendar` VALUES ('1b715842-8280-4d1c-bee9-a769a220d1fb', '2024-04-26', '2024-04-22 17:21:17', '2024-04-22 17:21:17', '4948b9df-f826-11ee-87e1-847beb19aaf6', 'ea293a03-f825-11ee-87e1-847beb19aaf6', '1');
INSERT INTO `calendar` VALUES ('2', '2024-04-18', '2024-04-14 07:06:26', '2024-04-16 19:11:50', '49451b16-f826-11ee-87e1-847beb19aaf6', 'ea296595-f825-11ee-87e1-847beb19aaf6', '2');
INSERT INTO `calendar` VALUES ('20a95d2d-7c39-4c77-ad3c-70e66c25357a', '2024-04-24', '2024-04-22 20:50:55', '2024-04-22 20:50:55', '49451b16-f826-11ee-87e1-847beb19aaf6', 'ea294b3c-f825-11ee-87e1-847beb19aaf6', '1');
INSERT INTO `calendar` VALUES ('22f08046-ec45-4f0c-bd69-08aa34a2d1cd', '2024-04-29', '2024-04-28 17:01:23', '2024-04-28 17:01:23', '49471af6-f826-11ee-87e1-847beb19aaf6', 'ea294989-f825-11ee-87e1-847beb19aaf6', '1');
INSERT INTO `calendar` VALUES ('2f476d08-951e-436d-8b41-64a49d12d8df', '2024-04-28', '2024-04-28 16:13:53', '2024-04-28 16:13:53', '23826c73-03e6-4b8c-bc87-19534872aaf3', 'ea294ae1-f825-11ee-87e1-847beb19aaf6', '1');
INSERT INTO `calendar` VALUES ('3e9ef325-c2ed-49d1-bb1b-dc0c331fb051', '2024-04-24', '2024-04-22 20:51:38', '2024-04-22 20:51:38', '49451b16-f826-11ee-87e1-847beb19aaf6', 'ea294b3c-f825-11ee-87e1-847beb19aaf6', '2');
INSERT INTO `calendar` VALUES ('40176403-3fd3-4693-8ff0-e144f3c1fa9b', '2024-04-22', '2024-04-22 08:38:57', '2024-04-22 08:38:57', '49451b16-f826-11ee-87e1-847beb19aaf6', 'ea294ae1-f825-11ee-87e1-847beb19aaf6', '2');
INSERT INTO `calendar` VALUES ('5625b4b8-8eb9-4abf-b4d0-016cb9d41f03', '2024-04-24', '2024-04-22 17:18:48', '2024-04-22 17:18:48', '4948b66f-f826-11ee-87e1-847beb19aaf6', 'ea2964e1-f825-11ee-87e1-847beb19aaf6', '1');
INSERT INTO `calendar` VALUES ('5af97719-0680-472d-a2a4-34c1d362779f', '2024-04-27', '2024-04-28 15:48:44', '2024-04-28 15:48:44', '49451b16-f826-11ee-87e1-847beb19aaf6', 'ea294ae1-f825-11ee-87e1-847beb19aaf6', '1');
INSERT INTO `calendar` VALUES ('5efa6f63-61c2-42c4-8af1-02f7b5a754b2', '2024-04-26', '2024-04-23 23:01:14', '2024-04-23 23:01:14', '49490de8-f826-11ee-87e1-847beb19aaf6', 'ea294989-f825-11ee-87e1-847beb19aaf6', '1');
INSERT INTO `calendar` VALUES ('62656efe-528a-4078-a8ef-95e1482bd7c8', '2024-04-25', '2024-04-22 17:20:01', '2024-04-22 17:20:01', '4948b972-f826-11ee-87e1-847beb19aaf6', 'ea2964e1-f825-11ee-87e1-847beb19aaf6', '2');
INSERT INTO `calendar` VALUES ('6f112d83-f51d-4296-956d-983e6d3f7468', '2024-04-15', '2024-04-14 15:04:03', '2024-04-16 19:09:57', '49451b16-f826-11ee-87e1-847beb19aaf6', 'ea294989-f825-11ee-87e1-847beb19aaf6', '2');
INSERT INTO `calendar` VALUES ('6f774b5f-d0b2-4192-ade6-60eb41341b1d', '2024-04-30', '2024-04-28 17:27:28', '2024-04-28 17:27:28', '4947c3c1-f826-11ee-87e1-847beb19aaf6', 'ea29643b-f825-11ee-87e1-847beb19aaf6', '2');
INSERT INTO `calendar` VALUES ('72b3e1a4-8382-48d8-8196-30a3efaac2b0', '2024-04-30', '2024-04-28 17:25:45', '2024-04-28 17:25:45', '49471af6-f826-11ee-87e1-847beb19aaf6', 'ea294989-f825-11ee-87e1-847beb19aaf6', '2');
INSERT INTO `calendar` VALUES ('7986cafc-910a-44e6-88f1-328e4431d9be', '2024-04-22', '2024-04-21 09:02:50', '2024-04-21 09:02:50', '49451b16-f826-11ee-87e1-847beb19aaf6', 'ea296543-f825-11ee-87e1-847beb19aaf6', '1');
INSERT INTO `calendar` VALUES ('7bc33e73-f868-11ee-a9c2-847beb19aaf6', '2024-04-18', '2024-04-12 08:03:33', '2024-04-16 19:11:16', '49451b16-f826-11ee-87e1-847beb19aaf6', 'ea293a03-f825-11ee-87e1-847beb19aaf6', '1');
INSERT INTO `calendar` VALUES ('7bc3d7d8-f868-11ee-a9c2-847beb19aaf6', '2024-04-13', '2024-04-12 08:03:33', '2024-04-12 08:05:34', '49451b16-f826-11ee-87e1-847beb19aaf6', 'ea294989-f825-11ee-87e1-847beb19aaf6', '2');
INSERT INTO `calendar` VALUES ('7bc3db76-f868-11ee-a9c2-847beb19aaf6', '2024-04-14', '2024-04-12 08:03:33', '2024-04-12 08:03:33', '49451b16-f826-11ee-87e1-847beb19aaf6', 'ea293a03-f825-11ee-87e1-847beb19aaf6', '1');
INSERT INTO `calendar` VALUES ('7bc3dc4c-f868-11ee-a9c2-847beb19aaf6', '2024-04-20', '2024-04-12 08:03:33', '2024-04-16 19:11:19', '49451b16-f826-11ee-87e1-847beb19aaf6', 'ea294989-f825-11ee-87e1-847beb19aaf6', '2');
INSERT INTO `calendar` VALUES ('7bc48084-f868-11ee-a9c2-847beb19aaf6', '2024-04-15', '2024-04-12 08:03:33', '2024-04-12 08:03:33', '49451b16-f826-11ee-87e1-847beb19aaf6', 'ea293a03-f825-11ee-87e1-847beb19aaf6', '1');
INSERT INTO `calendar` VALUES ('7bc481a7-f868-11ee-a9c2-847beb19aaf6', '2024-04-20', '2024-04-12 08:03:33', '2024-04-16 19:11:22', '49451b16-f826-11ee-87e1-847beb19aaf6', 'ea294989-f825-11ee-87e1-847beb19aaf6', '2');
INSERT INTO `calendar` VALUES ('7bc48247-f868-11ee-a9c2-847beb19aaf6', '2024-04-19', '2024-04-12 08:03:33', '2024-04-16 19:11:26', '49451b16-f826-11ee-87e1-847beb19aaf6', 'ea293a03-f825-11ee-87e1-847beb19aaf6', '1');
INSERT INTO `calendar` VALUES ('84ebd019-a857-4ad7-86b6-1e417fbb5603', '2024-04-29', '2024-04-28 17:01:32', '2024-04-28 17:01:32', '49471af6-f826-11ee-87e1-847beb19aaf6', 'ea29643b-f825-11ee-87e1-847beb19aaf6', '2');
INSERT INTO `calendar` VALUES ('85d9d579-6f42-4085-be92-614a8e60fe30', '2024-04-09', '2024-04-18 21:43:30', '2024-04-18 21:43:30', '49471af6-f826-11ee-87e1-847beb19aaf6', 'ea294ae1-f825-11ee-87e1-847beb19aaf6', '1');
INSERT INTO `calendar` VALUES ('9326bc81-f598-45d7-86ee-a76d055d46b3', '2024-04-30', '2024-04-28 17:25:39', '2024-04-28 17:25:39', '49471af6-f826-11ee-87e1-847beb19aaf6', 'ea2964e1-f825-11ee-87e1-847beb19aaf6', '1');
INSERT INTO `calendar` VALUES ('936c95fb-da99-4105-8e03-ac4a8d50f242', '2024-04-21', '2024-04-20 17:10:22', '2024-04-20 17:10:22', '49451b16-f826-11ee-87e1-847beb19aaf6', 'ea294989-f825-11ee-87e1-847beb19aaf6', '2');
INSERT INTO `calendar` VALUES ('9923e369-b162-4358-a1cd-b448efa32c2c', '2024-05-02', '2024-04-28 16:56:42', '2024-04-28 16:56:42', '49451b16-f826-11ee-87e1-847beb19aaf6', 'ea294b3c-f825-11ee-87e1-847beb19aaf6', '2');
INSERT INTO `calendar` VALUES ('9fb37a41-455d-4eac-a3a3-f1cd8e4cd971', '2024-04-29', '2024-04-27 23:17:02', '2024-04-27 23:17:02', '49451b16-f826-11ee-87e1-847beb19aaf6', 'ea293a03-f825-11ee-87e1-847beb19aaf6', '2');
INSERT INTO `calendar` VALUES ('a473edd3-9c16-4a67-99ba-6c983c1301a1', '2024-04-24', '2024-04-22 17:18:54', '2024-04-22 17:18:54', '4948b66f-f826-11ee-87e1-847beb19aaf6', 'ea294b3c-f825-11ee-87e1-847beb19aaf6', '2');
INSERT INTO `calendar` VALUES ('a7326cc4-7931-4d73-af05-d82f68f8114d', '2024-04-20', '2024-04-14 15:03:52', '2024-04-16 19:11:34', '49451b16-f826-11ee-87e1-847beb19aaf6', 'ea296595-f825-11ee-87e1-847beb19aaf6', '1');
INSERT INTO `calendar` VALUES ('abf0f22c-9985-4d93-9739-8f4b00fb26e9', '2024-04-28', '2024-04-28 16:25:48', '2024-04-28 16:25:48', '49451b16-f826-11ee-87e1-847beb19aaf6', 'ea293a03-f825-11ee-87e1-847beb19aaf6', '1');
INSERT INTO `calendar` VALUES ('ac5d8c5b-e394-499e-81d7-8fa4afe2a16a', '2024-04-21', '2024-04-21 00:18:16', '2024-04-21 00:18:16', '49471af6-f826-11ee-87e1-847beb19aaf6', 'ea294a20-f825-11ee-87e1-847beb19aaf6', '1');
INSERT INTO `calendar` VALUES ('bacb215e-bcae-4644-925d-5c922c1463b7', '2024-04-30', '2024-04-28 16:29:51', '2024-04-28 16:29:51', '49451b16-f826-11ee-87e1-847beb19aaf6', 'ea294a85-f825-11ee-87e1-847beb19aaf6', '2');
INSERT INTO `calendar` VALUES ('bce1f4cb-4915-4ac8-8e4e-eebb2ed723a7', '2024-04-25', '2024-04-23 19:07:05', '2024-04-23 19:07:05', '49451b16-f826-11ee-87e1-847beb19aaf6', 'ea294ae1-f825-11ee-87e1-847beb19aaf6', '1');
INSERT INTO `calendar` VALUES ('ce8e1eb2-a78a-487b-88fb-b6f5cbc40d9b', '2024-04-21', '2024-04-21 00:18:28', '2024-04-21 00:18:28', '4947c3c1-f826-11ee-87e1-847beb19aaf6', 'ea293a03-f825-11ee-87e1-847beb19aaf6', '1');
INSERT INTO `calendar` VALUES ('d26c4bfd-03ed-4be9-b171-21ce98163d34', '2024-04-25', '2024-04-22 17:20:01', '2024-04-22 17:20:01', '4948b972-f826-11ee-87e1-847beb19aaf6', 'ea2964e1-f825-11ee-87e1-847beb19aaf6', '1');
INSERT INTO `calendar` VALUES ('dbf76ec7-72bf-4be8-b28f-afed41f402a7', '2024-04-21', '2024-04-21 00:18:09', '2024-04-21 00:18:09', '49471af6-f826-11ee-87e1-847beb19aaf6', 'ea294a20-f825-11ee-87e1-847beb19aaf6', '2');
INSERT INTO `calendar` VALUES ('dd4dace4-1b56-4987-a928-7d25f647f247', '2024-04-28', '2024-04-28 16:23:56', '2024-04-28 16:23:56', '49451b16-f826-11ee-87e1-847beb19aaf6', 'ea294ae1-f825-11ee-87e1-847beb19aaf6', '2');
INSERT INTO `calendar` VALUES ('e0dc2bc8-9217-4079-a364-6bfe94fc768b', '2024-04-30', '2024-04-28 16:29:21', '2024-04-28 16:29:21', '49451b16-f826-11ee-87e1-847beb19aaf6', 'ea296595-f825-11ee-87e1-847beb19aaf6', '2');
INSERT INTO `calendar` VALUES ('e1a47ff7-c683-417f-9320-0934258b40bf', '2024-04-23', '2024-04-22 17:17:35', '2024-04-22 17:17:35', '4948b66f-f826-11ee-87e1-847beb19aaf6', 'ea294989-f825-11ee-87e1-847beb19aaf6', '2');
INSERT INTO `calendar` VALUES ('e28af715-a677-43b0-adee-89fa94a10e27', '2024-05-02', '2024-04-28 16:56:57', '2024-04-28 16:56:57', '49451b16-f826-11ee-87e1-847beb19aaf6', 'ea29643b-f825-11ee-87e1-847beb19aaf6', '1');
INSERT INTO `calendar` VALUES ('f0003fb1-4443-4c33-a602-49cda95795bd', '2024-04-30', '2024-04-28 17:27:21', '2024-04-28 17:27:21', '4947c3c1-f826-11ee-87e1-847beb19aaf6', 'ea294b3c-f825-11ee-87e1-847beb19aaf6', '1');
INSERT INTO `calendar` VALUES ('f30c71a3-a714-46e2-80a5-304af3698fcf', '2024-04-28', '2024-04-28 16:19:00', '2024-04-28 16:19:00', '23826c73-03e6-4b8c-bc87-19534872aaf3', 'ea293a03-f825-11ee-87e1-847beb19aaf6', '2');
INSERT INTO `calendar` VALUES ('f4dd0a1d-2147-47a8-af4a-2c8d0d0cdc11', '2024-04-27', '2024-04-26 10:28:40', '2024-04-26 10:28:40', '4948ba82-f826-11ee-87e1-847beb19aaf6', 'ea293a03-f825-11ee-87e1-847beb19aaf6', '1');
INSERT INTO `calendar` VALUES ('f64c008f-a800-43a3-8eec-c4d00195b5b3', '2024-04-29', '2024-04-27 23:16:39', '2024-04-27 23:16:39', '49451b16-f826-11ee-87e1-847beb19aaf6', 'ea294ae1-f825-11ee-87e1-847beb19aaf6', '1');
INSERT INTO `calendar` VALUES ('f71cd448-ddc9-42d6-a7c6-f4cab281e2d7', '2024-05-01', '2024-04-28 16:56:24', '2024-04-28 16:56:24', '49451b16-f826-11ee-87e1-847beb19aaf6', 'ea294a85-f825-11ee-87e1-847beb19aaf6', '1');
INSERT INTO `calendar` VALUES ('fecaa0f6-8cdc-4fa9-b789-334196aaf91d', '2024-04-23', '2024-04-22 17:17:30', '2024-04-22 17:17:30', '4948b66f-f826-11ee-87e1-847beb19aaf6', 'ea294ae1-f825-11ee-87e1-847beb19aaf6', '1');

-- ----------------------------
-- Table structure for clinic
-- ----------------------------
DROP TABLE IF EXISTS `clinic`;
CREATE TABLE `clinic`  (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `clinic_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT current_timestamp,
  `update_at` timestamp NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  `medical_area_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `support_status_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `medical_area_id`(`medical_area_id` ASC) USING BTREE,
  INDEX `support_status_id`(`support_status_id` ASC) USING BTREE,
  CONSTRAINT `clinic_ibfk_1` FOREIGN KEY (`medical_area_id`) REFERENCES `medical_area` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `clinic_ibfk_2` FOREIGN KEY (`support_status_id`) REFERENCES `support` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of clinic
-- ----------------------------
INSERT INTO `clinic` VALUES ('23826c73-03e6-4b8c-bc87-19534872aaf3', 'Phòng khám đa khoa', '2024-04-27 20:42:07', '2024-04-27 20:42:07', '156f8735-f826-11ee-87e1-847beb19aaf6', 'S1');
INSERT INTO `clinic` VALUES ('287c3600-ee5b-42df-a468-56a5d1c50243', 'Phòng Khám Xương Khớp 3', '2024-04-27 20:58:40', '2024-04-27 20:58:40', '156f8735-f826-11ee-87e1-847beb19aaf6', 'S1');
INSERT INTO `clinic` VALUES ('2c8c7126-efa0-4f74-9073-ad3d137bb3bc', 'Phòng Hồi Sức', '2024-04-27 21:51:44', '2024-04-27 22:36:23', '156fa6de-f826-11ee-87e1-847beb19aaf6', 'S1');
INSERT INTO `clinic` VALUES ('44be4045-ed54-427d-9de6-fa4bd58d9dd8', 'Phòng Tay Chân Miệng', '2024-04-27 21:49:47', '2024-04-27 22:40:42', '156fa6de-f826-11ee-87e1-847beb19aaf6', 'S1');
INSERT INTO `clinic` VALUES ('49451b16-f826-11ee-87e1-847beb19aaf6', 'Phòng Tiếp nhận gói khám bệnh', '2024-04-12 00:09:41', '2024-04-12 00:09:41', '156f8735-f826-11ee-87e1-847beb19aaf6', 'S1');
INSERT INTO `clinic` VALUES ('49471af6-f826-11ee-87e1-847beb19aaf6', 'Phòng Sản phụ khoa', '2024-04-12 00:09:41', '2024-04-12 00:09:41', '156f8735-f826-11ee-87e1-847beb19aaf6', 'S1');
INSERT INTO `clinic` VALUES ('4947c3c1-f826-11ee-87e1-847beb19aaf6', 'Phòng Da liễu - Thẩm mỹ', '2024-04-12 00:09:41', '2024-04-12 00:09:41', '156f8735-f826-11ee-87e1-847beb19aaf6', 'S1');
INSERT INTO `clinic` VALUES ('4948b66f-f826-11ee-87e1-847beb19aaf6', 'Phòng Nhi khoa', '2024-04-12 00:09:41', '2024-04-12 00:09:41', '156f8735-f826-11ee-87e1-847beb19aaf6', 'S1');
INSERT INTO `clinic` VALUES ('4948b851-f826-11ee-87e1-847beb19aaf6', 'Phòng Tiêu hóa - Gan mật', '2024-04-12 00:09:41', '2024-04-12 00:09:41', '156f8735-f826-11ee-87e1-847beb19aaf6', 'S1');
INSERT INTO `clinic` VALUES ('4948b8ca-f826-11ee-87e1-847beb19aaf6', 'Phòng Nội Thần kinh', '2024-04-12 00:09:41', '2024-04-12 00:09:41', '156f8735-f826-11ee-87e1-847beb19aaf6', 'S1');
INSERT INTO `clinic` VALUES ('4948b921-f826-11ee-87e1-847beb19aaf6', 'Phòng Nam khoa', '2024-04-12 00:09:41', '2024-04-12 00:09:41', '156f8735-f826-11ee-87e1-847beb19aaf6', 'S1');
INSERT INTO `clinic` VALUES ('4948b972-f826-11ee-87e1-847beb19aaf6', 'Phòng Tai Mũi Họng', '2024-04-12 00:09:41', '2024-04-12 00:09:41', '156f8735-f826-11ee-87e1-847beb19aaf6', 'S1');
INSERT INTO `clinic` VALUES ('4948b9df-f826-11ee-87e1-847beb19aaf6', 'Phòng Mắt - Khoa Mắt', '2024-04-12 00:09:41', '2024-04-12 00:09:41', '156f8735-f826-11ee-87e1-847beb19aaf6', 'S1');
INSERT INTO `clinic` VALUES ('4948ba32-f826-11ee-87e1-847beb19aaf6', 'Phòng Răng Hàm Mặt', '2024-04-12 00:09:41', '2024-04-12 00:09:41', '156f8735-f826-11ee-87e1-847beb19aaf6', 'S1');
INSERT INTO `clinic` VALUES ('4948ba82-f826-11ee-87e1-847beb19aaf6', 'Phòng Ung Bướu - Tiểu Đường', '2024-04-12 00:09:41', '2024-04-12 00:09:41', '156f8735-f826-11ee-87e1-847beb19aaf6', 'S1');
INSERT INTO `clinic` VALUES ('4948bad6-f826-11ee-87e1-847beb19aaf6', 'Phòng Tim Mạch', '2024-04-12 00:09:41', '2024-04-12 00:09:41', '156f8735-f826-11ee-87e1-847beb19aaf6', 'S1');
INSERT INTO `clinic` VALUES ('4948bb28-f826-11ee-87e1-847beb19aaf6', 'Phòng Hô hấp - Phổi', '2024-04-12 00:09:41', '2024-04-12 00:09:41', '156f8735-f826-11ee-87e1-847beb19aaf6', 'S1');
INSERT INTO `clinic` VALUES ('4948fb8c-f826-11ee-87e1-847beb19aaf6', 'Phòng Tiếp nhận gói khám bệnh', '2024-04-12 00:09:41', '2024-04-12 00:09:41', '156fa6de-f826-11ee-87e1-847beb19aaf6', 'S1');
INSERT INTO `clinic` VALUES ('49490aab-f826-11ee-87e1-847beb19aaf6', 'Phòng Sản phụ khoa', '2024-04-12 00:09:41', '2024-04-12 00:09:41', '156fa6de-f826-11ee-87e1-847beb19aaf6', 'S1');
INSERT INTO `clinic` VALUES ('49490b37-f826-11ee-87e1-847beb19aaf6', 'Phòng Da liễu - Thẩm mỹ', '2024-04-12 00:09:41', '2024-04-12 00:09:41', '156fa6de-f826-11ee-87e1-847beb19aaf6', 'S1');
INSERT INTO `clinic` VALUES ('49490b9f-f826-11ee-87e1-847beb19aaf6', 'Phòng Nhi khoa', '2024-04-12 00:09:41', '2024-04-12 00:09:41', '156fa6de-f826-11ee-87e1-847beb19aaf6', 'S1');
INSERT INTO `clinic` VALUES ('49490bf5-f826-11ee-87e1-847beb19aaf6', 'Phòng Tiêu hóa - Gan mật', '2024-04-12 00:09:41', '2024-04-12 00:09:41', '156fa6de-f826-11ee-87e1-847beb19aaf6', 'S1');
INSERT INTO `clinic` VALUES ('49490c4b-f826-11ee-87e1-847beb19aaf6', 'Phòng Nội Thần kinh', '2024-04-12 00:09:41', '2024-04-12 00:09:41', '156fa6de-f826-11ee-87e1-847beb19aaf6', 'S1');
INSERT INTO `clinic` VALUES ('49490c9f-f826-11ee-87e1-847beb19aaf6', 'Phòng Nam khoa', '2024-04-12 00:09:41', '2024-04-12 00:09:41', '156fa6de-f826-11ee-87e1-847beb19aaf6', 'S1');
INSERT INTO `clinic` VALUES ('49490cf2-f826-11ee-87e1-847beb19aaf6', 'Phòng Tai Mũi Họng', '2024-04-12 00:09:41', '2024-04-12 00:09:41', '156fa6de-f826-11ee-87e1-847beb19aaf6', 'S1');
INSERT INTO `clinic` VALUES ('49490d46-f826-11ee-87e1-847beb19aaf6', 'Phòng Mắt - Khoa Mắt', '2024-04-12 00:09:41', '2024-04-12 00:09:41', '156fa6de-f826-11ee-87e1-847beb19aaf6', 'S1');
INSERT INTO `clinic` VALUES ('49490d97-f826-11ee-87e1-847beb19aaf6', 'Phòng Răng Hàm Mặt', '2024-04-12 00:09:41', '2024-04-12 00:09:41', '156fa6de-f826-11ee-87e1-847beb19aaf6', 'S1');
INSERT INTO `clinic` VALUES ('49490de8-f826-11ee-87e1-847beb19aaf6', 'Phòng Ung Bướu - Tiểu Đường', '2024-04-12 00:09:41', '2024-04-12 00:09:41', '156fa6de-f826-11ee-87e1-847beb19aaf6', 'S1');
INSERT INTO `clinic` VALUES ('49490e3a-f826-11ee-87e1-847beb19aaf6', 'Phòng Tim Mạch', '2024-04-12 00:09:41', '2024-04-12 00:09:41', '156fa6de-f826-11ee-87e1-847beb19aaf6', 'S1');
INSERT INTO `clinic` VALUES ('49490e8d-f826-11ee-87e1-847beb19aaf6', 'Phòng Hô hấp - Phổi', '2024-04-12 00:09:41', '2024-04-12 00:09:41', '156fa6de-f826-11ee-87e1-847beb19aaf6', 'S1');
INSERT INTO `clinic` VALUES ('4bc6961b-6227-4668-99f1-7ecbc383c0f1', 'Phòng Siêu Âm', '2024-04-27 19:47:35', '2024-04-27 23:02:30', '156f8735-f826-11ee-87e1-847beb19aaf6', 'S1');
INSERT INTO `clinic` VALUES ('5f19c06c-d45f-4457-8507-9f0963034b3c', 'Phòng Khám Xương Khớp2', '2024-04-27 21:26:05', '2024-04-27 21:26:05', '156fa6de-f826-11ee-87e1-847beb19aaf6', 'S1');
INSERT INTO `clinic` VALUES ('603114e8-3254-4256-8c17-bdd56ffe9687', 'Phòng Khám Xương Khớp 3', '2024-04-27 21:27:27', '2024-04-27 21:27:27', '156fa6de-f826-11ee-87e1-847beb19aaf6', 'S1');
INSERT INTO `clinic` VALUES ('6394b91f-5276-4093-b364-e2d77ef849ff', 'Phòng Tê Thất', '2024-04-27 20:29:16', '2024-04-27 23:21:11', '156f8735-f826-11ee-87e1-847beb19aaf6', 'S1');
INSERT INTO `clinic` VALUES ('8108e8fb-ba23-4608-b16f-425ec0d51a1d', 'Phòng Khám Xương Khớp', '2024-04-27 20:49:06', '2024-04-27 20:49:06', '156f8735-f826-11ee-87e1-847beb19aaf6', 'S1');
INSERT INTO `clinic` VALUES ('8f83b87a-a49f-427f-9f6b-c6fd14ea3620', 'Phòng Khám Xương Khớp', '2024-04-27 21:03:34', '2024-04-27 21:03:34', '156fa6de-f826-11ee-87e1-847beb19aaf6', 'S1');
INSERT INTO `clinic` VALUES ('a7316f99-055b-4177-9dd1-379fefe56109', 'Phòng Siêu Âm', '2024-04-27 21:45:12', '2024-04-27 22:43:18', '156fa6de-f826-11ee-87e1-847beb19aaf6', 'S1');
INSERT INTO `clinic` VALUES ('b5ed5dec-78e9-4075-aefd-4fbe62f92458', 'Phòng Test', '2024-04-27 23:21:24', '2024-04-27 23:21:24', '156f8735-f826-11ee-87e1-847beb19aaf6', 'S1');
INSERT INTO `clinic` VALUES ('c158e547-5ea1-448d-8fc8-f8286135b1f5', 'Phòng Hồi Sức', '2024-04-27 22:25:47', '2024-04-27 22:35:25', '156f8735-f826-11ee-87e1-847beb19aaf6', 'S1');
INSERT INTO `clinic` VALUES ('e515c8b9-6be5-4070-a949-0abca0729507', 'Phòng Khám Xương Khớp 2', '2024-04-27 20:57:49', '2024-04-27 20:57:49', '156f8735-f826-11ee-87e1-847beb19aaf6', 'S1');
INSERT INTO `clinic` VALUES ('e572d0c1-7f39-4fa1-8b50-96006bb7be7f', 'Phòng khám xương khớp 4', '2024-04-27 21:29:40', '2024-04-27 21:29:40', '156fa6de-f826-11ee-87e1-847beb19aaf6', 'S1');
INSERT INTO `clinic` VALUES ('eacae4b6-d279-4f3d-b215-c90143bd9da6', 'Phòng Khám Xương Khớp 4', '2024-04-27 20:58:48', '2024-04-27 20:58:48', '156f8735-f826-11ee-87e1-847beb19aaf6', 'S1');
INSERT INTO `clinic` VALUES ('f82b345b-6fd9-48ab-bed9-06280af1ed07', 'hihihi', '2024-04-27 21:46:47', '2024-04-27 21:46:47', '156f8735-f826-11ee-87e1-847beb19aaf6', 'S1');

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
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of doctor
-- ----------------------------
INSERT INTO `doctor` VALUES ('TS Khoa học', 'BS chuyên khoa I', 'Da liễu', 'Tôi là bác sĩ với kinh nghiệm làm việc trong lĩnh vực hơn 19 năm.', 'Kinh nghiệm làm việc hơn 11 năm.', '', 'ea294ae1-f825-11ee-87e1-847beb19aaf6');
INSERT INTO `doctor` VALUES ('TS Khoa học', 'Bác sĩ', 'Nội khoa', 'Tôi là bác sĩ với kinh nghiệm làm việc trong lĩnh vực hơn 23 năm.', 'Kinh nghiệm làm việc hơn 25 năm.', '/src/assets/img/doctor.jpg', 'ea293a03-f825-11ee-87e1-847beb19aaf6');
INSERT INTO `doctor` VALUES ('Tiến sĩ', 'Bác sĩ', 'Nội khoa', 'Tôi là bác sĩ với kinh nghiệm làm việc trong lĩnh vực hơn 6 năm.', 'Kinh nghiệm làm việc hơn 11 năm.', '/src/assets/img/doctor.jpg', 'ea294a20-f825-11ee-87e1-847beb19aaf6');
INSERT INTO `doctor` VALUES ('Thạc sĩ', 'PGS', 'Răng hàm mặt', 'Tôi là bác sĩ với kinh nghiệm làm việc trong lĩnh vực hơn 16 năm.', 'Kinh nghiệm làm việc hơn 17 năm.', '/src/assets/img/doctor.jpg', 'ea2964e1-f825-11ee-87e1-847beb19aaf6');
INSERT INTO `doctor` VALUES ('Tiến sĩ', 'PGS', 'Ngoại khoa', 'Tôi là bác sĩ với kinh nghiệm làm việc trong lĩnh vực hơn 14 năm.', 'Kinh nghiệm làm việc hơn 11 năm.', '/src/assets/img/doctor.jpg', 'ea296543-f825-11ee-87e1-847beb19aaf6');
INSERT INTO `doctor` VALUES ('Tiến sĩ', 'BS chuyên khoa I', 'Nội khoa', 'Tôi là bác sĩ với kinh nghiệm làm việc trong lĩnh vực hơn 15 năm.', 'Kinh nghiệm làm việc hơn 15 năm.', '/src/assets/img/doctor.jpg', 'ea294989-f825-11ee-87e1-847beb19aaf6');
INSERT INTO `doctor` VALUES ('Tiến sĩ', 'Phó giáo sư', 'Da liễu', 'Tôi là bác sĩ với kinh nghiệm làm việc trong lĩnh vực hơn 5 năm.', 'Kinh nghiệm làm việc hơn 5 năm.', '/src/assets/img/doctor.jpg', 'ea296595-f825-11ee-87e1-847beb19aaf6');
INSERT INTO `doctor` VALUES ('Tiến sĩ', 'BS chuyên khoa I', 'Răng hàm mặt', 'Tôi là bác sĩ với kinh nghiệm làm việc trong lĩnh vực hơn 15 năm.', 'Kinh nghiệm làm việc hơn 33 năm.', '/src/assets/img/doctor.jpg', 'ea294a85-f825-11ee-87e1-847beb19aaf6');
INSERT INTO `doctor` VALUES ('Thạc sĩ', 'Bác sĩ', 'Ngoại khoa', 'Tôi là bác sĩ với kinh nghiệm làm việc trong lĩnh vực hơn 16 năm.', 'Kinh nghiệm làm việc hơn 29 năm.', '/src/assets/img/doctor.jpg', 'ea29643b-f825-11ee-87e1-847beb19aaf6');
INSERT INTO `doctor` VALUES ('Thạc sĩ', 'BS chuyên khoa I', 'Ngoại khoa', 'Tôi là bác sĩ với kinh nghiệm làm việc trong lĩnh vực hơn 24 năm.', 'Kinh nghiệm làm việc hơn 33 năm.', '/src/assets/img/doctor.jpg', 'ea294b3c-f825-11ee-87e1-847beb19aaf6');

-- ----------------------------
-- Table structure for evaluate
-- ----------------------------
DROP TABLE IF EXISTS `evaluate`;
CREATE TABLE `evaluate`  (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `evaluate_content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `create_at` timestamp NOT NULL DEFAULT current_timestamp,
  `update_at` timestamp NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  `doctor_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `appointment_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `doctor_id`(`doctor_id` ASC) USING BTREE,
  INDEX `appointment_id`(`appointment_id` ASC) USING BTREE,
  CONSTRAINT `evaluate_ibfk_1` FOREIGN KEY (`doctor_id`) REFERENCES `account` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `evaluate_ibfk_2` FOREIGN KEY (`appointment_id`) REFERENCES `appointment` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of evaluate
-- ----------------------------
INSERT INTO `evaluate` VALUES ('4b434245-38d3-4b59-8113-a48fa12c49a8', 'Bác sĩ có tâm, có tầm. ', '2024-05-03 14:28:52', '2024-05-03 14:28:52', 'ea293a03-f825-11ee-87e1-847beb19aaf6', '1508dd8f-9a71-417c-ba4d-fca823a04672');
INSERT INTO `evaluate` VALUES ('ad463f3d-cb8b-4132-8456-48bb422fb265', 'bs tốt', '2024-05-03 14:26:15', '2024-05-03 14:52:59', 'ea293a03-f825-11ee-87e1-847beb19aaf6', '8b586a69-046d-4fcc-b5bb-17a308e4c5dc');

-- ----------------------------
-- Table structure for group_time
-- ----------------------------
DROP TABLE IF EXISTS `group_time`;
CREATE TABLE `group_time`  (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `group_time_description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

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
  `create_at` timestamp NOT NULL DEFAULT current_timestamp,
  `update_at` timestamp NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  `account_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `support_level_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `account_id`(`account_id` ASC) USING BTREE,
  INDEX `support_level_id`(`support_level_id` ASC) USING BTREE,
  CONSTRAINT `log_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `log_ibfk_2` FOREIGN KEY (`support_level_id`) REFERENCES `support` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

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
  `create_at` timestamp NOT NULL DEFAULT current_timestamp,
  `update_at` timestamp NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  `support_status_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `support_status_id`(`support_status_id` ASC) USING BTREE,
  CONSTRAINT `medical_area_ibfk_1` FOREIGN KEY (`support_status_id`) REFERENCES `support` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

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
  `create_at` timestamp NOT NULL DEFAULT current_timestamp,
  `update_at` timestamp NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  `support_status_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `clinic_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `clinic_id`(`clinic_id` ASC) USING BTREE,
  INDEX `support_status_id`(`support_status_id` ASC) USING BTREE,
  CONSTRAINT `medical_package_ibfk_1` FOREIGN KEY (`clinic_id`) REFERENCES `clinic` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `medical_package_ibfk_2` FOREIGN KEY (`support_status_id`) REFERENCES `support` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of medical_package
-- ----------------------------
INSERT INTO `medical_package` VALUES ('44c79a43-5739-4cc2-89d9-5e48e145a0a0', 'Gói khám bệnh thường', '50000', '2024-04-15 20:53:12', '2024-04-20 18:01:57', 'S1', '49451b16-f826-11ee-87e1-847beb19aaf6');
INSERT INTO `medical_package` VALUES ('803a8f87-fb2f-11ee-aabb-847beb19aaf6', 'Gói khám da liễu', '300000', '2024-04-15 20:53:12', '2024-04-15 20:53:12', 'S1', '49451b16-f826-11ee-87e1-847beb19aaf6');
INSERT INTO `medical_package` VALUES ('803a90d6-fb2f-11ee-aabb-847beb19aaf6', 'Gói khám mắt', '400000', '2024-04-15 20:53:12', '2024-04-15 20:53:12', 'S1', '49451b16-f826-11ee-87e1-847beb19aaf6');
INSERT INTO `medical_package` VALUES ('803a9166-fb2f-11ee-aabb-847beb19aaf6', 'Gói khám tai mũi họng', '350000', '2024-04-15 20:53:12', '2024-04-15 20:53:12', 'S1', '49451b16-f826-11ee-87e1-847beb19aaf6');
INSERT INTO `medical_package` VALUES ('803a923d-fb2f-11ee-aabb-847beb19aaf6', 'Gói khám nội tiết', '450000', '2024-04-15 20:53:12', '2024-04-15 20:53:12', 'S1', '49451b16-f826-11ee-87e1-847beb19aaf6');
INSERT INTO `medical_package` VALUES ('803a92c3-fb2f-11ee-aabb-847beb19aaf6', 'Gói khám tim mạch', '600000', '2024-04-15 20:53:12', '2024-04-15 20:53:12', 'S1', '49451b16-f826-11ee-87e1-847beb19aaf6');
INSERT INTO `medical_package` VALUES ('803a9320-fb2f-11ee-aabb-847beb19aaf6', 'Gói khám hô hấp', '380000', '2024-04-15 20:53:12', '2024-04-15 20:53:12', 'S1', '49451b16-f826-11ee-87e1-847beb19aaf6');
INSERT INTO `medical_package` VALUES ('803a94e0-fb2f-11ee-aabb-847beb19aaf6', 'Gói khám nhi khoa', '320000', '2024-04-15 20:53:12', '2024-04-15 20:53:12', 'S1', '4948b66f-f826-11ee-87e1-847beb19aaf6');
INSERT INTO `medical_package` VALUES ('803a9687-fb2f-11ee-aabb-847beb19aaf6', 'Gói khám ung bướu', '550000', '2024-04-15 20:53:12', '2024-04-15 20:53:12', 'S1', '49490de8-f826-11ee-87e1-847beb19aaf6');
INSERT INTO `medical_package` VALUES ('803a96e1-fb2f-11ee-aabb-847beb19aaf6', 'Gói khám sản phụ khoa', '700000', '2024-04-15 20:53:12', '2024-04-15 20:53:12', 'S1', '49471af6-f826-11ee-87e1-847beb19aaf6');
INSERT INTO `medical_package` VALUES ('803a97a6-fb2f-11ee-aabb-847beb19aaf6', 'Gói khám răng hàm mặt', '450000', '2024-04-15 20:53:12', '2024-04-15 20:53:12', 'S1', '49490d97-f826-11ee-87e1-847beb19aaf6');

-- ----------------------------
-- Table structure for medical_package_service
-- ----------------------------
DROP TABLE IF EXISTS `medical_package_service`;
CREATE TABLE `medical_package_service`  (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `service_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `package_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `support_status_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `service_id`(`service_id` ASC) USING BTREE,
  INDEX `package_id`(`package_id` ASC) USING BTREE,
  INDEX `support_status_id`(`support_status_id` ASC) USING BTREE,
  CONSTRAINT `medical_package_service_ibfk_1` FOREIGN KEY (`service_id`) REFERENCES `medical_service` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `medical_package_service_ibfk_2` FOREIGN KEY (`package_id`) REFERENCES `medical_package` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `medical_package_service_ibfk_3` FOREIGN KEY (`support_status_id`) REFERENCES `support` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of medical_package_service
-- ----------------------------
INSERT INTO `medical_package_service` VALUES ('61be7ea5-ff2b-11ee-8650-847beb19aaf6', '803c3536-fb2f-11ee-aabb-847beb19aaf6', '803a8f87-fb2f-11ee-aabb-847beb19aaf6', 'S1');
INSERT INTO `medical_package_service` VALUES ('61c13c43-ff2b-11ee-8650-847beb19aaf6', '803c3d21-fb2f-11ee-aabb-847beb19aaf6', '803a8f87-fb2f-11ee-aabb-847beb19aaf6', 'S1');
INSERT INTO `medical_package_service` VALUES ('61c14b13-ff2b-11ee-8650-847beb19aaf6', '803c3db6-fb2f-11ee-aabb-847beb19aaf6', '803a8f87-fb2f-11ee-aabb-847beb19aaf6', 'S1');
INSERT INTO `medical_package_service` VALUES ('61c14ca4-ff2b-11ee-8650-847beb19aaf6', '803be0ab-fb2f-11ee-aabb-847beb19aaf6', '803a90d6-fb2f-11ee-aabb-847beb19aaf6', 'S1');
INSERT INTO `medical_package_service` VALUES ('61c14d1e-ff2b-11ee-8650-847beb19aaf6', '803c3bc1-fb2f-11ee-aabb-847beb19aaf6', '803a90d6-fb2f-11ee-aabb-847beb19aaf6', 'S1');
INSERT INTO `medical_package_service` VALUES ('61c14d94-ff2b-11ee-8650-847beb19aaf6', '803c3d21-fb2f-11ee-aabb-847beb19aaf6', '803a90d6-fb2f-11ee-aabb-847beb19aaf6', 'S1');
INSERT INTO `medical_package_service` VALUES ('61c14e07-ff2b-11ee-8650-847beb19aaf6', '803be0ab-fb2f-11ee-aabb-847beb19aaf6', '803a8f87-fb2f-11ee-aabb-847beb19aaf6', 'S1');
INSERT INTO `medical_package_service` VALUES ('61c14eff-ff2b-11ee-8650-847beb19aaf6', '803c45c8-fb2f-11ee-aabb-847beb19aaf6', '803a8f87-fb2f-11ee-aabb-847beb19aaf6', 'S1');
INSERT INTO `medical_package_service` VALUES ('61c14fa2-ff2b-11ee-8650-847beb19aaf6', '803c45c8-fb2f-11ee-aabb-847beb19aaf6', '803a9166-fb2f-11ee-aabb-847beb19aaf6', 'S1');
INSERT INTO `medical_package_service` VALUES ('61c15010-ff2b-11ee-8650-847beb19aaf6', '803c4030-fb2f-11ee-aabb-847beb19aaf6', '803a9166-fb2f-11ee-aabb-847beb19aaf6', 'S1');

-- ----------------------------
-- Table structure for medical_service
-- ----------------------------
DROP TABLE IF EXISTS `medical_service`;
CREATE TABLE `medical_service`  (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `service_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `service_price` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT current_timestamp,
  `update_at` timestamp NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  `support_status_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `clinic_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `service_description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `clinic_id`(`clinic_id` ASC) USING BTREE,
  INDEX `support_status_id`(`support_status_id` ASC) USING BTREE,
  CONSTRAINT `medical_service_ibfk_1` FOREIGN KEY (`clinic_id`) REFERENCES `clinic` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `medical_service_ibfk_2` FOREIGN KEY (`support_status_id`) REFERENCES `support` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of medical_service
-- ----------------------------
INSERT INTO `medical_service` VALUES ('803be0ab-fb2f-11ee-aabb-847beb19aaf6', 'Dịch vụ xét nghiệm máu', '500000', '2024-04-15 20:53:12', '2024-04-23 11:17:09', 'S1', '49451b16-f826-11ee-87e1-847beb19aaf6', 'Dịch vụ sẽ lấy mẫu máu và trả kết quả trong vòng 10 phút');
INSERT INTO `medical_service` VALUES ('803c3536-fb2f-11ee-aabb-847beb19aaf6', 'Dịch vụ xét nghiệm nước tiểu', '300000', '2024-04-15 20:53:12', '2024-04-15 20:53:12', 'S1', '49451b16-f826-11ee-87e1-847beb19aaf6', NULL);
INSERT INTO `medical_service` VALUES ('803c3a4b-fb2f-11ee-aabb-847beb19aaf6', 'Dịch vụ xét nghiệm huyết thống', '400000', '2024-04-15 20:53:12', '2024-04-15 20:53:12', 'S1', '49451b16-f826-11ee-87e1-847beb19aaf6', NULL);
INSERT INTO `medical_service` VALUES ('803c3bc1-fb2f-11ee-aabb-847beb19aaf6', 'Dịch vụ khám chuyên khoa', '350000', '2024-04-15 20:53:12', '2024-04-15 20:53:12', 'S1', '49451b16-f826-11ee-87e1-847beb19aaf6', NULL);
INSERT INTO `medical_service` VALUES ('803c3d21-fb2f-11ee-aabb-847beb19aaf6', 'Dịch vụ Xét nghiệm ung thư chuyên sâu', '450000', '2024-04-15 20:53:12', '2024-04-15 20:53:12', 'S1', '49451b16-f826-11ee-87e1-847beb19aaf6', NULL);
INSERT INTO `medical_service` VALUES ('803c3db6-fb2f-11ee-aabb-847beb19aaf6', 'Dịch vụ Xét Nghiệm Chức Năng Gan Chuyên Sâu', '600000', '2024-04-15 20:53:12', '2024-04-15 20:53:12', 'S1', '49451b16-f826-11ee-87e1-847beb19aaf6', NULL);
INSERT INTO `medical_service` VALUES ('803c3fa9-fb2f-11ee-aabb-847beb19aaf6', 'Dịch vụ kiểm tra sức khỏe', '380000', '2024-04-15 20:53:12', '2024-04-15 20:53:12', 'S1', '49451b16-f826-11ee-87e1-847beb19aaf6', NULL);
INSERT INTO `medical_service` VALUES ('803c4030-fb2f-11ee-aabb-847beb19aaf6', 'Dịch vụ xét nghiệm COVID-19', '320000', '2024-04-15 20:53:12', '2024-04-15 20:53:12', 'S1', '49490cf2-f826-11ee-87e1-847beb19aaf6', NULL);
INSERT INTO `medical_service` VALUES ('803c42f7-fb2f-11ee-aabb-847beb19aaf6', 'Dịch vụ xét nghiệm ung bướu', '550000', '2024-04-15 20:53:12', '2024-04-15 20:53:12', 'S1', '49490de8-f826-11ee-87e1-847beb19aaf6', NULL);
INSERT INTO `medical_service` VALUES ('803c45c8-fb2f-11ee-aabb-847beb19aaf6', 'Dịch vụ xét nghiệm dị ứng', '700000', '2024-04-15 20:53:12', '2024-04-15 20:53:12', 'S1', '49490b37-f826-11ee-87e1-847beb19aaf6', NULL);
INSERT INTO `medical_service` VALUES ('803c463d-fb2f-11ee-aabb-847beb19aaf6', 'Dịch vụ xét nghiệm AIDS', '450000', '2024-04-15 20:53:12', '2024-04-15 20:53:12', 'S1', '49490c9f-f826-11ee-87e1-847beb19aaf6', NULL);

-- ----------------------------
-- Table structure for patient
-- ----------------------------
DROP TABLE IF EXISTS `patient`;
CREATE TABLE `patient`  (
  `patient_bhyt` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  INDEX `account_id`(`id` ASC) USING BTREE,
  CONSTRAINT `patient_ibfk_1` FOREIGN KEY (`id`) REFERENCES `account` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of patient
-- ----------------------------
INSERT INTO `patient` VALUES ('BHYT012561', 'ea283c62-f825-11ee-87e1-847beb19aaf6');
INSERT INTO `patient` VALUES ('BHYT029065', 'ea279998-f825-11ee-87e1-847beb19aaf6');
INSERT INTO `patient` VALUES ('BHYT023320', 'ea2964e1-f825-11ee-87e1-847beb19aaf6');
INSERT INTO `patient` VALUES ('BHYT074418', 'ea294a85-f825-11ee-87e1-847beb19aaf6');
INSERT INTO `patient` VALUES ('BHYT047068', 'ea283b99-f825-11ee-87e1-847beb19aaf6');
INSERT INTO `patient` VALUES ('BHYT095214', 'ea294a20-f825-11ee-87e1-847beb19aaf6');
INSERT INTO `patient` VALUES ('BHYT037184', 'ea294989-f825-11ee-87e1-847beb19aaf6');
INSERT INTO `patient` VALUES ('BHYT046071', 'ea283882-f825-11ee-87e1-847beb19aaf6');
INSERT INTO `patient` VALUES ('BHYT070667', 'ea283da0-f825-11ee-87e1-847beb19aaf6');
INSERT INTO `patient` VALUES ('BHYT023477', 'ea293a03-f825-11ee-87e1-847beb19aaf6');

-- ----------------------------
-- Table structure for support
-- ----------------------------
DROP TABLE IF EXISTS `support`;
CREATE TABLE `support`  (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `support_value` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `support_info` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `id_group_time` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `create_at` timestamp NOT NULL DEFAULT current_timestamp,
  `update_at` timestamp NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `id_group_time`(`id_group_time` ASC) USING BTREE,
  CONSTRAINT `support_ibfk_1` FOREIGN KEY (`id_group_time`) REFERENCES `group_time` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of support
-- ----------------------------
INSERT INTO `support` VALUES ('L1', 'Info', 'LEVEL', NULL, '2024-04-11 23:55:59', '2024-04-11 23:55:59');
INSERT INTO `support` VALUES ('L2', 'Warning', 'LEVEL', NULL, '2024-04-11 23:55:59', '2024-04-11 23:55:59');
INSERT INTO `support` VALUES ('L3', 'Danger', 'LEVEL', NULL, '2024-04-11 23:55:59', '2024-04-11 23:55:59');
INSERT INTO `support` VALUES ('P1', '44c79a43-5739-4cc2-89d9-5e48e145a0a0', 'PACKAGE_DEFAULT', NULL, '2024-04-26 09:06:00', '2024-04-26 09:06:00');
INSERT INTO `support` VALUES ('R1', 'Admin', 'ROLE', NULL, '2024-04-11 23:55:59', '2024-04-11 23:55:59');
INSERT INTO `support` VALUES ('R2', 'Bác sĩ', 'ROLE', NULL, '2024-04-11 23:55:59', '2024-04-11 23:55:59');
INSERT INTO `support` VALUES ('R3', 'Quản lý', 'ROLE', NULL, '2024-04-11 23:55:59', '2024-04-11 23:55:59');
INSERT INTO `support` VALUES ('R4', 'Bệnh nhân', 'ROLE', NULL, '2024-04-11 23:55:59', '2024-04-11 23:55:59');
INSERT INTO `support` VALUES ('S1', 'Mở', 'STATUS', NULL, '2024-04-11 23:55:59', '2024-04-11 23:55:59');
INSERT INTO `support` VALUES ('S2', 'Khóa', 'STATUS', NULL, '2024-04-11 23:55:59', '2024-04-11 23:55:59');
INSERT INTO `support` VALUES ('S3', 'Duyệt', 'STATUS', NULL, '2024-04-11 23:55:59', '2024-04-11 23:55:59');
INSERT INTO `support` VALUES ('S4', 'Hủy', 'STATUS', NULL, '2024-04-11 23:55:59', '2024-04-11 23:55:59');
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
