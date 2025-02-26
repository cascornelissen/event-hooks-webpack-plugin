import { Compiler } from 'webpack';

// Constants
import { TAP_SYMBOL } from './constants.js';

export type TapMethod = 'tap' | 'tapPromise' | 'tapAsync';
export type WithTapSymbol<T, V extends TapMethod = TapMethod> = T & {
    [TAP_SYMBOL]: V;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
type TapFunction<P extends any[]> = (...parameters: P) => void;
type Tap<T> = T extends { tap: (name: string, callback: (...parameters: infer P) => any) => any; }
    ? TapFunction<P> | TapFunction<P>[]
    : never;

type TapPromiseFunction<P extends any[]> = (...parameters: P) => Promise<any>;
type TapPromise<T> = T extends { tapPromise: (name: string, callback: (...parameters: infer P) => Promise<any>) => any; }
    ? TapPromiseFunction<P> | TapPromiseFunction<P>[]
    : never;

type TapAsyncFunction<P extends any[]> = (...parameters: [...P, (...parameters: any[]) => void]) => void;
type TapAsync<T> = T extends { tapAsync: (name: string, callback: (...parameters: [...infer P, (...parameters: any[]) => void]) => void) => any; }
    ? TapAsyncFunction<P> | TapAsyncFunction<P>[]
    : never;
/* eslint-enable @typescript-eslint/no-explicit-any */

type Hook<T> = Tap<T> | TapPromise<T> | TapAsync<T>;

export type Hooks = Partial<{
    [K in keyof Compiler['hooks']]: Hook<Compiler['hooks'][K]>;
}>;
