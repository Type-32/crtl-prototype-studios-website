<script setup lang="ts">
import {useContentStore} from "@/stores/content";
import {onMounted, ref} from "vue";

const $content = useContentStore()
const rawGalleries = ref()

const loadingPage = ref(false)

onMounted(async () => {
    loadingPage.value = true

    rawGalleries.value = await $content.fetchGalleries()

    loadingPage.value = false;
})
</script>

<template>
    <div class="px-32 flex flex-col max-tablet:px-10">

    </div>
</template>

<style scoped>

</style>