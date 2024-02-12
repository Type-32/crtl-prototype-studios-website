import { createRouter, createWebHistory } from 'vue-router'
import LandingView from "@/views/LandingView.vue";
import PostsListView from "@/views/PostsListView.vue";
import PostPageView from "@/views/PostPageView.vue";
import ProjectsListView from "@/views/ProjectsListView.vue";
import ProjectPageView from "@/views/ProjectPageView.vue";
import GalleriesView from "@/views/GalleriesListView.vue";
import GalleryPageView from "@/views/GalleryPageView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LandingView
    },
    {
      path: '/posts',
      name: 'posts',
      component: PostsListView
    },
    {
      path: '/projects',
      name: 'projects',
      component: ProjectsListView
    },
    {
      path: '/galleries',
      name: 'galleries',
      component: GalleriesView
    },
    {
      path: '/post/:slug',
      component: PostPageView
    },
    {
      path: '/project/:slug',
      component: ProjectPageView
    },
    {
      path: '/gallery/:slug',
      component: GalleryPageView
    },
    {
      path: '/404',
      name: '404',
      component: LandingView
    }
  ]
})

export default router
