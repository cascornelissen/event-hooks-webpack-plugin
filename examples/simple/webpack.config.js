const EventHooksPlugin = require('../../lib');

module.exports = {
    plugins: [
        new EventHooksPlugin({
            run: () => {
                console.log(`Executing 'run' callback task`);
            },
            done: () => {
                console.log(`Executing 'done' callback task`);
            }
        })
    ]
};
