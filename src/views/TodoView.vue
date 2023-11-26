<script setup>

import { ref } from 'vue';

import draggable from 'vuedraggable';

import Card from '../components/Card.vue';
import Collaborator from '../components/menu/Collaborator.vue';
import Menu from '../components/menu/Menu.vue';

import {useBoardStore} from '../stores/boards';

const store = useBoardStore();

const currentItem = [];

const currentLane = ref([]);

const newLabel = ref({
    'text': '', 'color': ''
});

const colors = ref ([
    "rgb(123, 200, 108)",
    "rgb(245, 221, 42)",
    "rgb(250, 175, 63)",
    "rgb(205, 141, 229)",
    "rgb(91, 164, 207)",
    "rgb(109, 236, 169)",
    "rgb(22, 36, 61)",
    "rgb(247, 141, 212)"
])

const LabelColors = ref([
    "rgb(0, 194, 224)",
    "rgb(255, 120, 203)",
    "#5E4DB2",
    "#AE2E24",
    "rgb(242, 214, 0)",
    "#94C748",
])


let collaborators = ref([
    {"id": 0, "nom": 'Max', "prenom": 'Machin', "mail": 'max.machin@laplateforme.io', 'isPopUpOpen': false},
    {"id": 1, "nom": 'Test', "prenom": 'eur', "mail": 'test.eur@laplateforme.io'},
    {"id": 2, "nom": 'Ruben', "prenom": 'Habib', "mail": 'ruben.habib@laplateforme.io'},
])

const isOpen = ref(false)
const isOpen2 = ref(false)

const addLabel = ref(false)

const openMenuModal = ref(false)
const openBackgroundMenu = ref(false)

const openPhotoBackground = ref(false)
const openColorBackground = ref(false)

const openUsermodal = ref(false)
const openAddUser = ref(false)
const openArchiveMenu = ref(false)

let newUser = ref({
    "id": 0, "nom": '', "prenom": '', "mail": '', 'droit': ''
})

const labels = ref ([
    {'id': 1, 'text': 'Travail', 'color': "#FF9F1A"},
    {'id': 2, 'text': 'Annexe', 'color': "#EB5A46"},
    {'id': 3, 'text': 'Finance', 'color': "#51E898"},
    {'id': 4, 'text': 'Perso', 'color': "#C377E0"},
    {'id': 5, 'text': 'Médical', 'color': "#0079BF"},
])

const laneColor = ref([
    "#606c38",
    "#dda15e",
    "#C06C84",
    "#6C5B7B",
    "#355C7D",
    "#e76f51",
    "#bc4b51",
    "#5b8e7d",
    "#222222",

])

var archives = [];

function checkIfExist(label, labelsItem){    

    if (labelsItem){
        let exist = labelsItem.includes(label);
        if (!exist){
            labelsItem.push(label);
        }
    } else {
        labelsItem.push(label);
    }

}

function deleteItem(index, items) {
    items.splice(index, 1);
}

function deleteTask(index, currentLane){

    currentLane.task = currentLane.task.filter(element => element.id !== index)
}

function deleteLane(index){
    
    store.lanes = store.lanes.filter(element => element.id !== index)

}


function addNewItem(array){
   
    let lastItem = array.length

    let newIdItem = lastItem + 2

    array.push({"id": newIdItem, labels: [], "text": "Titre", "message": "", "priorite": "", "date": "", "color": ""})
}

function addNewLane(array){
    let lastItem = array.length

    let newIdItem = lastItem + 1

    array.push({'id': newIdItem, 'title': '','isSortOpen': false, 'isFilterOpen': false, 'sortBy': 0, task: [], filteredTask: [], searchTerm: '', limit: null, 'isPopUpOpen': false})
}

function addNewLabel(array, text, color){

    let lastItem = labels.length

    let newIdItem = lastItem + 1

    array.push({'id': newIdItem, 'text': text, 'color': color})
}


