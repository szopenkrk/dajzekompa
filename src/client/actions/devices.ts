/* Models */
import { Device, PersonType, DeviceType } from '../model/Device';
import { ReduxActionType } from '../model/Redux';

/* Application files */
import { request } from '../lib/request';

export function addDevice (form) {
    return (dispatch: any) => {
        form = { ...form };
        console.log(form);
        form.personType = form.personType.toUpperCase();
        form.deviceType = form.deviceType.toUpperCase();
        form.nip = form.nip.replace(/\D+/g, '');

        form = Object.keys(form).reduce((all, current) => {
            if (typeof form[current] === 'undefined' || form[current] === '') return all;

            all[current] = form[current];

            return all;
        }, {});

        if (form.personType === PersonType.PERSON) {
            delete form.companyName;
            delete form.nip;
        }
        if (form.personType === PersonType.COMPANY) {
            delete form.firstName;
            delete form.lastName;
        }
        if (form.deviceType === DeviceType.DESKTOP) {
            delete form.notebookName
        }
        if (form.deviceType === DeviceType.NOTEBOOK) {
            delete form.monitor;
            delete form.camera;
            delete form.microphone;
            delete form.speakers;
        }
        if (form.ram === 0) delete form.ram;
        if (form.hdd === 0) delete form.hdd;
        if (form.screenSize === 0) delete form.screenSize;

        return request('POST', '/devices', form);
    };
}

export function loadDevices () {
    return async (dispatch: any, getState) => {
        const cache = getState().devices;

        if (cache.length) return cache;

        const devices = await request<Device[]>('GET', '/list');

        dispatch({
            type: ReduxActionType.DEVICES_LOAD,
            devices
        });

        return devices;
    }
}
