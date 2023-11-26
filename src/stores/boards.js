import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useBoardStore = defineStore('board', () => {

    const lanes = ref([
        {'id': 1, 'title': "A faire", 'isSortOpen': false, 'isFilterOpen': false, 'sortBy': 0, task: [
            {'id': 2, "text": "Tâche 1 : Acheter le pain", "message": "Il faut que j'aille acheter le pain aujourd'hui", "priorite": "1", labels: [{'id': 3, 'text': 'Finance', 'color': "#51E898"},{'id': 4, 'text': 'Perso', 'color': "#C377E0"},], "date": new Date()},
            {'id': 3, "text": "Tâche 2 : Acheter les clopes", "message": "", "priorite": "2", labels: [], "date": new Date()},
            {'id': 4, "text": "Tâche 3 : Ticket sportif", "message": "", "priorite": "3", labels: [{'id': 1, 'text': 'Travail', 'color': "#FF9F1A"},], "date": new Date(2023, 10, 22)},
            {'id': 5, "text": "Tâche 4 : Salle de sport", "message": "", "priorite": "", labels: [], "date": new Date(2023, 10, 14)}
        ]},
        {'id': 2, 'title': "En cours", 'isSortOpen': false, 'isFilterOpen': false, 'sortBy': 0, task: []},
        {'id': 3, 'title': "Terminé", 'isSortOpen': false, 'isFilterOpen': false,'sortBy': 0, task: []},
        {'id': 4, 'title': "Pense bête", 'isSortOpen': false, 'isFilterOpen': false, 'sortBy': 0, task: []}
    ])

    const count = ref(0)
    const doubleCount = computed(() => count.value * 2)
    function increment() {
        count.value++
    }

    var boardBackgroundColor = ref(null)

    function setboardBackgroundColor(value){
        console.log(value)
        boardBackgroundColor.value = value
    }

    var boardBackgroundImage = ref(null)

    function setboardBackgroundImage(value){
        boardBackgroundImage.value = value
    }

    const title = ref("")

    return { 
        count, 
        doubleCount, 
        increment, 
        lanes, 
        boardBackgroundColor,
        setboardBackgroundColor,
        boardBackgroundImage , 
        setboardBackgroundImage,
        title
    }
    }, 
    {
        persist: true
    }
)
