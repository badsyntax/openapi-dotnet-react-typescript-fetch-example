# openapi-typescript-fetch-example

An example project that demonstrates:

- How to generate a typed HTTP client package from an OpenAPI definition using the [OpenAPI Generator](https://github.com/OpenAPITools/openapi-generator) [`typescript-fetch`](https://github.com/OpenAPITools/openapi-generator/blob/master/docs/generators/typescript-fetch.md) template
- How to consume the HTTP client in a React application using [react-query](https://github.com/tannerlinsley/react-query)

The following software is required:

- [.NET 5.0](https://dotnet.microsoft.com/download/dotnet/5.0)
- [Node.js 16](https://nodejs.org/)

## Project Overview

```console
├── HTTPClient/lib  # The generated typescript-fetch HTTP client
├── ReactApp        # A TypeScript React front-end application that consumes the HTTP Client
├── WebAPI          # A .NET 5 web API that provides the OpenAPI definitions
```

## Consuming the HTTP Client with React

- API instances and react-query are setup within [./ReactApp/src/api](./ReactApp/src/api)
- API and react-query context providers are added in [./ReactApp/src/index.tsx](./ReactApp/src/index.tsx)
- Query hooks call API endpoints, for example [./ReactApp/src/api/hooks/useGetWeatherForecast.ts](./ReactApp/src/api/hooks/useGetWeatherForecast.ts) (`weatherForecastApi.weatherForecastGet()` is calling the generated HTTP client)
- Query hooks are called within React components, for example [./ReactApp/src/App/App.tsx](./ReactApp/src/App/App.tsx)

## Client Generation

Generate the client with:

```console
dotnet msbuild -target:GenerateHTTPClient WebAPI -property:Configuration=Release
```

This build script essentially runs some `npm scripts` within `./HTTPClient`, so refer to the scripts in [`./HTTPClient/package.json`](./HTTPClient/package.json).

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
