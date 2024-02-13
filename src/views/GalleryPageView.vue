<script setup lang="ts">
import {onBeforeMount, ref} from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from 'axios';
import {marked} from "marked";
import {useContentStore} from "@/stores/content";
import ThemeCard from "@/components/ThemeCard.vue";
import image from "@/assets/image.svg";
import info from "@/assets/info.svg";
import VideoPlayer from "@/components/VideoPlayer.vue";
import MusicPlayer from "@/components/MusicPlayer.vue";

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
const galleryAuthors = ref<any>([]);
const loadingPage = ref(false);
const $content = useContentStore()
const $pageState = ref<GuideState>(GuideState.AlreadySelected)
const $selectedTheme = ref('')

const contentPieces = ref<any[]>([])
const contentPieceIndex = ref<number>(0) // Switches betweem tje
const contentSelection = ref('img') // Switches between the content panels

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
        console.log($route.params.slug)
        await axios.get(`${import.meta.env.VITE_CMS_URL}/api/galleries?filters[gallerySlug][$eq]=${$route.params.slug}&populate[0]=galleryContent.framePiece&populate[1]=galleryContent.motionPiece&populate[2]=galleryContent.motionCover&populate[3]=galleryContent.trackPiece&populate[4]=galleryContent.trackCover&populate[5]=galleryAuthors`).then((response) => {
            gallery.value = { data: response.data.data, meta: response.data.meta };
        });
        if (gallery.value) {
            $pageState.value = GuideState.InView
            console.log("Gallery Data Fetched... Initializing")

            gallery.value.data[0]?.attributes.galleryContent.forEach((item: any) => {
                contentPieces.value.push({
                    title: item.frameTitle || item.motionTitle || item.trackTitle || 'Untitled Piece',
                    context: item.frameContext || item.motionContext || item.trackContext || 'May there be dragons here...',
                    piece: item.framePiece?.data?.attributes?.url || item.motionPiece?.data?.attributes?.url || item.trackPiece?.data?.attributes?.url || null,
                    cover: item.framePiece?.data?.attributes?.url || item.motionCover?.data?.attributes?.url || item.trackCover?.data?.attributes?.url || null,
                    mime: item.motionPiece?.data?.attributes?.mime || item.trackPiece?.data?.attributes?.mime || null,
                    type: item.__component || ''
                });
            })

            gallery.value.data[0]?.attributes.galleryAuthors?.data?.forEach((author: any) => {
                galleryAuthors.value.push(author?.attributes?.username)
            })

            console.log("Initialized.")
            contentSelection.value = (contentPieces.value[contentPieceIndex.value].type != 'gallery-content-types.frame' ? 'itm' : 'img')

            loadingPage.value = false
        } else {
            $router.push('404'); // Redirect to home page if post is not found
        }
    } catch (error: any) {
        console.error(`Error fetching Gallery Data: ${error?.message}`);
        $router.push('404'); // Redirect to the home page if there's any error
    }
}

function nextItem(){
    if (contentPieceIndex.value >= contentPieces.value.length - 1) return;
    contentPieceIndex.value++
    contentSelection.value = (contentPieces.value[contentPieceIndex.value].type != 'gallery-content-types.frame' ? 'itm' : 'img')
}
function previousItem(){
    if (contentPieceIndex.value <= 0) return;
    contentPieceIndex.value--
    contentSelection.value = (contentPieces.value[contentPieceIndex.value].type != 'gallery-content-types.frame' ? 'itm' : 'img')
}
</script>

<template>
    <div class="flex flex-col items-center min-h-screen justify-center" v-if="loadingPage">
        <span class="loading loading-bars loading-lg"/>
        <div class="text-base-content/70">Content is loading...</div>
    </div>
    <div class="flex flex-col w-full h-full items-center" v-else>

<!--        Theme Selection Section-->
        <div class="flex-grow flex flex-col items-center justify-center gap-5 min-h-screen" v-if="$pageState == GuideState.SelectingTheme">
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

<!--        Confirm Theme Selection with Pre-existing Config-->
        <div class="flex-grow flex flex-col items-center justify-center gap-5 min-h-screen" v-else-if="$pageState == GuideState.AlreadySelected">
            <div class="fade-in-from-top text-center text-base-content/70 text-lg">
                <ThemeCard :theme="getExistingTheme()" class="mb-5"/>
                <p>You have already selected a view theme previously. Do you want to continue?</p>
            </div>
            <div class="fade-in-from-bottom flex flex-row gap-5">
                <button class="btn btn-primary" @click="confirmTheme()">Yes, Continue with my Choices!</button>
                <button class="btn" @click="$pageState = GuideState.SelectingTheme">No, I want to review my Choices...</button>
            </div>
        </div>

