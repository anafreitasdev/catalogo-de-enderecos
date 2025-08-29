import { useI18n } from 'vue-i18n'
import { watch } from 'vue'

export function usePageTitle() {
  const { t, locale } = useI18n()

  const updatePageTitle = () => {
    document.title = t('pageTitle')
    document.documentElement.lang = locale.value
  }

  watch(locale, updatePageTitle, { immediate: true })

  return {
    updatePageTitle
  }
}
