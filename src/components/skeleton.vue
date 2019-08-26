<template>
    <div class="s-skeleton">
        <div class="s-picture"> 
        </div>
        <div class="s-info">
            <p class="s-title"></p>
            <div class="s-desc"></div>
            <div class="s-desc"></div>
            <div class="s-desc"></div>
        </div>
        <div class="s-btns">
            <div class="s-btn"></div>
            <div class="s-btn"></div>
        </div>
    </div>
</template>

<style scoped>
    .s-skeleton {
        width: 250px;
        height: 300px;
    }
    .s-picture {
        width: 100%;
        margin-left: 0%;
        height: 130px;
        background-color: rgb(84, 82, 85,0.3)
    }
    .s-info {
        width: 250px;
        height: 120px;
    }
    .s-title {
        width: 50%;
        margin-left: 25%;
        height: 20px;
        margin-bottom: 5px;
        background-color: rgb(84, 82, 85,0.3)
    }
    .s-desc {
        width: 90%;
        margin-left: 5%;
        margin-bottom: 2px;
        height: 25px;
        background-color: rgb(84, 82, 85,0.3)
    }
    .s-btns {
        display: flex;
        display: -ms-flexbox;
        display: -webkit-flex;
        justify-content: center;
    }
    .s-btn {
        width: 56px;
        height: 28px;
        background-color: rgb(84, 82, 85,0.3)
    }
    .s-btn:first-child {
        margin-right: 10px;
    }
</style>