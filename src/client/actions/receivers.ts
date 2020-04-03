/* Models */
import { ReceiverForm } from 'client/model/Form';
import { ReduxThunkAction, ReduxActionType } from 'client/model/Redux';
import { Receiver } from 'common/model/Receiver';

/* Application files */
import { request } from 'client/lib/request';

function sanitizeReceiver (form: ReceiverForm): Receiver {
    return form;
}

export function list () {
    return async (dispatch) => {
        const result = await request<Receiver[]>('GET', '/receivers');

        dispatch({
            type: ReduxActionType.RECEIVERS_ADD,
            receivers: result
        });

        return result;
    };
}

export function add (form: ReceiverForm): ReduxThunkAction<Receiver> {
    return async (dispatch) => {
        const receiver = sanitizeReceiver(form);
        const result = await request<Receiver>('POST', '/receivers', receiver);

        dispatch({
            type: ReduxActionType.RECEIVERS_ADD,
            receivers: [ result ]
        });

        return result;
    };
}
