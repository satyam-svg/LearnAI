const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { identifier, password } = req.body;
  if (!identifier || !password) {
    return res.status(400).json({ error: 'Email/Mobile and password are required' });
  }
  try {
    // Find user by email or mobile
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1 OR mobile = $1',
      [identifier]
    );
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const user = result.rows[0];
    // Compare passwords
    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.json({
      message: 'Login successful',
      user: { id: user.id, email: user.email },
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.signup = async (req, res) => {
  const {
    fullName,
    nickName,
    dob,
    email,
    phoneNumber,
    selectedClass,
    profileImage,
    pin,
  } = req.body;

  if (!email && !phoneNumber) {
    return res.status(400).json({ error: 'Email or phone number is required' });
  }

  try {
    // Check if the user already exists based on email or phone
    const existingUser = await pool.query(
      'SELECT * FROM users WHERE email = $1 OR mobile = $2',
      [email, phoneNumber]
    );
    if (existingUser.rows.length > 0) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // Hash the PIN before storing
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(pin, salt);

    // Handle image URL (in production, you’d handle the actual image upload)
    const profileImageUrl = profileImage || null;

    // Insert the new user into the database
    const result = await pool.query(
      `INSERT INTO users (
          full_name,
          nick_name,
          dob,
          email,
          mobile,
          class,
          profile_image_url,
          password_hash
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id, email, mobile`,
      [
        fullName,
        nickName || null,
        dob || null,
        email || null,
        phoneNumber || null,
        selectedClass || null,
        profileImageUrl,
        passwordHash,
      ]
    );

    const user = result.rows[0];

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // OPTIONAL: Trigger email/phone verification here

    res.status(201).json({
      message: 'Signup successful',
      user: {
        id: user.id,
        email: user.email,
        mobile: user.mobile,
      },
      token,
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
