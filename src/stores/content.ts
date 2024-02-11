import {defineStore} from "pinia";
import {joinUrl} from "@/scripts/api";
import axios from "axios";
import type {StoreState} from "@/scripts/interfaces/types";
import type {Payload} from "@/scripts/interfaces/defaults/Payload";
import type {Post} from "@/scripts/interfaces/post";
import type {Project} from "@/scripts/interfaces/project";
import type {Gallery} from "@/scripts/interfaces/gallery";

export const useContentStore = defineStore({
    id: 'contentStore',
    state: (): StoreState => ({
        posts: {
            data: [],
            meta: {} // replace with your default meta object
        },
        projects: {
            data: [],
            meta: {} // replace with your default meta object
        },
        galleries: {
            data: [],
            meta: {}
        }
    }),
    actions: {
        async fetchPosts(forceRefresh: boolean = false): Promise<Payload<Post[]>>{
            let posts: Payload<any[]> = { data: [], meta: {} };
            if(forceRefresh || this.posts.data.length === 0) {
                try {
                    console.log(joinUrl(["api","posts"]))
                    await axios.get(joinUrl(["api","posts"])).then((response) => {
                        posts = { data: response.data.data, meta: response.data.meta };
                        this.posts = posts;
                    });
                } catch(error) {
                    console.error('Error fetching posts:', error);
                }
            }
            return this.posts;
        },
        async fetchProjects(forceRefresh: boolean = false): Promise<Payload<Project[]>>{
            let projects: Payload<Project[]> = { data: [], meta: {} };
            if(forceRefresh || this.projects.data.length === 0) {
                try {
                    await axios.get(joinUrl(["api","projects"])).then((response) => {
                        projects = { data: response.data.data, meta: response.data.meta };
                        this.projects = projects;
                    });
                } catch(error) {
                    console.error('Error fetching projects:', error);
                }
            }
            return this.projects;
        },
        async fetchGalleries(forceRefresh: boolean = false): Promise<Payload<Gallery[]>>{
            let galleries: Payload<Gallery[]> = { data: [], meta: {} };
            if(forceRefresh || this.galleries.data.length === 0) {
                try {
                    await axios.get(joinUrl(["api","galleries"], "?populate[0]=galleryContent.framePiece&populate[1]=galleryContent.motionPiece&populate[2]=galleryContent.motionCover&populate[3]=galleryContent.trackPiece&populate[4]=galleryContent.trackCover&populate[5]=galleryAuthors", false)).then((response) => {
                        galleries = { data: response.data.data, meta: response.data.meta };
                        this.galleries = galleries;
                    });
                } catch(error) {
                    console.error('Error fetching galleries:', error);
                }
            }
            return this.galleries;
        },
        async fetchPaginatedPosts(page: number, pageLimit: number = 10): Promise<Payload<Post[]>>{
            let posts: Payload<any[]> = { data: [], meta: {} };
            try {
                await axios.get(joinUrl(["api","posts"], `?pagination[page]=${page}&pagination[pageSize]=${pageLimit}`)).then((response) => {
                    posts = { data: response.data.data, meta: response.data.meta };
                });
            } catch(error) {
                console.error('Error fetching paginated posts:', error);
            }
            return posts;
        },
        async fetchPaginatedProjects(page: number, pageLimit: number = 10): Promise<Payload<Project[]>>{
            let projects: Payload<any[]> = { data: [], meta: {} };
            try {
                await axios.get(joinUrl(["api","projects"], `?pagination[page]=${page}&pagination[pageSize]=${pageLimit}`)).then((response) => {
                    projects = { data: response.data.data, meta: response.data.meta };
                });
            } catch(error) {
                console.error('Error fetching paginated projects:', error);
            }
            return projects;
        },
        async fetchPaginatedGalleries(page: number, pageLimit: number = 10): Promise<Payload<Gallery[]>>{
            let galleries: Payload<any[]> = { data: [], meta: {} };
            try {
                await axios.get(joinUrl(["api","galleries"], `?populate[0]=galleryContent.framePiece&populate[1]=galleryContent.motionPiece&populate[2]=galleryContent.motionCover&populate[3]=galleryContent.trackPiece&populate[4]=galleryContent.trackCover&populate[5]=galleryAuthors&pagination[page]=${page}&pagination[pageSize]=${pageLimit}`)).then((response) => {
                    galleries = { data: response.data.data, meta: response.data.meta };
                });
            } catch(error) {
                console.error('Error fetching paginated galleries:', error);
            }
            return galleries;
        }
    }
})