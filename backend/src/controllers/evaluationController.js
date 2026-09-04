const { query } = require('../config/db');

const submitEvaluation = async (req, res, next) => {
  try {
    const { application_id, evaluator_role, technical_score, domain_score, communication_score, punctuality_score, comments } = req.body;

    if (!application_id || !technical_score || !domain_score || !communication_score || !punctuality_score) {
      return res.status(400).json({ success: false, message: 'All score rubric dimensions are required.' });
    }

    const avg = (Number(technical_score) + Number(domain_score) + Number(communication_score) + Number(punctuality_score)) / 4;
    let grade = 'A+';
    if (avg < 6) grade = 'C';
    else if (avg < 7.5) grade = 'B';
    else if (avg < 9) grade = 'A';

    const role = evaluator_role || (req.user.role === 'COMPANY' ? 'MENTOR' : 'FACULTY');

    const result = await query(
      `INSERT INTO evaluations (application_id, evaluator_role, technical_score, domain_score, communication_score, punctuality_score, overall_grade, comments)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [application_id, role, technical_score, domain_score, communication_score, punctuality_score, grade, comments || '']
    );

    res.status(201).json({
      success: true,
      message: 'Evaluation Rubric submitted successfully.',
      evaluationId: result.insertId,
      overallGrade: grade
    });
  } catch (err) {
    next(err);
  }
};

const getEvaluationByApplication = async (req, res, next) => {
  try {
    const { applicationId } = req.params;
    const evals = await query(
      `SELECT * FROM evaluations WHERE application_id = ? ORDER BY created_at DESC`,
      [applicationId]
    );

    res.json({ success: true, count: evals.length, evaluations: evals });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  submitEvaluation,
  getEvaluationByApplication
};
