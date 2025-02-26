import EventHooksPlugin, { tapPromise, tapAsync } from '../../index.js';

export default {
    entry: 'data:text/javascript,',
    mode: 'development',
    plugins: [
        new EventHooksPlugin({
            initialize: () => {
                console.log(`Executing 'initialize' task`);
            },
            emit: tapAsync((_, callback) => {
                console.log(`Executing 'emit' task`);

                setTimeout(() => {
                    console.log(`Finished executing 'emit' task`);
                    callback();
                }, 1000);
            }),
            beforeRun: tapPromise(() => {
                console.log(`Executing 'beforeRun' promise-based task`);

                return new Promise((resolve) => {
                    console.log(`Finished executing 'beforeRun' promise-based task`);

                    setTimeout(() => {
                        resolve();
                    }, 1000);
                })
            }),
            run: tapPromise(async () => {
                console.log(`Executing 'run' promise-based task`);

                await new Promise((resolve) => {
                    setTimeout(resolve, 2000);
                });

                console.log(`Finished executing 'run' promise-based task`);
            }),
            done: [() => {
                console.log(`Executing 'done' task #1`);
            }, () => {
                console.log(`Executing 'done' task #2`);
            }]
        })
    ]
};
