<script setup lang="ts">
import {onBeforeMount, ref} from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from 'axios';
import {conjunctUrl} from "@/scripts/api";
import {MdCatalog, MdPreview} from "md-editor-v3";
import 'md-editor-v3/lib/preview.css';

const $router = useRouter();
const $route = useRoute();
const post = ref<any>(null);
const loadingPage = ref(false);
const scrollElement = document.documentElement // for Markdown Catalog Renderer

onBeforeMount(async () => {
    loadingPage.value = true
    if (!$route.params.slug) {
        $router.push('/'); // Redirect to home page if no slug is present in URL
        return;
    }

    try {
        await axios.get(`https://cms.crtl-prototype-studios.cn/api/posts?filters[postSlug][$eq]=${$route.params.slug}&populate=*`).then((response) => {
            post.value = { data: response.data.data, meta: response.data.meta };
        });
        if (post.value) {
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
    <div class="flex flex-row w-full min-h-screen">
        <div class="flex flex-col sticky top-20 h-full mx-5 p-4 w-72">
            <h1 class="text-2xl">Catalog</h1>
            <span class="badge badge-neutral mt-2">
                {{`Post created at ${formatDateToMMMddYYYY(post?.data[0]?.attributes?.createdAt)}`}}
            </span>
            <span class="badge mt-2">
                {{`Last updated at ${formatDateToMMMddYYYY(post?.data[0]?.attributes?.updatedAt)}`}}
            </span>
            <div class="divider"/>
            <MdCatalog :editorId="'preview-only'" :scrollElement="scrollElement" class="flex-grow"/>
        </div>
        <div class="flex-grow shadow-md">
            <div class="object-cover w-full">
                <img :src="conjunctUrl(post?.data[0]?.attributes?.postCover?.data?.attributes?.url)" class="object-cover w-full h-40"/>
            </div>
            <h1 class="mt-8 p-4 w-full font-bold text-5xl text-center">{{ post?.data[0]?.attributes?.postTitle }}</h1>
            <div class="divider px-10">
                Written By <span class="-ml-2 p-2 badge badge-primary">{{post?.data[0]?.attributes?.postAuthor.data?.attributes?.username}}</span>
            </div>
            <MdPreview :editorId="'preview-only'" :modelValue="post?.data[0]?.attributes?.postContent" class="px-10" />
        </div>
    </div>
</template>

<style scoped>
.md-editor-dark {
    --md-bk-color: rgba(51, 51, 51, 0) !important;
}
</style>