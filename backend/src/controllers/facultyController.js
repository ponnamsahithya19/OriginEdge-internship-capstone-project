const { query } = require('../config/db');

const getAllFaculty = async (req, res, next) => {
  try {
    const faculty = await query(
      `SELECT f.*, u.email, u.full_name, u.phone, u.status
       FROM faculty_profiles f
       JOIN users u ON f.user_id = u.id
       ORDER BY f.created_at DESC`
    );

    res.json({ success: true, count: faculty.length, faculty });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllFaculty
};
