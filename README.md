# openapi-typescript-fetch-example

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
