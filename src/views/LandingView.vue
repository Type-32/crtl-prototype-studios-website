<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useContentStore} from "@/stores/content";
import type {Post, Project} from "@/scripts/interfaces/types";
import {conjunctUrl} from "@/scripts/api";

const $content = useContentStore()

const postsRaw = ref<any[]>([]);
const projectsRaw = ref<any[]>([]);
const loadingPage = ref(false)

onMounted(async () => {
    loadingPage.value = true
    postsRaw.value = (await $content.fetchPosts(true)).data;
    projectsRaw.value = (await $content.fetchProjects(true)).data;
    loadingPage.value = false
})
</script>

<template>
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
    <div class="hero h-max bg-base-100">
        <div class="hero-content flex flex-row gap-28">
            <div class="stack w-96">
                <div class="card shadow-xl w-96 glass">
                    <figure><img :src="conjunctUrl(projectsRaw[0]?.attributes.projectCover?.data?.attributes?.url)" alt="Post Image"/></figure>
                    <div class="card-body">
                        <div class="text-md text-base-600 opacity-60">Project</div>
                        <a class="font-bold text-2xl">{{projectsRaw[0]?.attributes.projectTitle}}</a>
                        <div class="text-sm text-base-600">{{projectsRaw[0]?.attributes.projectDescription?.substring(0,45) + '...'}}</div>
                    </div>
                </div>
            </div>
            <div class="max-w-lg">
                <h1 class="text-5xl font-bold">
                    Our Projects
                </h1>
                <p class="py-6">These are some of our latest projects that's working in progress. Our progress mostly cover the areas of software dev and game design and development.</p>
                <button class="btn btn-primary" @click="$router.push('projects')">Learn More</button>
            </div>
        </div>
    </div>
    <div class="hero h-max mt-60 bg-base-100">
        <div class="hero-content flex flex-row gap-28">
            <div class="max-w-lg">
                <h1 class="text-5xl font-bold">
                    Our Posts
                </h1>
                <p class="py-6">These are some of our latest posts that usually covers some interesting topics, sometimes around casual stuff but mostly about development. They're good articles to read and chill to if you're having a bad day ;)</p>
                <button class="btn btn-primary" @click="$router.push('posts')">Learn More</button>
            </div>
            <div class="card shadow-xl w-96 glass">
                <figure><img :src="conjunctUrl(postsRaw[0]?.attributes.postCover?.data?.attributes?.url)" alt="Post Image"/></figure>
                <div class="card-body">
                    <div class="text-md text-base-600 opacity-60">Post</div>
                    <a class="font-bold text-2xl">{{postsRaw[0]?.attributes.postTitle}}</a>
                    <div class="text-sm text-base-600">{{postsRaw[0]?.attributes.postContent?.substring(0,45) + '...'}}</div>
                </div>
            </div>
        </div>
    </div>
    <footer class="footer p-10 bg-base-200 text-base-content mt-40">
        <aside>
            <div class="object-contain size-16 mb-3">
                <img src="/src/assets/CRTL_v2_new_nobg_512.png"/>
            </div>
            <p>CRTL Prototype Studios<br>Fanatics at Computer Science since 2012</p>
        </aside>
        <nav>
            <h6 class="footer-title">Services</h6>
            <a class="link link-hover">Products</a>
            <a class="link link-hover">Designs</a>
            <a class="link link-hover">Blogs</a>
        </nav>
        <nav>
            <h6 class="footer-title">Company</h6>
            <a class="link link-hover">About us</a>
            <a class="link link-hover">Contact</a>
        </nav>
        <nav>
            <h6 class="footer-title">Legal</h6>
            <a class="link link-hover">Terms of use</a>
            <a class="link link-hover">Privacy policy</a>
            <a class="link link-hover">Cookie policy</a>
        </nav>
    </footer>
</template>

<style scoped>

</style>