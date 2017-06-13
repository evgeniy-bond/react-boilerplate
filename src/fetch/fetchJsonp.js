import fetchJsonp from 'fetch-jsonp';

export default (url, options={}) =>{
  options = {
    redirect: 'error',
    ...options,
  };

  if(options.query) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + queryParams(options.query);
    delete options.query;
  }

  return fetchJsonp(url);
}

function queryParams(params) {
  return Object.keys(params)
    .map(k => k + '=' + params[k])
    .join('&');
}