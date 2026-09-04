const { query } = require('../config/db');

const submitApplication = async (req, res, next) => {
  try {
    const { internship_id, cover_letter } = req.body;

    // Get student profile ID for logged in user
    const students = await query('SELECT id, branch FROM student_profiles WHERE user_id = ?', [req.user.id]);
    if (!students || students.length === 0) {
      return res.status(400).json({ success: false, message: 'Student profile not found.' });
    }
    const studentId = students[0].id;
    const studentBranch = students[0].branch;

    // Check duplicate application
    const existing = await query(
      'SELECT id FROM applications WHERE student_id = ? AND internship_id = ?',
      [studentId, internship_id]
    );
    if (existing && existing.length > 0) {
      return res.status(400).json({ success: false, message: 'You have already submitted an application for this internship.' });
    }

    // Auto assign faculty coordinator for branch/department if available
    const faculty = await query('SELECT id FROM faculty_profiles WHERE department LIKE ? LIMIT 1', [`%${studentBranch}%`]);
    const facultyId = (faculty && faculty.length > 0) ? faculty[0].id : 1;

    const result = await query(
      `INSERT INTO applications (internship_id, student_id, faculty_id, status, cover_letter)
       VALUES (?, ?, ?, 'FACULTY_PENDING', ?)`,
      [internship_id, studentId, facultyId, cover_letter || '']
    );

    await query('INSERT INTO system_logs (user_id, action, details) VALUES (?, ?, ?)', [
      req.user.id,
      'APPLICATION_SUBMITTED',
      `Submitted application ID: ${result.insertId} for internship ID: ${internship_id}`
    ]);

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully. Pending Faculty Approval.',
      applicationId: result.insertId
    });
  } catch (err) {
    next(err);
  }
};

const getApplications = async (req, res, next) => {
  try {
    const { role, id } = req.user;
    let sql = `
      SELECT a.*, 
             i.title as internship_title, i.domain, i.location, i.stipend_monthly, i.work_type,
             c.company_name, c.logo_url,
             u_student.full_name as student_name, u_student.email as student_email,
             sp.roll_number, sp.cgpa, sp.branch, sp.skills as student_skills,
             u_faculty.full_name as faculty_name
      FROM applications a
      JOIN internships i ON a.internship_id = i.id
      JOIN company_profiles c ON i.company_id = c.id
      JOIN student_profiles sp ON a.student_id = sp.id
      JOIN users u_student ON sp.user_id = u_student.id
      LEFT JOIN faculty_profiles fp ON a.faculty_id = fp.id
      LEFT JOIN users u_faculty ON fp.user_id = u_faculty.id
      WHERE 1=1
    `;
    const params = [];

    if (role === 'STUDENT') {
      const sp = await query('SELECT id FROM student_profiles WHERE user_id = ?', [id]);
      if (sp && sp.length > 0) {
        sql += ` AND a.student_id = ?`;
        params.push(sp[0].id);
      }
    } else if (role === 'FACULTY') {
      const fp = await query('SELECT id FROM faculty_profiles WHERE user_id = ?', [id]);
      if (fp && fp.length > 0) {
        sql += ` AND (a.faculty_id = ? OR a.faculty_id IS NULL)`;
        params.push(fp[0].id);
      }
    } else if (role === 'COMPANY') {
      const cp = await query('SELECT id FROM company_profiles WHERE user_id = ?', [id]);
      if (cp && cp.length > 0) {
        sql += ` AND i.company_id = ?`;
        params.push(cp[0].id);
      }
    }

    sql += ` ORDER BY a.submitted_at DESC`;

    const applications = await query(sql, params);
    res.json({ success: true, count: applications.length, applications });
  } catch (err) {
    next(err);
  }
};

const updateApplicationStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, faculty_remarks, company_remarks } = req.body;

    if (!status) {
      return res.status(400).json({ success: false, message: 'Status is required.' });
    }

    await query(
      `UPDATE applications SET
       status = ?,
       faculty_remarks = COALESCE(?, faculty_remarks),
       company_remarks = COALESCE(?, company_remarks),
       updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [status, faculty_remarks, company_remarks, id]
    );

    // Auto generate certificate if status updated to COMPLETED
    if (status === 'COMPLETED') {
      const certCode = `CERT-${new Date().getFullYear()}-IMS-${Math.floor(10000 + Math.random() * 90000)}`;
      await query(
        `INSERT INTO certificates (application_id, certificate_code, issued_date, pdf_url, verified_by)
         VALUES (?, ?, CURRENT_DATE, ?, ?)
         ON DUPLICATE KEY UPDATE updated_at=CURRENT_TIMESTAMP`,
        [id, certCode, `https://university.edu/certificates/${certCode}.pdf`, req.user.id]
      );
    }

    await query('INSERT INTO system_logs (user_id, action, details) VALUES (?, ?, ?)', [
      req.user.id,
      'APPLICATION_STATUS_UPDATED',
      `Application ID ${id} updated to status '${status}'`
    ]);

    res.json({ success: true, message: `Application status successfully updated to ${status}.` });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  submitApplication,
  getApplications,
  updateApplicationStatus
};
