# Event Hooks Webpack Plugin
[![npm](https://img.shields.io/npm/v/event-hooks-webpack-plugin.svg?style=flat-square)](https://www.npmjs.com/package/event-hooks-webpack-plugin)
[![npm](https://img.shields.io/npm/dm/event-hooks-webpack-plugin.svg?style=flat-square)](https://www.npmjs.com/package/event-hooks-webpack-plugin)
[![license](https://img.shields.io/github/license/cascornelissen/event-hooks-webpack-plugin.svg?style=flat-square)](LICENSE.md)

This [webpack](https://webpack.github.io/) plugin is similar to [`webpack-shell-plugin`](https://www.npmjs.com/package/webpack-shell-plugin) but this allows you to execute arbitrary JavaScript instead of commands on *any* [event hook](https://webpack.js.org/api/compiler-hooks/) that is exposed by the Webpack compiler.

## Installation
```shell
npm install event-hooks-webpack-plugin --save-dev
```

## Synchronous usage
```js
const EventHooksPlugin = require('event-hooks-webpack-plugin');

module.exports = {
    // ...
    plugins: [
        new EventHooksPlugin({
            eventName: () => {
                // ...
            }
        })
    ]
};
```

## Asynchronous usage
### Callbacks
```js
const EventHooksPlugin = require('event-hooks-webpack-plugin');
const { CallbackTask } = require('event-hooks-webpack-plugin/lib/tasks');

module.exports = {
    // ...
    plugins: [
        new EventHooksPlugin({
            eventName: new CallbackTask((compiler, callback) => {
                // ...
                callback();
            })
        })
    ]
};
```

### Promises
```js
const EventHooksPlugin = require('event-hooks-webpack-plugin');
const { PromiseTask } = require('event-hooks-webpack-plugin/lib/tasks');

module.exports = {
    // ...
    plugins: [
        new EventHooksPlugin({
            eventName: new PromiseTask(async () => {
                // ...
            })
        })
    ]
};
```

## Options
The plugin consumes an object with [webpack compiler event hook names](https://github.com/webpack/webpack/blob/214b06645ac182b7f0c68319e35445e02541d957/lib/Compiler.js#L119) (e.g. `run`, `compile`, or `done`) as keys and functions or [task classes](./lib/tasks.js) as values.

## License
This project is [licensed](LICENSE.md) under the [MIT](https://opensource.org/licenses/MIT) license.
