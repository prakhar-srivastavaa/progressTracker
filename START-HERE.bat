@echo off
setlocal enabledelayedexpansion
title Progress Tracker Launcher
color 0A

echo.
echo ================================================
echo          PROGRESS TRACKER - LOCAL SETUP
echo ================================================
echo.

:: Store the current directory
set "SCRIPT_DIR=%~dp0"

:: Kill any existing node processes on port 5000
echo Checking for existing processes...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :5000 ^| findstr LISTENING') do (
    echo Stopping process on port 5000...
    taskkill /F /PID %%a >nul 2>&1
)

echo.
echo Starting Backend Server...
echo.

:: Start backend in new window
start "Progress Tracker - Backend" /D "!SCRIPT_DIR!backend" cmd /k "title Backend Server - Port 5000 && color 0C && echo. && echo ====================================== && echo   BACKEND SERVER && echo ====================================== && echo. && echo Keep this window OPEN! && echo. && npm start"

echo Waiting for backend to start...
timeout /t 5 /nobreak > nul

echo.
echo Starting Frontend Server...
echo.

:: Start frontend in new window
start "Progress Tracker - Frontend" /D "!SCRIPT_DIR!frontend" cmd /k "title Frontend Server - Port 8080 && color 0B && echo. && echo ====================================== && echo   FRONTEND SERVER && echo ====================================== && echo. && echo Keep this window OPEN! && echo. && npx -y http-server -p 8080"

echo.
echo Waiting for frontend to start...
timeout /t 5 /nobreak > nul

echo.
echo ================================================
echo   SERVERS STARTED SUCCESSFULLY!
echo ================================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:8080
echo.
echo Opening browser...
start http://localhost:8080/login.html

echo.
echo ------------------------------------------------
echo IMPORTANT: Keep the server windows open!
echo Press any key to close this launcher window.
echo ------------------------------------------------
pause > nul
