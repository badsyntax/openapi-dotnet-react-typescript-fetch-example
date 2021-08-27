import { QueryFunction } from 'react-query';

export function withQueryCancellation<T = unknown>(
  cb: (signal: AbortSignal, ...args: unknown[]) => Promise<T>
): QueryFunction<T> {
  return (...args) => {
    const controller = new AbortController();
    const signal = controller.signal;
    const promise = cb(signal, ...args);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    promise.cancel = () => controller.abort();
    return promise;
  };
}
