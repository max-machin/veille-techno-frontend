import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

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

app.use(createPinia())
app.use(router)
.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
