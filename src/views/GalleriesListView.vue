<script setup lang="ts">
import {useContentStore} from "@/stores/content";
import {onMounted, ref} from "vue";
import GalleryCard from "@/components/GalleryCard.vue";
import type {Gallery} from "@/scripts/interfaces/gallery";

const $content = useContentStore()
const rawGalleries = ref()
const galleries = ref<Gallery[]>([])

const loadingPage = ref(false)

onMounted(async () => {
    loadingPage.value = true

    rawGalleries.value = await $content.fetchGalleries(true)
    galleries.value = rawGalleries.value.data

    loadingPage.value = false;
})
</script>

<template>
    <div class="px-32 flex flex-col max-tablet:px-10 min-h-screen">
        <div class="items-center fade-in-from-top">
            <h1 class="font-bold text-4xl mt-16 text-center">Galleries</h1>
            <div class="text-center text-base-content/70 mb-8 mt-2">Our memories, frames, moments, all gathered together in collections.</div>
        </div>
        <div class="flex flex-col items-center justify-center" v-if="loadingPage">
            <span class="loading loading-bars loading-lg"/>
            <div class="text-base-content/70">Loading projects...</div>
        </div>
        <div class="flex-grow grid-cols-3 grid flex-row gap-5 gap-y-10 fade-in-from-top" v-else>
            <GalleryCard :gallery="gallery" v-for="(gallery, galleryIndex) in galleries" :key="galleryIndex" @click="$router.push(`/gallery/${gallery.attributes.gallerySlug}`)"/>
        </div>
    </div>
</template>

<style scoped>

</style>