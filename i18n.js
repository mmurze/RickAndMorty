import { createI18n } from 'vue-i18n'

function loadLocaleMessages() {
	const messages = {}
	
	const localeFiles = import.meta.glob('./locales/**/*.json', { eager: true })
	
	for (const path in localeFiles) {
		const matched = path.match(/\/([A-Za-z0-9-_]+)\/([A-Za-z0-9-_]+)\.json$/)
		if (matched) {
			const locale = matched[1]
			const module = matched[2]
			messages[locale] = messages[locale] || {}
			messages[locale][module] = localeFiles[path]
		}
	}
	
	return messages
}

const i18n = createI18n({
	locale: 'ru', // Язык по умолчанию
	fallbackLocale: 'ru', // Резервный язык
	messages: loadLocaleMessages() // Автоматическая загрузка переводов
})

export default i18n
