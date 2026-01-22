
import { useCookie, defineNuxtPlugin } from '#imports'

export default defineNuxtPlugin((nuxtApp) => {
    const lang = useCookie('lang')
    if(!lang.value)return
    const { locale } = nuxtApp.$i18n
    locale.value = lang.value
})