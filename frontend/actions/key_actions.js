const AppDispatcher = require('../dispatcher/dispatcher');

const KeyActions = {
  keyPressed(key) {
    AppDispatcher.dispatch({
      actionType:'KEY_PRESSED',
      key: key
    });
  },
  keyReleased(key) {
    AppDispatcher.dispatch({
      actionType: 'KEY_RELEASED',
      key: key
    });
  }
};

module.exports = KeyActions;
