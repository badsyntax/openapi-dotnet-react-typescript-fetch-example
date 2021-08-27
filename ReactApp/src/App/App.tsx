import React from 'react';
import { useQueryClient } from 'react-query';

import {
  getWeatherForecastKey,
  useGetWeatherForecast,
} from '../api/hooks/useGetWeatherForecast';

import './App.css';

export const App: React.FC = () => {
  const queryClient = useQueryClient();
  const { data, error, isFetching, refetch } = useGetWeatherForecast({
    enabled: false,
  });

  const getWeatherForecast = () => {
    if (!isFetching) {
      refetch();
    }
  };

  const cancelGetWeatherForecast = () => {
    void queryClient.cancelQueries(getWeatherForecastKey);
  };

  return (
    <div className="App">
      <header className="App-header">
        <button className="App-link" onClick={getWeatherForecast}>
          Get Weather Forecast
        </button>
        {isFetching && (
          <p>
            Loading...(
            <button className="App-link" onClick={cancelGetWeatherForecast}>
              Cancel
            </button>
            )
          </p>
        )}
        {error && <p>Error! {error}</p>}
        {!isFetching &&
          data &&
          data.map((forecast, i) => {
            return (
              <p key={i}>
                {forecast.summary} ({forecast.temperatureC}C)
              </p>
            );
          })}
      </header>
    </div>
  );
};
