"use strict";
/* tslint:disable */
/* eslint-disable */
/**
 * WebAPI
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v1
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextApiResponse = exports.BlobApiResponse = exports.VoidApiResponse = exports.JSONApiResponse = exports.canConsumeForm = exports.mapValues = exports.querystring = exports.exists = exports.Configuration = exports.COLLECTION_FORMATS = exports.RequiredError = exports.BaseAPI = exports.BASE_PATH = void 0;
exports.BASE_PATH = "http://localhost".replace(/\/+$/, "");
const isBlob = (value) => typeof Blob !== 'undefined' && value instanceof Blob;
/**
 * This is the base class for all generated API classes.
 */
class BaseAPI {
    constructor(configuration = new Configuration()) {
        this.configuration = configuration;
        this.fetchApi = async (url, init) => {
            let fetchParams = { url, init };
            for (const middleware of this.middleware) {
                if (middleware.pre) {
                    fetchParams = await middleware.pre(Object.assign({ fetch: this.fetchApi }, fetchParams)) || fetchParams;
                }
            }
            let response = await this.configuration.fetchApi(fetchParams.url, fetchParams.init);
            for (const middleware of this.middleware) {
                if (middleware.post) {
                    response = await middleware.post({
                        fetch: this.fetchApi,
                        url: fetchParams.url,
                        init: fetchParams.init,
                        response: response.clone(),
                    }) || response;
                }
            }
            return response;
        };
        this.middleware = configuration.middleware;
    }
    withMiddleware(...middlewares) {
        const next = this.clone();
        next.middleware = next.middleware.concat(...middlewares);
        return next;
    }
    withPreMiddleware(...preMiddlewares) {
        const middlewares = preMiddlewares.map((pre) => ({ pre }));
        return this.withMiddleware(...middlewares);
    }
    withPostMiddleware(...postMiddlewares) {
        const middlewares = postMiddlewares.map((post) => ({ post }));
        return this.withMiddleware(...middlewares);
    }
    async request(context, initOverrides) {
        const { url, init } = this.createFetchParams(context, initOverrides);
        const response = await this.fetchApi(url, init);
        if (response.status >= 200 && response.status < 300) {
            return response;
        }
        throw response;
    }
    createFetchParams(context, initOverrides) {
        let url = this.configuration.basePath + context.path;
        if (context.query !== undefined && Object.keys(context.query).length !== 0) {
            // only add the querystring to the URL if there are query parameters.
            // this is done to avoid urls ending with a "?" character which buggy webservers
            // do not handle correctly sometimes.
            url += '?' + this.configuration.queryParamsStringify(context.query);
        }
        const body = ((typeof FormData !== "undefined" && context.body instanceof FormData) || context.body instanceof URLSearchParams || isBlob(context.body))
            ? context.body
            : JSON.stringify(context.body);
        const headers = Object.assign({}, this.configuration.headers, context.headers);
        const init = Object.assign({ method: context.method, headers: headers, body, credentials: this.configuration.credentials }, initOverrides);
        return { url, init };
    }
    /**
     * Create a shallow clone of `this` by constructing a new instance
     * and then shallow cloning data members.
     */
    clone() {
        const constructor = this.constructor;
        const next = new constructor(this.configuration);
        next.middleware = this.middleware.slice();
        return next;
    }
}
exports.BaseAPI = BaseAPI;
;
class RequiredError extends Error {
    constructor(field, msg) {
        super(msg);
        this.field = field;
        this.name = "RequiredError";
    }
}
exports.RequiredError = RequiredError;
exports.COLLECTION_FORMATS = {
    csv: ",",
    ssv: " ",
    tsv: "\t",
    pipes: "|",
};
class Configuration {
    constructor(configuration = {}) {
        this.configuration = configuration;
    }
    get basePath() {
        return this.configuration.basePath != null ? this.configuration.basePath : exports.BASE_PATH;
    }
    get fetchApi() {
        return this.configuration.fetchApi || window.fetch.bind(window);
    }
    get middleware() {
        return this.configuration.middleware || [];
    }
    get queryParamsStringify() {
        return this.configuration.queryParamsStringify || querystring;
    }
    get username() {
        return this.configuration.username;
    }
    get password() {
        return this.configuration.password;
    }
    get apiKey() {
        const apiKey = this.configuration.apiKey;
        if (apiKey) {
            return typeof apiKey === 'function' ? apiKey : () => apiKey;
        }
        return undefined;
    }
    get accessToken() {
        const accessToken = this.configuration.accessToken;
        if (accessToken) {
            return typeof accessToken === 'function' ? accessToken : async () => accessToken;
        }
        return undefined;
    }
    get headers() {
        return this.configuration.headers;
    }
    get credentials() {
        return this.configuration.credentials;
    }
}
exports.Configuration = Configuration;
function exists(json, key) {
    const value = json[key];
    return value !== null && value !== undefined;
}
exports.exists = exists;
function querystring(params, prefix = '') {
    return Object.keys(params)
        .map((key) => {
        const fullKey = prefix + (prefix.length ? `[${key}]` : key);
        const value = params[key];
        if (value instanceof Array) {
            const multiValue = value.map(singleValue => encodeURIComponent(String(singleValue)))
                .join(`&${encodeURIComponent(fullKey)}=`);
            return `${encodeURIComponent(fullKey)}=${multiValue}`;
        }
        if (value instanceof Date) {
            return `${encodeURIComponent(fullKey)}=${encodeURIComponent(value.toISOString())}`;
        }
        if (value instanceof Object) {
            return querystring(value, fullKey);
        }
        return `${encodeURIComponent(fullKey)}=${encodeURIComponent(String(value))}`;
    })
        .filter(part => part.length > 0)
        .join('&');
}
exports.querystring = querystring;
function mapValues(data, fn) {
    return Object.keys(data).reduce((acc, key) => (Object.assign(Object.assign({}, acc), { [key]: fn(data[key]) })), {});
}
exports.mapValues = mapValues;
function canConsumeForm(consumes) {
    for (const consume of consumes) {
        if ('multipart/form-data' === consume.contentType) {
            return true;
        }
    }
    return false;
}
exports.canConsumeForm = canConsumeForm;
class JSONApiResponse {
    constructor(raw, transformer = (jsonValue) => jsonValue) {
        this.raw = raw;
        this.transformer = transformer;
    }
    async value() {
        return this.transformer(await this.raw.json());
    }
}
exports.JSONApiResponse = JSONApiResponse;
class VoidApiResponse {
    constructor(raw) {
        this.raw = raw;
    }
    async value() {
        return undefined;
    }
}
exports.VoidApiResponse = VoidApiResponse;
class BlobApiResponse {
    constructor(raw) {
        this.raw = raw;
    }
    async value() {
        return await this.raw.blob();
    }
    ;
}
exports.BlobApiResponse = BlobApiResponse;
class TextApiResponse {
    constructor(raw) {
        this.raw = raw;
    }
    async value() {
        return await this.raw.text();
    }
    ;
}
exports.TextApiResponse = TextApiResponse;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVudGltZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ydW50aW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxvQkFBb0I7QUFDcEIsb0JBQW9CO0FBQ3BCOzs7Ozs7Ozs7O0dBVUc7OztBQUdVLFFBQUEsU0FBUyxHQUFHLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFFaEUsTUFBTSxNQUFNLEdBQUcsQ0FBQyxLQUFVLEVBQUUsRUFBRSxDQUFDLE9BQU8sSUFBSSxLQUFLLFdBQVcsSUFBSSxLQUFLLFlBQVksSUFBSSxDQUFDO0FBRXBGOztHQUVHO0FBQ0gsTUFBYSxPQUFPO0lBSWhCLFlBQXNCLGdCQUFnQixJQUFJLGFBQWEsRUFBRTtRQUFuQyxrQkFBYSxHQUFiLGFBQWEsQ0FBc0I7UUFvRGpELGFBQVEsR0FBRyxLQUFLLEVBQUUsR0FBVyxFQUFFLElBQWlCLEVBQUUsRUFBRTtZQUN4RCxJQUFJLFdBQVcsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQztZQUNoQyxLQUFLLE1BQU0sVUFBVSxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7Z0JBQ3RDLElBQUksVUFBVSxDQUFDLEdBQUcsRUFBRTtvQkFDaEIsV0FBVyxHQUFHLE1BQU0sVUFBVSxDQUFDLEdBQUcsaUJBQzlCLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUSxJQUNqQixXQUFXLEVBQ2hCLElBQUksV0FBVyxDQUFDO2lCQUNyQjthQUNKO1lBQ0QsSUFBSSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNwRixLQUFLLE1BQU0sVUFBVSxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7Z0JBQ3RDLElBQUksVUFBVSxDQUFDLElBQUksRUFBRTtvQkFDakIsUUFBUSxHQUFHLE1BQU0sVUFBVSxDQUFDLElBQUksQ0FBQzt3QkFDN0IsS0FBSyxFQUFFLElBQUksQ0FBQyxRQUFRO3dCQUNwQixHQUFHLEVBQUUsV0FBVyxDQUFDLEdBQUc7d0JBQ3BCLElBQUksRUFBRSxXQUFXLENBQUMsSUFBSTt3QkFDdEIsUUFBUSxFQUFFLFFBQVEsQ0FBQyxLQUFLLEVBQUU7cUJBQzdCLENBQUMsSUFBSSxRQUFRLENBQUM7aUJBQ2xCO2FBQ0o7WUFDRCxPQUFPLFFBQVEsQ0FBQztRQUNwQixDQUFDLENBQUE7UUF6RUcsSUFBSSxDQUFDLFVBQVUsR0FBRyxhQUFhLENBQUMsVUFBVSxDQUFDO0lBQy9DLENBQUM7SUFFRCxjQUFjLENBQTZCLEdBQUcsV0FBeUI7UUFDbkUsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBSyxDQUFDO1FBQzdCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQztRQUN6RCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsaUJBQWlCLENBQTZCLEdBQUcsY0FBd0M7UUFDckYsTUFBTSxXQUFXLEdBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMzRCxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUksR0FBRyxXQUFXLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRUQsa0JBQWtCLENBQTZCLEdBQUcsZUFBMEM7UUFDeEYsTUFBTSxXQUFXLEdBQUcsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM5RCxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUksR0FBRyxXQUFXLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRVMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFvQixFQUFFLGFBQTJCO1FBQ3JFLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxhQUFhLENBQUMsQ0FBQztRQUNyRSxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2hELElBQUksUUFBUSxDQUFDLE1BQU0sSUFBSSxHQUFHLElBQUksUUFBUSxDQUFDLE1BQU0sR0FBRyxHQUFHLEVBQUU7WUFDakQsT0FBTyxRQUFRLENBQUM7U0FDbkI7UUFDRCxNQUFNLFFBQVEsQ0FBQztJQUNuQixDQUFDO0lBRU8saUJBQWlCLENBQUMsT0FBb0IsRUFBRSxhQUEyQjtRQUN2RSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO1FBQ3JELElBQUksT0FBTyxDQUFDLEtBQUssS0FBSyxTQUFTLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUN4RSxxRUFBcUU7WUFDckUsZ0ZBQWdGO1lBQ2hGLHFDQUFxQztZQUNyQyxHQUFHLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3ZFO1FBQ0QsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDLE9BQU8sUUFBUSxLQUFLLFdBQVcsSUFBSSxPQUFPLENBQUMsSUFBSSxZQUFZLFFBQVEsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxJQUFJLFlBQVksZUFBZSxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdkosQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJO1lBQ2QsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRS9CLE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMvRSxNQUFNLElBQUksbUJBQ04sTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNLEVBQ3RCLE9BQU8sRUFBRSxPQUFPLEVBQ2hCLElBQUksRUFDSixXQUFXLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLElBQ3hDLGFBQWEsQ0FDbkIsQ0FBQztRQUNGLE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQTBCRDs7O09BR0c7SUFDSyxLQUFLO1FBQ1QsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQWtCLENBQUM7UUFDNUMsTUFBTSxJQUFJLEdBQUcsSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUMxQyxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0NBQ0o7QUExRkQsMEJBMEZDO0FBQUEsQ0FBQztBQUVGLE1BQWEsYUFBYyxTQUFRLEtBQUs7SUFFcEMsWUFBbUIsS0FBYSxFQUFFLEdBQVk7UUFDMUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBREksVUFBSyxHQUFMLEtBQUssQ0FBUTtRQURoQyxTQUFJLEdBQW9CLGVBQWUsQ0FBQztJQUd4QyxDQUFDO0NBQ0o7QUFMRCxzQ0FLQztBQUVZLFFBQUEsa0JBQWtCLEdBQUc7SUFDOUIsR0FBRyxFQUFFLEdBQUc7SUFDUixHQUFHLEVBQUUsR0FBRztJQUNSLEdBQUcsRUFBRSxJQUFJO0lBQ1QsS0FBSyxFQUFFLEdBQUc7Q0FDYixDQUFDO0FBaUJGLE1BQWEsYUFBYTtJQUN0QixZQUFvQixnQkFBeUMsRUFBRTtRQUEzQyxrQkFBYSxHQUFiLGFBQWEsQ0FBOEI7SUFBRyxDQUFDO0lBRW5FLElBQUksUUFBUTtRQUNSLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsaUJBQVMsQ0FBQztJQUN6RixDQUFDO0lBRUQsSUFBSSxRQUFRO1FBQ1IsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBRUQsSUFBSSxVQUFVO1FBQ1YsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsSUFBSSxFQUFFLENBQUM7SUFDL0MsQ0FBQztJQUVELElBQUksb0JBQW9CO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxvQkFBb0IsSUFBSSxXQUFXLENBQUM7SUFDbEUsQ0FBQztJQUVELElBQUksUUFBUTtRQUNSLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUM7SUFDdkMsQ0FBQztJQUVELElBQUksUUFBUTtRQUNSLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUM7SUFDdkMsQ0FBQztJQUVELElBQUksTUFBTTtRQUNOLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDO1FBQ3pDLElBQUksTUFBTSxFQUFFO1lBQ1IsT0FBTyxPQUFPLE1BQU0sS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDO1NBQy9EO1FBQ0QsT0FBTyxTQUFTLENBQUM7SUFDckIsQ0FBQztJQUVELElBQUksV0FBVztRQUNYLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDO1FBQ25ELElBQUksV0FBVyxFQUFFO1lBQ2IsT0FBTyxPQUFPLFdBQVcsS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQyxXQUFXLENBQUM7U0FDcEY7UUFDRCxPQUFPLFNBQVMsQ0FBQztJQUNyQixDQUFDO0lBRUQsSUFBSSxPQUFPO1FBQ1AsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQztJQUN0QyxDQUFDO0lBRUQsSUFBSSxXQUFXO1FBQ1gsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQztJQUMxQyxDQUFDO0NBQ0o7QUFsREQsc0NBa0RDO0FBc0JELFNBQWdCLE1BQU0sQ0FBQyxJQUFTLEVBQUUsR0FBVztJQUN6QyxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDeEIsT0FBTyxLQUFLLEtBQUssSUFBSSxJQUFJLEtBQUssS0FBSyxTQUFTLENBQUM7QUFDakQsQ0FBQztBQUhELHdCQUdDO0FBRUQsU0FBZ0IsV0FBVyxDQUFDLE1BQWlCLEVBQUUsU0FBaUIsRUFBRTtJQUM5RCxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1NBQ3JCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1FBQ1QsTUFBTSxPQUFPLEdBQUcsTUFBTSxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDNUQsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzFCLElBQUksS0FBSyxZQUFZLEtBQUssRUFBRTtZQUN4QixNQUFNLFVBQVUsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7aUJBQy9FLElBQUksQ0FBQyxJQUFJLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM5QyxPQUFPLEdBQUcsa0JBQWtCLENBQUMsT0FBTyxDQUFDLElBQUksVUFBVSxFQUFFLENBQUM7U0FDekQ7UUFDRCxJQUFJLEtBQUssWUFBWSxJQUFJLEVBQUU7WUFDdkIsT0FBTyxHQUFHLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxJQUFJLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQyxFQUFFLENBQUM7U0FDdEY7UUFDRCxJQUFJLEtBQUssWUFBWSxNQUFNLEVBQUU7WUFDekIsT0FBTyxXQUFXLENBQUMsS0FBa0IsRUFBRSxPQUFPLENBQUMsQ0FBQztTQUNuRDtRQUNELE9BQU8sR0FBRyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQ2pGLENBQUMsQ0FBQztTQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1NBQy9CLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNuQixDQUFDO0FBcEJELGtDQW9CQztBQUVELFNBQWdCLFNBQVMsQ0FBQyxJQUFTLEVBQUUsRUFBc0I7SUFDekQsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FDN0IsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxpQ0FBTSxHQUFHLEtBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUcsRUFDaEQsRUFBRSxDQUNILENBQUM7QUFDSixDQUFDO0FBTEQsOEJBS0M7QUFFRCxTQUFnQixjQUFjLENBQUMsUUFBbUI7SUFDOUMsS0FBSyxNQUFNLE9BQU8sSUFBSSxRQUFRLEVBQUU7UUFDNUIsSUFBSSxxQkFBcUIsS0FBSyxPQUFPLENBQUMsV0FBVyxFQUFFO1lBQy9DLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7S0FDSjtJQUNELE9BQU8sS0FBSyxDQUFDO0FBQ2pCLENBQUM7QUFQRCx3Q0FPQztBQWlDRCxNQUFhLGVBQWU7SUFDeEIsWUFBbUIsR0FBYSxFQUFVLGNBQXNDLENBQUMsU0FBYyxFQUFFLEVBQUUsQ0FBQyxTQUFTO1FBQTFGLFFBQUcsR0FBSCxHQUFHLENBQVU7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBd0Q7SUFBRyxDQUFDO0lBRWpILEtBQUssQ0FBQyxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ25ELENBQUM7Q0FDSjtBQU5ELDBDQU1DO0FBRUQsTUFBYSxlQUFlO0lBQ3hCLFlBQW1CLEdBQWE7UUFBYixRQUFHLEdBQUgsR0FBRyxDQUFVO0lBQUcsQ0FBQztJQUVwQyxLQUFLLENBQUMsS0FBSztRQUNQLE9BQU8sU0FBUyxDQUFDO0lBQ3JCLENBQUM7Q0FDSjtBQU5ELDBDQU1DO0FBRUQsTUFBYSxlQUFlO0lBQ3hCLFlBQW1CLEdBQWE7UUFBYixRQUFHLEdBQUgsR0FBRyxDQUFVO0lBQUcsQ0FBQztJQUVwQyxLQUFLLENBQUMsS0FBSztRQUNQLE9BQU8sTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUFBQSxDQUFDO0NBQ0w7QUFORCwwQ0FNQztBQUVELE1BQWEsZUFBZTtJQUN4QixZQUFtQixHQUFhO1FBQWIsUUFBRyxHQUFILEdBQUcsQ0FBVTtJQUFHLENBQUM7SUFFcEMsS0FBSyxDQUFDLEtBQUs7UUFDUCxPQUFPLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBQUEsQ0FBQztDQUNMO0FBTkQsMENBTUMifQ==