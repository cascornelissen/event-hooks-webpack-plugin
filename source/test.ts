import path from 'node:path';
import assert from 'node:assert';
import webpack from 'webpack';
import { rimraf } from 'rimraf';
import { describe, it, afterEach, mock } from 'node:test';
import EventHooksPlugin from './index.js'; // eslint-disable-line @onefinity/eslint-config/import-grouping

// Helpers
import { tap, tapAsync, tapPromise } from './helpers.js';

// Constants
import { TAP_SYMBOL } from './constants.js';

afterEach(() => {
    rimraf.sync(path.resolve(import.meta.dirname, '../dist/'));
});

describe('Hooks', () => {
    const options: Partial<webpack.Configuration> = {
        entry: 'data:text/javascript,',
        mode: 'development'
    };

    it('executes callbacks', (context, done) => {
        const initialize = mock.fn();

        webpack({
            ...options,
            plugins: [
                new EventHooksPlugin({
                    initialize
                })
            ]
        }, (errors) => {
            assert.strictEqual(errors, null);
            assert.strictEqual(initialize.mock.calls.length, 1);
            done();
        });
    });

    it('executes all callbacks when passed as array', (context, done) => {
        const compileA = mock.fn();
        const compileB = mock.fn();

        webpack({
            ...options,
            plugins: [
                new EventHooksPlugin({
                    compile: [compileA, compileB]
                })
            ]
        }, (errors) => {
            assert.strictEqual(errors, null);
            assert.strictEqual(compileA.mock.calls.length, 1);
            assert.strictEqual(compileB.mock.calls.length, 1);
            done();
        });
    });

    it('reports errors in the Webpack output in case of unsupported hook names', (context, done) => {
        const compile = mock.fn();
        const incinerate = mock.fn();

        webpack({
            ...options,
            plugins: [
                new EventHooksPlugin({
                    // @ts-expect-error -- intentionally passing an unsupported hook name
                    incinerate,
                    compile
                })
            ]
        }, (errors, stats) => {
            assert.strictEqual(errors, null);
            assert.strictEqual(compile.mock.calls.length, 1);
            assert.strictEqual(incinerate.mock.calls.length, 0);
            assert.strictEqual(stats?.toJson().errors?.length, 1);
            done();
        });
    });

    it('supports different ways of tapping', (context, done) => {
        const initialize = tap(mock.fn());
        const run = tapAsync(mock.fn((_, callback: () => void) => {
            setImmediate(callback);
        }));
        const emit = tapPromise(mock.fn(() => {
            return Promise.resolve();
        }));

        assert.strictEqual(initialize[TAP_SYMBOL], 'tap');
        assert.strictEqual(run[TAP_SYMBOL], 'tapAsync');
        assert.strictEqual(emit[TAP_SYMBOL], 'tapPromise');

        webpack({
            ...options,
            plugins: [
                new EventHooksPlugin({
                    initialize,
                    run,
                    emit
                })
            ]
        }, (errors) => {
            assert.strictEqual(errors, null);
            assert.strictEqual(initialize.mock.calls.length, 1);
            assert.strictEqual(run.mock.calls.length, 1);
            assert.strictEqual(emit.mock.calls.length, 1);
            done();
        });
    });
});
