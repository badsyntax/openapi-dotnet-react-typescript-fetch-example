import React from 'react';
import { createContext } from 'react';
import { ApiClient } from './apiClient';

export const ApiClientContext = createContext<ApiClient | undefined>(undefined);

type Props = {
  client: ApiClient;
};

export const ApiClientProvider: React.FC<Props> = ({ client, ...props }) => {
  return <ApiClientContext.Provider value={client} {...props} />;
};
