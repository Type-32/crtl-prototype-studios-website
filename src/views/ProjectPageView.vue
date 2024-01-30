<script setup lang="ts">
import {onBeforeMount, ref} from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from 'axios';
import {conjunctUrl} from "@/scripts/api";
import {MdCatalog, MdPreview} from "md-editor-v3";
import 'md-editor-v3/lib/preview.css';
import Copyright from "@/components/Copyright.vue";

const $router = useRouter();
const $route = useRoute();
const project = ref<any>(null);
const loadingPage = ref(false);
const scrollElement = document.documentElement // for Markdown Catalog Renderer

onBeforeMount(async () => {
    loadingPage.value = true
    if (!$route.params.slug) {
        $router.push('/'); // Redirect to home page if no slug is present in URL
        return;
    }

    try {
        await axios.get(`https://cms.crtl-prototype-studios.cn/api/projects?filters[projectSlug][$eq]=${$route.params.slug}&populate=*`).then((response) => {
            project.value = { data: response.data.data, meta: response.data.meta };
        });
        if (project.value) {
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
    <div class="w-full">
        <div class="w-full">
            <div class="object-cover w-full">
                <img :src="conjunctUrl(project?.data[0]?.attributes?.projectCover?.data?.attributes?.url)" class="object-cover w-full h-60"/>
            </div>
            <h1 class="mt-8 p-4 w-full font-bold text-5xl text-center">{{ project?.data[0]?.attributes?.projectTitle }}</h1>
            <div class="divider px-10">
                Created By <span class="-ml-2 p-2 badge badge-primary">{{ project?.data[0]?.attributes?.projectAuthor.data?.attributes?.username }}</span>
            </div>
            <MdPreview :editorId="'preview-only'" :modelValue="project?.data[0]?.attributes?.projectDescription" class="px-10" />
            <Copyright/>
        </div>
    </div>
</template>

<style scoped>

</style>