import { defineConfig } from 'vite'

export default defineConfig({
  // Настройка указывает фреймворку собирать проект под серверную среду Vercel
  server: {
    // @ts-expect-error preset поле читается плагином сборки
    preset: 'vercel'
  }
})
