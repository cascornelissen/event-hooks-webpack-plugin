# Event Hooks Webpack Plugin
This [Webpack](https://webpack.github.io/) plugin is similar to [`webpack-shell-plugin`](https://www.npmjs.com/package/webpack-shell-plugin) but this allows you to execute arbitrary JavaScript instead of commands on *any* [event hook](https://webpack.js.org/api/plugins/compiler/#event-hooks) that is exposed by the Webpack compiler.

## Installation
```shell
npm install event-hooks-webpack-plugin --save-dev
```

## Usage
```js
var EventHooksPlugin = require('event-hooks-webpack-plugin');

module.exports = {
    // ...
    plugins: [
        new EventHooksPlugin({
            'event-name': function() {
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
