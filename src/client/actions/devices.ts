/* Models */
import { Device, DeviceType, DeviceInput } from 'common/model/Device';
import { ReduxActionType, ReduxThunkAction } from 'client/model/Redux';

/* Application files */
import { request } from 'client/lib/request';
import { FormModel, sanitize, base64toBlob, FormField } from 'client/lib/device';

let loaded = {
    devices: false,
    deviceTypes: false
};

export function list (): ReduxThunkAction<Device[]> {
    return async (dispatch, getState) => {
        if (loaded.devices) return getState().devices;

        const devices = await request<Device[]>('GET', '/devices');

        dispatch({
            type: ReduxActionType.DEVICE_ADD,
            devices
        });

        loaded.devices = true;

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
                type: ReduxActionType.DEVICE_ADD,
                devices: [ result ]
            });
        }

        return result;
    };
}

export function update (id: number, form: FormModel): ReduxThunkAction<Device> {
    return async (dispatch) => {
        const device = sanitize(form);
        const formData = new FormData();

        device[FormField.PHOTOS].forEach((photo) => formData.append('photos', base64toBlob(photo)));
        delete device[FormField.PHOTOS];

        formData.append('device', JSON.stringify(device));

        const result = await request<Device>('PUT', `/devices/${id}`, formData);

        dispatch({
            type: ReduxActionType.DEVICE_UPDATE,
            devices: [ result ]
        });

        return result;
    };
}

export function getTypes (): ReduxThunkAction<DeviceType[]> {
    return async (dispatch, getState) => {
        if (loaded.deviceTypes) return getState().deviceTypes.types;

        const result = await request<DeviceType[]>('GET', '/devices/types');

        dispatch({
            type: ReduxActionType.DEVICE_TYPES_ADD,
            deviceTypes: result
        });

        loaded.deviceTypes = true;

        return result;
    };
}

export function getTypeInputs (deviceType: number): ReduxThunkAction<DeviceInput[]> {
    return async (dispatch, getState) => {
        const cache = getState().deviceTypes.inputs[deviceType];
        if (cache) return cache;

        const result = await request<DeviceInput[]>('GET', `/devices/types/${deviceType}`);

        dispatch({
            type: ReduxActionType.DEVICE_INPUTS_ADD,
            deviceType,
            inputs: result
        });

        return result;
    };
}
