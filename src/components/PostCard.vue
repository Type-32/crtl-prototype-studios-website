<script setup lang="ts">
import {conjunctUrl} from "@/scripts/api";
const props = defineProps({
    post: null
})
</script>

<template>
    <div>
        <div class="card card-side shadow-md glass">
            <figure class="object-contain">
                <img :src="conjunctUrl(props.post?.attributes.postCover?.data?.attributes?.formats.small.url)" alt="Post Image" class="h-32 w-40"/>
            </figure>
            <div class="card-body">
                <a class="font-bold text-2xl">{{props.post?.attributes.postTitle}}</a>
                <div class="text-sm">{{props.post?.attributes.postContent?.substring(0,100) + '...'}}</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>