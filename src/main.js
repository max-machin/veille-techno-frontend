import './assets/main.css'

import { createApp } from 'vue'
// Import de l'instance Pinia : Store
import { createPinia } from 'pinia'

// Import du plugin de persistance de données
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faUserSecret, faEllipsis, faBoxArchive, faChevronLeft, faSquare, faHeading, faChartColumn, faPenToSquare, faCircleHalfStroke, faXmark, faBarsStaggered, faArrowTrendUp, faTags, faPlus, faTrash, faSort, faFilter, faMagnifyingGlass, faEllipsisVertical, faPaintRoller, faUserGroup, faUser } from '@fortawesome/free-solid-svg-icons'
import { faIdCard, faClock } from '@fortawesome/free-regular-svg-icons'

/* add icons to the library */
library.add(faUserSecret, faEllipsis, faBoxArchive, faChevronLeft,  faSquare, faHeading, faChartColumn, faPenToSquare, faCircleHalfStroke, faXmark, faIdCard, faBarsStaggered, faArrowTrendUp, faTags, faPlus, faClock, faTrash, faSort, faFilter, faMagnifyingGlass, faEllipsisVertical, faPaintRoller, faUserGroup)

import App from './App.vue'
import router from './router'

const app = createApp(App)

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)
.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
