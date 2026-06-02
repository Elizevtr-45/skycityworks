import { defineConfig } from 'vite'
import { configDefaults } from 'vitest/config'

export default defineConfig({
  // Настройка указывает фреймворку собирать проект под серверную среду Vercel
  server: {
    preset: 'vercel'
  },
  test: {
    exclude: [...configDefaults.exclude, 'e2e/*']
  }
})
