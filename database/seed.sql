-- ====================================================================
-- ENTERPRISE INTERNSHIP MANAGEMENT SYSTEM — SEED DATASET
-- Passwords for all demo accounts: "Password123!"
-- BCrypt Hash: $2b$10$7R9f6L4k8uN3vW0zY5x1e.V5mK0jL5J5O8N8UeO5jL5J5O8N8Ue (demo hash)
-- ====================================================================

USE `internship_management_db`;

-- Clear existing data
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE `system_logs`;
TRUNCATE TABLE `certificates`;
TRUNCATE TABLE `evaluations`;
TRUNCATE TABLE `logbooks`;
TRUNCATE TABLE `applications`;
TRUNCATE TABLE `internships`;
TRUNCATE TABLE `company_profiles`;
TRUNCATE TABLE `faculty_profiles`;
TRUNCATE TABLE `student_profiles`;
TRUNCATE TABLE `users`;
SET FOREIGN_KEY_CHECKS = 1;

-- 1. INSERT USERS
INSERT INTO `users` (`id`, `email`, `password_hash`, `role`, `full_name`, `phone`, `department`, `status`, `avatar_url`) VALUES
(1, 'admin@university.edu', '$2a$10$CwTycUXWue0Thq9StjUM0uJ2D6f3dZ8eB4C8hA5eB4C8hA5eB4C8h', 'ADMIN', 'Dr. Arthur Pendelton', '+1 555-0100', 'Deans Office', 'ACTIVE', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'),
(2, 'prof.sharma@university.edu', '$2a$10$CwTycUXWue0Thq9StjUM0uJ2D6f3dZ8eB4C8hA5eB4C8hA5eB4C8h', 'FACULTY', 'Prof. Rajesh Sharma', '+1 555-0101', 'Computer Science & Eng', 'ACTIVE', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'),
(3, 'dr.patel@university.edu', '$2a$10$CwTycUXWue0Thq9StjUM0uJ2D6f3dZ8eB4C8hA5eB4C8hA5eB4C8h', 'FACULTY', 'Dr. Meera Patel', '+1 555-0102', 'Electronics & Comm', 'ACTIVE', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150'),
(4, 'hr@techcorp.com', '$2a$10$CwTycUXWue0Thq9StjUM0uJ2D6f3dZ8eB4C8hA5eB4C8hA5eB4C8h', 'COMPANY', 'Elena Rostova (TechCorp)', '+1 555-0103', 'Corporate Relations', 'ACTIVE', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150'),
(5, 'careers@innovatelabs.io', '$2a$10$CwTycUXWue0Thq9StjUM0uJ2D6f3dZ8eB4C8hA5eB4C8hA5eB4C8h', 'COMPANY', 'Marcus Vance (InnovateLabs)', '+1 555-0104', 'Talent Acquisition', 'ACTIVE', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'),
(6, 'recruitment@globalfin.com', '$2a$10$CwTycUXWue0Thq9StjUM0uJ2D6f3dZ8eB4C8hA5eB4C8hA5eB4C8h', 'COMPANY', 'Sophia Chen (GlobalFin)', '+1 555-0105', 'University Relations', 'ACTIVE', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150'),
(7, 'alex.student@university.edu', '$2a$10$CwTycUXWue0Thq9StjUM0uJ2D6f3dZ8eB4C8hA5eB4C8hA5eB4C8h', 'STUDENT', 'Alex Johnson', '+1 555-0106', 'Computer Science & Eng', 'ACTIVE', 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150'),
(8, 'sarah.student@university.edu', '$2a$10$CwTycUXWue0Thq9StjUM0uJ2D6f3dZ8eB4C8hA5eB4C8hA5eB4C8h', 'STUDENT', 'Sarah Jenkins', '+1 555-0107', 'Electronics & Comm', 'ACTIVE', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'),
(9, 'rahul.student@university.edu', '$2a$10$CwTycUXWue0Thq9StjUM0uJ2D6f3dZ8eB4C8hA5eB4C8hA5eB4C8h', 'STUDENT', 'Rahul Verma', '+1 555-0108', 'Computer Science & Eng', 'ACTIVE', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150');

-- 2. INSERT FACULTY PROFILES
INSERT INTO `faculty_profiles` (`id`, `user_id`, `employee_id`, `department`, `designation`, `office_location`) VALUES
(1, 2, 'FAC-CSE-204', 'Computer Science & Eng', 'Associate Professor & Internship Coordinator', 'Tech Building, Room 302'),
(2, 3, 'FAC-ECE-108', 'Electronics & Comm', 'Professor', 'Science Annex, Room 114');

-- 3. INSERT COMPANY PROFILES
INSERT INTO `company_profiles` (`id`, `user_id`, `company_name`, `industry`, `website`, `is_verified`, `address`, `description`, `logo_url`, `hr_contact`) VALUES
(1, 4, 'TechCorp Solutions', 'Information Technology', 'https://techcorp-example.com', 1, '100 Silicon Valley Blvd, San Jose CA', 'Enterprise Cloud & AI Solutions Provider specializing in scalable Web Application development and Microservices architecture.', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100', 'Elena Rostova (elena@techcorp.com)'),
(2, 5, 'InnovateLabs AI', 'Artificial Intelligence & Robotics', 'https://innovatelabs-example.io', 1, '45 Innovation Way, Austin TX', 'Pioneering Machine Learning applications, LLM fine-tuning, and Autonomous Robotics research.', 'https://images.unsplash.com/photo-1614680376593-902f749f7cfc?w=100', 'Marcus Vance (m.vance@innovatelabs.io)'),
(3, 6, 'GlobalFin Tech', 'Financial Services & FinTech', 'https://globalfin-example.com', 1, '200 Wall Street, New York NY', 'Leading global financial technologies firm developing real-time algorithmic trading and fraud detection systems.', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100', 'Sophia Chen (chen.s@globalfin.com)');

-- 4. INSERT STUDENT PROFILES
INSERT INTO `student_profiles` (`id`, `user_id`, `roll_number`, `cgpa`, `branch`, `batch_year`, `resume_url`, `skills`, `bio`) VALUES
(1, 7, '2023-CS-042', 3.88, 'Computer Science & Eng', 2026, 'https://example.com/resumes/alex_johnson.pdf', 'React, Node.js, Python, PostgreSQL, Docker, Git', 'Senior Computer Science undergrad passionate about full-stack web applications and cloud deployment.'),
(2, 8, '2023-EC-019', 3.75, 'Electronics & Comm', 2026, 'https://example.com/resumes/sarah_jenkins.pdf', 'Embedded C, Verilog, Python, Circuit Design, MATLAB', 'Electronics senior specialized in IoT systems, embedded firmware, and signal processing.'),
(3, 9, '2023-CS-088', 3.92, 'Computer Science & Eng', 2026, 'https://example.com/resumes/rahul_verma.pdf', 'Python, PyTorch, C++, Machine Learning, FastAPI', 'AI enthusiast working on computer vision and multi-agent AI framework research.');

-- 5. INSERT INTERNSHIPS
INSERT INTO `internships` (`id`, `company_id`, `title`, `description`, `domain`, `location`, `work_type`, `stipend_monthly`, `duration_weeks`, `slots`, `requirements`, `min_cgpa`, `status`, `deadline`) VALUES
(1, 1, 'Full-Stack Software Engineering Intern', 'Join our core platform engineering team to build scalable microservices, REST APIs, and modern React interfaces for enterprise clients.', 'Software Engineering', 'San Jose, CA', 'HYBRID', 2500.00, 12, 4, 'Strong knowledge of JavaScript/TypeScript, React, Node.js Express, and SQL databases.', 3.20, 'ACTIVE', '2026-10-15'),
(2, 2, 'AI & Large Language Models Research Intern', 'Work directly with AI research scientists on dataset curation, model fine-tuning (LLMs, Diffusion Models), and API deployment.', 'Artificial Intelligence', 'Austin, TX', 'REMOTE', 3000.00, 16, 2, 'Proficiency in Python, PyTorch, Transformers, HuggingFace, and REST API development.', 3.50, 'ACTIVE', '2026-10-30'),
(3, 3, 'FinTech Backend Systems Intern', 'Design and implement high-performance financial data pipelines and secure backend API services.', 'FinTech & Finance', 'New York, NY', 'ON-SITE', 2800.00, 12, 3, 'Experience with Java / Node.js / C++, PostgreSQL / MySQL, and distributed messaging queues.', 3.40, 'ACTIVE', '2026-11-01'),
(4, 1, 'Cloud Infrastructure & DevOps Intern', 'Automate CI/CD pipelines, manage Kubernetes clusters, and optimize cloud infrastructure costs across AWS and GCP.', 'DevOps & Cloud', 'San Jose, CA', 'HYBRID', 2600.00, 12, 2, 'Knowledge of Docker, Kubernetes, Terraform, Bash, and GitHub Actions.', 3.00, 'ACTIVE', '2026-10-20'),
(5, 2, 'Embedded IoT Systems Developer', 'Develop micro-controller firmware for next-gen autonomous sensor nodes using C/C++ and FreeRTOS.', 'Hardware & IoT', 'Austin, TX', 'ON-SITE', 2400.00, 12, 3, 'Solid background in Embedded C, Microcontrollers (ESP32/STM32), SPI/I2C protocols.', 3.20, 'ACTIVE', '2026-11-15');

-- 6. INSERT APPLICATIONS
INSERT INTO `applications` (`id`, `internship_id`, `student_id`, `faculty_id`, `status`, `cover_letter`, `resume_url`, `noc_document_url`, `offer_letter_url`, `faculty_remarks`, `company_remarks`, `submitted_at`) VALUES
(1, 1, 1, 1, 'COMPLETED', 'I am excited to submit my application for the Full-Stack Engineering Internship. I have extensive experience building React + Node applications.', 'https://example.com/resumes/alex_johnson.pdf', 'https://university.edu/docs/noc_alex.pdf', 'https://techcorp.com/offers/alex_offer.pdf', 'Student has excellent academic standing. Approved for 12-week industrial credit.', 'Alex demonstrated outstanding engineering skills during the 12-week internship.', '2026-06-01 10:00:00'),
(2, 2, 3, 1, 'COMPANY_SELECTED', 'I am eager to contribute to AI research at InnovateLabs. My research project in LLM fine-tuning aligns directly with your goals.', 'https://example.com/resumes/rahul_verma.pdf', 'https://university.edu/docs/noc_rahul.pdf', 'https://innovatelabs.io/offers/rahul_offer.pdf', 'Strong candidate for AI domain. Faculty approval granted.', 'Selected after technical interview round.', '2026-07-10 14:30:00'),
(3, 5, 2, 2, 'FACULTY_APPROVED', 'My background in Embedded C and ARM microcontrollers makes me a strong fit for your IoT Systems developer internship.', 'https://example.com/resumes/sarah_jenkins.pdf', 'https://university.edu/docs/noc_sarah.pdf', NULL, 'Approved for IoT industry track.', NULL, '2026-08-01 09:15:00'),
(4, 3, 1, 1, 'FACULTY_PENDING', 'Applying for FinTech backend internship to expand my knowledge in high-throughput trading systems.', 'https://example.com/resumes/alex_johnson.pdf', NULL, NULL, NULL, NULL, '2026-08-25 11:00:00');

-- 7. INSERT LOGBOOKS (FOR ALEX JOHNSON - COMPLETED APPLICATION 1)
INSERT INTO `logbooks` (`id`, `application_id`, `week_number`, `log_date`, `hours_worked`, `tasks_summary`, `learnings`, `status`, `faculty_feedback`, `mentor_feedback`) VALUES
(1, 1, 1, '2026-06-07', 40, 'Completed onboarding, environment setup, and code repository walkthrough. Fixed minor UI bugs in React component library.', 'Understood git workflow, docker container setup, and internal code conventions.', 'FACULTY_APPROVED', 'Great start! Maintain detailed logs.', 'Alex integrated smoothly into the sprint cycle.'),
(2, 1, 2, '2026-06-14', 40, 'Designed RESTful endpoints for user notification module using Express and MySQL.', 'Learned database query optimization and JWT token refresh mechanisms.', 'FACULTY_APPROVED', 'Good technical depth explained in summary.', 'Excellent REST API design work.'),
(3, 1, 3, '2026-06-21', 40, 'Integrated frontend components with backend API. Created reusable table grids and modal dialogs.', 'Mastered state management and async API error handling.', 'FACULTY_APPROVED', 'Approved for credit log.', 'Prompt delivery of UI components.'),
(4, 1, 4, '2026-06-28', 40, 'Implemented automated unit tests and continuous integration checks on GitHub Actions.', 'Learned CI/CD configuration and Jest integration test writing.', 'FACULTY_APPROVED', 'Keep up the consistent weekly logging.', 'Very proactive team member.');

-- 8. INSERT EVALUATIONS
INSERT INTO `evaluations` (`id`, `application_id`, `evaluator_role`, `technical_score`, `domain_score`, `communication_score`, `punctuality_score`, `overall_grade`, `comments`) VALUES
(1, 1, 'FACULTY', 10, 9, 9, 10, 'A+', 'Outstanding performance throughout the internship tenure. Documentation and logbooks were meticulously maintained.'),
(2, 1, 'MENTOR', 10, 10, 9, 10, 'A+', 'Alex exceeded our team expectations and contributed core feature code now running in production.');

-- 9. INSERT CERTIFICATES
INSERT INTO `certificates` (`id`, `application_id`, `certificate_code`, `issued_date`, `pdf_url`, `verified_by`) VALUES
(1, 1, 'CERT-2026-IMS-89421', '2026-08-30', 'https://university.edu/certificates/CERT-2026-IMS-89421.pdf', 1);

-- 10. INSERT SYSTEM AUDIT LOGS
INSERT INTO `system_logs` (`id`, `user_id`, `action`, `details`, `ip_address`) VALUES
(1, 1, 'SYSTEM_INIT', 'Database seeded with default enterprise users, profiles, and active internships.', '127.0.0.1'),
(2, 4, 'INTERNSHIP_CREATED', 'TechCorp Solutions posted Full-Stack Software Engineering Intern position.', '192.168.1.10'),
(3, 7, 'APPLICATION_SUBMITTED', 'Alex Johnson submitted application for Full-Stack Software Engineering Intern.', '192.168.1.25'),
(4, 2, 'FACULTY_APPROVAL', 'Prof. Rajesh Sharma approved application #1 for Alex Johnson.', '192.168.1.50'),
(5, 1, 'CERTIFICATE_GENERATED', 'Certificate CERT-2026-IMS-89421 issued to Alex Johnson.', '127.0.0.1');
