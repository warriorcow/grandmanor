import { defineConfig } from 'vite'
import path from 'path'
import pugPlugin from 'vite-plugin-pug'

export default defineConfig({
    plugins: [
        pugPlugin({
            pretty: true,
            localImports: true
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@images': path.resolve(__dirname, './src/assets/images'),
            '@assets': path.resolve(__dirname, './src/assets')
        }
    },

    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
                  @use "@/styles/mixins" as *;
                  @use "@/styles/variables" as *;
                `
            }
        }
    },
    root: '.',
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        rollupOptions: {
            input: './index.html'
        },
        // Важно: устанавливаем базовый путь для продакшена
        assetsInlineLimit: 0
    },
    // Решаем проблему с путями
    base: './', // относительные пути вместо абсолютных
})