<!--        Content Section-->
        <div class="w-full flex-grow items-center px-10 py-5 flex flex-col gap-5" v-else>

<!--            Title Bar-->
            <div class="text-center">
                <div class="text-lg font-bold text-base-content">{{ contentPieces[contentPieceIndex].title }}</div>
                <div class="text-base-content/70 text-sm">{{ contentPieceIndex + 1 }} of {{contentPieces.length}} in the Gallery</div>
            </div>

<!--            Content Panels-->
            <div class="h-fit max-h-screen">
<!--                    Image and Context Content Panels-->
                <div class="glass bg-base-200 w-full p-5 rounded-box" v-if="contentSelection != 'itm'">

<!--                    Image Content Panel-->
                    <img :src="contentPieces[contentPieceIndex].cover"
                         :class="`transition duration-300 flex-grow object-contain max-w-full max-h-full ${contentSelection != 'img' ? contentSelection == 'ctx' ? 'opacity-50' : 'opacity-0' : 'opacity-100'}`"
                         style="height: auto; max-height: calc(100vh - 10rem); width: auto;"
                    />

<!--                    Context Content Panel-->
                    <div :class="`flex flex-col inset-0 absolute items-center justify-center transition duration-300 ${contentSelection == 'ctx' ? 'opacity-100' : 'opacity-0'}`" v-if="contentSelection == 'ctx'">
                        <div class="text-center rounded-box bg-base-200 p-5">{{ contentPieces[contentPieceIndex].context }}</div>
                    </div>
                </div>

<!--                Motion Content Panel-->
                <VideoPlayer :src="contentPieces[contentPieceIndex].piece" class="max-h-screen" v-else-if="contentSelection == 'itm' && contentPieces[contentPieceIndex].type == 'gallery-content-types.motion'"/>

                <!--                Motion Content Panel-->
                <MusicPlayer :src="contentPieces[contentPieceIndex].cover" class="max-h-screen" :audio="contentPieces[contentPieceIndex].piece" v-else/>
            </div>

<!--            Control Bar-->
            <div class="w-full flex flex-row">

<!--                Previous Item Button-->
                <button class="btn flex-row flex group items-center transition duration-300" :disabled="contentPieceIndex <= 0" @click="previousItem()">
                    <div class="text-md group-hover:-translate-x-1 -mr-1 transition duration-300"> {{ '<' }} </div>
                    <div class="text-md text-left font-normal">Previous Item</div>
                </button>

<!--                Panel Controls Radio Buttons-->
                <div class="flex-grow flex justify-center">
                    <div :class="`join items-center grid ${contentPieces[contentPieceIndex].type != 'gallery-content-types.frame' ? 'grid-cols-3' : 'grid-cols-2'}`">
                        <input v-if="contentPieces[contentPieceIndex].type != 'gallery-content-types.frame'" class="btn join-item" type="radio" value="itm" :aria-label="contentPieces[contentPieceIndex].type == 'gallery-content-types.motion' ? 'Motion' : 'Track'" v-model="contentSelection"/>
                        <input class="btn join-item" type="radio" value="img" aria-label="Image" v-model="contentSelection"/>
                        <input class="btn join-item" type="radio" value="ctx" aria-label="Context" v-model="contentSelection"/>
                    </div>
                </div>

<!--                Next Item Button-->
                <button class="btn flex-row flex group items-center transition duration-300" :disabled="contentPieces.length <= contentPieceIndex + 1" @click="nextItem()">
                    <div class="text-md text-left font-normal">Next Item</div>
                    <div class="text-md group-hover:translate-x-1 -ml-1 transition duration-300"> {{ '>' }} </div>
                </button>
            </div>

<!--            Exit Gallery Button-->
            <button class="btn btn-ghost btn-sm" onclick="exitGalleryModal.showModal()">Exit Gallery</button>

            <div class="text-sm text-base-content/70">Viewing Gallery <b class="text-base-content/100">{{ gallery.data[0]?.attributes.galleryTitle }}</b>, by {{ galleryAuthors?.toString() }}</div>

<!--            Confirm Exit Modal-->
            <dialog id="exitGalleryModal" class="modal">
                <div class="modal-box">
                    <h3 class="font-bold text-lg">Exit Gallery</h3>
                    <p class="py-4">You pressed on the exit button! Are you sure you want to leave this experience?</p>
                    <div class="modal-action flex flex-row justify-center items-center">
                        <form method="dialog">
                            <!-- if there is a button in form, it will close the modal -->
                            <button class="btn btn-neutral">No, that was a mistake</button>
                            <a class="btn btn-error ml-4" href="/galleries">Yes, I confirm my choices</a>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    </div>
</template>

<style scoped>
</style>