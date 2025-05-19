const mongoose = require('mongoose');

const ContentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  metadata: {
    tone: {
      type: String,
      enum: ['professional', 'casual', 'friendly', 'authoritative', 'humorous'],
      default: 'professional'
    },
    length: {
      type: String,
      enum: ['short', 'medium', 'long'],
      default: 'medium'
    },
    keywords: {
      type: [String],
      default: []
    },
    targetAudience: {
      type: String,
      default: ''
    }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Add text index for search functionality
ContentSchema.index({ title: 'text', content: 'text', 'metadata.keywords': 'text' });

module.exports = mongoose.model('Content', ContentSchema);
