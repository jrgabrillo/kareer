-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 24, 2017 at 12:55 PM
-- Server version: 5.7.14
-- PHP Version: 5.6.25

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
  `applicant_id` int(60) NOT NULL,
  `level` varchar(500) NOT NULL,
  `schoolattended` varchar(500) NOT NULL,
  `degree` varchar(500) NOT NULL COMMENT 'BASIC EDUCATION/DEGREE/COURSE',
  `periodofattendance` varchar(10) NOT NULL,
  `highestlevel` varchar(500) NOT NULL COMMENT 'HIGHEST LEVEL/UNITS EARNED',
  `yeargraduated` varchar(5) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_accountinfo`
--

CREATE TABLE `tbl_accountinfo` (
  `id` varchar(60) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `middle_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_admin`
--

CREATE TABLE `tbl_admin` (
  `id` varchar(50) CHARACTER SET latin1 COLLATE latin1_general_cs NOT NULL,
  `fname` varchar(20) NOT NULL,
  `lname` varchar(20) NOT NULL,
  `image` varchar(60) NOT NULL,
  `username` varchar(50) NOT NULL,
  `level` varchar(1) NOT NULL,
  `password` varchar(50) CHARACTER SET latin1 COLLATE latin1_general_cs NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_admin`
--

INSERT INTO `tbl_admin` (`id`, `fname`, `lname`, `image`, `username`, `level`, `password`) VALUES
('admin_id', 'Othan', 'admin', 'admin_id-1506256916.apr', 'admin', '1', '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_applicant`
--

CREATE TABLE `tbl_applicant` (
  `id` varchar(50) CHARACTER SET latin1 COLLATE latin1_general_cs NOT NULL,
  `lname` varchar(20) NOT NULL,
  `fname` varchar(20) NOT NULL,
  `mname` varchar(20) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `contactno` varchar(20) NOT NULL,
  `address` varchar(1000) NOT NULL,
  `email` varchar(50) NOT NULL,
  `date_of_birth` varchar(50) NOT NULL,
  `place_of_birth` varchar(50) NOT NULL,
  `age` varchar(23) NOT NULL,
  `nationality` varchar(20) NOT NULL,
  `guardian` varchar(20) NOT NULL,
  `relationship_to_guardian` varchar(15) NOT NULL,
  `elementary_graduated` varchar(50) NOT NULL,
  `date_graduated_elementary` varchar(20) NOT NULL,
  `address_elementary` varchar(50) NOT NULL,
  `highschool_graduated` varchar(50) NOT NULL,
  `date_graduated_hs` varchar(20) NOT NULL,
  `address_highschool` varchar(50) NOT NULL,
  `image` varchar(60) NOT NULL,
  `password` varchar(50) CHARACTER SET latin1 COLLATE latin1_general_cs NOT NULL,
  `status` varchar(20) NOT NULL,
  `resume` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_applicant`
--

INSERT INTO `tbl_applicant` (`id`, `lname`, `fname`, `mname`, `description`, `gender`, `contactno`, `address`, `email`, `date_of_birth`, `place_of_birth`, `age`, `nationality`, `guardian`, `relationship_to_guardian`, `elementary_graduated`, `date_graduated_elementary`, `address_elementary`, `highschool_graduated`, `date_graduated_hs`, `address_highschool`, `image`, `password`, `status`, `resume`) VALUES
('c6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'Abulencia', 'Jessa Faye', 'Joves', '', 'Female', '09481364523', 'Calasiao, Pangasinan', 'jessafayeabulencia25@gmail.com', '', '', '', '', '', '', '', '', '', '', '', '', 'Abulencia.jpg', '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8', '1', ''),
('d6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'De Celis', 'Teejei', 'Fernandez', '', 'Male', '09127294764', 'Sta. Barbara, Pangasinan', 'iamteejei@gmail.com', '', '', '', '', '', '', '', '', '', '', '', '', 'De Celis.jpg', 'qwerty', '1', ''),
('e6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'Centino', 'Maureen Joy', 'Garcia', '', 'Female', '09481234567', 'Bayambang', 'maucentino@gmail.com', '', '', '', '', '', '', '', '', '', '', '', '', 'Centino.jpg', '123', '1', ''),
('f6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'Gabrillo', 'Rufo', 'Narcisi', '', 'Male', '09484993958', '84', 'rufo.gabrillo@gmail.com', '', '', '', '', '', '', '', '', '', '', '', '', '784a97bf1955d5f7a2b9dd6c1e371e17b73c42bc-1457884905.apr', '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8', '1', '');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_application`
--

CREATE TABLE `tbl_application` (
  `id` varchar(50) NOT NULL,
  `vacany_id` varchar(50) NOT NULL,
  `applicant` varchar(1000) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `date` varchar(20) NOT NULL,
  `status` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_application`
--

INSERT INTO `tbl_application` (`id`, `vacany_id`, `applicant`, `description`, `date`, `status`) VALUES
('356a192b7913b04c54574d18c28d46e6395428aag', 'c1dfd96eea8cc2b62785275bca38ac261256e278', 'f6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.', '2016-03-28 19:03:02', '0'),
('356a192b7913b04c54574d18c28d46e6395428ab', 'c1dfd96eea8cc2b62785275bca38ac261256e278', 'f6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.', '2016-03-28 19:03:02', '0'),
('356a192b7913b04c54574d18c28d46e6395428ac', 'c1dfd96eea8cc2b62785275bca38ac261256e278', 'e6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.', '2016-03-28 19:03:02', ''),
('356a192b7913b04c54574d18c28d46e6395428ad', 'c1dfd96eea8cc2b62785275bca38ac261256e278', 'e6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.', '2016-03-28 19:03:02', '["2016-03-30 00:38:51","Expert Optical TechniciansStatus:ActiveApplication Expiry:2 months laterCreated:2 weeks agoDescription:I need someone who have 5 years of experience as optical technician.Applicant:9imageYesterdayGabrillo, Rufo Jr. Narcisi2016-03-28 19:03:02I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I "]'),
('356a192b7913b04c54574d18c28d46e6395428ae', 'c1dfd96eea8cc2b62785275bca38ac261256e278', 'd6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.', '2016-03-28 19:03:02', ''),
('356a192b7913b04c54574d18c28d46e6395428af', 'c1dfd96eea8cc2b62785275bca38ac261256e278', 'd6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.', '2016-03-28 19:03:02', ''),
('356a192b7913b04c54574d18c28d46e6395428ah', 'c1dfd96eea8cc2b62785275bca38ac261256e278', 'c6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.', '2016-03-28 19:03:02', ''),
('356a192b7913b04c54574d18c28d46e6395428ai', 'c1dfd96eea8cc2b62785275bca38ac261256e278', 'c6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.I need someone who have 5 years of experience as optical technician.', '2016-03-28 19:03:02', '');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_career`
--

CREATE TABLE `tbl_career` (
  `id` varchar(60) NOT NULL,
  `applicant_id` varchar(60) NOT NULL,
  `inclusive_dates` varchar(20) NOT NULL,
  `position_title` varchar(300) NOT NULL,
  `agency` varchar(300) NOT NULL,
  `monthly_salary` varchar(6) NOT NULL,
  `appointment_status` varchar(300) NOT NULL,
  `govt_service` varchar(1) NOT NULL,
  `date` varchar(10) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_employer`
--

CREATE TABLE `tbl_employer` (
  `id` varchar(50) CHARACTER SET latin1 COLLATE latin1_general_cs NOT NULL,
  `lname` varchar(20) NOT NULL,
  `fname` varchar(20) NOT NULL,
  `address` varchar(50) NOT NULL,
  `contactno` varchar(20) NOT NULL,
  `company_name` varchar(50) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `dti` varchar(50) NOT NULL,
  `bir` varchar(50) NOT NULL,
  `image` varchar(60) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) CHARACTER SET latin1 COLLATE latin1_general_cs NOT NULL,
  `status` varchar(1) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_employer`
--

INSERT INTO `tbl_employer` (`id`, `lname`, `fname`, `address`, `contactno`, `company_name`, `description`, `dti`, `bir`, `image`, `email`, `password`, `status`, `date`) VALUES
('1', 'Jokovich', 'Marvin', 'San Antonio', '6990876543214', 'asdsdws', 'asdsd', '123', '123-123-123', 'profile avatar.jpg', 'mjokovich12345@gmail.com', '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8', '1', '0000-00-00'),
('1b6453892473a467d07372d45eb05abc2031647a', '', '', '', '', 'Gabrillo Enterprise 2', '', '', '', 'profile avatar.jpg', 'rufo.gabrillo@gmail.comz', '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8\n', '1', '0000-00-00'),
('356a192b7913b04c54574d18c28d46e6395428ab', '', '', '', '', 'Gabrillo Enterprise', '', '', '', 'profile avatar.jpg', 'rufogabrillo@gmail.com', '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8\n', '1', '0000-00-00'),
('77de68daecd823babbb58edb1c8e14d7106e83bb', '', '', '', '', 'Gabrillo Enterprises', '', '', '', 'profile avatar.jpg', 'rufo.gabrillo2@gmail.com', '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8\n', '1', '0000-00-00'),
('902ba3cda1883801594b6e1b452790cc53948fda', 'Doe', 'John', 'Manila', '099999999', 'Life is Good (LG)', 'Appliances & gadgets', '4323', '34343', 'profile_small.jpg', 'johndoe@gmail.com', '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8', '1', '2017-09-23'),
('ac3478d69a3c81fa62e60f5c3696165a4e5e6ac4', 'Einstein', 'Albert', 'Calasiao, Pangasinan', '09123456789', 'Putoshop', 'Puto lang sapat na', '765432', '1234567', 'profile avatar.jpg', 'albert@gmail.com', '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8', '1', '2017-09-23'),
('b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'Gabrillo', 'Rufo', 'Poblacion East, Calasiao Pangasinan', '09484993958', 'Gabrillo Optical', 'Lorem ipsum eget urna mollis ornare vel eu leo. Cum sociisnatoque penatibus et magnis dis parturient montes, code nascetur ridiculus mus. Nullam id dolor id nibh ultricies vehicula ut id elit. Sed euismod aliquet sapien consequat tincidunt.Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Donec sed odio dui. Sed euismod aliquet sapien consequat tincidunt.But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual. But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual. But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born.', '23456', '1234567890', 'profile avatar.jpg', 'rufongabrillojr93@gmail.com', '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8', '1', '0000-00-00'),
('c1dfd96eea8cc2b62785275bca38ac261256e278', 'Inasal', 'Mang', 'Manukan, Lingayen', '09999999999', 'Adobo Shop', 'Manok lang wala nang iba.', '45678', '90909', 'profile_small.jpg', 'adobo@gmail.com', '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8', '1', '2017-09-23'),
('da4b9237bacccdf19c0760cab7aec4a8359010b0', 'Bubuyog', 'Masayang', 'Lingayen', '09454545454', 'Jollibee', 'Fast Food', '4343', '33434', 'profile_small.jpg', 'bubuyog@gmail.com', '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8', '1', '2017-09-24'),
('fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', 'Clown', 'Kulot', 'Lingayen', '0999999999', 'Mcdo', 'Fast Food', '999000', '909090', 'profile_small.jpg', 'mcdo@gmail.com', '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8', '1', '2017-09-24'),
('pHilMont123', 'Wilson', 'Andy', 'Manaoag', '09481234567', 'PhilMont   sdsdsds', 'beauty products', '097645', '456678', 'pHilMont123-1458551347.apr', 'donaldduck@gmail.com', '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8', '1', '0000-00-00'),
('ToyotaCars', 'De Vera', 'Richard', 'Calasiao, Pangasinan', '09129837641', 'Toyota c', 'Cars and Vehicle for you and Me.', '09876543', '23456', 'toyota.jpg', 'richardMercy@gmail.com', '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8', '1', '0000-00-00');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_vacancies`
--

CREATE TABLE `tbl_vacancies` (
  `id` varchar(50) NOT NULL,
  `employer_id` varchar(50) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `vacancy_date` varchar(50) NOT NULL,
  `job_title` varchar(100) NOT NULL,
  `skills` varchar(1000) NOT NULL,
  `date` varchar(20) NOT NULL,
  `status` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_vacancies`
--

INSERT INTO `tbl_vacancies` (`id`, `employer_id`, `description`, `vacancy_date`, `job_title`, `skills`, `date`, `status`) VALUES
('0716d9708d321ffb6a00818614779e779925365c', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'dddd', '08/17/2018', 'aaa', 'sss', '2017-09-23 15:01:57', 1),
('0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'I need someone who have 5 years of experience as optical technician. ', '06/14/2019', 'Expert Optical Technician', 'null', '2016-03-13 14:29:52', 1),
('1574bddb75c78a6fd2251d61e2993b5146201319', '1', 'uuu', '08/17/2018', 'fff', 'uuu', '2017-09-23 14:19:59', 1),
('17ba0791499db908433b80f37c5fbc89b870084b', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'sdsdsdsdsdsd', '06/14/2019', 'xxx', '["sss","ssssss","sssssssss"]', '2016-03-24 17:20:57', 1),
('1b6453892473a467d07372d45eb05abc2031647a', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'I need someone who have 5 years of experience as optical technician. ', '06/14/2019', 'Expert Optical Technician', 'null', '2016-03-13 14:24:52', 1),
('356a192b7913b04c54574d18c28d46e6395428ab', 'pHilMont123', 'I want someone who can make website in just two weeks. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitat.', '06/14/2019', 'Web Developer', '["PHP","JQuery","HTML5","CSS3"]', '2016-03-12 14:24:20', 1),
('77de68daecd823babbb58edb1c8e14d7106e83bb', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'I need someone who have 5 years of experience as optical technician. ', '06/14/2019', 'Expert Optical Technician', 'null', '2016-03-13 14:24:19', 1),
('7b52009b64fd0a2a49e6d8a939753077792b0554', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'There are many variations of passages of Lorem Ipsum available There are many variations of passages of Lorem Ipsum available There are many variations of passages of Lorem Ipsum available There are many variations of passages of Lorem Ipsum available', '06/14/2019', 'Full Stack Web Developer', '["Jquery","CSS3","Ajax","HTML5","JQuery UI"]', '2016-03-29 17:59:46', 1),
('902ba3cda1883801594b6e1b452790cc53948fda', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'I need someone who have 5 years of experience as optical technician. ', '06/14/2019', 'Expert Optical Technician', 'null', '2016-03-13 14:25:48', 1),
('9e6a55b6b4563e652a23be9d623ca5055c356940', 'c1dfd96eea8cc2b62785275bca38ac261256e278', 'luto', '08/17/2018', 'Adobo cooker', 'cooooookkkerrr', '2017-09-23 15:03:12', 1),
('ac3478d69a3c81fa62e60f5c3696165a4e5e6ac4', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'I need someone who have 5 years of experience as optical technician. ', '06/14/2019', 'Expert Optical Technician', '["sss"]', '2016-03-13 14:25:07', 1),
('b1d5781111d84f7b3fe45a0852e59758cd7a87e5', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'sdsdsddsd', '06/14/2019', 'ssdsd', '["sdsdsd"]', '2016-03-21 21:05:20', 1),
('b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', 'Fast worker', '08/17/2019', 'Service Crew', 'Cook', '2017-09-24 20:10:29', 1),
('bd307a3ec329e10a2cff8fb87480823da114f8f4', '1', 'asasa', '30 September, 2017', 'Adobo PutoShop', '{"name":"field_description","value":"asasas"}', '2017-09-22 17:16:51', 1),
('c1dfd96eea8cc2b62785275bca38ac261256e278', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'I need someone who have 5 years of experience as optical technician. ', '06/14/2019', 'Expert Optical Technicians', '["sss"]', '2016-03-13 14:25:37', 1),
('da4b9237bacccdf19c0760cab7aec4a8359010b0', '1', 'I am looking for a sales lady that must have the following characteristics as stated above. ', '06/14/2019', 'Sales Lady', '["Maganda","Sexy","Maputi","NBSB (important)"]', '2016-03-12 15:41:51', 1),
('f1abd670358e036c31296e66b3b66c382ac00812', '1', 'dfdfdd', '08/17/2018', 'bbbbbbb', 'fdf', '2017-09-23 13:22:12', 1),
('fa35e192121eabf3dabf9f5ea6abdbcbc107ac3b', '1', 'Hindi takot sa patay.', '29 September, 2018', 'St. Peter\'s Life Plan', 'Balsamador', '2017-09-22 17:19:43', 1),
('fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'I need someone who have 5 years of experience as optical technician. ', '06/14/2019', 'Expert Optical Technician', 'null', '2016-03-13 14:29:45', 1),
('h6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'pHilMont123', 'Hello, I need someone who can do all things for me. ', '06/14/2019', 'Job Title', '["Full Stack Web Developer","Web Designer","PHP","JQuery","HTML5"]', '2016-03-12 12:04:21', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_acadinfo`
--
ALTER TABLE `tbl_acadinfo`
  ADD PRIMARY KEY (`id`);

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
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_career`
--
ALTER TABLE `tbl_career`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_employer`
--
ALTER TABLE `tbl_employer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_vacancies`
--
ALTER TABLE `tbl_vacancies`
  ADD PRIMARY KEY (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
