function EventHooksPlugin(hooks) {
    this.hooks = hooks;
}

EventHooksPlugin.prototype.apply = function(compiler) {
    var hooks = this.hooks;

    Object.keys(hooks).forEach(function(event) {
        compiler.plugin(event, hooks[event]);
    });
};

module.exports = EventHooksPlugin;
