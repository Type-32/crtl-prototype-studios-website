<script setup lang="ts">
import {conjunctUrl} from "@/scripts/api";
const props = defineProps({
    project: null
})
</script>

<template>
    <div class="card shadow-xl">
        <figure><img :src="conjunctUrl(props.project?.attributes.projectCover?.data?.attributes?.url)" alt="Post Image"/></figure>
        <div class="card-body">
            <div class="text-md text-base-600 opacity-60">Project</div>
            <a class="font-bold text-2xl">{{props.project?.attributes.projectTitle}}</a>
            <div class="text-sm text-base-600">{{props.project?.attributes.projectDescription?.substring(0,45) + '...'}}</div>
        </div>
    </div>
</template>

<style scoped>

</style>