/* Libraries */
import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { ThemeProvider, Theme } from '@material-ui/core';

/* Models */
import { ReduxState } from '../../model/Redux';

/* Application files */
import LandingPage from '../../pages/LandingPage';

type Props = {
    store: Store<ReduxState>;
    theme: Theme;
};

export function App (props: Props) {
    return (
        <Provider store={props.store}>
            <ThemeProvider theme={props.theme}>
                <BrowserRouter>
                    <Switch>
                        <Route path="/" component={LandingPage} exact={true} />
                        <Route render={() => <Redirect to="/" />} />
                    </Switch>
                </BrowserRouter>
            </ThemeProvider>
        </Provider>
    );
}

export default App;