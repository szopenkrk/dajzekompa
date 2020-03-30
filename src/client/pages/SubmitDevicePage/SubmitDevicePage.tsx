/* Libraries */
import React, { ChangeEvent, useState, FormEvent } from 'react';
import { useDispatch as reduxUseDispatch } from 'react-redux';
import {makeStyles, Typography, TextField, FormControlLabel, Radio, FormControl, RadioGroup, FormGroup, Checkbox, FormLabel, Button, Icon } from '@material-ui/core';

/* Models */
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { ReduxState } from '../../model/Redux';

/* Application files */
import { addDevice } from '../../actions/devices';
import LoadingOverlay from '../../components/LoadingOverlay';
import PhotoUploader from '../../components/PhotoUploader';
import ProgramSummary from '../../components/ProgramSummary';
import ErrorBox from '../../components/ErrorBox';
import Partners from '../../components/Partners';

/* Application files */

const useStyles = makeStyles({
    container: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: '60px'
    },
    content: {
        width: '547px',
        position: 'relative'
    },
    sidebar: {
        width: '226px',
        paddingTop: '10px',
        display: 'flex',
        flexDirection: 'column'
    },
    title: {
        fontWeight: 900,
        paddingBottom: '55px',
        textTransform: 'uppercase'
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
    subtitle: {
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
        paddingTop: '30px',
        paddingBottom: '10px'
    },
    message: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    messageTitle: {
        textAlign: 'center'
    },
    loading: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)'
    }
});

const useDispatch = () => reduxUseDispatch<ThunkDispatch<ReduxState, any, Action>>();

const formModel = {
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
};

export function SubmitDevicePage () {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [ loading, setLoading ] = useState(false);
    const [ complete, setComplete ] = useState(false);
    const [ error, setError ] = useState('');
    const [ form, setForm ] = useState({ ...formModel });

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
        return (e: ChangeEvent<HTMLInputElement>, value?: any) => {
            if (!value) value = e.target.value;

            setForm({
                ...form,
                [name]: value
            });
        };
    }

    function resetForm () {
        setLoading(false);
        setComplete(false);
        setError('');
        setForm({ ...formModel });
    }

    return (
        <div className={classes.container}>
            <section className={classes.content}>
                <Typography variant="h2" className={classes.title}>Podaruj kompa</Typography>
                {loading && (<LoadingOverlay className={classes.loading} />)}
                {error && (<ErrorBox>{error}</ErrorBox>)}
                {complete && !error && (
                    <div className={classes.message}>
                        <Icon className={classes.icon}>check_circle</Icon>
                        <Typography variant="h5" className={classes.messageTitle}>Dziękujemy!</Typography>
                        <Typography variant="body1" className={classes.messageTitle}>Informacje o twoim kompie zostały do nas wysłane. Poinformujemy Cię o dalszych krokach.</Typography>
                        <section className={classes.actions}>
                            <Button variant="contained" color="primary" onClick={resetForm}>Podaruj jeszcze jeden</Button>
                        </section>
                    </div>
                )}
                {!complete && (
                    <form onSubmit={onSubmit} noValidate autoComplete="off" className={classes.form}>
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
                        <Typography variant="h5" className={classes.subtitle}>Sprzęt</Typography>
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
                        <Typography variant="h5" className={classes.subtitle}>Zdjęcia</Typography>
                        <section className={classes.formSection}>
                            <PhotoUploader onChange={updateField('photos')} mime={['image/jpeg', 'image/png', 'image/bmp']} maxSize={3145728} />
                        </section>
                        <Typography variant="h5" className={classes.subtitle}>Dodatkowe informacje</Typography>
                        <section className={classes.formSection}>
                            <TextField variant="outlined" label="Dodatkowe informacje i komentarze" className={classes.input} onChange={updateField('comments')} multiline rows={3} />
                        </section>
                        <section className={classes.actions}>
                            <Button variant="contained" type="submit" color="primary">Wyślij</Button>
                        </section>
                    </form>
                )}
            </section>
            <aside className={classes.sidebar}>
                <ProgramSummary />
                <Partners vertical />
            </aside>
        </div>
    );
}

export default SubmitDevicePage;
