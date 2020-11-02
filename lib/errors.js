const WebpackError = require('webpack/lib/WebpackError');
const { name } = require('../package.json');

class InvalidHookNameError extends WebpackError {
    constructor(hook, valid) {
        super([
            name,
            `Invalid hook name '${hook}', use one of ${valid.join(', ')}.`
        ].join('\n'));

        if ( Error.captureStackTrace ) {
            Error.captureStackTrace(this, this.constructor);
        }

        this.name = "InvalidHookNameError";
    }
}

module.exports = {
    InvalidHookNameError
};
