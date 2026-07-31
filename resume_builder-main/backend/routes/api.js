// backend/routes/auth.js
const express  = require('express');
const router   = express.Router();
const User     = require('../models/User');
const jwt      = require('jsonwebtoken');
const Resume = require('../models/resume');

router.post('/save', async (req, res) => {
  const data = req.body;

  console.log(data)

  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const userId = decoded.userId;
    let resume = await Resume.findOne({ user: userId });
    if (resume) {
        resume.resumeData = data.resumeData;
        resume.layout = data.layout;
    } else {
        resume = new Resume({ user: userId, resumeData: data.resumeData, layout: data.layout });
    }
    await resume.save();

  return res.status(200).json({ message: 'Resume data saved successfully' });
})

router.get('/get', async (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!decoded) {
          return res.status(401).json({ message: 'Unauthorized' });
      }
      const userId = decoded.userId;
    const resume = await Resume.findOne({ user: userId });
    if (!resume) {
        return res.status(404).json({ message: 'Resume not found' });
    }
    return res.status(200).json({ resumeData: resume.resumeData, layout: resume.layout });
  })


module.exports = router;
