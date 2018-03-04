# Event Hooks Webpack Plugin
[![npm](https://img.shields.io/npm/v/event-hooks-webpack-plugin.svg?style=flat-square)](https://www.npmjs.com/package/event-hooks-webpack-plugin)
[![npm](https://img.shields.io/npm/dm/event-hooks-webpack-plugin.svg?style=flat-square)](https://www.npmjs.com/package/event-hooks-webpack-plugin)
[![license](https://img.shields.io/github/license/cascornelissen/event-hooks-webpack-plugin.svg?style=flat-square)](LICENSE.md)

This [webpack](https://webpack.github.io/) plugin is similar to [`webpack-shell-plugin`](https://www.npmjs.com/package/webpack-shell-plugin) but this allows you to execute arbitrary JavaScript instead of commands on *any* [event hook](https://webpack.js.org/api/plugins/compiler/#event-hooks) that is exposed by the Webpack compiler.

**Compatibility**  
Version `^2.0.0` (`event-hooks-webpack-plugin@next`) of this plugin is compatible with webpack `^4.0.0`. If you're using an older version of webpack, make sure to install the latest `^1.0.0` (`event-hooks-webpack-plugin@latest`) release of this plugin.

## Installation
```shell
npm install event-hooks-webpack-plugin --save-dev
```

## Usage
```js
const EventHooksPlugin = require('event-hooks-webpack-plugin');

module.exports = {
    // ...
    plugins: [
        new EventHooksPlugin({
            'event-name': () => {
                // ...
            }
        })
    ]
}
```

## Options
The plugin consumes an object with [Webpack event hook names](https://webpack.js.org/api/plugins/compiler/#event-hooks) (e.g. `run`, `compile`, or `done`) as keys and functions as values.

## License
This project is [licensed](LICENSE.md) under the [MIT](https://opensource.org/licenses/MIT) license.
