import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import SECRET from '../constant/index.js';
import AkunDB from '../models/akunModels.js';

export const login = async (req, res) => {
  const { username, email, password } = req.body;
  // Validasi format email menggunakan regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Format email tidak sesuai',
    });
  }

  try {
    // Cari pengguna berdasarkan username
    const user = await AkunDB.findOne({
      where: {
        username,
      },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Username tidak ditemukan',
      });
    }

    // Cari email dengan pengguna yang sesuai
    const emailUser = await AkunDB.findOne({
      where: {
        email,
      },
    });

    if (!emailUser) {
      return res.status(401).json({
        success: false,
        message: 'Email yang diinputkan salah',
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Password Salah',
      });
    }

    const payload = {
      id_akun: user.id_akun,
      email: user.email,
      username: user.username,
      password: user.password,
      role: user.role,
    };

    const token = jwt.sign(payload, SECRET);

    let redirectRoute = '/';
    if (user.role === 1) {
      redirectRoute = '/dashboard';  // Redirect admin to the admin dashboard
    } else if (user.role === 0) {
      redirectRoute = '/user-dashboard';  // Redirect non-admin to a user dashboard
    }

    const data = {
      success: true,
      message: 'Logged in successfully',
      user: {
        id_akun: user.id_akun,
        email: user.email,
        username: user.username,
        password: user.password,
        role: user.role,
      },
      token: token,
      redirectRoute: redirectRoute,
    };

    return res
      .status(200)
      .cookie('token', token, { httpOnly: true })
      .json(data);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
};


export const protectedRoute = async (req, res) => {
  try {
    // Mengambil informasi pengguna berdasarkan token atau sesuai kebutuhan Anda
    const userInfo = await AkunDB.findByPk(req.user.id_akun, {
      attributes: ['id_akun', 'email', 'username', 'role'], // Mengambil atribut yang diperlukan
    });

    if (!userInfo) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    return res.status(200).json({
      success: true,
      user: userInfo,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
};

export const logout = async (req, res) => {
  try {
    return res
      .status(200)
      .clearCookie('token', { httpOnly: true })
      .json({
        success: true,
        message: 'Logged out successfully',
      });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
};