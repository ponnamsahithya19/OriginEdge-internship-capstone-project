-- ====================================================================
-- ENTERPRISE INTERNSHIP MANAGEMENT SYSTEM — DATABASE SCHEMA (MySQL 8.0)
-- ====================================================================

CREATE DATABASE IF NOT EXISTS `internship_management_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `internship_management_db`;

-- Drop existing tables in reverse dependency order
DROP TABLE IF EXISTS `system_logs`;
DROP TABLE IF EXISTS `certificates`;
DROP TABLE IF EXISTS `evaluations`;
DROP TABLE IF EXISTS `logbooks`;
DROP TABLE IF EXISTS `applications`;
DROP TABLE IF EXISTS `internships`;
DROP TABLE IF EXISTS `company_profiles`;
DROP TABLE IF EXISTS `faculty_profiles`;
DROP TABLE IF EXISTS `student_profiles`;
DROP TABLE IF EXISTS `users`;

-- 1. USERS TABLE
CREATE TABLE `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `email` VARCHAR(191) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `role` ENUM('ADMIN', 'STUDENT', 'FACULTY', 'COMPANY') NOT NULL,
  `full_name` VARCHAR(150) NOT NULL,
  `phone` VARCHAR(30) NULL,
  `department` VARCHAR(100) NULL,
  `status` ENUM('ACTIVE', 'PENDING_APPROVAL', 'SUSPENDED') DEFAULT 'ACTIVE',
  `avatar_url` VARCHAR(255) NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_user_email` (`email`),
  INDEX `idx_user_role` (`role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. STUDENT PROFILES TABLE
CREATE TABLE `student_profiles` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL UNIQUE,
  `roll_number` VARCHAR(50) NOT NULL UNIQUE,
  `cgpa` DECIMAL(3,2) NOT NULL DEFAULT 0.00,
  `branch` VARCHAR(100) NOT NULL,
  `batch_year` INT NOT NULL,
  `resume_url` VARCHAR(255) NULL,
  `skills` TEXT NULL, -- Comma separated or JSON array string
  `bio` TEXT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_student_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. FACULTY PROFILES TABLE
CREATE TABLE `faculty_profiles` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL UNIQUE,
  `employee_id` VARCHAR(50) NOT NULL UNIQUE,
  `department` VARCHAR(100) NOT NULL,
  `designation` VARCHAR(100) NOT NULL DEFAULT 'Assistant Professor',
  `office_location` VARCHAR(150) NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_faculty_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. COMPANY PROFILES TABLE
CREATE TABLE `company_profiles` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL UNIQUE,
  `company_name` VARCHAR(150) NOT NULL,
  `industry` VARCHAR(100) NOT NULL,
  `website` VARCHAR(255) NULL,
  `is_verified` TINYINT(1) DEFAULT 0,
  `address` TEXT NULL,
  `description` TEXT NULL,
  `logo_url` VARCHAR(255) NULL,
  `hr_contact` VARCHAR(100) NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_company_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. INTERNSHIPS TABLE
CREATE TABLE `internships` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `company_id` INT NOT NULL,
  `title` VARCHAR(200) NOT NULL,
  `description` TEXT NOT NULL,
  `domain` VARCHAR(100) NOT NULL,
  `location` VARCHAR(150) NOT NULL,
  `work_type` ENUM('REMOTE', 'ON-SITE', 'HYBRID') DEFAULT 'HYBRID',
  `stipend_monthly` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  `duration_weeks` INT NOT NULL DEFAULT 12,
  `slots` INT NOT NULL DEFAULT 5,
  `requirements` TEXT NULL,
  `min_cgpa` DECIMAL(3,2) DEFAULT 6.00,
  `status` ENUM('ACTIVE', 'DRAFT', 'CLOSED') DEFAULT 'ACTIVE',
  `deadline` DATE NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `fk_internship_company` FOREIGN KEY (`company_id`) REFERENCES `company_profiles` (`id`) ON DELETE CASCADE,
  INDEX `idx_internship_status` (`status`),
  INDEX `idx_internship_domain` (`domain`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. APPLICATIONS TABLE
CREATE TABLE `applications` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `internship_id` INT NOT NULL,
  `student_id` INT NOT NULL,
  `faculty_id` INT NULL, -- Assigned supervising faculty
  `status` ENUM('SUBMITTED', 'FACULTY_PENDING', 'FACULTY_APPROVED', 'FACULTY_REJECTED', 'COMPANY_SELECTED', 'COMPANY_REJECTED', 'COMPLETED') DEFAULT 'FACULTY_PENDING',
  `cover_letter` TEXT NULL,
  `resume_url` VARCHAR(255) NULL,
  `noc_document_url` VARCHAR(255) NULL,
  `offer_letter_url` VARCHAR(255) NULL,
  `faculty_remarks` TEXT NULL,
  `company_remarks` TEXT NULL,
  `submitted_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `fk_app_internship` FOREIGN KEY (`internship_id`) REFERENCES `internships` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_app_student` FOREIGN KEY (`student_id`) REFERENCES `student_profiles` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_app_faculty` FOREIGN KEY (`faculty_id`) REFERENCES `faculty_profiles` (`id`) ON DELETE SET NULL,
  UNIQUE KEY `unique_student_internship` (`student_id`, `internship_id`),
  INDEX `idx_app_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. LOGBOOKS TABLE
CREATE TABLE `logbooks` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `application_id` INT NOT NULL,
  `week_number` INT NOT NULL,
  `log_date` DATE NOT NULL,
  `hours_worked` INT NOT NULL DEFAULT 40,
  `tasks_summary` TEXT NOT NULL,
  `learnings` TEXT NULL,
  `status` ENUM('SUBMITTED', 'FACULTY_APPROVED', 'FACULTY_REJECTED') DEFAULT 'SUBMITTED',
  `faculty_feedback` TEXT NULL,
  `mentor_feedback` TEXT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `fk_log_application` FOREIGN KEY (`application_id`) REFERENCES `applications` (`id`) ON DELETE CASCADE,
  UNIQUE KEY `unique_app_week` (`application_id`, `week_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. EVALUATIONS TABLE
CREATE TABLE `evaluations` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `application_id` INT NOT NULL,
  `evaluator_role` ENUM('FACULTY', 'MENTOR') NOT NULL,
  `technical_score` INT NOT NULL CHECK (`technical_score` BETWEEN 1 AND 10),
  `domain_score` INT NOT NULL CHECK (`domain_score` BETWEEN 1 AND 10),
  `communication_score` INT NOT NULL CHECK (`communication_score` BETWEEN 1 AND 10),
  `punctuality_score` INT NOT NULL CHECK (`punctuality_score` BETWEEN 1 AND 10),
  `overall_grade` VARCHAR(5) NOT NULL DEFAULT 'A',
  `comments` TEXT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_eval_application` FOREIGN KEY (`application_id`) REFERENCES `applications` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 9. CERTIFICATES TABLE
CREATE TABLE `certificates` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `application_id` INT NOT NULL UNIQUE,
  `certificate_code` VARCHAR(100) NOT NULL UNIQUE,
  `issued_date` DATE NOT NULL,
  `pdf_url` VARCHAR(255) NULL,
  `verified_by` INT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_cert_application` FOREIGN KEY (`application_id`) REFERENCES `applications` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_cert_verifier` FOREIGN KEY (`verified_by`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 10. SYSTEM LOGS TABLE
CREATE TABLE `system_logs` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NULL,
  `action` VARCHAR(150) NOT NULL,
  `details` TEXT NULL,
  `ip_address` VARCHAR(50) NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_log_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
