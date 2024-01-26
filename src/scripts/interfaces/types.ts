export interface Payload<T> {
    data: T;
    meta: {
        pagination?: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        }
    };
}
export interface Post {
    id: number;
    attributes: {
        createdAt: Date;
        updatedAt: Date;
        publishedAt?: Date;
        postTitle: string;
        postSlug: string;
        postContent: string;
        postCover?: { data: Media };
        postUid?: string;
        parentProject?: { data: Project };
        locale: string;
        localizations?: { data: Post[] };
    };
}
export interface Project {
    id: number;
    attributes: {
        createdAt: Date;    updatedAt: Date;    publishedAt?: Date;    projectName: string;
        isInEarlyAccess?: boolean;
        projectSlug: string;
        projectDescription?: string;
        projectUid?: string;
        projectCover?: { data: Media[] };
        posts: { data: Post[] };
        locale: string;
        localizations?: { data: Project[] };
    };
}
export interface User {
    id: number;
    attributes: {
        username: string;
        email: string;
        provider: string;
        confirmed: boolean;
        blocked: boolean;
        createdAt: Date;
        updatedAt: Date;
    }
}

export interface MediaFormat {
    name: string;
    hash: string;
    ext: string;
    mime: string;
    width: number;
    height: number;
    size: number;
    path: string;
    url: string;
}
export interface Media {
    id: number;
    attributes: {
        name: string;
        alternativeText: string;
        caption: string;
        width: number;
        height: number;
        formats: { thumbnail: MediaFormat; small: MediaFormat; medium: MediaFormat; large: MediaFormat; };
        hash: string;
        ext: string;
        mime: string;
        size: number;
        url: string;
        previewUrl: string;
        provider: string;
        createdAt: Date;
        updatedAt: Date;
    }
}

export interface Pagination {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
}

export interface Payload<T> {
    data: T;
    meta: {
        pagination?: Pagination;
    };
}

export interface Payload<T> {
    data: T;
    meta: {
        pagination?: Pagination
    }; // replace with your meta type
}

export interface StoreState {
    posts: Payload<Post[]>;
    projects: Payload<Project[]>;
}