function sortLaneBy(lane, type){

    lane.sortBy = type

    if (type == 1){

        var filter = lane.task.sort((a, b) => b.priorite - a.priorite)

        lane.task = filter

    } else if (type == 2){
        var filter = lane.task.sort((a, b) => a.date - b.date)

        lane.task = filter
    } else {
        var filter = lane.task.sort((a, b) => a.id - b.id)
    }
}

function filteredList(lane) {
  
    var filter = lane.task;

    var clone = lane.task;

    if (lane.searchTerm != '' && lane.searchTerm) {
        clone = filter.filter((item) => {
          return item.text
            .toUpperCase()
            .includes(lane.searchTerm.toUpperCase())
        })
    }

    return lane.filteredTask = clone;
}

function addToArchive(lane){

    archives.push(lane)

    console.log(archives)

    deleteLane(lane.id)

}

</script>

<script>

    import VueDatePicker from '@vuepic/vue-datepicker';
    import '@vuepic/vue-datepicker/dist/main.css'  

    
</script>

<template>
    <div class="board-back" :style="{background: store.boardBackgroundColor ? store.boardBackgroundColor : store.boardBackgroundImage ? 'url('+store.boardBackgroundImage+')' : ''}">
        <div class="board-head">
            <input class="board-title" v-model="store.title" placeholder="Titre du tableau"/>

            <div style="display: flex; margin-right: 1.6rem; gap: .8rem;">
                <div class="dashboardBtn">
                    <font-awesome-icon icon="fa-solid fa-chart-column" :style="{ color: 'var(--color-text)'}" size="lg"/>
                    <p>Dashboard</p>
                </div>
                <div class="dashboardBtn" @click="openUsermodal = !openUsermodal">
                    <font-awesome-icon icon="fa-solid fa-user-group" :style="{ color: 'var(--color-text)'}" size="lg"/>
                    <p>Collaborateurs</p>
                </div>  
                <div class="dashboardBtn" @click="openMenuModal = !openMenuModal">
                    <font-awesome-icon icon="fa-solid fa-ellipsis" :style="{ color: 'var(--color-text)'}" size="lg"/>
                    <p>Menu</p>
                </div>  
            </div>
        </div>

        <div class="board">
            <div v-for="lane in store.lanes" class="lane" :style="{background: lane.color}">
                <div class="header-lane">
                    <h2 ><span @input="e => lane.title = e.target.innerText" class="lane-title" contenteditable>{{ lane.title ? lane.title : 'Ajouter un titre' }}</span></h2>
                    <div style="display: flex; gap: .8rem;">
                        <font-awesome-icon @click="lane.isSortOpen = !lane.isSortOpen" class="icon-sort" icon="fa-solid fa-sort" size="sm" :color="lane.isSortOpen ? 'white' : ''"/>
                        <font-awesome-icon @click="lane.isFilterOpen = !lane.isFilterOpen" class="icon-sort" icon="fa-solid fa-filter" size="sm" :color="lane.isFilterOpen ? 'white' : ''"/> 
                        <font-awesome-icon @click="lane.isPopUpOpen = !lane.isPopUpOpen" class="icon-sort" icon="fa-solid fa-ellipsis-vertical" size="sm" :color="lane.isPopUpOpen ? 'white' : ''" />
                    </div>
                </div>

                <div class="sort-container" v-if="lane.isSortOpen == true">
                    <p @click="sortLaneBy(lane, 1)" class="sort-item" :style="{backgroundColor: lane.sortBy == 1 ? 'rgba(235, 235, 235, 0.84)' : '', color:  lane.sortBy == 1 ? 'black' : ''}">Priorité</p>
                    <p @click="sortLaneBy(lane, 2)" class="sort-item" :style="{backgroundColor: lane.sortBy == 2 ? 'rgba(235, 235, 235, 0.84)' : '', color:  lane.sortBy == 2 ? 'black' : ''}">Date</p>
                    <font-awesome-icon icon="fa-solid fa-xmark" :style="{cursor: 'pointer', color: 'rgba(235, 235, 235, 0.84)', marginLeft: '.2rem'}" size="sm" @click="sortLaneBy(lane, 0)"/> 
                </div>
                <div class="filter-container" v-if="lane.isFilterOpen == true">
                    <div class="search-bar">
                        <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
                        <input v-model="lane.searchTerm" @keyup="filteredList(lane, lane.searchTerm)" />
                    </div>
                    
                </div>
                
                <div v-if="lane.isPopUpOpen" class="pop-up-lane">
                    <div>
                        <p>Limites :</p>
                        <input class="numberLane" type="number" v-model="lane.limit" min="1"/>
                    </div>
                    <div style="margin-top: 1rem;">
                        <p>Couleur :</p>
                        <div style="display: flex; gap: .4rem; flex-wrap: wrap;">
                            <div v-for="color in laneColor" :style="{background: color, width: '45px', height: '40px', borderRadius: '3px', cursor: 'pointer'}" @click="lane.color = color">

                            </div>
                        </div>
                        
                    </div>
                    <div class="editLane">
                        <p @click="addToArchive(lane)">Archiver</p>
                    </div>
                    <div class="deleteLane">
                        <p @click="deleteLane(lane.id)">Supprimer</p>
                    </div>
                </div>

                <div v-if="!lane.searchTerm">
                    <draggable v-model="lane.task" tag="ul" group="meals" animation="300" style="cursor: pointer; margin-top: .8rem;" @change="lane.limit ? lane.task.splice(limit) : lane.task">
                        <template #item="{ element: task }" @click="isOpen = true" :key="task.text">
                            <Card @click="isOpen = !isOpen, currentItem = task, currentLane = lane" :labels="task.labels" :msg="task.text" :priority="task.priorite" :date="task.date" :color="task.color" :fullScreen="task.fullScreen"></Card>
                        </template>
                    </draggable>
                </div>
                <div v-else>
                    <draggable v-model="lane.filteredTask" tag="ul" group="meals" animation="300" style="cursor: pointer; margin-top: .8rem;" @change="lane.limit ? lane.task.splice(limit) : lane.task">
                        <template #item="{ element: task }" @click="isOpen = true" :key="task.text">
                            <Card @click="isOpen = !isOpen, currentItem = task, currentLane = lane" :labels="task.labels" :msg="task.text" :priority="task.priorite" :date="task.date"  :color="task.color" :fullScreen="task.fullScreen">{{ task.text }}</Card>
                        </template>
                    </draggable>
                    
                </div>
                
                <p v-if="lane.id == 1" class="newCard" @click="addNewItem(lane.task)">+ Add a card</p>
            </div>

            <div class="laneAdd">
                <h2 @click="addNewLane(store.lanes)" class="lane-title" style="display: flex; align-items: center; cursor: pointer;"><font-awesome-icon class="addIcon" icon="fa-solid fa-plus" color="rgba(84, 84, 84, 0.48)" /> Ajouter une liste</h2>
            </div>
        </div>
            
        <div class="modale" v-if="isOpen">
            <div class="sub-modale" :style="{borderTop: currentItem.color ? '50px solid' : '', borderColor: currentItem.color ? currentItem.color : '' }">
                <div class="modale-header">
                    <div class="sub-modale-header">
                        <font-awesome-icon icon="fa-solid fa-pen-to-square" :style="{ color: '#172b4d'}" size="xl"/>
                        <span class="header-title-input" @input="e => currentItem.text = e.target.innerText" contenteditable>{{currentItem.text}}</span>
                    </div>
                    
                    <font-awesome-icon icon="fa-solid fa-xmark" :style="{ color: '#172b4d' , cursor: 'pointer'}" size="xl" @click="isOpen = false, isOpen2 = false"/> 
                </div>

                <div class="modale-body">

                    <div class="sub-modale-body" style="margin-top: 1.5rem;">
                        <font-awesome-icon icon="fa-solid fa-tags" :style="{ color: '#172b4d' }" size="xl"/>
                        <h3 style="font-size: 14px;">Labels</h3>
                        
                    </div>
                    <div style="margin-left: 32px;">
                        <div class="content-labels">
                            <div v-for="(label, index) in currentItem.labels" :key="index">
                                <p :style="{backgroundColor: label.color}" class="list-label-add" @click=" deleteItem(index, currentItem.labels)" >
                                    {{ label.text }}
                                </p>
                            </div>
                            <font-awesome-icon @click="isOpen2 = !isOpen2" class="addIcon" icon="fa-solid fa-plus" color="rgba(84, 84, 84, 0.48)" />

                        </div>

                        <div class="modale2" v-if="isOpen2">
                            <div class="header-modale2">
                                <p></p>
                                <p>Labels</p>
                                <font-awesome-icon icon="fa-solid fa-xmark" :style="{ color: '#5e6c84' , cursor: 'pointer'}" size="" @click="isOpen2 = false, addLabel= false, newLabel = {}"/> 
                            </div>
                            <div v-if="addLabel == false" class="sub-modale2">
                                <div v-for="label in labels">
                                    <p v-if="!currentItem.labels.includes(label)" :style="{backgroundColor: label.color}" class="list-label" @click=" checkIfExist(label, currentItem.labels)">
                                        {{ label.text }}
                                    </p>
                                </div>
                            </div>
                            <p v-if="addLabel == false" class="add-label" @click="addLabel = true">Ajouter un label</p> 

                            <div v-if="addLabel == true" class="sub-modale2">
                                <p style="font-size: 14px;">Ajoutez un titre : </p>
                                <input v-model="newLabel.text" class="addTitle" :style="{backgroundColor: newLabel.color ? newLabel.color : '#091e4214', color: newLabel.color ? 'white' : 'var(--vt-c-black-mute)'}" />
                                <p style="font-size: 14px;">Choisissez une couleur : </p>
                                <div v-for="color in LabelColors" class="newLabelColor" >
                                    <div v-if="!labels.filter(e => e.color === color).length > 0" :style="{backgroundColor: color, borderLeft: newLabel.color == color ? '12px solid #36383c4f' : '', display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}" class="list-label" @click=" newLabel.color = color ">
                                        {{ " &nbsp" }}
                                    </div>
                                    <div v-else style="display: none;">

                                    </div>
                                    <font-awesome-icon v-if="newLabel.color == color" icon="fa-solid fa-xmark" :style="{ color: 'var(--vt-c-divider-light-1)', zIndex: 10}" size="sm" @click="newLabel.color = null"/> 
                                </div>
                                <button class="addBtn" @click="addNewLabel(labels, newLabel.text, newLabel.color), addLabel = false, newLabel = {}">Ajouter</button>
                                <button class="cancelBtn" @click="addLabel = false , newLabel = {}">Annuler</button>
                            </div> 
                        </div>
                        
                    </div> 

                    <div class="sub-modale-body" style="margin-top: 32px;">
                        <font-awesome-icon icon="fa-solid fa-bars-staggered" :style="{ color: '#172b4d' }" size="xl"/>
                        <h3 style="font-size: 14px;">Description</h3>
                    </div> 
                    <textarea class="desc" v-model="currentItem.message" placeholder="Ajouter une description">{{ currentItem.message }}</textarea>
                    
                    <div class="sub-modale-body" style="margin-top: 1.2rem;">
                        <font-awesome-icon icon="fa-solid fa-arrow-trend-up" :style="{ color: '#172b4d' }" size="xl"/>
                        <h3 style="font-size: 14px;">Priorité</h3>
                    </div> 

                    <select v-model="currentItem.priorite" class="select" placeholder="Choisir un ordre de priorité">
                        <option value="" disabled selected style="color: var(--vt-c-divider-dark-1);">Ordre de priorité</option>
                        <option value="3">Urgent</option>
                        <option value="2">Important</option>
                        <option value="1">Secondaire</option>
                        <option value="">Aucun</option>
                    </select>


                    <div class="sub-modale-body" style="margin-top: 1.5rem;">
                        <font-awesome-icon icon="fa-regular fa-clock"  :style="{ color: '#172b4d' }" size="xl"/>
                        <h3 style="font-size: 14px;">Date d'échéance</h3>
                    </div> 
                    <VueDatePicker style="width: 30%; margin-left: 32px; margin-top: .8rem; font-size: 14px;" z-index="0" :enable-time-picker="false" v-model="currentItem.date" placeholder="Choisir une date"></VueDatePicker>

                    <div class="sub-modale-body" style="margin-top: 1.2rem;">
                        <font-awesome-icon icon="fa-solid fa-paint-roller" :style="{ color: '#172b4d' }" size="xl"/>
                        <h3 style="font-size: 14px;">Couverture</h3>
                    </div> 

                    <div class="colors">
                        <div v-for="color in colors" class="color" :style="{backgroundColor: color, border: currentItem.color == color ? '4px solid #36383c30' : ''}" @click="currentItem.color = color">
                        </div>
                        <font-awesome-icon v-if="currentItem.color !== null" icon="fa-solid fa-xmark" :style="{cursor: 'pointer', marginLeft: '.2rem'}" size="sm" @click="currentItem.color = null"/> 
                    </div>
                    <div class="fullScreen">
                        <input v-model="currentItem.fullScreen" type="checkbox" />
                        <font-awesome-icon icon="fa-regular fa-id-card" :style="{ color: '#172b4d' }" size="xl"/>
                    </div>  

                    <div class="deleteItem" @click="deleteTask(currentItem.id, currentLane), isOpen = false">
                        <font-awesome-icon icon="fa-solid fa-trash" color="#ff0000 " />
                        <p style="color: #ff0000;">Supprimer</p>
                    </div>
                </div>
            </div>
        </div> 

        <Menu 
            :openMenuModal="openMenuModal"
            :openBackgroundMenu="openBackgroundMenu"
            :openArchiveMenu="openArchiveMenu"
            :openPhotoBackground="openPhotoBackground"
            :openColorBackground="openColorBackground"
        />

        <Collaborator 
            :openUsermodal="openUsermodal" 
            :openBackgroundMenu="openBackgroundMenu" 
            :openAddUser="openAddUser" 
            :openPhotoBackground="openPhotoBackground" 
            :collaborators="collaborators"
            :newUser="newUser"
        />
       
    </div>
