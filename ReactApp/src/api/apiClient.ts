import {
  Configuration,
  ConfigurationParameters,
  WeatherForecastApi,
} from 'example-service-client';
import { ApiMiddleware } from './ApiMiddleware';

const configParams: ConfigurationParameters = {
  basePath: 'https://localhost:5001',
  middleware: [new ApiMiddleware()],
};

const apiConfig = new Configuration(configParams);

export const apiClient = {
  weatherForecastApi: new WeatherForecastApi(apiConfig),
};

export type ApiClient = typeof apiClient;
