-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 20, 2018 at 01:54 PM
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
  `applicant_id` varchar(60) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
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
('356a192b7913b04c54574d18c28d46e6395428ab', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'Elementary', 'Bongalon Elementary School, Bongalon, Labrador, Pangasinan', 'null', 'null', '2003', '2009', '2018-03-20 13:40:06'),
('b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'da4b9237bacccdf19c0760cab7aec4a8359010b0', 'Elementary', 'Macabito Calasiao Pangasinan', 'null', 'null', '2000', '2006', '2018-03-10 19:23:51'),
('da4b9237bacccdf19c0760cab7aec4a8359010b0', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'High School', 'Labrador National High School', 'null', 'null', '2009', '2013', '2018-03-20 13:40:44');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_accountinfo`
--

CREATE TABLE `tbl_accountinfo` (
  `id` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `first_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `middle_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_admin`
--

CREATE TABLE `tbl_admin` (
  `id` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fname` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lname` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(60) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `username` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `level` varchar(1) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(70) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
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
('356a192b7913b04c54574d18c28d46e6395428ab', 'Lorem ipsum dolor sit amet, at commodo, ligula felis, semper sit ut sed consectetuer volutpat, id cum magnis mollis. Semper donec risus volutpat varius vestibulum, consectetuer scelerisque in a dolore, nulla sed mauris maecenas nunc, hac lectus tincidunt. ', 'elvin@gmail.com', '$2y$11$7AABW2mNg/Ocwz6vVga73eJqQ3eUlXWjhMSZVtcWC5VtYBe6jbCu.', '', '', '1'),
('b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'Lorem ipsum dolor sit amet, at commodo, ligula felis, semper sit ut sed consectetuer volutpat, id cum magnis mollis. Semper donec risus volutpat varius vestibulum, consectetuer scelerisque in a dolore, nulla sed mauris maecenas nunc, hac lectus tincidunt. ', 'othanmillet@gmail.com', '$2y$11$9O6zO5appQUg/TTj2b7QLOXmLhelWNduQYZlYhNEcDpHHrFKipqr2', '', '', '1'),
('da4b9237bacccdf19c0760cab7aec4a8359010b0', NULL, 'johnsmith@gmail.com', '$2y$11$bAA/AMxMlu7Bl/QF/QDB7OyRKIonEcXH4qtKPU9DTrqx/bNVula8.', '', '', '1');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_application`
--

CREATE TABLE `tbl_application` (
  `id` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `vacancy_id` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `applicant_id` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(1) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_bookmark`
--

CREATE TABLE `tbl_bookmark` (
  `id` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `vacancy_id` varchar(60) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `applicant_id` varchar(60) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date` varchar(60) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(60) COLLATE utf8mb4_unicode_ci DEFAULT NULL
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

CREATE TABLE `tbl_business` (
  `id` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(300) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `contact_number` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `company_name` varchar(300) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` mediumtext COLLATE utf8mb4_unicode_ci,
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
('0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Business Address', 'Number', 'Name', NULL, 'business_1519974506.rnr', 'email@email.com', '1', NULL, '2018-02-26 17:03:25'),
('1', 'Las Vegas Street Lingayen', '090101010101', 'Rufo Cocorp Inc.', '<h2><span style="color: rgb(230, 0, 0);">Description</span></h2><p><strong style="color: rgb(255, 153, 0);">Hello world</strong></p><p><em style="color: rgb(255, 255, 0);">Hello world</em></p><p><u style="color: rgb(0, 138, 0);">Hello world</u></p><p><s style="color: rgb(0, 102, 204);">Hello world</s></p><ol><li><span style="color: rgb(194, 133, 255);">Hello world</span></li></ol><p><span style="color: rgb(153, 51, 255);">H</span><sup style="color: rgb(153, 51, 255);">ello world</sup></p><p>ha</p><h2><sup class="ql-font-monospace" style="color: rgb(153, 51, 255);">hello world</sup></h2><p><span style="color: rgb(255, 255, 255); background-color: rgb(0, 0, 0);">0010001000101010100010</span></p><p><span style="color: rgb(255, 255, 255); background-color: rgb(0, 0, 0);">0010001000101010100010</span></p><p>Hhahahah</p><p><br></p><p>check again</p><p><span style="color: rgb(255, 255, 255); background-color: rgb(0, 0, 0);">check</span></p>', 'business_1519982947.rnr', 'rufo@email.com', '1', '', ''),
('1574bddb75c78a6fd2251d61e2993b5146201319', 'Lingayen', '09123456789', 'Shakeys', NULL, NULL, 'shakeys@gmail.com', '1', NULL, '2018-03-12 23:47:53'),
('17ba0791499db908433b80f37c5fbc89b870084b', 'Business Address', 'Number', 'Name', NULL, NULL, 'email@email.com', '1', NULL, '2018-02-26 17:14:18'),
('1b6453892473a467d07372d45eb05abc2031647a', 'Lingayen', '0912334455671 ', 'Gabrillo Enterprise 1', 'Tubig kayo dyan', 'business_1519964158.rnr', 'rufongabrillojr@gmail.com', '1', '', ''),
('356a192b7913b04c54574d18c28d46e6395428ab', '', '', 'Gabrillo Enterprisess 1', '', 'business_1519963774.rnr', 'rufogabrillo@gmail.com', '1', '', ''),
('77de68daecd823babbb58edb1c8e14d7106e83bb', '', '', 'Gabrillo Enterprises', '', '77de68daecd823babbb58edb1c8e14d7106e83bb-1507300053.apr', 'rufo.gabrillo2@gmail.com', '1', '', ''),
('7b52009b64fd0a2a49e6d8a939753077792b0554', 'Business Address', 'Number', 'Name', '<p>Business pa more</p>', NULL, 'email@email.com', '1', NULL, '2018-02-26 17:14:19'),
('902ba3cda1883801594b6e1b452790cc53948fda', NULL, NULL, 'Great Company', NULL, 'profile_avatar.jpg', 'gc@gmail.com', '0', '', ''),
('ac3478d69a3c81fa62e60f5c3696165a4e5e6ac4', 'Lingayen', '0999', 'Kopiko', 'Coffee', 'profile_avatar.jpg', 'kopiko@gmail.com', '0', '', ''),
('b1d5781111d84f7b3fe45a0852e59758cd7a87e5', 'Business Address', 'Number', 'Name', NULL, NULL, 'email@email.com', '1', NULL, '2018-02-26 17:03:30'),
('b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'Poblacion East, Calasiao Pangasinan', '09484993958', 'asdsdsds', 'This is Description', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c-1507518045.apr', 'emp123', '1', '', ''),
('bd307a3ec329e10a2cff8fb87480823da114f8f4', 'Business Address', 'number', 'Company Name', NULL, NULL, 'email@email.com', '1', NULL, '2018-02-26 17:14:51'),
('c1dfd96eea8cc2b62785275bca38ac261256e278', NULL, NULL, 'e-Machines', NULL, 'profile_avatar.jpg', 'emach@gmail.com', '1', '', ''),
('da4b9237bacccdf19c0760cab7aec4a8359010b0', 'Dagupan', '09', 'Boneless Bangus', 'Walang tinik', 'da4b9237bacccdf19c0760cab7aec4a8359010b0-1507913543.apr', 'bone@gmail.com', '1', '', ''),
('f1abd670358e036c31296e66b3b66c382ac00812', 'Lingayen', '0912345678', 'Mc Donalds', '<p>Love ko to</p>', NULL, 'mcdonald@gmail.com', '1', NULL, '2018-03-12 23:45:22'),
('fa35e192121eabf3dabf9f5ea6abdbcbc107ac3b', 'Lingayen', '09123456789', 'Nestle', NULL, NULL, 'nestle@gmail.com', '1', NULL, '2018-03-12 23:22:57'),
('fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', 'address', 'number', 'RNR Corp.', NULL, NULL, 'email@email.com', '1', NULL, '2018-02-26 16:59:52'),
('pHilMont123', 'Manaoag', '09481234567', 'PhilMont', 'beauty products', 'pHilMont123-1458551347.apr', 'donaldduck@gmail.com', '1', '', ''),
('ToyotaCars', 'Calasiao, Pangasinan', '09129837641', 'Toyota ', 'Cars and Vehicle for you and Me. Forever.', 'toyota.jpg', 'richardMercy@gmail.com', '1', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_businessmanagers`
--

CREATE TABLE `tbl_businessmanagers` (
  `id` varchar(70) COLLATE utf8mb4_unicode_ci NOT NULL,
  `business_id` varchar(70) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
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
('1b6453892473a467d07372d45eb05abc2031647a', '356a192b7913b04c54574d18c28d46e6395428ab', 'Rufo Gabrillo', 'rufo@deegeelab.com', '$2y$11$ihqk7eVo4R8Ox1hHzN3mi.89h.zVw7m7Q7gNXx6yRI7IYyY.oykju', NULL, 'Dish Washer', '2018-03-01 15:30:29', '1'),
('356a192b7913b04c54574d18c28d46e6395428ab', '1b6453892473a467d07372d45eb05abc2031647a', 'James Reid', 'rufo.gabrillo@rnrdigitalconsultancy.com', '$2y$11$eZnkAbcbvLLkspcRI4roK.zY7IeplxAvCk278JhH8aNkND25NIjMm', NULL, 'Technical Lead', '2018-03-01 10:22:57', '1'),
('77de68daecd823babbb58edb1c8e14d7106e83bb', '1b6453892473a467d07372d45eb05abc2031647a', 'Wil Son', 'wil.son@gmail.com', '$2y$11$dtt6y20DrP/OR9W7ReghvOdJtkw/0y94Fx0C/GYEI5tIlnfBP3m62', '', 'Content Writer', '2018-03-01 13:39:31', '1'),
('902ba3cda1883801594b6e1b452790cc53948fda', 'f1abd670358e036c31296e66b3b66c382ac00812', 'John', 'john.lazy@gmail.com', '$2y$11$/CZB/kKUyNhyrvGQ6nfV8uJNUxe0X0IQsFpjY91NE2R7hn7A1r02u', NULL, 'Lazy', '2018-03-12 23:58:42', '1'),
('ac3478d69a3c81fa62e60f5c3696165a4e5e6ac4', '1b6453892473a467d07372d45eb05abc2031647a', 'Mark Gallano', 'mark@gmail.com', '$2y$11$glDH89j0OpCIS9BK3S7qS.JjgYew9TD237KjfVPbcupBnkrmMy0b.', NULL, 'Nilasing si renz at ginuhitan niyaya kumain sa mcdo', '2018-03-03 08:16:36', '1'),
('b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', '1b6453892473a467d07372d45eb05abc2031647a', 'Rufo N. Gabrillo', 'rufo.gabrillo@gmail.com', '$2y$11$BV1OJ74oQHnuG541kSj65ufdB449X.aVobXmofu9MnkvRhqQsjhpa', 'avatar.png', 'Technical Lead', '2018-03-01 13:12:32', '1'),
('c1dfd96eea8cc2b62785275bca38ac261256e278', '7b52009b64fd0a2a49e6d8a939753077792b0554', 'Othan Millet', 'othanmillet@gmail.com', '$2y$11$Kg67mpfEOV.vKC77IqceQO3MwtWAB/zOKGPwr2aR5zuqynbACxTni', 'employer_1520856298.rnr', 'Position', '2018-03-08 22:04:22', '1'),
('da4b9237bacccdf19c0760cab7aec4a8359010b0', '1b6453892473a467d07372d45eb05abc2031647a', 'Jolo D.', 'jolod@gmail.com', '$2y$11$NkIWGqyHW0Va.rnCaMi25eor6AERo.lJRLoiDsYoUC8AMW.OTX96a', NULL, 'Graphic Designer', '2018-03-01 13:35:06', '1');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_career`
--

CREATE TABLE `tbl_career` (
  `id` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `applicant_id` varchar(60) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
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
('1', 'da4b9237bacccdf19c0760cab7aec4a8359010b0', 'Agency', 'Janitor', '20000', 'Contractual', '2016-08-08', '2017-12-22', '2018-03-20 20:02:06'),
('356a192b7913b04c54574d18c28d46e6395428ab', 'da4b9237bacccdf19c0760cab7aec4a8359010b0', 'Pangasinan State University', 'IT Instructor', '21,000', 'Contractual', '2016-08-08', '2017-12-22', '2018-03-10 20:02:06'),
('b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'da4b9237bacccdf19c0760cab7aec4a8359010b0', 'ES Assisting', 'Web Developer', '12000', 'Job Order', '2015', '2016', '2018-03-10 19:51:28'),
('da4b9237bacccdf19c0760cab7aec4a8359010b0', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'Agency', 'Position', '12000', 'Contractual', '2014', '2016', '2018-03-20 13:41:51');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_logs`
--

CREATE TABLE `tbl_logs` (
  `id` varchar(70) COLLATE utf8mb4_unicode_ci NOT NULL,
  `from_account_id` varchar(70) COLLATE utf8mb4_unicode_ci NOT NULL,
  `to_account_id` varchar(70) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remarks` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `header` varchar(300) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_logs`
--

INSERT INTO `tbl_logs` (`id`, `from_account_id`, `to_account_id`, `remarks`, `date`, `header`) VALUES
('008451a05e1e7aa32c75119df950d405265e0904', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', '1b6453892473a467d07372d45eb05abc2031647a', 'Deleted skill', '2018-03-20 13:48:34', 'Delete'),
('0286dd552c9bea9a69ecb3759e7b94777635514b', 'c1dfd96eea8cc2b62785275bca38ac261256e278', 'c1dfd96eea8cc2b62785275bca38ac261256e278', 'Updated shortDes to Job level - Mid-Senior Level / Manager, Job category - Accounting and Finance, Educational requirement - Graduated from college.', '2018-03-14 17:17:44', 'Update'),
('0716d9708d321ffb6a00818614779e779925365c', 'admin_id', 'fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', 'Added Matthew West as account manager', '2018-03-14 11:10:24', 'Add'),
('08a35293e09f508494096c1c1b3819edb9df50db', 'admin_id', 'fa35e192121eabf3dabf9f5ea6abdbcbc107ac3b', 'Added Apple Corp. to businesses', '2018-03-15 21:16:03', 'Add'),
('0a57cb53ba59c46fc4b692527a38a87c78d84028', 'fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', 'd435a6cdd786300dff204ee7c2ef942d3e9034e2', 'Posted a job', '2018-03-14 11:30:35', 'Add'),
('0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'c1dfd96eea8cc2b62785275bca38ac261256e278', 'c1dfd96eea8cc2b62785275bca38ac261256e278', 'Posted a job', '2018-03-14 10:34:51', 'Add'),
('0ca9277f91e40054767f69afeb0426711ca0fddd', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'da4b9237bacccdf19c0760cab7aec4a8359010b0', 'Added Academic', '2018-03-20 13:40:44', 'Add'),
('114d4eefde1dae3983e7a79f04c72feb9a3a7efd', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'da4b9237bacccdf19c0760cab7aec4a8359010b0', 'Added Career', '2018-03-20 13:41:51', 'Add'),
('12c6fc06c99a462375eeb3f43dfd832b08ca9e17', 'fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', '0716d9708d321ffb6a00818614779e779925365c', 'Posted a job', '2018-03-14 11:21:09', 'Add'),
('1352246e33277e9d3c9090a434fa72cfa6536ae2', 'ac3478d69a3c81fa62e60f5c3696165a4e5e6ac4', 'ac3478d69a3c81fa62e60f5c3696165a4e5e6ac4', 'update picture', '2018-03-15 21:10:35', 'Update'),
('1574bddb75c78a6fd2251d61e2993b5146201319', '902ba3cda1883801594b6e1b452790cc53948fda', '7b52009b64fd0a2a49e6d8a939753077792b0554', 'Posted a job', '2018-03-14 11:08:41', 'Add'),
('16b06bd9b738835e2d134fe8d596e9ab0086a985', 'c1dfd96eea8cc2b62785275bca38ac261256e278', 'c1dfd96eea8cc2b62785275bca38ac261256e278', 'update picture', '2018-03-15 21:12:09', 'Update'),
('17503a6b2326f09fbc4e3a7c03874c7333002038', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'c1dfd96eea8cc2b62785275bca38ac261256e278', 'Added Developer', '2018-03-20 11:24:57', 'Add'),
('17ba0791499db908433b80f37c5fbc89b870084b', 'admin_id', '902ba3cda1883801594b6e1b452790cc53948fda', 'Added John Lazy as account manager', '2018-03-14 10:47:12', 'Add'),
('1b6453892473a467d07372d45eb05abc2031647a', 'admin_id', '17ba0791499db908433b80f37c5fbc89b870084b', 'Updated description to <p><span style="color: rgb(230, 0, 0);">asasas</span></p>', '2018-03-14 08:17:27', 'Update'),
('1d513c0bcbe33b2e7440e5e14d0b22ef95c9d673', 'admin_id', '17ba0791499db908433b80f37c5fbc89b870084b', 'update picture', '2018-03-15 21:07:47', 'Update'),
('1f1362ea41d1bc65be321c0a378a20159f9a26d0', '902ba3cda1883801594b6e1b452790cc53948fda', '7b52009b64fd0a2a49e6d8a939753077792b0554', 'Updated status to 1. activate\n', '2018-03-15 00:44:56', 'Update'),
('215bb47da8fac3342b858ac3db09b033c6c46e0b', 'c1dfd96eea8cc2b62785275bca38ac261256e278', '902ba3cda1883801594b6e1b452790cc53948fda', 'Updated Short Description to Job level - Associate / Supervisor, Job category - Sales and Marketing, Educational requirement - Graduated from college.', '2018-03-16 12:46:49', 'Update'),
('22d200f8670dbdb3e253a90eee5098477c95c23d', 'c1dfd96eea8cc2b62785275bca38ac261256e278', '902ba3cda1883801594b6e1b452790cc53948fda', 'Updated title to Category Lead', '2018-03-14 13:12:10', 'Update'),
('2a2b47bf21a372f267deccbb420567f3d450b3c0', '356a192b7913b04c54574d18c28d46e6395428ab', 'c1dfd96eea8cc2b62785275bca38ac261256e278', 'Added ', '2018-03-20 15:11:25', 'Add'),
('2a459380709e2fe4ac2dae5733c73225ff6cfee1', 'c1dfd96eea8cc2b62785275bca38ac261256e278', '902ba3cda1883801594b6e1b452790cc53948fda', 'Updated salary to 20001', '2018-03-15 00:36:22', 'Update'),
('2a7541babb57434e5631ffa2b5639e24f8ce84fc', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'c1dfd96eea8cc2b62785275bca38ac261256e278', 'Deleted skill', '2018-03-20 13:52:01', 'Delete'),
('2d0c8af807ef45ac17cafb2973d866ba8f38caa9', 'da4b9237bacccdf19c0760cab7aec4a8359010b0', 'da4b9237bacccdf19c0760cab7aec4a8359010b0', 'update picture', '2018-03-15 21:12:30', 'Update'),
('2e01e17467891f7c933dbaa00e1459d23db3fe4f', 'c1dfd96eea8cc2b62785275bca38ac261256e278', '902ba3cda1883801594b6e1b452790cc53948fda', 'Updated status to 0. activate', '2018-03-14 17:46:38', 'Update'),
('310b86e0b62b828562fc91c7be5380a992b2786a', 'c1dfd96eea8cc2b62785275bca38ac261256e278', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'Updated salary to 70000', '2018-03-20 08:36:46', 'Update'),
('31bd9b9f5f7b338e41b56183a2f3008b541d7c84', 'c1dfd96eea8cc2b62785275bca38ac261256e278', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'Updated title to Job Titles', '2018-03-20 08:36:15', 'Update'),
('356a192b7913b04c54574d18c28d46e6395428ab', 'c1dfd96eea8cc2b62785275bca38ac261256e278', '356a192b7913b04c54574d18c28d46e6395428ab', 'Posted a job', '2018-03-13 22:04:07', 'Add'),
('35e995c107a71caeb833bb3b79f9f54781b33fa1', '902ba3cda1883801594b6e1b452790cc53948fda', '7b52009b64fd0a2a49e6d8a939753077792b0554', 'Updated status to 0. activate', '2018-03-15 00:44:46', 'Update'),
('3c26dffc8a2e8804dfe2c8a1195cfaa5ef6d0014', 'admin_id', 'b1d5781111d84f7b3fe45a0852e59758cd7a87e5', 'update picture', '2018-03-15 21:10:56', 'Update'),
('40f7c01f4189510031adccd9c604a128adaf9b00', '356a192b7913b04c54574d18c28d46e6395428ab', '356a192b7913b04c54574d18c28d46e6395428ab', 'Updated field_mname', '2018-03-20 15:09:19', 'Update'),
('450ddec8dd206c2e2ab1aeeaa90e85e51753b8b7', 'c1dfd96eea8cc2b62785275bca38ac261256e278', '902ba3cda1883801594b6e1b452790cc53948fda', 'Updated title to Category Lead', '2018-03-15 00:53:35', 'Update'),
('472b07b9fcf2c2451e8781e944bf5f77cd8457c8', 'fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', '1574bddb75c78a6fd2251d61e2993b5146201319', 'Posted a job', '2018-03-14 11:19:37', 'Add'),
('4cd66dfabbd964f8c6c4414b07cdb45dae692e19', 'admin_id', 'fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', 'update picture', '2018-03-15 21:13:01', 'Update'),
('4d134bc072212ace2df385dae143139da74ec0ef', 'fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', 'b3f0c7f6bb763af1be91d9e74eabfeb199dc1f1f', 'Posted a job', '2018-03-14 11:24:42', 'Add'),
('4d89d294cd4ca9f2ca57dc24a53ffb3ef5303122', '902ba3cda1883801594b6e1b452790cc53948fda', '7b52009b64fd0a2a49e6d8a939753077792b0554', 'Updated title to HR Managers', '2018-03-15 00:43:38', 'Update'),
('511a418e72591eb7e33f703f04c3fa16df6c90bd', 'c1dfd96eea8cc2b62785275bca38ac261256e278', 'c1dfd96eea8cc2b62785275bca38ac261256e278', 'employer is updated', '2018-03-14 22:47:08', 'Update'),
('524e05dc77239f3a15dab766aaa59a9e432efde7', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'ac3478d69a3c81fa62e60f5c3696165a4e5e6ac4', 'Added development', '2018-03-20 11:23:32', 'Add'),
('54ceb91256e8190e474aa752a6e0650a2df5ba37', 'c1dfd96eea8cc2b62785275bca38ac261256e278', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'Deleted. full', '2018-03-14 18:22:47', 'Delete'),
('56ad4d4deaec98465c419b4a8ea7bfc1ed38c4d9', '356a192b7913b04c54574d18c28d46e6395428ab', '356a192b7913b04c54574d18c28d46e6395428ab', 'Updated field_address', '2018-03-20 15:09:57', 'Update'),
('59129aacfb6cebbe2c52f30ef3424209f7252e82', 'c1dfd96eea8cc2b62785275bca38ac261256e278', '902ba3cda1883801594b6e1b452790cc53948fda', 'Updated salary to 20000', '2018-03-15 00:36:44', 'Update'),
('5a5b0f9b7d3f8fc84c3cef8fd8efaaa6c70d75ab', 'c1dfd96eea8cc2b62785275bca38ac261256e278', '902ba3cda1883801594b6e1b452790cc53948fda', 'Updated title to Category Leads', '2018-03-14 21:19:44', 'Update'),
('5b384ce32d8cdef02bc3a139d4cac0a22bb029e8', 'c1dfd96eea8cc2b62785275bca38ac261256e278', '902ba3cda1883801594b6e1b452790cc53948fda', 'Updated status to 0. asdasd', '2018-03-14 16:44:40', 'Update'),
('632667547e7cd3e0466547863e1207a8c0c0c549', 'c1dfd96eea8cc2b62785275bca38ac261256e278', '902ba3cda1883801594b6e1b452790cc53948fda', 'Updated title to Category Leads', '2018-03-14 13:14:05', 'Update'),
('64e095fe763fc62418378753f9402623bea9e227', 'c1dfd96eea8cc2b62785275bca38ac261256e278', '902ba3cda1883801594b6e1b452790cc53948fda', 'Updated status to 0. ativate', '2018-03-14 17:44:10', 'Update'),
('667be543b02294b7624119adc3a725473df39885', 'c1dfd96eea8cc2b62785275bca38ac261256e278', 'da4b9237bacccdf19c0760cab7aec4a8359010b0', 'Deleted. full', '2018-03-14 18:25:42', 'Delete'),
('683e725c03a87baaad2623231644e944e537acab', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', '1b6453892473a467d07372d45eb05abc2031647a', 'Added Engineering', '2018-03-20 13:32:38', 'Add'),
('6c1e671f9af5b46d9c1a52067bdf0e53685674f7', 'c1dfd96eea8cc2b62785275bca38ac261256e278', 'c1dfd96eea8cc2b62785275bca38ac261256e278', 'Updated name to Othan Millet', '2018-03-14 22:35:58', 'Update'),
('6fb84aed32facd1299ee1e77c8fd2b1a6352669e', 'admin_id', 'c1dfd96eea8cc2b62785275bca38ac261256e278', 'Added Wilson Pogi as account manager', '2018-03-20 08:18:56', 'Add'),
('7224f997fc148baa0b7f81c1eda6fcc3fd003db0', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', '1b6453892473a467d07372d45eb05abc2031647a', 'Added Web', '2018-03-20 11:23:05', 'Add'),
('761f22b2c1593d0bb87e0b606f990ba4974706de', 'c1dfd96eea8cc2b62785275bca38ac261256e278', 'c1dfd96eea8cc2b62785275bca38ac261256e278', 'Updated salary to 30001', '2018-03-14 17:16:25', 'Update'),
('76546f9a641ede2beab506b96df1688d889e629a', '77de68daecd823babbb58edb1c8e14d7106e83bb', '77de68daecd823babbb58edb1c8e14d7106e83bb', 'update picture', '2018-03-15 21:08:57', 'Update'),
('7719a1c782a1ba91c031a682a0a2f8658209adbf', 'c1dfd96eea8cc2b62785275bca38ac261256e278', '902ba3cda1883801594b6e1b452790cc53948fda', 'Updated title to Category Leads', '2018-03-14 13:11:50', 'Update'),
('77de68daecd823babbb58edb1c8e14d7106e83bb', 'admin_id', '7b52009b64fd0a2a49e6d8a939753077792b0554', 'Updated description to <p><span class="ql-font-monospace ql-size-huge">This business iasdasdasdasdasdsa dasdasdasdsa dsa asd sada asd a adsd adas d</span></p>', '2018-03-14 08:01:46', 'Update'),
('78a8efcbaaa1a9a30f9f327aa89d0b6acaaffb03', '902ba3cda1883801594b6e1b452790cc53948fda', '356a192b7913b04c54574d18c28d46e6395428ab', 'Posted a job', '2018-03-20 09:48:04', 'Add'),
('7b52009b64fd0a2a49e6d8a939753077792b0554', '902ba3cda1883801594b6e1b452790cc53948fda', 'fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', 'Posted a job', '2018-03-14 10:51:50', 'Add'),
('7d7116e23efef7292cad5e6f033d9a962708228c', 'admin_id', '7b52009b64fd0a2a49e6d8a939753077792b0554', 'update picture', '2018-03-15 21:09:14', 'Update'),
('80e28a51cbc26fa4bd34938c5e593b36146f5e0c', 'c1dfd96eea8cc2b62785275bca38ac261256e278', '902ba3cda1883801594b6e1b452790cc53948fda', 'Updated status to 0. deactivate', '2018-03-14 17:52:03', 'Update'),
('812ed4562d3211363a7b813aa9cd2cf042b63bb2', 'c1dfd96eea8cc2b62785275bca38ac261256e278', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'Posted a job', '2018-03-20 08:36:00', 'Add'),
('827bfc458708f0b442009c9c9836f7e4b65557fb', 'c1dfd96eea8cc2b62785275bca38ac261256e278', 'c1dfd96eea8cc2b62785275bca38ac261256e278', 'Updated longDes to <ol><li>Responsible for merchandising management and marketing of the companyâ€™s web store â€” the merchandising, marketing and sales of goods published online.</li><li>Develops various strategies for marketing the companyâ€™s products and brand through the Internet.</li><li>Makes use of different marketing techniques including SEM, SEO, PPC, Video, Display, Social and other similar techniques to keep the company in the forefront of digital marketing results and convert sales.</li><li>Monitors the Companyâ€™s web store and social media analytics, generates insight reports and delivers post-implementation reviews for the continual progression of our online campaigns and performance metrics</li><li>Remains forward-thinking and current on industry trends and market conditions to be able to give recommendations regarding best practices for improving marketing performance</li><li>Create and manage link building strategies, content marketing strategies, and social media presences.</li><li>Create and manage link building strategies, content marketing</li></ol>', '2018-03-14 17:31:23', 'Update'),
('887309d048beef83ad3eabf2a79a64a389ab1c9f', 'fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', '472b07b9fcf2c2451e8781e944bf5f77cd8457c8', 'Posted a job', '2018-03-14 11:28:02', 'Add'),
('8b7471f4ae0bf59f5f0a425068c05d96f4801b9e', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'c1dfd96eea8cc2b62785275bca38ac261256e278', 'Added ', '2018-03-20 13:51:38', 'Add'),
('8e63fd3e77796b102589b1ba1e4441c7982e4132', 'admin_id', 'fa35e192121eabf3dabf9f5ea6abdbcbc107ac3b', 'Added Company Name to businesses', '2018-03-20 08:17:09', 'Add'),
('8ee51caaa2c2f4ee2e5b4b7ef5a89db7df1068d7', 'admin_id', 'pHilMont123', 'update picture', '2018-03-15 21:13:21', 'Update'),
('8effee409c625e1a2d8f5033631840e6ce1dcb64', 'c1dfd96eea8cc2b62785275bca38ac261256e278', '902ba3cda1883801594b6e1b452790cc53948fda', 'Updated status to 1. activate\n', '2018-03-14 17:52:17', 'Update'),
('902ba3cda1883801594b6e1b452790cc53948fda', 'c1dfd96eea8cc2b62785275bca38ac261256e278', '1b6453892473a467d07372d45eb05abc2031647a', 'Posted a job', '2018-03-14 10:13:47', 'Add'),
('91032ad7bbcb6cf72875e8e8207dcfba80173f7c', 'fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', 'f1abd670358e036c31296e66b3b66c382ac00812', 'Posted a job', '2018-03-14 11:17:54', 'Add'),
('9109c85a45b703f87f1413a405549a2cea9ab556', 'c1dfd96eea8cc2b62785275bca38ac261256e278', '356a192b7913b04c54574d18c28d46e6395428ab', 'Deleted. full', '2018-03-14 18:25:13', 'Delete'),
('91dfde1d6e005e422f64a59776234f1f4c80b5e4', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'Updated field_mname', '2018-03-20 13:53:30', 'Update'),
('92cfceb39d57d914ed8b14d0e37643de0797ae56', 'c1dfd96eea8cc2b62785275bca38ac261256e278', 'c1dfd96eea8cc2b62785275bca38ac261256e278', 'Updated date to 2018-03-15', '2018-03-14 17:17:11', 'Update'),
('934385f53d1bd0c1b8493e44d0dfd4c8e88a04bb', '902ba3cda1883801594b6e1b452790cc53948fda', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'Posted a job', '2018-03-20 09:47:05', 'Add'),
('95e815d1541bf6f358cfffbe66ab3af0d0c09d09', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', '356a192b7913b04c54574d18c28d46e6395428ab', 'Updated Academic', '2018-03-20 14:06:48', 'Update'),
('972a67c48192728a34979d9a35164c1295401b71', 'c1dfd96eea8cc2b62785275bca38ac261256e278', '902ba3cda1883801594b6e1b452790cc53948fda', 'Updated status to 1. deactivate', '2018-03-14 16:40:00', 'Update'),
('98fbc42faedc02492397cb5962ea3a3ffc0a9243', 'c1dfd96eea8cc2b62785275bca38ac261256e278', 'c1dfd96eea8cc2b62785275bca38ac261256e278', 'Updated longDes to ', '2018-03-14 17:26:03', 'Update'),
('9a79be611e0267e1d943da0737c6c51be67865a0', 'c1dfd96eea8cc2b62785275bca38ac261256e278', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'Updated skills to ["skill","skill1","skill2"]', '2018-03-20 08:36:24', 'Update'),
('9e071a3a594a8964cbefe784f8a6afaa94c0de17', '356a192b7913b04c54574d18c28d46e6395428ab', '356a192b7913b04c54574d18c28d46e6395428ab', 'Updated field_dob', '2018-03-20 15:09:20', 'Update'),
('9e6a55b6b4563e652a23be9d623ca5055c356940', 'fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', 'bd307a3ec329e10a2cff8fb87480823da114f8f4', 'Posted a job', '2018-03-14 11:14:18', 'Add'),
('a17554a0d2b15a664c0e73900184544f19e70227', 'c1dfd96eea8cc2b62785275bca38ac261256e278', 'c1dfd96eea8cc2b62785275bca38ac261256e278', 'Updated username to othan.millet@gmail.com', '2018-03-14 23:11:23', 'Update'),
('a72b20062ec2c47ab2ceb97ac1bee818f8b6c6cb', '902ba3cda1883801594b6e1b452790cc53948fda', '7b52009b64fd0a2a49e6d8a939753077792b0554', 'Updated shortDes to   Job level - Mid-Senior Level / Manager, Job category - Human Resources, Educational requirement - Graduated from college', '2018-03-15 00:43:56', 'Update'),
('a9334987ece78b6fe8bf130ef00b74847c1d3da6', 'c1dfd96eea8cc2b62785275bca38ac261256e278', '902ba3cda1883801594b6e1b452790cc53948fda', 'Updated status to 0. deactivate', '2018-03-14 17:50:16', 'Update'),
('ac3478d69a3c81fa62e60f5c3696165a4e5e6ac4', 'c1dfd96eea8cc2b62785275bca38ac261256e278', '77de68daecd823babbb58edb1c8e14d7106e83bb', 'Posted a job', '2018-03-14 08:55:59', 'Add'),
('af3e133428b9e25c55bc59fe534248e6a0c0f17b', 'c1dfd96eea8cc2b62785275bca38ac261256e278', 'c1dfd96eea8cc2b62785275bca38ac261256e278', 'Updated title to Bank and Client Relationship Manager', '2018-03-14 17:16:19', 'Update'),
('b1d5781111d84f7b3fe45a0852e59758cd7a87e5', 'c1dfd96eea8cc2b62785275bca38ac261256e278', '902ba3cda1883801594b6e1b452790cc53948fda', 'Posted a job', '2018-03-14 10:45:10', 'Add'),
('b37f6ddcefad7e8657837d3177f9ef2462f98acf', 'admin_id', 'bd307a3ec329e10a2cff8fb87480823da114f8f4', 'update picture', '2018-03-15 21:11:41', 'Update'),
('b3f0c7f6bb763af1be91d9e74eabfeb199dc1f1f', 'fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', 'fa35e192121eabf3dabf9f5ea6abdbcbc107ac3b', 'Posted a job', '2018-03-14 11:16:06', 'Add'),
('b4182bff4b3cf75f9e54f4990f9bd153c0c2973c', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', '1b6453892473a467d07372d45eb05abc2031647a', 'Added Engineering', '2018-03-20 13:51:38', 'Add'),
('b4c96d80854dd27e76d8cc9e21960eebda52e962', '902ba3cda1883801594b6e1b452790cc53948fda', '7b52009b64fd0a2a49e6d8a939753077792b0554', 'Updated salary to 40001', '2018-03-15 00:43:46', 'Update'),
('b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'admin_id', 'c1dfd96eea8cc2b62785275bca38ac261256e278', 'Added Jonathan Millet as account manager', '2018-03-13 21:22:56', 'Add'),
('b6692ea5df920cad691c20319a6fffd7a4a766b8', 'c1dfd96eea8cc2b62785275bca38ac261256e278', '902ba3cda1883801594b6e1b452790cc53948fda', 'Updated title to Category Leads', '2018-03-14 13:15:40', 'Update'),
('b7103ca278a75cad8f7d065acda0c2e80da0b7dc', '902ba3cda1883801594b6e1b452790cc53948fda', '7b52009b64fd0a2a49e6d8a939753077792b0554', 'Updated date to 2018-03-14', '2018-03-15 00:44:06', 'Update'),
('b74f5ee9461495ba5ca4c72a7108a23904c27a05', 'admin_id', 'admin_id', 'Updated name to Kareer Admin', '2018-03-15 21:00:36', 'Update'),
('b7eb6c689c037217079766fdb77c3bac3e51cb4c', 'c1dfd96eea8cc2b62785275bca38ac261256e278', '902ba3cda1883801594b6e1b452790cc53948fda', 'Updated status to 1. deactivate', '2018-03-14 17:48:03', 'Update'),
('b888b29826bb53dc531437e723738383d8339b56', 'admin_id', 'ToyotaCars', 'update picture', '2018-03-15 21:04:29', 'Update'),
('bc33ea4e26e5e1af1408321416956113a4658763', 'fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', '12c6fc06c99a462375eeb3f43dfd832b08ca9e17', 'Posted a job', '2018-03-14 11:29:10', 'Add'),
('bd307a3ec329e10a2cff8fb87480823da114f8f4', '902ba3cda1883801594b6e1b452790cc53948fda', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Posted a job', '2018-03-14 10:55:29', 'Add'),
('be461a0cd1fda052a69c3fd94f8cf5f6f86afa34', '902ba3cda1883801594b6e1b452790cc53948fda', '902ba3cda1883801594b6e1b452790cc53948fda', 'update picture', '2018-03-15 21:09:33', 'Update'),
('c097638f92de80ba8d6c696b26e6e601a5f61eb7', '902ba3cda1883801594b6e1b452790cc53948fda', '7b52009b64fd0a2a49e6d8a939753077792b0554', 'Updated status to 0. deactivate', '2018-03-15 00:44:37', 'Update'),
('c1dfd96eea8cc2b62785275bca38ac261256e278', 'c1dfd96eea8cc2b62785275bca38ac261256e278', '77de68daecd823babbb58edb1c8e14d7106e83bb', 'Posted a job', '2018-03-14 09:38:32', 'Add'),
('c28aca23f1ef3718a464383d925c66842078edaa', '356a192b7913b04c54574d18c28d46e6395428ab', '356a192b7913b04c54574d18c28d46e6395428ab', 'Updated field_bio', '2018-03-20 15:10:12', 'Update'),
('c5b76da3e608d34edb07244cd9b875ee86906328', 'c1dfd96eea8cc2b62785275bca38ac261256e278', '902ba3cda1883801594b6e1b452790cc53948fda', 'Updated status to 1. activate', '2018-03-14 17:50:25', 'Update'),
('c66c65175fecc3103b3b587be9b5b230889c8628', 'c1dfd96eea8cc2b62785275bca38ac261256e278', 'c1dfd96eea8cc2b62785275bca38ac261256e278', 'Updated username to othanmillet@gmail.com', '2018-03-14 23:12:41', 'Update'),
('c8306ae139ac98f432932286151dc0ec55580eca', 'admin_id', '902ba3cda1883801594b6e1b452790cc53948fda', 'Added Name as account manager', '2018-03-20 09:09:53', 'Add'),
('c9ca442765657fc90e9e779c34d0d2259d2c3c5b', '356a192b7913b04c54574d18c28d46e6395428ab', '356a192b7913b04c54574d18c28d46e6395428ab', 'Updated field_password', '2018-03-20 15:11:24', 'Update'),
('ca3512f4dfa95a03169c5a670a4c91a19b3077b4', 'c1dfd96eea8cc2b62785275bca38ac261256e278', 'c1dfd96eea8cc2b62785275bca38ac261256e278', 'Updated title to Bank and Client Relationship Managers', '2018-03-14 17:13:24', 'Update'),
('cb4e5208b4cd87268b208e49452ed6e89a68e0b8', 'c1dfd96eea8cc2b62785275bca38ac261256e278', '902ba3cda1883801594b6e1b452790cc53948fda', 'Updated title to Category Lead', '2018-03-14 13:14:40', 'Update'),
('cb7a1d775e800fd1ee4049f7dca9e041eb9ba083', 'c1dfd96eea8cc2b62785275bca38ac261256e278', '902ba3cda1883801594b6e1b452790cc53948fda', 'Updated status to 0. asdasd', '2018-03-14 16:44:40', 'Update'),
('d02560dd9d7db4467627745bd6701e809ffca6e3', '902ba3cda1883801594b6e1b452790cc53948fda', '7b52009b64fd0a2a49e6d8a939753077792b0554', 'Updated longDes to <p><strong>Staffing and Recruitment -&nbsp;</strong>Ensure that the needed manpower supply of the company is met.</p><p><strong>Training and Development -&nbsp;</strong>Ensures that companyâ€™s training needs are identified and met.</p><p><strong>Employee Relations -&nbsp;</strong>Ensures that employees are highly motivated and productive.</p><p><strong>Compensation and Benefits -&nbsp;</strong>Set ups, designs, recommends and implements processes and systems of creative compensation schemes, and overall employee welfare programs and services to maintain an efficient and highly motivated and productive workforce.</p><p><strong>Performance Management -&nbsp;</strong>Ensures that the companyâ€™s HR performance management is responsive to meeting companyâ€™s business goals.</p><p><strong>Organizational Excellence -&nbsp;</strong>Ensures that the company adheres to high standard of organizational excellence</p><p><strong>Labor and Legal Compliance -&nbsp;</strong>Ensures that the company is compliant to government regulations and reporting.</p><p><strong>Organizational Excellence -&nbsp;</strong>Ensures that the company adheres to high standard of organizational excellence</p>', '2018-03-15 00:44:23', 'Update'),
('d0e2dbb0bac1917d360aaf52c01a2a4b669e8cdb', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'ac3478d69a3c81fa62e60f5c3696165a4e5e6ac4', 'Added Integration', '2018-03-20 13:32:56', 'Add'),
('d30f79cf7fef47bd7a5611719f936539bec0d2e9', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'Updated field_dob', '2018-03-20 13:53:34', 'Update'),
('d321d6f7ccf98b51540ec9d933f20898af3bd71e', 'c1dfd96eea8cc2b62785275bca38ac261256e278', '902ba3cda1883801594b6e1b452790cc53948fda', 'Updated skills to ["Negotiation","Business Development","Merchandising","Leadeership"]', '2018-03-15 10:40:27', 'Update'),
('d435a6cdd786300dff204ee7c2ef942d3e9034e2', 'fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', '9e6a55b6b4563e652a23be9d623ca5055c356940', 'Posted a job', '2018-03-14 11:23:21', 'Add'),
('d54ad009d179ae346683cfc3603979bc99339ef7', 'c1dfd96eea8cc2b62785275bca38ac261256e278', '902ba3cda1883801594b6e1b452790cc53948fda', 'Updated salary to 20001', '2018-03-15 00:58:16', 'Update'),
('da4b9237bacccdf19c0760cab7aec4a8359010b0', 'c1dfd96eea8cc2b62785275bca38ac261256e278', 'da4b9237bacccdf19c0760cab7aec4a8359010b0', 'Posted a job', '2018-03-13 22:05:46', 'Add'),
('dbc0f004854457f59fb16ab863a3a1722cef553f', 'c1dfd96eea8cc2b62785275bca38ac261256e278', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'Updated Short Description to Lorem ipsum dolor sit amet, at commodo, ligula felis, semper sit ut sed consectetuer volutpat, id cum magnis mollis. Semper donec risus volutpat varius vestibulum, consectetuer scelerisque in a dolore, nulla sed mauris maecenas nunc, hac lectus tincidunt. Cum aaaaaaaaa malesuada adipiscing, nibh risus pulvinar, vulputate diam nam nunc, penatibus sit libero a placerat vivamus, lorem est dolor pllentesque wisi ut pede.', '2018-03-20 08:37:49', 'Update'),
('e114c448f4ab8554ad14eff3d66dfeb3965ce8fc', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'da4b9237bacccdf19c0760cab7aec4a8359010b0', 'Added PHP', '2018-03-20 11:22:14', 'Add'),
('e1822db470e60d090affd0956d743cb0e7cdf113', 'c1dfd96eea8cc2b62785275bca38ac261256e278', '902ba3cda1883801594b6e1b452790cc53948fda', 'Updated status to 1. activate', '2018-03-14 17:47:50', 'Update'),
('e1a864f0b77f6c89794827a9035355dc8d052622', '356a192b7913b04c54574d18c28d46e6395428ab', '356a192b7913b04c54574d18c28d46e6395428ab', 'Updated field_dob', '2018-03-20 15:09:36', 'Update'),
('e62d7f1eb43d87c202d2f164ba61297e71be80f4', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'update picture', '2018-03-15 21:11:24', 'Update'),
('e6c3dd630428fd54834172b8fd2735fed9416da4', 'c1dfd96eea8cc2b62785275bca38ac261256e278', 'c1dfd96eea8cc2b62785275bca38ac261256e278', 'update picture', '2018-03-14 22:33:42', 'Update'),
('e794a80eb109162d579df51db6d52e223bb0e9be', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'Updated field_fname', '2018-03-20 13:53:24', 'Update'),
('e993215bfdaa515f6ea00fafc1918f549119f993', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'da4b9237bacccdf19c0760cab7aec4a8359010b0', 'Added Web Develper', '2018-03-20 11:28:10', 'Add'),
('eb4ac3033e8ab3591e0fcefa8c26ce3fd36d5a0f', 'c1dfd96eea8cc2b62785275bca38ac261256e278', '902ba3cda1883801594b6e1b452790cc53948fda', 'Updated skills to ["Negotiation","Business Development","Merchandising"]', '2018-03-15 10:41:34', 'Update'),
('ecb7937db58ec9dea0c47db88463d85e81143032', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', '1b6453892473a467d07372d45eb05abc2031647a', 'Added Communication', '2018-03-20 13:31:24', 'Add'),
('f1abd670358e036c31296e66b3b66c382ac00812', '902ba3cda1883801594b6e1b452790cc53948fda', '17ba0791499db908433b80f37c5fbc89b870084b', 'Posted a job', '2018-03-14 11:05:18', 'Add'),
('f1f836cb4ea6efb2a0b1b99f41ad8b103eff4b59', 'c1dfd96eea8cc2b62785275bca38ac261256e278', '902ba3cda1883801594b6e1b452790cc53948fda', 'Updated title to Category Lead', '2018-03-14 13:16:48', 'Update'),
('f38cfe2e2facbcc742bad63f91ad55637300cb45', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', '356a192b7913b04c54574d18c28d46e6395428ab', 'Added Academic', '2018-03-20 13:40:06', 'Add'),
('f6e1126cedebf23e1463aee73f9df08783640400', 'fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', '91032ad7bbcb6cf72875e8e8207dcfba80173f7c', 'Posted a job', '2018-03-14 11:26:40', 'Add'),
('fa35e192121eabf3dabf9f5ea6abdbcbc107ac3b', '902ba3cda1883801594b6e1b452790cc53948fda', 'b1d5781111d84f7b3fe45a0852e59758cd7a87e5', 'Posted a job', '2018-03-14 11:00:16', 'Add'),
('fa755791d0509bb06ae715a2072de724815ed84d', '356a192b7913b04c54574d18c28d46e6395428ab', '356a192b7913b04c54574d18c28d46e6395428ab', 'Updated field_number', '2018-03-20 15:10:03', 'Update'),
('fb644351560d8296fe6da332236b1f8d61b2828a', 'c1dfd96eea8cc2b62785275bca38ac261256e278', 'c1dfd96eea8cc2b62785275bca38ac261256e278', 'Updated longDes to <ol><li>Responsible for merchandising management and marketing of the companyâ€™s web store â€” the merchandising, marketing and sales of goods published online.</li><li>Develops various strategies for marketing the companyâ€™s products and brand through the Internet.</li><li>Makes use of different marketing techniques including SEM, SEO, PPC, Video, Display, Social and other similar techniques to keep the company in the forefront of digital marketing results and convert sales.</li><li>Monitors the Companyâ€™s web store and social media analytics, generates insight reports and delivers post-implementation reviews for the continual progression of our online campaigns and performance metrics</li><li>Remains forward-thinking and current on industry trends and market conditions to be able to give recommendations regarding best practices for improving marketing performance</li><li>Create and manage link building strategies, content marketing strategies, and social media presences.</li><li>Create and manage link building strategies, content marketing </li></ol>', '2018-03-14 17:29:21', 'Update'),
('fc074d501302eb2b93e2554793fcaf50b3bf7291', 'c1dfd96eea8cc2b62785275bca38ac261256e278', '902ba3cda1883801594b6e1b452790cc53948fda', 'Updated status to 1. deactivate\n', '2018-03-14 16:43:41', 'Update'),
('fe2ef495a1152561572949784c16bf23abb28057', 'c1dfd96eea8cc2b62785275bca38ac261256e278', 'c1dfd96eea8cc2b62785275bca38ac261256e278', 'Updated longDes to <ol><li>Responsible for merchandising management and marketing of the companyâ€™s web store â€” the merchandising, marketing and sales of goods published online.</li><li>Develops various strategies for marketing the companyâ€™s products and brand through the Internet.</li><li>Makes use of different marketing techniques including SEM, SEO, PPC, Video, Display, Social and other similar techniques to keep the company in the forefront of digital marketing results and convert sales.</li><li>Monitors the Companyâ€™s web store and social media analytics, generates insight reports and delivers post-implementation reviews for the continual progression of our online campaigns and performance metrics</li><li>Remains forward-thinking and current on industry trends and market conditions to be able to give recommendations regarding best practices for improving marketing performance</li><li>Create and manage link building strategies, content marketing strategies, and social media presences.</li></ol>', '2018-03-14 17:30:01', 'Update'),
('fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', 'c1dfd96eea8cc2b62785275bca38ac261256e278', 'ac3478d69a3c81fa62e60f5c3696165a4e5e6ac4', 'Posted a job', '2018-03-14 10:21:54', 'Add');

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
('356a192b7913b04c54574d18c28d46e6395428ab', 'Elvin', 'Abalos', 'De Vera', NULL, '1996-01-22', 'Baybay, Lingayen', NULL, '0912345678', NULL, NULL, NULL, 'profile.png', '2018-03-20 15:08:20'),
('b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'Jonathan', 'Millet', 'Binalay', NULL, '1997-04-27', '#009, Poblacion, Labrador, Pangasinan', NULL, '09090630528', NULL, NULL, NULL, 'profile.png', '2018-03-20 11:11:29'),
('da4b9237bacccdf19c0760cab7aec4a8359010b0', 'John', 'Smith', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'profile.png', '2018-03-20 15:14:25');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_skills`
--

CREATE TABLE `tbl_skills` (
  `id` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `applicant_id` varchar(60) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `skill` varchar(60) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `level` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_skills`
--

INSERT INTO `tbl_skills` (`id`, `applicant_id`, `skill`, `level`, `date`) VALUES
('1b6453892473a467d07372d45eb05abc2031647a', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'Engineering', '1', '2018-03-20 13:51:37'),
('356a192b7913b04c54574d18c28d46e6395428ab', 'da4b9237bacccdf19c0760cab7aec4a8359010b0', 'Hello world', '1', '2018-03-09 08:32:34'),
('77de68daecd823babbb58edb1c8e14d7106e83bb', 'da4b9237bacccdf19c0760cab7aec4a8359010b0', 'Sapnu Puas', '1', '2018-03-09 08:33:58'),
('ac3478d69a3c81fa62e60f5c3696165a4e5e6ac4', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'Integration', '1', '2018-03-20 13:32:56'),
('b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'da4b9237bacccdf19c0760cab7aec4a8359010b0', 'Web Developer', '1', '2018-03-08 23:48:53'),
('c1dfd96eea8cc2b62785275bca38ac261256e278', '356a192b7913b04c54574d18c28d46e6395428ab', '', '1', '2018-03-20 15:11:24'),
('da4b9237bacccdf19c0760cab7aec4a8359010b0', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'Web Develper', '1', '2018-03-20 11:28:10');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_vacancies`
--

CREATE TABLE `tbl_vacancies` (
  `id` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `employer_id` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `business_id` varchar(70) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `short_description` longtext COLLATE utf8mb4_unicode_ci,
  `description` longtext COLLATE utf8mb4_unicode_ci,
  `vacancy_date` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `job_title` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `skills` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `salary_range` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` int(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_vacancies`
--

INSERT INTO `tbl_vacancies` (`id`, `employer_id`, `business_id`, `short_description`, `description`, `vacancy_date`, `job_title`, `skills`, `salary_range`, `date`, `status`) VALUES
('0716d9708d321ffb6a00818614779e779925365c', 'fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Job level - Associate / Supervisor, Job category - Sales and Marketing, Educational requirement - Graduated from college', '<ul><li>Support the Sales Manager in building plans to deliver against sales objectives.</li><li>Lead the development and maintenance of the on trade outlet database with a focus on hotels, restaurants and high-end bars.</li><li>Develop and follow an efficient calling cycle with the national distributor on premise team.</li><li>Maximize distribution and stock pressure in target outlets.</li><li>Establish sustainable relationship with key customers</li><li>Monitor visibility and ensure stand out with a focus on key accounts.</li><li>Coordinate with Marketing and Trade Marketing teams to develop targeted and cost effective promotional and visibility tools.</li><li>Conduct regular alignment meetings with the national distributor sales, marketing, trade marketing teams and promotional teams to effectively communicate product updates, new strategies and business development programs.</li><li>Ensure that commercial and/or brand building objectives are fully leveraged in all existing contracted/supported accounts and spend are optimized</li></ul>', '2018-03-14', 'Key Accounts Executive', '["Presentation ","Negotiation ","English fluency"]', '30000', '2018-03-14 11:21:09', 1),
('0ade7c2cf97f75d009975f4d720d1fa6c19f4897', '902ba3cda1883801594b6e1b452790cc53948fda', '1', 'Job level - Mid-Senior Level / Manager, Job category - Legal, Educational requirement - Graduated from college', '<ul><li>Manages documentary and legal compliance with Philippine government regulators such as the Securities and Exchange Commission (â€œSECâ€), Bangko Sentral ng Pilipinas (â€œBSPâ€), Bureau of Internal Revenue (â€œBIRâ€), Taguig City Mayorâ€s Office, with emphasis on licenses, permits, approvals, reportorial requirements, filings, etc.;</li><li>Research, analyzes, and interprets applicable laws and regulations, policies, procedures, and practices;</li><li>Prepares, updates, and undertakes custody of corporate records, minutes of meeting/action, board resolutions, secretaryâ€s certificates, etc. ensuring that they are maintained as required by relevant laws and regulations, and made available when needed by authorized persons;</li><li>Drafts, reviews, revises, and administers various business contracts, agreements, legal notices, responses, and other relevant documents/records/files;</li></ul>', '2018-03-14', 'Compliance Officer', '["Lawyer","Banking"]', '60000', '2018-03-14 10:55:29', 1),
('12c6fc06c99a462375eeb3f43dfd832b08ca9e17', 'fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Job level - Associate / Supervisor, Job category - Management and Consultancy, Educational requirement - Graduated from college', '<ul><li>Responsible for leading the team of analysts in the formation and updating of the various databases. Also, select research outputs and initiatives.</li><li>Directly involved in the tracking and gathering of relevant property data and the formation and maintenance of various databases.</li><li>Involved in the preparation of all internal and external research outputs such as regional publications, local publications, and presentations, among others.</li><li>Come up with topical research reports</li><li>In addition, perform consultancy work, which includes drafting proposals, data gathering, report writing, and other necessary tasks required to complete the project.</li></ul><p><br></p>', '2018-03-14', 'Sales Analyst', '["Accountancy","Writing","Communication"]', '40000', '2018-03-14 11:29:10', 1),
('1574bddb75c78a6fd2251d61e2993b5146201319', 'fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Job level - Fresh Grad / Entry Level, Job category - Sales and Marketing, Educational requirement - Graduated from college', '<ul><li>Manage inside sales, transition, and delivery of companyâ€s services.</li><li>Initiate and build relationships with customers through inbound phone inquiries.</li><li>Assist Inside Sales Supervisor in deal negotiations, contract development, due diligence, and other business development projects.</li><li>Work closely with internal team to deliver business services with high level of customer satisfaction.</li><li>Facilitate online and/or VOIP demos for customer inbound inquiries.</li><li>Work closely with Inside Sales Supervisor to deliver â€œworld classâ€ business services with high level of customer satisfaction.</li><li>Contribute as an active participant in the Kalibrr company management team to help set company direction and strategy.</li></ul>', '2018-03-14', 'Inside Sales Associate', '["Forecasting ","Communication ","Problem-solving"]', '30000', '2018-03-14 11:19:37', 1),
('17ba0791499db908433b80f37c5fbc89b870084b', '902ba3cda1883801594b6e1b452790cc53948fda', '1', 'Job level - Associate / Supervisor, Job category - Sales and Marketing, Educational requirement - Graduated from college', '<ol><li>Responsible for merchandising management and marketing of the companyâ€s web store â€” the merchandising, marketing and sales of goods published online.</li><li>Develops various strategies for marketing the companyâ€s products and brand through the Internet.</li><li>Makes use of different marketing techniques including SEM, SEO, PPC, Video, Display, Social and other similar techniques to keep the company in the forefront of digital marketing results and convert sales.</li><li>Monitors the Companyâ€s web store and social media analytics, generates insight reports and delivers post-implementation reviews for the continual progression of our online campaigns and performance metrics</li><li>Remains forward-thinking and current on industry trends and market conditions to be able to give recommendations regarding best practices for improving marketing performance</li><li>Create and manage link building strategies, content marketing strategies, and social media presences.</li></ol>', '2018-03-14', 'Deputy Training Manager', '["Managerial ","Leadership ","Communication","Business Administration"]', '70000', '2018-03-14 11:05:18', 1),
('1b6453892473a467d07372d45eb05abc2031647a', 'c1dfd96eea8cc2b62785275bca38ac261256e278', '7b52009b64fd0a2a49e6d8a939753077792b0554', 'Job level - Fresh Grad / Entry Level, Job category - Accounting and Finance, Educational requirement - Graduated from college', '<ul><li>Verify customer credit process</li><li>Verify collection is tally with the request credit</li><li>Ensure AR maintain high accuracy level of book</li><li>Generate collection target and sales report to keep track the outstanding</li><li>Maintain the customer database</li><li>Prepares special reports by collecting analyzing, summarizing account information and trends</li></ul>', '2018-03-14', 'Accounts Receivable Officer', '["Accounting","MS Excel","Team Player"]', '50000', '2018-03-14 10:13:47', 1),
('356a192b7913b04c54574d18c28d46e6395428ab', 'c1dfd96eea8cc2b62785275bca38ac261256e278', '7b52009b64fd0a2a49e6d8a939753077792b0554', 'sapien urna lectus vestibulum in mauris ante congue natoque etiam delectus interdum consectetuer facilisis ipsum sodales rutrum cursus lectus elit id ac et quis urna adipiscing nonummy ut aliquam feugiat per amet wisi dolor tristique tellus eu scelerisque sit non proin nibh neque luctus culpa maecenas ornare tincidunt id orci sodales integer etiam sed est cras ante pulvinar semper integer faucibus et maiores vestibulum sodales vestibulum accumsan amet cras accumsan risus elit phasellus vel duis ', 'sapien urna lectus vestibulum in mauris ante congue natoque etiam delectus interdum consectetuer facilisis ipsum sodales rutrum cursus lectus elit id ac et quis urna adipiscing nonummy ut aliquam feugiat per amet wisi dolor tristique tellus eu scelerisque sit non proin nibh neque luctus culpa maecenas ornare tincidunt id orci sodales integer etiam sed est cras ante pulvinar semper integer faucibus et maiores vestibulum sodales vestibulum accumsan amet cras accumsan risus elit phasellus vel duis pharetra et mus phasellus purus lacus varius pede fringilla augue sit et imperdiet tortor volutpat aliquet tincidunt cursus vestibulum scelerisque nulla massa mauris ac velit sodales molestie luctus pulvinar sit amet non proin nulla nonummy iaculis lorem aliquam tincidunt hendrerit dapibus rhoncus scelerisque condimentum et eu erat quis massa non fringilla malesuada arcu eleifend lorem enim enim non quam et tempus donec wisi ut facilisis nulla ligula at lectus aenean a tempus at vestibulum place', '2018-03-13', 'Front-End Developer', '["PHP","Jquery","HTML","CSS"]', '20000', '2018-03-13 22:04:07', 1),
('472b07b9fcf2c2451e8781e944bf5f77cd8457c8', 'fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Job level - Mid-Senior Level / Manager, Job category - Manufacturing and Production, Educational requirement - Graduated from college', '<ul><li>Design principles and governance policies that is aligned with the Company directives.</li><li>Ensures consistent implementation of long term and short term management strategies aligned with the objectives of the Company.</li><li>Develop, lead, and execute procurement strategies.</li><li>Plan attainable and realistic cost optimization efforts.</li><li>Asses, manage and mitigate possible risks that may arise from the procurement of materials.</li><li>Ensure that the supplies will always be at an optimal level through strategic procurement.</li><li>Strategize, plan and enforce the import activities.</li><li>Design negotiation strategies and closing deals in optimal terms.</li><li>Establish and maintain relationships with vendors that serves as key or essential business partners.</li><li>Mentor, coach and provide timely and effective performance feedback.</li><li>Other relevant duties that may be assigned from time to time.</li></ul>', '2018-03-14', 'Procurement Manager', '["Business Administration","Engineering ","Negotiation","Communication"]', '40000', '2018-03-14 11:28:02', 1),
('77de68daecd823babbb58edb1c8e14d7106e83bb', 'c1dfd96eea8cc2b62785275bca38ac261256e278', '7b52009b64fd0a2a49e6d8a939753077792b0554', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '<p class="ql-align-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore </p>', '2018-03-14', 'Customer Support', '["Communication skills","Fluent speaking"]', '20000', '2018-03-14 09:38:32', 1),
('7b52009b64fd0a2a49e6d8a939753077792b0554', '902ba3cda1883801594b6e1b452790cc53948fda', '1', 'Job level - Mid-Senior Level / Manager, Job category - Human Resources, Educational requirement - Graduated from college', '<p><strong>Staffing and Recruitment -&nbsp;</strong>Ensure that the needed manpower supply of the company is met.</p><p><strong>Training and Development -&nbsp;</strong>Ensures that companyâ€s training needs are identified and met.</p><p><strong>Employee Relations -&nbsp;</strong>Ensures that employees are highly motivated and productive.</p><p><strong>Compensation and Benefits -&nbsp;</strong>Set ups, designs, recommends and implements processes and systems of creative compensation schemes, and overall employee welfare programs and services to maintain an efficient and highly motivated and productive workforce.</p><p><strong>Performance Management -&nbsp;</strong>Ensures that the companyâ€s HR performance management is responsive to meeting companyâ€s business goals.</p><p><strong>Organizational Excellence -&nbsp;</strong>Ensures that the company adheres to high standard of organizational excellence</p><p><strong>Labor and Legal Compliance -&nbsp;</strong>Ensures that the company is compliant to government regulations and reporting.</p>', '2018-03-14', 'HR Manager', '["Work under-pressure","Flexibility","Team Player","HR functions"]', '40000', '2018-03-14 11:08:40', 1),
('902ba3cda1883801594b6e1b452790cc53948fda', 'c1dfd96eea8cc2b62785275bca38ac261256e278', '7b52009b64fd0a2a49e6d8a939753077792b0554', 'Job level - Associate / Supervisor, Job category - Sales and Marketing, Educational requirement - Graduated from college', '<ul><li>Strategies, identifies and sources potential merchants that will be part of the company platform</li><li>Pitching, negotiating, managing relationships, and building merchant business</li><li>Forges partnerships with suppliers and distributors that can offer their goods and services and later manages merchants by creating a good relationship between the merchants and the company</li><li>Makes sure merchants extend healthy margins.</li><li>Plans and executes customer-focused product assortments in order to drive sales and category strength.</li><li>Forecasts sales based on trend, inventory availability, upcoming promotions and new client launches to minimize cancellation due to out-of-stock incidences and to maximize profitable sales.</li><li>Participates in seasonal promotions created by our marketing team.</li><li>Develops and implements processes in order to streamline processes and encourage maximum order executions.</li></ul><p><br></p>', '2018-03-14', 'Category Lead', '["Negotiation","Business Development","Merchandising"]', '20000', '2018-03-14 10:45:10', 1),
('91032ad7bbcb6cf72875e8e8207dcfba80173f7c', 'fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Job level - Associate / Supervisor, Job category - Sales and Marketing, Educational requirement - Graduated from college', '<ul><li>Demonstrates leadership and direction by setting clear goals and expectations at each site by developing and/or revising local operating procedures and monitor performance.</li><li>Maintains strict adherence to corporate objectives in the quality standards for car park presentation.</li><li>Monitors car park daily and monthly targets and initiate remedial action if targets are not being met.</li><li>Prepares and recommends quarterly plans for cost reduction initiatives by car park.</li><li>Assists and analyzes on new business development while maintaining existing marketing tools.</li><li>Monitors adherence to all financial transaction policies and procedures (including cash handling, and monitoring of monthly parkers payment).</li><li>Responds to and implement recommendations made by internal auditor.</li><li>Provides operational support to all sites during normal business hours and after hours and weekends utilizing company mobile telephone</li></ul>', '2018-03-14', 'Operations Supervisor', '["Critical Thinking","Active Learning","Decision Making","Social Perceptiveness"]', '40000', '2018-03-14 11:26:40', 1),
('9e6a55b6b4563e652a23be9d623ca5055c356940', 'fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Job level - Associate / Supervisor, Job category - Sales and Marketing, Educational requirement - Graduated from college', '<ul><li>Merchandise direction per category per store.</li><li>Analyze slow moving and fast moving merchandise per store, per season, per category considering pricing and store condition</li><li>Provide decision-making in quantity and timing of merchandise</li></ul>', '2018-03-14', 'Merchandise Assistant Manager', '[" Retail industry","Communication","Merchandising "]', '40000', '2018-03-14 11:23:20', 1),
('ac3478d69a3c81fa62e60f5c3696165a4e5e6ac4', 'c1dfd96eea8cc2b62785275bca38ac261256e278', '7b52009b64fd0a2a49e6d8a939753077792b0554', 'Job level - Mid-Senior Level / Manager, Job category - IT and Software, Educational requirement - Graduated from college', '<ul><li>Solve tough engineering problems, and work with other engineers to integrate cutting-edge functionality into novel prototypes</li><li>Design, develop, optimize or tune algorithms to solve interesting problems in data science.</li><li>Create state of the art, international standard research papers with top class methodologies.</li><li>Conduct lectures and training to software engineers to improve the performance of their software implementation.</li></ul>', '2018-03-14', 'Algorithm Research Engineer', '["Computer Engineering","Machine Learning","Patents","Algorithms"]', '40000', '2018-03-14 10:21:54', 1),
('b1d5781111d84f7b3fe45a0852e59758cd7a87e5', '902ba3cda1883801594b6e1b452790cc53948fda', '1', 'Job level - Fresh Grad / Entry Level, Job category - Writing and Content, Educational requirement - Graduated from college', '<ul><li>Writing SEO-friendly articles, profiles, infographics, etc. for the Career Advice blog, as pitched by the Writer or as assigned by the Content Marketing Manager.</li><li>Write copy for press releases, email campaigns, digital marketing assets, and other similar items</li><li>Assist in proofreading and copyediting submissions by part-time Content Writers.</li><li>Work with the Content Marketing Manager in putting together an editorial calendar and forming a content marketing strategy for Kalibrr.</li><li>Coordinate with the Marketing team in implementing the content marketing strategy.</li><li>Manage the publication of content on Kalibrr social media channels.</li><li>Assist the Marketing team in projects, most especially in copywriting needs.</li><li>Represent Kalibrr as needed in events.</li></ul>', '2018-03-14', 'Content Writer', '["Proficiency in English","Content writing","SEO"]', '20000', '2018-03-14 11:00:16', 1),
('b3f0c7f6bb763af1be91d9e74eabfeb199dc1f1f', 'fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Job level - Associate / Supervisor, Job category - Sales and Marketing, Educational requirement - Graduated from college', '<ul><li>Support the Sales Manager in building plans to deliver against sales objectives.</li><li>Lead the development and maintenance of the on trade outlet database with a focus on hotels, restaurants and high-end bars.</li><li>Develop and follow an efficient calling cycle with the national distributor on premise team.</li><li>Maximize distribution and stock pressure in target outlets.</li><li>Establish sustainable relationship with key customers</li><li>Monitor visibility and ensure stand out with a focus on key accounts.</li><li>Coordinate with Marketing and Trade Marketing teams to develop targeted and cost effective promotional and visibility tools.</li><li>Conduct regular alignment meetings with the national distributor sales, marketing, trade marketing teams and promotional teams to effectively communicate product updates, new strategies and business development programs.</li><li>Ensure that commercial and/or brand building objectives are fully leveraged in all existing contracted/supported accounts and spend are optimized</li></ul>', '2018-03-14', 'On Premise Executive', '["Presentation ","Negotiation ","English fluency","MS office"]', '50000', '2018-03-14 11:24:42', 1),
('b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'c1dfd96eea8cc2b62785275bca38ac261256e278', '7b52009b64fd0a2a49e6d8a939753077792b0554', 'Lorem ipsum dolor sit amet, amet enim sapien, quaerat ultricies. Augue non augue congue, pellentesque felis vehicula ut quam massa vitae, nec suspendisse tincidunt erat nulla aliquam nec, ligula aliquet, scelerisque ut nam. Lorem risus elit. Consequat ante suscipit morbi mauris. Gravida condimentum arcu a risus, interdum id vivamus, neque tempor morbi, et cum neque non eget neque eros. Mollis quisque tincidunt metus, sed vitae amet. Interdum scelerisque wisi lorem, accusamus per, dui laoreet orc', 'Lorem ipsum dolor sit amet, amet enim sapien, quaerat ultricies. Augue non augue congue, pellentesque felis vehicula ut quam massa vitae, nec suspendisse tincidunt erat nulla aliquam nec, ligula aliquet, scelerisque ut nam. Lorem risus elit. Consequat ante suscipit morbi mauris. Gravida condimentum arcu a risus, interdum id vivamus, neque tempor morbi, et cum neque non eget neque eros. Mollis quisque tincidunt metus, sed vitae amet. Interdum scelerisque wisi lorem, accusamus per, dui laoreet orci.\r\nLorem ipsum dolor sit amet, amet enim sapien, quaerat ultricies. Augue non augue congue, pellentesque felis vehicula ut quam massa vitae, nec suspendisse tincidunt erat nulla aliquam nec, ligula aliquet, scelerisque ut nam. Lorem risus elit. Consequat ante suscipit morbi mauris. Gravida condimentum arcu a risus, interdum id vivamus, neque tempor morbi, et cum neque non eget neque eros. Mollis quisque tincidunt metus, sed vitae amet. Interdum scelerisque wisi lorem, accusamus per, dui laoreet\r\n', '2018-03-13', 'Web Developer', '["PHP","Jquery","HTML","CSS"]', '20000', '2018-03-13 22:00:15', 1),
('bd307a3ec329e10a2cff8fb87480823da114f8f4', 'fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Job level - Associate / Supervisor, Job category - Human Resources, Educational requirement - Graduated from college', '<ul><li>Create and publish job posts via job platforms.</li><li>Coordinate with internal teams to develop and distribute recruitment campaigns.</li><li>Provide local or remote recruitment-sourcing support to recruitment partners.</li><li>On-board and calibrate recruitment partners on Kalibrr on PPH process/SOPs.</li><li>Assist in increasing talent pipelines by using multiple channels, databases, and other sources.</li><li>Pre-screen resumes and profiles and provide recruitment partners a list of shortlisted candidates.</li></ul><p><br></p>', '2018-03-14', 'IT Recruiter | Project-Based', '["Client management","Communication","Technical"]', '50000', '2018-03-14 11:14:17', 1),
('c1dfd96eea8cc2b62785275bca38ac261256e278', 'c1dfd96eea8cc2b62785275bca38ac261256e278', '7b52009b64fd0a2a49e6d8a939753077792b0554', 'Job level - Mid-Senior Level / Manager, Job category - Accounting and Finance, Educational requirement - Graduated from college', '<ul><li>Understand the companyâ€s need for banking services and develop plans to address them</li><li>Identify key staff and/or managers in banks to cultivate sustainable relationships</li><li>Resolve issues and complaints from banking partners quickly and effectively</li><li>Gather necessary requirements for opening corporate bank accounts</li><li>Approach potential banking partners and facilitate opening of accounts with them</li><li>Build a network of reliable key individuals or institutions both inside and outside the country for streamlining delivery of financial services of the company</li></ul>', '2018-03-14', 'Bank and Client Relationship Manager', '["CRM","Problem-solving","Leadership ","Communication ","Confidence "]', '30000', '2018-03-14 10:34:50', 1),
('d435a6cdd786300dff204ee7c2ef942d3e9034e2', 'fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Job level - Mid-Senior Level / Manager, Job category - IT and Software, Educational requirement - Graduated from college', '<p>Engineering teams are usually Agile units with between 3 and 7 people. You are expected to do the following:</p><ul><li>Share your own projects/portfolio</li><li>Share team projects/portfolio</li><li>Start work at 9am Melbourne (Australia) time</li><li>Take responsibility for your project progress, deadlines are not guidelines</li></ul><p><br></p>', '2018-03-14', 'Senior Android Developer', '["Mobile development","backend/web developer","Web design"]', '50000', '2018-03-14 11:30:35', 1),
('da4b9237bacccdf19c0760cab7aec4a8359010b0', 'c1dfd96eea8cc2b62785275bca38ac261256e278', '7b52009b64fd0a2a49e6d8a939753077792b0554', 'sapien urna lectus vestibulum in mauris ante congue natoque etiam delectus interdum consectetuer facilisis ipsum sodales rutrum cursus lectus elit id ac et quis urna adipiscing nonummy ut aliquam feugiat per amet wisi dolor tristique tellus eu scelerisque sit non proin nibh neque luctus culpa maecenas ornare tincidunt id orci sodales integer etiam sed est cras ante pulvinar semper integer faucibus et maiores vestibulum sodales vestibulum accumsan amet cras accumsan risus elit phasellus vel duis ', 'sapien urna lectus vestibulum in mauris ante congue natoque etiam delectus interdum consectetuer facilisis ipsum sodales rutrum cursus lectus elit id ac et quis urna adipiscing nonummy ut aliquam feugiat per amet wisi dolor tristique tellus eu scelerisque sit non proin nibh neque luctus culpa maecenas ornare tincidunt id orci sodales integer etiam sed est cras ante pulvinar semper integer faucibus et maiores vestibulum sodales vestibulum accumsan amet cras accumsan risus elit phasellus vel duis pharetra et mus phasellus purus lacus varius pede fringilla augue sit et imperdiet tortor volutpat aliquet tincidunt cursus vestibulum scelerisque nulla massa mauris ac velit sodales molestie luctus pulvinar sit amet non proin nulla nonummy iaculis lorem aliquam tincidunt hendrerit dapibus rhoncus scelerisque condimentum et eu erat quis massa non fringilla malesuada arcu eleifend lorem enim enim non quam et tempus donec wisi ut facilisis nulla ligula at lectus aenean a tempus at vestibulum place', '2018-03-13', 'Back-End Developer', '["Server Management","DBMS"]', '20000', '2018-03-13 22:05:46', 1),
('f1abd670358e036c31296e66b3b66c382ac00812', 'fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Job level - Associate / Supervisor, Job category - IT and Software, Educational requirement - Graduated from college', '<ul><li>Obtains in-depth understanding of the business owners operating environment â€“ system, platform, processes, standards, policies, tools, human capital, customers, hardware, network, equipment, etc. and uses this knowledge for the audit plan.</li><li>Performs ground level audit activities for assigned engagements, such as but not limited to: field checks, in-depthinterviews, process reviews, testing, surveys, FGDs documentation reviews, physical hardware checks, asset/equipment inventory check,</li><li>Documents audit findings and provide risk assessment and business impact evaluation.</li><li>Monitors implementation of agreed action plans</li><li>Finalizes and releases internal audit reports</li></ul><p><br></p>', '2018-03-14', 'Information Systems Audit', '["Audit Testing","Business partnering","Networking","Technical Expertise"]', '20000', '2018-03-14 11:17:54', 1),
('fa35e192121eabf3dabf9f5ea6abdbcbc107ac3b', 'fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Job level - Associate / Supervisor, Job category - IT and Software, Educational requirement - Graduated from college', '<ul><li>Primarily, administration of our Atlassian toolset</li><li>Gather requirements for business processes, and determine ways to optimize/improve JIRA setup and workflows, as well as identify where functionality can/cannot meet user requests.</li><li>Develop metrics dashboards and advanced filters in JIRA to provide end-users and business leadership with meaningful operational/performance metrics and status reports.</li><li>Using Jira REST APIs, develop one-off solutions for integrations with other tools, automate manual processes, data migration routines and extract data for reporting and analytics purposes.</li><li>Implement JIRA upgrades, and partner with our IT staff to coordinate infrastructure maintenance and system migrations.</li><li>Provide User Management and support for 250 users, manage system access across groups to ensure compliance, and maintain best practices. Create and manage security schemes, custom fields and configurations.</li><li>Create and maintain detailed technical and user-facing documentation.</li></ul>', '2018-03-14', 'ICT Engineer', '["Administration","Programming","Integration"]', '20000', '2018-03-14 11:16:06', 1),
('fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', '902ba3cda1883801594b6e1b452790cc53948fda', '1', 'Job level - Associate / Supervisor,  Job category - Customer Service, \r\nEducational requirement - Graduated from college', '<p><span style="color: rgb(61, 70, 77);">Supports the quality pre-turnover and turnover customer experience by:</span></p><ul><li>Ensuring effective customer communication</li><li>Timely resolution of customer requests</li><li>Proper turnover of property.</li></ul><p><br></p>', '2018-03-14', 'Client Service Associate', '["Communication ","Problem-solving","Presentation ","Customer service"]', '30000', '2018-03-14 10:51:50', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_acadinfo`
--
ALTER TABLE `tbl_acadinfo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tbl_acadinfo_ibfk_1` (`applicant_id`);

--
-- Indexes for table `tbl_accountinfo`
--
ALTER TABLE `tbl_accountinfo`
  ADD PRIMARY KEY (`id`);

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
  ADD KEY `tbl_application_ibfk_1` (`applicant_id`(250));

--
-- Indexes for table `tbl_bookmark`
--
ALTER TABLE `tbl_bookmark`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tbl_bookmark_ibfk_1` (`applicant_id`);

--
-- Indexes for table `tbl_business`
--
ALTER TABLE `tbl_business`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_businessmanagers`
--
ALTER TABLE `tbl_businessmanagers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_career`
--
ALTER TABLE `tbl_career`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tbl_career_ibfk_1` (`applicant_id`);

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
  ADD KEY `tbl_skills_ibfk_1` (`applicant_id`);

--
-- Indexes for table `tbl_vacancies`
--
ALTER TABLE `tbl_vacancies`
  ADD PRIMARY KEY (`id`);
ALTER TABLE `tbl_vacancies` ADD FULLTEXT KEY `skills` (`skills`);
ALTER TABLE `tbl_vacancies` ADD FULLTEXT KEY `job_title` (`job_title`);
ALTER TABLE `tbl_vacancies` ADD FULLTEXT KEY `skills_2` (`skills`,`job_title`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
