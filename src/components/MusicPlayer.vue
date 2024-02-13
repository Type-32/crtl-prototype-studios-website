<template>
    <div class="relative flex flex-col gap-5 justify-center items-center">
        <img :src="src" class="max-w-full max-h-screen p-5 glass rounded-box bg-base-200" alt="Cover Image"
             style="height: auto; max-height: calc(100vh - 10rem); width: auto;" />
        <audio ref="audioPlayer" class="w-full" controls>
            <source :src="audio" type="audio/mp3">
            Your browser does not support the audio tag.
        </audio>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const audioPlayer = ref<HTMLAudioElement | null>(null);
const isPlaying = ref(false);
const showControls = ref(false);

const togglePlayback = () => {
    const audio = audioPlayer.value;
    if (audio?.paused) {
        audio.play();
        isPlaying.value = true;
    } else {
        audio?.pause();
        isPlaying.value = false;
    }
};

const handleMouseEnter = () => {
    showControls.value = true;
};

const handleMouseLeave = () => {
    showControls.value = false;
};

onMounted(() => {
    const audio = audioPlayer.value;

    if (audio) {
        audio.addEventListener('mouseenter', handleMouseEnter);
        audio.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
        if (audio) {
            audio.removeEventListener('mouseenter', handleMouseEnter);
            audio.removeEventListener('mouseleave', handleMouseLeave);
        }
    };
});

const props = defineProps<{
    audio: string;
    src: string;
}>();

</script>

<style scoped>
/* You can add custom styles or modify existing TailwindCSS classes here */
</style>
