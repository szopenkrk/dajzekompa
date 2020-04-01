/* Libraries */
import React from 'react';
import { render } from 'react-dom';
import { createStore, compose, applyMiddleware, Store } from 'redux';
import thunk from 'redux-thunk';

/* Models */
import { ReduxState } from 'client/model/Redux';

/* Application files */
import Config, { loadConfigFromObject } from 'client/lib/config';
import theme from 'client/lib/theme';
import reducers from 'client/reducers'

import App from 'client/components/App';

loadConfigFromObject(window['__CONFIG__']);

const devtoolsComposer = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'];
const composer = Config.NODE_ENV === 'development' && devtoolsComposer ? devtoolsComposer : compose;
const store: Store<ReduxState> = createStore(reducers, {}, composer(applyMiddleware(thunk)));

render(<App store={store} theme={theme} />, document.getElementById('app'));
