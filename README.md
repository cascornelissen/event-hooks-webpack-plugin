# Event Hooks Webpack Plugin
[![npm](https://img.shields.io/npm/v/event-hooks-webpack-plugin.svg?style=flat-square)](https://www.npmjs.com/package/event-hooks-webpack-plugin)
[![npm](https://img.shields.io/npm/dm/event-hooks-webpack-plugin.svg?style=flat-square)](https://www.npmjs.com/package/event-hooks-webpack-plugin)
[![license](https://img.shields.io/github/license/cascornelissen/event-hooks-webpack-plugin.svg?style=flat-square)](LICENSE.md)

This [Webpack][webpack] plugin is similar to [`webpack-shell-plugin`][webpack-shell-plugin] but it allows executing
arbitrary code instead of commands on *any* [compiler hook][webpack-compiler-hooks] that is made available by Webpack.

## Installation
```shell
npm install event-hooks-webpack-plugin --save-dev
```

## Usage
```js
import EventHooksPlugin from 'event-hooks-webpack-plugin';

module.exports = {
    // ...
    plugins: [
        new EventHooksPlugin({
            initialize: () => {
                // ...
            }
        })
    ]
};
```

## Options
The plugin consumes an object with [Webpack compiler event hook names][webpack-compiler-hooks] (e.g. `run`, `compile`,
and `done`) as keys and functions as values.

### Tapable
Webpack's compiler uses [Tapable][webpack-tapable] which supports different classes of hooks. This plugin supports
synchronous, promise-based, and callback-based hooks through the exported `tap`, `tapPromise` and `tapAsync` methods.
By default, the plugin uses `tap`.

```js
import EventHooksPlugin, { tapPromise, tapAsync } from 'event-hooks-webpack-plugin';

module.exports = {
    // ...
    plugins: [
        new EventHooksPlugin({
            emit: tapAsync(() => {
                // ...
            }),
            run: tapPromise(() => {
                // ...
            })
        })
    ]
};
```

## License
This project is [licensed](LICENSE.md) under the [MIT][mit-license] license.



[webpack]: https://webpack.github.io/
[webpack-tapable]: https://github.com/webpack/tapable#tapable
[webpack-shell-plugin]: https://www.npmjs.com/package/webpack-shell-plugin
[webpack-compiler-hooks]: https://webpack.js.org/api/compiler-hooks/
[mit-license]: https://opensource.org/licenses/MIT
