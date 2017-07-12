import { API } from '../../server-api';

export const proxyConfig = {
  target: API,
  changeOrigin: true,
  pathRewrite: {
    '^/spa/security-check': '/security-check',
  }
};
