-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 05, 2025 at 04:21 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `airdnd`
--

-- --------------------------------------------------------

--
-- Table structure for table `landlord`
--

CREATE TABLE `landlord` (
  `Landlord_ID` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Phone_Number` varchar(15) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `Bank_acc` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `lease`
--

CREATE TABLE `lease` (
  `Lease_ID` int(11) NOT NULL,
  `Start_Date` date DEFAULT NULL,
  `End_Date` date DEFAULT NULL,
  `Monthly_Rent` decimal(10,2) DEFAULT NULL,
  `Deposit` decimal(10,2) DEFAULT NULL,
  `Tenant_ID` int(11) DEFAULT NULL,
  `Prop_ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `maintenance`
--

CREATE TABLE `maintenance` (
  `Req_ID` int(11) NOT NULL,
  `Req_Date` date DEFAULT NULL,
  `Description` text DEFAULT NULL,
  `Status` varchar(20) DEFAULT NULL,
  `Prop_ID` int(11) DEFAULT NULL,
  `Tenant_ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `Pay_ID` int(11) NOT NULL,
  `Pay_Date` date DEFAULT NULL,
  `Amount` decimal(10,2) DEFAULT NULL,
  `Pay_Method` varchar(50) DEFAULT NULL,
  `Tenant_ID` int(11) DEFAULT NULL,
  `Lease_ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `property`
--

CREATE TABLE `property` (
  `Prop_ID` int(11) NOT NULL,
  `Address` varchar(255) NOT NULL,
  `Type` varchar(50) DEFAULT NULL,
  `Rent_Amount` decimal(10,2) DEFAULT NULL,
  `Status` varchar(20) DEFAULT NULL,
  `Landlord_ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tenant`
--

CREATE TABLE `tenant` (
  `Tenant_ID` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Phone_Number` varchar(15) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `Occupation` varchar(50) DEFAULT NULL,
  `Permanent_Address` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `landlord`
--
ALTER TABLE `landlord`
  ADD PRIMARY KEY (`Landlord_ID`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- Indexes for table `lease`
--
ALTER TABLE `lease`
  ADD PRIMARY KEY (`Lease_ID`),
  ADD KEY `Tenant_ID` (`Tenant_ID`),
  ADD KEY `Prop_ID` (`Prop_ID`);

--
-- Indexes for table `maintenance`
--
ALTER TABLE `maintenance`
  ADD PRIMARY KEY (`Req_ID`),
  ADD KEY `Prop_ID` (`Prop_ID`),
  ADD KEY `Tenant_ID` (`Tenant_ID`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`Pay_ID`),
  ADD KEY `Tenant_ID` (`Tenant_ID`),
  ADD KEY `Lease_ID` (`Lease_ID`);

--
-- Indexes for table `property`
--
ALTER TABLE `property`
  ADD PRIMARY KEY (`Prop_ID`),
  ADD KEY `Landlord_ID` (`Landlord_ID`);

--
-- Indexes for table `tenant`
--
ALTER TABLE `tenant`
  ADD PRIMARY KEY (`Tenant_ID`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `lease`
--
ALTER TABLE `lease`
  ADD CONSTRAINT `lease_ibfk_1` FOREIGN KEY (`Tenant_ID`) REFERENCES `tenant` (`Tenant_ID`),
  ADD CONSTRAINT `lease_ibfk_2` FOREIGN KEY (`Prop_ID`) REFERENCES `property` (`Prop_ID`);

--
-- Constraints for table `maintenance`
--
ALTER TABLE `maintenance`
  ADD CONSTRAINT `maintenance_ibfk_1` FOREIGN KEY (`Prop_ID`) REFERENCES `property` (`Prop_ID`),
  ADD CONSTRAINT `maintenance_ibfk_2` FOREIGN KEY (`Tenant_ID`) REFERENCES `tenant` (`Tenant_ID`);

--
-- Constraints for table `payment`
--
ALTER TABLE `payment`
  ADD CONSTRAINT `payment_ibfk_1` FOREIGN KEY (`Tenant_ID`) REFERENCES `tenant` (`Tenant_ID`),
  ADD CONSTRAINT `payment_ibfk_2` FOREIGN KEY (`Lease_ID`) REFERENCES `lease` (`Lease_ID`);

--
-- Constraints for table `property`
--
ALTER TABLE `property`
  ADD CONSTRAINT `property_ibfk_1` FOREIGN KEY (`Landlord_ID`) REFERENCES `landlord` (`Landlord_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
