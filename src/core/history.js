import createBrowserHistory from 'history/createBrowserHistory';

// Navigation manager, e.g. history.push('/home')
export default process.env.BROWSER && createBrowserHistory();