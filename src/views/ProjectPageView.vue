<script setup lang="ts">
import {onBeforeMount, ref} from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from 'axios';
import {marked} from "marked";

const $router = useRouter();
const $route = useRoute();
const project = ref<any>(null);
const loadingPage = ref(false);
const scrollElement = document.documentElement // for Markdown Catalog Renderer

const ProjectDesc = ref("")

onBeforeMount(async () => {
    loadingPage.value = true
    if (!$route.params.slug) {
        $router.push('/'); // Redirect to home page if no slug is present in URL
        return;
    }

    try {
        await axios.get(`${import.meta.env.VITE_CMS_URL}/api/projects?filters[projectSlug][$eq]=${$route.params.slug}&populate=*`).then((response) => {
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

    if(project.value?.data[0]?.attributes?.projectDescription){
        ProjectDesc.value = await marked(project.value?.data[0]?.attributes?.projectDescription)
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
        <div class="object-cover w-full">
            <img loading="lazy" :src="project?.data[0]?.attributes?.projectCover?.data?.attributes?.url" class="object-cover w-full h-72" alt="Project Cover Image"/>
        </div>
        <div class="w-full px-32 max-tablet:px-10 flex flex-col" id="article-content">
            <div class="mt-8 p-4 flex-grow flex font-bold text-5xl text-center align-middle justify-center">{{ project?.data[0]?.attributes?.projectName }}</div>
            <div class="object-contain flex flex-col items-center py-4">
                <div class="divider w-full">
                    Created By <span class="p-2 badge badge-primary badge-lg">{{project?.data[0]?.attributes?.projectAuthor.data?.attributes?.username}}</span>
                </div>
                <article class="prose w-full mt-10 max-w-none" v-html="ProjectDesc"/>
            </div>
            <div class="flex items-center flex-col mt-10">
                <div class="h-fit px-3 mt-2 badge badge-lg badge-outline">
                    {{`Project created at ${formatDateToMMMddYYYY(project?.data[0]?.attributes?.createdAt)}`}}
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>