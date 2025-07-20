@echo off
echo 🍳 Building Recipe Suggestion Tool...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm first.
    pause
    exit /b 1
)

REM Install dependencies
echo 📦 Installing dependencies...
npm install

REM Run linting
echo 🔍 Running linting...
npm run lint

REM Build the project
echo 🏗️ Building project...
npm run build

REM Check if build was successful
if %errorlevel% equ 0 (
    echo ✅ Build completed successfully!
    echo 📁 Build files are in the 'dist' directory
    echo.
    echo 🚀 To deploy:
    echo    - Netlify: Drag 'dist' folder to netlify.com
    echo    - Vercel: Run 'npx vercel'
    echo    - GitHub Pages: Run 'npm run deploy'
    echo.
    echo 🌐 To preview locally: npm run preview
) else (
    echo ❌ Build failed. Please check the error messages above.
    pause
    exit /b 1
)

pause 