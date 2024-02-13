<script setup lang="ts">
import {onMounted, onUnmounted, ref, watch} from "vue";

const props = defineProps({
    src: { type: String, required: true },
    controls: { type: Boolean, required: false, default: false },
    loop: { type: Boolean, required: false, default: false },
    autoplay: { type: Boolean, required: false, default: false },
    muted: { type: Boolean, required: false, default: false },
    poster: { type: String, required: false },
    preload: { type: String, required: false, default: "auto" },
})

const player = ref<HTMLVideoElement | null>(null);
const progressInput = ref<any>(null)
const videoOperation = ref<string>('pause');

function play() {
    if (player.value) {
        player.value.play();
    }
}

function pause() {
    if (player.value) {
        player.value.pause();
    }
}

watch(videoOperation, (newValue) => {
    if (newValue === 'play') {
        play();
    } else {
        pause();
    }
});

function handleVideoEnded() {
    // Set video operation to pause when the video finishes playing
    videoOperation.value = 'pause';
}

onMounted(() => {
    // Update the range input value as the video progresses
    if (player.value) {
        player.value.addEventListener('timeupdate', () => {
            if (player.value) {
                const currentTime = player.value.currentTime;
                // Update the range input value
                // Assuming you have a ref for the range input named 'progressInput'
                if (progressInput.value) {
                    progressInput.value.value = currentTime;
                }
            }
        });

        // Listen for the 'ended' event on the video element
        player.value.addEventListener('ended', handleVideoEnded);
    }
});

onUnmounted(() => {
    // Cleanup event listener on component unmount
    if (player.value) {
        player.value.removeEventListener('timeupdate', () => {});
        player.value.removeEventListener('ended', handleVideoEnded);
    }
});

function handleProgressInput(event: Event) {
    const target = event.target as HTMLInputElement;
    if (player.value) {
        player.value.currentTime = parseFloat(target.value);
    }
}
</script>

<template>
    <div class="flex flex-col w-full h-fit items-center rounded-box">
        <div class="flex-grow object-contain w-full">
            <video
                :src="src"
                :muted="muted"
                :autoplay="autoplay"
                :controls="controls"
                :loop="loop"
                :poster="poster"
                :preload="preload"
                :playsinline="true"
                ref="player"
                class="rounded-t-box w-full h-full"
            />
        </div>
        <div class="flex-row flex w-full h-fit items-center bg-base-200 p-3 gap-3 rounded-b-box bottom-0" id="op-bar">
            <div class="join">
                <input class="btn btn-sm join-item" type="radio" value="play" aria-label="Play" v-model="videoOperation"/>
                <input class="btn btn-sm join-item" type="radio" value="pause" aria-label="Pause" checked v-model="videoOperation"/>
            </div>
            <input
                ref="progressInput"
                type="range"
                min="0"
                :max="player ? player?.duration : 100"
                value="0"
                class="range flex-grow"
                @input="handleProgressInput"
            />
        </div>
    </div>
</template>

<style scoped>

</style>