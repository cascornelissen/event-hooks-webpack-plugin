const EventHooksPlugin = require('../../lib');

module.exports = {
    plugins: [
        new EventHooksPlugin({
            run: new EventHooksPlugin.CallbackTask((compiler, callback) => {
                console.log(`Starting 'run' callback task`);
                setTimeout(() => {
                    console.log(`Finished 'run' callback task`);
                    callback();
                }, 2000);
            }),
            done: new EventHooksPlugin.PromiseTask(async () => {
                console.log(`Starting 'done' promise task`);
                await new Promise((resolve) => setTimeout(resolve, 2000));
                console.log(`Finished 'done' promise task`);
            })
        })
    ]
};
