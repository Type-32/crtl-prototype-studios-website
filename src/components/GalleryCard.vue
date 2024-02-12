<script setup lang="ts">
import type {Gallery} from "@/scripts/interfaces/gallery";
const props = defineProps({
    gallery: null
})
let imageLinks: string[] = []
for(let i = 0; i < props.gallery?.attributes?.galleryContent?.length; i++){
    if (props.gallery?.attributes?.galleryContent[i]?.__component == "gallery-content-types.frame"){
        imageLinks.push(props.gallery?.attributes?.galleryContent[i]?.framePiece?.data.attributes.url)
    } else if (props.gallery?.attributes?.galleryContent[i]?.__component == "gallery-content-types.motion"){
        imageLinks.push(props.gallery?.attributes?.galleryContent[i]?.motionCover?.data.attributes.url)
    } else {
        imageLinks.push(props.gallery?.attributes?.galleryContent[i]?.trackCover?.data.attributes.url)
    }
}
</script>

<template>
<!--    <div class="flex flex-col items-center cursor-wait">-->
<!--        <div class="stack">-->
<!--            <div class="laptop:w-64 skeleton h-36 flex items-center justify-center">-->
<!--                <span class="loading loading-bars loading-lg"/>-->
<!--            </div>-->
<!--            <div class="laptop:w-64 skeleton h-36"/>-->
<!--            <div class="laptop:w-64 skeleton h-36"/>-->
<!--        </div>-->
<!--        <div class="flex flex-col items-center mt-3">-->
<!--            <div class="text-center text-md group-hover:shadow-lg transition duration-300"><article class="prose"><code>// Loading Gallery...</code></article></div>-->
<!--        </div>-->
<!--    </div>-->
    <div class="flex flex-col items-center group cursor-pointer h-fit">
        <div class="stack group-hover:shadow-2xl group-hover:-translate-y-1 transition duration-300">
            <div class="object-contain laptop:w-64 rounded-box bg-base-200" v-for="(image, imageIndex) in imageLinks" :key="imageIndex">
                <img loading="lazy" :src="image" alt="Post Img" class="rounded"/>
            </div>
        </div>
        <div class="flex flex-col items-center mt-4">
            <div class="text-center text-md badge badge-ghost group-hover:badge-primary group-hover:shadow-lg transition duration-300">{{ props.gallery?.attributes?.galleryTitle || "Untitled Gallery" }}</div>
        </div>
    </div>
</template>

<style scoped>

</style>