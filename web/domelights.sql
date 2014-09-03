-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Aug 25, 2014 at 09:11 PM
-- Server version: 5.5.38-0ubuntu0.14.04.1
-- PHP Version: 5.5.9-1ubuntu4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `domelights`
--

-- --------------------------------------------------------

--
-- Table structure for table `animations`
--

CREATE TABLE IF NOT EXISTS `animations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `token` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL,
  `start` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `end` timestamp NULL DEFAULT NULL,
  `source` text NOT NULL,
  `data` text NOT NULL,
  `state` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `controllers`
--

CREATE TABLE IF NOT EXISTS `controllers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL,
  `secret` varchar(12) NOT NULL,
  `mode` tinyint(1) NOT NULL DEFAULT '0',
  `script_name` varchar(255) NOT NULL DEFAULT 'default.py',
  `last_active` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `last_ip` varchar(255) NOT NULL,
  `last_animation` int(11) NOT NULL,
  `comment` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `controllers`
--

INSERT INTO `controllers` (`id`, `name`, `secret`, `mode`, `script_name`, `last_active`, `last_ip`, `last_animation`, `comment`) VALUES
(1, 'controller01', 'XPbZ65Fp0q0s', 1, 'starburst.py', '2014-08-23 00:23:50', '', 0, ''),
(2, 'domeplayer01', 'Qm9nZF0ouU7A', 1, 'starburst.py', '2014-08-23 00:23:50', '', 0, '');

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE IF NOT EXISTS `events` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `start` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `end` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `type` tinyint(4) NOT NULL COMMENT '0: Blackout, 1: Animations, 2: Scripts',
  `comment` text NOT NULL COMMENT 'Why there is a override at this time',
  `options` varchar(255) NOT NULL COMMENT 'optional, used when type is set to script.',
  `active` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=8 ;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id`, `created`, `start`, `end`, `type`, `comment`, `options`, `active`) VALUES
(1, '2014-08-22 01:58:17', '2014-08-21 07:00:00', '2014-08-22 06:36:00', 2, '', 'starburst.py', 1),
(2, '2014-08-22 06:36:04', '2014-08-22 06:36:00', '2014-08-22 06:40:00', 0, '', '', 1),
(3, '2014-08-22 16:13:06', '2014-08-22 16:13:00', '2014-08-22 16:15:00', 2, '', 'gradient.py', 1),
(4, '2014-08-22 16:14:05', '2014-08-22 16:15:00', '2014-08-22 16:20:00', 2, '', 'twinklestar-multicolour.py', 1),
(5, '2014-08-22 16:14:31', '2014-08-22 16:20:00', '2014-08-22 16:23:00', 0, '', '', 1),
(6, '2014-08-22 16:35:56', '2014-08-22 16:35:00', '2014-08-22 16:37:00', 0, '', '', 1),
(7, '2014-08-22 23:15:45', '2014-08-22 23:15:00', '2014-08-22 23:18:00', 0, '', '', 1);

-- --------------------------------------------------------

--
-- Table structure for table `schedule`
--

CREATE TABLE IF NOT EXISTS `schedule` (
  `day` tinyint(1) NOT NULL,
  `start` int(11) NOT NULL,
  `end` int(11) NOT NULL,
  `type` tinyint(1) NOT NULL,
  UNIQUE KEY `day` (`day`,`start`,`end`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `schedule`
--

INSERT INTO `schedule` (`day`, `start`, `end`, `type`) VALUES
(0, 0, 1959, 0),
(0, 2000, 2259, 1),
(1, 0, 1959, 0),
(1, 2000, 2259, 1),
(2, 0, 1959, 0),
(2, 2000, 2259, 1),
(3, 0, 1959, 0),
(3, 2000, 2259, 1),
(4, 0, 1959, 0),
(4, 2000, 2259, 1),
(5, 0, 1959, 0),
(5, 2000, 2259, 1),
(6, 0, 1959, 0),
(6, 2000, 2259, 1),
(6, 2300, 2359, 2);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `active` tinyint(1) NOT NULL,
  `admin` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `animations`
--
ALTER TABLE `animations`
  ADD CONSTRAINT `animations_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
