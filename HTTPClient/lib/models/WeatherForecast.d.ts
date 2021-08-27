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
/**
 *
 * @export
 * @interface WeatherForecast
 */
export interface WeatherForecast {
    /**
     *
     * @type {Date}
     * @memberof WeatherForecast
     */
    date?: Date;
    /**
     *
     * @type {number}
     * @memberof WeatherForecast
     */
    temperatureC?: number;
    /**
     *
     * @type {number}
     * @memberof WeatherForecast
     */
    readonly temperatureF?: number;
    /**
     *
     * @type {string}
     * @memberof WeatherForecast
     */
    summary?: string | null;
}
export declare function WeatherForecastFromJSON(json: any): WeatherForecast;
export declare function WeatherForecastFromJSONTyped(json: any, ignoreDiscriminator: boolean): WeatherForecast;
export declare function WeatherForecastToJSON(value?: WeatherForecast | null): any;
