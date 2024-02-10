<script setup lang="ts">
import {useContentStore} from "@/stores/content";
import {computed, onMounted, ref} from "vue";
import {conjunctUrl} from "@/scripts/api";
import PostCard from "@/components/PostCard.vue";
import type {Post} from "@/scripts/interfaces/post";
import type {Payload} from "@/scripts/interfaces/defaults/Payload";

const $content = useContentStore()

// @ts-ignore
let rawData: Payload<Post[]> = [];
const postsRaw = ref<any[]>([]), allPosts = ref<Payload<Post[]>>();
const postPage = ref(1), pageLimit = ref(10), maxPages = ref()
const loadingPage = ref(false)

const searchQuery = ref('');
const filteredPosts = computed(() => {
    if (!searchQuery.value.trim()) {
        return postsRaw.value;
    } else {
        const query = searchQuery.value.trim().toLowerCase();
        return allPosts.value?.data.filter(post =>
            post.attributes.postTitle.toLowerCase().includes(query) ||
            post.attributes.postContent?.toLowerCase().includes(query)
        );
    }
});

function displayPosts() {
    const startIndex = (postPage.value - 1) * pageLimit.value;
    const endIndex = postPage.value * pageLimit.value;
    return filteredPosts.value?.slice(startIndex, endIndex);
}

onMounted(async () => {
    loadingPage.value = true
    // postsRaw.value = (await $content.fetchPosts()).data;
    await refreshPage()
    loadingPage.value = false
})

async function refreshPage(){
    allPosts.value = await $content.fetchPosts(true)
    rawData = await $content.fetchPaginatedPosts(postPage.value, pageLimit.value);
    maxPages.value = rawData.meta.pagination?.pageCount
    console.log(rawData.meta)
    postsRaw.value = rawData.data
}

function nextPage(){
    if(postPage.value >= maxPages.value){
        postPage.value = maxPages.value
    }else{
        postPage.value++
        refreshPage()
    }
}

function previousPage(){
    if(postPage.value <= 1){
        postPage.value = 1
    }else{
        postPage.value--
        refreshPage()
    }
}

function handleSearch(){
    postPage.value = 1;
}
</script>

<template>
    <div class="px-32 flex flex-col max-tablet:px-10">
        <div>
            <h1 class="font-bold text-4xl mt-16">Posts</h1>
            <div class="text-base-content/70 mb-8 mt-2">Up-to-date latest information from CRTL Prototype Studios. We post stuff here sometimes, so you can check here from time to time!</div>
            <div class="flex flex-col items-center justify-center" v-if="loadingPage">
                <span class="loading loading-bars loading-lg"/>
                <div class="text-base-content/70">Loading posts...</div>
            </div>
            <div class="flex flex-col" v-else>
                <input class="input input-bordered w-full mb-4" v-model="searchQuery" @input="handleSearch()" type="text" placeholder="Search Post...">
                <div class="w-full flex flex-col-reverse shadow-lg max-tablet:shadow-transparent max-tablet:gap-5 bg-transparent rounded-2xl">
                    <PostCard v-for="(post, postIndex) in displayPosts()" :key="postIndex" :post="post"
                              class="w-full cursor-pointer hover:scale-[1.01] hover:shadow-2xl duration-200 rounded-2xl bg-base-100 max-tablet:shadow-lg"
                              @click="$router.push('/post/' + post?.attributes?.postSlug)"/>
                </div>
                <div class="w-full mt-20 justify-center join">
                    <button class="join-item btn" @click="previousPage()">«</button>
                    <button class="join-item btn">Page {{postPage}}</button>
                    <button class="join-item btn" @click="nextPage()">»</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>