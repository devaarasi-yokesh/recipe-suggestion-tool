export interface NotificationSettings {
  enabled: boolean
  time: string // HH:mm format
  days: string[] // ['Monday', 'Tuesday', etc.]
}

export class NotificationService {
  private static instance: NotificationService
  private settings: NotificationSettings = {
    enabled: false,
    time: '11:00',
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  }

  private constructor() {
    this.loadSettings()
  }

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService()
    }
    return NotificationService.instance
  }

  private loadSettings(): void {
    const saved = localStorage.getItem('notification-settings')
    if (saved) {
      this.settings = { ...this.settings, ...JSON.parse(saved) }
    }
  }

  private saveSettings(): void {
    localStorage.setItem('notification-settings', JSON.stringify(this.settings))
  }

  getSettings(): NotificationSettings {
    return { ...this.settings }
  }

  updateSettings(newSettings: Partial<NotificationSettings>): void {
    this.settings = { ...this.settings, ...newSettings }
    this.saveSettings()
    this.setupNotifications()
  }

  async requestPermission(): Promise<boolean> {
    if (!('Notification' in window)) {
      console.warn('This browser does not support notifications')
      return false
    }

    if (Notification.permission === 'granted') {
      return true
    }

    if (Notification.permission === 'denied') {
      return false
    }

    const permission = await Notification.requestPermission()
    return permission === 'granted'
  }

  private setupNotifications(): void {
    if (!this.settings.enabled) {
      return
    }

    // Clear any existing intervals
    if (window.notificationInterval) {
      clearInterval(window.notificationInterval)
    }

    // Check every minute if it's time to show notification
    window.notificationInterval = setInterval(() => {
      this.checkAndShowNotification()
    }, 60000) // Check every minute

    // Also check immediately
    this.checkAndShowNotification()
  }

  private checkAndShowNotification(): void {
    if (!this.settings.enabled) return

    const now = new Date()
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
    const currentDay = this.getDayName(now.getDay())

    if (currentTime === this.settings.time && this.settings.days.includes(currentDay)) {
      this.showDailyRecipeNotification()
    }
  }

  private getDayName(dayIndex: number): string {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    return days[dayIndex]
  }

  private async showDailyRecipeNotification(): Promise<void> {
    const hasPermission = await this.requestPermission()
    if (!hasPermission) return

    // Get today's recipe from localStorage
    const appData = localStorage.getItem('recipe-app-data')
    if (!appData) return

    try {
      const data = JSON.parse(appData)
      const today = this.getDayName(new Date().getDay())
      const todayRecipe = data.weeklySchedule?.[today]?.suggestedRecipe

      if (todayRecipe) {
        const notification = new Notification('🍳 Time to Cook!', {
          body: `Today you have to cook '${todayRecipe.name}'`,
          icon: '/vite.svg', // Using the existing vite icon
          badge: '/vite.svg',
          tag: 'daily-recipe',
          requireInteraction: true
        })

        notification.onclick = () => {
          window.focus()
          notification.close()
          // Navigate to weekly plan when clicked
          window.location.href = '/weekly-plan'
        }

        // Auto-close after 30 seconds
        setTimeout(() => {
          notification.close()
        }, 30000)
      }
    } catch (error) {
      console.error('Error showing notification:', error)
    }
  }

  start(): void {
    this.setupNotifications()
  }

  stop(): void {
    if (window.notificationInterval) {
      clearInterval(window.notificationInterval)
      window.notificationInterval = null
    }
  }
}

// Extend Window interface to include our interval
declare global {
  interface Window {
    notificationInterval: number | null
  }
}

export default NotificationService 