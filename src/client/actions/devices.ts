/* Models */
import { Device, PersonType, DeviceType } from 'common/model/Device';
import { ReduxActionType } from 'client/model/Redux';

/* Application files */
import { request } from 'client/lib/request';

function base64toBlob (base64: string): Blob {
    const type = base64.split(',')[0].split(':')[1].split(';')[0];
    const bytes = atob(base64.split(',')[1]);
    const binary = new Uint8Array(bytes.length);

    for (let i = 0; i < bytes.length; ++i) {
        binary[i] = bytes.charCodeAt(i);
    }

    return new Blob([binary], { type });
}

export function addDevice (form) {
    return () => {
        form = { ...form };
        form.personType = form.personType.toUpperCase();
        form.deviceType = form.deviceType.toUpperCase();
        form.nip = form.nip.replace(/\D+/g, '');
        if (form.ram) form.ram = parseFloat(form.ram);
        if (form.hdd) form.hdd = parseFloat(form.hdd);
        if (form.screenSize) form.screenSize = parseFloat(form.screenSize);

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

        const formData = new FormData();

        form.photos.forEach((photo) => formData.append('photos', base64toBlob(photo)));
        delete form.photos;
        formData.append('application', JSON.stringify(form));

        return request('POST', '/devices', formData);
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
