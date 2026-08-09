export type FrameFormat = 'BUILDER_ID' | 'PFP' | 'CREW';

export interface Teammate {
  id: string;
  name: string;
  role: string;
  photoUrl: string | null;
  cropX: number;
  cropY: number;
  cropZoom: number;
}

export interface BuilderData {
  name: string;
  role: string;
  stack: string;
  buildingText: string;
  city: string;
  passportNo: string;
  photoUrl: string | null;
  cropX: number;
  cropY: number;
  cropZoom: number;
  format: FrameFormat;
  teamName: string;
  projectUrl?: string;
  teammates: Teammate[];
}

export interface CropState {
  x: number;
  y: number;
  zoom: number;
}
