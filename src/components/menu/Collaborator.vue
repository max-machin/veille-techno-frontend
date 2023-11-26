<script setup>
    defineProps({
        openUsermodal: {
            type: Boolean
        },
        openBackgroundMenu: {
            type: Boolean
        },
        openAddUser: {
            type: Boolean
        },
        collaborators: {
            type: Array
        },
        newUser: {
            type: Object
        }
    });
    function addUser(newUser, array){

        let lastItem = array.length

        let newItemId = lastItem + 1;

        newUser.id = newItemId;

        array.push(newUser)

        console.log(array)
    }

    function deleteUser(obj, array){
        let i = array.map(item => item.id).indexOf(obj) // find index of your object
        array.splice(i, 1) // remove it from array
    }
</script>

<template>
    <div v-if="openUsermodal" class="menu-modal">
        <div class="blur" @click="openUsermodal = false"></div>

        <div class="menu-sub-modal">
            <div>
                <div v-if="!openBackgroundMenu" class="menu-header">
                    <p></p>
                    <p>Collaborateurs</p>
                    <font-awesome-icon class="close-menu" icon="fa-solid fa-xmark" :style="{cursor: 'pointer'}" @click="openUsermodal = false, openAddUser = false"/> 
                </div>
                <div v-for="collaborator in collaborators" class="collab-item" :key="collaborator.id">
                    <div style="display: flex; gap: .8rem;">
                        <div class="initial">
                            <p >{{ collaborator.nom[0] + collaborator.prenom[0] }}</p>
                        </div>
                        
                        <div>
                            <p>{{ collaborator.nom + ' ' + collaborator.prenom }}</p> 
                            <p>{{ collaborator.mail }}</p>
                        </div>
                    </div>
                    <div @click="collaborator.isPopUpOpen = !collaborator.isPopUpOpen">
                        <font-awesome-icon class="icon-sort" icon="fa-solid fa-ellipsis-vertical" size="sm"  />
                    </div>
                    

                    <div v-if="collaborator.isPopUpOpen" class="popupUser">
                        <div class="divDroit">
                            <p>Droits : </p>
                            <div style="display: flex; gap: .4rem; margin-top: .4rem;">
                                <div class="editLaneUser" :style="{background: collaborator.droit == 1 ? '#2ba8f034' : '#091a3614'}">
                                    <p @click="collaborator.droit = 1">Editer</p>
                                </div>
                                <div class="editLaneUser" :style="{background: collaborator.droit == 2 ? '#2ba8f034' : '#091a3614'}">
                                    <p @click="collaborator.droit = 2">Lecture seule</p>
                                </div>
                            </div>
                        </div>
                        <div class="deleteLane">
                            <p @click="deleteUser(collaborator.id, collaborators)">Supprimer</p>
                        </div>
                    </div>
                </div>
                <font-awesome-icon @click="openAddUser = !openAddUser" class="addIconCollab" icon="fa-solid fa-plus" color="rgba(90, 90, 90, 1)" />
                <div v-if="openAddUser" >
                    <div >
                        <p>Prénom : </p>
                        <input style="width: 70%;" class="userInput" v-model="newUser.prenom" /> 
                    </div>
                    <div>
                        <p>Nom : </p>
                        <input style="width: 70%;" class="userInput" v-model="newUser.nom" />
                    </div>
                    <div>
                        <p>Mail : </p>
                        <input style="width: 70%;" class="userInput" v-model="newUser.mail" />
                    </div>
                    
                    <button style="color: var(--color-black); width: 35%;" class="addBtn" @click="addUser(newUser, collaborators), newUser = {}, openAddUser = false">Ajouter</button>
                    <button style="color: var(--color-black); width: 35%;" class="cancelBtn" @click="newUser = {}, openAddUser = false">Annuler</button>
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

    .close-menu {
        padding: .5rem;
    }

    .close-menu:hover {
        padding: .5rem;
        background: #9fadbc18;
        border-radius: 3px;
    }


</style>