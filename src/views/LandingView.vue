<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useContentStore} from "@/stores/content";
import type {Post, Project} from "@/scripts/interfaces/types";

const $content = useContentStore()

const postsRaw = ref<Post[]>([]);
const projectsRaw = ref<Project[]>([]);
const loadingPage = ref(false)

onMounted(async () => {
    loadingPage.value = true
    postsRaw.value = (await $content.fetchPosts(true)).data;
    projectsRaw.value = (await $content.fetchProjects(true)).data;
    console.log(postsRaw.value)
    console.log(projectsRaw.value)
    console.log(projectsRaw?.value[0].attributes.projectCover?.data[0])
    loadingPage.value = false
})
</script>

<template>
    <div class="drawer bg-base-100">
        <div class="drawer-content">
            <div class="top-0 z-30 bg-transparent sticky backdrop-blur bg-base-100 bg-opacity-90 flex shadow-sm">
                <nav class="navbar w-full">
                    <div class="navbar-start">
<!--                        Dropdown show for cell phone compatability -->
                        <div class="dropdown">
                            <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                     stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                          d="M4 6h16M4 12h8m-8 6h16"/>
                                </svg>
                            </div>
                            <ul tabindex="0"
                                class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                <li><a>Posts</a></li>
                                <li><a>Projects</a></li>
                            </ul>
                        </div>
<!--                        Icon shows for desktop compatability -->
                        <div class="btn btn-ghost text-xl" @click="$router.push('/')">
                            <div
                                class="size-8 rounded-3xl bg-base-100 object-contain flex items-center">
                                <img src="/src/assets/CRTL_v2_new_nobg_512.png" alt="studio icon"
                                     class="size-32 object-contain w-full h-full"/>
                            </div>
                        </div>
                    </div>
                    <div class="navbar-center hidden lg:flex">
                        <ul class="menu menu-horizontal px-1">
                            <li><a @click="$router.push('posts')">Posts</a></li>
                            <li><a @click="$router.push('projects')">Projects</a></li>
                        </ul>
                    </div>
                    <div class="navbar-end">
<!--                        <a class="btn">Button</a>-->
                    </div>
                </nav>
            </div>
            <div class="h-full">
                <div class="hero min-h-screen bg-base-100">
                    <div class="hero-content flex flex-row gap-28">
                        <div class="max-w-lg">
                            <h1 class="text-5xl font-bold">Hello from
                                <span
                                    class="[&::selection]:text-base-content relative col-start-1 row-start-1 bg-[linear-gradient(90deg,theme(colors.error)_0%,theme(colors.secondary)_9%,theme(colors.secondary)_42%,theme(colors.primary)_47%,theme(colors.accent)_100%)] bg-clip-text [-webkit-text-fill-color:transparent] [&::selection]:bg-blue-700/20 [@supports(color:oklch(0_0_0))]:bg-[linear-gradient(90deg,oklch(var(--s))_4%,color-mix(in_oklch,oklch(var(--s)),oklch(var(--er)))_22%,oklch(var(--p))_45%,color-mix(in_oklch,oklch(var(--p)),oklch(var(--a)))_67%,oklch(var(--a))_100.2%)]">
                                    CRTL Prototype Studios
                                </span>!
                            </h1>
                            <p class="py-6">We are a group of Software Developers & Game Design & Developers with a
                                passion of exploring every tech stack available and putting them to practical use.</p>
                            <button class="btn btn-primary">Learn More</button>
                        </div>
                        <div
                            class="size-64 rotate-6 rounded-3xl bg-base-100 drop-shadow-lg object-contain p-12 flex items-center">
                            <img src="/src/assets/CRTL_v2_new_nobg_512.png" alt="studio icon"
                                 class="size-32 object-contain w-full h-full"/>
                        </div>
                    </div>
                </div>
                <div class="hero min-h-screen bg-base-100">
                    <div class="hero-content flex flex-row gap-28">
                        <div class="card shadow-xl w-96">
                            <figure><img :src="projectsRaw[0]?.attributes.projectCover?.data?.attributes?.url" alt="Post Image"/></figure>
                            <div class="card-body">
                                <a class="font-bold text-2xl">{{projectsRaw[0]?.attributes.projectName}}</a>
                            </div>
                        </div>
                        <div class="max-w-lg">
                            <h1 class="text-5xl font-bold">Hello from
                                <span
                                    class="[&::selection]:text-base-content relative col-start-1 row-start-1 bg-[linear-gradient(90deg,theme(colors.error)_0%,theme(colors.secondary)_9%,theme(colors.secondary)_42%,theme(colors.primary)_47%,theme(colors.accent)_100%)] bg-clip-text [-webkit-text-fill-color:transparent] [&::selection]:bg-blue-700/20 [@supports(color:oklch(0_0_0))]:bg-[linear-gradient(90deg,oklch(var(--s))_4%,color-mix(in_oklch,oklch(var(--s)),oklch(var(--er)))_22%,oklch(var(--p))_45%,color-mix(in_oklch,oklch(var(--p)),oklch(var(--a)))_67%,oklch(var(--a))_100.2%)]">
                                    CRTL Prototype Studios
                                </span>!
                            </h1>
                            <p class="py-6">We are a group of Software Developers & Game Design & Developers with a
                                passion of exploring every tech stack available and putting them to practical use.</p>
                            <button class="btn btn-primary">Learn More</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="drawer-side">
            <div class="btn">Hello</div>
        </div>
    </div>
</template>

<style scoped>

</style>