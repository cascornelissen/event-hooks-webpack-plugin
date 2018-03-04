const plugin = {
    name: 'EventHooksPlugin'
}

module.exports = class EventHooksPlugin {
    constructor(hooks) {
        this.hooks = hooks;
    }

    apply(compiler) {
        const hooks = this.hooks;

        // TODO: Support compilation hooks?

        Object.keys(hooks).forEach((event) => {
            compiler.hooks[event].tap(plugin, hooks[event]);
        });
    }
}
