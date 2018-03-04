const EventHooksPlugin = require('../../lib/');

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
