-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Mar 22, 2018 at 09:45 AM
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `db_kareer_revised`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_acadinfo`
--

CREATE TABLE IF NOT EXISTS `tbl_acadinfo` (
  `id` varchar(60) NOT NULL,
  `applicant_id` varchar(50) NOT NULL,
  `level` varchar(500) DEFAULT NULL,
  `schoolattended` varchar(500) DEFAULT NULL,
  `degree` varchar(500) DEFAULT NULL COMMENT 'BASIC EDUCATION/DEGREE/COURSE',
  `highestlevel` varchar(500) DEFAULT NULL COMMENT 'HIGHEST LEVEL/UNITS EARNED',
  `yearenrolled` varchar(10) DEFAULT NULL,
  `yeargraduated` varchar(10) DEFAULT NULL,
  `date` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `applicant_id` (`applicant_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_acadinfo`
--

INSERT INTO `tbl_acadinfo` (`id`, `applicant_id`, `level`, `schoolattended`, `degree`, `highestlevel`, `yearenrolled`, `yeargraduated`, `date`) VALUES
('b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'da4b9237bacccdf19c0760cab7aec4a8359010b0', 'Elementary', 'Macabito Calasiao Pangasinan', 'null', 'null', '2000', '2006', '2018-03-10 19:23:51');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_admin`
--

