declare interface Window {
  newrelic?: any;
}

type UnwrapPromise<T> = T extends PromiseLike<infer U> ? UnwrapPromise<U> : T;
