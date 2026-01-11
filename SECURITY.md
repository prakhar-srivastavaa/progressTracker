# SETUP INSTRUCTIONS - READ CAREFULLY

## ⚠️ IMPORTANT: Protecting Sensitive Information

This project uses sensitive Firebase credentials that **MUST NOT** be committed to Git.

### Backend Setup (Already Protected)

The backend `.env` file is already in `.gitignore`. You need to:

1. Open `backend/.env`
2. Replace these values with your actual Firebase credentials:
   - `FIREBASE_PROJECT_ID`
   - `FIREBASE_CLIENT_EMAIL`
   - `FIREBASE_PRIVATE_KEY`

### Frontend Setup (REQUIRED)

The frontend Firebase config is now separated for security:

1. **Copy the template file:**
   ```bash
   cd frontend
   copy config.example.js config.js
   ```
   (On Mac/Linux use: `cp config.example.js config.js`)

2. **Edit `config.js`** and replace all placeholder values with your actual Firebase credentials:
   - `apiKey`
   - `authDomain`
   - `projectId`
   - `storageBucket`
   - `messagingSenderId`
   - `appId`

3. **NEVER commit `config.js`** - it's already in `.gitignore`

### Getting Firebase Credentials

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click the gear icon → Project Settings
4. Scroll to "Your apps" section
5. If you haven't added a web app:
   - Click the `</>` icon to add a web app
   - Register your app
6. Copy the `firebaseConfig` object values

### For Backend (Service Account):

1. Go to Project Settings → Service Accounts
2. Click "Generate new private key"
3. Save the JSON file securely (DO NOT commit it)
4. Extract values for `.env` file

## 🔒 Security Checklist

Before committing code, verify:

- [ ] `frontend/config.js` is in `.gitignore`
- [ ] `backend/.env` is in `.gitignore`
- [ ] `backend/serviceAccountKey.json` is in `.gitignore`
- [ ] You have copied `config.example.js` to `config.js` and filled it with your credentials
- [ ] You have NOT modified `config.example.js` with real credentials

## 🚀 Starting the Application

1. **Start Backend:**
   ```bash
   cd backend
   npm install
   npm start
   ```

2. **Start Frontend:**
   - Open `frontend/login.html` in your browser
   - Or use a local server:
     ```bash
     cd frontend
     npx http-server -p 8080
     ```

## 📝 What Gets Committed vs What Doesn't

### ✅ Safe to Commit:
- `config.example.js` (template with placeholders)
- `.env.example` (if created)
- All code files
- README.md
- .gitignore files

### ❌ NEVER Commit:
- `frontend/config.js` (actual credentials)
- `backend/.env` (actual credentials)
- `backend/serviceAccountKey.json`
- `node_modules/`

## 🔄 Sharing with Team

When sharing this project:

1. Commit and push your code
2. Share Firebase credentials **separately** (via secure channel)
3. Team members should:
   - Clone the repo
   - Copy `config.example.js` to `config.js`
   - Add their credentials to `config.js`
   - Copy `.env.example` to `.env` (backend)
   - Add their credentials to `.env`

## ⚙️ Environment Variables Explained

### Backend `.env`:
```
PORT=5000                          # Server port
FIREBASE_PROJECT_ID=your-id        # From Firebase Console
FIREBASE_CLIENT_EMAIL=your-email   # From service account JSON
FIREBASE_PRIVATE_KEY=your-key      # From service account JSON (keep quotes)
```

### Frontend `config.js`:
```javascript
export const firebaseConfig = {
    apiKey: "...",              // Public API key
    authDomain: "...",          // Your Firebase auth domain
    projectId: "...",           // Same as backend project ID
    storageBucket: "...",       // Your storage bucket
    messagingSenderId: "...",   // Messaging sender ID
    appId: "..."                // Your app ID
};
```

## 🛡️ Additional Security Tips

1. **Enable Firestore Security Rules** in production
2. **Use environment-specific configs** (dev/staging/prod)
3. **Rotate credentials** if accidentally exposed
4. **Use GitHub Secrets** for CI/CD pipelines
5. **Review commits** before pushing to ensure no secrets leaked

## ❓ Troubleshooting

**Problem:** "config.js not found" error
**Solution:** You need to create `config.js` from `config.example.js`

**Problem:** Firebase authentication fails
**Solution:** Verify your credentials in `config.js` match Firebase Console

**Problem:** Backend can't connect to Firebase
**Solution:** Check `.env` file has correct credentials (especially `FIREBASE_PRIVATE_KEY`)

---

Need help? Check the main [README.md](README.md) for full documentation.
