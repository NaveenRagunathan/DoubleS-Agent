const mongoose = require('mongoose');
const Content = require('./models/Content');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Sample content data
const sampleContent = [
  {
    title: 'Getting Started with Content Marketing',
    content: 'Content marketing is a strategic marketing approach focused on creating and distributing valuable, relevant, and consistent content to attract and retain a clearly defined audience...',
    metadata: {
      tone: 'professional',
      length: 'medium',
      keywords: ['content marketing', 'strategy', 'beginners'],
      targetAudience: 'Small business owners, marketers'
    }
  },
  {
    title: '10 Tips for Better Email Newsletters',
    content: 'Email newsletters remain one of the most effective marketing channels. Here are 10 tips to make yours stand out...',
    metadata: {
      tone: 'friendly',
      length: 'short',
      keywords: ['email marketing', 'newsletters', 'tips'],
      targetAudience: 'Marketers, content creators'
    }
  },
  {
    title: 'The Ultimate Guide to SEO in 2023',
    content: 'Search engine optimization continues to evolve. Stay ahead with these latest SEO strategies and best practices...',
    metadata: {
      tone: 'authoritative',
      length: 'long',
      keywords: ['SEO', 'search engine optimization', '2023'],
      targetAudience: 'SEO specialists, digital marketers'
    }
  }
];

// Create a test user
const createTestUser = async () => {
  try {
    // Check if test user already exists
    const existingUser = await User.findOne({ email: 'test@example.com' });
    
    if (existingUser) {
      console.log('Test user already exists');
      return existingUser._id;
    }

    // Create new test user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);
    
    const user = new User({
      name: 'Test User',
      email: 'test@example.com',
      password: hashedPassword
    });
    
    const savedUser = await user.save();
    console.log('Test user created');
    return savedUser._id;
  } catch (error) {
    console.error('Error creating test user:', error);
    process.exit(1);
  }
};

// Seed the database
const seedDatabase = async () => {
  try {
    // Clear existing content
    await Content.deleteMany({});
    console.log('Cleared existing content');
    
    // Create test user and get user ID
    const userId = await createTestUser();
    
    // Add user ID to sample content
    const contentWithUser = sampleContent.map(item => ({
      ...item,
      user: userId
    }));
    
    // Insert sample content
    await Content.insertMany(contentWithUser);
    console.log('Database seeded successfully');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();
