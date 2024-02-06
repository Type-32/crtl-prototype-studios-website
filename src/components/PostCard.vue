<script setup lang="ts">
import {conjunctUrl} from "@/scripts/api";
const props = defineProps({
    post: null
})
</script>

<template>
    <div>
        <div class="card laptop:card-side shadow-md glass hover:bg-primary transition duration-300 group">
            <figure class="object-cover max-tablet:h-32">
                <img :src="conjunctUrl(props.post?.attributes.postCover?.data?.attributes?.formats.small.url)" alt="Post Image" class="laptop:h-32 laptop:w-40 max-tablet:w-full"/>
            </figure>
            <div class="card-body">
                <a class="card-title group-hover:text-white transition duration-300">{{props.post?.attributes.postTitle}}</a>
                <div class="text-sm group-hover:text-white/90 transition duration-300">{{props.post?.attributes.postContent?.substring(0,70) + '...'}}</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>