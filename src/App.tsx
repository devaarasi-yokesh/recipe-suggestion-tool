import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navigation from './components/Navigation'
import Dashboard from './pages/Dashboard'
import WeeklyPlan from './pages/WeeklyPlan'
import RecipeLibrary from './pages/RecipeLibrary'
import MonthlyReview from './pages/MonthlyReview'
import { RecipeProvider } from './context/RecipeContext'
import ErrorBoundary from './components/ErrorBoundary'
import { AppData } from './types'
import NotificationService from './services/NotificationService'

function App() {
  const [appData, setAppData] = useState<AppData>(() => {
    const saved = localStorage.getItem('recipe-app-data')
    if (saved) {
      const parsed = JSON.parse(saved)
      // Convert lastCooked strings back to Date objects
      if (parsed.recipes) {
        parsed.recipes = parsed.recipes.map((recipe: any) => ({
          ...recipe,
          lastCooked: recipe.lastCooked ? new Date(recipe.lastCooked) : undefined
        }))
      }
      return parsed
    }
    return {
      recipes: [],
      weeklySchedule: {},
      monthlyPhotos: [],
      cuisinePreferences: [],
      cookingTimePreferences: {}
    }
  })

  useEffect(() => {
    localStorage.setItem('recipe-app-data', JSON.stringify(appData))
  }, [appData])

  // Initialize notification service
  useEffect(() => {
    const notificationService = NotificationService.getInstance()
    notificationService.start()
    
    // Cleanup on unmount
    return () => {
      notificationService.stop()
    }
  }, [])

  return (
    <ErrorBoundary>
      <RecipeProvider value={{ appData, setAppData }}>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <main className="container mx-auto px-3 md:px-4 py-4 md:py-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/weekly-plan" element={<WeeklyPlan />} />
              <Route path="/recipe-library" element={<RecipeLibrary />} />
              <Route path="/monthly-review" element={<MonthlyReview />} />
            </Routes>
          </main>
        </div>
      </RecipeProvider>
    </ErrorBoundary>
  )
}

export default App 