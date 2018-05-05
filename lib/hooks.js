/* Exists for symmetry with other task classes, users are encouraged to use simple functions instead */
class EventHooksPluginTask {
  constructor(task) {
    this.tap = 'tap';
    this.task = task;
  }
}

class EventHooksPluginPromiseTask {
  constructor(task) {
    this.tap = 'tapPromise';
    this.task = task;
  }
}

class EventHooksPluginCallbackTask {
  constructor(task) {
    this.tap = 'tapAsync';
    this.task = task;
  }
}

module.exports = {
  EventHooksPluginTask,
  EventHooksPluginPromiseTask,
  EventHooksPluginCallbackTask
};
