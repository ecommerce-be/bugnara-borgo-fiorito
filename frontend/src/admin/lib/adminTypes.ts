import type { SpotType } from '../../types/api';

export type PublicationStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
export type ContactSubject = 'GENERIC_INFO' | 'JOIN_INITIATIVE' | 'SUGGEST_SPOT' | 'OTHER';

export interface AdminSpot {
  id: number;
  title: string;
  description: string | null;
  type: SpotType;
  status: PublicationStatus;
  latitude: number;
  longitude: number;
  addressHint: string | null;
  consentGiven: boolean;
  consentDate: string | null;
  showParticipants: boolean;
  photos: AdminSpotPhoto[];
  createdAt: string;
  updatedAt: string;
}

export interface AdminSpotPhoto {
  id: number;
  imageUrl: string;
  caption: string | null;
  isBeforePhoto: boolean;
  displayOrder: number;
}

export interface SpotUpsertRequest {
  title: string;
  description: string;
  type: SpotType;
  status: PublicationStatus;
  latitude: number;
  longitude: number;
  addressHint: string;
  consentGiven: boolean;
  consentDate: string | null;
  showParticipants: boolean;
}

export interface AdminStory {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  contentMarkdown: string | null;
  coverImageUrl: string | null;
  authorName: string | null;
  publishedAt: string | null;
  status: PublicationStatus;
  createdAt: string;
  updatedAt: string;
}

export interface StoryUpsertRequest {
  title: string;
  slug: string;
  excerpt: string;
  contentMarkdown: string;
  coverImageUrl: string;
  authorName: string;
  publishedAt: string | null;
  status: PublicationStatus;
}

export interface AdminContactMessage {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  subject: ContactSubject;
  message: string;
  read: boolean;
  archived: boolean;
  createdAt: string;
}

export interface CloudinarySignature {
  cloudName: string;
  apiKey: string;
  uploadPreset: string;
  folder: string;
  timestamp: number;
  signature: string;
}
