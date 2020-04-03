/* Models */
import { Device, PersonType, DeviceType } from 'common/model/Device';
import { ReduxActionType } from 'client/model/Redux';
import { DeviceForm } from 'client/model/Form';

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

function sanitizeDeviceObject (form: DeviceForm): Device {
    let device: Device = {
        ...form,
        nip: form.nip.replace(/\D+/g, ''),
        ram: parseFloat(form.ram),
        hdd: parseFloat(form.hdd),
        screenSize: parseFloat(form.screenSize)
    };

    device = Object.keys(device).reduce((all, current) => {
        if (typeof device[current] === 'undefined' || device[current] === '') return all;

        all[current] = device[current];

        return all;
    }, {} as Device);

    if (device.personType === PersonType.PERSON) {
        delete device.companyName;
        delete device.nip;
    }

    if (device.personType === PersonType.COMPANY) {
        delete device.firstName;
        delete device.lastName;
    }

    if (device.deviceType === DeviceType.DESKTOP) {
        delete device.notebookName
    }

    if (device.deviceType === DeviceType.NOTEBOOK) {
        delete device.monitor;
        delete device.camera;
        delete device.microphone;
        delete device.speakers;
    }

    if (device.ram === 0) delete form.ram;
    if (device.hdd === 0) delete form.hdd;
    if (device.screenSize === 0) delete form.screenSize;

    return device;
}

export function addDevice (form: DeviceForm) {
    return () => {
        const device = sanitizeDeviceObject(form);
        const formData = new FormData();

        form.photos.forEach((photo) => formData.append('photos', base64toBlob(photo)));
        delete form.photos;
        formData.append('device', JSON.stringify(device));

        return request('POST', '/devices', formData);
    };
}

export function loadDevices () {
    return async (dispatch: any, getState) => {
        const cache = getState().devices;

        if (cache.length) return cache;

        const devices = await request<Device[]>('GET', '/devices');

        dispatch({
            type: ReduxActionType.DEVICES_LOAD,
            devices
        });

        return devices;
    }
}
