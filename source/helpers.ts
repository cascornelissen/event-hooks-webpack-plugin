// Constants
import { TAP_SYMBOL } from './constants.js';

// Types
import { Hooks, TapMethod, WithTapSymbol } from './types.js';

export const addSymbol = <T extends Hooks[keyof Hooks], V extends TapMethod>(hook: T, value: V) => {
    return Object.defineProperty(hook, TAP_SYMBOL, {
        value,
        writable: false,
        enumerable: false,
        configurable: false
    }) as WithTapSymbol<T, V>;
};

export const tap = <T extends Hooks[keyof Hooks]>(hook: T) => {
    return addSymbol(hook, 'tap');
};

export const tapPromise = <T extends Hooks[keyof Hooks]>(hook: T) => {
    return addSymbol(hook, 'tapPromise');
};

export const tapAsync = <T extends Hooks[keyof Hooks]>(hook: T) => {
    return addSymbol(hook, 'tapAsync');
};
