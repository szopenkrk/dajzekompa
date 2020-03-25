import React, { ChangeEvent, useState } from 'react';
import { makeStyles, Paper, TextField, FormControlLabel, Radio, FormControl, RadioGroup, Typography } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        padding: '10px',
        display: 'flex',
        justifyContent: 'center'
    },
    container: {
        padding: '3vw',
        display: 'flex',
        justifyContent: 'center',
        width: '44rem',
        '@media (min-width: 800px)': {
            padding: '24px'
        }
    },
    form: {
        width: '100%',
        textAlign: 'center'
    },
    formSection: {
        paddingTop: '10px'
    },
    input: {
        width: '100%',
        marginBottom: '5px'
    },
    radios: {
        flexDirection: 'row'
    },
    radio: {
        width: '50%',
        margin: 0,
        '& > span:first-of-type': {
            paddingLeft: 0
        }
    }
});

export function RegisterPage () {
    const classes = useStyles();
    const [ form, setForm ] = useState({
        personType: 'person',
        companyName: '',
        nip: '',
        firstName: '',
        lastName: '',
        email: ''
    });

    function onSubmit () {

    }

    function updateField (name: string) {
        return (e: ChangeEvent<HTMLInputElement>) => {
            setForm({
                ...form,
                [name]: e.target.value
            });
        };
    }

    return (
        <main className={classes.root}>
            <Paper variant="outlined" className={classes.container}>
                <form onSubmit={onSubmit} noValidate autoComplete="off" className={classes.form}>
                    <Typography variant="h5">Dane kontaktowe</Typography>
                    <section className={classes.formSection}>
                        <FormControl component="fieldset" className={classes.input}>
                            <RadioGroup name="personType" defaultValue="person" className={classes.radios} onChange={updateField('personType')}>
                                <FormControlLabel control={<Radio />} label="Osoba prywatna" value="person" className={classes.radio}></FormControlLabel>
                                <FormControlLabel control={<Radio />} label="Firma" value="company" className={classes.radio}></FormControlLabel>
                            </RadioGroup>
                        </FormControl>
                        {form.personType === 'company' && <TextField variant="outlined" label="Nazwa firmy" className={classes.input} onChange={updateField('companyName')} />}
                        {form.personType === 'company' && <TextField variant="outlined" label="NIP" className={classes.input} onChange={updateField('nip')} />}
                        {form.personType === 'person' && <TextField variant="outlined" label="Imię" className={classes.input} onChange={updateField('firstName')} />}
                        {form.personType === 'person' && <TextField variant="outlined" label="Nazwisko" className={classes.input} onChange={updateField('lastName')} />}
                        <TextField variant="outlined" label="E-mail" className={classes.input} onChange={updateField('email')} />
                    </section>
                </form>
            </Paper>
        </main>
    );
}

export default RegisterPage;
