/* Models */
import { ReduxThunkAction, ReduxActionType } from 'client/model/Redux';

/* Application files */
import { request } from 'client/lib/request';

let loaded = false;

export function list (): ReduxThunkAction<string[]> {
    return async (dispatch, getState) => {
        if (loaded) return getState().schools;

        const result = await request<string[]>('GET', '/schools');

        dispatch({
            type: ReduxActionType.SCHOOLS_ADD,
            schools: result
        });

        loaded = true;

        return result;
    };
}
