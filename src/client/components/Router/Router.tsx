/* Libraries */
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useSelector as reduxUseSelector, useDispatch as reduxUseDispatch, TypedUseSelectorHook } from 'react-redux';

/* Models */
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { ReduxState } from 'client/model/Redux';

/* Application files */
import { getByToken } from 'client/actions/user';
import Config from 'client/lib/config';
import LoadingOverlay from 'client/components/LoadingOverlay';

import AdminPage from 'client/pages/AdminPage';
import LandingPage from 'client/pages/LandingPage';
import MaintenancePage from 'client/pages/MaintenancePage';
import SignInPage from 'client/pages/SignInPage';

const useSelector = reduxUseSelector as TypedUseSelectorHook<ReduxState>;
const useDispatch = () => reduxUseDispatch<ThunkDispatch<ReduxState, any, Action>>();

export function Router () {
    const user = useSelector((state) => state.user);
    const [ loading, setLoading ] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!user.token) {
            setLoading(false);
        } else {
            if (!user.email) loadUserData();
        }
    });

    async function loadUserData () {
        try {
            await dispatch(getByToken(user.token));
        } finally {
            setLoading(false);
        }
    }

    function requireAuthentication (component: any) {
        if (user.token) return component;

        return () => <Redirect to="/admin/signin" />
    }

    if (loading) return <LoadingOverlay />;

    return (
        <BrowserRouter basename="/#">
            <Switch>
                <Route path="/admin/signin" component={SignInPage} exact={true} />
                <Route path="/admin" component={requireAuthentication(AdminPage)} />
                {!Config.MAINTENANCE_MODE && (<Route path="/" component={LandingPage} />)}
                {Config.MAINTENANCE_MODE && (<Route path="/" component={MaintenancePage} />)}
                <Route render={() => <Redirect to="/" />} />
            </Switch>
        </BrowserRouter>
    )
}

export default Router;
