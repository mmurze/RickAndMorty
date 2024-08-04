import 'vuetify/styles'
// import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import { mdi } from 'vuetify/iconsets/mdi'

const vuetify = createVuetify({
	icons: {
		defaultSet: 'mdi',
		sets: {
			mdi,
		},
	},
	components,
})
export default vuetify
