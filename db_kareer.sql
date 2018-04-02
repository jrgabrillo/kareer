-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 02, 2018 at 01:03 PM
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
  `id` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `applicant_id` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `level` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `schoolattended` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `degree` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'BASIC EDUCATION/DEGREE/COURSE',
  `highestlevel` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'HIGHEST LEVEL/UNITS EARNED',
  `yearenrolled` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `yeargraduated` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_acadinfo`
--

INSERT INTO `tbl_acadinfo` (`id`, `applicant_id`, `level`, `schoolattended`, `degree`, `highestlevel`, `yearenrolled`, `yeargraduated`, `date`) VALUES
('356a192b7913b04c54574d18c28d46e6395428ab', '1b6453892473a467d07372d45eb05abc2031647a', 'Elementary', 'Bongalon Elementary School', 'null', 'null', '2003', '2009', '2018-03-26 21:08:47'),
('77de68daecd823babbb58edb1c8e14d7106e83bb', '1b6453892473a467d07372d45eb05abc2031647a', 'College', 'Pangasinan State University Lingayen Campus', 'Bachelor of Science in Computer Science', '200', '2013', '2017', '2018-03-26 21:10:43'),
('b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'da4b9237bacccdf19c0760cab7aec4a8359010b0', 'Elementary', 'Macabito Calasiao Pangasinan', 'null', 'null', '2000', '2006', '2018-03-10 19:23:51'),
('da4b9237bacccdf19c0760cab7aec4a8359010b0', '1b6453892473a467d07372d45eb05abc2031647a', 'High School', 'Labrador National High School', 'null', 'null', '2009', '2013', '2018-03-26 21:09:20');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_admin`
--

