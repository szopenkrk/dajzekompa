/* Libraries */
import React from 'react';
import { makeStyles } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { Redirect } from 'react-router-dom';
import { useSelector as reduxUseSelector, useDispatch as reduxUseDispatch, TypedUseSelectorHook } from 'react-redux';

/* Models */
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { StateUser, ReduxState } from 'client/model/Redux';

/* Application files */
import { signIn } from 'client/actions/user';
import SignIn from 'client/components/SignIn';

const useStyles = makeStyles({
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: grey[400]
    }
});

const useSelector = reduxUseSelector as TypedUseSelectorHook<ReduxState>;
const useDispatch = () => reduxUseDispatch<ThunkDispatch<ReduxState, any, Action>>();

export function SignInPage () {
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    async function onSignIn (email: string, password: string): Promise<StateUser> {
        return dispatch(signIn(email, password));
    }

    if (user.token) return <Redirect to="/admin" />;

    return (
        <main className={classes.container}>
            <SignIn onSignIn={onSignIn} />
        </main>
    );
}

export default SignInPage;
