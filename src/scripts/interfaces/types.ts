import type {Payload} from "@/scripts/interfaces/defaults/Payload";
import type {Post} from "@/scripts/interfaces/post";
import type {Project} from "@/scripts/interfaces/project";
import type {Gallery} from "@/scripts/interfaces/gallery";

export interface StoreState {
    posts: Payload<Post[]>;
    projects: Payload<Project[]>;
    galleries: Payload<Gallery[]>;
}