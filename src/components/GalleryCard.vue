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
    <div class="stack">
        <div class="object-contain size-32" v-for="(image, imageIndex) in imageLinks" :key="imageIndex">
            <img :src="image" alt="Post Img"/>
        </div>
    </div>
</template>

<style scoped>

</style>