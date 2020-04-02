/* Libraries */
import React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { ThemeProvider, Theme } from '@material-ui/core';

/* Models */
import { ReduxState } from 'client/model/Redux';

/* Application files */
import Router from 'client/components/Router';

type Props = {
    store: Store<ReduxState>;
    theme: Theme;
};

export function App (props: Props) {

    return (
        <Provider store={props.store}>
            <ThemeProvider theme={props.theme}>
                <Router />
            </ThemeProvider>
        </Provider>
    );
}

export default App;
