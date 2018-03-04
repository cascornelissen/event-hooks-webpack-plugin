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
                throw new InvalidHookNameError(`Invalid hook name '${hook}', use one of '${validHookNames.join(', ')}'`);
            }

            compiler.hooks[hook].tap(plugin, hooks[hook]);
        });
    }
};


