/* Models */
import { Device } from '../model/Device';
import { ReduxActionType } from '../model/Redux';

/* Application files */
import Config from '../lib/config';

export function sendForm (form) {
    return (dispatch: any) => {
        form = { ...form };
        form.personType = form.personType.toUpperCase();
        form.deviceType = form.deviceType.toUpperCase();
        form.ram = parseFloat(form.ram.replace(/,/g, '.'));
        form.hdd = parseFloat(form.hdd.replace(/,/g, '.'));
        form.screenSize = parseFloat(form.screenSize.replace(/,/g, '.'));

        form = Object.keys(form).reduce((all, current) => {
            if (typeof form[current] === 'undefined' || form[current] === '') return all;

            all[current] = form[current];

            return all;
        }, {});

        if (form.personType === 'PERSON') {
            delete form.companyName;
            delete form.nip;
        }
        if (form.personType === 'COMPANY') {
            delete form.firstName;
            delete form.lastName;
        }
        if (form.deviceType === 'DESKTOP') {
            delete form.notebookName
        }

        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(`${Config.API_URL}/form`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(form)
                });

                if (!response.ok) {
                    throw new Error('Ups, coś poszło nie tak.');
                }

                const result = await response.json();

                return resolve(result);
            } catch (error) {
                console.error(error);

                return reject(error);
            }
        });
    };
}

export function loadDevices () {
    return (dispatch: any, getState) => {
        console.log(getState);

        return new Promise<Device[]>(async (resolve, reject) => {
            try {
                const response = await fetch(`${Config.API_URL}/list`, {
                    method: 'GET'
                });

                if (!response.ok) {
                    throw new Error('Ups, coś poszło nie tak.');
                }

                const result = await response.json();

                dispatch({
                    type: ReduxActionType.DEVICES_LOAD,
                    devices: result.data
                });

                return resolve(result.data);
            } catch (error) {
                console.error(error);

                return reject(error);
            }
        })
    }
}
