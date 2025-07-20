import { createContext, useContext } from 'react'
import { RecipeContextType } from '../types'

const RecipeContext = createContext<RecipeContextType | undefined>(undefined)

export const useRecipeContext = () => {
  const context = useContext(RecipeContext)
  if (context === undefined) {
    console.error('useRecipeContext must be used within a RecipeProvider')
    // Return a default context instead of throwing
    return {
      appData: {
        recipes: [],
        weeklySchedule: {},
        monthlyPhotos: [],
        cuisinePreferences: [],
        cookingTimePreferences: {}
      },
      setAppData: () => {}
    }
  }
  return context
}

export const RecipeProvider = RecipeContext.Provider 