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
import { exists } from '../runtime';
export function WeatherForecastFromJSON(json) {
    return WeatherForecastFromJSONTyped(json, false);
}
export function WeatherForecastFromJSONTyped(json, ignoreDiscriminator) {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'date': !exists(json, 'date') ? undefined : (new Date(json['date'])),
        'temperatureC': !exists(json, 'temperatureC') ? undefined : json['temperatureC'],
        'temperatureF': !exists(json, 'temperatureF') ? undefined : json['temperatureF'],
        'summary': !exists(json, 'summary') ? undefined : json['summary'],
    };
}
export function WeatherForecastToJSON(value) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        'date': value.date === undefined ? undefined : (value.date.toISOString()),
        'temperatureC': value.temperatureC,
        'summary': value.summary,
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2VhdGhlckZvcmVjYXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZGVscy9XZWF0aGVyRm9yZWNhc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsb0JBQW9CO0FBQ3BCLG9CQUFvQjtBQUNwQjs7Ozs7Ozs7OztHQVVHO0FBRUgsT0FBTyxFQUFFLE1BQU0sRUFBYSxNQUFNLFlBQVksQ0FBQztBQWlDL0MsTUFBTSxVQUFVLHVCQUF1QixDQUFDLElBQVM7SUFDN0MsT0FBTyw0QkFBNEIsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDckQsQ0FBQztBQUVELE1BQU0sVUFBVSw0QkFBNEIsQ0FBQyxJQUFTLEVBQUUsbUJBQTRCO0lBQ2hGLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLEVBQUU7UUFDekMsT0FBTyxJQUFJLENBQUM7S0FDZjtJQUNELE9BQU87UUFFSCxNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDcEUsY0FBYyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDO1FBQ2hGLGNBQWMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQztRQUNoRixTQUFTLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7S0FDcEUsQ0FBQztBQUNOLENBQUM7QUFFRCxNQUFNLFVBQVUscUJBQXFCLENBQUMsS0FBOEI7SUFDaEUsSUFBSSxLQUFLLEtBQUssU0FBUyxFQUFFO1FBQ3JCLE9BQU8sU0FBUyxDQUFDO0tBQ3BCO0lBQ0QsSUFBSSxLQUFLLEtBQUssSUFBSSxFQUFFO1FBQ2hCLE9BQU8sSUFBSSxDQUFDO0tBQ2Y7SUFDRCxPQUFPO1FBRUgsTUFBTSxFQUFFLEtBQUssQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN6RSxjQUFjLEVBQUUsS0FBSyxDQUFDLFlBQVk7UUFDbEMsU0FBUyxFQUFFLEtBQUssQ0FBQyxPQUFPO0tBQzNCLENBQUM7QUFDTixDQUFDIn0=