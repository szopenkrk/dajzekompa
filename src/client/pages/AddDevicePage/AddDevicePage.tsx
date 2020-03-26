/* Libraries */
import React, { ChangeEvent, useState, FormEvent } from 'react';
import { useDispatch as reduxUseDispatch } from 'react-redux';
import {makeStyles, Paper, TextField, FormControlLabel, Radio, FormControl, RadioGroup, Typography, FormGroup, Checkbox, FormLabel, Button, Icon } from '@material-ui/core';

/* Models */
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { ReduxState } from '../../model/Redux';

/* Application files */
import { addDevice } from '../../actions/devices';
import LoadingOverlay from '../../components/LoadingOverlay';
import ErrorBox from '../../components/ErrorBox';
import PhotoUploader from '../../components/PhotoUploader';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        padding: '10px',
        display: 'flex',
        justifyContent: 'center'
    },
    container: {
        padding: '3vw',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        width: '44rem',
        '@media (min-width: 800px)': {
            padding: '24px'
        }
    },
    icon: {
        fontSize: '70px',
        color: '#00b848',
        marginBottom: '20px'
    },
    form: {
        width: '100%',
        textAlign: 'center'
    },
    title: {
        padding: '20px 0'
    },
    formSection: {
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
    },
    legend: {
        textAlign: 'left',
        paddingTop: '10px'
    },
    actions: {
        display: 'flex',
        justifyContent: 'flex-end',
        paddingTop: '30px'
    },
    message: {
        textAlign: 'center'
    }
});

const useDispatch = () => reduxUseDispatch<ThunkDispatch<ReduxState, any, Action>>();

export function AddDevicePage () {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [ loading, setLoading ] = useState(false);
    const [ complete, setComplete ] = useState(false);
    const [ error, setError ] = useState('');
    const [ form, setForm ] = useState({
        personType: 'person',
        companyName: '',
        nip: '',
        firstName: '',
        lastName: '',
        email: '',
        deviceType: 'notebook',
        notebookName: '',
        ram: 0,
        hdd: 0,
        screenSize: 0,
        monitor: false,
        camera: false,
        microphone: false,
        speakers: false,
        photos: [],
        comments: ''
    });

    async function onSubmit (e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setError('');
        setLoading(true);

        try {
            await dispatch(addDevice(form));
            setComplete(true);
        } catch (error) {
            setError(error.message);
        }

        setLoading(false);
    }

    function updateField (name: string) {
        return (e: ChangeEvent<HTMLInputElement>) => {
            let value: any = e.target.value;

            if (e.target.getAttribute('type') === 'checkbox') {
                value = e.target.checked;
            }

            setForm({
                ...form,
                [name]: value
            });
        };
    }

    return (
        <main className={classes.root}>
            <Paper variant="outlined" className={classes.container}>
                {loading && (<LoadingOverlay />)}
                {error && (<ErrorBox>{error}</ErrorBox>)}
                {complete && !error && (
                    <>
                        <Icon className={classes.icon}>check_circle</Icon>
                        <Typography variant="h4" className={classes.message}>Formularz został wysłany</Typography>
                        <section className={classes.actions}>
                            <Link to="/">
                                <Button variant="contained" color="primary">Powrót</Button>
                            </Link>
                        </section>
                    </>
                )}
                {!complete && (
                    <form onSubmit={onSubmit} noValidate autoComplete="off" className={classes.form}>
                        <Typography variant="h5" className={classes.title}>Dane kontaktowe</Typography>
                        <section className={classes.formSection}>
                            <FormControl component="fieldset" className={classes.input}>
                                <RadioGroup name="personType" defaultValue="person" className={classes.radios} onChange={updateField('personType')}>
                                    <FormControlLabel control={<Radio />} label="Osoba prywatna" value="person" className={classes.radio} />
                                    <FormControlLabel control={<Radio />} label="Firma" value="company" className={classes.radio} />
                                </RadioGroup>
                            </FormControl>
                            {form.personType === 'company' && <TextField variant="outlined" label="Nazwa firmy" className={classes.input} onChange={updateField('companyName')} />}
                            {form.personType === 'company' && <TextField variant="outlined" label="NIP" className={classes.input} onChange={updateField('nip')} />}
                            {form.personType === 'person' && <TextField variant="outlined" label="Imię" className={classes.input} onChange={updateField('firstName')} />}
                            {form.personType === 'person' && <TextField variant="outlined" label="Nazwisko" className={classes.input} onChange={updateField('lastName')} />}
                            <TextField variant="outlined" label="E-mail" className={classes.input} onChange={updateField('email')} />
                        </section>
                        <Typography variant="h5" className={classes.title}>Sprzęt</Typography>
                        <section className={classes.formSection}>
                            <FormControl component="fieldset" className={classes.input}>
                                <RadioGroup name="deviceType" defaultValue="notebook" className={classes.radios} onChange={updateField('deviceType')}>
                                    <FormControlLabel control={<Radio />} label="Laptop" value="notebook" className={classes.radio} />
                                    <FormControlLabel control={<Radio />} label="Komputer stacjonarny" value="desktop" className={classes.radio} />
                                </RadioGroup>
                            </FormControl>
                            {form.deviceType === 'notebook' && <TextField variant="outlined" label="Producent i model" className={classes.input} onChange={updateField('notebookName')} />}
                            <TextField variant="outlined" label="Pamięć RAM (GB)" type="number" className={classes.input} onChange={updateField('ram')} />
                            <TextField variant="outlined" label="Pojemność dysku (GB)" type="number" className={classes.input} onChange={updateField('hdd')} />
                            <TextField variant="outlined" label="Rozmiar ekranu (cale)" type="number" className={classes.input} onChange={updateField('screenSize')} />
                            {form.deviceType === 'desktop' && (
                                <FormControl component="fieldset" className={classes.input}>
                                    <FormLabel component="legend" className={classes.legend}>Elementy dołączone do zestawu:</FormLabel>
                                    <FormGroup>
                                        <FormControlLabel control={<Checkbox checked={form.monitor} onChange={updateField('monitor')} name="monitor" />} label="Monitor" />
                                        <FormControlLabel control={<Checkbox checked={form.camera} onChange={updateField('camera')} name="camera" />} label="Kamera" />
                                        <FormControlLabel control={<Checkbox checked={form.microphone} onChange={updateField('microphone')} name="microphone" />} label="Mikrofon" />
                                        <FormControlLabel control={<Checkbox checked={form.speakers} onChange={updateField('speakers')} name="speakers" />} label="Głośniki" />
                                    </FormGroup>
                                </FormControl>
                            )}
                        </section>
                        <Typography variant="h5" className={classes.title}>Zdjęcia</Typography>
                        <section className={classes.formSection}>
                            <PhotoUploader onChange={updateField('photos')} />
                        </section>
                        <Typography variant="h5" className={classes.title}>Dodatkowe informacje</Typography>
                        <section className={classes.formSection}>
                            <TextField variant="outlined" label="Dodatkowe informacje i komentarze" className={classes.input} onChange={updateField('comments')} multiline rows={3} />
                        </section>
                        <section className={classes.actions}>
                            <Button variant="contained" type="submit" color="primary">Wyślij</Button>
                        </section>
                    </form>
                )}
            </Paper>
        </main>
    );
}

export default AddDevicePage;
