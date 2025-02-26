import webpack from 'webpack';
import EventHooksPlugin from '../../index.js';

export default {
    entry: 'data:text/javascript,',
    mode: 'development',
    plugins: [
        new EventHooksPlugin({
            thisCompilation: (compilation) => {
                const options = {
                    name: 'EventHooksPlugin:emit-version',
                    stage: webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONS
                };

                compilation.hooks.processAssets.tap(options, () => {
                    compilation.emitAsset('version', new compilation.compiler.webpack.sources.RawSource(compilation.hash));
                });
            }
        })
    ]
};
