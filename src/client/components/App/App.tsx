/* Libraries */
import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { ThemeProvider, Theme } from '@material-ui/core';

/* Models */
import { ReduxState } from 'client/model/Redux';

/* Application files */
import Config from 'client/lib/config';
import LandingPage from 'client/pages/LandingPage';
import MaintenancePage from 'client/pages/MaintenancePage';
import AdminPage from 'client/pages/AdminPage';

type Props = {
    store: Store<ReduxState>;
    theme: Theme;
};

export function App (props: Props) {
    return (
        <Provider store={props.store}>
            <ThemeProvider theme={props.theme}>
                <BrowserRouter basename="/#">
                    <Switch>
                        <Route path="/admin" component={AdminPage} />
                        {!Config.MAINTENANCE_MODE && (<Route path="/" component={LandingPage} />)}
                        {Config.MAINTENANCE_MODE && (<Route path="/" component={MaintenancePage} />)}
                        <Route render={() => <Redirect to="/" />} />
                    </Switch>
                </BrowserRouter>
            </ThemeProvider>
        </Provider>
    );
}

export default App;
