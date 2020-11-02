import 'regenerator-runtime/runtime';
import path from 'path';
import EventHooksPlugin from '../lib/';
import { CallbackTask, PromiseTask, Task } from '../lib/tasks';

describe('Options', () => {
    it('should execute correctly when a function is provided', (done) => {
        const compile = jest.fn()

        global.__WEBPACK__({
            entry: path.resolve(__dirname, 'webpack/index.js'),
            plugins: [
                new EventHooksPlugin({
                    compile
                })
            ]
        }, () => {
            expect(compile).toHaveBeenCalled();
            done();
        });
    });

    it('should execute correctly when an array of functions is provided', (done) => {
        const compileA = jest.fn()
        const compileB = jest.fn()

        global.__WEBPACK__({
            entry: path.resolve(__dirname, 'webpack/index.js'),
            plugins: [
                new EventHooksPlugin({
                    compile: [compileA, compileB]
                })
            ]
        }, () => {
            expect(compileA).toHaveBeenCalled();
            expect(compileB).toHaveBeenCalled();
            done();
        });
    });

    it('should execute correctly when an object with options and callback is provided', (done) => {
        const compileA = jest.fn()
        const compileB = jest.fn()

        global.__WEBPACK__({
            entry: path.resolve(__dirname, 'webpack/index.js'),
            plugins: [
                new EventHooksPlugin({
                    compile: [compileA, compileB]
                })
            ]
        }, () => {
            expect(compileA).toHaveBeenCalled();
            expect(compileB).toHaveBeenCalled();
            done();
        });
    });

    it('should include an error in the Webpack output in case of unsupported hook names', (done) => {
        global.__WEBPACK__({
            entry: path.resolve(__dirname, 'webpack/index.js'),
            plugins: [
                new EventHooksPlugin({
                    a: [],
                    b: []
                })
            ]
        }, (errors, stats) => {
            expect(stats.toJson().errors).toHaveLength(2);
            done();
        });
    });
});

describe('Task classes', () => {
    const tap = jest.fn();
    const tapAsync = jest.fn();
    const tapPromise = jest.fn();

    const compiler = {
        hooks: {
            start: {
                tap,
                tapAsync,
                tapPromise
            }
        }
    };

    afterEach(() => {
        tap.mockReset();
        tapPromise.mockReset();
        tapAsync.mockReset();
    });

    it('should use tap for functions', () => {
        const hooks = {
            start: () => null
        };

        const plugin = new EventHooksPlugin(hooks);

        plugin.apply(compiler);

        expect(tap).toHaveBeenCalled();
        expect(tapPromise).not.toHaveBeenCalled();
        expect(tapAsync).not.toHaveBeenCalled();
    });

    it('should use tap for Task class', () => {
        const hooks = {
            start: new Task(() => null)
        };

        const plugin = new EventHooksPlugin(hooks);

        plugin.apply(compiler);

        expect(tap).toHaveBeenCalled();
        expect(tapPromise).not.toHaveBeenCalled();
        expect(tapAsync).not.toHaveBeenCalled();
    });

    it('should use tapPromise for PromiseTask class', () => {
        const hooks = {
            start: new PromiseTask(async () => null)
        };

        const plugin = new EventHooksPlugin(hooks);

        plugin.apply(compiler);

        expect(tap).not.toHaveBeenCalled();
        expect(tapPromise).toHaveBeenCalled();
        expect(tapAsync).not.toHaveBeenCalled();
    });

    it('should use tapAsync for CallbackTask class', () => {
        const hooks = {
            start: new CallbackTask((compiler, callback) => callback())
        };

        const plugin = new EventHooksPlugin(hooks);

        plugin.apply(compiler);

        expect(tap).not.toHaveBeenCalled();
        expect(tapPromise).not.toHaveBeenCalled();
        expect(tapAsync).toHaveBeenCalled();
    });
});
