const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Content = require('../models/Content');

// @route   POST api/content/generate
// @desc    Generate content using AI
// @access  Private
router.post(
  '/generate',
  [
    auth,
    [
      body('title', 'Title is required').not().isEmpty(),
      body('description', 'Description is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, description, tone, length, keywords, targetAudience } = req.body;
      
      // In a real implementation, you would call an AI API here
      // For now, we'll return a mock response
      const mockContent = `# ${title}\n\n${description}\n\n`;
      
      // Add more content based on the length parameter
      const contentLength = {
        short: 300,
        medium: 600,
        long: 1000,
      }[length || 'medium'];
      
      // Generate some placeholder content
      let content = mockContent;
      const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " +
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " +
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris " +
        "nisi ut aliquip ex ea commodo consequat. ";
      
      while (content.length < contentLength) {
        content += loremIpsum;
      }
      
      // Truncate to the desired length
      content = content.substring(0, contentLength).trim() + "...";
      
      // Create a new content document
      const newContent = new Content({
        user: req.user.id,
        title,
        content,
        metadata: {
          tone: tone || 'professional',
          length: length || 'medium',
          keywords: keywords || '',
          targetAudience: targetAudience || '',
        },
      });
      
      await newContent.save();
      
      res.json({ content, id: newContent._id });
      
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   GET api/content/history
// @desc    Get user's content history
// @access  Private
router.get('/history', auth, async (req, res) => {
  try {
    const contents = await Content.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .select('-content');
    
    res.json(contents);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/content/:id
// @desc    Get content by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const content = await Content.findOne({
      _id: req.params.id,
      user: req.user.id,
    });
    
    if (!content) {
      return res.status(404).json({ msg: 'Content not found' });
    }
    
    res.json(content);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Content not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   POST api/content/save
// @desc    Save content
// @access  Private
router.post(
  '/save',
  [
    auth,
    [
      body('content', 'Content is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    try {
      const { title, content, metadata } = req.body;
      
      const newContent = new Content({
        user: req.user.id,
        title: title || 'Untitled',
        content,
        metadata: metadata || {},
      });
      
      await newContent.save();
      
      res.json(newContent);
      
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   PUT api/content/:id
// @desc    Update content
// @access  Private
router.put(
  '/:id',
  [
    auth,
    [
      body('content', 'Content is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    try {
      const { title, content, metadata } = req.body;
      
      let contentDoc = await Content.findById(req.params.id);
      
      if (!contentDoc) {
        return res.status(404).json({ msg: 'Content not found' });
      }
      
      // Make sure user owns the content
      if (contentDoc.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }
      
      // Update fields
      contentDoc.title = title || contentDoc.title;
      contentDoc.content = content;
      contentDoc.metadata = metadata || contentDoc.metadata;
      contentDoc.updatedAt = Date.now();
      
      await contentDoc.save();
      
      res.json(contentDoc);
      
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   DELETE api/content/:id
// @desc    Delete content
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    
    if (!content) {
      return res.status(404).json({ msg: 'Content not found' });
    }
    
    // Check user
    if (content.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    
    await content.remove();
    
    res.json({ msg: 'Content removed' });
    
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Content not found' });
    }
    res.status(500).send('Server error');
  }
});

module.exports = router;
