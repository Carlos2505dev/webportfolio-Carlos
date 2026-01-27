import { defineNuxtConfig } from 'nuxt/config'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'url'
import VueI18nVitePlugin from '@intlify/unplugin-vue-i18n/vite'

export default defineNuxtConfig({
    app: {
        //head
        head: {
            charset: 'UTF-8',
            viewport: 'width=device-width, initial-scale=1.0',
            title: 'Carlos Neto | Developer Fullstack & Designer',
            meta: [
                { name: 'description', content: 'Portfólio de Carlos Neto - Developer Fullstack & Designer. Especialista em criar experiências digitais únicas.' },
                { name: 'theme-color', content: '#000000' },
                { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' }
            ],
            link: [
                { rel: 'icon', type: 'image/png', href: '/favicon.png' }]
        },
        //project pages & layout transitions
        pageTransition: {
            name: 'page', mode: 'out-in'
        },
        layoutTransition: {
            name: 'layout', mode: 'out-in'
        }
    },

    //GTM
    gtm: {
        id: 'GTM-MVCQMF2', // Your GTM single container ID, array of container ids ['GTM-xxxxxx', 'GTM-yyyyyy'] or array of objects [{id: 'GTM-xxxxxx', queryParams: { gtm_auth: 'abc123', gtm_preview: 'env-4', gtm_cookies_win: 'x'}}, {id: 'GTM-yyyyyy', queryParams: {gtm_auth: 'abc234', gtm_preview: 'env-5', gtm_cookies_win: 'x'}}], // Your GTM single container ID or array of container ids ['GTM-xxxxxx', 'GTM-yyyyyy']
        // queryParams: {
        //     // Add URL query string when loading gtm.js with GTM ID (required when using custom environments)
        //     gtm_auth: 'AB7cDEf3GHIjkl-MnOP8qr',
        //     gtm_preview: 'env-4',
        //     gtm_cookies_win: 'x'
        // },
        defer: false, // Script can be set to `defer` to speed up page load at the cost of less accurate results (in case visitor leaves before script is loaded, which is unlikely but possible). Defaults to false, so the script is loaded `async` by default
        compatibility: false, // Will add `async` and `defer` to the script tag to not block requests for old browsers that do not support `async`
        nonce: '2726c7f26c', // Will add `nonce` to the script tag
        enabled: true, // defaults to true. Plugin can be disabled by setting this to false for Ex: enabled: !!GDPR_Cookie (optional)
        debug: true, // Whether or not display console logs debugs (optional)
        loadScript: true, // Whether or not to load the GTM Script (Helpful if you are including GTM manually, but need the dataLayer functionality in your components) (optional)
        enableRouterSync: true, // Pass the router instance of your app to automatically sync with router (optional)
        trackOnNextTick: false, // Whether or not call trackView in Vue.nextTick
        devtools: true // (optional)
    },

    //main scss
    css: ['@/assets/scss/main.scss'],

    //vite
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@use "@/assets/scss/variables.scss" as *;'
                }
            }
        },
        plugins: [
            VueI18nVitePlugin({
                include: [
                    resolve(dirname(fileURLToPath(import.meta.url)), './locales/*.json')
                ],
                strictMessage: false
            })
        ]
    },

    modules: [
        '@nuxt/icon',
        '@nuxt/image',
        '@nuxtjs/color-mode',
        '@pinia/nuxt',
        '@vueuse/nuxt',
        '@nuxtjs/i18n',
        '@zadigetvoltaire/nuxt-gtm'
    ],

    i18n: {
        vueI18n: './i18n.config.ts'
    },

    //color mode
    colorMode: {
        preference: 'dark', // default value of $colorMode.preference    
        fallback: 'dark', // fallback value if not system preference found    
        classSuffix: '-theme'
    },

    //nuxt image
    image: {
        quality: 80,
        densities: [1, 2, 3],
        format: ['webp', 'svg'],
        //image sizes
        presets: {
            cover: {
                modifiers: {
                    fit: 'cover',
                    width: 300,
                    height: 300
                }
            }
        },
        //responsive screens for nuxt images
        screens: {
            xs: 320,
            sm: 640,
            md: 768,
            lg: 1024,
            xl: 1280,
            xxl: 1536
        }
    },

    //pinia config
    pinia: {
        autoImports: [
            // automatically imports `defineStore`
            'defineStore', // import { defineStore } from 'pinia'
            ['defineStore', 'definePiniaStore'] // import { defineStore as definePiniaStore } from 'pinia'
        ]
    },

    icon: {
        customCollections: [
            {
                prefix: 'carlos-icon',
                dir: './assets/carlos-icons'
            }
        ]
    },

    compatibilityDate: '2025-01-22'
})