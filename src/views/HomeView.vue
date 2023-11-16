<script setup>

</script>

<template>
    <div style="display: flex; align-items: center; margin-top: 2rem; justify-content: center;">
        <div style="margin: 3rem; padding: 2rem 8rem;" >
            <h1 style="font-size: 70px;font-weight: 900; line-height: 65px; color: white; padding: 2rem 1rem;">Pensez <br /> différement</h1>
            <div class="title-container">
                <h2 class="title1">Tableau</h2>
                <h2 class="title2">Kanban</h2>
                <h2 class="title3">Simple</h2>
            </div>
            
        </div>
        <!-- <div>
            <img style="width: 100%; height: 55vh; object-fit: cover; border-radius: 10px; margin-top: 4rem;" src="/images/cov3.jpg">
        </div> -->
    </div>
</template>

<style>

    .title-container {
        margin-top: 2rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-right: 5rem;
    }

    .title1 {
        margin-left: 32px;
        background:#dbdcff;
        width: fit-content;
        border-bottom-left-radius: 15px;
        border-bottom-right-radius: 15px;
        border-top-left-radius: 15px;
        border-top-right-radius: 5px;
        color: #33286d;
        font-weight: 500;
        padding: .2rem .8rem;
    }

    .title2 {
        margin-top: 12px;
        margin-right: 12px;
        background:#fbc8c4;
        width: fit-content;
        border-bottom-left-radius: 15px;
        border-bottom-right-radius: 15px;
        border-top-left-radius: 5px;
        border-top-right-radius: 15px;
        color: #700b0b;
        font-weight: 500;
        padding: .2rem .8rem;
    }

    .title3 {
        margin-top: 12px;
        margin-left: 32px;
        background:#ffefb7;
        width: fit-content;
        border-bottom-left-radius: 15px;
        border-bottom-right-radius: 15px;
        border-top-left-radius: 15px;
        border-top-right-radius: 5px;
        color: #6e3500;
        font-weight: 500;
        padding: .2rem .8rem;
    }
</style>