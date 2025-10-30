import { defineConfig } from 'vite'
import path from 'path'
import pugPlugin from 'vite-plugin-pug'

export default defineConfig({
    plugins: [pugPlugin({ pretty: true })],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
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
    }
})
