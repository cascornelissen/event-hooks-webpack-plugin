import webpack from 'webpack';
import 'regenerator-runtime/runtime';
import EventHooksPlugin from '../lib/';
import { CallbackTask, PromiseTask, Task } from '../lib/tasks';

it('Throws a meaningful message when providing an invalid event hook name', () => {
    expect(() => {
        webpack({
            plugins: [
                new EventHooksPlugin({
                    abc: () => null
                })
            ]
        });
    }).toThrow(/Invalid hook name/);
});

describe('Delegates Task classes to compiler', () => {
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

    it('Functions to #tap', () => {
        const hooks = {
            start: () => null
        };

        const plugin = new EventHooksPlugin(hooks);

        plugin.apply(compiler);

        expect(tap).toHaveBeenCalled();
        expect(tapPromise).not.toHaveBeenCalled();
        expect(tapAsync).not.toHaveBeenCalled();
    });

    it('Task to #tap', () => {
        const hooks = {
            start: new Task(() => null)
        };

        const plugin = new EventHooksPlugin(hooks);

        plugin.apply(compiler);

        expect(tap).toHaveBeenCalled();
        expect(tapPromise).not.toHaveBeenCalled();
        expect(tapAsync).not.toHaveBeenCalled();
    });

    it('PromiseTask to #tapPromise', () => {
        const hooks = {
            start: new PromiseTask(async () => null)
        };

        const plugin = new EventHooksPlugin(hooks);

        plugin.apply(compiler);

        expect(tap).not.toHaveBeenCalled();
        expect(tapPromise).toHaveBeenCalled();
        expect(tapAsync).not.toHaveBeenCalled();
    });

    it('CallbackTask to #tapAsync', () => {
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
