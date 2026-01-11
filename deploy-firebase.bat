@echo off
echo ========================================
echo   Deploying to Firebase Hosting
echo ========================================
echo.

cd /d "%~dp0"

echo Step 1: Preparing production config...
copy /Y "frontend\config.prod.js" "frontend\config.js"
echo.

echo Step 2: Deploying to Firebase...
call firebase deploy --only hosting
echo.

if %ERRORLEVEL% EQU 0 (
    echo ========================================
    echo   Deployment Successful!
    echo ========================================
    echo.
    echo Your site is now live at:
    echo https://myprogresstracker.web.app
    echo.
) else (
    echo ========================================
    echo   Deployment Failed!
    echo ========================================
    echo.
    echo Please check the error messages above.
    echo.
)

pause
