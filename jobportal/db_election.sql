-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Apr 04, 2016 at 05:47 AM
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `db_election`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_access`
--

CREATE TABLE IF NOT EXISTS `tbl_access` (
  `access_id` varchar(50) NOT NULL,
  `student_id` varchar(20) NOT NULL,
  `access_passcode` varchar(8) NOT NULL,
  `election_id` varchar(50) NOT NULL,
  PRIMARY KEY (`access_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_candidate`
--

CREATE TABLE IF NOT EXISTS `tbl_candidate` (
  `candidate_id` varchar(50) NOT NULL,
  `candidate_student_id` varchar(50) NOT NULL,
  `candidate_position` varchar(50) NOT NULL,
  `candidate_purpose` varchar(500) NOT NULL,
  `candidate_achievement` varchar(500) NOT NULL,
  `candidate_politicalparty` varchar(50) NOT NULL,
  `election_id` varchar(50) NOT NULL,
  PRIMARY KEY (`candidate_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_candidate`
--

INSERT INTO `tbl_candidate` (`candidate_id`, `candidate_student_id`, `candidate_position`, `candidate_purpose`, `candidate_achievement`, `candidate_politicalparty`, `election_id`) VALUES
('0716d9708d321ffb6a00818614779e779925365c', '15-LN-00304', 'Second Year Representative', 'sss', 'ssss', 'ssss', '356a192b7913b04c54574d18c28d46e6395428ab'),
('0ade7c2cf97f75d009975f4d720d1fa6c19f4897', '111', 'Treasurer', 'ghghgh', 'ghghgh', 'fgfgfg', '356a192b7913b04c54574d18c28d46e6395428ab'),
('1574bddb75c78a6fd2251d61e2993b5146201319', '13-LN-131313', 'Third Year Representative', 'dddd', 'dddd', 'ddd', '356a192b7913b04c54574d18c28d46e6395428ab'),
('17ba0791499db908433b80f37c5fbc89b870084b', '11-LN-0002', 'PIO', 'dfdfdfd', 'dfdfdf', 'dfdfdf', '356a192b7913b04c54574d18c28d46e6395428ab'),
('1b6453892473a467d07372d45eb05abc2031647a', '11-LN-0004', 'Fourth Year Representative', 'ssss', 'sssss', 'sss', '356a192b7913b04c54574d18c28d46e6395428ab'),
('356a192b7913b04c54574d18c28d46e6395428ab', 'qqqq', 'President', 'qqqq', 'qqqq', 'VVV', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c'),
('77de68daecd823babbb58edb1c8e14d7106e83bb', 'Qqqq', 'President', 'fgfdgfdgfdgfdg', 'dfgretgrgfdg', 'ssss', '356a192b7913b04c54574d18c28d46e6395428ab'),
('7b52009b64fd0a2a49e6d8a939753077792b0554', '11-qwerty-1223', 'PIO', 'dfdfdfd', 'dfdfdfdf', 'dfdfdfdf', '356a192b7913b04c54574d18c28d46e6395428ab'),
('902ba3cda1883801594b6e1b452790cc53948fda', 'ssssss', 'Secretary', 'sdsdsdsd', 'sddsdsd', 'ggg', '356a192b7913b04c54574d18c28d46e6395428ab'),
('9e6a55b6b4563e652a23be9d623ca5055c356940', '15-LN-00021', 'President', 'ssss', 'ssss', 'aaaa', '356a192b7913b04c54574d18c28d46e6395428ab'),
('ac3478d69a3c81fa62e60f5c3696165a4e5e6ac4', 'Cccc', 'Vice President', 'sdsdsdsd', 'dsdsd', 'xxx', '356a192b7913b04c54574d18c28d46e6395428ab'),
('b1d5781111d84f7b3fe45a0852e59758cd7a87e5', '11-LN-00083', 'Auditor', 'dfdfdf', 'ddfdf', 'ddfdf', '356a192b7913b04c54574d18c28d46e6395428ab'),
('b3f0c7f6bb763af1be91d9e74eabfeb199dc1f1f', '11-LN-0083', 'President', '```', '````', '```', 'da4b9237bacccdf19c0760cab7aec4a8359010b0'),
('b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', '11-LN-0004', 'President', 'Maecenas sed diam eget risus varius blandit sit amet non magna. Donec id elit non mi porta gravida at eget metus. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.', 'Maecenas sed diam eget risus varius blandit sit amet non magna. Donec id elit non mi porta gravida at eget metus. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.', 'XXX', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c'),
('bd307a3ec329e10a2cff8fb87480823da114f8f4', '1113334454566', 'Peace Officer', 'fdfdfd', 'dfdfdfd', 'dfdfd', '356a192b7913b04c54574d18c28d46e6395428ab'),
('c1dfd96eea8cc2b62785275bca38ac261256e278', '15-LN-0000', 'Vice President', 'rererer', 'ererere', 'fff', '356a192b7913b04c54574d18c28d46e6395428ab'),
('da4b9237bacccdf19c0760cab7aec4a8359010b0', 'Cccc', 'President', 'qqqqqqq', 'qqqqq', 'qqqq', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c'),
('f1abd670358e036c31296e66b3b66c382ac00812', 'Aaaa', 'First Year Representative', 'dddd', 'dddd', 'ddd', '356a192b7913b04c54574d18c28d46e6395428ab'),
('fa35e192121eabf3dabf9f5ea6abdbcbc107ac3b', '11-LN-0001', 'Peace Officer', 'dfdfdfd', 'dfdfdf', 'fgffgf', '356a192b7913b04c54574d18c28d46e6395428ab'),
('fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', 'eeeee', 'Secretary', 'fgfgfgfgg', 'fgfgfgfg', 'jyuy', '356a192b7913b04c54574d18c28d46e6395428ab');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_election`
--

