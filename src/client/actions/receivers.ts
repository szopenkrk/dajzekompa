/* Models */
import { ReduxThunkAction, ReduxActionType } from 'client/model/Redux';
import { Receiver } from 'common/model/Receiver';

/* Application files */
import { request } from 'client/lib/request';
import { FormModel, sanitize } from 'client/lib/receiver';

let loaded = false;

export function list (): ReduxThunkAction<Receiver[]> {
    return async (dispatch, getState) => {
        if (loaded) return getState().receivers;

        const result = await request<Receiver[]>('GET', '/receivers');

        dispatch({
            type: ReduxActionType.RECEIVERS_ADD,
            receivers: result
        });

        loaded = true;

        return result;
    };
}

export function add (form: FormModel): ReduxThunkAction<Receiver> {
    return async (dispatch) => {
        const receiver = sanitize(form);
        const result = await request<Receiver>('POST', '/receivers', receiver);

        if (loaded) {
            dispatch({
                type: ReduxActionType.RECEIVERS_ADD,
                receivers: [ result ]
            });
        }

        return result;
    };
}

export function update (id: string, form: FormModel): ReduxThunkAction<Receiver> {
    return async (dispatch) => {
        const receiver = sanitize(form);
        const result = await request<Receiver>('PUT', `/receivers/${id}`, receiver);

        if (loaded) {
            dispatch({
                type: ReduxActionType.RECEIVERS_UPDATE,
                receivers: [ result ]
            });
        }

        return result;
    }
}
