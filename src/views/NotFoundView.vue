<script setup>
import NotFound from "@/assets/not_found.jpg"
</script>

<template>
    <div class="not-found">
        <div class="img">
            <img :src="NotFound" alt="not-found-page">
        </div>
        <div class="content">
            <p>Bu sahifada hech qanday ma'lumot mavjud emas!</p>
            <button @click="$router.go(-1)">Qaytish</button>
        </div>
    </div>
</template>

<style>

</style>