export function sendForm (form) {
    return (dispatch: any) => {
        return new Promise((resolve, reject) => {
            console.log('Form: ', form);

            setTimeout(() => {
                resolve();
            }, 1000);
        })
    };
}
