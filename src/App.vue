<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import {conjunctUrl} from "@/scripts/api";
import {onMounted} from "vue";

function handleThemeChange(theme: string) {
    document.documentElement.setAttribute('data-theme', theme); // Apply theme
    localStorage.setItem('theme', theme); // Store theme in localStorage
}

function applySavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        handleThemeChange(savedTheme);
    }
}

onMounted(() => {
    applySavedTheme();
});

function toGithub() {
    window.open('https://github.com/Type-32/crtl-prototype-studios-website')
}
</script>

<template>
    <div class="w-full min-h-screen">
        <div class="drawer bg-base-100">
            <div class="drawer-content">
                <div class="top-0 z-30 sticky backdrop-blur bg-base-100 bg-opacity-80 flex shadow-sm">
                    <nav class="navbar w-full">
                        <div class="navbar-start">
                            <!--                        Dropdown show for cell phone compatability -->
                            <div class="dropdown">
                                <div tabindex="0" role="button" class="btn btn-ghost laptop:hidden">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                         stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                              d="M4 6h16M4 12h8m-8 6h16"/>
                                    </svg>
                                </div>
                                <ul tabindex="0"
                                    class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                    <li><a @click="$router.push({name: 'posts'})">Posts</a></li>
                                    <li><a @click="$router.push({name: 'projects'})">Projects</a></li>
                                    <li><a @click="$router.push({name: 'galleries'})">Galleries</a></li>
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
                        <div class="navbar-center max-laptop:hidden lg:flex">
                            <ul class="menu menu-horizontal px-1">
                                <li><a @click="$router.push({name: 'posts'})">Posts</a></li>
                                <li><a @click="$router.push({name: 'projects'})">Projects</a></li>
                                <li><a @click="$router.push({name: 'galleries'})">Galleries</a></li>
                            </ul>
                        </div>
                        <div class="navbar-end gap-2">
                            <div class="dropdown">
                                <div tabindex="0" role="button" class="btn btn-ghost">
                                    Theme
                                    <svg width="12px" height="12px" class="h-2 w-2 fill-current opacity-60 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048"><path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path></svg>
                                </div>
                                <ul tabindex="0" class="dropdown-content z-[1] p-2 shadow-2xl backdrop-blur-xl bg-base-200 rounded-box w-fit gap-1.5 flex flex-col mt-2">
                                    <li><input type="radio" name="theme-dropdown" class="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Default" value="light" @click="handleThemeChange('light')"/></li>
                                    <li><input type="radio" name="theme-dropdown" class="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Dark" value="dark" @click="handleThemeChange('dark')"/></li>
                                    <li><input type="radio" name="theme-dropdown" class="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Retro" value="retro" @click="handleThemeChange('retro')"/></li>
                                </ul>
                            </div>
                            <a class="btn btn-outline group" @click="toGithub()">
                                <div
                                    class="size-7 rounded-3xl object-contain flex items-center justify-items-center -mx-1">
                                    <img src="/src/assets/icons8-github-120.png" alt="studio icon"
                                         class="size-32 object-contain w-full h-full transition duration-300 group-hover:hidden"/>
                                    <img src="/src/assets/icons8-github-120%20(1).png" alt="studio icon"
                                         class="size-32 object-contain w-full h-full transition duration-300 invisible group-hover:visible"/>
                                </div>
                            </a>
                        </div>
                    </nav>
                </div>
                <div class="">
                    <RouterView />
                </div>
                <footer class="footer p-10 bg-base-200 text-base-content mt-20">
                    <aside>
                        <div class="object-contain size-16 mb-3">
                            <img src="/src/assets/CRTL_v2_new_nobg_512.png"/>
                        </div>
                        <p>CRTL Prototype Studios<br>Fanatics at Computer Science since 2012</p>
                    </aside>
                    <nav>
                        <h6 class="footer-title">Services</h6>
                        <a class="link link-hover" href="/posts">Posts</a>
                        <a class="link link-hover" href="/projects">Projects</a>
                        <a class="link link-hover" href="/galleries">Galleries</a>
                    </nav>
                    <nav>
                        <h6 class="footer-title">Company</h6>
                        <a class="link link-hover" href="/">About us</a>
                        <a class="link link-hover">Contact</a>
                    </nav>
                    <nav>
                        <h6 class="footer-title">Legal</h6>
                        <a class="link link-hover">Terms of use</a>
                        <a class="link link-hover">Privacy policy</a>
                        <a class="link link-hover">Cookie policy</a>
                    </nav>
                </footer>
            </div>
            <div class="drawer-side">
                <div class="btn">Hello</div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
