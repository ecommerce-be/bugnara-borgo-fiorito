import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '../lib/adminApi';
import type {
  AdminSpot,
  SpotUpsertRequest,
  AdminStory,
  StoryUpsertRequest,
  AdminContactMessage,
  CloudinarySignature,
} from '../lib/adminTypes';

// ============= Spots =============

export function useAdminSpots() {
  return useQuery<AdminSpot[]>({
    queryKey: ['admin', 'spots'],
    queryFn: () => adminApi.get<AdminSpot[]>('/v1/admin/spots'),
  });
}

export function useAdminSpot(id: number | undefined) {
  return useQuery<AdminSpot>({
    queryKey: ['admin', 'spot', id],
    queryFn: () => adminApi.get<AdminSpot>(`/v1/admin/spots/${id}`),
    enabled: id !== undefined,
  });
}

export function useCreateSpot() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (req: SpotUpsertRequest) =>
      adminApi.post<AdminSpot>('/v1/admin/spots', req),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'spots'] });
      queryClient.invalidateQueries({ queryKey: ['spots'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
    },
  });
}

export function useUpdateSpot(id: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (req: SpotUpsertRequest) =>
      adminApi.put<AdminSpot>(`/v1/admin/spots/${id}`, req),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'spots'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'spot', id] });
      queryClient.invalidateQueries({ queryKey: ['spots'] });
      queryClient.invalidateQueries({ queryKey: ['spot', id] });
    },
  });
}

export function useDeleteSpot() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => adminApi.delete<void>(`/v1/admin/spots/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'spots'] });
      queryClient.invalidateQueries({ queryKey: ['spots'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
    },
  });
}

// ============= Stories =============

export function useAdminStories() {
  return useQuery<AdminStory[]>({
    queryKey: ['admin', 'stories'],
    queryFn: () => adminApi.get<AdminStory[]>('/v1/admin/stories'),
  });
}

export function useAdminStory(id: number | undefined) {
  return useQuery<AdminStory>({
    queryKey: ['admin', 'story', id],
    queryFn: () => adminApi.get<AdminStory>(`/v1/admin/stories/${id}`),
    enabled: id !== undefined,
  });
}

export function useCreateStory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (req: StoryUpsertRequest) =>
      adminApi.post<AdminStory>('/v1/admin/stories', req),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'stories'] });
      queryClient.invalidateQueries({ queryKey: ['stories'] });
    },
  });
}

export function useUpdateStory(id: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (req: StoryUpsertRequest) =>
      adminApi.put<AdminStory>(`/v1/admin/stories/${id}`, req),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'stories'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'story', id] });
      queryClient.invalidateQueries({ queryKey: ['stories'] });
    },
  });
}

export function useDeleteStory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => adminApi.delete<void>(`/v1/admin/stories/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'stories'] });
      queryClient.invalidateQueries({ queryKey: ['stories'] });
    },
  });
}

// ============= Messages =============

export function useAdminMessages() {
  return useQuery<AdminContactMessage[]>({
    queryKey: ['admin', 'messages'],
    queryFn: () => adminApi.get<AdminContactMessage[]>('/v1/admin/messages'),
  });
}

export function useUnreadCount() {
  return useQuery<{ count: number }>({
    queryKey: ['admin', 'messages', 'unread'],
    queryFn: () => adminApi.get<{ count: number }>('/v1/admin/messages/unread-count'),
    refetchInterval: 60_000, // refresh every minute
  });
}

export function useMarkMessageRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) =>
      adminApi.patch<AdminContactMessage>(`/v1/admin/messages/${id}/read`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'messages'] });
    },
  });
}

export function useArchiveMessage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) =>
      adminApi.patch<AdminContactMessage>(`/v1/admin/messages/${id}/archive`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'messages'] });
    },
  });
}

// ============= Photos / Cloudinary =============

export function useUploadSignature() {
  return useMutation({
    mutationFn: (subfolder?: string) =>
      adminApi.get<CloudinarySignature>(
        `/v1/admin/photos/upload-signature${subfolder ? `?subfolder=${encodeURIComponent(subfolder)}` : ''}`
      ),
  });
}

export function useAttachPhoto(spotId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      imageUrl: string;
      caption: string;
      isBeforePhoto: boolean;
      displayOrder: number;
    }) => adminApi.post(`/v1/admin/spots/${spotId}/photos`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'spot', spotId] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'spots'] });
      queryClient.invalidateQueries({ queryKey: ['spot', spotId] });
    },
  });
}

export function useDeletePhoto(spotId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (photoId: number) => adminApi.delete<void>(`/v1/admin/photos/${photoId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'spot', spotId] });
    },
  });
}
