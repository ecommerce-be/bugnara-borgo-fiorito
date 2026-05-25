/**
 * TypeScript counterparts of the backend DTOs.
 * Keep in sync with com.borghettofiorito.api.dto.response.*
 */

export type SpotType = 'PRIVATE_HOUSE' | 'PUBLIC_SPACE';

export interface FloweredSpotMarker {
  id: number;
  title: string;
  type: SpotType;
  latitude: number;
  longitude: number;
  thumbnailUrl: string | null;
}

export interface SpotPhoto {
  id: number;
  imageUrl: string;
  caption: string | null;
  isBeforePhoto: boolean;
  displayOrder: number;
}

export interface ParticipantSummary {
  id: number;
  displayName: string;
}

export interface FloweredSpotDetail {
  id: number;
  title: string;
  description: string | null;
  type: SpotType;
  latitude: number;
  longitude: number;
  addressHint: string | null;
  photos: SpotPhoto[];
  participants: ParticipantSummary[];
}

export interface StorySummary {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  coverImageUrl: string | null;
  authorName: string | null;
  publishedAt: string | null;
}

export interface StoryDetail extends StorySummary {
  contentMarkdown: string | null;
}

export interface PublicStats {
  publishedSpots: number;
  privateHouseSpots: number;
  publicSpaceSpots: number;
  participants: number;
  publishedStories: number;
}

export interface HealthResponse {
  status: string;
  service: string;
  timestamp: string;
}

export type ContactSubject = 'GENERIC_INFO' | 'JOIN_INITIATIVE' | 'SUGGEST_SPOT' | 'OTHER';

export interface ContactFormPayload {
  name: string;
  email: string;
  phone?: string;
  subject: ContactSubject;
  message: string;
}
