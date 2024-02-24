<script setup lang="ts">
import {useContentStore} from "@/stores/content";
import {onMounted, ref} from "vue";
import GalleryCard from "@/components/GalleryCard.vue";
import type {Gallery} from "@/scripts/interfaces/gallery";

const $content = useContentStore()
const rawGalleries = ref()
const galleries = ref<Gallery[]>([])
const pageIndex = ref(1), pageLimit = ref(9)
let maxPages: number;

const loadingPage = ref(false)

async function refreshPage(){
    rawGalleries.value = await $content.fetchPaginatedGalleries(pageIndex.value, pageLimit.value, import.meta.env.VITE_CMS_URL, import.meta.env.VITE_CMS_TOKEN)
    maxPages = rawGalleries.value.meta.pagination?.pageCount || 1
    galleries.value = rawGalleries.value.data
    galleries.value = galleries.value.reverse()
}

onMounted(async () => {
    loadingPage.value = true

    await refreshPage()

    loadingPage.value = false;
})

function nextPage(){
    if(pageIndex.value >= maxPages){
        pageIndex.value = maxPages
    }else{
        pageIndex.value++
        refreshPage()
    }
}

function previousPage(){
    if(pageIndex.value <= 1){
        pageIndex.value = 1
    }else{
        pageIndex.value--
        refreshPage()
    }
}
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
        <div class="flex-grow grid-cols-3 max-tablet:grid-cols-1 max-tablet:gap-1 max-tablet:mt-2 grid flex-row gap-5 gap-y-10 fade-in-from-top" v-else>
            <GalleryCard :gallery="gallery" v-for="(gallery, galleryIndex) in galleries" :key="galleryIndex" @click="$router.push(`/gallery/${gallery.attributes.gallerySlug}`)"/>
        </div>
        <div class="w-full mt-20 justify-center join">
            <button class="join-item btn" @click="previousPage()">«</button>
            <button class="join-item btn">Page {{pageIndex}}</button>
            <button class="join-item btn" @click="nextPage()">»</button>
        </div>
    </div>
</template>

<style scoped>

</style>