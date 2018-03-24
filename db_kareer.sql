-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 24, 2018 at 05:29 AM
-- Server version: 5.7.14
-- PHP Version: 7.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_kareer`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_acadinfo`
--

CREATE TABLE `tbl_acadinfo` (
  `id` varchar(60) NOT NULL,
  `applicant_id` varchar(50) NOT NULL,
  `level` varchar(500) DEFAULT NULL,
  `schoolattended` varchar(500) DEFAULT NULL,
  `degree` varchar(500) DEFAULT NULL COMMENT 'BASIC EDUCATION/DEGREE/COURSE',
  `highestlevel` varchar(500) DEFAULT NULL COMMENT 'HIGHEST LEVEL/UNITS EARNED',
  `yearenrolled` varchar(10) DEFAULT NULL,
  `yeargraduated` varchar(10) DEFAULT NULL,
  `date` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_acadinfo`
--

INSERT INTO `tbl_acadinfo` (`id`, `applicant_id`, `level`, `schoolattended`, `degree`, `highestlevel`, `yearenrolled`, `yeargraduated`, `date`) VALUES
('b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'da4b9237bacccdf19c0760cab7aec4a8359010b0', 'Elementary', 'Macabito Calasiao Pangasinan', 'null', 'null', '2000', '2006', '2018-03-10 19:23:51');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_admin`
--

CREATE TABLE `tbl_admin` (
  `id` varchar(50) CHARACTER SET latin1 COLLATE latin1_general_cs NOT NULL,
  `fname` varchar(20) DEFAULT NULL,
  `lname` varchar(20) DEFAULT NULL,
  `image` varchar(60) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `level` varchar(1) DEFAULT NULL,
  `password` varchar(70) CHARACTER SET latin1 COLLATE latin1_general_cs DEFAULT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_admin`
--

INSERT INTO `tbl_admin` (`id`, `fname`, `lname`, `image`, `username`, `level`, `password`, `status`) VALUES
('admin_id', 'Hello 1', 'World 1', 'admin_1519974421.rnr', 'Admin2018', '1', '$2y$11$GOo2ZJo7LTzTKjvVERfZkO5NNtXsfOsZc483B55x/VCz8VI5ezrC6', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_applicant`
--

CREATE TABLE `tbl_applicant` (
  `id` varchar(50) NOT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(60) DEFAULT NULL,
  `auth_type` varchar(20) DEFAULT NULL COMMENT 'fb,google,organic',
  `auth_id` varchar(100) DEFAULT NULL COMMENT 'account id',
  `status` varchar(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_applicant`
--

INSERT INTO `tbl_applicant` (`id`, `description`, `email`, `password`, `auth_type`, `auth_id`, `status`) VALUES
('1b6453892473a467d07372d45eb05abc2031647a', 'Proud na bihira lang maligo', 'jonathan.millet@gmail.com', '$2y$11$ipio1AJLGPIxFi0ZvxK5pug6eWSV3l5czo/JSgoCCfXbiduVzYVHe', '', '', '1'),
('356a192b7913b04c54574d18c28d46e6395428ab', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'rufongabrillojr93@yahoo.com.ph', '$2y$11$7Hjsc4VtejAwHVp3FdJyneYwsIeF3xgNaQXePf3pztUIv5H4FGn/i', 'fb-oauth', '1953593104892678', '1'),
('77de68daecd823babbb58edb1c8e14d7106e83bb', NULL, 'rufo@deegeelab.com', '$2y$11$UcJ4ROLi3Y32G07BbQxTCON9NFOL1JIo/K5j/6R5TcGOKTJehOxCe', '', '', '1'),
('ac3478d69a3c81fa62e60f5c3696165a4e5e6ac4', NULL, 'elvinabalos@gmail.com', '$2y$11$pKLNzEV2YMMSFK0LQmZFP.V5U/V9ZwU8Rj8W0STLC.5HUo3mX018K', '', '', '1'),
('b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', '', 'rufo.gabrillo@gmail.com', '$2y$11$sGQLIqYCebYWP6QGl6kedOxsaWzWLPfWRpkjBXELkblxNLQ2kUWF2', '', '', '1'),
('da4b9237bacccdf19c0760cab7aec4a8359010b0', 'Full-stack Developer, Product Builder, Life-hacker, Hybrid app enthusiast\n\nIâ€™m Rufo Gabrillo, I currently work for RNR Digital Consultancy, as an Tech Lead and a seasoned chef.\n\nI have experienced in building systems and products directly from ideas.\n\nHello world', 'rufo.gabrillo@rnrdigitalconsultancy.com', '$2y$11$d2/aQfjK3ccNnOZ5rF.n5eW97Eh6tC6yP63gvJAJCCMOlHChTJTiO', 'google-auth', '118066499412256745838', '1');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_application`
--

CREATE TABLE `tbl_application` (
  `id` varchar(50) NOT NULL,
  `vacancy_id` varchar(50) DEFAULT NULL,
  `applicant_id` varchar(50) NOT NULL,
  `date` varchar(20) DEFAULT NULL,
  `status` varchar(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_application`
--

INSERT INTO `tbl_application` (`id`, `vacancy_id`, `applicant_id`, `date`, `status`) VALUES
('b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'c1dfd96eea8cc2b62785275bca38ac261256e278', '1b6453892473a467d07372d45eb05abc2031647a', '2018-03-24 12:02:42', '1');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_bookmark`
--

CREATE TABLE `tbl_bookmark` (
  `id` varchar(60) NOT NULL,
  `vacancy_id` varchar(60) DEFAULT NULL,
  `applicant_id` varchar(50) NOT NULL,
  `date` varchar(60) DEFAULT NULL,
  `status` varchar(60) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_bookmark`
--

INSERT INTO `tbl_bookmark` (`id`, `vacancy_id`, `applicant_id`, `date`, `status`) VALUES
('356a192b7913b04c54574d18c28d46e6395428ab', 'c1dfd96eea8cc2b62785275bca38ac261256e278', '1b6453892473a467d07372d45eb05abc2031647a', '2018-03-24 12:02:20', '1'),
('b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'ac3478d69a3c81fa62e60f5c3696165a4e5e6ac4', '1b6453892473a467d07372d45eb05abc2031647a', '2018-03-24 12:02:04', '1');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_business`
--

CREATE TABLE `tbl_business` (
  `id` varchar(70) NOT NULL,
  `address` varchar(300) DEFAULT NULL,
  `contact_number` varchar(100) DEFAULT NULL,
  `company_name` varchar(300) DEFAULT NULL,
  `description` text,
  `image` varchar(70) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `status` varchar(1) DEFAULT NULL,
  `others` varchar(1000) DEFAULT NULL,
  `date` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_business`
--

INSERT INTO `tbl_business` (`id`, `address`, `contact_number`, `company_name`, `description`, `image`, `email`, `status`, `others`, `date`) VALUES
('0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Business Address', 'Number', 'Name', '<h1><span style="color: rgb(230, 0, 0);">Description<span class="ql-cursor">ï»¿</span></span></h1>', 'business_1519974506.rnr', 'email@email.com', '1', NULL, '2018-02-26 17:03:25'),
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

CREATE TABLE `tbl_businessmanagers` (
  `id` varchar(70) NOT NULL,
  `business_id` varchar(70) NOT NULL,
  `name` varchar(300) DEFAULT NULL,
  `email` varchar(300) DEFAULT NULL,
  `password` varchar(70) DEFAULT NULL,
  `picture` varchar(70) DEFAULT NULL,
  `position` varchar(300) DEFAULT NULL,
  `date` varchar(20) DEFAULT NULL,
  `status` varchar(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_businessmanagers`
--

INSERT INTO `tbl_businessmanagers` (`id`, `business_id`, `name`, `email`, `password`, `picture`, `position`, `date`, `status`) VALUES
('0ade7c2cf97f75d009975f4d720d1fa6c19f4897', '1', 'Matthew West', 'matt@gmail.com', '$2y$11$8s2FPM2DZAJtxCF.8YPDjOOX7Zxh8bQS5eG15vJmBKnfohLOp7vPW', NULL, 'Position', '2018-03-24 01:32:46', '1'),
('17ba0791499db908433b80f37c5fbc89b870084b', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Matthew West', 'matthew@gmail.com', '$2y$11$I8FlPI7.3qfCPaYpHrXu2ubDRa9UJxQJEWEtfQ1JC8stOf5nGwu9S', NULL, 'Position', '2018-03-24 11:04:10', '1'),
('1b6453892473a467d07372d45eb05abc2031647a', '356a192b7913b04c54574d18c28d46e6395428ab', 'Rufo Gabrillo', 'rufo@deegeelab.com', '$2y$11$ihqk7eVo4R8Ox1hHzN3mi.89h.zVw7m7Q7gNXx6yRI7IYyY.oykju', NULL, 'Dish Washer', '2018-03-01 15:30:29', '1'),
('356a192b7913b04c54574d18c28d46e6395428ab', '1b6453892473a467d07372d45eb05abc2031647a', 'James Reid', 'rufo.gabrillo@rnrdigitalconsultancy.com', '$2y$11$eZnkAbcbvLLkspcRI4roK.zY7IeplxAvCk278JhH8aNkND25NIjMm', NULL, 'Technical Lead', '2018-03-01 10:22:57', '1'),
('77de68daecd823babbb58edb1c8e14d7106e83bb', '1b6453892473a467d07372d45eb05abc2031647a', 'Wil Son', 'wil.son@gmail.com', '$2y$11$dtt6y20DrP/OR9W7ReghvOdJtkw/0y94Fx0C/GYEI5tIlnfBP3m62', '', 'Content Writer', '2018-03-01 13:39:31', '1'),
('902ba3cda1883801594b6e1b452790cc53948fda', 'f1abd670358e036c31296e66b3b66c382ac00812', 'John', 'john.lazy@gmail.com', '$2y$11$/CZB/kKUyNhyrvGQ6nfV8uJNUxe0X0IQsFpjY91NE2R7hn7A1r02u', NULL, 'Lazy', '2018-03-12 23:58:42', '1'),
('ac3478d69a3c81fa62e60f5c3696165a4e5e6ac4', '1b6453892473a467d07372d45eb05abc2031647a', 'Mark Gallano', 'mark@gmail.com', '$2y$11$glDH89j0OpCIS9BK3S7qS.JjgYew9TD237KjfVPbcupBnkrmMy0b.', NULL, 'Nilasing si renz at ginuhitan niyaya kumain sa mcdo', '2018-03-03 08:16:36', '1'),
('b1d5781111d84f7b3fe45a0852e59758cd7a87e5', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Mark Lopez', 'mark@gmail.com', '$2y$11$He7c6Ih3lHbJUOXMCT9cXeesZxV/c0ZnNBnJVXa/ehP5xvIP.9ndq', NULL, 'Position', '2018-03-24 11:00:53', '1'),
('b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', '1b6453892473a467d07372d45eb05abc2031647a', 'Rufo N. Gabrillo', 'rufo.gabrillo@gmail.com', '$2y$11$BV1OJ74oQHnuG541kSj65ufdB449X.aVobXmofu9MnkvRhqQsjhpa', 'avatar.png', 'Technical Lead', '2018-03-01 13:12:32', '1'),
('c1dfd96eea8cc2b62785275bca38ac261256e278', '7b52009b64fd0a2a49e6d8a939753077792b0554', 'Othan Millet', 'othanmillet@gmail.com', '$2y$11$Kg67mpfEOV.vKC77IqceQO3MwtWAB/zOKGPwr2aR5zuqynbACxTni', 'employer_1520856298.rnr', 'Position', '2018-03-08 22:04:22', '1'),
('da4b9237bacccdf19c0760cab7aec4a8359010b0', '1b6453892473a467d07372d45eb05abc2031647a', 'Jolo D.', 'jolod@gmail.com', '$2y$11$NkIWGqyHW0Va.rnCaMi25eor6AERo.lJRLoiDsYoUC8AMW.OTX96a', NULL, 'Graphic Designer', '2018-03-01 13:35:06', '1'),
('fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Juan Tamad', 'juan@gmail.com', '$2y$11$9S//hJ0LBi15kYJoiZbEFOZWYNxjOE0EGcNGDBwZitu358LRs6ReS', NULL, 'Position', '2018-03-24 00:52:35', '1');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_career`
--

CREATE TABLE `tbl_career` (
  `id` varchar(60) NOT NULL,
  `applicant_id` varchar(50) NOT NULL,
  `agency` varchar(300) DEFAULT NULL,
  `position_title` varchar(300) DEFAULT NULL,
  `monthly_salary` varchar(6) DEFAULT NULL,
  `appointment_status` varchar(300) DEFAULT NULL,
  `inclusive_fromdate` varchar(20) DEFAULT NULL,
  `inclusive_todate` varchar(20) DEFAULT NULL,
  `date` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_career`
--

INSERT INTO `tbl_career` (`id`, `applicant_id`, `agency`, `position_title`, `monthly_salary`, `appointment_status`, `inclusive_fromdate`, `inclusive_todate`, `date`) VALUES
('356a192b7913b04c54574d18c28d46e6395428ab', 'da4b9237bacccdf19c0760cab7aec4a8359010b0', 'Pangasinan State University', 'IT Instructor', '21,000', 'Contractual', '2016-08-08', '2017-12-22', '2018-03-10 20:02:06'),
('77de68daecd823babbb58edb1c8e14d7106e83bb', '1b6453892473a467d07372d45eb05abc2031647a', 'Company', 'Position', '12000', 'Contractual', '2000', '2001', '2018-03-23 21:25:38'),
('b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'da4b9237bacccdf19c0760cab7aec4a8359010b0', 'ES Assisting', 'Web Developer', '12000', 'Job Order', '2015', '2016', '2018-03-10 19:51:28'),
('da4b9237bacccdf19c0760cab7aec4a8359010b0', '1b6453892473a467d07372d45eb05abc2031647a', 'Agency', 'Position', '12000', 'Contractual', '1990', '1991', '2018-03-23 21:09:54');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_logs`
--

CREATE TABLE `tbl_logs` (
  `id` varchar(70) NOT NULL,
  `from_account_id` varchar(70) NOT NULL,
  `to_account_id` varchar(70) DEFAULT NULL,
  `remarks` text NOT NULL,
  `date` varchar(20) NOT NULL,
  `header` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_logs`
--

INSERT INTO `tbl_logs` (`id`, `from_account_id`, `to_account_id`, `remarks`, `date`, `header`) VALUES
('008451a05e1e7aa32c75119df950d405265e0904', '17ba0791499db908433b80f37c5fbc89b870084b', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Updated title to Inside Sales Associates', '2018-03-24 12:57:29', 'Update'),
('0286dd552c9bea9a69ecb3759e7b94777635514b', '1b6453892473a467d07372d45eb05abc2031647a', 'cb4e5208b4cd87268b208e49452ed6e89a68e0b8', 'bookmarked', '2018-03-23 21:50:19', 'Add'),
('05a8ea5382b9fd885261bb3eed0527d1d3b07262', '17ba0791499db908433b80f37c5fbc89b870084b', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Updated title to Inside Sales Associate', '2018-03-24 12:51:46', 'Update'),
('0716d9708d321ffb6a00818614779e779925365c', 'ac3478d69a3c81fa62e60f5c3696165a4e5e6ac4', '5b384ce32d8cdef02bc3a139d4cac0a22bb029e8', 'bookmarked', '2018-03-23 19:39:37', 'Add'),
('08a35293e09f508494096c1c1b3819edb9df50db', '17ba0791499db908433b80f37c5fbc89b870084b', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Posted a job', '2018-03-24 11:09:40', 'Add'),
('0a57cb53ba59c46fc4b692527a38a87c78d84028', '1b6453892473a467d07372d45eb05abc2031647a', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Deleted skill', '2018-03-23 21:19:19', 'Delete'),
('0ade7c2cf97f75d009975f4d720d1fa6c19f4897', '1b6453892473a467d07372d45eb05abc2031647a', 'b6692ea5df920cad691c20319a6fffd7a4a766b8', 'bookmarked', '2018-03-23 16:47:29', 'Add'),
('0ca9277f91e40054767f69afeb0426711ca0fddd', '17ba0791499db908433b80f37c5fbc89b870084b', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Updated title to Inside Sales Associates', '2018-03-24 12:55:51', 'Update'),
('114d4eefde1dae3983e7a79f04c72feb9a3a7efd', '17ba0791499db908433b80f37c5fbc89b870084b', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Updated title to Inside Sales Associate', '2018-03-24 12:56:49', 'Update'),
('12c6fc06c99a462375eeb3f43dfd832b08ca9e17', 'ac3478d69a3c81fa62e60f5c3696165a4e5e6ac4', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'applied', '2018-03-23 19:54:12', 'Add'),
('12f0de3dc76e067d21ed85125716e02e9f1e69f0', '17ba0791499db908433b80f37c5fbc89b870084b', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Updated Description to <ul><li><span style="color: rgb(153, 51, 255);">Job level - Fresh Grad / Entry Level, Job category - Sales and Marketing, Educational requirement - Graduated from college</span></li><li><span style="color: rgb(153, 51, 255);">Job level - Fresh Grad / Entry Level, Job category - Sales and Marketing, Educational requirement - Graduated from college</span></li><li><span style="color: rgb(153, 51, 255);">Job level - Fresh Grad / Entry Level, Job category - Sales and Marketing, Educational requirement - Graduated from college</span></li><li><span style="color: rgb(153, 51, 255);">Job level - Fresh Grad / Entry Level, Job category - Sales and Marketing, Educational requirement - Graduated from college</span></li></ul>', '2018-03-24 12:40:40', 'Update'),
('1352246e33277e9d3c9090a434fa72cfa6536ae2', 'fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', '77de68daecd823babbb58edb1c8e14d7106e83bb', 'Posted a job', '2018-03-24 10:57:35', 'Add'),
('1574bddb75c78a6fd2251d61e2993b5146201319', 'ac3478d69a3c81fa62e60f5c3696165a4e5e6ac4', 'cb7a1d775e800fd1ee4049f7dca9e041eb9ba083', 'bookmarked', '2018-03-23 19:39:36', 'Add'),
('16b06bd9b738835e2d134fe8d596e9ab0086a985', '17ba0791499db908433b80f37c5fbc89b870084b', 'ac3478d69a3c81fa62e60f5c3696165a4e5e6ac4', 'Posted a job', '2018-03-24 11:06:11', 'Add'),
('17503a6b2326f09fbc4e3a7c03874c7333002038', '17ba0791499db908433b80f37c5fbc89b870084b', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Updated Description to <ul><li><span style="color: rgb(255, 255, 102);">Job level - Fresh Grad / Entry Level, Job category - Sales and Marketing, Educational requirement - Graduated from college</span></li><li><span style="color: rgb(255, 255, 102);">Job level - Fresh Grad / Entry Level, Job category - Sales and Marketing, Educational requirement - Graduated from college</span></li><li><span style="color: rgb(255, 255, 102);">Job level - Fresh Grad / Entry Level, Job category - Sales and Marketing, Educational requirement - Graduated from college</span></li><li><span style="color: rgb(255, 255, 102);">Job level - Fresh Grad / Entry Level, Job category - Sales and Marketing, Educational requirement - Graduated from college</span></li></ul>', '2018-03-24 12:32:00', 'Update'),
('17ba0791499db908433b80f37c5fbc89b870084b', '1b6453892473a467d07372d45eb05abc2031647a', '972a67c48192728a34979d9a35164c1295401b71', 'bookmarked', '2018-03-23 19:22:57', 'Add'),
('1b6453892473a467d07372d45eb05abc2031647a', '1b6453892473a467d07372d45eb05abc2031647a', '1b6453892473a467d07372d45eb05abc2031647a', 'Updated field_number', '2018-03-23 13:04:53', 'Update'),
('1d513c0bcbe33b2e7440e5e14d0b22ef95c9d673', 'fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'Posted a job', '2018-03-24 10:45:59', 'Add'),
('1f1362ea41d1bc65be321c0a378a20159f9a26d0', 'ac3478d69a3c81fa62e60f5c3696165a4e5e6ac4', 'c1dfd96eea8cc2b62785275bca38ac261256e278', 'applied', '2018-03-24 02:41:38', 'Add'),
('215bb47da8fac3342b858ac3db09b033c6c46e0b', '17ba0791499db908433b80f37c5fbc89b870084b', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Updated title to Inside Sales Associatess', '2018-03-24 11:39:21', 'Update'),
('22d200f8670dbdb3e253a90eee5098477c95c23d', '1b6453892473a467d07372d45eb05abc2031647a', '5b384ce32d8cdef02bc3a139d4cac0a22bb029e8', 'bookmarked', '2018-03-23 21:20:04', 'Add'),
('2a2b47bf21a372f267deccbb420567f3d450b3c0', '17ba0791499db908433b80f37c5fbc89b870084b', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Updated status to 1. activate', '2018-03-24 13:14:29', 'Update'),
('2a459380709e2fe4ac2dae5733c73225ff6cfee1', 'fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', 'c1dfd96eea8cc2b62785275bca38ac261256e278', 'Posted a job', '2018-03-24 02:14:13', 'Add'),
('2a7541babb57434e5631ffa2b5639e24f8ce84fc', '17ba0791499db908433b80f37c5fbc89b870084b', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Updated skills to ["Forecasting","Communication"]', '2018-03-24 12:59:52', 'Update'),
('2d0c8af807ef45ac17cafb2973d866ba8f38caa9', '17ba0791499db908433b80f37c5fbc89b870084b', 'c1dfd96eea8cc2b62785275bca38ac261256e278', 'Posted a job', '2018-03-24 11:07:08', 'Add'),
('2e01e17467891f7c933dbaa00e1459d23db3fe4f', '1b6453892473a467d07372d45eb05abc2031647a', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'applied', '2018-03-23 22:01:09', 'Add'),
('310b86e0b62b828562fc91c7be5380a992b2786a', '17ba0791499db908433b80f37c5fbc89b870084b', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Updated salary to 11000 - 12000', '2018-03-24 12:09:47', 'Update'),
('31bd9b9f5f7b338e41b56183a2f3008b541d7c84', '1b6453892473a467d07372d45eb05abc2031647a', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'applied', '2018-03-24 12:02:42', 'Add'),
('356a192b7913b04c54574d18c28d46e6395428ab', '1b6453892473a467d07372d45eb05abc2031647a', '1b6453892473a467d07372d45eb05abc2031647a', 'Updated field_mname', '2018-03-23 12:56:16', 'Update'),
('35e995c107a71caeb833bb3b79f9f54781b33fa1', '1b6453892473a467d07372d45eb05abc2031647a', 'ac3478d69a3c81fa62e60f5c3696165a4e5e6ac4', 'applied', '2018-03-24 02:40:13', 'Add'),
('3c26dffc8a2e8804dfe2c8a1195cfaa5ef6d0014', 'fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', '1b6453892473a467d07372d45eb05abc2031647a', 'Posted a job', '2018-03-24 10:59:15', 'Add'),
('40bd001563085fc35165329ea1ff5c5ecbdbbeef', '17ba0791499db908433b80f37c5fbc89b870084b', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Updated title to Inside Sales Associates', '2018-03-24 12:52:19', 'Update'),
('40f7c01f4189510031adccd9c604a128adaf9b00', '17ba0791499db908433b80f37c5fbc89b870084b', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Updated salary to 12000 - 14000', '2018-03-24 13:09:24', 'Update'),
('450ddec8dd206c2e2ab1aeeaa90e85e51753b8b7', 'ac3478d69a3c81fa62e60f5c3696165a4e5e6ac4', '902ba3cda1883801594b6e1b452790cc53948fda', 'applied', '2018-03-24 02:41:54', 'Add'),
('472b07b9fcf2c2451e8781e944bf5f77cd8457c8', 'ac3478d69a3c81fa62e60f5c3696165a4e5e6ac4', 'cb7a1d775e800fd1ee4049f7dca9e041eb9ba083', 'bookmarked', '2018-03-23 19:47:32', 'Add'),
('4cd66dfabbd964f8c6c4414b07cdb45dae692e19', '17ba0791499db908433b80f37c5fbc89b870084b', '902ba3cda1883801594b6e1b452790cc53948fda', 'Posted a job', '2018-03-24 11:07:48', 'Add'),
('4d134bc072212ace2df385dae143139da74ec0ef', '1b6453892473a467d07372d45eb05abc2031647a', 'da4b9237bacccdf19c0760cab7aec4a8359010b0', 'applied', '2018-03-23 21:06:16', 'Add'),
('4d89d294cd4ca9f2ca57dc24a53ffb3ef5303122', 'fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', '7b52009b64fd0a2a49e6d8a939753077792b0554', 'Posted a job', '2018-03-24 02:17:17', 'Add'),
('511a418e72591eb7e33f703f04c3fa16df6c90bd', '1b6453892473a467d07372d45eb05abc2031647a', '356a192b7913b04c54574d18c28d46e6395428ab', 'applied', '2018-03-24 01:38:12', 'Add'),
('524e05dc77239f3a15dab766aaa59a9e432efde7', '17ba0791499db908433b80f37c5fbc89b870084b', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Updated Description to <ul><li><span style="color: rgb(0, 102, 204);">Job level - Fresh Grad / Entry Level, Job category - Sales and Marketing, Educational requirement - Graduated from college</span></li><li><span style="color: rgb(0, 102, 204);">Job level - Fresh Grad / Entry Level, Job category - Sales and Marketing, Educational requirement - Graduated from college</span></li><li><span style="color: rgb(0, 102, 204);">Job level - Fresh Grad / Entry Level, Job category - Sales and Marketing, Educational requirement - Graduated from college</span></li><li><span style="color: rgb(0, 102, 204);">Job level - Fresh Grad / Entry Level, Job category - Sales and Marketing, Educational requirement - Graduated from college</span></li></ul>', '2018-03-24 12:29:57', 'Update'),
('54ceb91256e8190e474aa752a6e0650a2df5ba37', '1b6453892473a467d07372d45eb05abc2031647a', 'cb4e5208b4cd87268b208e49452ed6e89a68e0b8', 'bookmarked', '2018-03-24 01:36:10', 'Add'),
('56ad4d4deaec98465c419b4a8ea7bfc1ed38c4d9', '17ba0791499db908433b80f37c5fbc89b870084b', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Updated date to 2018-03-24', '2018-03-24 13:11:17', 'Update'),
('59129aacfb6cebbe2c52f30ef3424209f7252e82', 'fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', '17ba0791499db908433b80f37c5fbc89b870084b', 'Posted a job', '2018-03-24 02:15:50', 'Add'),
('5a5b0f9b7d3f8fc84c3cef8fd8efaaa6c70d75ab', '1b6453892473a467d07372d45eb05abc2031647a', '972a67c48192728a34979d9a35164c1295401b71', 'bookmarked', '2018-03-24 01:36:34', 'Add'),
('5b384ce32d8cdef02bc3a139d4cac0a22bb029e8', '1b6453892473a467d07372d45eb05abc2031647a', 'fe2ef495a1152561572949784c16bf23abb28057', 'bookmarked', '2018-03-23 21:23:17', 'Add'),
('5e796e48332af4142b10ca0f86e65d9bfdb05884', '17ba0791499db908433b80f37c5fbc89b870084b', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Updated Description to <ul><li>Job level - Fresh Grad / Entry Level, Job category - Sales and Marketing, Educational requirement - Graduated from college</li><li>Job level - Fresh Grad / Entry Level, Job category - Sales and Marketing, Educational requirement - Graduated from college</li><li>Job level - Fresh Grad / Entry Level, Job category - Sales and Marketing, Educational requirement - Graduated from college</li><li>Job level - Fresh Grad / Entry Level, Job category - Sales and Marketing, Educational requirement - Graduated from college</li></ul>', '2018-03-24 12:32:17', 'Update'),
('601ca99d55f00a2e8e736676b606a4d31d374fdd', '17ba0791499db908433b80f37c5fbc89b870084b', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Updated Description to <ul><li><span style="color: rgb(0, 102, 204);">Job level - Fresh Grad / Entry Level, Job category - Sales and Marketing, Educational requirement - Graduated from college</span></li><li><span style="color: rgb(0, 102, 204);">Job level - Fresh Grad / Entry Level, Job category - Sales and Marketing, Educational requirement - Graduated from college</span></li><li><span style="color: rgb(0, 102, 204);">Job level - Fresh Grad / Entry Level, Job category - Sales and Marketing, Educational requirement - Graduated from college</span></li><li><span style="color: rgb(0, 102, 204);">Job level - Fresh Grad / Entry Level, Job category - Sales and Marketing, Educational requirement - Graduated from college</span></li></ul>', '2018-03-24 12:32:44', 'Update'),
('6216f8a75fd5bb3d5f22b6f9958cdede3fc086c2', '17ba0791499db908433b80f37c5fbc89b870084b', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Updated Description to <ol><li><span style="color: rgb(0, 102, 204);">Job level - Fresh Grad / Entry Level, Job category - Sales and Marketing, Educational requirement - Graduated from college</span></li><li><span style="color: rgb(0, 102, 204);">Job level - Fresh Grad / Entry Level, Job category - Sales and Marketing, Educational requirement - Graduated from college</span></li><li><span style="color: rgb(0, 102, 204);">Job level - Fresh Grad / Entry Level, Job category - Sales and Marketing, Educational requirement - Graduated from college</span></li><li><span style="color: rgb(0, 102, 204);">Job level - Fresh Grad / Entry Level, Job category - Sales and Marketing, Educational requirement - Graduated from college</span></li></ol>', '2018-03-24 12:32:23', 'Update'),
('632667547e7cd3e0466547863e1207a8c0c0c549', '1b6453892473a467d07372d45eb05abc2031647a', 'ca3512f4dfa95a03169c5a670a4c91a19b3077b4', 'bookmarked', '2018-03-23 21:20:07', 'Add'),
('64e095fe763fc62418378753f9402623bea9e227', '1b6453892473a467d07372d45eb05abc2031647a', 'ca3512f4dfa95a03169c5a670a4c91a19b3077b4', 'bookmarked', '2018-03-23 21:59:10', 'Add'),
('667be543b02294b7624119adc3a725473df39885', '1b6453892473a467d07372d45eb05abc2031647a', 'f1f836cb4ea6efb2a0b1b99f41ad8b103eff4b59', 'bookmarked', '2018-03-24 01:36:26', 'Add'),
('683e725c03a87baaad2623231644e944e537acab', '17ba0791499db908433b80f37c5fbc89b870084b', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Updated Description to <p><span style="color: rgb(153, 51, 255);">Job level - Fresh Grad / Entry Level, Job category - Sales and Marketing, Educational requirement - Graduated from college</span></p><p><span style="color: rgb(153, 51, 255);">Job level - Fresh Grad / Entry Level, Job category - Sales and Marketing, Educational requirement - Graduated from college</span></p><p><span style="color: rgb(153, 51, 255);">Job level - Fresh Grad / Entry Level, Job category - Sales and Marketing, Educational requirement - Graduated from college</span></p><p><span style="color: rgb(153, 51, 255);">Job level - Fresh Grad / Entry Level, Job category - Sales and Marketing, Educational requirement - Graduated from college</span></p>', '2018-03-24 12:38:28', 'Update'),
('6c1e671f9af5b46d9c1a52067bdf0e53685674f7', '1b6453892473a467d07372d45eb05abc2031647a', 'ca3512f4dfa95a03169c5a670a4c91a19b3077b4', 'bookmarked', '2018-03-24 01:36:53', 'Add'),
('6fb84aed32facd1299ee1e77c8fd2b1a6352669e', '1b6453892473a467d07372d45eb05abc2031647a', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'bookmarked', '2018-03-24 12:02:04', 'Add'),
('7224f997fc148baa0b7f81c1eda6fcc3fd003db0', '17ba0791499db908433b80f37c5fbc89b870084b', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Updated Description to <ul><li><span style="color: rgb(230, 0, 0);">Job level - Fresh Grad / Entry Level, Job category - Sales and Marketing, Educational requirement - Graduated from college</span></li><li><span style="color: rgb(230, 0, 0);">Job level - Fresh Grad / Entry Level, Job category - Sales and Marketing, Educational requirement - Graduated from college</span></li><li><span style="color: rgb(230, 0, 0);">Job level - Fresh Grad / Entry Level, Job category - Sales and Marketing, Educational requirement - Graduated from college</span></li><li><span style="color: rgb(230, 0, 0);">Job level - Fresh Grad / Entry Level, Job category - Sales and Marketing, Educational requirement - Graduated from college</span></li></ul>', '2018-03-24 12:29:47', 'Update'),
('761f22b2c1593d0bb87e0b606f990ba4974706de', '1b6453892473a467d07372d45eb05abc2031647a', '77de68daecd823babbb58edb1c8e14d7106e83bb', 'applied', '2018-03-23 21:35:01', 'Add'),
('76546f9a641ede2beab506b96df1688d889e629a', 'fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'Posted a job', '2018-03-24 10:52:04', 'Add'),
('7719a1c782a1ba91c031a682a0a2f8658209adbf', '1b6453892473a467d07372d45eb05abc2031647a', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Added Communication skill', '2018-03-23 21:19:30', 'Add'),
('775bc5c30e27f0e562115d136e7f7edbd3cead89', '17ba0791499db908433b80f37c5fbc89b870084b', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Updated Description to <ul><li><span style="color: rgb(153, 51, 255);">Job level - Fresh Grad / Entry Level, Job category - Sales and Marketing, Educational requirement - Graduated from college</span></li><li><span style="color: rgb(153, 51, 255);">Job level - Fresh Grad / Entry Level, Job category - Sales and Marketing, Educational requirement - Graduated from college</span></li><li><span style="color: rgb(153, 51, 255);">Job level - Fresh Grad / Entry Level, Job category - Sales and Marketing, Educational requirement - Graduated from college</span></li><li><span style="color: rgb(153, 51, 255);">Job level - Fresh Grad / Entry Level, Job category - Sales and Marketing, Educational requirement - Graduated from college</span></li></ul>', '2018-03-24 12:42:35', 'Update'),
('77de68daecd823babbb58edb1c8e14d7106e83bb', '1b6453892473a467d07372d45eb05abc2031647a', '1b6453892473a467d07372d45eb05abc2031647a', 'Updated field_address', '2018-03-23 13:04:43', 'Update'),
('78a8efcbaaa1a9a30f9f327aa89d0b6acaaffb03', 'admin_id', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Updated description to <h1><span style="color: rgb(230, 0, 0);">Description<span class="ql-cursor">ï»¿</span></span></h1>', '2018-03-24 12:18:47', 'Update'),
('7b52009b64fd0a2a49e6d8a939753077792b0554', 'ac3478d69a3c81fa62e60f5c3696165a4e5e6ac4', 'ac3478d69a3c81fa62e60f5c3696165a4e5e6ac4', 'Added Web developer skill', '2018-03-23 19:39:00', 'Add'),
('7d7116e23efef7292cad5e6f033d9a962708228c', 'fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', '356a192b7913b04c54574d18c28d46e6395428ab', 'Posted a job', '2018-03-24 10:55:21', 'Add'),
('80e28a51cbc26fa4bd34938c5e593b36146f5e0c', 'admin_id', 'fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', 'Added Juan Tamad as account manager', '2018-03-24 00:52:36', 'Add'),
('812ed4562d3211363a7b813aa9cd2cf042b63bb2', '1b6453892473a467d07372d45eb05abc2031647a', '356a192b7913b04c54574d18c28d46e6395428ab', 'bookmarked', '2018-03-24 12:02:21', 'Add'),
('827bfc458708f0b442009c9c9836f7e4b65557fb', '1b6453892473a467d07372d45eb05abc2031647a', '5b384ce32d8cdef02bc3a139d4cac0a22bb029e8', 'bookmarked', '2018-03-23 21:59:08', 'Add'),
('887309d048beef83ad3eabf2a79a64a389ab1c9f', '1b6453892473a467d07372d45eb05abc2031647a', 'fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', 'Added Engineering skill', '2018-03-23 21:19:03', 'Add'),
('8b7471f4ae0bf59f5f0a425068c05d96f4801b9e', '17ba0791499db908433b80f37c5fbc89b870084b', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Updated title to Inside Sales Associates', '2018-03-24 12:58:21', 'Update'),
('8bd7954c40c1e59a900f71ea3a266732609915b1', '17ba0791499db908433b80f37c5fbc89b870084b', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Updated skills to ["Forecasting","Communication","English Fluency"]', '2018-03-24 12:43:26', 'Update'),
('8e63fd3e77796b102589b1ba1e4441c7982e4132', '17ba0791499db908433b80f37c5fbc89b870084b', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Updated date to 2018-03-23', '2018-03-24 11:39:31', 'Update'),
('8ee51caaa2c2f4ee2e5b4b7ef5a89db7df1068d7', '17ba0791499db908433b80f37c5fbc89b870084b', 'fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', 'Posted a job', '2018-03-24 11:08:45', 'Add'),
('8effee409c625e1a2d8f5033631840e6ce1dcb64', 'admin_id', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Added Matthew West as account manager', '2018-03-24 01:32:46', 'Add'),
('902ba3cda1883801594b6e1b452790cc53948fda', '1b6453892473a467d07372d45eb05abc2031647a', '1b6453892473a467d07372d45eb05abc2031647a', 'Added PHP skill', '2018-03-23 13:07:05', 'Add'),
('91032ad7bbcb6cf72875e8e8207dcfba80173f7c', 'ac3478d69a3c81fa62e60f5c3696165a4e5e6ac4', 'fc074d501302eb2b93e2554793fcaf50b3bf7291', 'bookmarked', '2018-03-23 19:47:29', 'Add'),
('9109c85a45b703f87f1413a405549a2cea9ab556', '1b6453892473a467d07372d45eb05abc2031647a', 'b6692ea5df920cad691c20319a6fffd7a4a766b8', 'bookmarked', '2018-03-24 01:36:16', 'Add'),
('91dfde1d6e005e422f64a59776234f1f4c80b5e4', '17ba0791499db908433b80f37c5fbc89b870084b', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Updated skills to ["Forecasting","Communication"]', '2018-03-24 13:04:22', 'Update'),
('92cfceb39d57d914ed8b14d0e37643de0797ae56', '1b6453892473a467d07372d45eb05abc2031647a', '1b6453892473a467d07372d45eb05abc2031647a', 'applied', '2018-03-23 21:35:21', 'Add'),
('934385f53d1bd0c1b8493e44d0dfd4c8e88a04bb', '17ba0791499db908433b80f37c5fbc89b870084b', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Updated status to 1. remarks', '2018-03-24 12:14:21', 'Update'),
('95e815d1541bf6f358cfffbe66ab3af0d0c09d09', '17ba0791499db908433b80f37c5fbc89b870084b', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Updated skills to ["Forecasting","Communication"]', '2018-03-24 13:05:29', 'Update'),
('972a67c48192728a34979d9a35164c1295401b71', '1b6453892473a467d07372d45eb05abc2031647a', '0286dd552c9bea9a69ecb3759e7b94777635514b', 'bookmarked', '2018-03-23 21:23:11', 'Add'),
('98fbc42faedc02492397cb5962ea3a3ffc0a9243', '1b6453892473a467d07372d45eb05abc2031647a', 'b6692ea5df920cad691c20319a6fffd7a4a766b8', 'bookmarked', '2018-03-23 21:50:21', 'Add'),
('9a79be611e0267e1d943da0737c6c51be67865a0', '17ba0791499db908433b80f37c5fbc89b870084b', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Updated salary to 12000 - 13000', '2018-03-24 12:09:04', 'Update'),
('9e071a3a594a8964cbefe784f8a6afaa94c0de17', '17ba0791499db908433b80f37c5fbc89b870084b', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Updated date to 2018-03-24', '2018-03-24 13:09:39', 'Update'),
('9e6a55b6b4563e652a23be9d623ca5055c356940', 'ac3478d69a3c81fa62e60f5c3696165a4e5e6ac4', 'ca3512f4dfa95a03169c5a670a4c91a19b3077b4', 'bookmarked', '2018-03-23 19:39:39', 'Add'),
('a1422e6a168630cdd214ac5e31ca01ae1bee8d92', '17ba0791499db908433b80f37c5fbc89b870084b', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Updated Description to <ul><li><span style="color: rgb(153, 51, 255);">Job level - Fresh Grad / Entry Level, Job category - Sales and Marketing, Educational requirement - Graduated from college</span></li><li><span style="color: rgb(153, 51, 255);">Job level - Fresh Grad / Entry Level, Job category - Sales and Marketing, Educational requirement - Graduated from college</span></li><li><span style="color: rgb(153, 51, 255);">Job level - Fresh Grad / Entry Level, Job category - Sales and Marketing, Educational requirement - Graduated from college</span></li><li><span style="color: rgb(153, 51, 255);">Job level - Fresh Grad / Entry Level, Job category - Sales and Marketing, Educational requirement - Graduated from college</span></li></ul>', '2018-03-24 12:32:08', 'Update'),
('a17554a0d2b15a664c0e73900184544f19e70227', 'fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', '4d134bc072212ace2df385dae143139da74ec0ef', 'Posted a job', '2018-03-24 02:04:09', 'Add'),
('a2e33d344f272e100d4a8efeabc7ae8a60a8ba7a', '17ba0791499db908433b80f37c5fbc89b870084b', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Updated Description to <p><span style="color: rgb(153, 51, 255);">Job level - Fresh Grad / Entry Level, Job category - Sales and Marketing, Educational requirement - Graduated from college</span></p><p><span style="color: rgb(153, 51, 255);">Job level - Fresh Grad / Entry Level, Job category - Sales and Marketing, Educational requirement - Graduated from college</span></p><p><span style="color: rgb(153, 51, 255);">Job level - Fresh Grad / Entry Level, Job category - Sales and Marketing, Educational requirement - Graduated from college</span></p><p><span style="color: rgb(153, 51, 255);">Job level - Fresh Grad / Entry Level, Job category - Sales and Marketing, Educational requirement - Graduated from college</span></p>', '2018-03-24 12:42:11', 'Update'),
('a72b20062ec2c47ab2ceb97ac1bee818f8b6c6cb', '1b6453892473a467d07372d45eb05abc2031647a', 'cb4e5208b4cd87268b208e49452ed6e89a68e0b8', 'bookmarked', '2018-03-24 02:20:45', 'Add'),
('a9334987ece78b6fe8bf130ef00b74847c1d3da6', '1b6453892473a467d07372d45eb05abc2031647a', '92cfceb39d57d914ed8b14d0e37643de0797ae56', 'bookmarked', '2018-03-23 22:01:45', 'Add'),
('ac3478d69a3c81fa62e60f5c3696165a4e5e6ac4', '1b6453892473a467d07372d45eb05abc2031647a', '1b6453892473a467d07372d45eb05abc2031647a', 'Updated field_bio', '2018-03-23 13:05:31', 'Update'),
('af3e133428b9e25c55bc59fe534248e6a0c0f17b', '1b6453892473a467d07372d45eb05abc2031647a', '77de68daecd823babbb58edb1c8e14d7106e83bb', 'Added Career', '2018-03-23 21:25:38', 'Add'),
('b1d5781111d84f7b3fe45a0852e59758cd7a87e5', '1b6453892473a467d07372d45eb05abc2031647a', 'f1f836cb4ea6efb2a0b1b99f41ad8b103eff4b59', 'bookmarked', '2018-03-23 16:47:34', 'Add'),
('b37f6ddcefad7e8657837d3177f9ef2462f98acf', 'admin_id', '17ba0791499db908433b80f37c5fbc89b870084b', 'Added Matthew West as account manager', '2018-03-24 11:04:10', 'Add'),
('b3f0c7f6bb763af1be91d9e74eabfeb199dc1f1f', 'ac3478d69a3c81fa62e60f5c3696165a4e5e6ac4', '1574bddb75c78a6fd2251d61e2993b5146201319', 'bookmarked', '2018-03-23 19:47:16', 'Add'),
('b4182bff4b3cf75f9e54f4990f9bd153c0c2973c', '17ba0791499db908433b80f37c5fbc89b870084b', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Updated title to Inside Sales Associate', '2018-03-24 12:57:58', 'Update'),
('b4c96d80854dd27e76d8cc9e21960eebda52e962', '1b6453892473a467d07372d45eb05abc2031647a', 'af3e133428b9e25c55bc59fe534248e6a0c0f17b', 'bookmarked', '2018-03-24 02:18:28', 'Add'),
('b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', '1b6453892473a467d07372d45eb05abc2031647a', '1b6453892473a467d07372d45eb05abc2031647a', 'Updated field_fname', '2018-03-23 12:56:10', 'Update'),
('b6692ea5df920cad691c20319a6fffd7a4a766b8', '1b6453892473a467d07372d45eb05abc2031647a', '761f22b2c1593d0bb87e0b606f990ba4974706de', 'bookmarked', '2018-03-23 21:23:07', 'Add'),
('b7103ca278a75cad8f7d065acda0c2e80da0b7dc', '1b6453892473a467d07372d45eb05abc2031647a', 'da4b9237bacccdf19c0760cab7aec4a8359010b0', 'applied', '2018-03-24 02:39:17', 'Add'),
('b74f5ee9461495ba5ca4c72a7108a23904c27a05', 'ac3478d69a3c81fa62e60f5c3696165a4e5e6ac4', '17ba0791499db908433b80f37c5fbc89b870084b', 'applied', '2018-03-24 02:42:12', 'Add'),
('b7eb6c689c037217079766fdb77c3bac3e51cb4c', '1b6453892473a467d07372d45eb05abc2031647a', '761f22b2c1593d0bb87e0b606f990ba4974706de', 'bookmarked', '2018-03-23 22:01:43', 'Add'),
('b888b29826bb53dc531437e723738383d8339b56', 'ac3478d69a3c81fa62e60f5c3696165a4e5e6ac4', '7b52009b64fd0a2a49e6d8a939753077792b0554', 'applied', '2018-03-24 02:42:14', 'Add'),
('bc33ea4e26e5e1af1408321416956113a4658763', '1b6453892473a467d07372d45eb05abc2031647a', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Added  skill', '2018-03-23 21:19:03', 'Add'),
('bd307a3ec329e10a2cff8fb87480823da114f8f4', 'ac3478d69a3c81fa62e60f5c3696165a4e5e6ac4', 'c1dfd96eea8cc2b62785275bca38ac261256e278', 'Added Engineering skill', '2018-03-23 19:39:07', 'Add'),
('be461a0cd1fda052a69c3fd94f8cf5f6f86afa34', 'fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', 'da4b9237bacccdf19c0760cab7aec4a8359010b0', 'Posted a job', '2018-03-24 10:56:33', 'Add'),
('c097638f92de80ba8d6c696b26e6e601a5f61eb7', '1b6453892473a467d07372d45eb05abc2031647a', '1b6453892473a467d07372d45eb05abc2031647a', 'applied', '2018-03-24 02:40:02', 'Add'),
('c1dfd96eea8cc2b62785275bca38ac261256e278', '1b6453892473a467d07372d45eb05abc2031647a', 'da4b9237bacccdf19c0760cab7aec4a8359010b0', 'Added Web Developer skill', '2018-03-23 13:06:56', 'Add'),
('c28aca23f1ef3718a464383d925c66842078edaa', '17ba0791499db908433b80f37c5fbc89b870084b', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Updated status to 1. remarks', '2018-03-24 13:12:21', 'Update'),
('c5b76da3e608d34edb07244cd9b875ee86906328', '1b6453892473a467d07372d45eb05abc2031647a', '0286dd552c9bea9a69ecb3759e7b94777635514b', 'bookmarked', '2018-03-23 22:01:46', 'Add'),
('c66c65175fecc3103b3b587be9b5b230889c8628', 'fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Posted a job', '2018-03-24 02:12:25', 'Add'),
('c8306ae139ac98f432932286151dc0ec55580eca', '17ba0791499db908433b80f37c5fbc89b870084b', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Updated salary to 12000 - 13000', '2018-03-24 12:13:15', 'Update'),
('c9ca442765657fc90e9e779c34d0d2259d2c3c5b', '17ba0791499db908433b80f37c5fbc89b870084b', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Updated status to 0. deactivate\n', '2018-03-24 13:14:00', 'Update'),
('ca3512f4dfa95a03169c5a670a4c91a19b3077b4', '1b6453892473a467d07372d45eb05abc2031647a', '827bfc458708f0b442009c9c9836f7e4b65557fb', 'bookmarked', '2018-03-23 21:23:20', 'Add'),
('cb4e5208b4cd87268b208e49452ed6e89a68e0b8', '1b6453892473a467d07372d45eb05abc2031647a', 'af3e133428b9e25c55bc59fe534248e6a0c0f17b', 'bookmarked', '2018-03-23 21:23:05', 'Add'),
('cb7a1d775e800fd1ee4049f7dca9e041eb9ba083', '1b6453892473a467d07372d45eb05abc2031647a', 'fb644351560d8296fe6da332236b1f8d61b2828a', 'bookmarked', '2018-03-23 21:23:15', 'Add'),
('d02560dd9d7db4467627745bd6701e809ffca6e3', '1b6453892473a467d07372d45eb05abc2031647a', '77de68daecd823babbb58edb1c8e14d7106e83bb', 'applied', '2018-03-24 02:39:53', 'Add'),
('d0e2dbb0bac1917d360aaf52c01a2a4b669e8cdb', '17ba0791499db908433b80f37c5fbc89b870084b', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Updated Description to <ul><li><span style="color: rgb(153, 51, 255);">Job level - Fresh Grad / Entry Level, Job category - Sales and Marketing, Educational requirement - Graduated from college</span></li><li><span style="color: rgb(153, 51, 255);">Job level - Fresh Grad / Entry Level, Job category - Sales and Marketing, Educational requirement - Graduated from college</span></li><li><span style="color: rgb(153, 51, 255);">Job level - Fresh Grad / Entry Level, Job category - Sales and Marketing, Educational requirement - Graduated from college</span></li><li><span style="color: rgb(153, 51, 255);">Job level - Fresh Grad / Entry Level, Job category - Sales and Marketing, Educational requirement - Graduated from college</span></li></ul>', '2018-03-24 12:39:36', 'Update'),
('d30f79cf7fef47bd7a5611719f936539bec0d2e9', '17ba0791499db908433b80f37c5fbc89b870084b', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Updated skills to ["Forecasting","Communication","English Fluency"]', '2018-03-24 13:05:11', 'Update'),
('d321d6f7ccf98b51540ec9d933f20898af3bd71e', 'ac3478d69a3c81fa62e60f5c3696165a4e5e6ac4', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'applied', '2018-03-24 02:42:08', 'Add'),
('d435a6cdd786300dff204ee7c2ef942d3e9034e2', 'ac3478d69a3c81fa62e60f5c3696165a4e5e6ac4', '356a192b7913b04c54574d18c28d46e6395428ab', 'applied', '2018-03-23 19:54:40', 'Add'),
('d54ad009d179ae346683cfc3603979bc99339ef7', 'ac3478d69a3c81fa62e60f5c3696165a4e5e6ac4', 'fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', 'applied', '2018-03-24 02:41:56', 'Add'),
('da4b9237bacccdf19c0760cab7aec4a8359010b0', '1b6453892473a467d07372d45eb05abc2031647a', '1b6453892473a467d07372d45eb05abc2031647a', 'Updated field_lname', '2018-03-23 12:56:22', 'Update'),
('dbc0f004854457f59fb16ab863a3a1722cef553f', '17ba0791499db908433b80f37c5fbc89b870084b', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Updated salary to 13000 - 14000', '2018-03-24 12:12:03', 'Update'),
('e114c448f4ab8554ad14eff3d66dfeb3965ce8fc', '17ba0791499db908433b80f37c5fbc89b870084b', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Updated Description to <ul><li>Job level - Fresh Grad / Entry Level, Job category - Sales and Marketing, Educational requirement - Graduated from college</li><li>Job level - Fresh Grad / Entry Level, Job category - Sales and Marketing, Educational requirement - Graduated from college</li><li>Job level - Fresh Grad / Entry Level, Job category - Sales and Marketing, Educational requirement - Graduated from college</li><li>Job level - Fresh Grad / Entry Level, Job category - Sales and Marketing, Educational requirement - Graduated from college</li></ul>', '2018-03-24 12:29:22', 'Update'),
('e1822db470e60d090affd0956d743cb0e7cdf113', '1b6453892473a467d07372d45eb05abc2031647a', 'af3e133428b9e25c55bc59fe534248e6a0c0f17b', 'bookmarked', '2018-03-23 22:01:41', 'Add'),
('e1a864f0b77f6c89794827a9035355dc8d052622', '17ba0791499db908433b80f37c5fbc89b870084b', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Updated date to 2018-03-22', '2018-03-24 13:10:51', 'Update'),
('e62d7f1eb43d87c202d2f164ba61297e71be80f4', 'admin_id', 'b1d5781111d84f7b3fe45a0852e59758cd7a87e5', 'Added Mark Lopez as account manager', '2018-03-24 11:00:54', 'Add'),
('e6c3dd630428fd54834172b8fd2735fed9416da4', '1b6453892473a467d07372d45eb05abc2031647a', '5b384ce32d8cdef02bc3a139d4cac0a22bb029e8', 'bookmarked', '2018-03-24 01:36:46', 'Add'),
('e794a80eb109162d579df51db6d52e223bb0e9be', '17ba0791499db908433b80f37c5fbc89b870084b', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Updated skills to ["Forecasting","Communication","English Fluency"]', '2018-03-24 13:00:06', 'Update'),
('e993215bfdaa515f6ea00fafc1918f549119f993', '17ba0791499db908433b80f37c5fbc89b870084b', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Updated Description to <ul><li><span style="color: rgb(153, 51, 255);">Job level - Fresh Grad / Entry Level, Job category - Sales and Marketing, Educational requirement - Graduated from college</span></li><li><span style="color: rgb(153, 51, 255);">Job level - Fresh Grad / Entry Level, Job category - Sales and Marketing, Educational requirement - Graduated from college</span></li><li><span style="color: rgb(153, 51, 255);">Job level - Fresh Grad / Entry Level, Job category - Sales and Marketing, Educational requirement - Graduated from college</span></li><li><span style="color: rgb(153, 51, 255);">Job level - Fresh Grad / Entry Level, Job category - Sales and Marketing, Educational requirement - Graduated from college</span></li></ul>', '2018-03-24 12:32:56', 'Update'),
('eb4ac3033e8ab3591e0fcefa8c26ce3fd36d5a0f', 'ac3478d69a3c81fa62e60f5c3696165a4e5e6ac4', 'b1d5781111d84f7b3fe45a0852e59758cd7a87e5', 'applied', '2018-03-24 02:42:10', 'Add'),
('ecb7937db58ec9dea0c47db88463d85e81143032', '17ba0791499db908433b80f37c5fbc89b870084b', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Updated Description to <ul><li><span style="color: rgb(0, 102, 204);">Job level - Fresh Grad / Entry Level, Job category - Sales and Marketing, Educational requirement - Graduated from college</span></li><li><span style="color: rgb(0, 102, 204);">Job level - Fresh Grad / Entry Level, Job category - Sales and Marketing, Educational requirement - Graduated from college</span></li><li><span style="color: rgb(0, 102, 204);">Job level - Fresh Grad / Entry Level, Job category - Sales and Marketing, Educational requirement - Graduated from college</span></li><li><span style="color: rgb(0, 102, 204);">Job level - Fresh Grad / Entry Level, Job category - Sales and Marketing, Educational requirement - Graduated from college</span></li></ul>', '2018-03-24 12:35:46', 'Update'),
('efa6e44dfa0145249be273ecd84a97f534b04920', '17ba0791499db908433b80f37c5fbc89b870084b', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Updated Description to <ul><li><span style="color: rgb(153, 51, 255);">Job level - Fresh Grad / Entry Level, Job category - Sales and Marketing, Educational requirement - Graduated from college</span></li><li><span style="color: rgb(153, 51, 255);">Job level - Fresh Grad / Entry Level, Job category - Sales and Marketing, Educational requirement - Graduated from college</span></li><li><span style="color: rgb(153, 51, 255);">Job level - Fresh Grad / Entry Level, Job category - Sales and Marketing, Educational requirement - Graduated from college</span></li><li><span style="color: rgb(153, 51, 255);">Job level - Fresh Grad / Entry Level, Job category - Sales and Marketing, Educational requirement - Graduated from college</span></li></ul>', '2018-03-24 12:37:17', 'Update'),
('f1abd670358e036c31296e66b3b66c382ac00812', 'ac3478d69a3c81fa62e60f5c3696165a4e5e6ac4', 'fc074d501302eb2b93e2554793fcaf50b3bf7291', 'bookmarked', '2018-03-23 19:39:33', 'Add'),
('f1f836cb4ea6efb2a0b1b99f41ad8b103eff4b59', '1b6453892473a467d07372d45eb05abc2031647a', '92cfceb39d57d914ed8b14d0e37643de0797ae56', 'bookmarked', '2018-03-23 21:23:09', 'Add'),
('f38cfe2e2facbcc742bad63f91ad55637300cb45', '17ba0791499db908433b80f37c5fbc89b870084b', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Updated title to Inside Sales Associate', '2018-03-24 12:53:53', 'Update'),
('f6e1126cedebf23e1463aee73f9df08783640400', '1b6453892473a467d07372d45eb05abc2031647a', 'da4b9237bacccdf19c0760cab7aec4a8359010b0', 'Added Career', '2018-03-23 21:09:55', 'Add'),
('fa35e192121eabf3dabf9f5ea6abdbcbc107ac3b', 'ac3478d69a3c81fa62e60f5c3696165a4e5e6ac4', '902ba3cda1883801594b6e1b452790cc53948fda', 'Added PHP skill', '2018-03-23 19:39:11', 'Add'),
('fa755791d0509bb06ae715a2072de724815ed84d', '17ba0791499db908433b80f37c5fbc89b870084b', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Updated Short Description to Job level - Fresh Grad / Entry Level, Job category - Sales and Marketing, Educational requirement - Graduated from colleges', '2018-03-24 13:12:08', 'Update'),
('fb644351560d8296fe6da332236b1f8d61b2828a', '1b6453892473a467d07372d45eb05abc2031647a', 'f1f836cb4ea6efb2a0b1b99f41ad8b103eff4b59', 'bookmarked', '2018-03-23 21:50:22', 'Add'),
('fc074d501302eb2b93e2554793fcaf50b3bf7291', '1b6453892473a467d07372d45eb05abc2031647a', '98fbc42faedc02492397cb5962ea3a3ffc0a9243', 'bookmarked', '2018-03-23 21:23:13', 'Add'),
('fe2ef495a1152561572949784c16bf23abb28057', '1b6453892473a467d07372d45eb05abc2031647a', '972a67c48192728a34979d9a35164c1295401b71', 'bookmarked', '2018-03-23 21:59:06', 'Add'),
('fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', '1b6453892473a467d07372d45eb05abc2031647a', 'cb4e5208b4cd87268b208e49452ed6e89a68e0b8', 'bookmarked', '2018-03-23 16:47:25', 'Add');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_personalinfo`
--

CREATE TABLE `tbl_personalinfo` (
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
  `date` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_personalinfo`
--

INSERT INTO `tbl_personalinfo` (`id`, `given_name`, `family_name`, `middle_name`, `gender`, `date_of_birth`, `permanent_address`, `citizenship`, `phone`, `height`, `weight`, `religion`, `picture`, `date`) VALUES
('1b6453892473a467d07372d45eb05abc2031647a', 'Jonathan', 'Millet', 'Binalay', '', '', 'Poblacion, Labrador, Pangasinan', '', '0909060528', '', '', '', '', '2018-03-06 12:08:26'),
('356a192b7913b04c54574d18c28d46e6395428ab', 'Rufo', 'Gabrillo Jr.', 'middle name', 'Male', '1/26/1993', '#117 Macabito Calasiao Pangasinan', 'Filipino', '0948-499-3058', '165', '53', 'Filipino', 'http://graph.facebook.com/1695213090568737/picture?type=large', '2018-02-20 14:33:57'),
('77de68daecd823babbb58edb1c8e14d7106e83bb', 'James', 'Reid', NULL, '', '', '', '', '', '', '', '', '', '2018-03-06 08:13:08'),
('ac3478d69a3c81fa62e60f5c3696165a4e5e6ac4', 'Elvin', 'Abalos', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'profile.png', '2018-03-23 19:38:28'),
('adsf123456', 'Christian', 'Fajardo', 'Aquino', 'Male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'Rufo', 'Gabrillo', NULL, '', '', '', '', '', '', '', '', '', '2018-02-20 10:05:48'),
('da4b9237bacccdf19c0760cab7aec4a8359010b0', 'Rufo Jr', 'Gabrillo Jr.', 'N.', '', '1993-01-26', '#117 Macabito Calasiao, Pangasinan', '', '0948-499-3958 | 0948-499-3958', '', '', '', 'https://lh5.googleusercontent.com/-h-QNWKxPuNw/AAAAAAAAAAI/AAAAAAAAAAs/UEzHjTUm8Oo/s96-c/photo.jpg', '2018-02-20 15:00:59');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_skills`
--

CREATE TABLE `tbl_skills` (
  `id` varchar(60) NOT NULL,
  `applicant_id` varchar(50) NOT NULL,
  `skill` varchar(60) DEFAULT NULL,
  `level` varchar(20) DEFAULT NULL,
  `date` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_skills`
--

INSERT INTO `tbl_skills` (`id`, `applicant_id`, `skill`, `level`, `date`) VALUES
('0ade7c2cf97f75d009975f4d720d1fa6c19f4897', '1b6453892473a467d07372d45eb05abc2031647a', 'Communication', '1', '2018-03-23 21:19:30'),
('1b6453892473a467d07372d45eb05abc2031647a', '1b6453892473a467d07372d45eb05abc2031647a', 'PHP', '1', '2018-03-23 13:07:05'),
('356a192b7913b04c54574d18c28d46e6395428ab', 'da4b9237bacccdf19c0760cab7aec4a8359010b0', 'Hello world', '1', '2018-03-09 08:32:34'),
('77de68daecd823babbb58edb1c8e14d7106e83bb', 'da4b9237bacccdf19c0760cab7aec4a8359010b0', 'Sapnu Puas', '1', '2018-03-09 08:33:58'),
('902ba3cda1883801594b6e1b452790cc53948fda', 'ac3478d69a3c81fa62e60f5c3696165a4e5e6ac4', 'PHP', '1', '2018-03-23 19:39:11'),
('ac3478d69a3c81fa62e60f5c3696165a4e5e6ac4', 'ac3478d69a3c81fa62e60f5c3696165a4e5e6ac4', 'Web developer', '1', '2018-03-23 19:39:00'),
('b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'da4b9237bacccdf19c0760cab7aec4a8359010b0', 'Web Developer', '1', '2018-03-08 23:48:53'),
('c1dfd96eea8cc2b62785275bca38ac261256e278', 'ac3478d69a3c81fa62e60f5c3696165a4e5e6ac4', 'Engineering', '1', '2018-03-23 19:39:06'),
('da4b9237bacccdf19c0760cab7aec4a8359010b0', '1b6453892473a467d07372d45eb05abc2031647a', 'Web Developer', '1', '2018-03-23 13:06:56'),
('fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', '1b6453892473a467d07372d45eb05abc2031647a', 'Engineering', '1', '2018-03-23 21:19:03');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_vacancies`
--

CREATE TABLE `tbl_vacancies` (
  `id` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `employer_id` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `business_id` varchar(70) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `short_description` text COLLATE utf8mb4_unicode_ci,
  `description` text COLLATE utf8mb4_unicode_ci,
  `vacancy_date` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `job_title` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `skills` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `salary_min` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `salary_max` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` int(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_vacancies`
--

INSERT INTO `tbl_vacancies` (`id`, `employer_id`, `business_id`, `short_description`, `description`, `vacancy_date`, `job_title`, `skills`, `salary_min`, `salary_max`, `date`, `status`) VALUES
('0ade7c2cf97f75d009975f4d720d1fa6c19f4897', '17ba0791499db908433b80f37c5fbc89b870084b', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Job level - Fresh Grad / Entry Level, Job category - Sales and Marketing, Educational requirement - Graduated from colleges', '<ul><li><span style="color: rgb(153, 51, 255);">Job level - Fresh Grad / Entry Level, Job category - Sales and Marketing, Educational requirement - Graduated from college</span></li><li><span style="color: rgb(153, 51, 255);">Job level - Fresh Grad / Entry Level, Job category - Sales and Marketing, Educational requirement - Graduated from college</span></li><li><span style="color: rgb(153, 51, 255);">Job level - Fresh Grad / Entry Level, Job category - Sales and Marketing, Educational requirement - Graduated from college</span></li><li><span style="color: rgb(153, 51, 255);">Job level - Fresh Grad / Entry Level, Job category - Sales and Marketing, Educational requirement - Graduated from college</span></li></ul>', '2018-03-24', 'Inside Sales Associates', '["Forecasting","Communication"]', '12000', '14000', '2018-03-24 11:09:40', 1),
('1b6453892473a467d07372d45eb05abc2031647a', 'fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Job level - Fresh Grad / Entry Level, Job category - Accounting and Finance, Educational requirement - Graduated from college', '<p>Job level - Fresh Grad / Entry Level, Job category - Accounting and Finance, Educational requirement - Graduated from college</p><p>Job level - Fresh Grad / Entry Level, Job category - Accounting and Finance, Educational requirement - Graduated from college</p><p>Job level - Fresh Grad / Entry Level, Job category - Accounting and Finance, Educational requirement - Graduated from collegeJob level - Fresh Grad / Entry Level, Job category - Accounting and Finance, Educational requirement - Graduated from college</p>', '2018-03-24', 'Accounts Receivable Officer', '["Accounting","MS Excel","TEam Player"]', '20000', '30000', '2018-03-24 10:59:15', 1),
('356a192b7913b04c54574d18c28d46e6395428ab', 'fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Job level - Mid-Senior Level / Manager, Job category - Accounting and Finance, Educational requirement - Graduated from college', '<p>Job level - Mid-Senior Level / Manager, Job category - Accounting and Finance, Educational requirement - Graduated from college</p><p>Job level - Mid-Senior Level / Manager, Job category - Accounting and Finance, Educational requirement - Graduated from college</p><p>Job level - Mid-Senior Level / Manager, Job category - Accounting and Finance, Educational requirement - Graduated from college</p><p>Job level - Mid-Senior Level / Manager, Job category - Accounting and Finance, Educational requirement - Graduated from college</p><p>Job level - Mid-Senior Level / Manager, Job category - Accounting and Finance, Educational requirement - Graduated from college</p>', '2018-03-24', 'Bank and Client Relationship Manager', '["CRM","Problem-solving","Leadership","Communication"]', '12000', '13000', '2018-03-24 10:55:21', 1),
('77de68daecd823babbb58edb1c8e14d7106e83bb', 'fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Job level - Mid-Senior Level / Manager, Job category - Human Resources, Educational requirement - Graduated from college', '<p>Job level - Mid-Senior Level / Manager, Job category - Human Resources, Educational requirement - Graduated from college</p><p>Job level - Mid-Senior Level / Manager, Job category - Human Resources, Educational requirement - Graduated from college</p><p>Job level - Mid-Senior Level / Manager, Job category - Human Resources, Educational requirement - Graduated from college</p><p>Job level - Mid-Senior Level / Manager, Job category - Human Resources, Educational requirement - Graduated from college</p><p><br></p>', '2018-03-24', 'HR Manager', '["work under presssure","Flexibility","Team Player"]', '12000', '14000', '2018-03-24 10:57:35', 1),
('902ba3cda1883801594b6e1b452790cc53948fda', '17ba0791499db908433b80f37c5fbc89b870084b', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Job level - Mid-Senior Level / Manager, Job category - Legal, Educational requirement - Graduated from college', '<p>Job level - Mid-Senior Level / Manager, Job category - Legal, Educational requirement - Graduated from college</p><p>Job level - Mid-Senior Level / Manager, Job category - Legal, Educational requirement - Graduated from college</p><p>Job level - Mid-Senior Level / Manager, Job category - Legal, Educational requirement - Graduated from college</p>', '2018-03-24', 'Compliance Officer', '["Lawyer","Banking"]', '20000', '50000', '2018-03-24 11:07:48', 1),
('ac3478d69a3c81fa62e60f5c3696165a4e5e6ac4', '17ba0791499db908433b80f37c5fbc89b870084b', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'sapien urna lectus vestibulum in mauris ante congue natoque etiam delectus interdum consectetuer facilisis ipsum sodales rutrum cursus lectus elit id ac et quis urna adipiscing nonummy ut aliquam feugiat per amet wisi dolor tristique tellus eu scelerisque sit non proin nibh neque luctus culpa maecenas ornare tincidunt id orci sodales integer etiam sed est cras ante', '<p>sapien urna lectus vestibulum in mauris ante congue natoque etiam delectus interdum consectetuer facilisis ipsum sodales rutrum cursus lectus elit id ac et quis urna adipiscing nonummy ut aliquam feugiat per amet wisi dolor tristique tellus eu scelerisque sit non proin nibh neque luctus culpa maecenas ornare tincidunt id orci sodales integer etiam sed est cras ante pulvinar semper integer faucibus et maiores vestibulum sodales vestibulum accumsan amet cras accumsan risus elit phasellus vel duis&nbsp;</p><p>sapien urna lectus vestibulum in mauris ante congue natoque etiam delectus interdum consectetuer facilisis ipsum sodales rutrum cursus lectus elit id ac et quis urna adipiscing nonummy ut aliquam feugiat per amet wisi dolor tristique tellus eu scelerisque sit non proin nibh neque luctus culpa maecenas ornare tincidunt id orci sodales integer etiam sed est cras ante pulvinar semper integer faucibus et maiores vestibulum sodales vestibulum accumsan amet cras accumsan risus elit phasellus vel duis</p>', '2018-03-24', 'Front-End Developer', '["PHP","Jquery","HTML","CSS"]', '30000', '40000', '2018-03-24 11:06:11', 1),
('b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Job level - Associate / Supervisor, Job category - Sales and Marketing, Educational requirement - Graduated from collegea', '<p>&lt;ul&gt;&lt;li&gt;Support the Sales Manager in building plans to deliver against sales objectives.&lt;/li&gt;&lt;li&gt;Lead the development and maintenance of the on trade outlet database with a focus on hotels, restaurants and high-end bars.&lt;/li&gt;&lt;li&gt;Develop and follow an efficient calling cycle with the national distributor on premise team.&lt;/li&gt;&lt;li&gt;Maximize distribution and stock pressure in target outlets.&lt;/li&gt;&lt;li&gt;Establish sustainable relationship with key customers&lt;/li&gt;&lt;li&gt;Monitor visibility and ensure stand out with a focus on key accounts.&lt;/li&gt;&lt;li&gt;Coordinate with Marketing and Trade Marketing teams to develop targeted and cost effective promotional and visibility tools.&lt;/li&gt;&lt;li&gt;Conduct regular alignment meetings with the national distributor sales, marketing, trade marketing teams and promotional teams to effectively communicate product updates, new strategies and business development programs.&lt;/li&gt;&lt;li&gt;Ensure that commercial and/or brand building objectives are fully leveraged in all existing contract</p>', '2018-03-24', 'Key Accounts Executive', '["Presentation","Negotiation","English Fluency"]', '20000', '30000', '2018-03-24 10:52:04', 1),
('c1dfd96eea8cc2b62785275bca38ac261256e278', '17ba0791499db908433b80f37c5fbc89b870084b', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Job level - Mid-Senior Level / Manager, Job category - Manufacturing and Production, Educational requirement - Graduated from college', '<p>Job level - Mid-Senior Level / Manager, Job category - Manufacturing and Production, Educational requirement - Graduated from college</p><p>Job level - Mid-Senior Level / Manager, Job category - Manufacturing and Production, Educational requirement - Graduated from college</p><p>Job level - Mid-Senior Level / Manager, Job category - Manufacturing and Production, Educational requirement - Graduated from college</p><p>Job level - Mid-Senior Level / Manager, Job category - Manufacturing and Production, Educational requirement - Graduated from college</p>', '2018-03-24', 'Procurement Manager', '["Business Administration","Engineering","Negotiation"]', '20000', '300000', '2018-03-24 11:07:08', 1),
('da4b9237bacccdf19c0760cab7aec4a8359010b0', 'fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Job level - Associate / Supervisor, Job category - Management and Consultancy, Educational requirement - Graduated from college', '<p>Job level - Associate / Supervisor, Job category - Management and Consultancy, Educational requirement - Graduated from college</p><p>Job level - Associate / Supervisor, Job category - Management and Consultancy, Educational requirement - Graduated from college</p><p>Job level - Associate / Supervisor, Job category - Management and Consultancy, Educational requirement - Graduated from college</p><p>Job level - Associate / Supervisor, Job category - Management and Consultancy, Educational requirement - Graduated from college</p>', '2018-03-24', 'Sales Analyst', '["Accounting","writing","Communication"]', '13000', '15000', '2018-03-24 10:56:33', 1),
('fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', '17ba0791499db908433b80f37c5fbc89b870084b', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>', '2018-03-24', 'Customer Support', '["Communiction","Fluency in speaking"]', '20000', '21000', '2018-03-24 11:08:45', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_acadinfo`
--
ALTER TABLE `tbl_acadinfo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `applicant_id` (`applicant_id`);

--
-- Indexes for table `tbl_admin`
--
ALTER TABLE `tbl_admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_applicant`
--
ALTER TABLE `tbl_applicant`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_application`
--
ALTER TABLE `tbl_application`
  ADD PRIMARY KEY (`id`),
  ADD KEY `applicant_id` (`applicant_id`),
  ADD KEY `vacancy_id` (`vacancy_id`);

--
-- Indexes for table `tbl_bookmark`
--
ALTER TABLE `tbl_bookmark`
  ADD PRIMARY KEY (`id`),
  ADD KEY `applicant_id` (`applicant_id`);

--
-- Indexes for table `tbl_business`
--
ALTER TABLE `tbl_business`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_businessmanagers`
--
ALTER TABLE `tbl_businessmanagers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `business_id` (`business_id`);

--
-- Indexes for table `tbl_career`
--
ALTER TABLE `tbl_career`
  ADD PRIMARY KEY (`id`),
  ADD KEY `applicant_id` (`applicant_id`);

--
-- Indexes for table `tbl_logs`
--
ALTER TABLE `tbl_logs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_personalinfo`
--
ALTER TABLE `tbl_personalinfo`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_skills`
--
ALTER TABLE `tbl_skills`
  ADD PRIMARY KEY (`id`),
  ADD KEY `applicant_id` (`applicant_id`);

--
-- Indexes for table `tbl_vacancies`
--
ALTER TABLE `tbl_vacancies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `employer_id` (`employer_id`),
  ADD KEY `employer_id_2` (`employer_id`),
  ADD KEY `business_id` (`business_id`);
ALTER TABLE `tbl_vacancies` ADD FULLTEXT KEY `skills` (`skills`);
ALTER TABLE `tbl_vacancies` ADD FULLTEXT KEY `job_title` (`job_title`);
ALTER TABLE `tbl_vacancies` ADD FULLTEXT KEY `skills_2` (`skills`,`job_title`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
