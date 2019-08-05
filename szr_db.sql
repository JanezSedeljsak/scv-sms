-- --------------------------------------------------------
-- Strežnik:                     127.0.0.1
-- Verzija strežnika:            10.3.10-MariaDB - mariadb.org binary distribution
-- Operacijski sistem strežnika: Win64
-- HeidiSQL Različica:           10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for szr_db
DROP DATABASE IF EXISTS `szr_db`;
CREATE DATABASE IF NOT EXISTS `szr_db` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `szr_db`;

-- Dumping structure for tabela szr_db.achivments
DROP TABLE IF EXISTS `achivments`;
CREATE TABLE IF NOT EXISTS `achivments` (
  `id` varchar(36) COLLATE utf8_slovenian_ci NOT NULL DEFAULT uuid(),
  `level_id` varchar(36) COLLATE utf8_slovenian_ci DEFAULT NULL,
  `type_id` varchar(36) COLLATE utf8_slovenian_ci DEFAULT NULL,
  `name` varchar(50) COLLATE utf8_slovenian_ci DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `place` int(11) DEFAULT NULL,
  `description` mediumtext COLLATE utf8_slovenian_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `tip_dosezka` (`type_id`),
  KEY `nivo_id` (`level_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_slovenian_ci;

-- Dumping data for table szr_db.achivments: 1 rows
DELETE FROM `achivments`;
/*!40000 ALTER TABLE `achivments` DISABLE KEYS */;
INSERT INTO `achivments` (`id`, `level_id`, `type_id`, `name`, `date`, `place`, `description`) VALUES
	('edc1a631-b1e4-11e9-9658-f04da2b5f496', '8aef4c5b-b1da-11e9-9658-f04da2b5f496', '16712be8-b1da-11e9-9658-f04da2b5f496', 'Rekordni tek na 600m', '2018-02-06 07:19:25', 1, 'Dijak je podrl rekord na 600m');
/*!40000 ALTER TABLE `achivments` ENABLE KEYS */;

-- Dumping structure for tabela szr_db.achivments_students
DROP TABLE IF EXISTS `achivments_students`;
CREATE TABLE IF NOT EXISTS `achivments_students` (
  `id` varchar(36) COLLATE utf8_slovenian_ci NOT NULL DEFAULT uuid(),
  `student_id` varchar(36) COLLATE utf8_slovenian_ci DEFAULT NULL,
  `achivment_id` varchar(36) COLLATE utf8_slovenian_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `dosezek_id` (`achivment_id`),
  KEY `ucenec_leto_razred_id` (`student_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_slovenian_ci;

-- Dumping data for table szr_db.achivments_students: 1 rows
DELETE FROM `achivments_students`;
/*!40000 ALTER TABLE `achivments_students` DISABLE KEYS */;
INSERT INTO `achivments_students` (`id`, `student_id`, `achivment_id`) VALUES
	('374eb18e-b1e5-11e9-9658-f04da2b5f496', '241a43cb-b1d9-11e9-9658-f04da2b5f496', 'edc1a631-b1e4-11e9-9658-f04da2b5f496');
/*!40000 ALTER TABLE `achivments_students` ENABLE KEYS */;

-- Dumping structure for tabela szr_db.classes
DROP TABLE IF EXISTS `classes`;
CREATE TABLE IF NOT EXISTS `classes` (
  `id` varchar(36) COLLATE utf8_slovenian_ci NOT NULL DEFAULT uuid(),
  `scv_id` bigint(20) DEFAULT 0,
  `school_id` varchar(36) COLLATE utf8_slovenian_ci DEFAULT NULL,
  `name` varchar(50) COLLATE utf8_slovenian_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `school_id` (`school_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_slovenian_ci;

-- Dumping data for table szr_db.classes: 95 rows
DELETE FROM `classes`;
/*!40000 ALTER TABLE `classes` DISABLE KEYS */;
INSERT INTO `classes` (`id`, `scv_id`, `school_id`, `name`) VALUES
	('5ca4f7f5-b1c8-11e9-9658-f04da2b5f496', 62, '36ee6f6e-b1c7-11e9-9658-f04da2b5f496', '1.EL'),
	('5ca50116-b1c8-11e9-9658-f04da2b5f496', 63, '36ee6f6e-b1c7-11e9-9658-f04da2b5f496', '1.ET'),
	('5ca501f8-b1c8-11e9-9658-f04da2b5f496', 64, '36ee6f6e-b1c7-11e9-9658-f04da2b5f496', '1.PTI'),
	('5ca50271-b1c8-11e9-9658-f04da2b5f496', 65, '36ee6f6e-b1c7-11e9-9658-f04da2b5f496', '1.TM'),
	('5ca502ff-b1c8-11e9-9658-f04da2b5f496', 66, '36ee6f6e-b1c7-11e9-9658-f04da2b5f496', '1.TRA'),
	('5ca50388-b1c8-11e9-9658-f04da2b5f496', 67, '36ee6f6e-b1c7-11e9-9658-f04da2b5f496', '1.TRB'),
	('5ca503f1-b1c8-11e9-9658-f04da2b5f496', 68, '36ee6f6e-b1c7-11e9-9658-f04da2b5f496', '2.EL'),
	('5ca50467-b1c8-11e9-9658-f04da2b5f496', 69, '36ee6f6e-b1c7-11e9-9658-f04da2b5f496', '2.ET'),
	('5ca504e8-b1c8-11e9-9658-f04da2b5f496', 70, '36ee6f6e-b1c7-11e9-9658-f04da2b5f496', '2.PTI'),
	('5ca50575-b1c8-11e9-9658-f04da2b5f496', 71, '36ee6f6e-b1c7-11e9-9658-f04da2b5f496', '2.TM'),
	('5ca50613-b1c8-11e9-9658-f04da2b5f496', 72, '36ee6f6e-b1c7-11e9-9658-f04da2b5f496', '2.TRA'),
	('5ca506bd-b1c8-11e9-9658-f04da2b5f496', 73, '36ee6f6e-b1c7-11e9-9658-f04da2b5f496', '2.TRB'),
	('5ca50777-b1c8-11e9-9658-f04da2b5f496', 74, '36ee6f6e-b1c7-11e9-9658-f04da2b5f496', '3.EL'),
	('5ca5083d-b1c8-11e9-9658-f04da2b5f496', 75, '36ee6f6e-b1c7-11e9-9658-f04da2b5f496', '3.ET'),
	('5ca50913-b1c8-11e9-9658-f04da2b5f496', 76, '36ee6f6e-b1c7-11e9-9658-f04da2b5f496', '3.TM'),
	('5ca509f5-b1c8-11e9-9658-f04da2b5f496', 77, '36ee6f6e-b1c7-11e9-9658-f04da2b5f496', '3.TRA'),
	('5ca50ae8-b1c8-11e9-9658-f04da2b5f496', 78, '36ee6f6e-b1c7-11e9-9658-f04da2b5f496', '3.TRB'),
	('5ca50be7-b1c8-11e9-9658-f04da2b5f496', 79, '36ee6f6e-b1c7-11e9-9658-f04da2b5f496', '4.ET'),
	('5ca50cf5-b1c8-11e9-9658-f04da2b5f496', 80, '36ee6f6e-b1c7-11e9-9658-f04da2b5f496', '4.TM'),
	('5ca50e14-b1c8-11e9-9658-f04da2b5f496', 81, '36ee6f6e-b1c7-11e9-9658-f04da2b5f496', '4.TRA'),
	('5ca50f40-b1c8-11e9-9658-f04da2b5f496', 82, '36ee6f6e-b1c7-11e9-9658-f04da2b5f496', '4.TRB'),
	('5ca5107b-b1c8-11e9-9658-f04da2b5f496', 83, '36ee7671-b1c7-11e9-9658-f04da2b5f496', '1. AS'),
	('5ca51108-b1c8-11e9-9658-f04da2b5f496', 84, '36ee7671-b1c7-11e9-9658-f04da2b5f496', '1. ASPT'),
	('5ca511aa-b1c8-11e9-9658-f04da2b5f496', 49, '36ee7671-b1c7-11e9-9658-f04da2b5f496', '1. GR'),
	('5ca5125c-b1c8-11e9-9658-f04da2b5f496', 50, '36ee7671-b1c7-11e9-9658-f04da2b5f496', '1. GT'),
	('5ca51316-b1c8-11e9-9658-f04da2b5f496', 85, '36ee7671-b1c7-11e9-9658-f04da2b5f496', '1. ISI'),
	('5ca513e4-b1c8-11e9-9658-f04da2b5f496', 86, '36ee7671-b1c7-11e9-9658-f04da2b5f496', '1. MHT'),
	('5ca514eb-b1c8-11e9-9658-f04da2b5f496', 87, '36ee7671-b1c7-11e9-9658-f04da2b5f496', '1. OKO'),
	('5ca51584-b1c8-11e9-9658-f04da2b5f496', 51, '36ee7671-b1c7-11e9-9658-f04da2b5f496', '1. OVT'),
	('5ca51622-b1c8-11e9-9658-f04da2b5f496', 88, '36ee7671-b1c7-11e9-9658-f04da2b5f496', '1. PT'),
	('5ca516d0-b1c8-11e9-9658-f04da2b5f496', 89, '36ee7671-b1c7-11e9-9658-f04da2b5f496', '1. PTP'),
	('5ca5178a-b1c8-11e9-9658-f04da2b5f496', 90, '36ee7671-b1c7-11e9-9658-f04da2b5f496', '1. S'),
	('5ca51850-b1c8-11e9-9658-f04da2b5f496', 109, '36ee7671-b1c7-11e9-9658-f04da2b5f496', '1. STM'),
	('5ca51926-b1c8-11e9-9658-f04da2b5f496', 91, '36ee7671-b1c7-11e9-9658-f04da2b5f496', '2. AS'),
	('5ca51a86-b1c8-11e9-9658-f04da2b5f496', 92, '36ee7671-b1c7-11e9-9658-f04da2b5f496', '2. ASPT'),
	('5ca51c52-b1c8-11e9-9658-f04da2b5f496', 53, '36ee7671-b1c7-11e9-9658-f04da2b5f496', '2. GR'),
	('5ca51e44-b1c8-11e9-9658-f04da2b5f496', 54, '36ee7671-b1c7-11e9-9658-f04da2b5f496', '2. GT'),
	('5ca51f67-b1c8-11e9-9658-f04da2b5f496', 93, '36ee7671-b1c7-11e9-9658-f04da2b5f496', '2. ISI'),
	('5ca520da-b1c8-11e9-9658-f04da2b5f496', 94, '36ee7671-b1c7-11e9-9658-f04da2b5f496', '2. MHT'),
	('5ca5231c-b1c8-11e9-9658-f04da2b5f496', 95, '36ee7671-b1c7-11e9-9658-f04da2b5f496', '2. OKO'),
	('5ca52464-b1c8-11e9-9658-f04da2b5f496', 55, '36ee7671-b1c7-11e9-9658-f04da2b5f496', '2. OVT'),
	('5ca525a7-b1c8-11e9-9658-f04da2b5f496', 96, '36ee7671-b1c7-11e9-9658-f04da2b5f496', '2. PT'),
	('5ca526f7-b1c8-11e9-9658-f04da2b5f496', 97, '36ee7671-b1c7-11e9-9658-f04da2b5f496', '2. PTP'),
	('5ca52856-b1c8-11e9-9658-f04da2b5f496', 98, '36ee7671-b1c7-11e9-9658-f04da2b5f496', '2. S'),
	('5ca529c6-b1c8-11e9-9658-f04da2b5f496', 56, '36ee7671-b1c7-11e9-9658-f04da2b5f496', '2.GTD'),
	('5ca52b3e-b1c8-11e9-9658-f04da2b5f496', 99, '36ee7671-b1c7-11e9-9658-f04da2b5f496', '3. AS'),
	('5ca52cca-b1c8-11e9-9658-f04da2b5f496', 57, '36ee7671-b1c7-11e9-9658-f04da2b5f496', '3. GR'),
	('5ca52e5e-b1c8-11e9-9658-f04da2b5f496', 58, '36ee7671-b1c7-11e9-9658-f04da2b5f496', '3. GT'),
	('5ca53007-b1c8-11e9-9658-f04da2b5f496', 100, '36ee7671-b1c7-11e9-9658-f04da2b5f496', '3. ISI'),
	('5ca531b3-b1c8-11e9-9658-f04da2b5f496', 101, '36ee7671-b1c7-11e9-9658-f04da2b5f496', '3. MHT'),
	('5ca53374-b1c8-11e9-9658-f04da2b5f496', 102, '36ee7671-b1c7-11e9-9658-f04da2b5f496', '3. OKO'),
	('5ca53541-b1c8-11e9-9658-f04da2b5f496', 59, '36ee7671-b1c7-11e9-9658-f04da2b5f496', '3. OVT'),
	('5ca5371a-b1c8-11e9-9658-f04da2b5f496', 103, '36ee7671-b1c7-11e9-9658-f04da2b5f496', '3. S'),
	('5ca53927-b1c8-11e9-9658-f04da2b5f496', 60, '36ee7671-b1c7-11e9-9658-f04da2b5f496', '4. GT'),
	('5ca53abf-b1c8-11e9-9658-f04da2b5f496', 61, '36ee7671-b1c7-11e9-9658-f04da2b5f496', '4. OVT'),
	('5ca53c68-b1c8-11e9-9658-f04da2b5f496', 104, '36ee7671-b1c7-11e9-9658-f04da2b5f496', '4. S'),
	('5ca53e25-b1c8-11e9-9658-f04da2b5f496', 8, '36ee7774-b1c7-11e9-9658-f04da2b5f496', '1.EKT'),
	('5ca53ed2-b1c8-11e9-9658-f04da2b5f496', 9, '36ee7774-b1c7-11e9-9658-f04da2b5f496', '1.GA'),
	('5ca53f98-b1c8-11e9-9658-f04da2b5f496', 10, '36ee7774-b1c7-11e9-9658-f04da2b5f496', '1.GH'),
	('5ca5406b-b1c8-11e9-9658-f04da2b5f496', 11, '36ee7774-b1c7-11e9-9658-f04da2b5f496', '1.GT'),
	('5ca54145-b1c8-11e9-9658-f04da2b5f496', 12, '36ee7774-b1c7-11e9-9658-f04da2b5f496', '1.P'),
	('5ca5422b-b1c8-11e9-9658-f04da2b5f496', 110, '36ee7774-b1c7-11e9-9658-f04da2b5f496', '1.PBA'),
	('5ca5435e-b1c8-11e9-9658-f04da2b5f496', 111, '36ee7774-b1c7-11e9-9658-f04da2b5f496', '1.PBB'),
	('5ca5446d-b1c8-11e9-9658-f04da2b5f496', 14, '36ee7774-b1c7-11e9-9658-f04da2b5f496', '2.EKT'),
	('5ca54580-b1c8-11e9-9658-f04da2b5f496', 15, '36ee7774-b1c7-11e9-9658-f04da2b5f496', '2.GA'),
	('5ca5469f-b1c8-11e9-9658-f04da2b5f496', 16, '36ee7774-b1c7-11e9-9658-f04da2b5f496', '2.GH'),
	('5ca547ce-b1c8-11e9-9658-f04da2b5f496', 17, '36ee7774-b1c7-11e9-9658-f04da2b5f496', '2.GT'),
	('5ca5490a-b1c8-11e9-9658-f04da2b5f496', 18, '36ee7774-b1c7-11e9-9658-f04da2b5f496', '2.P'),
	('5ca54a59-b1c8-11e9-9658-f04da2b5f496', 19, '36ee7774-b1c7-11e9-9658-f04da2b5f496', '2.PBO'),
	('5ca54bb5-b1c8-11e9-9658-f04da2b5f496', 20, '36ee7774-b1c7-11e9-9658-f04da2b5f496', '3.EKT'),
	('5ca54d18-b1c8-11e9-9658-f04da2b5f496', 21, '36ee7774-b1c7-11e9-9658-f04da2b5f496', '3.GH'),
	('5ca54e8c-b1c8-11e9-9658-f04da2b5f496', 22, '36ee7774-b1c7-11e9-9658-f04da2b5f496', '3.GT'),
	('5ca5500c-b1c8-11e9-9658-f04da2b5f496', 24, '36ee7774-b1c7-11e9-9658-f04da2b5f496', '3.P'),
	('5ca55198-b1c8-11e9-9658-f04da2b5f496', 25, '36ee7774-b1c7-11e9-9658-f04da2b5f496', '4.EKT'),
	('5ca55331-b1c8-11e9-9658-f04da2b5f496', 26, '36ee7774-b1c7-11e9-9658-f04da2b5f496', '4.GT'),
	('5ca554d5-b1c8-11e9-9658-f04da2b5f496', 28, '36ee7821-b1c7-11e9-9658-f04da2b5f496', '1.A'),
	('5ca555f0-b1c8-11e9-9658-f04da2b5f496', 29, '36ee7821-b1c7-11e9-9658-f04da2b5f496', '1.B'),
	('5ca5571f-b1c8-11e9-9658-f04da2b5f496', 31, '36ee7821-b1c7-11e9-9658-f04da2b5f496', '1.U'),
	('5ca55856-b1c8-11e9-9658-f04da2b5f496', 32, '36ee7821-b1c7-11e9-9658-f04da2b5f496', '1.U-I'),
	('5ca55a2f-b1c8-11e9-9658-f04da2b5f496', 30, '36ee7821-b1c7-11e9-9658-f04da2b5f496', '1.Š'),
	('5ca55b32-b1c8-11e9-9658-f04da2b5f496', 33, '36ee7821-b1c7-11e9-9658-f04da2b5f496', '2.A'),
	('5ca55c3d-b1c8-11e9-9658-f04da2b5f496', 34, '36ee7821-b1c7-11e9-9658-f04da2b5f496', '2.B'),
	('5ca55d54-b1c8-11e9-9658-f04da2b5f496', 36, '36ee7821-b1c7-11e9-9658-f04da2b5f496', '2.U'),
	('5ca55e77-b1c8-11e9-9658-f04da2b5f496', 37, '36ee7821-b1c7-11e9-9658-f04da2b5f496', '2.U-I'),
	('5ca55fae-b1c8-11e9-9658-f04da2b5f496', 35, '36ee7821-b1c7-11e9-9658-f04da2b5f496', '2.Š'),
	('5ca560ed-b1c8-11e9-9658-f04da2b5f496', 38, '36ee7821-b1c7-11e9-9658-f04da2b5f496', '3.A'),
	('5ca56239-b1c8-11e9-9658-f04da2b5f496', 39, '36ee7821-b1c7-11e9-9658-f04da2b5f496', '3.B'),
	('5ca56390-b1c8-11e9-9658-f04da2b5f496', 42, '36ee7821-b1c7-11e9-9658-f04da2b5f496', '3.U'),
	('5ca564fc-b1c8-11e9-9658-f04da2b5f496', 43, '36ee7821-b1c7-11e9-9658-f04da2b5f496', '3.U-I'),
	('5ca56670-b1c8-11e9-9658-f04da2b5f496', 41, '36ee7821-b1c7-11e9-9658-f04da2b5f496', '3.Š'),
	('5ca567f8-b1c8-11e9-9658-f04da2b5f496', 44, '36ee7821-b1c7-11e9-9658-f04da2b5f496', '4.A'),
	('5ca569cd-b1c8-11e9-9658-f04da2b5f496', 45, '36ee7821-b1c7-11e9-9658-f04da2b5f496', '4.B'),
	('5ca56cc1-b1c8-11e9-9658-f04da2b5f496', 47, '36ee7821-b1c7-11e9-9658-f04da2b5f496', '4.U'),
	('5ca56e85-b1c8-11e9-9658-f04da2b5f496', 48, '36ee7821-b1c7-11e9-9658-f04da2b5f496', '4.U-I'),
	('5ca57046-b1c8-11e9-9658-f04da2b5f496', 46, '36ee7821-b1c7-11e9-9658-f04da2b5f496', '4.Š');
/*!40000 ALTER TABLE `classes` ENABLE KEYS */;

-- Dumping structure for tabela szr_db.classes_competitions
DROP TABLE IF EXISTS `classes_competitions`;
CREATE TABLE IF NOT EXISTS `classes_competitions` (
  `id` varchar(36) NOT NULL DEFAULT uuid(),
  `competition_id` varchar(36) DEFAULT NULL,
  `class_id` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `razvrscanje_id` (`competition_id`),
  KEY `razred_id` (`class_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- Dumping data for table szr_db.classes_competitions: 2 rows
DELETE FROM `classes_competitions`;
/*!40000 ALTER TABLE `classes_competitions` DISABLE KEYS */;
INSERT INTO `classes_competitions` (`id`, `competition_id`, `class_id`) VALUES
	('80585af0-b28c-11e9-9658-f04da2b5f496', '138e3551-b288-11e9-9658-f04da2b5f496', '5ca506bd-b1c8-11e9-9658-f04da2b5f496'),
	('80588272-b28c-11e9-9658-f04da2b5f496', '138e3551-b288-11e9-9658-f04da2b5f496', '5ca50613-b1c8-11e9-9658-f04da2b5f496');
/*!40000 ALTER TABLE `classes_competitions` ENABLE KEYS */;

-- Dumping structure for tabela szr_db.classes_subjects
DROP TABLE IF EXISTS `classes_subjects`;
CREATE TABLE IF NOT EXISTS `classes_subjects` (
  `id` varchar(36) NOT NULL DEFAULT uuid(),
  `class_id` varchar(36) DEFAULT NULL,
  `subject_id` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `class_id` (`class_id`),
  KEY `subject_id` (`subject_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table szr_db.classes_subjects: ~6 rows (približno)
DELETE FROM `classes_subjects`;
/*!40000 ALTER TABLE `classes_subjects` DISABLE KEYS */;
INSERT INTO `classes_subjects` (`id`, `class_id`, `subject_id`) VALUES
	('b0b2f7f2-b1ec-11e9-9658-f04da2b5f496', '5ca509f5-b1c8-11e9-9658-f04da2b5f496', '226d1b15-b1e7-11e9-9658-f04da2b5f496'),
	('b0b30a5f-b1ec-11e9-9658-f04da2b5f496', '5ca509f5-b1c8-11e9-9658-f04da2b5f496', '226d7d73-b1e7-11e9-9658-f04da2b5f496'),
	('b0b30bbe-b1ec-11e9-9658-f04da2b5f496', '5ca509f5-b1c8-11e9-9658-f04da2b5f496', '226d7fd5-b1e7-11e9-9658-f04da2b5f496'),
	('b0b30cee-b1ec-11e9-9658-f04da2b5f496', '5ca509f5-b1c8-11e9-9658-f04da2b5f496', '226d8135-b1e7-11e9-9658-f04da2b5f496'),
	('b0b30e19-b1ec-11e9-9658-f04da2b5f496', '5ca509f5-b1c8-11e9-9658-f04da2b5f496', '226d8274-b1e7-11e9-9658-f04da2b5f496'),
	('b0b30f0b-b1ec-11e9-9658-f04da2b5f496', '5ca509f5-b1c8-11e9-9658-f04da2b5f496', '226d83b4-b1e7-11e9-9658-f04da2b5f496');
/*!40000 ALTER TABLE `classes_subjects` ENABLE KEYS */;

-- Dumping structure for tabela szr_db.competitions
DROP TABLE IF EXISTS `competitions`;
CREATE TABLE IF NOT EXISTS `competitions` (
  `id` varchar(36) COLLATE utf8_slovenian_ci NOT NULL DEFAULT uuid(),
  `teacher_id` varchar(36) COLLATE utf8_slovenian_ci DEFAULT NULL,
  `name` varchar(40) COLLATE utf8_slovenian_ci DEFAULT NULL,
  `date_created` datetime DEFAULT NULL,
  `places` int(11) DEFAULT NULL,
  `deadline` datetime DEFAULT NULL,
  `description` mediumtext COLLATE utf8_slovenian_ci DEFAULT NULL,
  `year_id` varchar(36) COLLATE utf8_slovenian_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `mentor_id` (`teacher_id`),
  KEY `year_id` (`year_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_slovenian_ci;

-- Dumping data for table szr_db.competitions: 2 rows
DELETE FROM `competitions`;
/*!40000 ALTER TABLE `competitions` DISABLE KEYS */;
INSERT INTO `competitions` (`id`, `teacher_id`, `name`, `date_created`, `places`, `deadline`, `description`, `year_id`) VALUES
	('138e3551-b288-11e9-9658-f04da2b5f496', 'e545e052-b433-11e9-9519-f04da2b5f496', 'Malta2k19', '2019-02-06 07:19:25', 12, '2019-07-06 07:19:25', NULL, 'da8bcd31-b1e1-11e9-9658-f04da2b5f496'),
	('201e26a7-b288-11e9-9658-f04da2b5f496', 'e545e052-b433-11e9-9519-f04da2b5f496', 'Malta2k20', '2020-02-06 07:19:25', 9, '2020-07-06 07:19:25', NULL, 'da8bcd31-b1e1-11e9-9658-f04da2b5f496');
/*!40000 ALTER TABLE `competitions` ENABLE KEYS */;

-- Dumping structure for tabela szr_db.competitions_students
DROP TABLE IF EXISTS `competitions_students`;
CREATE TABLE IF NOT EXISTS `competitions_students` (
  `id` varchar(36) COLLATE utf8_slovenian_ci NOT NULL DEFAULT uuid(),
  `gstudent_id` varchar(36) COLLATE utf8_slovenian_ci DEFAULT NULL,
  `competition_id` varchar(36) COLLATE utf8_slovenian_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `ucenec_id` (`gstudent_id`),
  KEY `razvrscanja_id` (`competition_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_slovenian_ci;

-- Dumping data for table szr_db.competitions_students: 1 rows
DELETE FROM `competitions_students`;
/*!40000 ALTER TABLE `competitions_students` DISABLE KEYS */;
INSERT INTO `competitions_students` (`id`, `gstudent_id`, `competition_id`) VALUES
	('3d560f82-b28d-11e9-9658-f04da2b5f496', '2247a287-b1e2-11e9-9658-f04da2b5f496', '138e3551-b288-11e9-9658-f04da2b5f496');
/*!40000 ALTER TABLE `competitions_students` ENABLE KEYS */;

-- Dumping structure for tabela szr_db.competitions_subjects
DROP TABLE IF EXISTS `competitions_subjects`;
CREATE TABLE IF NOT EXISTS `competitions_subjects` (
  `id` varchar(36) NOT NULL DEFAULT uuid(),
  `competition_id` varchar(36) DEFAULT NULL,
  `subject_id` varchar(36) DEFAULT NULL,
  `value` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `razvrscanje_id` (`competition_id`),
  KEY `predmet_id` (`subject_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- Dumping data for table szr_db.competitions_subjects: 3 rows
DELETE FROM `competitions_subjects`;
/*!40000 ALTER TABLE `competitions_subjects` DISABLE KEYS */;
INSERT INTO `competitions_subjects` (`id`, `competition_id`, `subject_id`, `value`) VALUES
	('b8a12c08-b28a-11e9-9658-f04da2b5f496', '138e3551-b288-11e9-9658-f04da2b5f496', '226d7fd5-b1e7-11e9-9658-f04da2b5f496', 1),
	('b8a18b8b-b28a-11e9-9658-f04da2b5f496', '138e3551-b288-11e9-9658-f04da2b5f496', '226d84eb-b1e7-11e9-9658-f04da2b5f496', 1.3),
	('b8a18e1e-b28a-11e9-9658-f04da2b5f496', '138e3551-b288-11e9-9658-f04da2b5f496', '226d1b15-b1e7-11e9-9658-f04da2b5f496', 0.7);
/*!40000 ALTER TABLE `competitions_subjects` ENABLE KEYS */;

-- Dumping structure for tabela szr_db.competitions_types
DROP TABLE IF EXISTS `competitions_types`;
CREATE TABLE IF NOT EXISTS `competitions_types` (
  `id` varchar(36) COLLATE utf8_slovenian_ci NOT NULL DEFAULT uuid(),
  `competition_id` varchar(36) COLLATE utf8_slovenian_ci DEFAULT NULL,
  `type_id` varchar(36) COLLATE utf8_slovenian_ci DEFAULT NULL,
  `value` float unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`),
  KEY `competition_id` (`competition_id`),
  KEY `type_id` (`type_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_slovenian_ci;

-- Dumping data for table szr_db.competitions_types: 2 rows
DELETE FROM `competitions_types`;
/*!40000 ALTER TABLE `competitions_types` DISABLE KEYS */;
INSERT INTO `competitions_types` (`id`, `competition_id`, `type_id`, `value`) VALUES
	('b442bdfb-b289-11e9-9658-f04da2b5f496', '138e3551-b288-11e9-9658-f04da2b5f496', '1670c789-b1da-11e9-9658-f04da2b5f496', 1),
	('b443613e-b289-11e9-9658-f04da2b5f496', '138e3551-b288-11e9-9658-f04da2b5f496', '16712be8-b1da-11e9-9658-f04da2b5f496', 0.2);
/*!40000 ALTER TABLE `competitions_types` ENABLE KEYS */;

-- Dumping structure for tabela szr_db.grades
DROP TABLE IF EXISTS `grades`;
CREATE TABLE IF NOT EXISTS `grades` (
  `id` varchar(36) COLLATE utf8_slovenian_ci NOT NULL DEFAULT uuid(),
  `grade` int(11) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `subject_id` varchar(36) COLLATE utf8_slovenian_ci DEFAULT NULL,
  `gstudent_id` varchar(36) COLLATE utf8_slovenian_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `predmet_id` (`subject_id`),
  KEY `ucenec_leto_razred_id` (`gstudent_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_slovenian_ci;

-- Dumping data for table szr_db.grades: 0 rows
DELETE FROM `grades`;
/*!40000 ALTER TABLE `grades` DISABLE KEYS */;
/*!40000 ALTER TABLE `grades` ENABLE KEYS */;

-- Dumping structure for tabela szr_db.gstudents
DROP TABLE IF EXISTS `gstudents`;
CREATE TABLE IF NOT EXISTS `gstudents` (
  `id` varchar(36) COLLATE utf8_slovenian_ci NOT NULL DEFAULT uuid(),
  `student_id` varchar(36) COLLATE utf8_slovenian_ci DEFAULT NULL,
  `year_id` varchar(36) COLLATE utf8_slovenian_ci DEFAULT '0',
  `class_id` varchar(36) COLLATE utf8_slovenian_ci DEFAULT NULL,
  `confirmed_grades` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `ucenec_id` (`student_id`),
  KEY `razred_id` (`class_id`),
  KEY `leto_id` (`year_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_slovenian_ci;

-- Dumping data for table szr_db.gstudents: 2 rows
DELETE FROM `gstudents`;
/*!40000 ALTER TABLE `gstudents` DISABLE KEYS */;
INSERT INTO `gstudents` (`id`, `student_id`, `year_id`, `class_id`, `confirmed_grades`) VALUES
	('2247a287-b1e2-11e9-9658-f04da2b5f496', '241a43cb-b1d9-11e9-9658-f04da2b5f496', 'da8bcb64-b1e1-11e9-9658-f04da2b5f496', '5ca509f5-b1c8-11e9-9658-f04da2b5f496', 1),
	('2247a287-b1e2-11e9-9658-f04dv2b5f496', '241a0ee6-b1d9-11e9-9658-f04da2b5f496', 'da8bcb64-b1e1-11e9-9658-f04da2b5f496', '5ca509f5-b1c8-11e9-9658-f04da2b5f496', 0);
/*!40000 ALTER TABLE `gstudents` ENABLE KEYS */;

-- Dumping structure for tabela szr_db.levels
DROP TABLE IF EXISTS `levels`;
CREATE TABLE IF NOT EXISTS `levels` (
  `id` varchar(36) COLLATE utf8_slovenian_ci NOT NULL DEFAULT uuid(),
  `name` varchar(50) COLLATE utf8_slovenian_ci DEFAULT NULL,
  `value` float DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_slovenian_ci;

-- Dumping data for table szr_db.levels: 3 rows
DELETE FROM `levels`;
/*!40000 ALTER TABLE `levels` DISABLE KEYS */;
INSERT INTO `levels` (`id`, `name`, `value`) VALUES
	('8aef4c5b-b1da-11e9-9658-f04da2b5f496', 'Šolski nivo', 0.5),
	('8aef5427-b1da-11e9-9658-f04da2b5f496', 'Področni nivo', 1),
	('8aef5621-b1da-11e9-9658-f04da2b5f496', 'Državni nivo', 1.5);
/*!40000 ALTER TABLE `levels` ENABLE KEYS */;

-- Dumping structure for tabela szr_db.messages
DROP TABLE IF EXISTS `messages`;
CREATE TABLE IF NOT EXISTS `messages` (
  `id` varchar(36) CHARACTER SET utf8 COLLATE utf8_slovenian_ci NOT NULL DEFAULT uuid(),
  `student_id` varchar(36) CHARACTER SET utf8 COLLATE utf8_slovenian_ci DEFAULT NULL,
  `teacher_id` varchar(36) CHARACTER SET utf8 COLLATE utf8_slovenian_ci DEFAULT NULL,
  `school_id` varchar(36) DEFAULT NULL,
  `state_id` varchar(36) CHARACTER SET utf8 COLLATE utf8_slovenian_ci DEFAULT NULL,
  `header` varchar(50) CHARACTER SET utf8 COLLATE utf8_slovenian_ci DEFAULT NULL,
  `content` text CHARACTER SET utf8 COLLATE utf8_slovenian_ci DEFAULT NULL,
  `date_sent` datetime DEFAULT NULL,
  `date_edit` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `student_id` (`student_id`),
  KEY `teacher_id` (`teacher_id`),
  KEY `school_id` (`school_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table szr_db.messages: ~3 rows (približno)
DELETE FROM `messages`;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` (`id`, `student_id`, `teacher_id`, `school_id`, `state_id`, `header`, `content`, `date_sent`, `date_edit`) VALUES
	('7d4b7d63-b41d-11e9-9519-f04da2b5f496', '241a0ee6-b1d9-11e9-9658-f04da2b5f496', '7b2fd87f-b1d9-11e9-9658-f04da2b5f496', '36ee6f6e-b1c7-11e9-9658-f04da2b5f496', '06b1d52c-b3da-11e9-be63-902b34549865', 'Popravek ocen za leto 2019', 'Prišlo je do napake pri mojih ocenah za leto 2019, saj imam matematiko zaključeno 5 in ne 3, kot je zapisano v bazi.', '2019-02-06 07:19:25', '2019-03-06 07:19:25'),
	('7d4b8667-b41d-11e9-9519-f04da2b5f496', '241a0ee6-b1d9-11e9-9658-f04da2b5f496', '7b2fd87f-b1d9-11e9-9658-f04da2b5f496', '36ee6f6e-b1c7-11e9-9658-f04da2b5f496', '06b1c46e-b3da-11e9-be63-902b34549865', 'Popravek ocen za leto 2016', 'Prišlo je do napake pri mojih ocenah za leto 2019, saj imam matematiko zaključeno 5 in ne 3, kot je zapisano v bazi.', '2019-02-08 07:12:25', '2019-03-06 07:19:25'),
	('7d4b9335-b41d-11e9-9519-f04da2b5f496', '241a43cb-b1d9-11e9-9658-f04da2b5f496', '7b2fd87f-b1d9-11e9-9658-f04da2b5f496', '36ee6f6e-b1c7-11e9-9658-f04da2b5f496', '06b1d52c-b3da-11e9-be63-902b34549865', 'Manjkajoč dosežek za leto 2018', 'Ob pregledu mojih dosežkov sem opazil, da mi v letu 2018 manjka dosežek za srebrno priznanje iz biologije, ki sem ga prejel v Ljubljani. Prosim če mi popravite.', '2019-03-06 07:19:25', '2019-03-06 07:19:25');
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;

-- Dumping structure for tabela szr_db.schools
DROP TABLE IF EXISTS `schools`;
CREATE TABLE IF NOT EXISTS `schools` (
  `id` varchar(36) NOT NULL DEFAULT uuid(),
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_slovenian_ci DEFAULT NULL,
  `short_name` varchar(20) CHARACTER SET utf8 COLLATE utf8_slovenian_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table szr_db.schools: ~4 rows (približno)
DELETE FROM `schools`;
/*!40000 ALTER TABLE `schools` DISABLE KEYS */;
INSERT INTO `schools` (`id`, `name`, `short_name`) VALUES
	('36ee6f6e-b1c7-11e9-9658-f04da2b5f496', 'Elektro in računalniška šola', 'ERŠ'),
	('36ee7671-b1c7-11e9-9658-f04da2b5f496', 'Šola za strojništvo, geotehniko in okolje', 'ŠSGO'),
	('36ee7774-b1c7-11e9-9658-f04da2b5f496', 'Šola za storitvene dejavnosti', 'ŠSD'),
	('36ee7821-b1c7-11e9-9658-f04da2b5f496', 'Gimnazija', 'GIM');
/*!40000 ALTER TABLE `schools` ENABLE KEYS */;

-- Dumping structure for tabela szr_db.states
DROP TABLE IF EXISTS `states`;
CREATE TABLE IF NOT EXISTS `states` (
  `id` varchar(36) CHARACTER SET utf8 COLLATE utf8_slovenian_ci NOT NULL DEFAULT uuid(),
  `value` varchar(36) CHARACTER SET utf8 COLLATE utf8_slovenian_ci DEFAULT NULL,
  `index` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table szr_db.states: ~3 rows (približno)
DELETE FROM `states`;
/*!40000 ALTER TABLE `states` DISABLE KEYS */;
INSERT INTO `states` (`id`, `value`, `index`) VALUES
	('06b1c46e-b3da-11e9-be63-902b34549865', 'Poslano', 3),
	('06b1d474-b3da-11e9-be63-902b34549865', 'Odobreno', 2),
	('06b1d52c-b3da-11e9-be63-902b34549865', 'Zavrnjeno', 1);
/*!40000 ALTER TABLE `states` ENABLE KEYS */;

-- Dumping structure for tabela szr_db.students
DROP TABLE IF EXISTS `students`;
CREATE TABLE IF NOT EXISTS `students` (
  `id` varchar(36) COLLATE utf8_slovenian_ci NOT NULL DEFAULT uuid(),
  `name` varchar(50) COLLATE utf8_slovenian_ci DEFAULT NULL,
  `surname` varchar(50) COLLATE utf8_slovenian_ci DEFAULT NULL,
  `mail` varchar(80) COLLATE utf8_slovenian_ci DEFAULT NULL,
  `easistent_id` varchar(12) COLLATE utf8_slovenian_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=64 DEFAULT CHARSET=utf8 COLLATE=utf8_slovenian_ci;

-- Dumping data for table szr_db.students: 2 rows
DELETE FROM `students`;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
INSERT INTO `students` (`id`, `name`, `surname`, `mail`, `easistent_id`) VALUES
	('241a0ee6-b1d9-11e9-9658-f04da2b5f496', 'LUKA', 'PAVČNIK', 'luka.pavcnik@hotmail.com', '1953935'),
	('241a43cb-b1d9-11e9-9658-f04da2b5f496', 'JANEZ', 'SEDELJSAK', 'janez.sedeljsak@gmail.com', '1953935');
/*!40000 ALTER TABLE `students` ENABLE KEYS */;

-- Dumping structure for tabela szr_db.subjects
DROP TABLE IF EXISTS `subjects`;
CREATE TABLE IF NOT EXISTS `subjects` (
  `id` varchar(36) COLLATE utf8_slovenian_ci NOT NULL DEFAULT uuid(),
  `name` varchar(50) COLLATE utf8_slovenian_ci DEFAULT NULL,
  `short_name` varchar(50) COLLATE utf8_slovenian_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_slovenian_ci;

-- Dumping data for table szr_db.subjects: 7 rows
DELETE FROM `subjects`;
/*!40000 ALTER TABLE `subjects` DISABLE KEYS */;
INSERT INTO `subjects` (`id`, `name`, `short_name`) VALUES
	('226d1b15-b1e7-11e9-9658-f04da2b5f496', 'Slovenščina', 'SLO'),
	('226d7d73-b1e7-11e9-9658-f04da2b5f496', 'Matematika', 'MAT'),
	('226d7fd5-b1e7-11e9-9658-f04da2b5f496', 'Angleščina', 'ANG'),
	('226d8135-b1e7-11e9-9658-f04da2b5f496', 'Avtomatika', 'AVT'),
	('226d8274-b1e7-11e9-9658-f04da2b5f496', 'Vzpostavitev in vzdrževanje omrežnih storitev', 'VOS'),
	('226d83b4-b1e7-11e9-9658-f04da2b5f496', 'Načrtovanje in postavitev podatkovnih baz', 'PPB'),
	('226d84eb-b1e7-11e9-9658-f04da2b5f496', 'Načrtovanje in razvoj spletnih aplikacij', 'RSA');
/*!40000 ALTER TABLE `subjects` ENABLE KEYS */;

-- Dumping structure for tabela szr_db.teachers
DROP TABLE IF EXISTS `teachers`;
CREATE TABLE IF NOT EXISTS `teachers` (
  `id` varchar(36) COLLATE utf8_slovenian_ci NOT NULL DEFAULT uuid(),
  `name` char(20) COLLATE utf8_slovenian_ci DEFAULT NULL,
  `surname` char(20) COLLATE utf8_slovenian_ci DEFAULT NULL,
  `mail` mediumtext COLLATE utf8_slovenian_ci DEFAULT NULL,
  `password` varchar(80) COLLATE utf8_slovenian_ci DEFAULT NULL,
  `school_id` varchar(36) COLLATE utf8_slovenian_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `school_id` (`school_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_slovenian_ci;

-- Dumping data for table szr_db.teachers: 3 rows
DELETE FROM `teachers`;
/*!40000 ALTER TABLE `teachers` DISABLE KEYS */;
INSERT INTO `teachers` (`id`, `name`, `surname`, `mail`, `password`, `school_id`) VALUES
	('e545e052-b433-11e9-9519-f04da2b5f496', 'Miran', 'Zevnik', 'miran@gmail.com', 'sha1$bbcb1e19$1$23a1274326619c82e551e2d91bb881efaccfc961', '36ee6f6e-b1c7-11e9-9658-f04da2b5f496'),
	('0eb75c31-b430-11e9-9519-f04da2b5f496', 'marjetka', 'herodež', 'marjetka@gmail.com', 'sha1$16006fd3$1$9c8a30b259814bdff4c506c09517cc817e57490c', '36ee6f6e-b1c7-11e9-9658-f04da2b5f496'),
	('f270f73f-b433-11e9-9519-f04da2b5f496', 'Nino', 'Golčman', 'nino@gmail.com', 'sha1$4a062f49$1$c3703899592fbfe0f5b68adabaa9d225553956ea', '36ee6f6e-b1c7-11e9-9658-f04da2b5f496');
/*!40000 ALTER TABLE `teachers` ENABLE KEYS */;

-- Dumping structure for tabela szr_db.types
DROP TABLE IF EXISTS `types`;
CREATE TABLE IF NOT EXISTS `types` (
  `id` varchar(36) COLLATE utf8_slovenian_ci NOT NULL DEFAULT uuid(),
  `name` char(20) COLLATE utf8_slovenian_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_slovenian_ci;

-- Dumping data for table szr_db.types: 4 rows
DELETE FROM `types`;
/*!40000 ALTER TABLE `types` DISABLE KEYS */;
INSERT INTO `types` (`id`, `name`) VALUES
	('1670c789-b1da-11e9-9658-f04da2b5f496', 'Raziskovalna naloga'),
	('16712863-b1da-11e9-9658-f04da2b5f496', 'Projekt'),
	('16712aa5-b1da-11e9-9658-f04da2b5f496', 'Tekmovanje'),
	('16712be8-b1da-11e9-9658-f04da2b5f496', 'Športni dosežek');
/*!40000 ALTER TABLE `types` ENABLE KEYS */;

-- Dumping structure for tabela szr_db.years
DROP TABLE IF EXISTS `years`;
CREATE TABLE IF NOT EXISTS `years` (
  `id` varchar(36) COLLATE utf8_slovenian_ci NOT NULL DEFAULT uuid(),
  `name` varchar(20) COLLATE utf8_slovenian_ci DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_slovenian_ci;

-- Dumping data for table szr_db.years: 5 rows
DELETE FROM `years`;
/*!40000 ALTER TABLE `years` DISABLE KEYS */;
INSERT INTO `years` (`id`, `name`, `start_date`, `end_date`) VALUES
	('da8b1386-b1e1-11e9-9658-f04da2b5f496', '2016/17', '2016-09-01 00:00:00', '2017-08-31 23:59:59'),
	('da8bc7db-b1e1-11e9-9658-f04da2b5f496', '2017/18', '2017-09-01 00:00:00', '2018-08-31 23:59:59'),
	('da8bcb64-b1e1-11e9-9658-f04da2b5f496', '2018/19', '2018-09-01 00:00:00', '2019-08-31 23:59:59'),
	('da8bcd31-b1e1-11e9-9658-f04da2b5f496', '2019/20', '2019-09-01 00:00:00', '2020-08-31 23:59:59'),
	('da8bcefa-b1e1-11e9-9658-f04da2b5f496', '2020/21', '2020-09-01 00:00:00', '2021-08-31 23:59:59');
/*!40000 ALTER TABLE `years` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
