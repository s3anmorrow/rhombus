-- phpMyAdmin SQL Dump
-- version 4.6.5.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Apr 06, 2017 at 12:40 AM
-- Server version: 5.6.34
-- PHP Version: 7.1.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `smorrow`
--

-- --------------------------------------------------------

--
-- Table structure for table `rhombushighscores`
--

CREATE TABLE `rhombushighscores` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(15) NOT NULL DEFAULT 'annonymous',
  `score` int(10) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=COMPACT;

--
-- Dumping data for table `rhombushighscores`
--

INSERT INTO `rhombushighscores` (`id`, `name`, `score`) VALUES
(1, 'SPM', 5000),
(2, 'SVM', 4000),
(3, 'RJM', 3000),
(4, 'DAM', 2000),
(5, 'TPC', 1000);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `rhombushighscores`
--
ALTER TABLE `rhombushighscores`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `rhombushighscores`
--
ALTER TABLE `rhombushighscores`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
