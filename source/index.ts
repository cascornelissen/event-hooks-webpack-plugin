import webpack from 'webpack';

// Constants
import { PLUGIN, TAP_SYMBOL } from './constants.js';

// Types
import { Hooks } from './types.js';

class EventHooksPlugin {
    private readonly hooks: Hooks;

    constructor(hooks: typeof this.hooks) {
        this.hooks = hooks;
    }

    apply(compiler: webpack.Compiler): void {
        const hooks = this.hooks;

        Object.keys(hooks).filter((name): name is keyof webpack.Compiler['hooks'] => {
            const isKnownHook = name in compiler.hooks;

            if (!isKnownHook) {
                compiler.hooks.make.tap(PLUGIN, (compilation) => {
                    compilation.errors.push(new webpack.WebpackError(`Unknown hook used in ${PLUGIN.name}: ${name}`));
                });
            }

            return isKnownHook;
        }).forEach((name) => {
            const callbacks = Array.isArray(hooks[name]) ? hooks[name] : [hooks[name]];

            callbacks.filter((callback) => {
                return callback !== undefined;
            }).forEach((callback) => {
                const hook = compiler.hooks[name];
                const method = TAP_SYMBOL in callback ? callback[TAP_SYMBOL] : 'tap';

                // @ts-expect-error -- method and callback can not be inferred correctly with the current Webpack types
                hook[method](PLUGIN, callback); // eslint-disable-line @typescript-eslint/no-unsafe-call
            });
        });
    }
}

export default EventHooksPlugin;
