import {defineStore} from "pinia";
import {joinUrl} from "@/scripts/api";
import axios from "axios";
import type {Post, Project, Payload} from "@/scripts/interfaces/types";

export const useContentStore = defineStore({
    id: 'contentStore',
    state: () => ({
        posts: [] as Post[],
        projects: [] as Project[],
    }),
    actions: {
        async fetchPosts(forceRefresh: boolean = false): Promise<Payload<Post[]>>{
            let posts: Payload<Post[]> = { data: [], meta: {} };  // you might want to provide a proper default meta object here
            if(forceRefresh || this.posts == null) {
                try {
                    await axios.get(joinUrl(["api","posts"])).then((response) => {
                        posts = { data: response.data.data, meta: response.data.meta };
                        this.posts = response.data.data;
                    });
                } catch(error) {
                    console.error('Error fetching posts:', error);
                }
            }

            return posts;
        },
        async fetchProjects(forceRefresh: boolean = false): Promise<Payload<Project[]>>{
            let projects: Payload<Project[]> = { data: [], meta: {} };  // you might want to provide a proper default meta object here
            if(forceRefresh || this.posts == null) {
                try {
                    await axios.get(joinUrl(["api","projects"])).then((response) => {
                        projects = { data: response.data.data, meta: response.data.meta };
                        this.projects = response.data.data;
                    });
                } catch(error) {
                    console.error('Error fetching projects:', error);
                }
            }

            return projects;
        }
    }
})