if (module.hot || __DEV__) {
  module.exports = {
    // The red box (aka red screen of death) component to display your errors
    ErrorReporter: require('redbox-react').default,
    // Force-updates React component tree recursively
    deepForceUpdate: require('react-deep-force-update'),
  };
}
