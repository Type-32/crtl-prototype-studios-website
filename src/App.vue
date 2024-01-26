<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import {conjunctUrl} from "@/scripts/api";
</script>

<template>
    <div class="w-full min-h-screen">
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
                                    <li><a @click="$router.push({name: 'posts'})">Posts</a></li>
                                    <li><a @click="$router.push({name: 'projects'})">Projects</a></li>
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
                                <li><a @click="$router.push({name: 'posts'})">Posts</a></li>
                                <li><a @click="$router.push({name: 'projects'})">Projects</a></li>
                            </ul>
                        </div>
                        <div class="navbar-end">
                            <!--                        <a class="btn">Button</a>-->
                        </div>
                    </nav>
                </div>
                <div class="">
                    <RouterView />
                </div>
            </div>
            <div class="drawer-side">
                <div class="btn">Hello</div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
