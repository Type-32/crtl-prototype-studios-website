import {defineStore} from "pinia";
import {joinUrl} from "@/scripts/api";
import axios from "axios";
import type {Post, Project, Payload, StoreState} from "@/scripts/interfaces/types";

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
        }
    }),
    actions: {
        async fetchPosts(forceRefresh: boolean = false): Promise<Payload<Post[]>>{
            let posts: Payload<any[]> = { data: [], meta: {} };
            if(forceRefresh || this.posts.data.length === 0) {
                try {
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
        }
    }
})