/* Models */
import { Device } from 'common/model/Device';
import { ReduxActionType, ReduxThunkAction } from 'client/model/Redux';

/* Application files */
import { request } from 'client/lib/request';
import { FormModel, sanitize, base64toBlob, FormField } from 'client/lib/device';

let loaded = false;

export function list (): ReduxThunkAction<Device[]> {
    return async (dispatch, getState) => {
        if (loaded) return getState().devices;

        const devices = await request<Device[]>('GET', '/devices');

        dispatch({
            type: ReduxActionType.DEVICES_ADD,
            devices
        });

        loaded = true;

        return devices;
    }
}

export function add (form: FormModel): ReduxThunkAction<Device> {
    return async (dispatch) => {
        const device = sanitize(form);
        const formData = new FormData();

        device[FormField.PHOTOS].forEach((photo) => formData.append('photos', base64toBlob(photo)));
        delete device[FormField.PHOTOS];

        formData.append('device', JSON.stringify(device));

        const result = await request<Device>('POST', '/devices', formData);

        if (loaded) {
            dispatch({
                type: ReduxActionType.DEVICES_ADD,
                devices: [ result ]
            });
        }

        return result;
    };
}
