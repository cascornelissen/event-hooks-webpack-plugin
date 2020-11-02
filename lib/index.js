const { InvalidHookNameError } = require('./errors');

const plugin = {
    name: 'EventHooksPlugin'
};

module.exports = class EventHooksPlugin {
    constructor(hooks) {
        this.hooks = hooks;
    }

    apply(compiler) {
        const hooks = this.hooks;

        Object.keys(hooks).forEach((hook) => {
            const validHookNames = Object.keys(compiler.hooks);

            if ( !validHookNames.includes(hook) ) {
                compiler.hooks.make.tap(plugin, (compilation) => {
                    compilation.errors.push(new InvalidHookNameError(hook, validHookNames));
                });

                return;
            }

            const value = Array.isArray(hooks[hook]) ? hooks[hook] : [hooks[hook]];

            value.forEach((item) => {
                const tap = typeof item === 'function' ? 'tap' : item.tap;
                const fn = typeof item === 'function' ? item : item.task;

                compiler.hooks[hook][tap](plugin, fn);
            });
        });
    }
};
