# openapi-typescript-fetch-example

An example project that demonstrates how to:

- Generate a typed HTTP client package from an OpenAPI definition using the [OpenAPI Generator](https://github.com/OpenAPITools/openapi-generator) [`typescript-fetch`](https://github.com/OpenAPITools/openapi-generator/blob/master/docs/generators/typescript-fetch.md) template
- Consume the HTTP client in a React application using [react-query](https://github.com/tannerlinsley/react-query)

## Project Overview

```console
├── HTTPClient/lib  # The generated typescript-fetch HTTP client
├── ReactApp        # A TypeScript React front-end application that consumes the HTTP Client
├── WebAPI          # A .NET 5 web API that provides the OpenAPI definitions
```

### Generating the HTTP Client

The following software is required:

- [.NET 5.0](https://dotnet.microsoft.com/download/dotnet/5.0)
- [Node.js 16](https://nodejs.org/)

Run the folllowing to generate the client:

```console
dotnet msbuild -target:GenerateHTTPClient WebAPI -property:Configuration=Release
```

The [build script](https://github.com/badsyntax/openapi-typescript-fetch-example/blob/1bc5fa198157f08ba4fe4cc61b276bc39d135dde/WebAPI/WebAPI.csproj#L12-L16) does the following:

- Builds the WebAPI .NET application
- Extracts the OpenAPI spec from the .NET application to location `./HTTPClient/api-spec.json`
- Runs some `npm scripts` within `./HTTPClient` to generate the client (Refer to the scripts in [`./HTTPClient/package.json`](./HTTPClient/package.json))

## Consuming the HTTP Client with React

### API Setup

API instances and react-query are setup within [./ReactApp/src/api](./ReactApp/src/api), for example:

```ts
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
```

### Query Hooks

[Query hooks](./ReactApp/src/api/hooks/) call the generated HTTP Client methods, and support request cancellation, for example:

```ts
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
```

Query hooks are called in [React components](./ReactApp/src/App/App.tsx), for example:

```tsx
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

```

## Running the WebAPI

```console
dotnet run --project WebAPI
```

Swagger is then available at: <https://localhost:5001/swagger/index.html>

## Running the React App

```console
npm start --prefix ReactApp
```

## How this project was bootstrapped

```console
dotnet new gitignore
dotnet new tool-manifest
dotnet new nugetconfig
dotnet tool install Swashbuckle.AspNetCore.Cli
dotnet new sln --name OpenAPITypeScriptFetchExample
dotnet new webapi -o WebAPI
dotnet sln add WebAPI

# .editorconfig config manually created from https://docs.microsoft.com/en-us/dotnet/fundamentals/code-analysis/code-style-rule-options

npx create-react-app react-app --template typescript
mv react-app ReactApp
```

## TODO

- [ ] Add bearer token auth to .NET project
