# Content Generator Module

The Content Generator is a powerful AI-powered tool that helps you create high-quality content for your Substack newsletter. It provides a seamless workflow for generating, editing, and managing your content.

## Features

- **AI-Powered Content Generation**: Generate high-quality content using advanced AI models
- **Customizable Output**: Control tone, length, and style of the generated content
- **Content History**: Access and manage your previously generated content
- **Real-time Preview**: See your content as it's being generated
- **Responsive Design**: Works on desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- MongoDB (v4.4 or later)
- PostgreSQL (v12 or later)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/double-s-agent.git
   cd double-s-agent
   ```

2. Install dependencies for both frontend and backend:
   ```bash
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env` in both `backend` and `frontend` directories
   - Update the environment variables with your configuration

4. Start the development servers:
   ```bash
   # Start backend server
   cd backend
   npm run dev
   
   # In a new terminal, start frontend development server
   cd frontend
   npm start
   ```

## Usage

### Generating Content

1. Navigate to the Content Generator page
2. Enter a title and description for your content
3. Customize the tone and length as needed
4. Click "Generate Content"
5. Review and edit the generated content as needed
6. Save or copy the content to your clipboard

### Managing Content

- **Save Content**: Click the save icon to store your content for later
- **View History**: Access your previously generated content from the history panel
- **Edit Content**: Make changes to your content and save the updates
- **Delete Content**: Remove content you no longer need

## API Endpoints

### Content Generation

- `POST /api/content/generate` - Generate new content
  - Body: `{ title: string, description: string, tone?: string, length?: string, keywords?: string, targetAudience?: string }`
  - Returns: Generated content with metadata

### Content Management

- `GET /api/content` - Get all content for the authenticated user
- `GET /api/content/:id` - Get a specific content item
- `POST /api/content` - Save new content
- `PUT /api/content/:id` - Update existing content
- `DELETE /api/content/:id` - Delete content

## Styling

The Content Generator uses Tailwind CSS for styling. Customize the look and feel by modifying the Tailwind configuration in `tailwind.config.js`.

## Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please open an issue in the GitHub repository or contact the development team at support@example.com.
