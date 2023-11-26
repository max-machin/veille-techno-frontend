<script setup>

    import { ref } from 'vue';

    import {useBoardStore} from '../../stores/boards';

    const store = useBoardStore();

    defineProps({
        openMenuModal: {
            type: Boolean
        },
        openBackgroundMenu: {
            type: Boolean
        },
        openArchiveMenu: {
            type: Boolean
        },
        openPhotoBackground: {
            type: Boolean
        },
        openColorBackground: {
            type: Boolean
        },
    });

    const unsplashPhotos = ref([
        "1.jpg",
        "2.jpg",
        "3.jpg",
        "4.jpg",
        "5.jpg",
        "6.jpg",
        "7.jpg",
        "8.jpg",
        "9.jpg",
        "10.jpg",
        "11.jpg",
        "12.jpg",
        "13.jpg",
        "14.jpg",
    ])

    const backgroundColors = ref ([
        "rgb(0, 121, 191)",
        "rgb(210, 144, 52)",
        "rgb(81, 152, 57)",
        "rgb(176, 70, 50)",
        "rgb(137, 96, 158)",
        "rgb(205, 90, 145)",
        "rgb(75, 191, 107)",
        "rgb(0, 174, 204)",
        "rgb(131, 140, 145)"
    ])

    const backgroundGradient = ref([
        "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",
        "linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)",
        "radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)",
        "linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)",
        "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)"
    ]);

    function addBackgroundImage(tableau, image){

        if (tableau.boardBackgroundImage == image){
            tableau.setboardBackgroundImage(null)
        } else {
            tableau.setboardBackgroundImage(image)
        }

    }

    function addBackgroundColor(tableau, color){

        if (tableau.boardBackgroundColor == color){
            store.setboardBackgroundColor(null)
        } else {
            store.setboardBackgroundColor(color)
        }

    }

</script>

