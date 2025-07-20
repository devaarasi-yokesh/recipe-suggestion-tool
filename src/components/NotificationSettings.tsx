import { useState, useEffect } from 'react'
import { Bell, Clock, Calendar, Save, X } from 'lucide-react'
import NotificationService, { type NotificationSettings } from '../services/NotificationService'

const NotificationSettings = () => {
  const [settings, setSettings] = useState<NotificationSettings>({
    enabled: false,
    time: '11:00',
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  })
  const [showSettings, setShowSettings] = useState(false)
  const [permissionStatus, setPermissionStatus] = useState<NotificationPermission>('default')
  const [showSuccess, setShowSuccess] = useState(false)

  const notificationService = NotificationService.getInstance()

  useEffect(() => {
    // Load current settings
    const currentSettings = notificationService.getSettings()
    setSettings(currentSettings)

    // Check notification permission
    if ('Notification' in window) {
      setPermissionStatus(Notification.permission)
    }
  }, [])

  const handleToggleNotifications = async () => {
    if (!settings.enabled) {
      const hasPermission = await notificationService.requestPermission()
      if (hasPermission) {
        setPermissionStatus('granted')
        const newSettings = { ...settings, enabled: true }
        setSettings(newSettings)
        notificationService.updateSettings(newSettings)
        showSuccessMessage('Notifications enabled!')
      } else {
        setPermissionStatus('denied')
        showSuccessMessage('Please enable notifications in your browser settings')
      }
    } else {
      const newSettings = { ...settings, enabled: false }
      setSettings(newSettings)
      notificationService.updateSettings(newSettings)
      showSuccessMessage('Notifications disabled')
    }
  }

  const handleTimeChange = (time: string) => {
    const newSettings = { ...settings, time }
    setSettings(newSettings)
  }

  const handleDayToggle = (day: string) => {
    const newDays = settings.days.includes(day)
      ? settings.days.filter(d => d !== day)
      : [...settings.days, day]
    
    const newSettings = { ...settings, days: newDays }
    setSettings(newSettings)
  }

  const handleSave = () => {
    notificationService.updateSettings(settings)
    showSuccessMessage('Notification settings saved!')
    setShowSettings(false)
  }

  const [successMessage, setSuccessMessage] = useState('')

  const showSuccessMessage = (message: string) => {
    setSuccessMessage(message)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const testNotification = async () => {
    const hasPermission = await notificationService.requestPermission()
    if (hasPermission) {
      new Notification('🍳 Test Notification', {
        body: 'This is a test notification from your Recipe App!',
        icon: '/vite.svg',
        requireInteraction: true
      })
      showSuccessMessage('Test notification sent!')
    } else {
      showSuccessMessage('Please enable notifications in your browser')
    }
  }

  const getPermissionStatusColor = () => {
    switch (permissionStatus) {
      case 'granted': return 'text-green-600'
      case 'denied': return 'text-red-600'
      default: return 'text-yellow-600'
    }
  }

  const getPermissionStatusText = () => {
    switch (permissionStatus) {
      case 'granted': return 'Enabled'
      case 'denied': return 'Blocked'
      default: return 'Not set'
    }
  }

  return (
    <>
      {/* Success Notification */}
      {showSuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
          <div className="flex items-center">
            <span className="mr-2">✅</span>
            {successMessage}
          </div>
        </div>
      )}

      {/* Notification Settings Button */}
      <button
        onClick={() => setShowSettings(true)}
        className="btn-outline flex items-center"
      >
        <Bell className="h-4 w-4 mr-2" />
        Notifications
        {settings.enabled && (
          <span className="ml-2 w-2 h-2 bg-green-500 rounded-full"></span>
        )}
      </button>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                Notification Settings
              </h2>
              <button
                onClick={() => setShowSettings(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Enable/Disable Toggle */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Daily Recipe Reminders</h3>
                  <p className="text-sm text-gray-600">Get notified about today's recipe</p>
                </div>
                <button
                  onClick={handleToggleNotifications}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.enabled ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.enabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Permission Status */}
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Browser Permission:</span>
                <span className={`text-sm font-medium ${getPermissionStatusColor()}`}>
                  {getPermissionStatusText()}
                </span>
              </div>

              {/* Time Setting */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  Notification Time
                </label>
                <input
                  type="time"
                  value={settings.time}
                  onChange={(e) => handleTimeChange(e.target.value)}
                  className="input-field"
                />
              </div>

              {/* Days Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Days to Notify
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                    <label key={day} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={settings.days.includes(day)}
                        onChange={() => handleDayToggle(day)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{day}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Test Notification */}
              <div className="pt-4 border-t">
                <button
                  onClick={testNotification}
                  className="btn-outline w-full"
                >
                  Send Test Notification
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowSettings(false)}
                  className="btn-outline flex-1"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="btn-primary flex-1 flex items-center justify-center"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default NotificationSettings 