import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClientProvider } from 'react-query';
import './index.css';
import { App } from './App/App';
import reportWebVitals from './reportWebVitals';
import { ApiClientProvider } from './api/ApiClientProvider';
import { apiClient } from './api/apiClient';
import { queryClient } from './api/queryClient';

ReactDOM.render(
  <React.StrictMode>
    <ApiClientProvider client={apiClient}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </ApiClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
