import { renderToString } from 'react-dom/server';

import { APP_NAME } from '../common/config/app';

const DEV = process.env.NODE_ENV === 'development';
const assetManifest = JSON.parse(process.env.REACT_APP_ASSET_MANIFEST || '{}');
const bundleUrl = DEV ?
  '/static/js/bundle.js' :
  `/${assetManifest['main.js']}`
const css = DEV ?
  '' : // in DEV the css is hot loaded
  `<link href="/${assetManifest['main.css']}" media="all" rel="stylesheet" />`

export default function renderFullPage (component, preloadedState) { 
  return (`
    <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
          ${css}
          <link rel="manifest" href="/public/manifest.json">
          <link rel="shortcut icon" href="/public/favicon.ico">
          <title>${APP_NAME}</title>
        </head>
        <body>
          <div id="root">${renderToString(component)}</div>
          <script>
            // WARNING: See the following for security issues around embedding JSON in HTML:
            // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
            window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState.toJS()).replace(/</g, '\\u003c')}
          </script>
          <script type="application/javascript" src="${bundleUrl}"></script>
        </body>
      </html>
  `);

}
