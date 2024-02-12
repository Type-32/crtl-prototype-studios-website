<script setup lang="ts">
import {onBeforeMount, ref} from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from 'axios';
import {marked} from "marked";
import {useContentStore} from "@/stores/content";

const $router = useRouter();
const $route = useRoute();
const gallery = ref<any>(null);
const loadingPage = ref(false);
const $content = useContentStore()

onBeforeMount(async () => {
    loadingPage.value = true

    if (!$route.params.slug) {
        $router.push('galleries'); // Redirect to home page if no slug is present in URL
        return;
    }

    try {
        await axios.get(`${import.meta.env.VITE_CMS_URL}/api/galleries?filters[gallerySlug][$eq]=${$route.params.slug}&populate[0]=galleryContent.framePiece&populate[1]=galleryContent.motionPiece&populate[2]=galleryContent.motionCover&populate[3]=galleryContent.trackPiece&populate[4]=galleryContent.trackCover&populate[5]=galleryAuthors`).then((response) => {
            gallery.value = { data: response.data.data, meta: response.data.meta };
        });
        if (gallery.value) {
            loadingPage.value = false
        } else {
            $router.push('404'); // Redirect to home page if post is not found
        }
    } catch (error: any) {
        console.error(`Error fetching post: ${error?.message}`);
        $router.push('404'); // Redirect to the home page if there's any error
    }

    loadingPage.value = false
});

function formatDateToMMMddYYYY(isoTimestamp: string): string {
    // Create a new Date object from the timestamp
    const date = new Date(isoTimestamp);

    // Create an options object for formatting
    const options: any = {year: 'numeric', month: 'short', day: 'numeric'};

    // Use Intl.DateTimeFormat to format the date
    return new Intl.DateTimeFormat('en-US', options).format(date);
}
</script>

<template>
    <div class="flex flex-col items-center min-h-screen justify-center" v-if="loadingPage">
        <span class="loading loading-bars loading-lg"/>
        <div class="text-base-content/70">Content is loading...</div>
    </div>
    <div class="flex flex-col w-full min-h-screen items-center" v-else>

    </div>
</template>

<style scoped>
</style>