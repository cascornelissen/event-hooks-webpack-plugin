const EventHooksPlugin = require('../../src/');

module.exports = {
    plugins: [
        new EventHooksPlugin({
            'run': () => {
                console.log('RUN!');
            },
            'done': () => {
                console.log('DONE!');
            }
        })
    ]
}