</template>



<style setup>

    .board-back {
        background-position: center;
        background-size: cover;
        margin-top: .8rem;
        padding-top: 1.4rem;
        height: 100%;
        min-height: 89vh;
    }

    .board {
        min-height: 75vh;
        display: flex;
        justify-content: flex-start;
        margin: 1rem 0.8rem;
        overflow-y: hidden;
        overflow-x: visible;
    }

    .board-head {
        display: flex;
        justify-content: space-between;
    }

    .board-title {
        margin: 0 1.6rem 0;
        padding: .6rem .8rem;
        border: none;
        font-weight: 700;
        border-radius: 3px;
        color: var(--color-text);
        font-size: 18px;
        background-color: #222222;
        box-shadow: none;
    }

    .dashboardBtn {
        display: flex;
        gap: .4rem;
        background-color: #222222;
        align-items: center;
        border-radius: 3px;
        padding: .4rem 1.6rem;
        font-size: 14px;
        cursor: pointer;
    }

    .dashboardBtn:hover {
        background-color: #2d2d2d;
    }

    .archive-card {
        cursor: pointer;
        padding: .4rem .8rem;
        border-radius: 3px;
        background-color: var(--vt-c-indigo);
    }

    .menu-body-background {
        display: flex;
        align-items: center;
        margin: .6rem .4rem;
        padding: .5rem;
        gap: .6rem;
        cursor: pointer;
    }
    

    .menu-body-background:hover{
        background: #9fadbc18;
        padding: .5rem;
        border-radius: 3px;
    }

    .menu-actions-background {
        display: flex;
        justify-content: space-between;
        margin: .4rem;
        gap: .8rem;
    }

    .menu-actions-background div {
        cursor: pointer;
        width: 100%;
        text-align: center;
    }

    .menu-actions-background div:hover img, .menu-photos-background div:hover img {
        opacity: 0.6;
    }

    .menu-actions-background div img  {
        object-fit: cover;
        height: 80%;
        width: 100%;
        border-radius: 6px;
    }

    .menu-photos-background div {
        height: 85px;
    }

    .menu-photos-background div img {
        object-fit: cover;
        height: 100%;
        width: 100%;
        border-radius: 6px;
        cursor: pointer;
    }

    .menu-photos-background {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        justify-content: space-between;
        margin: .4rem;
        gap: .4rem;
    }

    .menu-colors-background div {
        height: 50px;
        border-radius: 3px;
        cursor: pointer;
    }

    .menu-colors-background {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        justify-content: space-between;
        margin: .4rem;
        gap: .4rem;
    }

    .collab-item {
        position: relative;
        background-color: #2d2d2d;
        padding: .4rem .6rem;
        border-radius: 3px;
        margin-top: .8rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: .8rem;
        cursor: pointer;
    }

    .collab-item:hover {
        background-color: rgba(85, 77, 77, 0.549);
    }

    .initial {
        background-color:#424242;
        height: 45px;
        width: 45px;
        border-radius: 50%;
    }

    .initial p {
        text-transform: uppercase;
        text-align: center;
        line-height: 45px;
    }

    .popupUser {
        background: #e6e6e6;
        position: absolute;
        width: 100%;
        right: 0;
        bottom: -130px;
        border-radius: 3px;
        margin-top: 2rem;
        z-index: 100;
        padding: .8rem 1.2rem;
        color: #424242;
    }

    .divDroit {
        margin-bottom: .4rem;
    }

    /* width */
    ::-webkit-scrollbar {
        width: 10px;
        height: 10px;
        border-radius: 6px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background: var(--vt-c-black-soft);
        border-radius: 6px;

    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background-color: var(--vt-c-divider-dark-1);
        border-radius: 6px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: #555;
        border-radius: 6px;
    }

    .lane {
        background-color: var(--vt-c-black-soft);
        min-height: 25rem;
        height: fit-content;
        min-width: 20rem;
        width: 21rem;
        border-radius: .4rem;
        margin: .2rem .8rem;
        padding: .4rem .8rem;
        position: relative;
    }

    .laneAdd {
        background-color: var(--vt-c-black-soft);
        height: fit-content;
        min-width: 20rem;
        width: 20rem;
        border-radius: .2rem;
        margin: .2rem .8rem;
        padding: .4rem .8rem;
    }

    .lane-title {
        font-weight: bold;
        font-size: 13px;
        background-color: transparent;
        border: none;
        color: var(--color-text);
    }

    .lane ul {
        margin-top: .2rem;
        padding-left: .4rem;
        list-style: none;
        width: 100%;
        min-height: 100px;
    }

    .header-lane {
        margin: 0rem .6rem 0rem;
        padding: 0rem .4rem .1rem .2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .icon-sort {
        cursor: pointer;
    }

    .sort-container {
        display: flex;
        margin: 0rem .6rem 0rem .6rem;
        gap: .6rem;
        align-items: center;
    }

    .sort-item {
        font-size: 14px;
        background-color: var(--vt-c-divider-dark-1);
        padding: .3rem .8rem;
        border-radius: 3px;
        cursor: pointer;
    }

    .sort-item:hover {
        background-color: rgba(84, 84, 84, 0.896);
    }

    .filter-container {
        display: flex;
        align-items: center;
        background-color: var(--vt-c-divider-dark-1);
        border-radius: 3px;
        padding: .4rem 1rem;
        font-size: 14px;
        margin-top: .8rem;
        margin-bottom: .8rem;
        margin-left: .4rem;
    }

    .filter-container input {
        background: none;
        border: none;
        outline: none;
        margin-left: .8rem;
        color: var(--color-text);
        font-size: 14px;
    }

    .pop-up-lane {
        padding: 1rem 1.6rem;
        position: absolute;
        margin-top: .4rem;
        left: 0;
        width: 100%;
        height: 20rem;
        background-color: #e6e6e6;
        border-radius: 3px;
        color: #222222;
        font-size: 14px;
    }

    .numberLane {
        margin-top: .4rem;
        border: none;
        outline: none;
        width: 40%;
        border-radius: 3px;
        padding: .4rem;
        background-color: #091a3614;
    }

    .deleteLane {
        color: #ff0000;
        cursor: pointer;
        width: fit-content;
        padding: .4rem .8rem;
        border-radius: 3px;
    }

    .deleteLane:hover {
        background-color: #dd20203e;
    }

    .editLane {
        margin-top: 2rem;
        color: var(--color-black);
        cursor: pointer;
        width: fit-content;
        padding: .4rem .8rem;
        border-radius: 3px;
    }

    .editLane:hover {
        background-color: #2ba8f034;
    }

    .editLaneUser {
        margin-top: 0rem;
        color: var(--color-black);
        cursor: pointer;
        width: fit-content;
        padding: .4rem .8rem;
        background-color: #091a3614;
        border-radius: 3px;
    }

    .editLaneUser:hover {
        background-color: #2ba8f034;
    }

    .newCard {
        font-size: 13px;
        font-weight: 500;
        cursor: pointer;
        margin: .8rem .6rem;
    }

    .newCard:hover {
        transition: .1s ease-in;
        color: hsla(160, 100%, 37%, 1);
    }

    .modale {
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgba(0,0,0, 0.3);
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .modale .sub-modale {
        background: #f4f5f7;
        width: 35%;
        padding: 1.2rem;
        border-radius: 10px;
        color: black;
    }

    .modale-header {
        display: flex;
        justify-content: space-between;
        padding-bottom: .4rem;
    }

    .sub-modale-header {
        display: flex;
        gap: .8rem;
        align-items: center;
    }

    .header-title-input {
        padding: 0 .4rem 0 .2rem;
        border: none;
        font-size: 15px;
    }

    .modale-body {
        margin-top: 1.5rem;
    }

    .sub-modale-body {
        display: flex;
        gap: .8rem;
        align-items: center;
    }

    .sub-modale-body h3 {
        font-weight: 500;
    }

    .desc {
        margin-top: .8rem;
        resize: none !important;
        height: 56px;
        border-radius: 3px;
        background-color: #091e420a;
        border: none;
        width: calc(100% - 40px) ;
        padding: 8px 12px;
        font-family: inherit;
        font-size: 14px;
        box-shadow: none;
        margin-left: 32px;
        cursor: pointer;
    }

    .desc:focus {
        box-shadow: inset 0 0 0 2px #0079bf; 
        border: none;
        outline: none;
    }

    .modale-body .select {
        border-radius: 3px;
        margin-top: .8rem;
        border: none;
        margin-left: 32px;
        width: 30%;
        display: flex;
        flex-direction: column;
        gap: 32px;
        padding: .4rem;
        font-size: 14px;
        cursor: pointer;
    }

    .select option {
        cursor: pointer;
    }

    .modale-body .select:active, .select:focus {
        border: none;
        outline: none;
    }
     .test {
        color: #36383c4f;
     }

    .addIcon {
        background-color: #091e420a;
        padding: .6rem;
        cursor: pointer;
    }

    .addIconCollab {
        background-color: #2d2d2d;
        padding: .6rem;
        margin-top: .8rem;
        cursor: pointer;
    }

    .addIconCollab:hover {
        background-color: rgba(85, 77, 77, 0.549);
    }

    .userInput {
        background-color: var(--vt-c-divider-dark-1);
        border: none;
        outline:none;
        padding: .6rem;
        color: var(--color-black);
    }

    .list-label {
        list-style: none;
        border-radius: .2rem;
        padding: .3rem .8rem;
        width: 100%;
        color: white;
        font-weight: 500;
        cursor: pointer;
        font-size: 14px;
    }

    .list-label-add {
        list-style: none;
        border-radius: .2rem;
        padding: .3rem .8rem;
        width: fit-content;
        color: white;
        font-weight: 500;
        cursor: pointer;
        font-size: 14px;
    }

    .content-labels {
        display: flex;
        flex-wrap: wrap;
        gap: .4rem;
        align-items: center;
        margin: .8rem 0;
    }

    .modale2 {
        width: 15%;
        position: absolute;
        background-color:#fff;
        padding: 0.6rem .6rem .6rem;
        border-radius: 3px;
        box-shadow: 0 8px 16px -4px #091e4240, 0 0 0 1px #091e4214;
        z-index: 100;
    }

    .header-modale2 {
        font-size: 14px;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid rgba(128,128,128,.308);
        margin-bottom: .4rem;
        color: #5e6c84;
    }

    .sub-modale2 {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: .4rem;
    }

    .add-label {
        font-size: 14px;
        margin-top: .6rem;
        background-color: #091e4214;
        width: 100%;
        text-align: center;
        border-radius: .2rem;
        padding: .2rem 1.2rem;
        cursor: pointer;
    }

    .add-label:hover {
        background-color: #08193620;
    }

    .addTitle {
        border: none;
        outline: none;
        /* background: #091e4214; */
        border-radius: 3px;
        padding: .6rem 1.2rem;
        font-size: 13px;
        color: #fff;
        font-weight: 600;
    }

    .newLabelColor {
        display: flex;
        align-items: center;
        gap: .4rem;
    }

    .addBtn {
        outline: none;
        border: none;
        background-color: #091e4214;
        text-align: center;
        padding: .6rem 1.2rem;
        border-radius: 3px;
        font-size: 13px;
        cursor: pointer;
        margin-top: .4rem;
    }

    .addBtn:hover {
        background-color: #2ba8f034;
    }

    .cancelBtn {
        outline: none;
        border: none;
        background-color: #091e4214;
        text-align: center;
        padding: .6rem 1.2rem;
        border-radius: 3px;
        font-size: 13px;
        cursor: pointer;
        margin-top: .1rem;
    }

    .cancelBtn:hover {
        background-color: #dd20203e;
    }

    .dp__input {
        font-size: 14px;
    }

    .colors {
        margin: .8rem 2rem;
        gap: .4rem;
        display: flex;
        align-items: center;
    }
    .color {
        cursor: pointer;
        width: 60px;
        height: 20px;
    }

    .color:hover {
        opacity: .7;
    }

    .fullScreen {
        display: flex;
        margin-left: 32px;
        gap: .6rem;
    }

    .deleteItem {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 2rem;
        margin-left: 32px;
        gap: .4rem;
        background-color: #091a3614;
        width: 30%;
        text-align: center;
        padding: .3rem 1.2rem;
        border-radius: 3px;
        font-size: 14px;
        cursor: pointer;
    }
    
    .deleteItem:hover {
        background-color: #dd20203e;    
    }

</style>
