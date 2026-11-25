const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const generateToken = (id, role) => {
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET || 'urbanspoon_super_secret_jwt_key_2026_prod',
    {
      expiresIn: process.env.JWT_EXPIRE || '7d',
    }
  );
};

// @desc    Authenticate Admin & get token
// @route   POST /api/auth/login
// @access  Public
const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password',
      });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase() });

    if (admin && (await admin.matchPassword(password))) {
      res.json({
        success: true,
        message: 'Admin authentication successful',
        data: {
          _id: admin._id,
          name: admin.name,
          email: admin.email,
          role: admin.role,
          token: generateToken(admin._id, admin.role),
        },
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password credentials',
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get Current Admin Profile
// @route   GET /api/auth/profile
// @access  Private (Admin)
const getAdminProfile = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.admin._id).select('-password');
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin account not found',
      });
    }
    res.json({
      success: true,
      data: admin,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  loginAdmin,
  getAdminProfile,
};
