import { WeatherForecast } from 'example-service-client';
import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { ResponseError } from '../types';
import { withQueryCancellation } from '../util/withQueryCancellation';
import { useApiClient } from './useApiClient';

export const getWeatherForecastKey = 'getWeatherForecast';

export function useGetWeatherForecast(
  options?: UseQueryOptions<Array<WeatherForecast>, ResponseError>
): UseQueryResult<Array<WeatherForecast>, ResponseError> {
  const { weatherForecastApi } = useApiClient();
  return useQuery(
    getWeatherForecastKey,
    withQueryCancellation((signal) =>
      weatherForecastApi.weatherForecastGet({ signal })
    ),
    options
  );
}
