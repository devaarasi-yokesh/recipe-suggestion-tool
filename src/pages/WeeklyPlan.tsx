import { useState } from 'react'
import { useRecipeContext } from '../context/RecipeContext'
import { Clock, ChefHat, Calendar, Camera, Save, RefreshCw } from 'lucide-react'
//import { Recipe } from '../types'

const WeeklyPlan = () => {
  const { appData, setAppData } = useRecipeContext()
  const [cookingTimes, setCookingTimes] = useState<Record<string, number>>(
    appData.cookingTimePreferences || {
      Monday: 30,
      Tuesday: 30,
      Wednesday: 30,
      Thursday: 30,
      Friday: 30,
      Saturday: 60,
      Sunday: 60
    }
  )

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  const [showSuccess, setShowSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const generateWeeklyPlan = () => {
    try {
      const newSchedule: Record<string, any> = {}
      const usedRecipes = new Set<string>()
      let specialRecipeAssigned = false

      days.forEach((day) => {
        const availableTime = cookingTimes[day]
        const isWeekend = day === 'Saturday' || day === 'Sunday'
        
        // Filter recipes based on cooking time and availability
        let availableRecipes = appData.recipes.filter(recipe => 
          recipe.cookingTime <= availableTime && !usedRecipes.has(recipe.id)
        )

        // For weekends, prioritize special recipes if not already assigned
        if (isWeekend && !specialRecipeAssigned) {
          const specialRecipes = availableRecipes.filter(recipe => recipe.isSpecial)
          if (specialRecipes.length > 0) {
            const selectedRecipe = specialRecipes[Math.floor(Math.random() * specialRecipes.length)]
            newSchedule[day] = {
              cookingTime: availableTime,
              suggestedRecipe: selectedRecipe
            }
            usedRecipes.add(selectedRecipe.id)
            specialRecipeAssigned = true
            return
          }
        }

        // For weekdays, prefer regular recipes
        if (!isWeekend) {
          availableRecipes = availableRecipes.filter(recipe => !recipe.isSpecial)
        }

        if (availableRecipes.length > 0) {
          const selectedRecipe = availableRecipes[Math.floor(Math.random() * availableRecipes.length)]
          newSchedule[day] = {
            cookingTime: availableTime,
            suggestedRecipe: selectedRecipe
          }
          usedRecipes.add(selectedRecipe.id)
        } else {
          newSchedule[day] = {
            cookingTime: availableTime
          }
        }
      })

      setAppData(prev => ({
        ...prev,
        weeklySchedule: newSchedule,
        cookingTimePreferences: cookingTimes
      }))

      setSuccessMessage('Weekly plan generated successfully!')
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    } catch (error) {
      console.error('Error generating weekly plan:', error)
      setSuccessMessage('Error generating plan. Please try again.')
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    }
  }

  const savePlan = () => {
    try {
      setAppData(prev => ({
        ...prev,
        cookingTimePreferences: cookingTimes
      }))
      
      setSuccessMessage('Preferences saved successfully!')
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    } catch (error) {
      console.error('Error saving preferences:', error)
      setSuccessMessage('Error saving preferences. Please try again.')
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    }
  }

  const handleCookingTimeChange = (day: string, time: number) => {
    setCookingTimes(prev => ({
      ...prev,
      [day]: time
    }))
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'hard': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const handleAddPhoto = (recipeName: string) => {
    // Navigate to monthly review with pre-filled recipe name
    window.location.href = `/monthly-review?recipe=${encodeURIComponent(recipeName)}`
  }

  return (
    <div className="space-y-8">
      {/* Success Notification */}
      {showSuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
          <div className="flex items-center">
            <span className="mr-2">✅</span>
            {successMessage}
          </div>
        </div>
      )}

      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Weekly Meal Planning</h1>
        <p className="text-gray-600">Set your cooking time preferences and get personalized recipe suggestions</p>
      </div>

      {/* Cooking Time Preferences */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <Clock className="h-5 w-5 mr-2" />
          Cooking Time Preferences
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
          {days.map((day) => (
            <div key={day} className="text-center">
              <label className="block text-sm font-medium text-gray-700 mb-2">{day}</label>
              <select
                value={cookingTimes[day] || 30}
                onChange={(e) => handleCookingTimeChange(day, parseInt(e.target.value))}
                className="input-field text-center"
              >
                <option value={15}>15 min</option>
                <option value={30}>30 min</option>
                <option value={45}>45 min</option>
                <option value={60}>60 min</option>
                <option value={90}>90 min</option>
                <option value={120}>120 min</option>
              </select>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-center space-x-4">
          <button onClick={savePlan} className="btn-primary flex items-center">
            <Save className="h-4 w-4 mr-2" />
            Save Preferences
          </button>
          <button onClick={generateWeeklyPlan} className="btn-secondary flex items-center">
            <RefreshCw className="h-4 w-4 mr-2" />
            Generate Plan
          </button>
        </div>
      </div>

      {/* Weekly Schedule */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <Calendar className="h-5 w-5 mr-2" />
          This Week's Plan
        </h2>
        
        {appData.recipes.length === 0 ? (
          <div className="text-center py-8">
            <ChefHat className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">No recipes available. Add some recipes first!</p>
            <button className="btn-primary">Add Recipes</button>
          </div>
        ) : (
          <div className="space-y-4">
            {days.map((day) => {
              const daySchedule = appData.weeklySchedule[day]
              const recipe = daySchedule?.suggestedRecipe
              
              return (
                <div key={day} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">{day}</h3>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-1" />
                      {cookingTimes[day]} min available
                    </div>
                  </div>
                  
                  {recipe ? (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 mb-2">{recipe.name}</h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                            <span className="flex items-center">
                              <ChefHat className="h-4 w-4 mr-1" />
                              {recipe.cuisine}
                            </span>
                            <span className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {recipe.cookingTime} min
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(recipe.difficulty)}`}>
                              {recipe.difficulty}
                            </span>
                          </div>
                          {recipe.isSpecial && (
                            <span className="inline-block px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                              Special Recipe
                            </span>
                          )}
                        </div>
                        <button 
                          onClick={() => handleAddPhoto(recipe.name)}
                          className="btn-outline text-sm"
                        >
                          <Camera className="h-4 w-4 mr-1" />
                          Add Photo
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-4 text-gray-500">
                      No recipe suggested for this day
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Tips */}
      <div className="card bg-blue-50 border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Planning Tips</h3>
        <ul className="text-blue-800 space-y-1 text-sm">
          <li>• Set realistic cooking times based on your schedule</li>
          <li>• Weekend days are perfect for trying special recipes</li>
          <li>• The system will suggest different recipes each day</li>
          <li>• You can always manually change the suggested recipes</li>
        </ul>
      </div>
    </div>
  )
}

export default WeeklyPlan 