class InvalidHookNameError extends Error {
    constructor(...params) {
        super(...params);

        if ( Error.captureStackTrace ) {
            Error.captureStackTrace(this, InvalidHookNameError);
        }

        this.name = 'InvalidHookNameError';
    }
}

module.exports = {
    InvalidHookNameError
};
