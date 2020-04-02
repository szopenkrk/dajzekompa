/* Libraries */
import React, { useState, useEffect, PropsWithChildren } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useSelector as reduxUseSelector, useDispatch as reduxUseDispatch, TypedUseSelectorHook } from 'react-redux';

/* Models */
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { ReduxState } from 'client/model/Redux';

/* Application files */
import { getByToken, signOut } from 'client/actions/user';
import Config from 'client/lib/config';
import LoadingOverlay from 'client/components/LoadingOverlay';

import AdminPage from 'client/pages/AdminPage';
import LandingPage from 'client/pages/LandingPage';
import MaintenancePage from 'client/pages/MaintenancePage';
import SignInPage from 'client/pages/SignInPage';

const useSelector = reduxUseSelector as TypedUseSelectorHook<ReduxState>;
const useDispatch = () => reduxUseDispatch<ThunkDispatch<ReduxState, any, Action>>();

function UserDataFetcher ({ children }: PropsWithChildren<{}>) {
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(false);
    const { token, email } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    async function loadUserData () {
        try {
            await dispatch(getByToken(token));
        } catch (error) {
            await dispatch(signOut());
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        (() => {
            if (!token) return setError(true);
            if (!email) return loadUserData();

            return setLoading(false);
        })();
    }, [ token ]);

    if (error) return <Redirect to="/admin/signin" />
    if (loading) return <LoadingOverlay />;

    return (<>{children}</>);
}

export function Router () {
    function requireAuthentication (Component: () => JSX.Element) {
        return () => (
            <UserDataFetcher>
                <Component />
            </UserDataFetcher>
        );
    }

    return (
        <BrowserRouter basename="/#">
            <Switch>
                <Route path="/admin/signin" component={SignInPage} exact={true} />
                <Route path="/admin" render={requireAuthentication(AdminPage)} />
                {!Config.MAINTENANCE_MODE && (<Route path="/" component={LandingPage} />)}
                {Config.MAINTENANCE_MODE && (<Route path="/" component={MaintenancePage} />)}
                <Route render={() => <Redirect to="/" />} />
            </Switch>
        </BrowserRouter>
    )
}

export default Router;
