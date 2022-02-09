<template>
    <header>
        <h1 class="appTitle">Weather App</h1>
    </header>
</template>

<script>
export default {
    name: 'Header'
}
</script>

<style>
header {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #41AEA9;
    border-bottom: 1px solid #213E3B;
    height: 124px;
}
.appTitle {
    color: #213E3B;
}
</style>