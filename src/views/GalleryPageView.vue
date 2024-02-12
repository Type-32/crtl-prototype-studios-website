<script setup lang="ts">
import {onBeforeMount, ref} from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from 'axios';
import {marked} from "marked";
import {useContentStore} from "@/stores/content";
import ThemeCard from "@/components/ThemeCard.vue";

const themeCards = [
    {
        theme: 'light',
        label: "Default"
    },
    {
        theme: 'dark',
        label: 'Dark'
    },
    {
        theme: 'retro',
        label: 'Retro'
    }
]

enum GuideState{
    AlreadySelected,
    SelectingTheme,
    InView
}

function handleThemeChange(theme: string) {
    document.documentElement.setAttribute('data-theme', theme); // Apply theme
    localStorage.setItem('gallery-view-theme', theme); // Store theme in localStorage
}

function applySavedTheme() {
    const savedViewingTheme = localStorage.getItem('gallery-view-theme');
    if (savedViewingTheme) {
        handleThemeChange(savedViewingTheme);
    }
}

const viewThemeAlreadyExists = () => { return !!localStorage.getItem('gallery-view-theme') }
const getExistingTheme = () => {return localStorage.getItem('gallery-view-theme')}

const $router = useRouter();
const $route = useRoute();
const gallery = ref<any>(null);
const loadingPage = ref(false);
const $content = useContentStore()
const $pageState = ref<GuideState>(GuideState.AlreadySelected)
const $selectedTheme = ref('')

onBeforeMount(async () => {
    loadingPage.value = true

    if (!$route.params.slug) {
        $router.push('galleries'); // Redirect to home page if no slug is present in URL
        return;
    }

    if(viewThemeAlreadyExists()) {
        $pageState.value = GuideState.AlreadySelected
        applySavedTheme()
    } else {
        $pageState.value = GuideState.SelectingTheme
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

function handleSelect(theme: string){
    document.documentElement.setAttribute('data-theme', theme); // Apply theme
    $selectedTheme.value = theme
}

function confirmTheme(){
    if (!$selectedTheme.value && !viewThemeAlreadyExists()) return;
    handleThemeChange($selectedTheme.value || getExistingTheme() || 'light')
    loadData()
}

async function loadData(){
    loadingPage.value = true
    try {
        await axios.get(`${import.meta.env.VITE_CMS_URL}/api/galleries?filters[gallerySlug][$eq]=${$route.params.slug}&populate[0]=galleryContent.framePiece&populate[1]=galleryContent.motionPiece&populate[2]=galleryContent.motionCover&populate[3]=galleryContent.trackPiece&populate[4]=galleryContent.trackCover&populate[5]=galleryAuthors`).then((response) => {
            gallery.value = { data: response.data.data, meta: response.data.meta };
        });
        if (gallery.value) {
            loadingPage.value = false
            console.log("Gallery Data Fetched... Initializing")
        } else {
            $router.push('404'); // Redirect to home page if post is not found
        }
    } catch (error: any) {
        console.error(`Error fetching Gallery Data: ${error?.message}`);
        $router.push('404'); // Redirect to the home page if there's any error
    }
}
</script>

<template>
    <div class="flex flex-col items-center min-h-screen justify-center" v-if="loadingPage">
        <span class="loading loading-bars loading-lg"/>
        <div class="text-base-content/70">Content is loading...</div>
    </div>
    <div class="flex flex-col w-full min-h-screen items-center" v-else>
        <div class="flex-grow flex flex-col items-center justify-center gap-5" v-if="$pageState == GuideState.SelectingTheme">
            <div class="fade-in-from-top text-center text-base-content/70 text-lg">Select your viewing theme</div>
            <div class="grid grid-cols-3 fade-in-from-bottom gap-5">
                <ThemeCard v-for="(card, cardIndex) in themeCards" :key="cardIndex"
                           :theme="card.theme" :label="card.label"
                           :class="`${card.theme == $selectedTheme ? 'outline-2 outline-primary -translate-y-0.5 ' : ''}` + 'hover:shadow-lg transition duration-300 hover:-translate-y-1'"
                           @click="handleSelect(card.theme)"
                />
            </div>
            <button :class="`btn btn-primary transition duration-300 btn-md ${!$selectedTheme ? 'opacity-0 translate-y-1 cursor-default' : 'opacity-100 translate-y-0'}`" @click="confirmTheme()">Confirm</button>
        </div>
        <div class="flex-grow flex flex-col items-center justify-center gap-5" v-else-if="$pageState == GuideState.AlreadySelected">
            <div class="fade-in-from-top text-center text-base-content/70 text-lg">
                <ThemeCard :theme="getExistingTheme()" class="mb-5"/>
                <p>You have already selected a view theme previously. Do you want to continue?</p>
            </div>
            <div class="fade-in-from-bottom flex flex-row gap-5">
                <button class="btn btn-primary" @click="confirmTheme()">Yes, Continue with my Choices!</button>
                <button class="btn" @click="$pageState = GuideState.SelectingTheme">No, I want to review my Choices...</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>