// Interface automatically generated by schemas-to-ts

import type {Media} from "@/scripts/interfaces/defaults/Media";

export interface Frame {
  frameTitle: string;
  frameContext: string;
  framePiece: { data: Media };
}
export interface Frame_Plain {
  frameTitle: string;
  frameContext: string;
  framePiece: Media;
}

export interface Frame_NoRelations {
  frameTitle: string;
  frameContext: string;
  framePiece: number;
}

