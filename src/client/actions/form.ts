import Config from '../lib/config';

export function sendForm (form) {
    return (dispatch: any) => {
        console.log('Form: ', form);

        return fetch(`${Config.API_URL}/form`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...form,
                personType: form.personType.toUpperCase(),
                deviceType: form.deviceType.toUpperCase()
            })
        }).then((response) => response.json());
    };
}
