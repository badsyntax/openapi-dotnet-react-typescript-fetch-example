import { useContext } from 'react';
import { ApiClient } from '../apiClient';
import { ApiClientContext } from '../ApiClientProvider';

export function useApiClient(): ApiClient {
  const apiClient = useContext<ApiClient | undefined>(ApiClientContext);
  if (!apiClient) {
    throw new Error('API client is not set');
  }
  return apiClient;
}
