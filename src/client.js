import React from 'react';
import ReactDOM from 'react-dom';
import queryString from 'query-string';
import { createPath } from 'history/PathUtils';
import history from './core/history';
import { updateMeta } from './core/DOMUtils';
import { ErrorReporter, deepForceUpdate } from './core/devUtils';
import App from './components/App';


const context = {
  insertCss: (...styles) => {
    const removeCss = styles.map(x => x._insertCss());
    return () => { removeCss.forEach(f => f()); };
  },
};

// Switch off the native scroll restoration behavior and handle it manually
const scrollPositionsHistory = {};
if (window.history && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

let onRenderComplete = function initialRenderComplete() {
  const elem = document.getElementById('css');
  if (elem) elem.parentNode.removeChild(elem);
  onRenderComplete = function renderComplete(route, location) {
    document.title = route.title;

    // Update necessary tags in <head> at runtime here, ie:
    updateMeta('description', route.description); 

    let scrollX = 0;
    let scrollY = 0;
    const pos = scrollPositionsHistory[location.key];
    if (pos) {
      scrollX = pos.scrollX;
      scrollY = pos.scrollY;
    } else {
      const targetHash = location.hash.substr(1);
      if (targetHash) {
        const target = document.getElementById(targetHash);
        if (target) {
          scrollY = window.pageYOffset + target.getBoundingClientRect().top;
        }
      }
    }

    // Restore the scroll position if it was saved into the state
    // or scroll to the given #hash anchor
    // or scroll to top of the page
    window.scrollTo(scrollX, scrollY);

    // Google Analytics tracking. Don't send 'pageview' event after
    // the initial rendering, as it was already sent
    if (window.ga) {
      window.ga('send', 'pageview', createPath(location));
    }
  };
};

const container = document.getElementById('app');
let appInstance;
let currentLocation = history.location;
let router = require('./router').default;

// Re-render the app when window.location changes
async function onLocationChange(location, action) {
  // Remember the latest scroll position for the previous location
  scrollPositionsHistory[currentLocation.key] = {
    scrollX: window.pageXOffset,
    scrollY: window.pageYOffset,
  };
  // Delete stored scroll position for next page if any
  if (action === 'PUSH') {
    delete scrollPositionsHistory[location.key];
  }
  currentLocation = location;

  try {
    // Traverses the list of routes in the order they are defined until
    // it finds the first route that matches provided URL path string
    // and whose action method returns anything other than `undefined`.
    const route = await router.resolve({
      path: location.pathname,
      query: queryString.parse(location.search),
    });

    // Prevent multiple page renders during the routing process
    if (currentLocation.key !== location.key) {
      return;
    }

    if (route.redirect) {
      history.replace(route.redirect);
      return;
    }

    appInstance = ReactDOM.render(
      <App context={context}>{route.component}</App>,
      container,
      () => onRenderComplete(route, location),
    );
  } catch (error) {
    // Display the error in full-screen for development mode
    if (__DEV__) {
      appInstance = null;
      document.title = `Error: ${error.message}`;
      ReactDOM.render(<ErrorReporter error={error} />, container);
      throw error;
    }

    console.error(error);

    // Do a full page reload if error occurs during client-side navigation
    if (action && currentLocation.key === location.key) {
      window.location.reload();
    }
  }
}

// Handle client-side navigation by using HTML5 History API
history.listen(onLocationChange);
onLocationChange(currentLocation);

// Handle errors that might happen after rendering
// Display the error in full-screen for development mode
if (__DEV__) {
  window.addEventListener('error', (event) => {
    appInstance = null;
    document.title = `Runtime Error: ${event.error.message}`;
    ReactDOM.render(<ErrorReporter error={event.error} />, container);
  });
}

// Enable Hot Module Replacement (HMR)
if (module.hot) {
  module.hot.accept('./router', () => {
    router = require('./router').default;

    if (appInstance) {
      try {
        // Force-update the whole tree, including components that refuse to update
        deepForceUpdate(appInstance);
      } catch (error) {
        appInstance = null;
        document.title = `Hot Update Error: ${error.message}`;
        ReactDOM.render(<ErrorReporter error={error} />, container);
        return;
      }
    }

    onLocationChange(currentLocation);
  });
}

//
// const isExternal = (url) => {
//   const match = url.match(/^([^:\/?#]+:)?(?:\/\/([^\/?#]*))?([^?#]+)?(\?[^#]*)?(#.*)?/);
//   if (typeof match[1] === "string" && match[1].length > 0 && match[1].toLowerCase() !== location.protocol) return true;
//   if (typeof match[2] === "string" && match[2].length > 0 && match[2].replace(new RegExp(":(" + {
//     "http:": 80,
//     "https:": 443
//   }[location.protocol] + ")?$"), "") !== location.host) return true;
//   return false;
// };

// document.body.addEventListener('click', function (ev) {
//   polyphills();
//   const target = ev.target.closest('a');
//   if (target) {
//     let url = target.getAttribute("href");

//     if (url && !isExternal(url)) {

//       if (!/company/.test(url)) {
//         url = window.App.apiUrl + url;
//         console.log(url);
//         ev.preventDefault();
//         window.location.href = url;
//       }
//       if (url.indexOf('#') === 0) {
//         const anchor = document.querySelector(url);
//         let offset = anchor.getBoundingClientRect().top + 1;
//         window.scrollTo(0, offset);
//       }
//     }
//   }
// });