CREATE TABLE IF NOT EXISTS `tbl_admin` (
  `id` varchar(50) CHARACTER SET latin1 COLLATE latin1_general_cs NOT NULL,
  `fname` varchar(20) DEFAULT NULL,
  `lname` varchar(20) DEFAULT NULL,
  `image` varchar(60) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `level` varchar(1) DEFAULT NULL,
  `password` varchar(70) CHARACTER SET latin1 COLLATE latin1_general_cs DEFAULT NULL,
  `status` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_admin`
--

INSERT INTO `tbl_admin` (`id`, `fname`, `lname`, `image`, `username`, `level`, `password`, `status`) VALUES
('admin_id', 'Hello 1', 'World 1', 'admin_1519974421.rnr', 'Admin2018', '1', '$2y$11$GOo2ZJo7LTzTKjvVERfZkO5NNtXsfOsZc483B55x/VCz8VI5ezrC6', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_applicant`
--

CREATE TABLE IF NOT EXISTS `tbl_applicant` (
  `id` varchar(50) NOT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(60) DEFAULT NULL,
  `auth_type` varchar(20) DEFAULT NULL COMMENT 'fb,google,organic',
  `auth_id` varchar(100) DEFAULT NULL COMMENT 'account id',
  `status` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_applicant`
--

INSERT INTO `tbl_applicant` (`id`, `description`, `email`, `password`, `auth_type`, `auth_id`, `status`) VALUES
('356a192b7913b04c54574d18c28d46e6395428ab', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'rufongabrillojr93@yahoo.com.ph', '$2y$11$7Hjsc4VtejAwHVp3FdJyneYwsIeF3xgNaQXePf3pztUIv5H4FGn/i', 'fb-oauth', '1953593104892678', '1'),
('77de68daecd823babbb58edb1c8e14d7106e83bb', NULL, 'rufo@deegeelab.com', '$2y$11$UcJ4ROLi3Y32G07BbQxTCON9NFOL1JIo/K5j/6R5TcGOKTJehOxCe', '', '', '1'),
('b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', '', 'rufo.gabrillo@gmail.com', '$2y$11$sGQLIqYCebYWP6QGl6kedOxsaWzWLPfWRpkjBXELkblxNLQ2kUWF2', '', '', '1'),
('da4b9237bacccdf19c0760cab7aec4a8359010b0', 'Full-stack Developer, Product Builder, Life-hacker, Hybrid app enthusiast\n\nIâ€™m Rufo Gabrillo, I currently work for RNR Digital Consultancy, as an Tech Lead and a seasoned chef.\n\nI have experienced in building systems and products directly from ideas.\n\nHello world', 'rufo.gabrillo@rnrdigitalconsultancy.com', '$2y$11$d2/aQfjK3ccNnOZ5rF.n5eW97Eh6tC6yP63gvJAJCCMOlHChTJTiO', 'google-auth', '118066499412256745838', '1');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_application`
--

CREATE TABLE IF NOT EXISTS `tbl_application` (
  `id` varchar(50) NOT NULL,
  `vacancy_id` varchar(50) DEFAULT NULL,
  `applicant_id` varchar(50) NOT NULL,
  `date` varchar(20) DEFAULT NULL,
  `status` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `applicant_id` (`applicant_id`),
  KEY `vacancy_id` (`vacancy_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_bookmark`
--

CREATE TABLE IF NOT EXISTS `tbl_bookmark` (
  `id` varchar(60) NOT NULL,
  `vacancy_id` varchar(60) DEFAULT NULL,
  `applicant_id` varchar(50) NOT NULL,
  `date` varchar(60) DEFAULT NULL,
  `status` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `applicant_id` (`applicant_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_bookmark`
--

INSERT INTO `tbl_bookmark` (`id`, `vacancy_id`, `applicant_id`, `date`, `status`) VALUES
('0716d9708d321ffb6a00818614779e779925365c', '356a192b7913b04c54574d18c28d46e6395428ab', '0716d9708d321ffb6a00818614779e779925365c', '2017-10-16 15:18:22', '1'),
('0a57cb53ba59c46fc4b692527a38a87c78d84028', '7b52009b64fd0a2a49e6d8a939753077792b0554', '356a192b7913b04c54574d18c28d46e6395428ab', '2017-12-13 22:25:38', '1'),
('0ade7c2cf97f75d009975f4d720d1fa6c19f4897', '0716d9708d321ffb6a00818614779e779925365c', 'b1d5781111d84f7b3fe45a0852e59758cd7a87e5', '2017-09-28 20:31:42', '1'),
('12c6fc06c99a462375eeb3f43dfd832b08ca9e17', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', '2017-12-12 01:57:39', '1'),
('1574bddb75c78a6fd2251d61e2993b5146201319', '17ba0791499db908433b80f37c5fbc89b870084b', 'ac3478d69a3c81fa62e60f5c3696165a4e5e6ac4', '2017-10-23 21:00:03', '1'),
('17ba0791499db908433b80f37c5fbc89b870084b', '4d134bc072212ace2df385dae143139da74ec0ef', '0716d9708d321ffb6a00818614779e779925365c', '2017-09-29 14:57:47', '1'),
('1b6453892473a467d07372d45eb05abc2031647a', '9e6a55b6b4563e652a23be9d623ca5055c356940', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', '2017-09-28 18:43:35', '1'),
('22d200f8670dbdb3e253a90eee5098477c95c23d', '887309d048beef83ad3eabf2a79a64a389ab1c9f', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', '2017-12-19 10:29:58', '1'),
('356a192b7913b04c54574d18c28d46e6395428ab', '0716d9708d321ffb6a00818614779e779925365c', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', '2017-09-28 18:36:28', '1'),
('472b07b9fcf2c2451e8781e944bf5f77cd8457c8', '472b07b9fcf2c2451e8781e944bf5f77cd8457c8', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', '2017-12-11 15:11:35', '1'),
('4d134bc072212ace2df385dae143139da74ec0ef', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', '2017-12-12 01:58:22', '1'),
('632667547e7cd3e0466547863e1207a8c0c0c549', '7b52009b64fd0a2a49e6d8a939753077792b0554', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', '2017-12-19 21:31:35', '1'),
('7719a1c782a1ba91c031a682a0a2f8658209adbf', '887309d048beef83ad3eabf2a79a64a389ab1c9f', '356a192b7913b04c54574d18c28d46e6395428ab', '2017-12-13 22:25:41', '1'),
('77de68daecd823babbb58edb1c8e14d7106e83bb', '91032ad7bbcb6cf72875e8e8207dcfba80173f7c', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', '2017-09-28 18:43:20', '1'),
('7b52009b64fd0a2a49e6d8a939753077792b0554', '91032ad7bbcb6cf72875e8e8207dcfba80173f7c', '7b52009b64fd0a2a49e6d8a939753077792b0554', '2017-09-29 15:41:03', '1'),
('887309d048beef83ad3eabf2a79a64a389ab1c9f', 'f6e1126cedebf23e1463aee73f9df08783640400', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', '2017-12-13 13:38:36', '1'),
('902ba3cda1883801594b6e1b452790cc53948fda', '1574bddb75c78a6fd2251d61e2993b5146201319', 'fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', '2017-09-28 20:26:55', '1'),
('91032ad7bbcb6cf72875e8e8207dcfba80173f7c', '356a192b7913b04c54574d18c28d46e6395428ab', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', '2017-12-11 15:11:23', '1'),
('9e6a55b6b4563e652a23be9d623ca5055c356940', '356a192b7913b04c54574d18c28d46e6395428ab', '0716d9708d321ffb6a00818614779e779925365c', '2017-10-16 15:18:47', '1'),
('ac3478d69a3c81fa62e60f5c3696165a4e5e6ac4', '91032ad7bbcb6cf72875e8e8207dcfba80173f7c', 'fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', '2017-09-28 20:26:51', '1'),
('b1d5781111d84f7b3fe45a0852e59758cd7a87e5', '9e6a55b6b4563e652a23be9d623ca5055c356940', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', '2017-09-28 21:48:59', '1'),
('b3f0c7f6bb763af1be91d9e74eabfeb199dc1f1f', '356a192b7913b04c54574d18c28d46e6395428ab', '0716d9708d321ffb6a00818614779e779925365c', '2017-10-16 15:20:18', '1'),
('b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', '1574bddb75c78a6fd2251d61e2993b5146201319', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', '2017-09-28 18:33:11', '1'),
('bc33ea4e26e5e1af1408321416956113a4658763', '356a192b7913b04c54574d18c28d46e6395428ab', '356a192b7913b04c54574d18c28d46e6395428ab', '2017-12-13 22:25:32', '1'),
('bd307a3ec329e10a2cff8fb87480823da114f8f4', '4d134bc072212ace2df385dae143139da74ec0ef', '7b52009b64fd0a2a49e6d8a939753077792b0554', '2017-09-29 15:41:08', '1'),
('c1dfd96eea8cc2b62785275bca38ac261256e278', '91032ad7bbcb6cf72875e8e8207dcfba80173f7c', 'fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', '2017-09-28 20:26:53', '1'),
('d435a6cdd786300dff204ee7c2ef942d3e9034e2', '17ba0791499db908433b80f37c5fbc89b870084b', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', '2017-12-12 01:58:05', '1'),
('da4b9237bacccdf19c0760cab7aec4a8359010b0', '0716d9708d321ffb6a00818614779e779925365c', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', '2017-09-28 18:43:12', '1'),
('f1abd670358e036c31296e66b3b66c382ac00812', '472b07b9fcf2c2451e8781e944bf5f77cd8457c8', '91032ad7bbcb6cf72875e8e8207dcfba80173f7c', '2017-10-17 02:48:41', '1'),
('f6e1126cedebf23e1463aee73f9df08783640400', 'da4b9237bacccdf19c0760cab7aec4a8359010b0', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', '2017-12-12 01:58:28', '1'),
('fa35e192121eabf3dabf9f5ea6abdbcbc107ac3b', '17ba0791499db908433b80f37c5fbc89b870084b', '91032ad7bbcb6cf72875e8e8207dcfba80173f7c', '2017-10-17 02:48:19', '1'),
('fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', '0716d9708d321ffb6a00818614779e779925365c', 'fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', '2017-09-28 20:26:58', '1');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_business`
--

CREATE TABLE IF NOT EXISTS `tbl_business` (
  `business_id` varchar(70) NOT NULL,
  `address` varchar(300) DEFAULT NULL,
  `contact_number` varchar(100) DEFAULT NULL,
  `company_name` varchar(300) DEFAULT NULL,
  `description` text,
  `image` varchar(70) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `status` varchar(1) DEFAULT NULL,
  `others` varchar(1000) DEFAULT NULL,
  `date` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`business_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_business`
--

INSERT INTO `tbl_business` (`business_id`, `address`, `contact_number`, `company_name`, `description`, `image`, `email`, `status`, `others`, `date`) VALUES
('0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Business Address', 'Number', 'Name', NULL, 'business_1519974506.rnr', 'email@email.com', '1', NULL, '2018-02-26 17:03:25'),
('1', 'Las Vegas Street Lingayen', '090101010101', 'Rufo Cocorp Inc.', '<h2><span style="color: rgb(230, 0, 0);">Description</span></h2><p><strong style="color: rgb(255, 153, 0);">Hello world</strong></p><p><em style="color: rgb(255, 255, 0);">Hello world</em></p><p><u style="color: rgb(0, 138, 0);">Hello world</u></p><p><s style="color: rgb(0, 102, 204);">Hello world</s></p><ol><li><span style="color: rgb(194, 133, 255);">Hello world</span></li></ol><p><span style="color: rgb(153, 51, 255);">H</span><sup style="color: rgb(153, 51, 255);">ello world</sup></p><p>ha</p><h2><sup class="ql-font-monospace" style="color: rgb(153, 51, 255);">hello world</sup></h2><p><span style="color: rgb(255, 255, 255); background-color: rgb(0, 0, 0);">0010001000101010100010</span></p><p><span style="color: rgb(255, 255, 255); background-color: rgb(0, 0, 0);">0010001000101010100010</span></p><p>Hhahahah</p><p><br></p><p>check again</p><p><span style="color: rgb(255, 255, 255); background-color: rgb(0, 0, 0);">check</span></p>', 'business_1519982947.rnr', 'rufo@email.com', '1', '', ''),
('17ba0791499db908433b80f37c5fbc89b870084b', 'Business Address', 'Number', 'Name', NULL, NULL, 'email@email.com', '1', NULL, '2018-02-26 17:14:18'),
('1b6453892473a467d07372d45eb05abc2031647a', 'Lingayen', '0912334455671 ', 'Gabrillo Enterprise 1', 'Tubig kayo dyan', 'business_1519964158.rnr', 'rufongabrillojr@gmail.com', '1', '', ''),
('356a192b7913b04c54574d18c28d46e6395428ab', '', '', 'Gabrillo Enterprisess 1', '', 'business_1519963774.rnr', 'rufogabrillo@gmail.com', '1', '', ''),
('77de68daecd823babbb58edb1c8e14d7106e83bb', '', '', 'Gabrillo Enterprises', '', '77de68daecd823babbb58edb1c8e14d7106e83bb-1507300053.apr', 'rufo.gabrillo2@gmail.com', '1', '', ''),
('7b52009b64fd0a2a49e6d8a939753077792b0554', 'Business Address', 'Number', 'Name', NULL, NULL, 'email@email.com', '1', NULL, '2018-02-26 17:14:19'),
('902ba3cda1883801594b6e1b452790cc53948fda', NULL, NULL, 'Great Company', NULL, 'profile_avatar.jpg', 'gc@gmail.com', '0', '', ''),
('ac3478d69a3c81fa62e60f5c3696165a4e5e6ac4', 'Lingayen', '0999', 'Kopiko', 'Coffee', 'profile_avatar.jpg', 'kopiko@gmail.com', '0', '', ''),
('b1d5781111d84f7b3fe45a0852e59758cd7a87e5', 'Business Address', 'Number', 'Name', NULL, NULL, 'email@email.com', '1', NULL, '2018-02-26 17:03:30'),
('b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'Poblacion East, Calasiao Pangasinan', '09484993958', 'asdsdsds', 'This is Description', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c-1507518045.apr', 'emp123', '1', '', ''),
('bd307a3ec329e10a2cff8fb87480823da114f8f4', 'Business Address', 'number', 'Company Name', NULL, NULL, 'email@email.com', '1', NULL, '2018-02-26 17:14:51'),
('c1dfd96eea8cc2b62785275bca38ac261256e278', NULL, NULL, 'e-Machines', NULL, 'profile_avatar.jpg', 'emach@gmail.com', '1', '', ''),
('da4b9237bacccdf19c0760cab7aec4a8359010b0', 'Dagupan', '09', 'Boneless Bangus', 'Walang tinik', 'da4b9237bacccdf19c0760cab7aec4a8359010b0-1507913543.apr', 'bone@gmail.com', '1', '', ''),
('fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', 'address', 'number', 'RNR Corp.', NULL, NULL, 'email@email.com', '1', NULL, '2018-02-26 16:59:52'),
('pHilMont123', 'Manaoag', '09481234567', 'PhilMont', 'beauty products', 'pHilMont123-1458551347.apr', 'donaldduck@gmail.com', '1', '', ''),
('ToyotaCars', 'Calasiao, Pangasinan', '09129837641', 'Toyota ', 'Cars and Vehicle for you and Me. Forever.', 'toyota.jpg', 'richardMercy@gmail.com', '1', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_businessmanagers`
--

CREATE TABLE IF NOT EXISTS `tbl_businessmanagers` (
  `id` varchar(70) NOT NULL,
  `business_id` varchar(70) NOT NULL,
  `name` varchar(300) DEFAULT NULL,
  `email` varchar(300) DEFAULT NULL,
  `password` varchar(70) DEFAULT NULL,
  `picture` varchar(70) DEFAULT NULL,
  `position` varchar(300) DEFAULT NULL,
  `date` varchar(20) DEFAULT NULL,
  `status` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `business_id` (`business_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_businessmanagers`
--

INSERT INTO `tbl_businessmanagers` (`id`, `business_id`, `name`, `email`, `password`, `picture`, `position`, `date`, `status`) VALUES
('1b6453892473a467d07372d45eb05abc2031647a', '356a192b7913b04c54574d18c28d46e6395428ab', 'Rufo Gabrillo', 'rufo@deegeelab.com', '$2y$11$ihqk7eVo4R8Ox1hHzN3mi.89h.zVw7m7Q7gNXx6yRI7IYyY.oykju', NULL, 'Dish Washer', '2018-03-01 15:30:29', '1'),
('356a192b7913b04c54574d18c28d46e6395428ab', '1b6453892473a467d07372d45eb05abc2031647a', 'James Reid', 'rufo.gabrillo@rnrdigitalconsultancy.com', '$2y$11$eZnkAbcbvLLkspcRI4roK.zY7IeplxAvCk278JhH8aNkND25NIjMm', NULL, 'Technical Lead', '2018-03-01 10:22:57', '1'),
('77de68daecd823babbb58edb1c8e14d7106e83bb', '1b6453892473a467d07372d45eb05abc2031647a', 'Wil Son', 'wil.son@gmail.com', '$2y$11$dtt6y20DrP/OR9W7ReghvOdJtkw/0y94Fx0C/GYEI5tIlnfBP3m62', '', 'Content Writer', '2018-03-01 13:39:31', '1'),
('ac3478d69a3c81fa62e60f5c3696165a4e5e6ac4', '1b6453892473a467d07372d45eb05abc2031647a', 'Mark Gallano', 'mark@gmail.com', '$2y$11$glDH89j0OpCIS9BK3S7qS.JjgYew9TD237KjfVPbcupBnkrmMy0b.', NULL, 'Nilasing si renz at ginuhitan niyaya kumain sa mcdo', '2018-03-03 08:16:36', '1'),
('b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', '1b6453892473a467d07372d45eb05abc2031647a', 'Rufo N. Gabrillo', 'rufo.gabrillo@gmail.com', '$2y$11$BV1OJ74oQHnuG541kSj65ufdB449X.aVobXmofu9MnkvRhqQsjhpa', 'avatar.png', 'Technical Lead', '2018-03-01 13:12:32', '1'),
('da4b9237bacccdf19c0760cab7aec4a8359010b0', '1b6453892473a467d07372d45eb05abc2031647a', 'Jolo D.', 'jolod@gmail.com', '$2y$11$NkIWGqyHW0Va.rnCaMi25eor6AERo.lJRLoiDsYoUC8AMW.OTX96a', NULL, 'Graphic Designer', '2018-03-01 13:35:06', '1');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_career`
--

CREATE TABLE IF NOT EXISTS `tbl_career` (
  `id` varchar(60) NOT NULL,
  `applicant_id` varchar(50) NOT NULL,
  `agency` varchar(300) DEFAULT NULL,
  `position_title` varchar(300) DEFAULT NULL,
  `monthly_salary` varchar(6) DEFAULT NULL,
  `appointment_status` varchar(300) DEFAULT NULL,
  `inclusive_fromdate` varchar(20) DEFAULT NULL,
  `inclusive_todate` varchar(20) DEFAULT NULL,
  `date` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `applicant_id` (`applicant_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_career`
--

INSERT INTO `tbl_career` (`id`, `applicant_id`, `agency`, `position_title`, `monthly_salary`, `appointment_status`, `inclusive_fromdate`, `inclusive_todate`, `date`) VALUES
('356a192b7913b04c54574d18c28d46e6395428ab', 'da4b9237bacccdf19c0760cab7aec4a8359010b0', 'Pangasinan State University', 'IT Instructor', '21,000', 'Contractual', '2016-08-08', '2017-12-22', '2018-03-10 20:02:06'),
('b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'da4b9237bacccdf19c0760cab7aec4a8359010b0', 'ES Assisting', 'Web Developer', '12000', 'Job Order', '2015', '2016', '2018-03-10 19:51:28');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_logs`
--

CREATE TABLE IF NOT EXISTS `tbl_logs` (
  `id` varchar(70) NOT NULL,
  `from_account_id` varchar(70) NOT NULL,
  `to_account_id` varchar(70) DEFAULT NULL,
  `remarks` text NOT NULL,
  `date` varchar(20) NOT NULL,
  `header` varchar(300) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_personalinfo`
--

CREATE TABLE IF NOT EXISTS `tbl_personalinfo` (
  `id` varchar(50) NOT NULL,
  `given_name` varchar(50) DEFAULT NULL,
  `family_name` varchar(50) DEFAULT NULL,
  `middle_name` varchar(50) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `date_of_birth` varchar(10) DEFAULT NULL,
  `permanent_address` varchar(100) DEFAULT NULL,
  `citizenship` varchar(20) DEFAULT NULL,
  `phone` varchar(100) DEFAULT NULL,
  `height` varchar(10) DEFAULT NULL COMMENT 'cm',
  `weight` varchar(10) DEFAULT NULL COMMENT 'kg',
  `religion` varchar(20) DEFAULT NULL,
  `picture` varchar(100) DEFAULT NULL,
  `date` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_personalinfo`
--

INSERT INTO `tbl_personalinfo` (`id`, `given_name`, `family_name`, `middle_name`, `gender`, `date_of_birth`, `permanent_address`, `citizenship`, `phone`, `height`, `weight`, `religion`, `picture`, `date`) VALUES
('1b6453892473a467d07372d45eb05abc2031647a', 'Rufo', 'Gabrillo', NULL, '', '', '', '', '', '', '', '', '', '2018-03-06 12:08:26'),
('356a192b7913b04c54574d18c28d46e6395428ab', 'Rufo', 'Gabrillo Jr.', 'middle name', 'Male', '1/26/1993', '#117 Macabito Calasiao Pangasinan', 'Filipino', '0948-499-3058', '165', '53', 'Filipino', 'http://graph.facebook.com/1695213090568737/picture?type=large', '2018-02-20 14:33:57'),
('77de68daecd823babbb58edb1c8e14d7106e83bb', 'James', 'Reid', NULL, '', '', '', '', '', '', '', '', '', '2018-03-06 08:13:08'),
('adsf123456', 'Christian', 'Fajardo', 'Aquino', 'Male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'Rufo', 'Gabrillo', NULL, '', '', '', '', '', '', '', '', '', '2018-02-20 10:05:48'),
('da4b9237bacccdf19c0760cab7aec4a8359010b0', 'Rufo Jr', 'Gabrillo Jr.', 'N.', '', '1993-01-26', '#117 Macabito Calasiao, Pangasinan', '', '0948-499-3958 | 0948-499-3958', '', '', '', 'https://lh5.googleusercontent.com/-h-QNWKxPuNw/AAAAAAAAAAI/AAAAAAAAAAs/UEzHjTUm8Oo/s96-c/photo.jpg', '2018-02-20 15:00:59');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_skills`
--

CREATE TABLE IF NOT EXISTS `tbl_skills` (
  `id` varchar(60) NOT NULL,
  `applicant_id` varchar(50) NOT NULL,
  `skill` varchar(60) DEFAULT NULL,
  `level` varchar(20) DEFAULT NULL,
  `date` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `applicant_id` (`applicant_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_skills`
--

INSERT INTO `tbl_skills` (`id`, `applicant_id`, `skill`, `level`, `date`) VALUES
('356a192b7913b04c54574d18c28d46e6395428ab', 'da4b9237bacccdf19c0760cab7aec4a8359010b0', 'Hello world', '1', '2018-03-09 08:32:34'),
('77de68daecd823babbb58edb1c8e14d7106e83bb', 'da4b9237bacccdf19c0760cab7aec4a8359010b0', 'Sapnu Puas', '1', '2018-03-09 08:33:58'),
('b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'da4b9237bacccdf19c0760cab7aec4a8359010b0', 'Web Developer', '1', '2018-03-08 23:48:53');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_vacancies`
--

CREATE TABLE IF NOT EXISTS `tbl_vacancies` (
  `id` varchar(50) NOT NULL,
  `employer_id` varchar(50) DEFAULT NULL,
  `business_id` varchar(70) DEFAULT NULL,
  `short_description` text,
  `description` text,
  `vacancy_date` varchar(50) DEFAULT NULL,
  `job_title` varchar(100) DEFAULT NULL,
  `skills` varchar(1000) DEFAULT NULL,
  `salary_min` varchar(10) DEFAULT NULL,
  `salary_max` varchar(10) DEFAULT NULL,
  `date` varchar(20) DEFAULT NULL,
  `status` int(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `employer_id` (`employer_id`),
  KEY `employer_id_2` (`employer_id`),
  KEY `business_id` (`business_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_acadinfo`
--
-- ALTER TABLE `tbl_acadinfo` ADD CONSTRAINT `tbl_acadinfo_ibfk_1` FOREIGN KEY (`applicant_id`) REFERENCES `tbl_applicant` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tbl_applicant`
--
-- ALTER TABLE `tbl_applicant` ADD CONSTRAINT `tbl_applicant_ibfk_1` FOREIGN KEY (`id`) REFERENCES `tbl_personalinfo` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tbl_application`
--
-- ALTER TABLE `tbl_application` ADD CONSTRAINT `tbl_application_ibfk_2` FOREIGN KEY (`vacancy_id`) REFERENCES `tbl_vacancies` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION, ADD CONSTRAINT `tbl_application_ibfk_1` FOREIGN KEY (`applicant_id`) REFERENCES `tbl_applicant` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tbl_bookmark`
--
-- ALTER TABLE `tbl_bookmark` ADD CONSTRAINT `tbl_bookmark_ibfk_1` FOREIGN KEY (`applicant_id`) REFERENCES `tbl_applicant` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tbl_businessmanagers`
--
-- ALTER TABLE `tbl_businessmanagers` ADD CONSTRAINT `tbl_businessmanagers_ibfk_1` FOREIGN KEY (`business_id`) REFERENCES `tbl_business` (`business_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tbl_career`
--
-- ALTER TABLE `tbl_career` ADD CONSTRAINT `tbl_career_ibfk_1` FOREIGN KEY (`applicant_id`) REFERENCES `tbl_applicant` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tbl_skills`
--
-- ALTER TABLE `tbl_skills` ADD CONSTRAINT `tbl_skills_ibfk_1` FOREIGN KEY (`applicant_id`) REFERENCES `tbl_applicant` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tbl_vacancies`
--
-- ALTER TABLE `tbl_vacancies` ADD CONSTRAINT `tbl_vacancies_ibfk_2` FOREIGN KEY (`business_id`) REFERENCES `tbl_business` (`business_id`) ON DELETE NO ACTION ON UPDATE NO ACTION, ADD CONSTRAINT `tbl_vacancies_ibfk_1` FOREIGN KEY (`employer_id`) REFERENCES `tbl_businessmanagers` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE `tbl_vacancies` ADD FULLTEXT KEY `skills` (`skills`);
ALTER TABLE `tbl_vacancies` ADD FULLTEXT KEY `job_title` (`job_title`);
ALTER TABLE `tbl_vacancies` ADD FULLTEXT KEY `skills_2` (`skills`,`job_title`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

