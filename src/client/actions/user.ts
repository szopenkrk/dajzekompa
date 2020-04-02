/* Models */
import { StateUser, ReduxActionType } from 'client/model/Redux';

const user: StateUser = {
    firstName: 'Jan',
    lastName: 'Kowalski',
    token: '0986320d-38d4-4983-aaee-d42fb2a01e09',
    email: 'dajzekompa@dajzekompa.pl'
};

export function signIn (email: string, password: string) {
    return (dispatch) => {
        return new Promise<StateUser>((resolve) => {
            setTimeout(() => {
                dispatch({
                    type: ReduxActionType.USER_SIGNIN,
                    user
                });

                return resolve(user);
            }, 1000);
        });
    };
}

export function getByToken (token: string) {
    return (dispatch) => {
        return new Promise<StateUser>((resolve) => {
            setTimeout(() => {
                dispatch({
                    type: ReduxActionType.USER_SIGNIN,
                    user
                });

                return resolve(user);
            }, 1000);
        });
    };

}

export function signOut () {
    return (dispatch) => {
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                dispatch({
                    type: ReduxActionType.USER_SIGNOUT
                });

                /* Note: can only resolve - even if any requests fail, need to clean user/token and resolve anyway */
                return resolve();
            }, 1000);
        });
    };
}
