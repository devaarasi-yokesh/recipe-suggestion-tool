# Recipe Suggestion Tool 🍳

A comprehensive web application for meal planning, recipe management, and cooking journey tracking. Plan your weekly meals, discover new cuisines, and create beautiful memories of your culinary adventures.

## ✨ Features

### 🗓️ Weekly Meal Planning
- Set cooking time preferences for each day of the week
- Get personalized recipe suggestions based on available time
- Special recipe suggestions for weekends
- Smart algorithm that avoids repeating recipes in the same week
- **NEW:** Save preferences and generate plans with confirmation
- **NEW:** Add photos directly from weekly plan

### 📚 Recipe Library
- Add and manage your favorite recipes
- Categorize recipes by cuisine, difficulty, and cooking time
- Mark special recipes for weekend cooking
- Search and filter recipes easily
- Sample recipes included to get you started
- **NEW:** Edit existing recipes with full form support
- **NEW:** Delete recipes with confirmation

### 📸 Monthly Review & Photo Tracking
- Upload photos of your cooked dishes
- Create beautiful monthly collages
- Track your cooking statistics
- View cooking timeline and memories
- Download and share your culinary journey
- **NEW:** Download monthly collage as PNG image
- **NEW:** Share monthly review via native sharing or clipboard
- **NEW:** Pre-fill recipe names from weekly plan

### 🎯 Smart Suggestions
- Algorithm considers your cooking time constraints
- Prioritizes special recipes for weekends
- Ensures variety in your weekly meal plan
- Respects your cuisine preferences

### 🛡️ Error Handling & Reliability
- **NEW:** Comprehensive error boundaries to prevent crashes
- **NEW:** Proper data validation and error messages
- **NEW:** Graceful handling of missing data
- **NEW:** User-friendly error notifications

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd recipe-suggestion-tool
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to see the application

### Build for Production
```bash
npm run build
```

### Quick Build Scripts
- **Windows:** Run `build.bat`
- **Mac/Linux:** Run `./build.sh`

## 🌐 Deployment Options

### Option 1: Netlify (Recommended - Free)
1. Build the project: `npm run build`
2. Go to [netlify.com](https://netlify.com)
3. Drag the `dist` folder to deploy
4. Your app will be live instantly!

### Option 2: Vercel (Free)
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts to deploy

### Option 3: GitHub Pages
1. Run: `npm run deploy`
2. Your app will be available at `https://yourusername.github.io/repo-name`

**📱 Once deployed, you can access your app from any device without running `npm run dev`!**

## 📱 How to Use

### 1. Dashboard Overview
- View your cooking statistics
- Quick access to all features
- See recent recipes and weekly plan preview

### 2. Weekly Planning
1. Go to "Weekly Plan" section
2. Set your cooking time preferences for each day
3. Click "Generate Plan" to get recipe suggestions
4. Review and adjust the suggested recipes
5. Save your preferences for future use

### 3. Recipe Management
1. Visit "Recipe Library" to see all your recipes
2. Add new recipes with the "Add Recipe" button
3. Include ingredients, instructions, and cooking time
4. Mark special recipes for weekend cooking
5. Search and filter recipes as needed

### 4. Photo Tracking
1. Cook your planned recipes
2. Take photos of your finished dishes
3. Upload photos in the "Monthly Review" section
4. Add notes about your cooking experience
5. View your monthly collage and statistics

## 🎨 Sample Data

The application comes with sample recipes to help you get started:

- **Spaghetti Carbonara** (Italian, 25 min, medium)
- **Chicken Tikka Masala** (Indian, 45 min, medium, special)
- **Caesar Salad** (American, 15 min, easy)
- **Beef Stir Fry** (Chinese, 20 min, easy)
- **Chocolate Lava Cake** (French, 30 min, hard, special)

## 🛠️ Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Build Tool**: Vite
- **State Management**: React Context API
- **Local Storage**: For data persistence

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   └── Navigation.tsx
├── context/            # React context for state management
│   └── RecipeContext.tsx
├── pages/              # Main application pages
│   ├── Dashboard.tsx
│   ├── WeeklyPlan.tsx
│   ├── RecipeLibrary.tsx
│   └── MonthlyReview.tsx
├── types/              # TypeScript type definitions
│   └── index.ts
├── App.tsx             # Main application component
├── main.tsx           # Application entry point
└── index.css          # Global styles
```

## 🎯 Key Features Explained

### Smart Recipe Suggestions
The application uses an intelligent algorithm that:
- Considers your daily cooking time constraints
- Prioritizes special recipes for weekends
- Ensures no recipe is repeated in the same week
- Balances cuisine variety throughout the week

### Photo Management
- Upload photos of your cooked dishes
- Add personal notes and memories
- Create monthly collages
- Track your culinary progress over time

### Data Persistence
- All data is stored locally in your browser
- No account creation required
- Your recipes and preferences are saved automatically
- Data persists between sessions

## 🎨 Customization

### Adding New Recipes
1. Click "Add Recipe" in the Recipe Library
2. Fill in recipe details:
   - Name and cuisine
   - Cooking time and difficulty
   - Ingredients and instructions
   - Tags for easy searching
   - Mark as special if desired

### Setting Cooking Preferences
- Adjust cooking time for each day of the week
- The system will suggest recipes that fit your schedule
- Save preferences for consistent planning

## 🚀 Future Enhancements

- Recipe rating and review system
- Nutritional information tracking
- Shopping list generation
- Recipe sharing with friends
- Integration with cooking apps
- Advanced photo editing features
- Recipe scaling for different serving sizes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you encounter any issues or have questions:
1. Check the documentation above
2. Review the sample data for examples
3. Open an issue in the repository

---

**Happy Cooking! 🍽️**

Transform your meal planning experience with this comprehensive recipe suggestion tool. Plan, cook, capture, and celebrate your culinary journey! 