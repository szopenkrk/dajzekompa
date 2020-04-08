/* Models */
import { ReceiverForm } from 'client/model/Form';
import { ReduxThunkAction, ReduxActionType } from 'client/model/Redux';
import { Receiver } from 'common/model/Receiver';

/* Application files */
import { request } from 'client/lib/request';

let loaded = false;

function sanitizePhoneNumber (raw: string): string {
    if (raw.startsWith('00')) raw = raw.replace(/^00/g, '+');
    if (!raw.startsWith('+')) raw = '48' + raw;

    return '+' + raw.replace(/\D+/g, '');
}

function sanitizeReceiver (form: ReceiverForm): Receiver {
    return {
        ...form,
        locker: form.locker.id,
        phone: sanitizePhoneNumber(form.phone),
        complete: false
    };
}

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

export function add (form: ReceiverForm): ReduxThunkAction<Receiver> {
    return async (dispatch) => {
        const receiver = sanitizeReceiver(form);
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
