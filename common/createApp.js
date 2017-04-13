import React from 'react';
import dva from 'dva';
import { RouterContext } from 'dva/router';
import router from './router';
import city from './models/city';
export default function createApp(opts, isServer) {
  const app = dva(opts);
  app.model(city);
  if (isServer) {
    app.router(({ history, renderProps}) => {
      return <RouterContext {...renderProps} />;
    });
  } else {
		app.router(router);
  }
  return app;
}
