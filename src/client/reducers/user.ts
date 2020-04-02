import { AnyAction } from 'redux';

import { ReduxActionType, StateUser } from 'client/model/Redux';

function getInitialState (): StateUser {
    return {
        token: localStorage.getItem('token'),
        email: null,
        firstName: null,
        lastName: null
    };
}

export default function (state: StateUser = getInitialState(), action: AnyAction): StateUser {
    switch (action.type) {
        case ReduxActionType.USER_SIGNIN: {
            localStorage.setItem('token', action.user.token);

            return { ...action.user };
        }
        case ReduxActionType.USER_SIGNOUT: {
            localStorage.removeItem('token');

            return getInitialState();
        }
        default: return state;
    }
}
