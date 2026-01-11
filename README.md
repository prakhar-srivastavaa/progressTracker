# 📊 Progress Tracker

A modern task management application with real-time dashboard, authentication, and persistent storage.

## 🚀 Quick Start

**Simply double-click `START-HERE.bat`** to launch the application!

Then visit `http://localhost:8080` in your browser.

## ✨ Features

- 📈 **Real-time Dashboard** - View statistics, progress tracking, and today's date/time
- 📝 **Task Management** - Create, edit, delete, and organize tasks
- 🏷️ **Categories & Tags** - Organize tasks with custom categories
- ✅ **Sub-tasks** - Break down tasks into checkable sub-items
- 📅 **Date Range Tracking** - Set start and end dates for tasks
- 🎯 **Progress Tracking** - Visual progress bars and completion statistics
- 🔐 **Secure Authentication** - Email/password login with JWT tokens
- 🎨 **Modern UI** - Sidebar navigation with smooth animations

## 📁 Structure

```
progressTracker/
├── backend/              # Node.js + Express API
│   ├── config/          # Firebase configuration
│   ├── middleware/      # Authentication
│   ├── routes/          # API endpoints
│   └── .env            # Environment variables
├── frontend/            # Modern web interface
│   ├── dashboard.html  # Main app (with sidebar & stats)
│   ├── login.html      # Login page
│   ├── register.html   # Registration page
│   └── config.js       # Firebase config
└── START-HERE.bat      # Launch script
```

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript ES6+, Font Awesome
- **Backend**: Node.js, Express, Firebase Admin SDK
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth

## 🌐 Live Deployment

https://progresstrackerrr.web.app

## 🔐 Security

Credentials are stored in `.env` and `config.js` (both gitignored).
