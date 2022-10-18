<script setup>
import NotFound from "@/assets/not_found.jpg"
</script>

<template>
    <div class="not-found px-2 pt-10 flex flex-col items-center justify-center">
        <div class="img w-[400px]">
            <img :src="NotFound" class="w-full" alt="not-found-page">
        </div>
        <div class="content text-center">
            <p class="text-lg mb-3">Bu sahifada hech qanday ma'lumot mavjud emas!</p>
            <button @click="$router.go(-1)" class="bg-sky-300 text-white rounded px-4 py-2 transition hover:shadow-lg">Qaytish</button>
        </div>
    </div>
</template>

<style>

</style>