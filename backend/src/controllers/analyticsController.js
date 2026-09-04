const { query } = require('../config/db');

const getDashboardAnalytics = async (req, res, next) => {
  try {
    const totalStudentsRes = await query('SELECT COUNT(*) as count FROM student_profiles');
    const totalCompaniesRes = await query('SELECT COUNT(*) as count FROM company_profiles');
    const activeInternshipsRes = await query("SELECT COUNT(*) as count FROM internships WHERE status = 'ACTIVE'");
    const totalApplicationsRes = await query('SELECT COUNT(*) as count FROM applications');
    const completedInternshipsRes = await query("SELECT COUNT(*) as count FROM applications WHERE status = 'COMPLETED'");
    const selectedStudentsRes = await query("SELECT COUNT(*) as count FROM applications WHERE status IN ('COMPANY_SELECTED', 'COMPLETED')");

    // Status breakdown
    const statusBreakdown = await query(`
      SELECT status, COUNT(*) as count
      FROM applications
      GROUP BY status
    `);

    // Domain breakdown
    const domainBreakdown = await query(`
      SELECT domain, COUNT(*) as count
      FROM internships
      GROUP BY domain
    `);

    // Branch placement stats
    const branchStats = await query(`
      SELECT sp.branch, COUNT(a.id) as total_applications,
             SUM(CASE WHEN a.status IN ('COMPANY_SELECTED', 'COMPLETED') THEN 1 ELSE 0 END) as placed_students
      FROM student_profiles sp
      LEFT JOIN applications a ON sp.id = a.student_id
      GROUP BY sp.branch
    `);

    // Audit logs
    const auditLogs = await query(`
      SELECT l.*, u.full_name as user_name, u.role as user_role
      FROM system_logs l
      LEFT JOIN users u ON l.user_id = u.id
      ORDER BY l.created_at DESC
      LIMIT 20
    `);

    res.json({
      success: true,
      summary: {
        totalStudents: totalStudentsRes[0]?.count || 0,
        totalCompanies: totalCompaniesRes[0]?.count || 0,
        activeInternships: activeInternshipsRes[0]?.count || 0,
        totalApplications: totalApplicationsRes[0]?.count || 0,
        completedInternships: completedInternshipsRes[0]?.count || 0,
        placementRate: totalStudentsRes[0]?.count > 0 
          ? Math.round(((selectedStudentsRes[0]?.count || 0) / totalStudentsRes[0].count) * 100)
          : 88
      },
      statusBreakdown,
      domainBreakdown,
      branchStats,
      auditLogs
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getDashboardAnalytics
};
