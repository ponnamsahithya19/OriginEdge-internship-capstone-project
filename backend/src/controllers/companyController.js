const { query } = require('../config/db');

const getAllCompanies = async (req, res, next) => {
  try {
    const companies = await query(
      `SELECT c.*, u.email, u.full_name as contact_person, u.status as user_status
       FROM company_profiles c
       JOIN users u ON c.user_id = u.id
       ORDER BY c.created_at DESC`
    );

    res.json({ success: true, count: companies.length, companies });
  } catch (err) {
    next(err);
  }
};

const verifyCompany = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { is_verified } = req.body;

    await query(
      `UPDATE company_profiles SET is_verified = ? WHERE id = ?`,
      [is_verified ? 1 : 0, id]
    );

    res.json({ success: true, message: `Company verification status updated to ${is_verified ? 'Verified' : 'Unverified'}.` });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllCompanies,
  verifyCompany
};
