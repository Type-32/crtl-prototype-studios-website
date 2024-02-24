<script setup lang="ts">
import {computed, defineAsyncComponent, onBeforeMount, ref} from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from 'axios';
import {marked} from "marked";
import {useContentStore} from "@/stores/content";

const $router = useRouter();
const $route = useRoute();
const post = ref<any>(null);
const loadingPage = ref(false);
const scrollElement = document.documentElement // for Markdown Catalog Renderer
const $content = useContentStore()
const allPosts = ref()

const PostContent = ref("")

let filteredPosts: any
const randomPost = ref();

onBeforeMount(async () => {
    loadingPage.value = true

    if (!$route.params.slug) {
        $router.push('/'); // Redirect to home page if no slug is present in URL
        return;
    }

    try {
        await axios.get(`${import.meta.env.VITE_CMS_URL}/api/posts?filters[postSlug][$eq]=${$route.params.slug}&populate=*`).then((response) => {
            post.value = { data: response.data.data, meta: response.data.meta };
        });
        if (post.value) {
            loadingPage.value = false
        } else {
            $router.push('404'); // Redirect to home page if post is not found
        }
        allPosts.value = await $content.fetchPosts(true, import.meta.env.VITE_CMS_URL, import.meta.env.VITE_CMS_TOKEN)
        filteredPosts = allPosts.value?.data.filter((p: any) => p.postSlug !== post.value?.data[0].attributes.postSlug);
        randomPost.value = filteredPosts[Math.floor(Math.random() * filteredPosts.length)];
    } catch (error: any) {
        console.error(`Error fetching post: ${error?.message}`);
        $router.push('404'); // Redirect to the home page if there's any error
    }

    if (post.value?.data[0]?.attributes?.postContent) {
        PostContent.value = await marked(post.value?.data[0].attributes.postContent)
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
            <img loading="lazy" :src="post?.data[0]?.attributes?.postCover?.data?.attributes?.url" class="object-cover w-full h-40" alt="Post Page Cover"/>
        </div>
        <div class="w-full px-32 max-tablet:px-10 flex flex-col" id="article-content">
            <h1 class="mt-8 p-4 w-full font-bold text-5xl text-center">{{ post?.data[0]?.attributes?.postTitle }}</h1>
            <div class="object-contain flex flex-col items-center py-4">
                <div class="divider w-full">
                    Written By <span class="p-2 badge badge-primary badge-lg">{{post?.data[0]?.attributes?.postAuthor.data?.attributes?.username}}</span>
                </div>
                <article class="prose w-full mt-10 max-w-none" v-html="PostContent"/>
            </div>
            <div class="flex items-center flex-col mt-10">
                <div class="h-fit px-3 mt-2 badge badge-lg badge-outline">
                    {{`Post created at ${formatDateToMMMddYYYY(post?.data[0]?.attributes?.createdAt)}`}}, {{`Last updated at ${formatDateToMMMddYYYY(post?.data[0]?.attributes?.updatedAt)}`}}
                </div>
            </div>
            <div class="flex items-center flex-col mt-10">
                <a :href="`/post/${randomPost?.attributes.postSlug}`" class="btn btn-lg flex-col flex py-8">
                    <div>
                        <div class="text-base-content/70 text-sm text-left font-normal">More Posts »</div>
                        <div>{{ randomPost?.attributes.postTitle }}</div>
                    </div>
                </a>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>