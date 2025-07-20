export interface Recipe {
  id: string
  name: string
  cuisine: string
  cookingTime: number // in minutes
  difficulty: 'easy' | 'medium' | 'hard'
  ingredients: string[]
  instructions: string[]
  image?: string
  tags: string[]
  isSpecial: boolean
  lastCooked?: Date
}

export interface WeeklySchedule {
  [day: string]: {
    cookingTime: number
    suggestedRecipe?: Recipe
    actualRecipe?: Recipe
    photo?: string
    notes?: string
  }
}

export interface MonthlyPhoto {
  id: string
  date: string
  recipeName: string
  imageUrl: string
  notes?: string
}

export interface CookingTimePreference {
  [day: string]: number // cooking time in minutes
}

export interface AppData {
  recipes: Recipe[]
  weeklySchedule: WeeklySchedule
  monthlyPhotos: MonthlyPhoto[]
  cuisinePreferences: string[]
  cookingTimePreferences: CookingTimePreference
}

export interface RecipeContextType {
  appData: AppData
  setAppData: React.Dispatch<React.SetStateAction<AppData>>
} 