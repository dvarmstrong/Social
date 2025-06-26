#This app is still in progress it is NOT COMPLETE!!!!!
# SocialHub - Social Media Aggregator

A modern React TypeScript application that allows users to post content to multiple social media platforms simultaneously.

## Features

- 🚀 **Cross-Platform Posting**: Post to Twitter/X, Facebook, Instagram, and LinkedIn at once
- 📝 **Rich Text Editor**: Compose posts with character count and media support
- 🖼️ **Image Support**: Upload and manage images for your posts
- 📅 **Post Scheduling**: Schedule posts for future publication
- 📊 **Dashboard**: Overview of your posting activity and analytics
- 🔗 **Platform Connections**: Securely connect and manage social media accounts
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🎨 **Modern UI**: Clean, intuitive interface built with Tailwind CSS

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **UI Components**: Headless UI
- **HTTP Client**: Axios

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd social
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # React components
│   ├── ComposePost.tsx  # Post composition interface
│   ├── Dashboard.tsx    # Main dashboard
│   ├── Header.tsx       # Navigation header
│   ├── PlatformConnections.tsx  # Platform management
│   └── PostHistory.tsx  # Post history and management
├── constants/           # App constants
│   └── platforms.ts     # Social platform definitions
├── types/              # TypeScript type definitions
│   └── index.ts        # Main type definitions
├── App.tsx             # Main app component
├── main.tsx            # App entry point
└── index.css           # Global styles
```

## Features Overview

### Dashboard
- View recent posts and activity
- Quick access to create new posts
- Analytics and statistics overview

### Compose Post
- Rich text editor with character count
- Multi-platform selection
- Image upload support
- Post scheduling options

### Platform Connections
- Connect/disconnect social media accounts
- Manage platform-specific settings
- View connection status

### Post History
- View all past posts
- Filter by status (published, scheduled, draft, failed)
- Search through post content
- Sort by date

## Social Media Platforms

Currently supports:
- Twitter/X
- Facebook
- Instagram
- LinkedIn

## Development

### Adding New Platforms

1. Add platform definition to `src/constants/platforms.ts`
2. Import corresponding icon from Lucide React
3. Update type definitions if needed

### Customizing Styles

The app uses Tailwind CSS for styling. The main configuration is in `tailwind.config.js`. Brand colors can be customized in the theme configuration.

## Security Considerations

- API keys and secrets should be stored securely on the backend
- Frontend should never expose sensitive credentials
- All API communications should be over HTTPS
- Implement proper authentication and authorization

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Future Enhancements

- [ ] Real social media API integrations
- [ ] Advanced analytics and insights
- [ ] Content calendar view
- [ ] Team collaboration features
- [ ] Auto-posting with RSS feeds
- [ ] AI-powered content suggestions
- [ ] Dark mode support
- [ ] Mobile app version
# Social
