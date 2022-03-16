<template>
    <router-view/>
</template>

<style>
/*TODO: set padding-top to footer height*/
* {
    box-sizing: border-box;
    margin: 0px;
    /*univeral fluid text size*/
    font-size: 1.1875rem;
    font-size: clamp(1.1875rem, 1.175rem + 0.0625vw, 1.25rem);
}
* body {
    overflow-x: hidden;
    /* background-image: url("/img/clouds.gif"); */
    min-height: 100vh;
    background-color: #E8FFFF;
}
</style>