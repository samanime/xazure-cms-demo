import merge from 'merge';
import auth from 'xazure-cms-module-auth';
import admin from 'xazure-cms-module-admin';
import posts from 'xazure-cms-module-posts';
import theme from 'xazure-cms-module-theme';
import defaultTheme from 'xazure-cms-module-theme-default';
import { Levels } from 'xazure-logger';
import consoleLogger from 'xazure-logger-module-console';

export default merge({
  secret: 'REPLACE_THIS_WITH_A_RANDOM_STRING',
  public: {},
  port: 8000,
  logger: {
    level: Levels.LOG,
    modules: [consoleLogger]
  },
  security: {
    roles: ['user', 'admin'],
    paths: [
      { path: '/admin', requiredRoles: ['admin'] },
      { path: '/', allowAll: true },
    ]
  },
  publicPath: '/public',
  modules: [
    { ...auth, path: '/', apiPath: '/api/auth' },
    { ...posts, path: '/', apiPath: '/api/post', public: { adminPath: '/posts' } },
    { ...admin, path: '/admin' },
    { ...theme, path: '/', publicPath: '/public/theme', apiPath: '/api/theme', theme: defaultTheme }
  ],
  db: {
    url: "MONGO_DB_URL_GOES_HERE"
  }
}, require('./config.private').default);