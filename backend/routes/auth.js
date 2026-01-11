const express = require('express');
const router = express.Router();
const { auth } = require('../config/firebase');

// Login endpoint - verify user exists
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Note: Firebase Admin SDK doesn't verify passwords
    // Password verification happens on client side with Firebase Auth SDK
    // This endpoint can be used for additional server-side checks if needed
    
    res.json({ 
      message: 'Login should be handled on client side with Firebase Auth SDK',
      success: true 
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get user info
router.get('/user', async (req, res) => {
  try {
    const token = req.headers.authorization?.split('Bearer ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decodedToken = await auth.verifyIdToken(token);
    const user = await auth.getUser(decodedToken.uid);
    
    res.json({ 
      uid: user.uid,
      email: user.email,
      displayName: user.displayName
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
