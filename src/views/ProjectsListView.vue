<script setup lang="ts">
import {useContentStore} from "@/stores/content";
import {onMounted, ref} from "vue";

const $content = useContentStore()

let rawData, maxPages: number;
const projectsRaw = ref<any[]>([]);
const pageIndex = ref(1), pageLimit = ref(9)
const loadingPage = ref(false)

onMounted(async () => {
    loadingPage.value = true
    await refreshPage()
    loadingPage.value = false
})

async function refreshPage(){
    rawData = await $content.fetchPaginatedProjects(pageIndex.value, pageLimit.value, import.meta.env.VITE_CMS_URL, import.meta.env.VITE_CMS_TOKEN)
    maxPages = rawData.meta.pagination?.pageCount || 1
    projectsRaw.value = rawData.data

}

function nextPage(){
    if(pageIndex.value >= maxPages){
        pageIndex.value = maxPages
    }else{
        pageIndex.value++
        refreshPage()
    }
}

function previousPage(){
    if(pageIndex.value <= 1){
        pageIndex.value = 1
    }else{
        pageIndex.value--
        refreshPage()
    }
}
</script>

<template>
    <div class="px-32 max-tablet:px-10">
        <h1 class="mt-16 font-bold text-4xl">Projects</h1>
        <div class="text-base-content/70 mb-8 mt-2">Up-to-date latest projects from CRTL Prototype Studios. Here lists out all of our projects that we've worked on or are working on. Interesting stuff.</div>
        <div class="flex flex-col items-center justify-center" v-if="loadingPage">
            <span class="loading loading-bars loading-lg"/>
            <div class="text-base-content/70">Loading projects...</div>
        </div>
        <div class="grid grid-cols-3 w-full py-5 gap-5 max-tablet:grid-cols-1 max-tablet:gap-10" v-else>
            <div class="hover:bg-primary group card shadow-md hover:shadow-lg hover:scale-[1.01] transition duration-300 cursor-pointer glass" v-for="(project, projectIndex) in projectsRaw" :key="projectIndex" @click="$router.push(`/project/${project?.attributes?.projectSlug}`)">
                <figure><img loading="lazy" :src="project?.attributes?.projectCover?.data?.attributes?.url" alt="Project Cover Image"/></figure>
                <div class="card-body">
                    <h1 class="card-title group-hover:text-white transition duration-300">{{project?.attributes?.projectName}}</h1>
                    <span class="group-hover:text-white/80 transition duration-300">{{project?.attributes?.projectDescription.substring(0,100) + '...'}}</span>
                    <div class="card-actions justify-end">
                        <span class="badge badge-primary group-hover:badge-neutral" v-if="project?.attributes?.isInEarlyAccess">Early Access</span>
                        <span class="badge badge-outline">{{project?.attributes?.projectStatus}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="w-full mt-20 justify-center join">
            <button class="join-item btn" @click="previousPage()">«</button>
            <button class="join-item btn">Page {{pageIndex}}</button>
            <button class="join-item btn" @click="nextPage()">»</button>
        </div>
    </div>
</template>

<style scoped>

</style>