import { DEV } from '../../server-api';

export const proxyConfig = {
  target: DEV,
  changeOrigin: true,
  pathRewrite: {
    '^/spa/security-check': '/security-check',
  }
};
