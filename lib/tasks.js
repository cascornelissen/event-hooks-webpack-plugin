// Exists for symmetry with other task classes, users are encouraged to use simple functions instead
class Task {
    constructor(task) {
        this.tap = 'tap';
        this.task = task;
    }
}

class PromiseTask {
    constructor(task) {
        this.tap = 'tapPromise';
        this.task = task;
    }
}

class CallbackTask {
    constructor(task) {
        this.tap = 'tapAsync';
        this.task = task;
    }
}

module.exports = {
    Task,
    PromiseTask,
    CallbackTask
};
