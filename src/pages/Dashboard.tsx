import { useRecipeContext } from '../context/RecipeContext'
import { Link } from 'react-router-dom'
import { Calendar, BookOpen, Camera, ChefHat, Clock, TrendingUp } from 'lucide-react'

const Dashboard = () => {
  const { appData } = useRecipeContext()

  // Debug logging
  console.log('Dashboard rendered with appData:', appData)

  // Fallback data in case context fails
  const safeAppData = appData || {
    recipes: [],
    weeklySchedule: {},
    monthlyPhotos: [],
    cuisinePreferences: [],
    cookingTimePreferences: {}
  }

  const stats = [
    {
      title: 'Total Recipes',
      value: safeAppData.recipes.length,
      icon: BookOpen,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'This Week\'s Plan',
      value: Object.keys(safeAppData.weeklySchedule).length,
      icon: Calendar,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Monthly Photos',
      value: safeAppData.monthlyPhotos.length,
      icon: Camera,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Cuisines to Try',
      value: safeAppData.cuisinePreferences.length,
      icon: ChefHat,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ]

  const quickActions = [
    {
      title: 'Plan This Week',
      description: 'Set up your weekly cooking schedule',
      icon: Calendar,
      link: '/weekly-plan',
      color: 'bg-gradient-to-r from-blue-500 to-blue-600'
    },
    {
      title: 'Add New Recipe',
      description: 'Add a recipe to your collection',
      icon: BookOpen,
      link: '/recipe-library',
      color: 'bg-gradient-to-r from-green-500 to-green-600'
    },
    {
      title: 'View Monthly Review',
      description: 'See your cooking journey this month',
      icon: Camera,
      link: '/monthly-review',
      color: 'bg-gradient-to-r from-purple-500 to-purple-600'
    },
    {
      title: 'Browse Recipes',
      description: 'Explore your recipe collection',
      icon: BookOpen,
      link: '/recipe-library',
      color: 'bg-gradient-to-r from-orange-500 to-orange-600'
    },
    {
      title: 'Today\'s Plan',
      description: 'See what\'s cooking today',
      icon: ChefHat,
      link: '/weekly-plan',
      color: 'bg-gradient-to-r from-pink-500 to-pink-600'
    },
    {
      title: 'Add Photo',
      description: 'Capture today\'s cooking',
      icon: Camera,
      link: '/monthly-review',
      color: 'bg-gradient-to-r from-indigo-500 to-indigo-600'
    }
  ]

  const recentRecipes = safeAppData.recipes
    .sort((a, b) => {
      const aTime = a.lastCooked instanceof Date ? a.lastCooked.getTime() : 
                   (typeof a.lastCooked === 'string' ? new Date(a.lastCooked).getTime() : 0)
      const bTime = b.lastCooked instanceof Date ? b.lastCooked.getTime() : 
                   (typeof b.lastCooked === 'string' ? new Date(b.lastCooked).getTime() : 0)
      return bTime - aTime
    })
    .slice(0, 3)

  // If no data is available, show a simple loading state
  if (!safeAppData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your recipe planner...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Welcome to Your Recipe Planner</h1>
        <p className="text-gray-600 text-sm md:text-base px-2">Plan your meals, track your cooking journey, and discover new cuisines</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 md:gap-4 lg:gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Link
              key={stat.title}
              to={stat.title === 'Total Recipes' ? '/recipe-library' : 
                  stat.title === 'This Week\'s Plan' ? '/weekly-plan' :
                  stat.title === 'Monthly Photos' ? '/monthly-review' : '/recipe-library'}
              className="card p-3 md:p-4 hover:shadow-md transition-shadow duration-200 cursor-pointer"
            >
              <div className="flex items-center">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 ${stat.color}`} />
                </div>
                <div className="ml-2 md:ml-3 lg:ml-4">
                  <p className="text-xs font-medium text-gray-600 truncate">{stat.title}</p>
                  <p className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-3">
          {quickActions.map((action) => {
            const Icon = action.icon
            return (
              <Link
                key={action.title}
                to={action.link}
                className="quick-action-link"
                style={{ background: action.color }}
              >
                <Icon className="h-5 w-5 md:h-6 md:w-6 mb-1 md:mb-2 mx-auto" />
                <h3 className="text-xs md:text-sm font-semibold mb-1 leading-tight">{action.title}</h3>
                <p className="text-white/90 text-xs leading-tight hidden md:block">{action.description}</p>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Recent Recipes */}
      <div className="card">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4">Recent Recipes</h2>
        {recentRecipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            {recentRecipes.map((recipe) => (
              <div key={recipe.id} className="border border-gray-200 rounded-lg p-3 md:p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900 text-sm md:text-base">{recipe.name}</h3>
                  <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                    {recipe.cuisine}
                  </span>
                </div>
                <div className="flex items-center text-xs md:text-sm text-gray-600 mb-2">
                  <Clock className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                  {recipe.cookingTime} min
                </div>
                <div className="flex items-center text-xs md:text-sm text-gray-600">
                  <TrendingUp className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                  {recipe.difficulty}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 md:py-8">
            <BookOpen className="h-8 w-8 md:h-12 md:w-12 text-gray-400 mx-auto mb-3 md:mb-4" />
            <p className="text-gray-600 text-sm md:text-base">No recipes yet. Start by adding your first recipe!</p>
            <Link to="/recipe-library" className="btn-primary inline-block mt-3 md:mt-4 text-sm">
              Add Recipe
            </Link>
          </div>
        )}
      </div>

      {/* Weekly Preview */}
      {Object.keys(safeAppData.weeklySchedule).length > 0 && (
        <div className="card">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4">This Week's Plan</h2>
          <div className="grid grid-cols-7 gap-1 md:gap-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
              const fullDay = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][index]
              const daySchedule = safeAppData.weeklySchedule[fullDay]
              return (
                <div key={day} className="text-center p-2 md:p-3 border border-gray-200 rounded-lg">
                  <p className="text-xs font-medium text-gray-900 mb-1">{day}</p>
                  {daySchedule ? (
                    <div>
                      <p className="text-xs text-gray-600">{daySchedule.cookingTime}m</p>
                      {daySchedule.suggestedRecipe && (
                        <p className="text-xs text-primary-600 font-medium truncate">
                          {daySchedule.suggestedRecipe.name}
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="text-xs text-gray-400">-</p>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard 