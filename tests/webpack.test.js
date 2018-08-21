import webpack from 'webpack';
import EventHooksPlugin from '../lib/';
import {
  EventHooksPluginCallbackTask,
  EventHooksPluginPromiseTask,
  EventHooksPluginTask
} from '../lib/hooks';

it('Throws a meaningful message when providing an invalid event hook name', () => {
    expect(() => {
        webpack({
            plugins: [
                new EventHooksPlugin({
                    'abc': () => {}
                })
            ]
        });
    }).toThrow(/Invalid hook name/);
});

describe('Delegates to compiler', () => {
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

  it('EventHooksPluginTask to #tap', () => {
    const hooks = {
      start: new EventHooksPluginTask(compiler => null)
    };

    const plugin = new EventHooksPlugin(hooks);

    plugin.apply(compiler);

    expect(tap).toHaveBeenCalled();
    expect(tapPromise).not.toHaveBeenCalled();
    expect(tapAsync).not.toHaveBeenCalled();
  });

  it('EventHooksPluginPromiseTask to #tapPromise', () => {
    const hooks = {
      start: new EventHooksPluginPromiseTask(async compiler => null)
    };

    const plugin = new EventHooksPlugin(hooks);

    plugin.apply(compiler);

    expect(tap).not.toHaveBeenCalled();
    expect(tapPromise).toHaveBeenCalled();
    expect(tapAsync).not.toHaveBeenCalled();
  });

  it('EventHooksPluginTask to #tapAsync', () => {
    const hooks = {
      start: new EventHooksPluginCallbackTask((compiler, cb) => cb())
    };

    const plugin = new EventHooksPlugin(hooks);

    plugin.apply(compiler);

    expect(tap).not.toHaveBeenCalled();
    expect(tapPromise).not.toHaveBeenCalled();
    expect(tapAsync).toHaveBeenCalled();
  });
});
