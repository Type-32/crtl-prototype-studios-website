<script setup lang="ts">
import {useContentStore} from "@/stores/content";
import {onMounted, ref} from "vue";
import {conjunctUrl} from "@/scripts/api";
import PostCard from "@/components/PostCard.vue";

const $content = useContentStore()

const postsRaw = ref<any[]>([]);
const paginatedPosts = ref<any[]>([]);
const recentPosts = ref<any[]>([]);
const postPageIndex = ref(0)
const loadingPage = ref(false)

onMounted(async () => {
    loadingPage.value = true
    postsRaw.value = (await $content.fetchPosts()).data;
    let tempPaginate: any[] = [];

    for(let i: number = 1; i <= postsRaw.value.length; i++) {
        if(i % 50 == 0){
            paginatedPosts.value.push(tempPaginate);
            tempPaginate.length = 0;
        }
        tempPaginate.push(postsRaw.value[i-1]);
        if (i >= postsRaw.value.length - 3) recentPosts.value.push(postsRaw.value[i-1]);
    }
    paginatedPosts.value.push(tempPaginate);

    console.log(paginatedPosts.value)
    loadingPage.value = false
})

function setPageIndex(num: number) { postPageIndex.value = num }
</script>

<template>
    <div class="px-32 py-10 flex flex-col max-tablet:px-10">
        <div class="max-tablet:mb-44">
            <h1 class="font-bold text-4xl">Recent Posts</h1>
            <div class="divider"/>
            <div class="w-full skeleton h-32" v-if="loadingPage"/>
            <div class="card image-full w-full h-44 hover:shadow-2xl transition duration-300" v-else>
                <figure class="object-contain">
                    <img :src="conjunctUrl(postsRaw[0]?.attributes.postCover.data.attributes.url)" class="w-full h-40"/>
                </figure>
                <div class="card-body flex flex-col">
                    <h1 class="card-title">{{ postsRaw[0]?.attributes.postTitle }}</h1>
                    <p>{{ postsRaw[0]?.attributes.postContent?.substring(0,300) + '......' }}</p>
                    <div class="card-actions justify-end"><button class="btn w-fit" @click="$router.push('/post/' + postsRaw[0]?.attributes?.postSlug)">Read More</button></div>
                </div>
            </div>
        </div>
        <div>
            <h1 class="font-bold text-4xl mt-24">All Posts</h1>
            <div class="divider"/>
            <div class="flex flex-col justify-items-center gap-5" v-if="loadingPage">
                <div class="w-full skeleton h-32"/>
                <div class="w-full skeleton h-32"/>
                <div class="w-full skeleton h-32"/>
            </div>
            <div class="flex flex-col">
                <div class="w-full flex flex-col gap-5">
                    <PostCard v-for="(post, postIndex) in paginatedPosts[postPageIndex]" :key="postIndex" :post="post" class="w-full cursor-pointer hover:scale-[1.01] hover:shadow-2xl duration-200 rounded-2xl" @click="$router.push('/post/' + post?.attributes?.postSlug)"/>
                </div>
                <div class="w-full mt-20 justify-center join">
                    <input v-for="(page, pageIndex) in paginatedPosts" :key="pageIndex" class="join-item btn btn-square" type="radio" name="options" :aria-label="`${pageIndex + 1}`" checked @click="setPageIndex(pageIndex)"/>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>