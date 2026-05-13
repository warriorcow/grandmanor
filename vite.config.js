import { defineConfig } from 'vite'
import path from 'path'
import pugPlugin from 'vite-plugin-pug'

const options = { pretty: true } // FIXME: pug pretty is deprecated!
const locals = {
    title: 'My Website',
    // добавьте другие переменные, если нужно
}

export default defineConfig({
    plugins: [
        pugPlugin({
            pretty: true,
            localImports: true,
            // Важно: настройка обработки как модулей
            moduleOptions: {
                locals: locals
            }
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@images': path.resolve(__dirname, './src/assets/images'),
            '@assets': path.resolve(__dirname, './src/assets'),
            '@components': path.resolve(__dirname, './src/components')
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
            input: {
                main: path.resolve(__dirname, 'index.html'),
                catalog: path.resolve(__dirname, 'catalog.html'),
                product: path.resolve(__dirname, 'product.html'),
            }
        },
        assetsInlineLimit: 0
    },
    base: './',
})