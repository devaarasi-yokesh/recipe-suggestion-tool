import { useState, useEffect } from 'react'
import { useRecipeContext } from '../context/RecipeContext'
import { Camera, Calendar, ChefHat, Star, Download, Share2 } from 'lucide-react'
import { MonthlyPhoto } from '../types'

const MonthlyReview = () => {
  const { appData, setAppData } = useRecipeContext()
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [showPhotoModal, setShowPhotoModal] = useState(false)
  const [photoData, setPhotoData] = useState({
    recipeName: '',
    notes: '',
    imageFile: null as File | null
  })
  const [imagePreview, setImagePreview] = useState<string>('')
  const [showSuccess, setShowSuccess] = useState(false)

  // Sample monthly photos for demonstration
  const samplePhotos: MonthlyPhoto[] = [
    {
      id: '1',
      date: '2024-01-15',
      recipeName: 'Spaghetti Carbonara',
      imageUrl: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop',
      notes: 'Perfect al dente pasta!'
    },
    {
      id: '2',
      date: '2024-01-18',
      recipeName: 'Chicken Tikka Masala',
      imageUrl: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop',
      notes: 'Spicy and delicious!'
    },
    {
      id: '3',
      date: '2024-01-22',
      recipeName: 'Caesar Salad',
      imageUrl: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop',
      notes: 'Fresh and crispy'
    },
    {
      id: '4',
      date: '2024-01-25',
      recipeName: 'Beef Stir Fry',
      imageUrl: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop',
      notes: 'Quick and healthy dinner'
    },
    {
      id: '5',
      date: '2024-01-28',
      recipeName: 'Chocolate Lava Cake',
      imageUrl: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop',
      notes: 'Perfect for date night!'
    }
  ]

  // Initialize with sample data if no photos exist
  if (appData.monthlyPhotos.length === 0) {
    setAppData(prev => ({
      ...prev,
      monthlyPhotos: samplePhotos
    }))
  }

  // Handle URL parameters for pre-filling recipe name
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const recipeParam = urlParams.get('recipe')
    if (recipeParam) {
      setPhotoData(prev => ({
        ...prev,
        recipeName: decodeURIComponent(recipeParam)
      }))
    }
  }, [])

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i)

  const filteredPhotos = appData.monthlyPhotos.filter(photo => {
    const photoDate = new Date(photo.date)
    return photoDate.getMonth() === selectedMonth && photoDate.getFullYear() === selectedYear
  })

  const monthlyStats = {
    totalRecipes: filteredPhotos.length,
    uniqueCuisines: [...new Set(filteredPhotos.map(photo => {
      const recipe = appData.recipes.find(r => r.name === photo.recipeName)
      return recipe?.cuisine || 'Unknown'
    }))].length,
    averageRating: 4.5, // This would be calculated from actual ratings
    specialRecipes: filteredPhotos.filter(photo => {
      const recipe = appData.recipes.find(r => r.name === photo.recipeName)
      return recipe?.isSpecial || false
    }).length
  }

  const addPhoto = () => {
    setShowPhotoModal(true)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPhotoData(prev => ({ ...prev, imageFile: file }))
      
      // Create preview URL
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handlePhotoSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!photoData.imageFile) {
      alert('Please select an image')
      return
    }

    if (!photoData.recipeName.trim()) {
      alert('Please enter a recipe name')
      return
    }

    // Create new photo entry
    const newPhoto: MonthlyPhoto = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0], // Today's date
      recipeName: photoData.recipeName,
      imageUrl: imagePreview,
      notes: photoData.notes
    }

    // Add to app data
    setAppData(prev => ({
      ...prev,
      monthlyPhotos: [...prev.monthlyPhotos, newPhoto]
    }))

    // Reset form and close modal
    setPhotoData({
      recipeName: '',
      notes: '',
      imageFile: null
    })
    setImagePreview('')
    setShowPhotoModal(false)
    
    // Show success message
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const resetPhotoForm = () => {
    setPhotoData({
      recipeName: '',
      notes: '',
      imageFile: null
    })
    setImagePreview('')
    setShowPhotoModal(false)
  }

  const downloadCollage = () => {
    try {
      if (filteredPhotos.length === 0) {
        alert('No photos to download for this month')
        return
      }

      // Create a canvas to generate collage
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        alert('Canvas not supported in this browser')
        return
      }

      // Set canvas size
      const cols = Math.ceil(Math.sqrt(filteredPhotos.length))
      const rows = Math.ceil(filteredPhotos.length / cols)
      const cellSize = 300
      canvas.width = cols * cellSize
      canvas.height = rows * cellSize

      // Fill background
      ctx.fillStyle = '#f8fafc'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Add title
      ctx.fillStyle = '#1f2937'
      ctx.font = 'bold 24px Arial'
      ctx.textAlign = 'center'
      ctx.fillText(`${months[selectedMonth]} ${selectedYear} Cooking Review`, canvas.width / 2, 40)

      // Load and draw images
      let loadedImages = 0
      const totalImages = filteredPhotos.length

      filteredPhotos.forEach((photo, index) => {
        const img = new Image()
        img.crossOrigin = 'anonymous'
        
        img.onload = () => {
          const col = index % cols
          const row = Math.floor(index / cols)
          const x = col * cellSize + 10
          const y = row * cellSize + 60

          // Draw image
          const aspectRatio = img.width / img.height
          let drawWidth = cellSize - 20
          let drawHeight = drawWidth / aspectRatio
          
          if (drawHeight > cellSize - 80) {
            drawHeight = cellSize - 80
            drawWidth = drawHeight * aspectRatio
          }

          const drawX = x + (cellSize - 20 - drawWidth) / 2
          const drawY = y + 10

          ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight)

          // Add recipe name
          ctx.fillStyle = '#374151'
          ctx.font = '14px Arial'
          ctx.textAlign = 'center'
          ctx.fillText(photo.recipeName, x + (cellSize - 20) / 2, y + drawHeight + 30)

          loadedImages++
          
          if (loadedImages === totalImages) {
            // Download the collage
            const link = document.createElement('a')
            link.download = `cooking-review-${months[selectedMonth].toLowerCase()}-${selectedYear}.png`
            link.href = canvas.toDataURL()
            link.click()
          }
        }

        img.onerror = () => {
          loadedImages++
          if (loadedImages === totalImages) {
            alert('Some images failed to load, but collage was created')
            const link = document.createElement('a')
            link.download = `cooking-review-${months[selectedMonth].toLowerCase()}-${selectedYear}.png`
            link.href = canvas.toDataURL()
            link.click()
          }
        }

        img.src = photo.imageUrl
      })
    } catch (error) {
      console.error('Error creating collage:', error)
      alert('Error creating collage. Please try again.')
    }
  }

  const shareReview = () => {
    try {
      if (filteredPhotos.length === 0) {
        alert('No photos to share for this month')
        return
      }

      const monthName = months[selectedMonth]
      const title = `My ${monthName} ${selectedYear} Cooking Journey`
      const text = `I cooked ${filteredPhotos.length} amazing recipes this month! Check out my culinary adventures.`
      
      // Create share data
      const shareData = {
        title: title,
        text: text,
        url: window.location.href
      }

      // Try to use native sharing if available
      if (navigator.share && navigator.canShare(shareData)) {
        navigator.share(shareData)
          .catch((error) => {
            console.log('Error sharing:', error)
            fallbackShare()
          })
      } else {
        fallbackShare()
      }
    } catch (error) {
      console.error('Error sharing review:', error)
      fallbackShare()
    }
  }

  const fallbackShare = () => {
    const monthName = months[selectedMonth]
    const text = `My ${monthName} ${selectedYear} Cooking Journey - I cooked ${filteredPhotos.length} amazing recipes!`
    const url = window.location.href
    
    // Copy to clipboard
    navigator.clipboard.writeText(`${text}\n${url}`)
      .then(() => {
        alert('Review link copied to clipboard! You can now share it.')
      })
      .catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea')
        textArea.value = `${text}\n${url}`
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
        alert('Review link copied to clipboard! You can now share it.')
      })
  }

  return (
    <div className="space-y-8">
      {/* Success Notification */}
      {showSuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
          <div className="flex items-center">
            <span className="mr-2">📸</span>
            Photo added successfully!
          </div>
        </div>
      )}

      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Monthly Cooking Review</h1>
        <p className="text-gray-600">Track your culinary journey and create beautiful memories</p>
      </div>

      {/* Month/Year Selector */}
      <div className="card">
        <div className="flex items-center justify-center space-x-4">
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-gray-600" />
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
              className="input-field"
            >
              {months.map((month, index) => (
                <option key={month} value={index}>{month}</option>
              ))}
            </select>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="input-field"
            >
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Monthly Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card text-center">
          <div className="p-3 bg-blue-100 rounded-lg inline-block mb-3">
            <ChefHat className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{monthlyStats.totalRecipes}</h3>
          <p className="text-gray-600">Recipes Cooked</p>
        </div>
        <div className="card text-center">
          <div className="p-3 bg-green-100 rounded-lg inline-block mb-3">
            <Camera className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{monthlyStats.uniqueCuisines}</h3>
          <p className="text-gray-600">Cuisines Explored</p>
        </div>
        <div className="card text-center">
          <div className="p-3 bg-yellow-100 rounded-lg inline-block mb-3">
            <Star className="h-6 w-6 text-yellow-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{monthlyStats.averageRating}</h3>
          <p className="text-gray-600">Average Rating</p>
        </div>
        <div className="card text-center">
          <div className="p-3 bg-purple-100 rounded-lg inline-block mb-3">
            <Star className="h-6 w-6 text-purple-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{monthlyStats.specialRecipes}</h3>
          <p className="text-gray-600">Special Recipes</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="card">
        <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
          <button onClick={addPhoto} className="btn-primary flex items-center justify-center">
            <Camera className="h-4 w-4 mr-2" />
            Add Today's Photo
          </button>
          <button onClick={downloadCollage} className="btn-secondary flex items-center justify-center">
            <Download className="h-4 w-4 mr-2" />
            Download Collage
          </button>
          <button onClick={shareReview} className="btn-outline flex items-center justify-center">
            <Share2 className="h-4 w-4 mr-2" />
            Share Review
          </button>
        </div>
      </div>

      {/* Photo Grid */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Cooking Memories</h2>
        
        {filteredPhotos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPhotos.map((photo) => (
              <div key={photo.id} className="group relative overflow-hidden rounded-lg shadow-md">
                <img
                  src={photo.imageUrl}
                  alt={photo.recipeName}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="font-semibold text-lg mb-1">{photo.recipeName}</h3>
                    <p className="text-sm text-gray-200 mb-2">{new Date(photo.date).toLocaleDateString()}</p>
                    {photo.notes && (
                      <p className="text-sm text-gray-300 italic">"{photo.notes}"</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">No photos for this month yet.</p>
            <p className="text-gray-500 text-sm">Start cooking and capture your culinary creations!</p>
          </div>
        )}
      </div>

      {/* Recipe Timeline */}
      {filteredPhotos.length > 0 && (
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Cooking Timeline</h2>
          <div className="space-y-4">
            {filteredPhotos
              .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
              .map((photo, index) => (
                <div key={photo.id} className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">{photo.recipeName}</h3>
                      <span className="text-sm text-gray-500">
                        {new Date(photo.date).toLocaleDateString()}
                      </span>
                    </div>
                    {photo.notes && (
                      <p className="text-sm text-gray-600 mt-1">{photo.notes}</p>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Tips for Better Photos */}
      <div className="card bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <h3 className="text-lg font-semibold text-purple-900 mb-2">📸 Photo Tips</h3>
        <ul className="text-purple-800 space-y-1 text-sm">
          <li>• Take photos in natural lighting for the best results</li>
          <li>• Include some props like utensils or ingredients</li>
          <li>• Try different angles - overhead shots work great for food</li>
          <li>• Add a personal note to remember the cooking experience</li>
        </ul>
      </div>

      {/* Photo Upload Modal */}
      {showPhotoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 md:p-4 z-50">
          <div className="bg-white rounded-lg p-4 md:p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Add Today's Photo</h2>
            <form onSubmit={handlePhotoSubmit} className="space-y-4">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Photo</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  {imagePreview ? (
                    <div className="space-y-2">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="w-full h-32 object-cover rounded-lg mx-auto"
                      />
                      <button 
                        type="button"
                        onClick={() => {
                          setImagePreview('')
                          setPhotoData(prev => ({ ...prev, imageFile: null }))
                        }}
                        className="text-red-600 text-sm hover:text-red-800"
                      >
                        Remove Photo
                      </button>
                    </div>
                  ) : (
                    <div>
                      <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-2">Click to upload or drag and drop</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        id="photo-upload"
                      />
                      <label 
                        htmlFor="photo-upload"
                        className="btn-primary inline-block cursor-pointer"
                      >
                        Choose Photo
                      </label>
                    </div>
                  )}
                </div>
              </div>

              {/* Recipe Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Recipe Name *</label>
                <input
                  type="text"
                  value={photoData.recipeName}
                  onChange={(e) => setPhotoData(prev => ({ ...prev, recipeName: e.target.value }))}
                  className="input-field"
                  placeholder="What did you cook today?"
                  required
                />
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label>
                <textarea
                  value={photoData.notes}
                  onChange={(e) => setPhotoData(prev => ({ ...prev, notes: e.target.value }))}
                  className="input-field"
                  rows={3}
                  placeholder="How was it? Any special memories?"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end space-x-3">
                <button 
                  type="button" 
                  onClick={resetPhotoForm}
                  className="btn-outline"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Add Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default MonthlyReview 