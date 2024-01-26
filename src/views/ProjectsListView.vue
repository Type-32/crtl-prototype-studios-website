<script setup lang="ts">
import {useContentStore} from "@/stores/content";
import {onMounted, ref} from "vue";
import {conjunctUrl} from "@/scripts/api";
import PostCard from "@/components/PostCard.vue";

const $content = useContentStore()

const projectsRaw = ref<any[]>([]);
const paginatedProjects = ref<any[]>([]);
const projectPageIndex = ref(0)
const loadingPage = ref(false)

onMounted(async () => {
    loadingPage.value = true
    projectsRaw.value = (await $content.fetchProjects(true)).data;
    let tempPaginate: any[] = [];

    for(let i: number = 1; i <= projectsRaw.value.length; i++) {
        if(i % 8 == 0){
            paginatedProjects.value.push(tempPaginate);
            tempPaginate.length = 0;
        }
        tempPaginate.push(projectsRaw.value[i-1]);
    }
    paginatedProjects.value.push(tempPaginate);

    console.log(paginatedProjects.value)
    loadingPage.value = false
})

function setPageIndex(num: number) { projectPageIndex.value = num }
</script>

<template>
    <div class="px-32">
        <h1 class="pt-8 font-bold text-4xl">Projects</h1>
        <div class="divider"/>
        <div class="grid grid-cols-3 w-full py-5 gap-5">
            <div class="card shadow-md hover:shadow-lg hover:scale-[1.01] transition duration-300 cursor-pointer" v-for="(project, projectIndex) in paginatedProjects[projectPageIndex]" :key="projectIndex" @click="$router.push(`/project/${project?.attributes?.projectSlug}`)">
                <figure><img :src="conjunctUrl(project?.attributes?.projectCover?.data?.attributes?.url)"/></figure>
                <div class="card-body">
                    <h1 class="card-title">{{project?.attributes?.projectTitle}}</h1>
                    <span>{{project?.attributes?.projectDescription.substring(0,100) + '...'}}</span>
                    <div class="card-actions justify-end">
                        <span class="badge badge-primary" v-if="project?.attributes?.isInEarlyAccess">Early Access</span>
                        <span class="badge badge-neutral">{{project?.attributes?.projectStatus}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="w-full mt-20 justify-center join">
            <input v-for="(projects, projectsIndex) in paginatedProjects" :key="projectsIndex" class="join-item btn btn-square" type="radio" name="options" :aria-label="`${projectsIndex + 1}`" checked @click="setPageIndex(projectsIndex)"/>
        </div>
    </div>
</template>

<style scoped>

</style>