CREATE TABLE IF NOT EXISTS `tbl_election` (
  `election_id` varchar(50) NOT NULL,
  `election_title` varchar(100) NOT NULL,
  `election_date` varchar(50) NOT NULL,
  `election_discription` varchar(250) NOT NULL,
  `status` varchar(1) NOT NULL,
  PRIMARY KEY (`election_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_election`
--

INSERT INTO `tbl_election` (`election_id`, `election_title`, `election_date`, `election_discription`, `status`) VALUES
('1b6453892473a467d07372d45eb05abc2031647a', '2016 Presidential Election', '04-08-2016 00:00:00', 'Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam id dolor id nibh ultricies vehicula.', '0'),
('356a192b7913b04c54574d18c28d46e6395428ab', 'ssss', '02-19-2016 00:00:00', 'sssss', '0'),
('77de68daecd823babbb58edb1c8e14d7106e83bb', 'sdsdsd', '00-00-0000 00:00:00', 'sdsdsdsdsd', '0'),
('b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', '2016 GNHS SSG Election', '02-19-2016 00:00:00', 'Maecenas sed diam eget risus varius blandit sit amet non magna. Donec id elit non mi porta gravida at eget metus. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.', '0'),
('da4b9237bacccdf19c0760cab7aec4a8359010b0', 'xxx', '04-14-2016 00:00:00', 'xxxxx', '0');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_events`
--

CREATE TABLE IF NOT EXISTS `tbl_events` (
  `id` varchar(50) NOT NULL,
  `events` varchar(2000) NOT NULL,
  `status` varchar(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_events`
--

INSERT INTO `tbl_events` (`id`, `events`, `status`) VALUES
('b3f0c7f6bb763af1be91d9e74eabfeb199dc1f1f', '{"organize-election":[{"title":"1. New Election","start":"00-00-0000 00:00:00","end":"00-00-0000 00:00:00","className":"bg-purple","media":"","description":"Start new poll. This will initiate the election","allDay":false}],"candidate_nomination":[{"title":"2. Candidates Nomination","start":"00-00-0000 00:00:00","end":"00-00-0000 00:00:00","className":"bg-blue","media":"","description":"Nominate eligible candidates","allDay":false}],"voter_validation":[{"title":"3. Validate Voters","start":"00-00-0000 00:00:00","end":"00-00-0000 00:00:00","className":"bg-green","media":"","description":"Validate active voters","allDay":false}],"grant_access":[{"title":"4. Grant Access","start":"00-00-0000 00:00:00","end":"00-00-0000 00:00:00","className":"bg-orange","media":"","description":"Validated voters will gain access to vote","allDay":false}],"election_day":[{"title":"5. Election Day","start":"00-00-0000 00:00:00","end":"00-00-0000 00:00:00","className":"bg-red","media":"","description":"Validated voters can vote candidates","allDay":false}]}', '0');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user`
--

CREATE TABLE IF NOT EXISTS `tbl_user` (
  `user_id` varchar(50) NOT NULL,
  `user_name` varchar(250) NOT NULL,
  `user_password` varchar(50) NOT NULL,
  `user_email` varchar(100) NOT NULL,
  `user_level` int(2) NOT NULL,
  `user_picture` varchar(100) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_user`
--

INSERT INTO `tbl_user` (`user_id`, `user_name`, `user_password`, `user_email`, `user_level`, `user_picture`) VALUES
('1', 'AdminRufo', '01b307acba4f54f55aafc33bb06bbbf6ca803e9a', 'rufo.gabrillo@gmail.com', 1, '862075acf96b35f4166faea449b69d6e40f18385-1452445843.png');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_voter`
--

CREATE TABLE IF NOT EXISTS `tbl_voter` (
  `voter_id` varchar(50) NOT NULL,
  `voter_fname` varchar(50) NOT NULL,
  `voter_mname` varchar(50) NOT NULL,
  `voter_gname` varchar(50) NOT NULL,
  `voter_age` int(2) NOT NULL,
  `voter_gender` varchar(10) NOT NULL,
  `voter_education` int(1) NOT NULL,
  `voter_student_id` varchar(50) NOT NULL,
  `voter_section` varchar(10) NOT NULL,
  `voter_yearlevel` varchar(50) NOT NULL,
  `voter_status` int(1) NOT NULL,
  `voter_image` varchar(250) NOT NULL,
  `date` varchar(20) NOT NULL,
  PRIMARY KEY (`voter_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_voter`
--

INSERT INTO `tbl_voter` (`voter_id`, `voter_fname`, `voter_mname`, `voter_gname`, `voter_age`, `voter_gender`, `voter_education`, `voter_student_id`, `voter_section`, `voter_yearlevel`, `voter_status`, `voter_image`, `date`) VALUES
('0716d9708d321ffb6a00818614779e779925365c', 'Xxx', 'Xxx', 'Xxx', 23, 'Male', 2, 'Xxx', 'Ddddd', 'Third Year', 0, 'af35b494002389c0bb343f962d40e8e53ed2af28-1457072334.png', '2016-03-04 14:18:55'),
('0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Pascual', 'Gabrillo', 'Piolo', 29, 'Male', 2, '15-LN-0000', 'ssss', 'Grade 4', 0, 'profile avatar.jpg', '2016-02-25 01:04:02'),
('1574bddb75c78a6fd2251d61e2993b5146201319', 'Qqq', 'Qqqq', 'Qqqq', 10, 'Male', 2, 'qqqq', 'qqqqq', 'Grade 4', 0, 'profile avatar.jpg', '2016-02-25 01:00:53'),
('17ba0791499db908433b80f37c5fbc89b870084b', 'Ssss', 'Ssss', 'Ssss', 10, 'Male', 2, 'ssssss', 'ssss', 'Second Year', 0, 'profile avatar.jpg', '2016-02-25 01:00:54'),
('1b6453892473a467d07372d45eb05abc2031647a', 'Eeeee', 'Eeeee', 'Eeeee', 10, 'Male', 2, 'eeeee', 'eeeee ', 'Grade 4', 0, 'profile avatar.jpg', '2016-02-25 01:03:56'),
('356a192b7913b04c54574d18c28d46e6395428ab', 'Gabrillo', 'Narcisi', 'Rufo', 16, 'Male', 2, '111', '111s', 'First Year', 0, 'profile avatar.jpg', '2016-02-25 01:04:00'),
('77de68daecd823babbb58edb1c8e14d7106e83bb', 'Gabrillo', 'Narcisi', 'Rufo', 22, 'Male', 2, '11-LN-00083', 'Sampaguita', 'First Year', 0, 'profile avatar.jpg', '2016-02-25 01:03:58'),
('7b52009b64fd0a2a49e6d8a939753077792b0554', 'Gabrillo', 'Narcisi', 'Rufo', 22, 'Male', 2, '11-LN-0002', 'A', 'Grade 5', 0, 'profile avatar.jpg', '2016-02-25 01:03:57'),
('902ba3cda1883801594b6e1b452790cc53948fda', 'Norte', 'Jefferson', 'Yujico ', 21, 'Male', 2, '11-qwerty-1223', 'Tasi', 'Grade 4', 0, 'profile avatar.jpg', '2016-02-25 01:04:02'),
('9e6a55b6b4563e652a23be9d623ca5055c356940', 'Soriano', 'Jose', 'Kenneth', 10, 'Male', 2, '1113334454566', 'rfrffffff', 'Grade 4', 0, 'profile avatar.jpg', '2016-02-25 01:00:54'),
('ac3478d69a3c81fa62e60f5c3696165a4e5e6ac4', 'Gabrillo', 'Narcisi', 'Rufo', 21, 'Male', 2, '11-LN-0001', 'xxx', 'First Year', 0, 'profile avatar.jpg', '2016-02-25 01:03:56'),
('b1d5781111d84f7b3fe45a0852e59758cd7a87e5', 'Www', 'Aaa', 'Aaa', 10, 'Male', 2, 'Aaaa', 'Aaa', 'Grade 4', 0, 'profile avatar.jpg', '2016-02-25 01:00:15'),
('b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'Manlapas', 'Tobias', 'Micaella', 10, 'Female', 2, '13-LN-131313', 'Cattleya', 'Senior High', 0, 'profile avatar.jpg', '2016-02-25 01:04:01'),
('bd307a3ec329e10a2cff8fb87480823da114f8f4', 'Manlapas', 'Tobias', 'Micaella', 19, 'Female', 2, '11-LN-0003', 'Macapuno', 'Junior High', 0, 'profile avatar.jpg', '2016-02-25 01:04:00'),
('c1dfd96eea8cc2b62785275bca38ac261256e278', 'Gabrillo', 'Narcisi', 'Rufo', 21, 'Male', 2, '11-LN-0083', 'xxx', 'First Year', 0, 'profile avatar.jpg', '2016-03-04 14:19:15'),
('da4b9237bacccdf19c0760cab7aec4a8359010b0', 'Caboteja', 'Meneses', 'Roldan', 19, 'Male', 2, '15-LN-00304', 'matulungin', 'Senior High', 0, 'profile avatar.jpg', '2016-02-25 01:03:53'),
('f1abd670358e036c31296e66b3b66c382ac00812', 'Xx', 'Xxx', 'Xxx', 10, 'Male', 2, 'cccc', 'xxxx', 'Grade 4', 0, 'profile avatar.jpg', '2016-02-25 00:28:12'),
('fa35e192121eabf3dabf9f5ea6abdbcbc107ac3b', 'Carranza', 'Cruz', 'Baden Dawrin', 20, 'Female', 2, '11-LN-0004', 'Buko', 'Junior  High', 0, 'profile avatar.jpg', '2016-02-25 01:03:54'),
('fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', 'Reid', 'Gabrillo', 'James', 20, 'Male', 2, '15-LN-00021', 'xxxx', 'Senior High', 0, 'profile avatar.jpg', '2016-02-25 01:00:53');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_votes`
--

CREATE TABLE IF NOT EXISTS `tbl_votes` (
  `vote_id` varchar(50) NOT NULL,
  `candidate_id` varchar(50) NOT NULL,
  `election_id` varchar(50) NOT NULL,
  `vote_count` int(10) NOT NULL,
  PRIMARY KEY (`vote_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_votes`
--

INSERT INTO `tbl_votes` (`vote_id`, `candidate_id`, `election_id`, `vote_count`) VALUES
('0ade7c2cf97f75d009975f4d720d1fa6c19f4897', '9e6a55b6b4563e652a23be9d623ca5055c356940', '356a192b7913b04c54574d18c28d46e6395428ab', 1),
('1b6453892473a467d07372d45eb05abc2031647a', '7b52009b64fd0a2a49e6d8a939753077792b0554', '356a192b7913b04c54574d18c28d46e6395428ab', 1),
('356a192b7913b04c54574d18c28d46e6395428ab', 'c1dfd96eea8cc2b62785275bca38ac261256e278', '356a192b7913b04c54574d18c28d46e6395428ab', 1),
('77de68daecd823babbb58edb1c8e14d7106e83bb', '0ade7c2cf97f75d009975f4d720d1fa6c19f4897', '356a192b7913b04c54574d18c28d46e6395428ab', 1),
('902ba3cda1883801594b6e1b452790cc53948fda', '9e6a55b6b4563e652a23be9d623ca5055c356940', '356a192b7913b04c54574d18c28d46e6395428ab', 1),
('ac3478d69a3c81fa62e60f5c3696165a4e5e6ac4', 'bd307a3ec329e10a2cff8fb87480823da114f8f4', '356a192b7913b04c54574d18c28d46e6395428ab', 1),
('b1d5781111d84f7b3fe45a0852e59758cd7a87e5', 'ac3478d69a3c81fa62e60f5c3696165a4e5e6ac4', '356a192b7913b04c54574d18c28d46e6395428ab', 1),
('b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', '1b6453892473a467d07372d45eb05abc2031647a', '356a192b7913b04c54574d18c28d46e6395428ab', 1),
('c1dfd96eea8cc2b62785275bca38ac261256e278', '0716d9708d321ffb6a00818614779e779925365c', '356a192b7913b04c54574d18c28d46e6395428ab', 1),
('da4b9237bacccdf19c0760cab7aec4a8359010b0', 'fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', '356a192b7913b04c54574d18c28d46e6395428ab', 1),
('fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', 'f1abd670358e036c31296e66b3b66c382ac00812', '356a192b7913b04c54574d18c28d46e6395428ab', 1);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
