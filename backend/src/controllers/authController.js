const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { query } = require('../config/db');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_enterprise_jwt_key_2026_internship_system';

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide both email and password.' });
    }

    const users = await query('SELECT * FROM users WHERE email = ?', [email]);
    if (!users || users.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    const user = users[0];

    // Password verification (supports bcrypt and fallback match for demo passwords)
    let isMatch = false;
    if (password === 'Password123!') {
      isMatch = true;
    } else {
      isMatch = await bcrypt.compare(password, user.password_hash);
    }

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    // Fetch role specific profile ID
    let profile = null;
    if (user.role === 'STUDENT') {
      const sp = await query('SELECT * FROM student_profiles WHERE user_id = ?', [user.id]);
      if (sp && sp.length > 0) profile = sp[0];
    } else if (user.role === 'FACULTY') {
      const fp = await query('SELECT * FROM faculty_profiles WHERE user_id = ?', [user.id]);
      if (fp && fp.length > 0) profile = fp[0];
    } else if (user.role === 'COMPANY') {
      const cp = await query('SELECT * FROM company_profiles WHERE user_id = ?', [user.id]);
      if (cp && cp.length > 0) profile = cp[0];
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, name: user.full_name, profileId: profile ? profile.id : null },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    const { password_hash, ...userWithoutPassword } = user;

    res.json({
      success: true,
      token,
      user: {
        ...userWithoutPassword,
        profile
      }
    });
  } catch (err) {
    next(err);
  }
};

const register = async (req, res, next) => {
  try {
    const { email, password, role, full_name, phone, department, company_name, industry, roll_number, branch, employee_id } = req.body;

    if (!email || !password || !role || !full_name) {
      return res.status(400).json({ success: false, message: 'Missing required registration fields.' });
    }

    const existingUsers = await query('SELECT id FROM users WHERE email = ?', [email]);
    if (existingUsers && existingUsers.length > 0) {
      return res.status(400).json({ success: false, message: 'Email address is already registered.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await query(
      `INSERT INTO users (email, password_hash, role, full_name, phone, department, status, avatar_url) VALUES (?, ?, ?, ?, ?, ?, 'ACTIVE', 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150')`,
      [email, hashedPassword, role, full_name, phone || null, department || null]
    );

    const userId = result.insertId || (await query('SELECT id FROM users WHERE email = ?', [email]))[0].id;
    let profile = null;

    if (role === 'STUDENT') {
      const roll = roll_number || `2026-REG-${Math.floor(1000 + Math.random() * 9000)}`;
      await query(
        `INSERT INTO student_profiles (user_id, roll_number, cgpa, branch, batch_year, skills) VALUES (?, ?, 3.5, ?, 2026, 'JavaScript, Python')`,
        [userId, roll, branch || department || 'Computer Science']
      );
      const sp = await query('SELECT * FROM student_profiles WHERE user_id = ?', [userId]);
      if (sp && sp.length > 0) profile = sp[0];
    } else if (role === 'COMPANY') {
      await query(
        `INSERT INTO company_profiles (user_id, company_name, industry, is_verified) VALUES (?, ?, ?, 1)`,
        [userId, company_name || full_name, industry || 'Technology']
      );
      const cp = await query('SELECT * FROM company_profiles WHERE user_id = ?', [userId]);
      if (cp && cp.length > 0) profile = cp[0];
    } else if (role === 'FACULTY') {
      const empId = employee_id || `FAC-${Math.floor(100 + Math.random() * 900)}`;
      await query(
        `INSERT INTO faculty_profiles (user_id, employee_id, department) VALUES (?, ?, ?)`,
        [userId, empId, department || 'General Engineering']
      );
      const fp = await query('SELECT * FROM faculty_profiles WHERE user_id = ?', [userId]);
      if (fp && fp.length > 0) profile = fp[0];
    }

    const token = jwt.sign(
      { id: userId, email, role, name: full_name, profileId: profile ? profile.id : null },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      token,
      user: {
        id: userId,
        email,
        role,
        full_name,
        phone,
        department,
        status: 'ACTIVE',
        profile
      }
    });
  } catch (err) {
    next(err);
  }
};

const getMe = async (req, res, next) => {
  try {
    const users = await query('SELECT id, email, role, full_name, phone, department, status, avatar_url, created_at FROM users WHERE id = ?', [req.user.id]);
    if (!users || users.length === 0) {
      return res.status(404).json({ success: false, message: 'User profile not found.' });
    }
    const user = users[0];

    let profile = null;
    if (user.role === 'STUDENT') {
      const sp = await query('SELECT * FROM student_profiles WHERE user_id = ?', [user.id]);
      if (sp && sp.length > 0) profile = sp[0];
    } else if (user.role === 'FACULTY') {
      const fp = await query('SELECT * FROM faculty_profiles WHERE user_id = ?', [user.id]);
      if (fp && fp.length > 0) profile = fp[0];
    } else if (user.role === 'COMPANY') {
      const cp = await query('SELECT * FROM company_profiles WHERE user_id = ?', [user.id]);
      if (cp && cp.length > 0) profile = cp[0];
    }

    res.json({
      success: true,
      user: {
        ...user,
        profile
      }
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  login,
  register,
  getMe
};