<template>
    <div v-if="openMenuModal" class="menu-modal">
        <div class="blur" @click="openMenuModal = false"></div>

        <div class="menu-sub-modal">
            <div >

                <div v-if="!openBackgroundMenu && !openArchiveMenu" class="menu-header">
                    <p></p>
                    <p>Menu</p>
                    <font-awesome-icon class="close-menu" icon="fa-solid fa-xmark" :style="{cursor: 'pointer'}" @click="openMenuModal = false"/> 
                </div>

                <div v-if="openBackgroundMenu && !openPhotoBackground && !openColorBackground" class="menu-header">
                    <font-awesome-icon class="close-menu" icon="fa-solid fa-chevron-left" :style="{ cursor: 'pointer'}" size="sm" @click=" openBackgroundMenu = false"/>
                    <p>Fond d'écran</p>
                    <font-awesome-icon class="close-menu" icon="fa-solid fa-xmark" :style="{ cursor: 'pointer'}" @click="openMenuModal = false, openBackgroundMenu = false, openPhotoBackground = false"/> 
                </div>

                <div v-if="openPhotoBackground" class="menu-header">
                    <font-awesome-icon class="close-menu" icon="fa-solid fa-chevron-left" :style="{ cursor: 'pointer'}" size="sm" @click=" openPhotoBackground = false"/>
                    <p>Photo d'<a href="https://unsplash.com/?utm_source=trello&amp;utm_medium=referral&amp;utm_campaign=api-credit" target="_blank">Unsplash</a></p>
                    <font-awesome-icon class="close-menu" icon="fa-solid fa-xmark" :style="{ cursor: 'pointer'}" @click="openMenuModal = false, openBackgroundMenu = false, openPhotoBackground = false" /> 
                </div>

                <div v-if="openColorBackground" class="menu-header">
                    <font-awesome-icon class="close-menu" icon="fa-solid fa-chevron-left" :style="{ cursor: 'pointer'}" size="sm" @click=" openColorBackground = false"/>
                    <p>Couleurs</p>
                    <font-awesome-icon class="close-menu" icon="fa-solid fa-xmark" :style="{ cursor: 'pointer'}" @click="openMenuModal = false, openBackgroundMenu = false, openColorBackground = false" /> 
                </div>

                <div v-if="!openBackgroundMenu && !openArchiveMenu" class="menu-body">

                    <div class="menu-body-background" @click="openBackgroundMenu = true, openUsermodal = false">
                        <font-awesome-icon icon="fa-solid fa-square" size="xl" color="var(--vt-c-indigo)"/>
                        <p>Changer le fond d'écran</p>
                    </div>
                </div>  

                <div v-if="!openBackgroundMenu && !openArchiveMenu" class="menu-body">
                    <div class="menu-body-background" @click="openArchiveMenu = true">
                        <font-awesome-icon icon="fa-solid fa-box-archive" size="xl" color="var(--color-text)"/>
                        <p>Archives</p>
                    </div>
                </div>  

                <div v-if="openArchiveMenu" class="menu-header">
                    <font-awesome-icon class="close-menu" icon="fa-solid fa-chevron-left" :style="{ cursor: 'pointer'}" size="sm" @click=" openArchiveMenu = false"/>
                    <p>Archives</p>
                    <font-awesome-icon class="close-menu" icon="fa-solid fa-xmark" :style="{ cursor: 'pointer'}" @click="openMenuModal = false, openArchiveMenu = false"/> 
                </div> 

                <div v-if="openArchiveMenu" style="display: flex; flex-direction: column; gap: .4rem">
                    <div v-for="archive in archives" class="archive-card">
                        <p>Titre : {{ archive.title }}</p>
                        <p>Nombre de tickets : {{ archive.task.length }}</p>
                    </div>
                </div>
                
                <div v-if="openBackgroundMenu && !openPhotoBackground && !openColorBackground" class="menu-body">
                    <div class="menu-actions-background">
                        <div @click="openPhotoBackground = true">
                            <img src="https://trello.com/assets/8f9c1323c9c16601a9a4.jpg" />
                            <p>Photos</p>
                        </div>
                        
                        <div @click="openColorBackground = true">
                            <img src="https://trello.com/assets/97db30fe74a58b7b7a18.png" />
                            <p>Couleurs</p>
                        </div>
                    </div>
                </div>   

                <div v-if="openPhotoBackground" class="menu-body">
                    <div  class="menu-photos-background">
                        <div v-for="photo in unsplashPhotos">
                            <img @click="addBackgroundImage(store, '/images/'+photo )" :src="/images/+photo" :style="{border: store.boardBackgroundImage == '/images/'+photo ? '4px solid white' : ''}"/>
                        </div>
                    
                    </div>
                </div>   
                <div v-if="openColorBackground" class="menu-body">
                    <div class="menu-colors-background">
                        <div  v-for="color in backgroundColors" :style="{backgroundColor: color, border: store.boardBackgroundColor == color ? '4px solid white' : ''}" @click="addBackgroundColor(store, color) ">
                        </div>
                    </div>
                    <p style="padding-top: .4rem; margin-top: 1.2rem; margin-left: .4rem;">Gradient</p>
                    <div  class="menu-colors-background">
                        <div v-for="color in backgroundGradient" :style="{background: color, border: store.boardBackgroundColor == color ? '4px solid white' : ''}" @click="addBackgroundColor(store, color)">
                        </div>
                    </div>
                        
                </div>  
                
            </div>
            
        </div>
    </div>
</template>

<style>
     .menu-modal {
        display: flex;
        font-size: 14px;
    }

    .blur {
        position: fixed;
        top: 0;
        left: 0;
        background-color: rgba(0,0,0, 0.3);
        width: 80%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .menu-sub-modal {
        position: fixed;
        top: 0;
        right: 0;
        background: var(--vt-c-black-soft);
        width: 20%;
        height: 100%;
        padding: .6rem 1.2rem;
        color: var(--color-text);
    }

    .menu-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: .6rem;
        border-bottom: 1px solid #A6C5E229;
        font-size: 14px;
    }

    .close-menu {
        padding: .5rem;
    }

    .close-menu:hover {
        padding: .5rem;
        background: #9fadbc18;
        border-radius: 3px;
    }

</style>