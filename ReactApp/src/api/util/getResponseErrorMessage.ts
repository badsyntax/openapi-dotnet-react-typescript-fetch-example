import { ResponseError } from '../types';

export function getResponseErrorMessage(
  error: ResponseError | null
): string | undefined {
  if (error instanceof Response) {
    return error.statusText;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return undefined;
}
