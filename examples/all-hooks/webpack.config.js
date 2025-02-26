import webpack from 'webpack';
import EventHooksPlugin from '../../index.js';

const compiler = webpack({
    entry: 'data:text/javascript,'
});

export default {
    entry: 'data:text/javascript,',
    mode: 'development',
    plugins: [
        new EventHooksPlugin(Object.keys(compiler.hooks).reduce((hooks, name) => {
            return {
                ...hooks,
                [name]: () => {
                    console.log(`Executing '${name}' task`);
                }
            }
        }, {}))
    ]
};
