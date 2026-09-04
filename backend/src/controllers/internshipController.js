const { query } = require('../config/db');

const getAllInternships = async (req, res, next) => {
  try {
    const { search, domain, location, work_type, status = 'ACTIVE' } = req.query;

    let sql = `
      SELECT i.*, c.company_name, c.logo_url, c.industry, c.is_verified, c.website
      FROM internships i
      JOIN company_profiles c ON i.company_id = c.id
      WHERE 1=1
    `;
    const params = [];

    if (status && status !== 'ALL') {
      sql += ` AND i.status = ?`;
      params.push(status);
    }

    if (domain) {
      sql += ` AND i.domain LIKE ?`;
      params.push(`%${domain}%`);
    }

    if (location) {
      sql += ` AND i.location LIKE ?`;
      params.push(`%${location}%`);
    }

    if (work_type) {
      sql += ` AND i.work_type = ?`;
      params.push(work_type);
    }

    if (search) {
      sql += ` AND (i.title LIKE ? OR i.description LIKE ? OR c.company_name LIKE ?)`;
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    sql += ` ORDER BY i.created_at DESC`;

    const internships = await query(sql, params);
    res.json({ success: true, count: internships.length, internships });
  } catch (err) {
    next(err);
  }
};

const getInternshipById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const internships = await query(
      `SELECT i.*, c.company_name, c.logo_url, c.industry, c.is_verified, c.website, c.description as company_description, c.hr_contact
       FROM internships i
       JOIN company_profiles c ON i.company_id = c.id
       WHERE i.id = ?`,
      [id]
    );

    if (!internships || internships.length === 0) {
      return res.status(404).json({ success: false, message: 'Internship posting not found.' });
    }

    res.json({ success: true, internship: internships[0] });
  } catch (err) {
    next(err);
  }
};

const createInternship = async (req, res, next) => {
  try {
    const { title, description, domain, location, work_type, stipend_monthly, duration_weeks, slots, requirements, min_cgpa, deadline } = req.body;

    // Retrieve company_id for the logged in user
    let companyId = req.body.company_id;
    if (!companyId) {
      const companies = await query('SELECT id FROM company_profiles WHERE user_id = ?', [req.user.id]);
      if (companies && companies.length > 0) {
        companyId = companies[0].id;
      }
    }

    if (!companyId) {
      return res.status(400).json({ success: false, message: 'Company profile not found for this user.' });
    }

    if (!title || !description || !domain || !location || !deadline) {
      return res.status(400).json({ success: false, message: 'Missing required internship fields.' });
    }

    const result = await query(
      `INSERT INTO internships 
       (company_id, title, description, domain, location, work_type, stipend_monthly, duration_weeks, slots, requirements, min_cgpa, status, deadline)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'ACTIVE', ?)`,
      [
        companyId,
        title,
        description,
        domain,
        location,
        work_type || 'HYBRID',
        stipend_monthly || 0,
        duration_weeks || 12,
        slots || 5,
        requirements || '',
        min_cgpa || 6.0,
        deadline
      ]
    );

    await query('INSERT INTO system_logs (user_id, action, details) VALUES (?, ?, ?)', [
      req.user.id,
      'INTERNSHIP_CREATED',
      `Posted internship '${title}' (ID: ${result.insertId})`
    ]);

    res.status(201).json({
      success: true,
      message: 'Internship position posted successfully.',
      internshipId: result.insertId
    });
  } catch (err) {
    next(err);
  }
};

const updateInternship = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, domain, location, work_type, stipend_monthly, duration_weeks, slots, status, deadline } = req.body;

    await query(
      `UPDATE internships SET
       title = COALESCE(?, title),
       description = COALESCE(?, description),
       domain = COALESCE(?, domain),
       location = COALESCE(?, location),
       work_type = COALESCE(?, work_type),
       stipend_monthly = COALESCE(?, stipend_monthly),
       duration_weeks = COALESCE(?, duration_weeks),
       slots = COALESCE(?, slots),
       status = COALESCE(?, status),
       deadline = COALESCE(?, deadline),
       updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [title, description, domain, location, work_type, stipend_monthly, duration_weeks, slots, status, deadline, id]
    );

    res.json({ success: true, message: 'Internship details updated successfully.' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllInternships,
  getInternshipById,
  createInternship,
  updateInternship
};
