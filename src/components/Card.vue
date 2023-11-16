<template>
    <li class="card" :style="{borderTop: !fullScreen ? color ? '30px solid' : '' : '', borderColor: color ? color : '', background: fullScreen ? color : ''}">

        <div class="labels-task">
            <div v-for="label in labels" class="task-label" :style="{backgroundColor: label.color}">
            </div>
        </div>
        
        <div class="card-body">
            <p>{{ msg }}</p> 
            <div>
                <img v-if="priority === '3'" src="../assets/highest.png"/>
                <img v-if="priority === '2'" src="../assets/medium.png"/>
                <img v-if="priority === '1'" src="../assets/lowest.png"/>
            </div>
        </div>

        <div v-if="date">
            
            <div class="date-task" v-if="checkDate(date) == true">
                <font-awesome-icon icon="fa-regular fa-clock"  :style="{ color: '#eb5a47' }" size="s"/>
                <p :style="{color: '#eb5a47'}">{{ formatDate(date) }}</p>
            </div>

            <div class="date-task" v-else-if="checkDate(date) == 'same'">
                <font-awesome-icon icon="fa-regular fa-clock"  :style="{ color: '#f99f1b' }" size="s"/>
                <p :style="{color: '#f99f1b'}">{{ formatDate(date) }}</p>
            </div>

            <div class="date-task" v-else>
                <font-awesome-icon icon="fa-regular fa-clock"  :style="{ color: '#61bd4f' }" size="s"/>
                <p :style="{color: '#61bd4f'}">{{ formatDate(date) }}</p>
            </div>
        </div>
        
    </li>
</template>

<script setup>

    import { ref } from 'vue';

    defineProps({
        msg: {
            type: String,
            required: true
        },

        labels: {
            type: Array,
            required: false
        },

        priority: {
            type: String,
            required: false
        },

        date: {
            type: String,
            required: false
        },

        searchTerm: {
            type: String,
            required: false
        },

        color: {
            type: String,
            required: false
        },

        fullScreen: {
            type: String,
            required: false
        }
    })

    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${day}-${month}-${year}`;
    }

    function checkDate(date){
        var todays = new Date()

        var taskDate = new Date(date)

        if(taskDate.setHours(0,0,0,0) > todays.setHours(0,0,0,0)) {
            // Date equals today's date
            return false
        } else if (taskDate.setHours(0,0,0,0) == todays.setHours(0,0,0,0)) {
            return "same"
        } else {
            return true
        }
    }
    
</script>

<style scoped>
    .card {
        background-color: var(--vt-c-indigo);
        border-radius: 3px;
        padding: 1rem;
        font-size: 14px;
        margin-bottom: .8rem;
    }

    .labels-task {
        display: flex;
        justify-content: flex-start;
    }

    .task-label {
        margin-bottom: 6px;
        display: inline-block;
        width: 40px;
        height: 0.57em;
        margin-inline-end: 0.2em;
        border-radius: 10px;
        transition: width .1s height .4s;
        transition: .3s;
    }

    .card-body {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .date-task {
        display: flex;
        align-items: center;
        gap: .4rem;
        margin-top: .1rem;
    }

</style>