import { useState } from 'react'
import { useRecipeContext } from '../context/RecipeContext'
import { Plus, Search, Clock, ChefHat, Star, Edit, Trash2 } from 'lucide-react'
import { Recipe } from '../types'

const RecipeLibrary = () => {
  const { appData, setAppData } = useRecipeContext()
  const [showAddForm, setShowAddForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCuisine, setFilterCuisine] = useState('')
  const [filterDifficulty, setFilterDifficulty] = useState('')
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    cuisine: '',
    cookingTime: 30,
    difficulty: 'medium' as 'easy' | 'medium' | 'hard',
    ingredients: '',
    instructions: '',
    isSpecial: false,
    tags: ''
  })
  const [showSuccess, setShowSuccess] = useState(false)

  // Sample recipes to populate the library
  const sampleRecipes: Recipe[] = [
    {
      id: '1',
      name: 'Spaghetti Carbonara',
      cuisine: 'Italian',
      cookingTime: 25,
      difficulty: 'medium',
      ingredients: ['Spaghetti', 'Eggs', 'Pancetta', 'Parmesan cheese', 'Black pepper', 'Salt'],
      instructions: [
        'Boil spaghetti in salted water',
        'Cook pancetta until crispy',
        'Beat eggs with parmesan',
        'Combine pasta with egg mixture',
        'Add pancetta and serve'
      ],
      tags: ['pasta', 'quick', 'classic'],
      isSpecial: false
    },
    {
      id: '2',
      name: 'Chicken Tikka Masala',
      cuisine: 'Indian',
      cookingTime: 45,
      difficulty: 'medium',
      ingredients: ['Chicken breast', 'Yogurt', 'Spices', 'Tomato sauce', 'Cream', 'Rice'],
      instructions: [
        'Marinate chicken in yogurt and spices',
        'Grill chicken until charred',
        'Make tomato-based sauce',
        'Add chicken to sauce',
        'Serve with rice'
      ],
      tags: ['curry', 'spicy', 'popular'],
      isSpecial: true
    },
    {
      id: '3',
      name: 'Caesar Salad',
      cuisine: 'American',
      cookingTime: 15,
      difficulty: 'easy',
      ingredients: ['Romaine lettuce', 'Croutons', 'Parmesan cheese', 'Caesar dressing', 'Lemon'],
      instructions: [
        'Wash and chop lettuce',
        'Make croutons',
        'Prepare dressing',
        'Toss all ingredients',
        'Serve immediately'
      ],
      tags: ['salad', 'healthy', 'quick'],
      isSpecial: false
    },
    {
      id: '4',
      name: 'Beef Stir Fry',
      cuisine: 'Chinese',
      cookingTime: 20,
      difficulty: 'easy',
      ingredients: ['Beef strips', 'Broccoli', 'Soy sauce', 'Garlic', 'Ginger', 'Rice'],
      instructions: [
        'Marinate beef in soy sauce',
        'Stir fry beef until browned',
        'Add vegetables',
        'Add sauce and seasonings',
        'Serve over rice'
      ],
      tags: ['stir-fry', 'quick', 'healthy'],
      isSpecial: false
    },
    {
      id: '5',
      name: 'Chocolate Lava Cake',
      cuisine: 'French',
      cookingTime: 30,
      difficulty: 'hard',
      ingredients: ['Dark chocolate', 'Butter', 'Eggs', 'Sugar', 'Flour', 'Vanilla'],
      instructions: [
        'Melt chocolate and butter',
        'Mix with eggs and sugar',
        'Add flour and vanilla',
        'Bake in ramekins',
        'Serve warm'
      ],
      tags: ['dessert', 'chocolate', 'romantic'],
      isSpecial: true
    }
  ]

  // Initialize with sample data if no recipes exist
  if (appData.recipes.length === 0) {
    setAppData(prev => ({
      ...prev,
      recipes: sampleRecipes
    }))
  }

  const filteredRecipes = appData.recipes.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recipe.cuisine.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCuisine = filterCuisine === '' || recipe.cuisine === filterCuisine
    const matchesDifficulty = filterDifficulty === '' || recipe.difficulty === filterDifficulty
    
    return matchesSearch && matchesCuisine && matchesDifficulty
  })

  const cuisines = [...new Set(appData.recipes.map(recipe => recipe.cuisine))]
  const difficulties = ['easy', 'medium', 'hard']

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'hard': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const deleteRecipe = (recipeId: string) => {
    if (confirm('Are you sure you want to delete this recipe?')) {
      setAppData(prev => ({
        ...prev,
        recipes: prev.recipes.filter(recipe => recipe.id !== recipeId)
      }))
    }
  }

  const editRecipe = (recipe: Recipe) => {
    setEditingRecipe(recipe)
    setFormData({
      name: recipe.name,
      cuisine: recipe.cuisine,
      cookingTime: recipe.cookingTime,
      difficulty: recipe.difficulty,
      ingredients: recipe.ingredients.join('\n'),
      instructions: recipe.instructions.join('\n'),
      isSpecial: recipe.isSpecial,
      tags: recipe.tags.join(', ')
    })
    setShowEditForm(true)
  }

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!editingRecipe) return

    // Validate required fields
    if (!formData.name || !formData.cuisine || !formData.ingredients || !formData.instructions) {
      alert('Please fill in all required fields')
      return
    }

    // Update recipe
    const updatedRecipe: Recipe = {
      ...editingRecipe,
      name: formData.name,
      cuisine: formData.cuisine,
      cookingTime: formData.cookingTime,
      difficulty: formData.difficulty,
      ingredients: formData.ingredients.split('\n').filter(ingredient => ingredient.trim()),
      instructions: formData.instructions.split('\n').filter(instruction => instruction.trim()),
      isSpecial: formData.isSpecial,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    }

    // Update recipe in app data
    setAppData(prev => ({
      ...prev,
      recipes: prev.recipes.map(recipe => 
        recipe.id === editingRecipe.id ? updatedRecipe : recipe
      )
    }))

    // Reset form and close modal
    setFormData({
      name: '',
      cuisine: '',
      cookingTime: 30,
      difficulty: 'medium',
      ingredients: '',
      instructions: '',
      isSpecial: false,
      tags: ''
    })
    setEditingRecipe(null)
    setShowEditForm(false)
    
    // Show success message
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleFormChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate required fields
    if (!formData.name || !formData.cuisine || !formData.ingredients || !formData.instructions) {
      alert('Please fill in all required fields')
      return
    }

    // Create new recipe
    const newRecipe: Recipe = {
      id: Date.now().toString(), // Simple ID generation
      name: formData.name,
      cuisine: formData.cuisine,
      cookingTime: formData.cookingTime,
      difficulty: formData.difficulty,
      ingredients: formData.ingredients.split('\n').filter(ingredient => ingredient.trim()),
      instructions: formData.instructions.split('\n').filter(instruction => instruction.trim()),
      isSpecial: formData.isSpecial,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      lastCooked: new Date()
    }

    // Add recipe to app data
    setAppData(prev => ({
      ...prev,
      recipes: [...prev.recipes, newRecipe]
    }))

    // Reset form and close modal
    setFormData({
      name: '',
      cuisine: '',
      cookingTime: 30,
      difficulty: 'medium',
      ingredients: '',
      instructions: '',
      isSpecial: false,
      tags: ''
    })
    setShowAddForm(false)
    
    // Show success message
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const resetForm = () => {
    setFormData({
      name: '',
      cuisine: '',
      cookingTime: 30,
      difficulty: 'medium',
      ingredients: '',
      instructions: '',
      isSpecial: false,
      tags: ''
    })
    setShowAddForm(false)
  }

  return (
    <div className="space-y-8">
      {/* Success Notification */}
      {showSuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
          <div className="flex items-center">
            <span className="mr-2">✅</span>
            Recipe added successfully!
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Recipe Library</h1>
          <p className="text-gray-600">
            Manage your collection of favorite recipes • {appData.recipes.length} recipes
          </p>
        </div>
        <button 
          onClick={() => setShowAddForm(true)}
          className="btn-primary flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Recipe
        </button>
      </div>

      {/* Search and Filters */}
      <div className="card">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search recipes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={filterCuisine}
              onChange={(e) => setFilterCuisine(e.target.value)}
              className="input-field"
            >
              <option value="">All Cuisines</option>
              {cuisines.map(cuisine => (
                <option key={cuisine} value={cuisine}>{cuisine}</option>
              ))}
            </select>
            <select
              value={filterDifficulty}
              onChange={(e) => setFilterDifficulty(e.target.value)}
              className="input-field"
            >
              <option value="">All Difficulties</option>
              {difficulties.map(difficulty => (
                <option key={difficulty} value={difficulty}>{difficulty}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Recipe Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.map((recipe) => (
          <div key={recipe.id} className="card hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{recipe.name}</h3>
                <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                  <span className="flex items-center">
                    <ChefHat className="h-4 w-4 mr-1" />
                    {recipe.cuisine}
                  </span>
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {recipe.cookingTime} min
                  </span>
                </div>
              </div>
              <div className="flex space-x-1">
                <button 
                  onClick={() => editRecipe(recipe)}
                  className="p-1 text-gray-400 hover:text-gray-600"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => deleteRecipe(recipe.id)}
                  className="p-1 text-gray-400 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="space-y-2 mb-3">
              <span className={`inline-block px-2 py-1 rounded-full text-xs ${getDifficultyColor(recipe.difficulty)}`}>
                {recipe.difficulty}
              </span>
              {recipe.isSpecial && (
                <span className="inline-block px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full ml-2">
                  <Star className="h-3 w-3 inline mr-1" />
                  Special
                </span>
              )}
            </div>

            <div className="mb-3">
              <h4 className="text-sm font-medium text-gray-900 mb-1">Ingredients:</h4>
              <p className="text-sm text-gray-600 line-clamp-2">
                {recipe.ingredients.slice(0, 3).join(', ')}
                {recipe.ingredients.length > 3 && '...'}
              </p>
            </div>

            <div className="flex flex-wrap gap-1">
              {recipe.tags.map(tag => (
                <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {filteredRecipes.length === 0 && (
        <div className="text-center py-12">
          <ChefHat className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No recipes found matching your criteria.</p>
        </div>
      )}

      {/* Add Recipe Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Add New Recipe</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Recipe Name *</label>
                  <input 
                    type="text" 
                    className="input-field"
                    value={formData.name}
                    onChange={(e) => handleFormChange('name', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cuisine *</label>
                  <input 
                    type="text" 
                    className="input-field"
                    value={formData.cuisine}
                    onChange={(e) => handleFormChange('cuisine', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cooking Time (minutes)</label>
                  <input 
                    type="number" 
                    className="input-field"
                    value={formData.cookingTime}
                    onChange={(e) => handleFormChange('cookingTime', parseInt(e.target.value))}
                    min="5"
                    max="180"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                  <select 
                    className="input-field"
                    value={formData.difficulty}
                    onChange={(e) => handleFormChange('difficulty', e.target.value)}
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ingredients (one per line) *</label>
                <textarea 
                  className="input-field" 
                  rows={4} 
                  placeholder="Enter ingredients..."
                  value={formData.ingredients}
                  onChange={(e) => handleFormChange('ingredients', e.target.value)}
                  required
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Instructions (one per line) *</label>
                <textarea 
                  className="input-field" 
                  rows={4} 
                  placeholder="Enter instructions..."
                  value={formData.instructions}
                  onChange={(e) => handleFormChange('instructions', e.target.value)}
                  required
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma separated)</label>
                <input 
                  type="text" 
                  className="input-field"
                  placeholder="quick, healthy, vegetarian"
                  value={formData.tags}
                  onChange={(e) => handleFormChange('tags', e.target.value)}
                />
              </div>
              
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    className="mr-2"
                    checked={formData.isSpecial}
                    onChange={(e) => handleFormChange('isSpecial', e.target.checked)}
                  />
                  <span className="text-sm text-gray-700">Special Recipe (for weekends)</span>
                </label>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button 
                  type="button" 
                  onClick={resetForm}
                  className="btn-outline"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Add Recipe
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Recipe Form Modal */}
      {showEditForm && editingRecipe && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Edit Recipe</h2>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Recipe Name *</label>
                  <input 
                    type="text" 
                    className="input-field"
                    value={formData.name}
                    onChange={(e) => handleFormChange('name', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cuisine *</label>
                  <input 
                    type="text" 
                    className="input-field"
                    value={formData.cuisine}
                    onChange={(e) => handleFormChange('cuisine', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cooking Time (minutes)</label>
                  <input 
                    type="number" 
                    className="input-field"
                    value={formData.cookingTime}
                    onChange={(e) => handleFormChange('cookingTime', parseInt(e.target.value))}
                    min="5"
                    max="180"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                  <select 
                    className="input-field"
                    value={formData.difficulty}
                    onChange={(e) => handleFormChange('difficulty', e.target.value)}
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ingredients (one per line) *</label>
                <textarea 
                  className="input-field" 
                  rows={4} 
                  placeholder="Enter ingredients..."
                  value={formData.ingredients}
                  onChange={(e) => handleFormChange('ingredients', e.target.value)}
                  required
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Instructions (one per line) *</label>
                <textarea 
                  className="input-field" 
                  rows={4} 
                  placeholder="Enter instructions..."
                  value={formData.instructions}
                  onChange={(e) => handleFormChange('instructions', e.target.value)}
                  required
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma separated)</label>
                <input 
                  type="text" 
                  className="input-field"
                  placeholder="quick, healthy, vegetarian"
                  value={formData.tags}
                  onChange={(e) => handleFormChange('tags', e.target.value)}
                />
              </div>
              
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    className="mr-2"
                    checked={formData.isSpecial}
                    onChange={(e) => handleFormChange('isSpecial', e.target.checked)}
                  />
                  <span className="text-sm text-gray-700">Special Recipe (for weekends)</span>
                </label>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button 
                  type="button" 
                  onClick={() => {
                    setShowEditForm(false)
                    setEditingRecipe(null)
                    resetForm()
                  }}
                  className="btn-outline"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Update Recipe
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default RecipeLibrary 