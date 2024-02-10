<script setup lang="ts">
import {conjunctUrl} from "@/scripts/api";
const props = defineProps({
    post: null
})
</script>

<template>
    <div>
        <div class="card laptop:card-side outline-0 ring-0 hover:bg-base-200 transition duration-300 group">
            <figure class="object-cover max-tablet:h-32 p-6 max-tablet:p-0">
                <img loading="lazy" :src="props.post?.attributes.postCover?.data?.attributes?.formats.small.url" alt="Post Image" class="laptop:h-32 laptop:w-40 max-tablet:w-full laptop: rounded-lg"/>
            </figure>
            <div class="card-body">
                <a class="card-title transition duration-300">{{props.post?.attributes.postTitle}}</a>
                <div class="text-sm transition duration-300">{{props.post?.attributes.postContent?.substring(0,80) + '...'}}</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>