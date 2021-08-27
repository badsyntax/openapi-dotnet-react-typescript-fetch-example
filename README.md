# openapi-typescript-fetch-example

A simple project that demonstrates:

- How generate a typed HTTP client from an OpenAPI definition using the `typescript-fetch` template
- How to consume the HTTP client

## Project Overview

```console
├── Client    # A TypeScript client that consumes generated HTTP client
├── WebAPI    # A .NET 5 web API that generates the OpenAPI definitions
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
```

## TODO

- [ ] Add bearer token auth to .NET project
- [ ] Setup TS project in `./Client`
- [ ] Generate HTTP client from OpenAPI spec
- [ ] Show usage of HTTP client including token renewal in middleware
