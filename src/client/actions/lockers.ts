/* Models */
import { ReduxThunkAction, ReduxActionType } from 'client/model/Redux';
import { Locker } from 'common/model/Locker';

/* Application files */
import { request } from 'client/lib/request';

let loaded = false;

export function list (): ReduxThunkAction<Locker[]> {
    return async (dispatch, getState) => {
        if (loaded) return getState().lockers;

        const result = await request<Locker[]>('GET', '/lockers');

        dispatch({
            type: ReduxActionType.LOCKERS_ADD,
            lockers: result
        });

        loaded = true;

        return result;
    };
}