CREATE TABLE `tbl_admin` (
  `id` varchar(50) CHARACTER SET latin1 COLLATE latin1_general_cs NOT NULL,
  `fname` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lname` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(60) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `username` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `level` varchar(1) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(70) CHARACTER SET latin1 COLLATE latin1_general_cs DEFAULT NULL,
  `status` int(11) NOT NULL
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

CREATE TABLE `tbl_applicant` (
  `id` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(60) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `auth_type` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'fb,google,organic',
  `auth_id` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'account id',
  `status` varchar(1) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
  `id` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `vacancy_id` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `applicant_id` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(1) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '0=declined;1=level 1; 2=level 2; 3=level 3; 4=hired; 5=pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_application`
--

INSERT INTO `tbl_application` (`id`, `vacancy_id`, `applicant_id`, `date`, `status`) VALUES
('ac3478d69a3c81fa62e60f5c3696165a4e5e6ac4', 'fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', 'ac3478d69a3c81fa62e60f5c3696165a4e5e6ac4', '2018-03-26 19:18:23', '5'),
('b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', '77de68daecd823babbb58edb1c8e14d7106e83bb', '1b6453892473a467d07372d45eb05abc2031647a', '2018-03-26 16:29:16', '5'),
('c1dfd96eea8cc2b62785275bca38ac261256e278', '356a192b7913b04c54574d18c28d46e6395428ab', 'ac3478d69a3c81fa62e60f5c3696165a4e5e6ac4', '2018-03-26 19:18:30', '5'),
('da4b9237bacccdf19c0760cab7aec4a8359010b0', '902ba3cda1883801594b6e1b452790cc53948fda', '1b6453892473a467d07372d45eb05abc2031647a', '2018-03-26 16:29:24', '3');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_bookmark`
--

CREATE TABLE `tbl_bookmark` (
  `id` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `vacancy_id` varchar(60) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `applicant_id` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` varchar(60) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(60) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_bookmark`
--

INSERT INTO `tbl_bookmark` (`id`, `vacancy_id`, `applicant_id`, `date`, `status`) VALUES
('356a192b7913b04c54574d18c28d46e6395428ab', 'c1dfd96eea8cc2b62785275bca38ac261256e278', '1b6453892473a467d07372d45eb05abc2031647a', '2018-03-24 12:02:20', '1'),
('b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'ac3478d69a3c81fa62e60f5c3696165a4e5e6ac4', '1b6453892473a467d07372d45eb05abc2031647a', '2018-03-24 12:02:04', '1'),
('da4b9237bacccdf19c0760cab7aec4a8359010b0', '356a192b7913b04c54574d18c28d46e6395428ab', '1b6453892473a467d07372d45eb05abc2031647a', '2018-03-24 13:40:58', '1');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_business`
--

CREATE TABLE `tbl_business` (
  `id` varchar(70) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(300) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `contact_number` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `company_name` varchar(300) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `image` varchar(70) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(1) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `others` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_business`
--

INSERT INTO `tbl_business` (`id`, `address`, `contact_number`, `company_name`, `description`, `image`, `email`, `status`, `others`, `date`) VALUES
('0716d9708d321ffb6a00818614779e779925365c', 'Philippines - National Capital Reg - Pasig City - San Miguel Avenue   ', '02-3100780', 'GOETU Infotech Solutions Inc.', '<p><span style="color: rgb(34, 34, 34);">, formerly known as GO3 Infotech Solutions Inc., is a Local Based technology company that provides services to customers requiring solutions of website development and payment gateway such as POS terminals, and applications.&nbsp; The company also support the technology being developed to clients here and abroad, and has been iin the industry of Information Technology for a period of Four (4) years and is now growing and expanding its operations.</span></p>', NULL, 'goetu@gmail.com', '1', NULL, '2018-03-26 13:19:00'),
('0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Business Address', '09123456789', 'Tech Corps', '<h4><span style="color: rgb(230, 0, 0);">Descriptionï»¿</span></h4>', 'business_1519974506.rnr', 'info@techcorp.com', '1', NULL, '2018-02-26 17:03:25'),
('1', 'Las Vegas Street Lingayen', '090101010101', 'Rufo Cocorp Inc.', '<h2><span style="color: rgb(230, 0, 0);">Description</span></h2><p><strong style="color: rgb(255, 153, 0);">Hello world</strong></p><p><em style="color: rgb(255, 255, 0);">Hello world</em></p><p><u style="color: rgb(0, 138, 0);">Hello world</u></p><p><s style="color: rgb(0, 102, 204);">Hello world</s></p><ol><li><span style="color: rgb(194, 133, 255);">Hello world</span></li></ol><p><span style="color: rgb(153, 51, 255);">H</span><sup style="color: rgb(153, 51, 255);">ello world</sup></p><p>ha</p><h2><sup class="ql-font-monospace" style="color: rgb(153, 51, 255);">hello world</sup></h2><p><span style="color: rgb(255, 255, 255); background-color: rgb(0, 0, 0);">0010001000101010100010</span></p><p><span style="color: rgb(255, 255, 255); background-color: rgb(0, 0, 0);">0010001000101010100010</span></p><p>Hhahahah</p><p><br></p><p>check again</p><p><span style="color: rgb(255, 255, 255); background-color: rgb(0, 0, 0);">check</span></p>', 'business_1519982947.rnr', 'rufo@email.com', '1', '', ''),
('1574bddb75c78a6fd2251d61e2993b5146201319', '#11 San Antonio St. Brgy Kaptiolyo Pasig City', '3506885', 'Halcyon Digital Media Design Inc.', '<p><span style="color: rgb(34, 34, 34);">We\'re a Philippines based web design, mobile app devlopement, software development, and graphics design company. Our clients range from small businesses to large corporations, both in the Philippines and internationally. We have a number of Government projects at the moment.</span></p>', NULL, 'halcyon@gmail.com', '1', NULL, '2018-03-26 12:23:43'),
('17ba0791499db908433b80f37c5fbc89b870084b', 'Business Address', 'Number', 'Name', NULL, NULL, 'email@email.com', '1', NULL, '2018-02-26 17:14:18'),
('1b6453892473a467d07372d45eb05abc2031647a', 'Lingayen', '0912334455671 ', 'Gabrillo Enterprise 1', 'Tubig kayo dyan', 'business_1519964158.rnr', 'rufongabrillojr@gmail.com', '1', '', ''),
('356a192b7913b04c54574d18c28d46e6395428ab', '', '', 'Gabrillo Enterprisess 1', '', 'business_1519963774.rnr', 'rufogabrillo@gmail.com', '1', '', ''),
('77de68daecd823babbb58edb1c8e14d7106e83bb', '', '', 'Gabrillo Enterprises', '', '77de68daecd823babbb58edb1c8e14d7106e83bb-1507300053.apr', 'rufo.gabrillo2@gmail.com', '1', '', ''),
('7b52009b64fd0a2a49e6d8a939753077792b0554', 'Business Address', 'Number', 'Name', NULL, NULL, 'email@email.com', '1', NULL, '2018-02-26 17:14:19'),
('902ba3cda1883801594b6e1b452790cc53948fda', NULL, NULL, 'Great Company', NULL, 'profile_avatar.jpg', 'gc@gmail.com', '0', '', ''),
('91032ad7bbcb6cf72875e8e8207dcfba80173f7c', 'Philippines - National Capital Reg - Mandaluyong City   ', '123456', 'Quaerito Qualitas Inc.  (Q2 HR Solutions)', '<p><span style="color: rgb(34, 34, 34);">Q2 specialises in Executive &amp; Professional Search as well as HR Outsourcing &amp; Recruitment Process Outsourcing, Learning &amp; Organisational Development, Services whilst providing top multinational and regional organisations with peace of mind through integrated business solutions. Q2 also works together with Allied Business Partners to provide clients with valuable solutions such as Job Contracting, Background Verification, Philippine Business Tours, and Assessments Services.</span></p>', NULL, 'quarito@gmail.com', '1', NULL, '2018-03-26 16:19:15'),
('9e6a55b6b4563e652a23be9d623ca5055c356940', 'Level 2, 6780 building Ayala Avenue, Makati City', '123456', 'Emapta', NULL, NULL, 'emapta@gmail.com', '1', NULL, '2018-03-26 13:57:43'),
('ac3478d69a3c81fa62e60f5c3696165a4e5e6ac4', 'Lingayen', '0999', 'Kopiko', 'Coffee', 'profile_avatar.jpg', 'kopiko@gmail.com', '0', '', ''),
('b1d5781111d84f7b3fe45a0852e59758cd7a87e5', 'Business Address', 'Number', 'Name', NULL, NULL, 'email@email.com', '1', NULL, '2018-02-26 17:03:30'),
('b3f0c7f6bb763af1be91d9e74eabfeb199dc1f1f', 'Unit 1001 10/F 139 Corporate Center 139 Valero Street Bel-Air Makati City', '8333371', 'Nityo Infotech Services', '<p><span style="color: rgb(34, 34, 34);">. (www.nityo.com) is a US head-quartered IT services company having operations in 17 countries with 27 offices across the globe including US, Europe and Asia.</span></p>', NULL, 'nityo@gmail.com', '1', NULL, '2018-03-26 14:57:16'),
('b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'Poblacion East, Calasiao Pangasinan', '09484993958', 'asdsdsds', 'This is Description', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c-1507518045.apr', 'emp123', '1', '', ''),
('bd307a3ec329e10a2cff8fb87480823da114f8f4', 'Business Address', 'number', 'Company Name', NULL, NULL, 'email@email.com', '1', NULL, '2018-02-26 17:14:51'),
('c1dfd96eea8cc2b62785275bca38ac261256e278', NULL, NULL, 'e-Machines', NULL, 'profile_avatar.jpg', 'emach@gmail.com', '1', '', ''),
('da4b9237bacccdf19c0760cab7aec4a8359010b0', 'Dagupan', '09', 'Boneless Bangus', 'Walang tinik', 'da4b9237bacccdf19c0760cab7aec4a8359010b0-1507913543.apr', 'bone@gmail.com', '1', '', ''),
('f1abd670358e036c31296e66b3b66c382ac00812', '4th Floor Globe Telecom Plaza, Pioneer Street, Mandaluyong', '123456', 'Asticom Technology Inc', '<p><span style="color: rgb(34, 34, 34);">(ASTICOM) is an HR solutions company established in March 2015. Previously part of the Ayala group of companies,&nbsp; its services include Recruitment Services, Payroll Administration and Management and Outsourcing.&nbsp;&nbsp; We provide talents in the following talent segments: Sales, Marketing, Finance and Admin.</span></p>', NULL, 'asticom@gmail.com', '1', NULL, '2018-03-26 09:43:55'),
('fa35e192121eabf3dabf9f5ea6abdbcbc107ac3b', '1605 16th Floor Tower One and Exchange Plaza, Ayala Triange, Ayala Avenue, Bel-Air, Makati City 1226 Philippines', '8317600', 'RGP (HONGKONG) - PH', '<p><span style="color: rgb(34, 34, 34); background-color: rgb(230, 0, 0);">RGP is a multinational professional services firm that helps business leaders execute internal initiatives. Partnering with business leaders, we drive internal change across all parts of a global enterprise </span><span style="color: rgb(34, 34, 34);">- accounting; finance; governance, risk and compliance; corporate advisory, strategic communications, and restructuring; information management; human capital; supply chain management; healthcare solutions; and legal and regulatory. RGP was founded in 1996 within a Big Four accounting firm in the USA.&nbsp;Today, we are a publicly traded company (NASDAQ: RECN) with over 3,400 professional, annually serving over 1,700 clients around the world from 68 practice offices.&nbsp;Headquartered in Irvine, California, RGP has served 87 of the Fortune 100 companies.&nbsp;RGP has an office in the Philippines since 2013.</span></p>', NULL, 'Rgp@gmail.com', '1', NULL, '2018-03-26 08:04:30'),
('fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', 'address', 'number', 'RNR Corp.', NULL, NULL, 'email@email.com', '1', NULL, '2018-02-26 16:59:52'),
('pHilMont123', 'Manaoag', '09481234567', 'PhilMont', 'beauty products', 'pHilMont123-1458551347.apr', 'donaldduck@gmail.com', '1', '', ''),
('ToyotaCars', 'Calasiao, Pangasinan', '09129837641', 'Toyota ', 'Cars and Vehicle for you and Me. Forever.', 'toyota.jpg', 'richardMercy@gmail.com', '1', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_businessmanagers`
--

CREATE TABLE `tbl_businessmanagers` (
  `id` varchar(70) COLLATE utf8mb4_unicode_ci NOT NULL,
  `business_id` varchar(70) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(300) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(300) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(70) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `picture` varchar(70) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `position` varchar(300) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(1) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_businessmanagers`
--

INSERT INTO `tbl_businessmanagers` (`id`, `business_id`, `name`, `email`, `password`, `picture`, `position`, `date`, `status`) VALUES
('0a57cb53ba59c46fc4b692527a38a87c78d84028', '9e6a55b6b4563e652a23be9d623ca5055c356940', 'jay quinto', 'jayquinto@gmail.com', '$2y$11$1bcBf//vsuzhVKZqJnFTI.9.tKUv73mU3LqOtgebewape65YKOeee', NULL, 'Sales Assistant', '2018-03-26 13:59:01', '1'),
('0ade7c2cf97f75d009975f4d720d1fa6c19f4897', '1', 'Matthew West', 'matt@gmail.com', '$2y$11$8s2FPM2DZAJtxCF.8YPDjOOX7Zxh8bQS5eG15vJmBKnfohLOp7vPW', NULL, 'Position', '2018-03-24 01:32:46', '1'),
('12c6fc06c99a462375eeb3f43dfd832b08ca9e17', 'f1abd670358e036c31296e66b3b66c382ac00812', 'Johnny Bravo', 'johnnybravo@gmail.com', '$2y$11$A3rspJKqvVu0IPD3BNSKw.hn7Ejp7dlIq2Z5EqaOZtvixlq7l3sa.', NULL, 'Sales Assistant', '2018-03-26 09:46:53', '1'),
('17ba0791499db908433b80f37c5fbc89b870084b', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Matthew West', 'matthew@gmail.com', '$2y$11$I8FlPI7.3qfCPaYpHrXu2ubDRa9UJxQJEWEtfQ1JC8stOf5nGwu9S', 'employer_1521988254.rnr', 'Position', '2018-03-24 11:04:10', '1'),
('1b6453892473a467d07372d45eb05abc2031647a', '356a192b7913b04c54574d18c28d46e6395428ab', 'Rufo Gabrillo', 'rufo@deegeelab.com', '$2y$11$ihqk7eVo4R8Ox1hHzN3mi.89h.zVw7m7Q7gNXx6yRI7IYyY.oykju', NULL, 'Dish Washer', '2018-03-01 15:30:29', '1'),
('22d200f8670dbdb3e253a90eee5098477c95c23d', 'b3f0c7f6bb763af1be91d9e74eabfeb199dc1f1f', 'alfred de vera', 'alfred@gmail.com', '$2y$11$SND4NQa/Hme2U8oFoDMFVueYTSZ6qgbUVzpv.AGENlK3E5edL8qQ2', NULL, 'head finance', '2018-03-26 15:00:39', '1'),
('356a192b7913b04c54574d18c28d46e6395428ab', '1b6453892473a467d07372d45eb05abc2031647a', 'James Reid', 'rufo.gabrillo@rnrdigitalconsultancy.com', '$2y$11$eZnkAbcbvLLkspcRI4roK.zY7IeplxAvCk278JhH8aNkND25NIjMm', NULL, 'Technical Lead', '2018-03-01 10:22:57', '1'),
('4d134bc072212ace2df385dae143139da74ec0ef', '1574bddb75c78a6fd2251d61e2993b5146201319', 'Jerry Yan', 'jerryyan@gmail.com', '$2y$11$UYFm3.s4xnmN25RYtK3Np.L0yF3h0vNbwVscz7ZMFCW6uis4ZtH9i', NULL, 'CEO', '2018-03-26 12:26:36', '1'),
('632667547e7cd3e0466547863e1207a8c0c0c549', 'b3f0c7f6bb763af1be91d9e74eabfeb199dc1f1f', 'Peter Cruz', 'peter@gmail.com', '$2y$11$FFFIySFDOW6Xg5oMAPvLU.wh.JPPjFCNrJ.f7clLhdexaLTPzJfT.', NULL, 'Manager', '2018-03-26 15:40:18', '1'),
('7719a1c782a1ba91c031a682a0a2f8658209adbf', '9e6a55b6b4563e652a23be9d623ca5055c356940', 'ivan guysler', 'ivanguysler@gmail.com', '$2y$11$UPVw3cbgs71783LsM7nQ/eAGmcvWWxrNhfqEOQZ5EH6cYSlF1MjzG', NULL, 'Head Officer', '2018-03-26 14:14:50', '1'),
('77de68daecd823babbb58edb1c8e14d7106e83bb', '1b6453892473a467d07372d45eb05abc2031647a', 'Wil Son', 'wil.son@gmail.com', '$2y$11$dtt6y20DrP/OR9W7ReghvOdJtkw/0y94Fx0C/GYEI5tIlnfBP3m62', '', 'Content Writer', '2018-03-01 13:39:31', '1'),
('7b52009b64fd0a2a49e6d8a939753077792b0554', 'fa35e192121eabf3dabf9f5ea6abdbcbc107ac3b', 'RGP HONGKONG', 'Rgp@gmail.com', '$2y$11$1sAxnyfgiYvZhVdeWY0yE.d.Jf5xuRU3Wf2bwfmcKAPludmur7cmm', NULL, 'Ph Branch', '2018-03-26 08:09:18', '1'),
('887309d048beef83ad3eabf2a79a64a389ab1c9f', '0716d9708d321ffb6a00818614779e779925365c', 'ken domingo', 'kendomingo@gmail.com', '$2y$11$7HPNu.6P0xIAcDk/bfjBBuTQ6opjeSQQwu8Q7omK4vzxcN4mV.0fi', NULL, 'CTO', '2018-03-26 13:21:44', '1'),
('902ba3cda1883801594b6e1b452790cc53948fda', 'f1abd670358e036c31296e66b3b66c382ac00812', 'John', 'john.lazy@gmail.com', '$2y$11$/CZB/kKUyNhyrvGQ6nfV8uJNUxe0X0IQsFpjY91NE2R7hn7A1r02u', NULL, 'Lazy', '2018-03-12 23:58:42', '1'),
('91032ad7bbcb6cf72875e8e8207dcfba80173f7c', 'fa35e192121eabf3dabf9f5ea6abdbcbc107ac3b', 'Alvin Chip', 'Rgp@gmail.com', '$2y$11$vp9BJg2zsrnegdJmlNGCLOHV73DJlxfG4V/0/kRHAMHU4rriiUDDK', NULL, 'Manager', '2018-03-26 09:11:30', '1'),
('ac3478d69a3c81fa62e60f5c3696165a4e5e6ac4', '1b6453892473a467d07372d45eb05abc2031647a', 'Mark Gallano', 'mark@gmail.com', '$2y$11$glDH89j0OpCIS9BK3S7qS.JjgYew9TD237KjfVPbcupBnkrmMy0b.', NULL, 'Nilasing si renz at ginuhitan niyaya kumain sa mcdo', '2018-03-03 08:16:36', '1'),
('b1d5781111d84f7b3fe45a0852e59758cd7a87e5', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Mark Lopez', 'mark@gmail.com', '$2y$11$He7c6Ih3lHbJUOXMCT9cXeesZxV/c0ZnNBnJVXa/ehP5xvIP.9ndq', NULL, 'Position', '2018-03-24 11:00:53', '1'),
('b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', '1b6453892473a467d07372d45eb05abc2031647a', 'Rufo N. Gabrillo', 'rufo.gabrillo@gmail.com', '$2y$11$BV1OJ74oQHnuG541kSj65ufdB449X.aVobXmofu9MnkvRhqQsjhpa', 'avatar.png', 'Technical Lead', '2018-03-01 13:12:32', '1'),
('bc33ea4e26e5e1af1408321416956113a4658763', '0716d9708d321ffb6a00818614779e779925365c', 'bryan ford', 'bryanford@gmail.com', '$2y$11$.XUOxN0QZ2Jh.JN1jVBJuOzs70Mf77aazqZzVcapCMWsokcgSGmnq', NULL, 'marketing', '2018-03-26 13:38:58', '1'),
('c1dfd96eea8cc2b62785275bca38ac261256e278', '7b52009b64fd0a2a49e6d8a939753077792b0554', 'Othan Millet', 'othanmillet@gmail.com', '$2y$11$Kg67mpfEOV.vKC77IqceQO3MwtWAB/zOKGPwr2aR5zuqynbACxTni', 'employer_1520856298.rnr', 'Position', '2018-03-08 22:04:22', '1'),
('d435a6cdd786300dff204ee7c2ef942d3e9034e2', 'f1abd670358e036c31296e66b3b66c382ac00812', 'Jun Kim', 'junkim@gmail.com', '$2y$11$hz9dvjFtARTxOqraghkvG.MXuEiHxK8hxEoFgrUZC5CporolSBcly', NULL, 'Head Officer', '2018-03-26 10:40:50', '1'),
('da4b9237bacccdf19c0760cab7aec4a8359010b0', '1b6453892473a467d07372d45eb05abc2031647a', 'Jolo D.', 'jolod@gmail.com', '$2y$11$NkIWGqyHW0Va.rnCaMi25eor6AERo.lJRLoiDsYoUC8AMW.OTX96a', NULL, 'Graphic Designer', '2018-03-01 13:35:06', '1'),
('f6e1126cedebf23e1463aee73f9df08783640400', '1574bddb75c78a6fd2251d61e2993b5146201319', 'vanesse whu', 'vanessewhu@gmail.com', '$2y$11$5c2eIRpmh0/6j4qHCo44L.Xwnci8SqOaU/tmIc54.AnDX4Wy2Bdh6', NULL, 'whu', '2018-03-26 12:50:40', '1'),
('fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Juan Tamad', 'juan@gmail.com', '$2y$11$9S//hJ0LBi15kYJoiZbEFOZWYNxjOE0EGcNGDBwZitu358LRs6ReS', 'employer_1522071882.rnr', 'Position', '2018-03-24 00:52:35', '1');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_career`
--

CREATE TABLE `tbl_career` (
  `id` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `applicant_id` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `agency` varchar(300) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `position_title` varchar(300) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `monthly_salary` varchar(6) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `appointment_status` varchar(300) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `inclusive_fromdate` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `inclusive_todate` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
  `id` varchar(70) COLLATE utf8mb4_unicode_ci NOT NULL,
  `from_account_id` varchar(70) COLLATE utf8mb4_unicode_ci NOT NULL,
  `to_account_id` varchar(70) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remarks` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `header` varchar(300) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_logs`
--

INSERT INTO `tbl_logs` (`id`, `from_account_id`, `to_account_id`, `remarks`, `date`, `header`) VALUES
('356a192b7913b04c54574d18c28d46e6395428ab', 'fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'schedule', '2018-04-02 20:29:59', 'Add'),
('b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'schedule', '2018-04-02 20:09:54', 'Add');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_messages`
--

CREATE TABLE IF NOT EXISTS `tbl_messages` (
  `id` varchar(70) COLLATE utf8mb4_unicode_ci NOT NULL,
  `from_account_id` varchar(70) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `to_account_id` varchar(70) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `subject_id` varchar(70) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `message` text COLLATE utf8mb4_unicode_ci,
  `date` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `header` varchar(300) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_personalinfo`
--

CREATE TABLE `tbl_personalinfo` (
  `id` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `given_name` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `family_name` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `middle_name` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gender` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date_of_birth` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `permanent_address` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `citizenship` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `height` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'cm',
  `weight` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'kg',
  `religion` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `picture` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_personalinfo`
--

INSERT INTO `tbl_personalinfo` (`id`, `given_name`, `family_name`, `middle_name`, `gender`, `date_of_birth`, `permanent_address`, `citizenship`, `phone`, `height`, `weight`, `religion`, `picture`, `date`) VALUES
('1b6453892473a467d07372d45eb05abc2031647a', 'Jonathan', 'Millet', 'Binalay', '', '', 'Poblacion, Labrador, Pangasinan', '', '0909060528', '', '', '', '', '2018-03-06 12:08:26'),
('356a192b7913b04c54574d18c28d46e6395428ab', 'Rufo', 'Gabrillo Jr.', 'middle name', 'Male', '1/26/1993', '#117 Macabito Calasiao Pangasinan', 'Filipino', '0948-499-3058', '165', '53', 'Filipino', 'http://graph.facebook.com/1695213090568737/picture?type=large', '2018-02-20 14:33:57'),
('77de68daecd823babbb58edb1c8e14d7106e83bb', 'James', 'Reid', NULL, '', '', '', '', '', '', '', '', '', '2018-03-06 08:13:08'),
('ac3478d69a3c81fa62e60f5c3696165a4e5e6ac4', 'Elvin', 'Abalos', 'De vera', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'profile.png', '2018-03-23 19:38:28'),
('adsf123456', 'Christian', 'Fajardo', 'Aquino', 'Male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'Rufo', 'Gabrillo', NULL, '', '', '', '', '', '', '', '', '', '2018-02-20 10:05:48'),
('da4b9237bacccdf19c0760cab7aec4a8359010b0', 'Rufo Jr', 'Gabrillo Jr.', 'N.', '', '1993-01-26', '#117 Macabito Calasiao, Pangasinan', '', '0948-499-3958 | 0948-499-3958', '', '', '', 'https://lh5.googleusercontent.com/-h-QNWKxPuNw/AAAAAAAAAAI/AAAAAAAAAAs/UEzHjTUm8Oo/s96-c/photo.jpg', '2018-02-20 15:00:59');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_schedule`
--

CREATE TABLE `tbl_schedule` (
  `id` varchar(70) COLLATE utf8mb4_unicode_ci NOT NULL,
  `from_account_id` varchar(70) COLLATE utf8mb4_unicode_ci NOT NULL,
  `to_account_id` varchar(70) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `subject_id` varchar(70) COLLATE utf8mb4_unicode_ci NOT NULL,
  `schedule_date` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `schedule_time` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `schedule_place` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` int(1) DEFAULT NULL COMMENT '0 = cancelled, 1 = active, 2 = completed',
  `header` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'meeting, initial interview, final interview',
  `remarks` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_schedule`
--

INSERT INTO `tbl_schedule` (`id`, `from_account_id`, `to_account_id`, `subject_id`, `schedule_date`, `schedule_time`, `schedule_place`, `date`, `status`, `header`, `remarks`) VALUES
('b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', '1b6453892473a467d07372d45eb05abc2031647a', '77de68daecd823babbb58edb1c8e14d7106e83bb', '2018-04-03', '08:00', 'Lingayen', '2018-04-02 20:30:43', 1, 'meeting', 'Tech Corps scheduled your meeting on 2018-04-03 08:00 at Lingayen');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_skills`
--

CREATE TABLE `tbl_skills` (
  `id` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `applicant_id` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `skill` varchar(60) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `level` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
('0286dd552c9bea9a69ecb3759e7b94777635514b', '0a57cb53ba59c46fc4b692527a38a87c78d84028', '9e6a55b6b4563e652a23be9d623ca5055c356940', 'Our client is a leading Australian Patent & Trade Mark Attorney firm that specialises in obtaining the broadest possible patent coverage in key overseas markets including the United States, Europe & China.', '<p><span style="color: rgb(34, 34, 34);">Our client is a leading Australian Patent &amp; Trade Mark Attorney firm that specialises in obtaining the broadest possible patent coverage in key overseas markets including the United States, Europe &amp; China.</span></p>', '2018-11-10', 'Data Entry Associate', '["above average typing speed","database clean-up"]', '15000', '20000', '2018-03-26 14:07:25', 2),
('0716d9708d321ffb6a00818614779e779925365c', '12c6fc06c99a462375eeb3f43dfd832b08ca9e17', 'f1abd670358e036c31296e66b3b66c382ac00812', 'BS degree in Computer Science or related discipline, MS degree preferred 6+ years of overall IT experience \r\nExperience with AWS, specifically AWS EC2, S3, VPC, Route 53, Kinesis, RDS.\r\nMinimum of 3 years designing complex, integrated application solutions', '<p>Technical Acumen â€“ Strong domain knowledge in cloud design and development, working knowledge of current IT and systems technologies and standards</p><p>Business Acumen â€“ Ability to command the respect of not only peers, but also business management. Strong understanding of business requirements and processes as they related to enterprise architecture.</p><p>General Management/Leadership â€“ Recognized as a leader able to inspire others through conviction, vision, and the ability to formulate and articulate direction in the area of application architectures</p><p>.Ability to forge single-purpose commitment from others with disparate objectives Interpersonal Relations â€“ Sells approaches through the power of ideas rather than mandates</p>', '2018-12-12', 'Cloud Architect (Amazon Web Services)', '["AWS","VMWare"]', '45000', '60000', '2018-03-26 09:53:59', 1),
('0a57cb53ba59c46fc4b692527a38a87c78d84028', '4d134bc072212ace2df385dae143139da74ec0ef', '1574bddb75c78a6fd2251d61e2993b5146201319', 'Illustrate design ideas using storyboards, process flows and sitemaps Design graphic user interface elements, like menus, tabs and widgets\r\nBuild page navigation buttons and search fields\r\n', '<p>Adobe indesign</p><p>Adobe Illustrator</p><p>Adobe PhotoShop</p><p>Balsamiq, pencil project &amp;nbsp;and other wireframing tools such as axure</p><p>Develop UI mockups and prototypes that clearly illustrate how sites function and look like</p><p>Translate concepts into user flows, wireframes, mockups and prototypes that lead to intuitive user experiences.</p>', '2018-10-21', 'UI UX Designer', '["adobe Indesign","adobe illustrator","adobe photoshop","balsamiq"]', '18000', '25000', '2018-03-26 12:40:59', 2),
('0ade7c2cf97f75d009975f4d720d1fa6c19f4897', '17ba0791499db908433b80f37c5fbc89b870084b', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Job level - Fresh Grad / Entry Level, Job category - Sales and Marketing, Educational requirement - Graduated from colleges', '<ul><li><span style="color: rgb(153, 51, 255);">Job level - Fresh Grad / Entry Level, Job category - Sales and Marketing, Educational requirement - Graduated from college</span></li><li><span style="color: rgb(153, 51, 255);">Job level - Fresh Grad / Entry Level, Job category - Sales and Marketing, Educational requirement - Graduated from college</span></li><li><span style="color: rgb(153, 51, 255);">Job level - Fresh Grad / Entry Level, Job category - Sales and Marketing, Educational requirement - Graduated from college</span></li><li><span style="color: rgb(153, 51, 255);">Job level - Fresh Grad / Entry Level, Job category - Sales and Marketing, Educational requirement - Graduated from college</span></li></ul>', '2018-03-24', 'Inside Sales Associates', '["Forecasting","Communication"]', '12000', '14000', '2018-03-24 11:09:40', 1),
('12c6fc06c99a462375eeb3f43dfd832b08ca9e17', '12c6fc06c99a462375eeb3f43dfd832b08ca9e17', 'f1abd670358e036c31296e66b3b66c382ac00812', 'Managing Rewards Settlement Internal External partners\r\nProject Settlement Tracking\r\nPoints Selling Monitoring\r\nSupport in monitoring Rewards transaction', '<p>Candidate must possess at least a Bachelors College Degree in Accountancy or any related course.Preferably with at least 1-2 years of working experience in the related field.</p><p>Can work under minimum supervision.</p><p>Willing to be assigned in BGC, Taguig Can start ASAP</p>', '2018-04-22', 'Accounting Assistant (for a Telco Company in BGC, Taguig)', 'null', '15000', '18000', '2018-03-26 10:14:32', 1),
('1574bddb75c78a6fd2251d61e2993b5146201319', '472b07b9fcf2c2451e8781e944bf5f77cd8457c8', 'fa35e192121eabf3dabf9f5ea6abdbcbc107ac3b', 'RGP is looking for experienced auditors and finance professionals who will support and perform different finance activities for one of our top Multinational Financial Services clients.', '<p><strong>Main Responsibilities</strong></p><p>Assist in the review of existing internal controls and recommend possible improvements</p><p>Review Internal Policies and Procedures and provide best practices</p><p>Ensure that operations and program compliance adhere to existing industry guidelines</p><p>Investigate any possible gaps and risks identified during the Audit process</p><p>Preparation of Internal Audit Plans, Programs and Reports</p><p><strong>Qualifications</strong></p><p>Solid experiences in internal/external auditing for both IT and/or business/financial/compliance reviews</p><p>5 years of relevant working experiences</p><p>Excellent Knowledge and Exposure to Banking Processes</p><p>Strong Excel Skills. Knowledge in Macros are highly desirable</p><p>Good Knowledge in using SAP&nbsp;</p><p>With professional certificates (e.g. CPA, CIA, CISA)</p><p>Knowledge in SOX (Sarbanes-Oxley)</p><p>Mature, self-motivated, and be able to work independently in a fast-paced entrepreneurial environment and under pressure, and also a good team player.</p><p>Can start Immedi</p>', '2018-12-08', 'Audit and Finance Consultants (6 Months Contract - Can Start Immediately)', '["Strong Excel Skills","Knowledge in Macros"]', '25000', '30000', '2018-03-26 09:29:27', 1),
('17ba0791499db908433b80f37c5fbc89b870084b', '7b52009b64fd0a2a49e6d8a939753077792b0554', 'fa35e192121eabf3dabf9f5ea6abdbcbc107ac3b', '\r\nRGP is looking for dynamic Accounting Professionals specializing in General Accounting or Cost Accounting to support one of our Multinational FMCG Clients.', '<p>1-2 yearsâ€™ Experience in General Accounting or Cost Accounting</p><p>Agile, Flexible and can easily adapt &amp;amp; learn in a fast moving environment</p><p>Knowledge in SAP is Highly Desirable</p><p>Strong Communication and Collaboration Skills in dealing with different Stakeholders</p><p>CPA License Holders are Highly Desirable</p><p><br></p>', '2018-10-06', 'Accounting Consultants (6-12 Months Contract Opportunity, Can Start Immediately)', '["General Accounting","Cost Accounting"]', '20000', '30000', '2018-03-26 08:34:23', 1),
('1b6453892473a467d07372d45eb05abc2031647a', 'fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Job level - Fresh Grad / Entry Level, Job category - Accounting and Finance, Educational requirement - Graduated from college', '<p>Job level - Fresh Grad / Entry Level, Job category - Accounting and Finance, Educational requirement - Graduated from college</p><p>Job level - Fresh Grad / Entry Level, Job category - Accounting and Finance, Educational requirement - Graduated from college</p><p>Job level - Fresh Grad / Entry Level, Job category - Accounting and Finance, Educational requirement - Graduated from collegeJob level - Fresh Grad / Entry Level, Job category - Accounting and Finance, Educational requirement - Graduated from college</p>', '2018-03-24', 'Accounts Receivable Officer', '["Accounting","MS Excel","TEam Player"]', '20000', '30000', '2018-03-24 10:59:15', 1),
('22d200f8670dbdb3e253a90eee5098477c95c23d', '4d134bc072212ace2df385dae143139da74ec0ef', '1574bddb75c78a6fd2251d61e2993b5146201319', 'We are looking to hire immediately a software and website quality assurance specialist and tester. You will be responsible for developing QA plans, and testing. Your QA plans and testing will cover our very wide product range, which includes websites, mobile apps and software.', '<p><span style="color: rgb(34, 34, 34);">We are looking to hire immediately a software and website quality assurance specialist and tester. You will be responsible for developing QA plans, and testing. Your QA plans and testing will cover our very wide product range, which includes websites, mobile apps and software.</span></p><p>Review and analyze system specifications</p><p>Collaborate with developers to develop effective strategies and test plans</p><p>Carry out tests and and analyze results</p><p>Report bugs and errors to development teams</p><p>Help troubleshoot issues</p><p>Conduct post-release testing</p><p>Work with teams to ensure quality throughout the software development lifecycle</p><p><br></p>', '2018-08-09', 'Software Quality Assurance Specialist', '["analytical mindset","good problem solving"]', '20000', '25000', '2018-03-26 12:49:31', 2),
('2e01e17467891f7c933dbaa00e1459d23db3fe4f', '7719a1c782a1ba91c031a682a0a2f8658209adbf', '9e6a55b6b4563e652a23be9d623ca5055c356940', 'Design on brand graphics and videos to support the sale of products in Australia and abroad.\r\nUpdate and Design on brand packaging for new and existing products.\r\nExecute brand promotions online and off line. Increase brand awareness and engagement, through high quality content, increased site traffic and increased dialogue through social media channels.\r\nSupport in the launch of new product launches and other marketing &amp; product initiatives.', '<p>Prepare on brand graphics for all marketing channels including print advertising, point of sale materials, catalogues, trade show stands, signage, flyers, handouts and more</p><p>Prepare on brand graphics and content for all digital platforms including Website/ Facebook/ YouTube / Pinterest / Instagram / Twitter Video â€“ Create videos on general pet topics and Rufus &amp;amp; Coco products to support their sales online. This may require scripting, hands on video editing, recruiting talent, animating and managing outsource providers as needed Image Library â€“ source, edit and manage a library of product, lifestyle and marketing images by product.</p>', '2018-12-08', 'Graphic Designer (with pet brand project experience)', '["adobe Indesign","adobe illustrator","abode photoshop"]', '15000', '20000', '2018-03-26 14:44:53', 2),
('356a192b7913b04c54574d18c28d46e6395428ab', 'fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Job level - Mid-Senior Level / Manager, Job category - Accounting and Finance, Educational requirement - Graduated from college', '<p>Job level - Mid-Senior Level / Manager, Job category - Accounting and Finance, Educational requirement - Graduated from college</p><p>Job level - Mid-Senior Level / Manager, Job category - Accounting and Finance, Educational requirement - Graduated from college</p><p>Job level - Mid-Senior Level / Manager, Job category - Accounting and Finance, Educational requirement - Graduated from college</p><p>Job level - Mid-Senior Level / Manager, Job category - Accounting and Finance, Educational requirement - Graduated from college</p><p>Job level - Mid-Senior Level / Manager, Job category - Accounting and Finance, Educational requirement - Graduated from college</p>', '2018-03-24', 'Bank and Client Relationship Manager', '["CRM","Problem-solving","Leadership","Communication"]', '12000', '13000', '2018-03-24 10:55:21', 1),
('472b07b9fcf2c2451e8781e944bf5f77cd8457c8', '12c6fc06c99a462375eeb3f43dfd832b08ca9e17', 'f1abd670358e036c31296e66b3b66c382ac00812', 'Managing Rewards Settlement (Internal External partners)\r\nProject Settlement Tracking\r\nPoints Selling Monitoring\r\nSupport in monitoring Rewards transaction', '<p>Candidate must possess at least a Bachelors College Degree in Accountancy or any related course.Preferably with at least 1-2 years of working experience in the related field.</p><p>Can work under minimum supervision.</p><p>Willing to be assigned in BGC, Taguig Can start ASAP</p>', '2018-04-22', 'Accounting Assistant (for a Telco Company in BGC, Taguig)', 'null', '15000', '18000', '2018-03-26 10:14:16', 1),
('4d134bc072212ace2df385dae143139da74ec0ef', '12c6fc06c99a462375eeb3f43dfd832b08ca9e17', 'f1abd670358e036c31296e66b3b66c382ac00812', 'The HR Business Partner/Manager is responsible for aligning company & business process objectives with employees and management in the business units.', '<p>The HR Business Partner/Manager is responsible for aligning company &amp;amp; business process objectives with employees and management in the business units. He/she will design, lead, and implement programs that align the HR strategy to the business process and global outsourcing strategy in order to positively impact business performance.</p><p>As a consultant, The HRBP is an administrative expert who provides advisory services to business leadership on human resources-related issues. He/she will also perform a wide range of HR activities including but not limited to labor &amp;amp; employee relations management, talent management, compensation &amp;amp; benefits administration, workforce planning/talent acquisition,organizational design, and performance management.</p>', '2018-12-06', 'HR Business Partner/Manager', '["Human Resource Management","Psychology"]', '18000', '25000', '2018-03-26 10:28:01', 1),
('54ceb91256e8190e474aa752a6e0650a2df5ba37', '632667547e7cd3e0466547863e1207a8c0c0c549', 'b3f0c7f6bb763af1be91d9e74eabfeb199dc1f1f', 'Candidate must possess at least a Bachelors/College Degree , Computer Science/Information Technology, Engineering (Computer/Telecommunication) or equivalent.', '<p>Candidate must possess at least a Bachelors/College Degree , Computer Science/Information Technology, Engineering (Computer/Telecommunication) or equivalent.</p><p>At least 2 year(s) of working experience in Oracle Database Administration</p><p>Applicants must be willing to work in Quezon City.</p><p>Must be open to work in night shift</p><p>Preferably 1-4 Yrs Experienced Employees specializing in IT/Computer - Software or equivalent. Full-Time position(s) available.</p>', '2018-04-18', 'Oracle Database Administrator', '["oracle database administrator"]', '50000', '65000', '2018-03-26 15:45:08', 2),
('5a5b0f9b7d3f8fc84c3cef8fd8efaaa6c70d75ab', '632667547e7cd3e0466547863e1207a8c0c0c549', 'b3f0c7f6bb763af1be91d9e74eabfeb199dc1f1f', 'Candidate must possess at least a Vocational Diploma / Short Course Certificate, Bachelors/College Degree , Engineering (Computer/Telecommunication) or equivalent.\r\nRequired skill(s): Trouble Shooting And Problem Solving.\r\n', '<p>Candidate must possess at least a Vocational Diploma / Short Course Certificate, Bachelors/College Degree , Engineering (Computer/Telecommunication) or equivalent.</p><p>Required skill(s): Trouble Shooting And Problem Solving.</p><p>At least 1 year(s) of working experience in the related field is required for this position.</p><p>Applicants must be willing to work in Taguig City,Cabuyao Laguna. Preferably 1-4 Yrs Experienced Employees specializing in IT/Computer - Hardware</p>', '2018-05-12', 'IT Support / Technician', '["computer hardware","troubleshooting","problem solving"]', '15000', '20000', '2018-03-26 16:03:41', 2),
('5b384ce32d8cdef02bc3a139d4cac0a22bb029e8', '887309d048beef83ad3eabf2a79a64a389ab1c9f', '0716d9708d321ffb6a00818614779e779925365c', 'Create Mobile UI Design Storyboard.\r\n Create original designs, illustrations, drawings, and/or renderings, for products, packaging, marketing materials and other assignments\r\n Work with team to concept new product ideas and explore possible packaging solutions\r\n Manage and follow-up on assignments, project details and timelines\r\n', '<p><span style="color: rgb(34, 34, 34);">Web Graphic Design, Web Savvy, Planning, Web User Interface Design, Web Programming Skills, Teamwork, Illustration Tools, Multimedia Content Development, Understanding Browser Capabilities, Internet Presence, Verbal Communication.</span></p>', '2018-12-08', 'WEB DESIGNER', '["web savvy","web user interface design","web programming skills"]', '18000', '25000', '2018-03-26 13:37:27', 2),
('632667547e7cd3e0466547863e1207a8c0c0c549', 'f6e1126cedebf23e1463aee73f9df08783640400', '1574bddb75c78a6fd2251d61e2993b5146201319', 'We are looking to immediately hire 4 mobile app developers. You can be a fresh graduate or a very experienced developer, but you must be able to show a keen interest in developing with one of the JavaScript cross-platform frameworks. Interns in their final year of a 4 year degree may also apply.', '<p><span style="color: rgb(34, 34, 34);">We are looking to immediately hire 4 mobile app developers. You can be a fresh graduate or a very experienced developer, but you must be able to show a keen interest in developing with one of the JavaScript cross-platform frameworks. Interns in their final year of a 4 year degree may also apply.</span></p><p><br></p><p><span style="color: rgb(34, 34, 34);">Our projects are all innovative and technically challenging and we use the latest and best of the open source frameworks. For this reason, you should only apply if you believe yourself to be smart and enthusiastic enough for the challenges of such cutting-edge development work.</span></p>', '2018-12-08', 'Mobile Application Developer', '["Cordova","react native","framework7"]', '16000', '22000', '2018-03-26 12:55:34', 2),
('64e095fe763fc62418378753f9402623bea9e227', '7719a1c782a1ba91c031a682a0a2f8658209adbf', '9e6a55b6b4563e652a23be9d623ca5055c356940', 'Our client is not your typical â€œagencyâ€ (Think of us like the Terminatorâ€¦Weâ€™re part machine, part human).  We combine big data with predictive and artificial intelligence to increase customer count and revenue for top retailers all around the world. Want to be a part of a company thatâ€™s quickly disrupting a broken industry?  Keep on reading!', '<p><span style="color: rgb(34, 34, 34);">You will be responsible for building and optimising programmatic media campaigns for iconic brands around the world.&nbsp; The ideal candidate for this position has a firm end-to-end programmatic background including ad operations, setup, ad trafficking, tracking pixel setup, Q/A, optimisations, reporting and analysis with a discipline for driving conversions and delivering real ROI. They are data-driven, overly positive, hungry for success, love challenges, expert multi-taskers, enjoy working in a fast paced environment and like to have fun in their daily work life.</span></p>', '2018-07-21', 'Programmatic Campaign Specialist', '["rocketfuel DSP","DMP"]', '25000', '30000', '2018-03-26 14:36:32', 2),
('667be543b02294b7624119adc3a725473df39885', '632667547e7cd3e0466547863e1207a8c0c0c549', 'b3f0c7f6bb763af1be91d9e74eabfeb199dc1f1f', 'Candidate must possess at least a Bachelors/College Degree , Computer Science/Information Technology, Engineering (Computer/Telecommunication) or equivalent.\r\nAt least 1 year(s) of working experience in the related field is required for this position.\r\nApplicants must be willing to work in Makati City.\r\n', '<p>Candidate must possess at least a Bachelors/College Degree , Computer Science/Information Technology, Engineering (Computer/Telecommunication) or equivalent.</p><p>At least 1 year(s) of working experience in the related field is required for this position.</p><p>Applicants must be willing to work in Makati City.</p><p>Preferably 1-4 Yrs Experienced Employees specializing in IT/Computer - Network/System/Database Admin or equivalent.</p><p>5 Full-Time and Contract position(s)</p>', '2018-12-07', 'Network Engineer', '["handling switches","routers","firewall"]', '35000', '50000', '2018-03-26 15:58:03', 2),
('761f22b2c1593d0bb87e0b606f990ba4974706de', 'bc33ea4e26e5e1af1408321416956113a4658763', '0716d9708d321ffb6a00818614779e779925365c', '\r\nServer and Desktop System Administration and network Support\r\nNetwork/System/Database Management, maintenance, Backup and Recovery\r\nSupport and assistance in hardware/system installation\r\n', '<p>Server and Desktop System Administration and network Support</p><p>Network/System/Database Management, maintenance, Backup and Recovery</p><p>Support and assistance in hardware/system installation</p>', '2018-09-24', 'Management Information System staff', '["network support","desktop system administration"]', '15000', '20000', '2018-03-26 13:51:25', 2),
('7719a1c782a1ba91c031a682a0a2f8658209adbf', '4d134bc072212ace2df385dae143139da74ec0ef', '1574bddb75c78a6fd2251d61e2993b5146201319', 'We are looking to immediately hire 3 front end web developers to join our team of 30 experienced developers. We require a minimum of one year experience in front end web design (WordPress, Drupal, Joomla, Laravel, or any other).', '<p><span style="color: rgb(34, 34, 34);">We are looking to immediately hire 3 front end web developers to join our team of 30 experienced developers. We require a minimum of one year experience in front end web design (WordPress, Drupal, Joomla, Laravel, or any other).</span></p><p><span style="color: rgb(34, 34, 34);">Typically, you will be working in a team where Laravel, Drupal, or Mobile app developers will build the back end. Graphic artist will design the wireframes, graphics and layout. Your job in the team will be to style the website for desktop and mobile applications. If you have graphic design skills, UI or UX design skill, we would put them to good use.</span></p>', '2018-11-12', 'Front End Web Developer', '["html ","css","bootstrap","javascript"]', '16000', '20000', '2018-03-26 12:45:24', 2),
('77de68daecd823babbb58edb1c8e14d7106e83bb', 'fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Job level - Mid-Senior Level / Manager, Job category - Human Resources, Educational requirement - Graduated from college', '<p>Job level - Mid-Senior Level / Manager, Job category - Human Resources, Educational requirement - Graduated from college</p><p>Job level - Mid-Senior Level / Manager, Job category - Human Resources, Educational requirement - Graduated from college</p><p>Job level - Mid-Senior Level / Manager, Job category - Human Resources, Educational requirement - Graduated from college</p><p>Job level - Mid-Senior Level / Manager, Job category - Human Resources, Educational requirement - Graduated from college</p><p><br></p>', '2018-03-24', 'HR Manager', '["work under presssure","Flexibility","Team Player"]', '12000', '14000', '2018-03-24 10:57:35', 1),
('7b52009b64fd0a2a49e6d8a939753077792b0554', '7b52009b64fd0a2a49e6d8a939753077792b0554', 'fa35e192121eabf3dabf9f5ea6abdbcbc107ac3b', 'RGP is looking for junior accountants who will support and perform accounting related activities for our top international clients in the FMCG/ Shared Services space.', '<p>Experience in General Accounting/ Cost Accounting</p><p>1 - 2 years of relevant working experiences</p><p>Mature, self-motivated, and be able to work independently in a fast-paced entrepreneurial environment and under pressure, and also a good team player.</p><p>Can start Immediately (No Notice Period Required)</p><p><br></p>', '2018-11-25', 'Junior Accounting Consultants (6-12 Months Contract - Can Start Immediately)', '["Cost Accounting","General Accounting"]', '20000', '30000', '2018-03-26 08:39:04', 1),
('80e28a51cbc26fa4bd34938c5e593b36146f5e0c', '22d200f8670dbdb3e253a90eee5098477c95c23d', 'b3f0c7f6bb763af1be91d9e74eabfeb199dc1f1f', 'Candidate must possess at least a Bachelors/College Degree, Computer Science/Information Technology or equivalent.\r\nAt least 5-7 year(s) in Automation Testing\r\nTop skills required: Automation in Selenium, Java, JavaScript, any Test Automation Methodologies and QA process\r\nApplicants must be willing to work in Makati City. With dayshift work schedule', '<p>Establish company- wide test strategy for automated test suites. Transform testing into a continuous and efficient end-to-end quality engineering function through the use of quality processes, tools, and methodologies significantly improving control, accuracy and integrity. Develop and oversee more predictive and intelligent testing approaches based on automation and innovative testing products and solutions.&amp;nbsp; Develop and configure test automation scripts to test continuously test the product.&amp;nbsp; Involve in product design to guarantee adherence of test coverage for meeting end-user requirements.</p><p>Record test results and report and verify software bug fixes to accept automation criteria. Coordinate with program and development management teams in product development lifecycle to conform end user product and quality requirements and shipment schedule. Analyze performance test requirements and develop test plans and debug to understand test</p>', '2018-09-12', 'QA Analyst (Selenium)', '["java","javascript","automation in selenium"]', '75000', '90000', '2018-03-26 15:31:42', 2),
('827bfc458708f0b442009c9c9836f7e4b65557fb', '7719a1c782a1ba91c031a682a0a2f8658209adbf', '9e6a55b6b4563e652a23be9d623ca5055c356940', 'Our client is a rapidly growing RegTech company driven by innovation and achieving customer satisfaction. Known for making a difference with ethiXbase 2.0, the industryâ€™s leading end-to-end third party compliance and risk management platform, we help small businesses to major ', '<p><span style="color: rgb(34, 34, 34);"> should be a passionate hands-on marketer to help us to advance, develop, implement, track and optimize our demand generation initiatives through marketing automation software, CRM (Salesforce) management and lead acquisition through paid and organic channels. The ideal candidate is well versed in a spectrum of digital marketing channels and functions and has the aptitude to provide and shape forward-thinking ideas to build and maintain a strong company web presence and lead digital transformation for the organisation.</span></p>', '2018-12-31', 'Marketing Automation Manager (with Salesforce experience)', '["marketing management database","CRM management"]', '25000', '35000', '2018-03-26 14:31:24', 2),
('887309d048beef83ad3eabf2a79a64a389ab1c9f', '4d134bc072212ace2df385dae143139da74ec0ef', '1574bddb75c78a6fd2251d61e2993b5146201319', 'We are looking to immediately hire four mobile app developer interns .  You must be able to show a keen interest mobile app development. You will be working with a team of over 30 experienced developers.', '<p><span style="color: rgb(34, 34, 34);">We are looking to immediately hire four mobile app developer interns&nbsp; You must be able to show a keen interest mobile app development. You will be working with a team of over 30 experienced developers.</span></p><p><br></p>', '2018-12-12', 'Mobile Applications Developer Internship (Internship)', '["javascript","frameworks"]', '2000', '3000', '2018-03-26 12:30:54', 2),
('8effee409c625e1a2d8f5033631840e6ce1dcb64', '22d200f8670dbdb3e253a90eee5098477c95c23d', 'b3f0c7f6bb763af1be91d9e74eabfeb199dc1f1f', 'Candidate must possess at least a Bachelors/College Degree , Engineering (Computer/Telecommunication) or equivalent.\r\n2 years of help desk, voice customer service and support experience, hardware/software/network troubleshooting.', '<p>Candidate must possess at least a Bachelors/College Degree , Engineering (Computer/Telecommunication) or equivalent.</p><p>Required skill(s): 2 years of help desk, voice customer service and support experience, hardware/software/network troubleshooting.</p><p>Applicants must be willing to work in Mckinley Hill,Taguig City.</p><p>Preferably someone who can start ASAP or with 15 days of notice.&amp;nbsp;</p><p>10 Full-Time position(s) available.</p>', '2018-09-23', 'L1 Service Desk', '["voice customer services","network troubleshooting"]', '22000', '35000', '2018-03-26 15:37:36', 2),
('902ba3cda1883801594b6e1b452790cc53948fda', '17ba0791499db908433b80f37c5fbc89b870084b', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Job level - Mid-Senior Level / Manager, Job category - Legal, Educational requirement - Graduated from college', '<p>Job level - Mid-Senior Level / Manager, Job category - Legal, Educational requirement - Graduated from college</p><p>Job level - Mid-Senior Level / Manager, Job category - Legal, Educational requirement - Graduated from college</p><p>Job level - Mid-Senior Level / Manager, Job category - Legal, Educational requirement - Graduated from college</p>', '2018-03-24', 'Compliance Officer', '["Lawyer","Banking"]', '20000', '50000', '2018-03-24 11:07:48', 1),
('91032ad7bbcb6cf72875e8e8207dcfba80173f7c', '12c6fc06c99a462375eeb3f43dfd832b08ca9e17', 'f1abd670358e036c31296e66b3b66c382ac00812', 'Managing Rewards Settlement (Internal &amp; External partners)\r\nProject Settlement Tracking\r\nPoints Selling Monitoring\r\nSupport in monitoring Rewards transaction', '<p>Candidate must possess at least a Bachelors College Degree in Accountancy or any related course.Preferably with at least 1-2 years of working experience in the related field.</p><p>Can work under minimum supervision.</p><p>Willing to be assigned in BGC, Taguig Can start ASAP</p>', '2018-04-22', 'Accounting Assistant (for a Telco Company in BGC, Taguig)', 'null', '15000', '18000', '2018-03-26 10:13:53', 1),
('9109c85a45b703f87f1413a405549a2cea9ab556', '632667547e7cd3e0466547863e1207a8c0c0c549', 'b3f0c7f6bb763af1be91d9e74eabfeb199dc1f1f', 'Candidate must possess at least a Bachelors/College Degree , any field.\r\nRequired skill(s): rdbms, Erwin Data Modeling.\r\n', '<p>Candidate must possess at least a Bachelors/College Degree , any field.</p><p>Required skill(s): rdbms, Erwin Data Modeling.</p><p>At least 2 year(s) of working experience in the related field is required for this position. Amenable to work in Quezon City&nbsp;</p><p>Willing to work nightshift</p>', '2018-12-14', 'Data Modeler', '["erwin data modeling","rdbms"]', '20000', '30000', '2018-03-26 15:51:10', 2),
('92cfceb39d57d914ed8b14d0e37643de0797ae56', '0a57cb53ba59c46fc4b692527a38a87c78d84028', '9e6a55b6b4563e652a23be9d623ca5055c356940', 'Our client is a growing company looking for an Industrial Software Engineer/Programmer who is ready to put their full set of design, program, test, build, and repair skills to use. As part of a mid-sized but dynamic and highly regarded technology company, your contribution will be greatly valued.', '<p>Our client is a growing company looking for an Industrial Software Engineer/Programmer who is ready to put their full set of design, program, test, build, and repair skills to use. As part of a mid-sized but dynamic and highly regarded technology company, your contribution will be greatly valued.</p><p><span style="color: rgb(34, 34, 34);">The role requires a person with high-tech problem-solving skills, who can support our existing customer software packages whilst developing the next generation of software, in a professional manner. It is a job requirement to be able to look at how technology can solve real-life business problems to make an organisation more efficient and more productive by developing, testing and implementing Software, Hardware &amp; IT solutions.</span></p>', '2018-10-04', 'Industrial Software Engineer', '["vb6",".net","SQL"]', '45000', '65000', '2018-03-26 14:04:39', 2),
('972a67c48192728a34979d9a35164c1295401b71', 'f6e1126cedebf23e1463aee73f9df08783640400', '1574bddb75c78a6fd2251d61e2993b5146201319', 'We are looking to hire a Jr. Systems Administrator who will be directly reporting to the Senior Systems Administrator.\r\n', '<p><span style="color: rgb(34, 34, 34);">This position supports the companyâ€™s server management, system infrastructure and internet security. The main essence of this role is to support &nbsp;and maintain our web servers - WHM, CPanel and Centos.</span></p>', '2018-08-26', 'Jr. System Administrator', '["cpanel","cloudLinux","SSL/HTTPS"]', '15000', '22000', '2018-03-26 13:13:13', 2),
('98fbc42faedc02492397cb5962ea3a3ffc0a9243', '0a57cb53ba59c46fc4b692527a38a87c78d84028', '9e6a55b6b4563e652a23be9d623ca5055c356940', 'is the leading provider of building certification software to the industry across Australia. The software is developed in VB.net with additional products developed in other technologies such as MVC & IOS. ', '<p><span style="color: rgb(34, 34, 34);">is the leading provider of building certification software to the industry across Australia. The software is developed in VB.net with additional products developed in other technologies such as MVC &amp; IOS. It is our vision to continue the development of Visual Approvals introducing new functionality and features using the latest technologies available. We are looking for a developer with the commercial experience in Xamarin to rewrite our existing mobile technology from iOS to Xamarin.&nbsp;</span></p>', '2018-12-22', 'C# xamarin developer', '["java","objective c"]', '60000', '75000', '2018-03-26 14:12:31', 2),
('9e6a55b6b4563e652a23be9d623ca5055c356940', '12c6fc06c99a462375eeb3f43dfd832b08ca9e17', 'f1abd670358e036c31296e66b3b66c382ac00812', 'Candidate must possess at least a Bachelor or College Degree , Computer Science or Information Technology or equivalent.\r\n', '<p>4-6 Years Current Skill/ Platform with Actual Experience</p><p>System Administration </p><p>Recruiting data migration</p><p>Onboarding and Recruitment setup implementation</p><p>Experienced collaborating with client</p>', '2018-12-09', 'System Administrator (Taleo)', '["System Administration","Recruiting data migration","Onboarding and Recruitment "]', '35000', '50000', '2018-03-26 10:00:55', 1),
('a9334987ece78b6fe8bf130ef00b74847c1d3da6', '22d200f8670dbdb3e253a90eee5098477c95c23d', 'b3f0c7f6bb763af1be91d9e74eabfeb199dc1f1f', 'Candidate must possess at least a Bachelors/College Degree , Engineering (Computer/Telecommunication) or equivalent.', '<p>Candidate must possess at least a Bachelors/College Degree , Engineering (Computer/Telecommunication) or equivalent.</p><p>Required skill(s): Laravel, PHP.</p><p>At least 2 year(s) of working experience in the related field is required for this position.</p><p>Applicants must be willing to work in Pasay City.</p><p>Preferably 1-4 Yrs Experienced Employees specializing in IT/Computer - Software or equivalent.</p><p><br></p>', '2018-12-08', 'PHP Developer', '["php","laravel"]', '35000', '50000', '2018-03-26 15:14:43', 2),
('ac3478d69a3c81fa62e60f5c3696165a4e5e6ac4', '17ba0791499db908433b80f37c5fbc89b870084b', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'sapien urna lectus vestibulum in mauris ante congue natoque etiam delectus interdum consectetuer facilisis ipsum sodales rutrum cursus lectus elit id ac et quis urna adipiscing nonummy ut aliquam feugiat per amet wisi dolor tristique tellus eu scelerisque sit non proin nibh neque luctus culpa maecenas ornare tincidunt id orci sodales integer etiam sed est cras ante', '<p>sapien urna lectus vestibulum in mauris ante congue natoque etiam delectus interdum consectetuer facilisis ipsum sodales rutrum cursus lectus elit id ac et quis urna adipiscing nonummy ut aliquam feugiat per amet wisi dolor tristique tellus eu scelerisque sit non proin nibh neque luctus culpa maecenas ornare tincidunt id orci sodales integer etiam sed est cras ante pulvinar semper integer faucibus et maiores vestibulum sodales vestibulum accumsan amet cras accumsan risus elit phasellus vel duis&nbsp;</p><p>sapien urna lectus vestibulum in mauris ante congue natoque etiam delectus interdum consectetuer facilisis ipsum sodales rutrum cursus lectus elit id ac et quis urna adipiscing nonummy ut aliquam feugiat per amet wisi dolor tristique tellus eu scelerisque sit non proin nibh neque luctus culpa maecenas ornare tincidunt id orci sodales integer etiam sed est cras ante pulvinar semper integer faucibus et maiores vestibulum sodales vestibulum accumsan amet cras accumsan risus elit phasellus vel duis</p>', '2018-03-24', 'Front-End Developer', '["PHP","Jquery","HTML","CSS"]', '30000', '40000', '2018-03-24 11:06:11', 1),
('af3e133428b9e25c55bc59fe534248e6a0c0f17b', 'bc33ea4e26e5e1af1408321416956113a4658763', '0716d9708d321ffb6a00818614779e779925365c', 'Develop programs to enhance employee relations and offer employee support to each staff member\r\nEnsure that the new hire orientation process properly introduces new employees to the corporate culture', '<p>Develop programs to enhance employee relations and offer employee support to each staff member</p><p>Ensure that the new hire orientation process properly introduces new employees to the corporate culture</p><p><span style="color: rgb(34, 34, 34);">Bachelor Degree in Human Resources or related business field</span></p><p><span style="color: rgb(34, 34, 34);">3+ years experience in a human resources supervisory position</span></p><p><span style="color: rgb(34, 34, 34);">Demonstrated ability to improve employee morale</span></p><p><br></p>', '2018-08-21', 'Human Resource Manager', '["human resource","financing"]', '25000', '28000', '2018-03-26 13:47:51', 2),
('b1d5781111d84f7b3fe45a0852e59758cd7a87e5', '7b52009b64fd0a2a49e6d8a939753077792b0554', 'fa35e192121eabf3dabf9f5ea6abdbcbc107ac3b', 'We are looking for experienced Programmers who will work with one of our top multinational clients in providing technical support for End-User Computing (EUC) Management and execute the following tasks:', '<p><span style="color: rgb(34, 34, 34);">Conduct process walkthrough to understand the process and obtain requirements.</span></p><p><span style="color: rgb(34, 34, 34);">Identify appropriate solution and design the tool based on requirements.</span></p><p><span style="color: rgb(34, 34, 34);">Develop the tool according to functionalities agreed with the process owners.</span></p><p><span style="color: rgb(34, 34, 34);">Assist user during testing and debug tool based on testing results.</span></p><p><span style="color: rgb(34, 34, 34);">Create Technical Document and User Manual for all the completed projects.</span></p><p><span style="color: rgb(34, 34, 34);">Provide training to users of the tool, ensuring proper transition.</span></p>', '2018-09-15', 'IT Consultant - Programmer (3 to 6 Months Contract Opportunity - Can Start ASAP)', '[".net","c++","c#","SQL","VB"]', '30000', '45000', '2018-03-26 08:15:30', 1),
('b3f0c7f6bb763af1be91d9e74eabfeb199dc1f1f', '12c6fc06c99a462375eeb3f43dfd832b08ca9e17', 'f1abd670358e036c31296e66b3b66c382ac00812', 'Managing Rewards Settlement (Internal &amp; External partners)\r\nProject Settlement Tracking\r\nPoints Selling Monitoring\r\nSupport in monitoring Rewards transaction', '<p>Candidate must possess at least a Bachelors College Degree in Accountancy or any related course.Preferably with at least 1-2 year(s) of working experience in the related field.</p><p>Can work under minimum supervision.</p><p>Willing to be assigned in BGC, Taguig Can start ASAP</p>', '2018-04-22', 'Accounting Assistant (for a Telco Company in BGC, Taguig)', 'null', '15000', '18000', '2018-03-26 10:13:16', 1),
('b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Job level - Associate / Supervisor, Job category - Sales and Marketing, Educational requirement - Graduated from collegea', '<p>&lt;ul&gt;&lt;li&gt;Support the Sales Manager in building plans to deliver against sales objectives.&lt;/li&gt;&lt;li&gt;Lead the development and maintenance of the on trade outlet database with a focus on hotels, restaurants and high-end bars.&lt;/li&gt;&lt;li&gt;Develop and follow an efficient calling cycle with the national distributor on premise team.&lt;/li&gt;&lt;li&gt;Maximize distribution and stock pressure in target outlets.&lt;/li&gt;&lt;li&gt;Establish sustainable relationship with key customers&lt;/li&gt;&lt;li&gt;Monitor visibility and ensure stand out with a focus on key accounts.&lt;/li&gt;&lt;li&gt;Coordinate with Marketing and Trade Marketing teams to develop targeted and cost effective promotional and visibility tools.&lt;/li&gt;&lt;li&gt;Conduct regular alignment meetings with the national distributor sales, marketing, trade marketing teams and promotional teams to effectively communicate product updates, new strategies and business development programs.&lt;/li&gt;&lt;li&gt;Ensure that commercial and/or brand building objectives are fully leveraged in all existing contract</p>', '2018-03-24', 'Key Accounts Executive', '["Presentation","Negotiation","English Fluency"]', '20000', '30000', '2018-03-24 10:52:04', 1),
('b6692ea5df920cad691c20319a6fffd7a4a766b8', 'f6e1126cedebf23e1463aee73f9df08783640400', '1574bddb75c78a6fd2251d61e2993b5146201319', 'The ideal candidate must have an exceptional eye for detail, and must be comfortable with critiquing the graphical work of the artists in the group! At the interview stage, you will be asked to critique some of our work, and your ability to spot issues, and identify areas of improvement will be a key factor in us hiring you.', '<p><span style="color: rgb(34, 34, 34);">We re looking to immediately hire a creative art director to lead our growing team of&nbsp; graphic artists - it currently stands at 6. You will also working with some of our other 40 staff. The main business activity of our company is web and mobile app design, graphic design, and branding. Our graphics work is very diverse, and depending on your skill set, you may also be involved in branding, photoshoots, videography, logo design, advertising graphic design, and many more.</span></p><p><span style="color: rgb(34, 34, 34);">The ideal candidate must have an exceptional eye for detail, and must be comfortable with critiquing the graphical work of the artists in the group! At the interview stage, you will be asked to critique some of our work, and your ability to spot issues, and identify areas of improvement will be a key factor in us hiring you.</span></p>', '2018-04-22', 'Art Director', '["adobe photoshop","adobe illustrator","adobe Indesign"]', '30000', '50000', '2018-03-26 13:03:51', 2),
('b7eb6c689c037217079766fdb77c3bac3e51cb4c', '22d200f8670dbdb3e253a90eee5098477c95c23d', 'b3f0c7f6bb763af1be91d9e74eabfeb199dc1f1f', 'Required skill(s): help desk support, Trouble Shooting And Problem Solving.\r\nAt least 1 year(s) of working experience in the related field is required for this position.\r\nApplicants must be willing to work in Taguig City.', '<p>Candidate must possess at least a Bachelors/College Degree , Engineering (Computer/Telecommunication) or equivalent.</p><p>Required skill(s): help desk support, Trouble Shooting And Problem Solving.</p><p>At least 1 year(s) of working experience in the related field is required for this position.</p><p>Applicants must be willing to work in Taguig City.</p><p>Preferably 1-4 Yrs Experienced Employees specializing in IT/Computer - Hardware or equivalent. </p><p>18 Full-Time position(s) available. </p>', '2018-04-26', 'IT Servicedesk- FRESH GRADUATES!!', '["Help Desk Support","troubleshooting ","problem solving"]', '15000', '20000', '2018-03-26 15:07:53', 2),
('bc33ea4e26e5e1af1408321416956113a4658763', '4d134bc072212ace2df385dae143139da74ec0ef', '1574bddb75c78a6fd2251d61e2993b5146201319', 'We are looking to immediately hire five Laravel developers. You can be a fresh graduate or a very experienced developer, but you must be able to show a keen interest in laravel. You will be joining a team of 30 experienced developers.', '<p><span style="color: rgb(34, 34, 34);">Our projects are all innovative and technically challenging. We use the latest and best of the open source platforms and frameworks, including Laravel. For this reason, you should only apply if you believe yourself to be smart and enthusiastic enough for the challenges of such cutting-edge software development work.&nbsp;</span></p>', '2018-12-11', 'PHP Laravel Developer', '["laravel","symfony","codeigniter","php"]', '15000', '22000', '2018-03-26 12:35:00', 2),
('bd307a3ec329e10a2cff8fb87480823da114f8f4', '7b52009b64fd0a2a49e6d8a939753077792b0554', 'fa35e192121eabf3dabf9f5ea6abdbcbc107ac3b', 'RGP is looking for experienced professionals specializing in General Accounting, Financial Reporting, Intercompany Accounting and Fixed Assets Accounting to support one of our Multinational FMCG Clients.', '<p>5-7 yearsâ€™ Experience in doing the preparation/posting/review of journal entries, Balance Sheet reconciliation, Financial Consolidation submission, Intercompany and Fixed Assets transactions.</p><p>Strong Exposure and Understanding of General Accounting, Financial Reporting, Intercompany Accounting and Fixed Assets Accounting</p><p>Agile, Flexible and can easily adapt &amp;amp; learn in a fast moving environment</p><p>Excellent Knowledge in SAP</p><p>Strong Communication and Collaboration Skills in dealing with different Stakeholders</p><p>CPA License Holders are Highly Desirable</p><p><br></p>', '2018-09-08', 'Senior Accounting Consultants (3 Month Project Opportunity - Can Start ASAP)', '["Balance Sheet Reconciliation","Financial Reporting","Fixed Assets Transaction"]', '20000', '30000', '2018-03-26 08:49:00', 1),
('c1dfd96eea8cc2b62785275bca38ac261256e278', '17ba0791499db908433b80f37c5fbc89b870084b', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Job level - Mid-Senior Level / Manager, Job category - Manufacturing and Production, Educational requirement - Graduated from college', '<p>Job level - Mid-Senior Level / Manager, Job category - Manufacturing and Production, Educational requirement - Graduated from college</p><p>Job level - Mid-Senior Level / Manager, Job category - Manufacturing and Production, Educational requirement - Graduated from college</p><p>Job level - Mid-Senior Level / Manager, Job category - Manufacturing and Production, Educational requirement - Graduated from college</p><p>Job level - Mid-Senior Level / Manager, Job category - Manufacturing and Production, Educational requirement - Graduated from college</p>', '2018-03-24', 'Procurement Manager', '["Business Administration","Engineering","Negotiation"]', '20000', '300000', '2018-03-24 11:07:08', 1),
('c5b76da3e608d34edb07244cd9b875ee86906328', '22d200f8670dbdb3e253a90eee5098477c95c23d', 'b3f0c7f6bb763af1be91d9e74eabfeb199dc1f1f', 'Candidate must possess at least a Bachelors/College Degree , Computer Science/Information Technology, Engineering (Computer/Telecommunication) or equivalent.', '<p>Candidate must possess at least a Bachelors/College Degree , Computer Science/Information Technology, Engineering (Computer/Telecommunication) or equivalent.</p><p>Required skill(s): knowledge in SAP HANA, SAP ABAP.</p><p>At least 2 year(s) of working experience in the related field is required for this position.</p><p>Applicants must be willing to work in Quezon City.&lt;/li&gt;&lt;li&gt;Applicants must be willing to work any shift.</p><p>Full-Time position(s) available.</p>', '2018-08-09', 'Sap Abap Consultant', '["SAP HANA","SAP ABAP"]', '18000', '25000', '2018-03-26 15:22:15', 2),
('ca3512f4dfa95a03169c5a670a4c91a19b3077b4', 'bc33ea4e26e5e1af1408321416956113a4658763', '0716d9708d321ffb6a00818614779e779925365c', 'We are looking for an iOS developer who is gonna be responsible for the development and maintenance of applications aimed at a range of iOS devices including mobile phones and tablet computers. ', '<p><span style="color: rgb(34, 34, 34);">We are looking for an iOS developer who is gonna be responsible for the development and maintenance of applications aimed at a range of iOS devices including mobile phones and tablet computers. Your primary focus will be development of iOS applications and their integration with back-end services. You will be working alongside with other developers and QAs working on different layers of the infrastructure. A commitment to collaborative problem solving, sophisticated design, and the creation of quality products is essential.</span></p>', '2018-07-25', 'IOS Developer', '["swift","objective-c"]', '25000', '35000', '2018-03-26 13:43:51', 2);
INSERT INTO `tbl_vacancies` (`id`, `employer_id`, `business_id`, `short_description`, `description`, `vacancy_date`, `job_title`, `skills`, `salary_min`, `salary_max`, `date`, `status`) VALUES
('cb4e5208b4cd87268b208e49452ed6e89a68e0b8', 'f6e1126cedebf23e1463aee73f9df08783640400', '1574bddb75c78a6fd2251d61e2993b5146201319', 'We are looking to immediately hire two graphic artists. You will be joining a team of 6 talented graphic artists, but also working with some of our other 40 staff. The main business activity of our company is web and graphic design, and branding. Our graphics work is very diverse, and depending on your skill set, you could be creating designs for our websites or mobile apps, or designing graphic collaterals.', '<p><span style="color: rgb(34, 34, 34);">We are looking to immediately hire two graphic artists. You will be joining a team of 6 talented graphic artists, but also working with some of our other 40 staff. The main business activity of our company is web and graphic design, and branding. Our graphics work is very diverse, and depending on your skill set, you could be creating designs for our websites or mobile apps, or designing graphic collaterals. You may be involved in branding, photoshoots, videography, animation, logo design, advertising graphic design, and many more.</span></p><p>Photography</p><p>Videography</p><p>Expertise in video editing applications:</p><p>  After Effects, Final Cut Pro, Adobe Premiere Pro</p><p>Expertise in 3D platforms:</p><p>  Sketchup, Maya, Studio Max, etc.</p><p>UI/UX design</p><p><br></p>', '2018-04-21', 'Graphic Artist', '["adobe Indesign","adobe illustrator","adobe photoshop"]', '15000', '20000', '2018-03-26 13:00:41', 2),
('cb7a1d775e800fd1ee4049f7dca9e041eb9ba083', '887309d048beef83ad3eabf2a79a64a389ab1c9f', '0716d9708d321ffb6a00818614779e779925365c', '1. Provides technical support to customer regarding PAX equipments.\r\n2.Communicates with customers to provide infrmation and assistance on product use, hardware and software problems.\r\n3. Troubleshoot and resolve any issues that the customer may have.', '<p>1. Provides technical support to customer regarding PAX equipments.</p><p>2.Communicates with customers to provide infrmation and assistance on product use, hardware and software problems.</p><p>3. Troubleshoot and resolve any issues that the customer may have.</p><p><br></p><p><span style="color: rgb(34, 34, 34);">Good English Communication Skills</span></p><p><span style="color: rgb(34, 34, 34);">College Graduate.</span></p><p><span style="color: rgb(34, 34, 34);">Able to multi-task and is comfortable working with shifting hours (Morning Shift/Night Shift).</span></p><p><span style="color: rgb(34, 34, 34);">Can handle advance troubleshooting issues.</span></p><p><br></p>', '2018-06-22', 'Technical Support Representative', '["Good English Communication Skills","advance troubleshooting"]', '15000', '20000', '2018-03-26 13:33:07', 2),
('d435a6cdd786300dff204ee7c2ef942d3e9034e2', '12c6fc06c99a462375eeb3f43dfd832b08ca9e17', 'f1abd670358e036c31296e66b3b66c382ac00812', 'Managing Rewards Settlement Internal External partners\r\nProject Settlement Tracking\r\nPoints Selling Monitoring\r\nSupport in monitoring Rewards transaction', '<p>Candidate must possess at least a Bachelors College Degree in Accountancy or any related course.Preferably with at least 1-2 years of working experience in the related field.</p><p>Can work under minimum supervision.</p><p>Willing to be assigned in BGC, Taguig Can start ASAP</p>', '2018-04-22', 'Accounting Assistant (for a Telco Company in BGC, Taguig)', '["point selling monitor","project settlement tracking"]', '15000', '18000', '2018-03-26 10:16:49', 1),
('da4b9237bacccdf19c0760cab7aec4a8359010b0', 'fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Job level - Associate / Supervisor, Job category - Management and Consultancy, Educational requirement - Graduated from college', '<p>Job level - Associate / Supervisor, Job category - Management and Consultancy, Educational requirement - Graduated from college</p><p>Job level - Associate / Supervisor, Job category - Management and Consultancy, Educational requirement - Graduated from college</p><p>Job level - Associate / Supervisor, Job category - Management and Consultancy, Educational requirement - Graduated from college</p><p>Job level - Associate / Supervisor, Job category - Management and Consultancy, Educational requirement - Graduated from college</p>', '2018-03-24', 'Sales Analyst', '["Accounting","writing","Communication"]', '13000', '15000', '2018-03-24 10:56:33', 1),
('e1822db470e60d090affd0956d743cb0e7cdf113', '0a57cb53ba59c46fc4b692527a38a87c78d84028', '9e6a55b6b4563e652a23be9d623ca5055c356940', 'The purpose of this position is to play a role in the delivery of online marketing services with a heavy focus on SEO delivery and associated web development tasks.', '<p><span style="color: rgb(34, 34, 34);">Since this is a mid-level position, you donâ€™t have to have immense amounts of SEO strategy experience, but you do have to have an excellent understanding of how search works, some hands-on experience, and a good knowledge of the industry tools we use.</span></p>', '2018-03-05', 'SEO Specialist', '["search console","webmaster tool","google analytics"]', '30000', '40000', '2018-03-26 14:52:30', 2),
('e6c3dd630428fd54834172b8fd2735fed9416da4', '632667547e7cd3e0466547863e1207a8c0c0c549', 'b3f0c7f6bb763af1be91d9e74eabfeb199dc1f1f', 'Candidate must possess at least a Bachelors/College Degree , any field.\r\nRequired skill(s): laravel, front end development, PHP, MYSQL, MFC, CSS.\r\nAt least 4 year(s) of working experience in the related field is required for this position.\r\n', '<p>Candidate must possess at least a Bachelors/College Degree , any field.</p><p>Required skill(s): laravel, front end development, PHP, MYSQL, MFC, CSS.</p><p>At least 4 year(s) of working experience in the related field is required for this position.</p><p>Amenable to work in Quezon City</p><p>Willing to work nightshift</p>', '2018-06-24', 'Front End Developer (PHP and Laravel)', '["front end development","php","mysql","MFC","CSS"]', '18000', '25000', '2018-03-26 16:08:37', 2),
('f1abd670358e036c31296e66b3b66c382ac00812', '472b07b9fcf2c2451e8781e944bf5f77cd8457c8', 'fa35e192121eabf3dabf9f5ea6abdbcbc107ac3b', 'RGP is looking for a Change Management Consultants to support one of our clientâ€™s Business Transformation Initiatives and Projects. The client is one of the biggest providers of Air-Conditioning Solutions and Refrigerators here in the Philippines.', '<p>At least 10 years of experience in Change Management</p><p>Excellent Project Management Skills</p><p>Demonstrated success achieving organizational goals</p><p>Strong Critical Thinking, Analytical and Problem Solving Skills</p><p>Top-notch communications, both verbal and in writing. Well-honed presentation skills.</p><p>Excellent Stakeholder Management Skills</p><p>Ability to drive clarity in a rapidly changing and ambiguous environment</p><p>Ability to leverage software applications (e.g. MS Office etc)</p><p>CCMP and PMP Certifications are highly desirable.</p><p><br></p>', '2018-12-06', 'Change Management Consultants (6 Months Contract Opportunity - Can Start ASAP)', '["MS Office","Excellent Stakeholders","problem Solving Skills"]', '25000', '30000', '2018-03-26 09:24:06', 1),
('f1f836cb4ea6efb2a0b1b99f41ad8b103eff4b59', 'f6e1126cedebf23e1463aee73f9df08783640400', '1574bddb75c78a6fd2251d61e2993b5146201319', 'We are looking to immediately hire five Full Stack Node.js developers. Both fresh graduates and  experienced developers may apply. Foremost, you must be able to prove that you have experience, or have a keen interest in the Node.js framework. You will be joining a team of 30 experienced developers.', '<p><span style="color: rgb(34, 34, 34);">We are looking to immediately hire five Full Stack Node.js developers. Both fresh graduates and&nbsp; experienced developers may apply. Foremost, you must be able to prove that you have experience, or have a keen interest in the Node.js framework. You will be joining a team of 30 experienced developers.</span></p><p>As part of the R&amp;amp;D team, you will research and anticipate new technologies and their opportunities for our clients.</p><p>Work hand-in-hand with the mobile apps team</p><p>Work hand-in-hand with the Laravel team</p><p>As a team player, share your experiences and findings with your team</p><p><br></p>', '2018-12-09', 'Node.js Full Stack Developer', '["angular.js","node.js","vue.js","JS framework","mongo.db"]', '20000', '26000', '2018-03-26 13:09:21', 2),
('f6e1126cedebf23e1463aee73f9df08783640400', 'd435a6cdd786300dff204ee7c2ef942d3e9034e2', 'f1abd670358e036c31296e66b3b66c382ac00812', 'ECE Graduate or equivalent\r\nAt least 1 year work experience in related field\r\nCan confidently speak in front of â€˜medium to large sizedâ€™ groups of people\r\nPreferably with driving skills and non-pro driverâ€™s license', '<p>Technical Training - Subscriber Line Installation and Repair (Wired and Wireless)o Safety Starts with Me</p><p>Performs all logistic requirements related to training:Leaders on the scheduled training</p><p>Prints training handouts and materialso</p><p>Prepares weekly and monthly reports (scorecard, certification exam results, training costs,</p><p>Cascades any newly introduced technologies, products and services as necessary</p><p>Database management</p><p>Shadowing activities (field work)</p>', '2018-12-21', 'Training Specialist', '["Subscriber Line Installation","Database Management","Training Cost"]', '25000', '30000', '2018-03-26 10:49:03', 1),
('fa35e192121eabf3dabf9f5ea6abdbcbc107ac3b', '7b52009b64fd0a2a49e6d8a939753077792b0554', 'fa35e192121eabf3dabf9f5ea6abdbcbc107ac3b', 'RGP is looking for experienced professionals with experience in utilizing Lean Six Sigma Methodologies in process improvement projects and initiatives for one of our multinational manufacturing clients.', '<p>Support APAC Regional Lead for the implementation of lean daily management and projects for Shared Services, Procurement, Finance and Human Resources</p><p>Monitor status and coordinate efforts for continuous improvement initiative</p><p>Promote a continuous improvement environment by providing guidance and direction, as agreed with Regional Lead, to relevant process owners</p><p>Align process improvement activities with the Companyâ€™s strategic goals and provide recommendations as necessary</p><p><br></p>', '2018-12-12', 'Lean Six Sigma Consultant (6 Month Contract Opportunity - Can Start Immediately)', '["Shared Services","Procurement","Human Resource","Finance"]', '25000', '30000', '2018-03-26 08:56:28', 1),
('fb644351560d8296fe6da332236b1f8d61b2828a', '7719a1c782a1ba91c031a682a0a2f8658209adbf', '9e6a55b6b4563e652a23be9d623ca5055c356940', 'Senior CPA accountant - is to prepare Australian tax returns, financial statements and meet ongoing tax compliance obligations for Australian based clients.  ', '<p>Senior CPA accountant - is to prepare Australian tax returns, financial statements and meet ongoing tax compliance obligations for Australian based clients.&nbsp;By delivering outstanding tax service to their clients they aim to develop long term relationships with clients to assist them in building wealth across all divisions; tax, financial planning, property and finance.</p>', '2018-10-24', 'Senior Tax Accountant (for an Australian Accounting firm )', '["financial planning","tax","finance"]', '15000', '20000', '2018-03-26 14:22:37', 2),
('fc074d501302eb2b93e2554793fcaf50b3bf7291', '887309d048beef83ad3eabf2a79a64a389ab1c9f', '0716d9708d321ffb6a00818614779e779925365c', 'Candidate must possess at least Bachelors/College Degree in Computer Science/Information Technology or equivalent.\r\nAt least 2&nbsp;Year(s) of working experience in the related field is required for this position.\r\nPreferably 1-4 Yrs Experienced Employee specialized in IT/Computer - Software or equivalent.', '<p>Candidate must possess at least Bachelors/College Degree in Computer Science/Information Technology or equivalent.</p><p>At least 2&amp;nbsp;Year(s) of working experience in the related field is required for this position.</p><p>Preferably 1-4 Yrs Experienced Employee specialized in IT/Computer - Software or equivalent.</p><p><span style="color: rgb(34, 34, 34);">- Experienced in creating RESTful APIs</span></p><p><span style="color: rgb(34, 34, 34);">- Experienced in MVC frameworks (Code igniter&nbsp;and / or Laravel)</span></p><p><span style="color: rgb(34, 34, 34);">- Familiarity in Linux command lines.</span></p><p><br></p><p><br></p>', '2018-12-25', 'Web Developer', '["html ","css","javascript","php","framework"]', '27000', '40000', '2018-03-26 13:26:55', 2),
('fe2ef495a1152561572949784c16bf23abb28057', '7719a1c782a1ba91c031a682a0a2f8658209adbf', '9e6a55b6b4563e652a23be9d623ca5055c356940', 'EMAPTA is looking for a SEO Specialist who can join our team in Ortigas\r\nThe purpose of this position is to play a role in the delivery of online marketing services with a heavy focus on SEO delivery and associated web development tasks.', '<p><span style="color: rgb(34, 34, 34);">Since this is a mid-level position, you donâ€™t have to have immense amounts of SEO strategy experience, but you do have to have an excellent understanding of how search works, some hands-on experience, and a good knowledge of the industry tools we use.</span></p>', '2018-12-31', 'Search Engine Optimization Specialist', '["wordpress","magento","drupal","big commerce","shopify"]', '45000', '65000', '2018-03-26 14:28:04', 2),
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
-- Indexes for table `tbl_schedule`
--
ALTER TABLE `tbl_schedule`
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
  ADD KEY `business_id` (`business_id`);
ALTER TABLE `tbl_vacancies` ADD FULLTEXT KEY `job_title` (`job_title`);
ALTER TABLE `tbl_vacancies` ADD FULLTEXT KEY `skills_2` (`skills`,`job_title`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
