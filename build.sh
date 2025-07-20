#!/bin/bash

# Recipe Suggestion Tool - Build Script
echo "🍳 Building Recipe Suggestion Tool..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Run linting
echo "🔍 Running linting..."
npm run lint

# Build the project
echo "🏗️ Building project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully!"
    echo "📁 Build files are in the 'dist' directory"
    echo ""
    echo "🚀 To deploy:"
    echo "   - Netlify: Drag 'dist' folder to netlify.com"
    echo "   - Vercel: Run 'npx vercel'"
    echo "   - GitHub Pages: Run 'npm run deploy'"
    echo ""
    echo "🌐 To preview locally: npm run preview"
else
    echo "❌ Build failed. Please check the error messages above."
    exit 1
fi 