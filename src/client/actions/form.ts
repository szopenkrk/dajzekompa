import Config from '../lib/config';

export function sendForm (form) {
    return (dispatch: any) => {
        form = { ...form };
        form.personType = form.personType.toUpperCase();
        form.deviceType = form.deviceType.toUpperCase();

        form = Object.keys(form).reduce((all, current) => {
            if (form[current]) all[current] = form[current];

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
