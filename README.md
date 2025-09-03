# Task Tracker - Mobile Development Project

A comprehensive task management application built with React, TypeScript, and Capacitor that demonstrates modern mobile app development practices.

## 🎯 Project Overview

This application fulfills the requirements for a mobile development project by providing:

- ✅ **Real Device Deployment**: Built with Capacitor for native Android/iOS deployment
- ✅ **User Input & Environmental Data**: Forms, buttons, and device sensor integration  
- ✅ **Version Control**: Git-based development with collaboration features
- ✅ **Web Service Integration**: Local storage with export/import capabilities (ready for backend integration)
- ✅ **Mobile-First Design**: Responsive UI optimized for mobile devices

## 🚀 Features

### Core Functionality
- **Task Management**: Create, complete, and delete tasks
- **Environment Data Collection**: Automatically captures device information, platform details, timestamps
- **Data Persistence**: Local storage with JSON export/import
- **Real-time Statistics**: Task completion tracking and success rates

### Mobile Capabilities
- **Device Information**: Platform, model, OS version detection
- **Native App Deployment**: Capacitor integration for iOS/Android
- **Responsive Design**: Touch-friendly interface
- **Offline Functionality**: Works without internet connection

### Development Features
- **Git Integration**: Built-in version control through Lovable
- **Team Collaboration**: Export/import for easy code sharing
- **Modern Stack**: React 18, TypeScript, Tailwind CSS
- **Component Architecture**: Modular, reusable components

## 🛠 Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Mobile**: Capacitor for native app deployment
- **UI Components**: Shadcn/ui component library
- **State Management**: React hooks with localStorage persistence
- **Build Tool**: Vite for fast development and builds

## 📱 Mobile Deployment

### Prerequisites
- Node.js and npm installed
- Android Studio (for Android)
- Xcode (for iOS, Mac only)

### Development Setup
1. Clone the repository from GitHub
2. Install dependencies: `npm install`
3. Run development server: `npm run dev`

### Mobile Deployment Steps
1. **Build the project**: `npm run build`
2. **Add mobile platforms**:
   - Android: `npx cap add android`
   - iOS: `npx cap add ios`
3. **Sync with native platforms**: `npx cap sync`
4. **Run on devices**:
   - Android: `npx cap run android`
   - iOS: `npx cap run ios`

## 🔄 Version Control & Collaboration

### Git Workflow
- All code is managed through Lovable's Git integration
- Automatic commits for all changes
- Easy GitHub export for team collaboration

### Team Collaboration
1. Export project to GitHub using Lovable's "Export to GitHub" feature
2. Team members clone the repository
3. Make changes locally or through Lovable
4. Push changes back to the shared repository
5. Others can pull updates and sync with `npx cap sync`

### Data Sharing
- Export task data as JSON files
- Import data from team members
- Perfect for testing collaboration workflows

## 🌐 Web Service Integration

Currently implements local storage with export/import capabilities. Ready for backend integration:

### Potential Integrations
- **Firebase**: Real-time database and authentication
- **Supabase**: PostgreSQL backend with real-time subscriptions  
- **REST APIs**: Custom backend services
- **IFTTT**: Automation and external service integration

### Current Data Structure
```json
{
  "id": "unique-timestamp",
  "title": "Task title",
  "description": "Optional description", 
  "completed": false,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "environmentData": {
    "device": {
      "platform": "android",
      "model": "device-model",
      "osVersion": "14.0"
    },
    "timestamp": "2024-01-01T00:00:00.000Z",
    "location": "Available/Not available"
  }
}
```

## 📋 Project Requirements Checklist

- [x] **Sample Application**: Task management app with modern UI
- [x] **User Input**: Forms for task creation, buttons for interactions
- [x] **Environmental Stimulation**: Device sensor data collection
- [x] **Device Deployment**: Capacitor enables real device testing
- [x] **Version Control**: Git-based development workflow
- [x] **Documentation**: Comprehensive README and inline docs
- [x] **Team Collaboration**: Export/import and GitHub integration
- [x] **Partner Testing**: Easy setup for team member testing
- [x] **Web Service**: Data persistence and sharing capabilities

## 🎨 Design System

The app features a carefully crafted design system with:
- **Dark Theme**: Modern, mobile-friendly dark interface
- **Green Accent**: Primary color scheme with glow effects
- **Gradient Backgrounds**: Beautiful card layouts
- **Responsive Typography**: Optimized for mobile readability
- **Touch Interactions**: Finger-friendly button sizes and spacing

## 🚦 Getting Started

1. **Try the Web Version**: Start using the app immediately in your browser
2. **Add Some Tasks**: Create tasks to see environment data collection
3. **Export Data**: Test the JSON export functionality
4. **Deploy to Mobile**: Follow the mobile deployment steps above
5. **Share with Team**: Export to GitHub and collaborate

## 📞 Support

For questions about deployment or customization, refer to:
- [Capacitor Documentation](https://capacitorjs.com/docs)
- [Lovable Documentation](https://docs.lovable.dev)
- Project issues and discussions on GitHub

---

**Project URL**: https://lovable.dev/projects/89f82129-2ada-45e9-a331-8b93cd3f54bc

Built with ❤️ using Lovable