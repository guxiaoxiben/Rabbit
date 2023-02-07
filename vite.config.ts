import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
export default defineConfig({
  plugins: [vue(), vueSetupExtend()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  // 配置开发服务器
  server: {
    host: "www.corho.com", //主机地址
    port: 8080, // 端口号
    open: true, //打开浏览器
    cors: true //允许ajax跨域
  },
  css: {
    preprocessorOptions: {
      less: {
        additionalData: `
          @import "@/assets/styles/variables.less";
          @import "@/assets/styles/mixins.less";
        `
      }
    }
  }
})
