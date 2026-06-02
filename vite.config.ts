import { defineConfig } from 'vite'

export default defineConfig({
  // Настройка указывает фреймворку собирать проект под серверную среду Vercel
  server: {
    preset: 'vercel'
  }
})
