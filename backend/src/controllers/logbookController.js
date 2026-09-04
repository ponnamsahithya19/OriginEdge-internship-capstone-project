const { query } = require('../config/db');

const submitLogbook = async (req, res, next) => {
  try {
    const { application_id, week_number, hours_worked, tasks_summary, learnings, log_date } = req.body;

    if (!application_id || !week_number || !tasks_summary) {
      return res.status(400).json({ success: false, message: 'Missing required logbook details.' });
    }

    const today = log_date || new Date().toISOString().split('T')[0];

    const result = await query(
      `INSERT INTO logbooks (application_id, week_number, log_date, hours_worked, tasks_summary, learnings, status)
       VALUES (?, ?, ?, ?, ?, ?, 'SUBMITTED')`,
      [application_id, week_number, today, hours_worked || 40, tasks_summary, learnings || '']
    );

    res.status(201).json({
      success: true,
      message: `Week #${week_number} logbook entry submitted successfully.`,
      logbookId: result.insertId
    });
  } catch (err) {
    next(err);
  }
};

const getLogbooksByApplication = async (req, res, next) => {
  try {
    const { applicationId } = req.params;
    const logbooks = await query(
      `SELECT * FROM logbooks WHERE application_id = ? ORDER BY week_number ASC`,
      [applicationId]
    );

    res.json({ success: true, count: logbooks.length, logbooks });
  } catch (err) {
    next(err);
  }
};

const updateLogbookFeedback = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, faculty_feedback, mentor_feedback } = req.body;

    await query(
      `UPDATE logbooks SET
       status = COALESCE(?, status),
       faculty_feedback = COALESCE(?, faculty_feedback),
       mentor_feedback = COALESCE(?, mentor_feedback),
       updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [status, faculty_feedback, mentor_feedback, id]
    );

    res.json({ success: true, message: 'Logbook feedback recorded successfully.' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  submitLogbook,
  getLogbooksByApplication,
  updateLogbookFeedback
};
