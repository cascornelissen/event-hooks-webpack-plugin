const EventHooksPlugin = require('../../lib/');
const {
  EventHooksPluginCallbackTask,
  EventHooksPluginPromiseTask
} = require('../../lib/hooks');

module.exports = {
  plugins: [
    new EventHooksPlugin({
      run: new EventHooksPluginCallbackTask((compiler, callback) => {
        console.log('Starting callback task');
        setTimeout(() => {
          console.log('Finished callback task');
          callback();
        }, 2000);
      }),
      done: new EventHooksPluginPromiseTask(async compiler => {
        console.log('Starting promise task');
        await new Promise(r => setTimeout(r, 2000));
        console.log('Finished promise task');
      })
    })
  ]
};
