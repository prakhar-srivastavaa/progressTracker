# 📊 Progress Tracker

A modern full-stack task management application with Firebase authentication, real-time updates, and responsive design.

## 🚀 Quick Start

### For Local Development (Windows)
**Simply double-click `start.bat`** to launch both frontend and backend!

The script will:
- ✅ Check Node.js installation
- ✅ Install backend dependencies
- ✅ Start backend server (http://localhost:5000)
- ✅ Open frontend in your browser

### For Production
- **Frontend:** https://progress-tracker-frontend-olive.vercel.app
- **Backend API:** https://progress-tracker-backend-eight.vercel.app

## ✨ Features

- 🔐 **Secure Authentication** - Firebase email/password authentication with JWT tokens
- 📈 **Real-time Dashboard** - View statistics, progress tracking, and analytics
- 📝 **Task Management** - Create, edit, delete, and organize tasks with drag-and-drop
- 🏷️ **Categories & Tags** - Organize tasks with custom color-coded categories
- ✅ **Sub-tasks** - Break down tasks into checkable sub-items with progress tracking
- 📅 **Date Range Tracking** - Set start and end dates with deadline reminders
- 🎯 **Progress Tracking** - Visual progress bars and completion statistics
- 🌙 **Dark Mode** - Toggle between light and dark themes
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- 🔔 **Notifications** - Real-time toast notifications for actions
- 🎨 **Modern UI** - Beautiful sidebar navigation with smooth animations

## 🛠️ Tech Stack

**Frontend:**
- HTML5, CSS3, JavaScript (ES6+)
- Firebase Authentication SDK
- Responsive CSS Grid/Flexbox

**Backend:**
- Node.js + Express.js
- Firebase Admin SDK
- JWT Authentication
- CORS enabled

**Database:**
- Firebase Firestore (NoSQL)

**Deployment:**
- Vercel (Frontend & Backend)

## 📁 Project Structure

```
progressTracker/
├── frontend/             # Frontend application
│   ├── index.html       # Landing page
│   ├── login.html       # Login page
│   ├── register.html    # Registration page
│   ├── dashboard.html   # Main dashboard
│   ├── config.js        # Firebase config
│   └── config.example.js # Config template
├── backend/             # Node.js + Express API
│   ├── server.js        # Main server file
│   ├── config/          # Firebase admin configuration
│   ├── middleware/      # Authentication middleware
│   ├── routes/          # API endpoints
│   │   ├── auth.js      # Authentication routes
│   │   └── todos.js     # Todo CRUD routes
│   ├── .env.example     # Environment variables template
│   └── package.json     # Dependencies
├── start.bat            # Windows startup script
└── README.md            # This file
```

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Firebase project account
- Git

### Local Development

1. **Clone the repository:**
```bash
git clone https://github.com/prakhar-srivastavaa/progressTracker.git
cd progressTracker
```

2. **Set up backend:**
```bash
cd backend
npm install
```

3. **Configure environment variables:**
   - Copy `backend/.env.example` to `backend/.env`
   - Add your Firebase Admin credentials:
   ```env
   PORT=5000
   FIREBASE_PROJECT_ID=your_project_id
   FIREBASE_CLIENT_EMAIL=your_client_email@iam.gserviceaccount.com
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
   ```

4. **Start the application:**
   - **Easy Way (Windows):** Double-click `start.bat`
   - **Manual:**
     ```bash
     # Terminal 1 - Backend
     cd backend
     npm start
     
     # Terminal 2 - Open frontend/index.html in browser
     ```

5. **Access the application:**
   - Frontend: Open `frontend/index.html` in your browser
   - Backend API: http://localhost:5000
   - Health Check: http://localhost:5000/api/health

## 🌐 Live Deployment

- **Frontend:** https://progress-tracker-frontend-olive.vercel.app
- **Backend API:** https://progress-tracker-backend-eight.vercel.app
- **Health Check:** https://progress-tracker-backend-eight.vercel.app/api/health

## 📝 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login

### Todos (Protected Routes - Requires JWT Token)
- `GET /api/todos` - Get all user todos
- `POST /api/todos` - Create new todo
- `PATCH /api/todos/:id` - Update todo
- `DELETE /api/todos/:id` - Delete todo
- `PATCH /api/todos/:id/status` - Toggle todo completion status
- `PATCH /api/todos/:id/complete` - Mark todo as complete
- `PATCH /api/todos/:id/extend` - Extend todo deadline

### Health Check
- `GET /api/health` - Server health status

## 🔒 Security

- ✅ Firebase Authentication for user management
- ✅ JWT token-based API authentication
- ✅ CORS configured for allowed origins
- ✅ Environment variables for sensitive data
- ✅ `.gitignore` configured to exclude secrets
- ✅ Firebase security rules applied

## 🚀 Deployment Guide

### Deploy Backend to Vercel

1. Push code to GitHub
2. Go to Vercel Dashboard
3. Click "Import Project"
4. Select your GitHub repository
5. Configure:
   - **Root Directory:** `./backend`
   - **Framework:** Other
6. Add Environment Variables:
   - `FIREBASE_PROJECT_ID`
   - `FIREBASE_CLIENT_EMAIL`
   - `FIREBASE_PRIVATE_KEY`
   - `PORT`
7. Deploy

### Deploy Frontend to Vercel

1. Go to Vercel Dashboard
2. Click "Import Project"
3. Select same GitHub repository
4. Configure:
   - **Root Directory:** `./frontend`
   - **Framework:** Other
5. Deploy

## 🐛 Troubleshooting

**Backend won't start:**
- ✅ Check if `.env` file exists with correct credentials
- ✅ Verify Node.js is installed: `node --version`
- ✅ Run `npm install` in backend folder

**Frontend can't connect to backend:**
- ✅ Check `API_BASE_URL` in `frontend/config.js`
- ✅ Verify backend is running: http://localhost:5000/api/health
- ✅ Check browser console for CORS errors

**Authentication issues:**
- ✅ Verify Firebase config in `frontend/config.js`
- ✅ Check Firebase project is enabled
- ✅ Ensure Email/Password authentication is enabled in Firebase Console

**404 on deployed site:**
- ✅ Verify `config.js` is committed to GitHub
- ✅ Check Vercel deployment logs for errors
- ✅ Ensure correct root directory is set in Vercel

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Prakhar Srivastava**
- GitHub: [@prakhar-srivastavaa](https://github.com/prakhar-srivastavaa)
- Repository: [progressTracker](https://github.com/prakhar-srivastavaa/progressTracker)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page](https://github.com/prakhar-srivastavaa/progressTracker/issues).

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

Made with ❤️ by Prakhar Srivastava
