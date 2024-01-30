<script setup lang="ts">
import {conjunctUrl} from "@/scripts/api";
const props = defineProps({
    post: null
})
</script>

<template>
    <div>
        <div class="card card-side shadow-md glass hover:bg-primary transition duration-300 group">
            <figure class="object-contain">
                <img :src="conjunctUrl(props.post?.attributes.postCover?.data?.attributes?.formats.small.url)" alt="Post Image" class="h-32 w-40"/>
            </figure>
            <div class="card-body">
                <a class="card-title group-hover:text-white transition duration-300">{{props.post?.attributes.postTitle}}</a>
                <div class="text-sm group-hover:text-white/90 transition duration-300">{{props.post?.attributes.postContent?.substring(0,100) + '...'}}</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>