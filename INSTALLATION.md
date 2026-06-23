# 📦 Panduan Instalasi Lengkap TikDown

## Prasyarat

Before starting, make sure you have:

- **Node.js** v16+ ([Download](https://nodejs.org/))
- **npm** (included with Node.js) atau **yarn**
- **Git** ([Download](https://git-scm.com/))
- **Expo CLI** - install dengan: `npm install -g expo-cli`
- Android/iOS Device atau Emulator

## Step 1: Clone Repository

```bash
git clone https://github.com/senzyy2009/tiktok-downloader-mobile.git
cd tiktok-downloader-mobile
```

## Step 2: Install Frontend Dependencies

```bash
# Using npm
npm install

# Or using yarn
yarn install
```

## Step 3: Install Backend Dependencies

```bash
cd backend
npm install

# Return to root directory
cd ..
```

## Step 4: Setup Environment Variables

```bash
# Backend environment
cd backend
cp .env.example .env

# You can edit .env file if needed
# nano .env  (or use your preferred editor)

cd ..
```

## Step 5: Run Backend Server

Open Terminal 1:

```bash
cd backend
npm start

# Output should show:
# 🚀 TikDown Backend Server berjalan di http://localhost:5000
```

## Step 6: Run Frontend Application

Open Terminal 2:

```bash
# Make sure you're in root directory
npm start

# Then you'll see:
# ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
# │  Welcome to Expo!           │
# ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
# 
# Choose:
# a - Android
# i - iOS  
# w - Web
# e - Expo Go
```

### Option A: Using Android Emulator

```bash
# Press 'a' in Expo terminal
# Android emulator will open automatically if configured
```

### Option B: Using Physical Device

1. Download **Expo Go** app dari Google Play Store / Apple App Store
2. Di Expo terminal, pilih 'e' atau scan QR code dengan Expo Go
3. App akan open di device Anda

### Option C: Using iOS Simulator

```bash
# Press 'i' in Expo terminal
# Requires macOS with Xcode installed
```

## Verifikasi Instalasi

### Check Backend

```bash
curl http://localhost:5000/health

# Should return:
# {"status":"Backend TikDown OK","timestamp":"..."}
```

### Check Frontend

- Aplikasi harus menampilkan Home Screen dengan header gradient
- Semua tab di bottom navigation harus berfungsi

## Troubleshooting

### 1. Port 5000 Already in Use

```bash
# Kill process using port 5000
# On Windows:
lsof -i :5000
kill -9 <PID>

# Or change PORT in backend/.env
PORT=3000
```

### 2. "Cannot find module" Error

```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install

# Same for backend
cd backend
rm -rf node_modules
npm install
```

### 3. Expo Connection Error

```bash
# Clear Expo cache
expo start --clear

# Or reinstall Expo CLI
npm install -g expo-cli@latest
```

### 4. Backend API Not Responding

- Check if backend server is running
- Verify correct IP/localhost address
- Check firewall settings
- Make sure Node.js version is v16+

### 5. Video Download Failed

- Check internet connection
- Verify TikTok URL format
- Try different video
- Check backend console for errors

## Production Deployment

### Build APK (Android)

```bash
expo build:android -t apk
# Or for AAB (Google Play format):
expo build:android -t app-bundle
```

### Build IPA (iOS)

```bash
expo build:ios
# Requires Apple Developer account
```

### Deploy Backend to Cloud

**Options:**
- Heroku
- Railway
- Render
- AWS Lambda
- Google Cloud Run

Example with Railway:

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

## Next Steps

1. ✅ Test aplikasi dengan beberapa video TikTok
2. ✅ Customize branding jika diperlukan
3. ✅ Add more API features
4. ✅ Build dan publish ke app stores
5. ✅ Setup analytics dan monitoring

## Support

Jika mengalami masalah:

1. Check troubleshooting section above
2. Check GitHub Issues
3. Create new issue dengan detailed description
4. Include error logs dan device information

---

**Happy Coding!** 🚀
