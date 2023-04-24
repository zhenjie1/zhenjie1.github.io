import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import VueMacros from 'unplugin-vue-macros/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Unocss from 'unocss/vite'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { visualizer } from 'rollup-plugin-visualizer'
import { createHtmlPlugin } from 'vite-plugin-html'

// https://vitejs.dev/config/
export default defineConfig((options) => {

  return {
    base: './',
    resolve: {
      alias: {
        '~/': `${path.resolve(__dirname, 'src')}/`,
      },
    },

    build: {
      target: 'modules', // 设置最终构建的浏览器兼容目标。modules:支持原生 ES 模块的浏览器
      sourcemap: false, // 构建后是否生成 source map 文件
      minify: 'terser', // 混淆器
      cssCodeSplit: true, // 启用/禁用 CSS 代码拆分
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      }, // 去除 console debugger
      rollupOptions: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().match(/node_modules(.(?!node_modules))*$/)![0].split('/')[1]
          }
        },
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        },
      }, // 将打包后的资源分开
    },
    plugins: [
      VueMacros({
        plugins: {
          vue: Vue({
            include: [/\.vue$/],
            reactivityTransform: true,
          }),
        },
      }),
      // https://github.com/hannoeru/vite-plugin-pages
      Pages({
        extensions: ['vue'],
      }),
      // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
      Layouts(),

      // https://github.com/antfu/unplugin-auto-import
      AutoImport({
        imports: [
          'vue',
          'vue/macros',
          'vue-router',
          '@vueuse/head',
          '@vueuse/core',
        ],
        dts: 'src/auto-imports.d.ts',
        dirs: [
          'src/composables',
          'src/stores',
        ],
        // vueTemplate: true,
      }),
      // https://github.com/antfu/unplugin-vue-components
      Components({
        // allow auto load markdown components under `./src/components/`
        extensions: ['vue'],
        // allow auto import and register components used in markdown
        include: [/\.vue$/, /\.vue\?vue/, /\.ts$/, /\.tsx$/],
        dts: 'src/components.d.ts',
      }),

      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]',

        /**
         * 自定义插入位置
         * @default: body-last
         */
        // inject?: 'body-last' | 'body-first'

        /**
         * custom dom id
         * @default: __svg__icons__dom__
         */
        // customDomId: '__svg__icons__dom__',
      }),
      Unocss(),
      visualizer(),
    ],
  }
})
