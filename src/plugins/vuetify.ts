import { App } from 'vue'
import { createVuetify } from 'vuetify'
import { createVueI18nAdapter } from 'vuetify/locale/adapters/vue-i18n'
import { createI18n, useI18n } from 'vue-i18n'
import { en, es } from 'vuetify/locale'

const messages = {
    en: {
        $vuetify: {
            ...en,
            dataIterator: {
                rowsPerPageText: 'Items per page:',
                pageText: '{0}-{1} of {2}',
            },
        },
    },
    es: {
        $vuetify: {
            ...es,
            dataIterator: {
                rowsPerPageText: 'Elementos por página:',
                pageText: '{0}-{1} de {2}',
            },
        },
    },
}

const i18n = createI18n({
    legacy: false,
    locale: 'en',
    fallbackLocale: 'en',
    messages,
})

const vuetify = createVuetify({
    locale: {
        adapter: createVueI18nAdapter({ i18n, useI18n }),
    },
})

export function registerVuetify(app: App) {
    app.use(vuetify)
}
