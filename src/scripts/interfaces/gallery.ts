// Interface automatically generated by schemas-to-ts

import type {User, User_Plain} from "@/scripts/interfaces/defaults/User";
import type {
  AdminPanelRelationPropertyModification
} from "@/scripts/interfaces/defaults/AdminPanelRelationPropertyModification";

export interface Gallery {
  id: number;
  attributes: {
    createdAt: Date;    updatedAt: Date;    publishedAt?: Date;    galleryTitle: string;
    galleryBrief: string;
    galleryContent: any;
    gallerySlug: string;
    galleryAuthors: { data: User[] };
  };
}
export interface Gallery_Plain {
  id: number;
  createdAt: Date;  updatedAt: Date;  publishedAt?: Date;  galleryTitle: string;
  galleryBrief: string;
  galleryContent: any;
  gallerySlug: string;
  galleryAuthors: User_Plain[];
}

export interface Gallery_NoRelations {
  id: number;
  createdAt: Date;  updatedAt: Date;  publishedAt?: Date;  galleryTitle: string;
  galleryBrief: string;
  galleryContent: any;
  gallerySlug: string;
  galleryAuthors: number[];
}

export interface Gallery_AdminPanelLifeCycle {
  id: number;
  createdAt: Date;  updatedAt: Date;  publishedAt?: Date;  galleryTitle: string;
  galleryBrief: string;
  galleryContent: any;
  gallerySlug: string;
  galleryAuthors: AdminPanelRelationPropertyModification<User_Plain>;
}