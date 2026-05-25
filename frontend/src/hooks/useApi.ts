import { useQuery, useMutation } from '@tanstack/react-query';
import { api } from '../lib/api';
import type {
  FloweredSpotMarker,
  FloweredSpotDetail,
  StorySummary,
  StoryDetail,
  PublicStats,
  ContactFormPayload,
} from '../types/api';

/**
 * Centralized data hooks.
 * Pages use these to fetch data in a single line, getting caching,
 * loading and error states "for free" thanks to React Query.
 */

export function usePublicStats() {
  return useQuery<PublicStats>({
    queryKey: ['stats'],
    queryFn: () => api.get<PublicStats>('/v1/stats'),
  });
}

export function useMapMarkers() {
  return useQuery<FloweredSpotMarker[]>({
    queryKey: ['spots'],
    queryFn: () => api.get<FloweredSpotMarker[]>('/v1/spots'),
  });
}

export function useSpotDetail(id: number | null) {
  return useQuery<FloweredSpotDetail>({
    queryKey: ['spot', id],
    queryFn: () => api.get<FloweredSpotDetail>(`/v1/spots/${id}`),
    enabled: id !== null,
  });
}

export function useStories() {
  return useQuery<StorySummary[]>({
    queryKey: ['stories'],
    queryFn: () => api.get<StorySummary[]>('/v1/stories'),
  });
}

export function useStory(slug: string | undefined) {
  return useQuery<StoryDetail>({
    queryKey: ['story', slug],
    queryFn: () => api.get<StoryDetail>(`/v1/stories/${slug}`),
    enabled: !!slug,
  });
}

export function useSubmitContact() {
  return useMutation({
    mutationFn: (payload: ContactFormPayload) =>
      api.post<{ id: number; status: string }>('/v1/contact', payload),
  });
}
