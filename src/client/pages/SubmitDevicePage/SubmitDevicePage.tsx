/* Libraries */
import React, { useState } from 'react';
import { useDispatch as reduxUseDispatch } from 'react-redux';
import { makeStyles, Typography, TextField, FormControlLabel, Radio, FormControl, RadioGroup, FormGroup, Checkbox, FormLabel, Button, Icon, useTheme } from '@material-ui/core';
import InputAdornment from "@material-ui/core/InputAdornment";
import Tooltip from "@material-ui/core/Tooltip";

/* Models */
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { DeviceType, PersonType } from 'common/model/Device';
import { DeviceForm } from 'client/model/Form';
import { ReduxState } from 'client/model/Redux';

/* Application files */
import { add as addDevice } from 'client/actions/devices';
import LoadingOverlay from 'client/components/LoadingOverlay';
import PhotoUploader from 'client/components/PhotoUploader';
import ErrorBox from 'client/components/ErrorBox';
import SubPage from 'client/pages/SubPage';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    icon: {
        fontSize: 70,
        color: '#00b848',
        marginBottom: 20
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
        margin: `${theme.spacing(1)}px 0`
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
        paddingTop: 10
    },
    actions: {
        display: 'flex',
        justifyContent: 'flex-end',
        paddingTop: 30,
        paddingBottom: 10
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
    helper: {
        cursor: "pointer"
    },
    tooltip: {
        width: 300
    },
    link: {
        color: theme.palette.primary.main,
        '&:hover': {
            textDecoration: 'underline',
            '& > .material-icons': {
                borderBottom: `1.5px solid ${theme.palette.primary.main}`
            }
        }
    },
    linkIcon: {
        fontSize: '1rem',
        position: 'relative',
        top: 3,
        borderBottom: `1.5px solid rgba(0, 0, 0, 0)`
    }
}));

const useDispatch = () => reduxUseDispatch<ThunkDispatch<ReduxState, any, Action>>();

const formModel = {
    personType: PersonType.PERSON,
    companyName: '',
    nip: '',
    firstName: '',
    lastName: '',
    street: '',
    streetNumber: '',
    city: '',
    postcode: '',
    email: '',
    bankAccount: '',
    deviceType: DeviceType.NOTEBOOK,
    notebookName: '',
    ram: '0',
    hdd: '0',
    screenSize: '0',
    monitor: false,
    camera: false,
    microphone: false,
    speakers: false,
    photos: [],
    comments: '',
    rodo: false,
    rights: false,
} as DeviceForm;

export function SubmitDevicePage () {
    const classes = useStyles();
    const theme = useTheme();
    const dispatch = useDispatch();
    const [ loading, setLoading ] = useState(false);
    const [ complete, setComplete ] = useState(false);
    const [ error, setError ] = useState('');
    const [ form, setForm ] = useState({ ...formModel });

    async function onSubmit (e: React.FormEvent<HTMLFormElement>) {
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

    function getHorizontalInputStyles (percentageWidth: number, first: boolean) {
        return {
            width: first ? `${percentageWidth}%` : `calc(${percentageWidth}% - ${theme.spacing(1)}px)`,
            ...(first ? {} : { marginLeft: theme.spacing(1) })
        };
    }

    function updateField (name: string) {
        return (e: React.ChangeEvent<HTMLInputElement>, value?: any) => {
            if (typeof value === 'undefined') value = e.target.value;

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
        <SubPage title="Podaruj kompa">
            {loading && (<LoadingOverlay />)}
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
                            <RadioGroup name="personType" defaultValue={PersonType.PERSON} className={classes.radios} onChange={updateField('personType')}>
                                <FormControlLabel control={<Radio />} label="Osoba prywatna" value={PersonType.PERSON} className={classes.radio} />
                                <FormControlLabel control={<Radio />} label="Firma" value={PersonType.COMPANY} className={classes.radio} />
                            </RadioGroup>
                        </FormControl>
                        {form.personType === PersonType.COMPANY && <TextField variant="outlined" label="Nazwa firmy" className={classes.input} onChange={updateField('companyName')} />}
                        {form.personType === PersonType.COMPANY && <TextField variant="outlined" label="NIP" className={classes.input} onChange={updateField('nip')} />}
                        <TextField variant="outlined" label="Imię" className={classes.input} onChange={updateField('firstName')} />
                        <TextField variant="outlined" label="Nazwisko" className={classes.input} onChange={updateField('lastName')} />
                         <TextField variant="outlined" label="Ulica" className={classes.input} onChange={updateField('street')} style={getHorizontalInputStyles(75, true)} />
                        <TextField variant="outlined" label="Numer" className={classes.input} onChange={updateField('streetNumber')} style={getHorizontalInputStyles(25, false)} />
                        <TextField variant="outlined" label="Kod pocztowy" className={classes.input} onChange={updateField('postcode')} style={getHorizontalInputStyles(25, true)} />
                        <TextField variant="outlined" label="Miejscowość" className={classes.input} onChange={updateField('city')} style={getHorizontalInputStyles(75, false)} />
                        <TextField variant="outlined" label="E-mail" className={classes.input} onChange={updateField('email')} />
                        <TextField
                            variant="outlined"
                            label="Numer konta"
                            className={classes.input}
                            onChange={updateField('bankAccount')}
                            InputProps={{
                                endAdornment: (
                                       <InputAdornment position="end" className={classes.helper}>
                                           <Tooltip
                                               title="Numer konta na który przelejemy 1 gr"
                                               classes={{ tooltip: classes.tooltip }}
                                           >
                                               <Icon>help</Icon>
                                           </Tooltip>
                                       </InputAdornment>
                                   )
                            }}
                        />
                    </section>
                    <Typography variant="h5" className={classes.subtitle}>Sprzęt</Typography>
                    <section className={classes.formSection}>
                        <FormControl component="fieldset" className={classes.input}>
                            <RadioGroup name="deviceType" defaultValue={DeviceType.NOTEBOOK} className={classes.radios} onChange={updateField('deviceType')}>
                                <FormControlLabel control={<Radio />} label="Laptop" value={DeviceType.NOTEBOOK} className={classes.radio} />
                                <FormControlLabel control={<Radio />} label="Komputer stacjonarny" value={DeviceType.DESKTOP} className={classes.radio} />
                            </RadioGroup>
                        </FormControl>
                        {form.deviceType === DeviceType.NOTEBOOK && <TextField variant="outlined" label="Producent i model" className={classes.input} onChange={updateField('notebookName')} />}
                        <TextField
                            variant="outlined"
                            label="Pamięć RAM (GB)"
                            type="number"
                            className={classes.input}
                            onChange={updateField('ram')}
                            InputProps={{
                               endAdornment: (
                                   <InputAdornment position="end" className={classes.helper}>
                                       <Tooltip
                                           title="Pamięć ram znajdziesz klikając cntr alt delete następnie klikając wiecej wybierając zakładkę pamięc i podając liczbe max ram."
                                           classes={{ tooltip: classes.tooltip }}
                                       >
                                           <Icon>help</Icon>
                                       </Tooltip>
                                   </InputAdornment>
                               )
                            }}
                        />
                        <TextField
                            variant="outlined"
                            label="Pojemność dysku (GB)"
                            type="number"
                            className={classes.input}
                            onChange={updateField('hdd')}
                            InputProps={{
                               endAdornment: (
                                   <InputAdornment position="end" className={classes.helper}>
                                       <Tooltip
                                           title="Wielkość dysku znajdziesz wchodząc do Mój Komputer i klikając prawym przyciskiem myszy na dysku tam zobaczysz informacje na temat wielkości dysku."
                                           classes={{ tooltip: classes.tooltip }}
                                       >
                                           <Icon>help</Icon>
                                       </Tooltip>
                                   </InputAdornment>
                               )
                            }}
                        />
                        <TextField
                            variant="outlined"
                            label="Rozmiar ekranu (cale)"
                            type="number"
                            className={classes.input}
                            onChange={updateField('screenSize')}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end" className={classes.helper}>
                                        <Tooltip
                                            title="Jesli nie masz wiedzy na ten temat weź metr i zmierz po przekątnej 1 cal = 2,54 cm."
                                            classes={{ tooltip: classes.tooltip }}
                                        >
                                            <Icon>help</Icon>
                                        </Tooltip>
                                    </InputAdornment>
                                )
                            }}
                        />
                        {form.deviceType === DeviceType.DESKTOP && (
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
                    <section>
                        {/* Akceptacja RODO */}
                        <FormControl component="fieldset" className={classes.input} required>
                            <FormGroup>
                                <FormControlLabel control={ <Checkbox checked={form.rodo} onChange={updateField('rodo')} name="rodo" required />} label="Akceptuję RODO." />
                                <FormControlLabel control={ <Checkbox checked={form.rights} onChange={updateField('rights')} name="monitor" required />} label={(
                                    <>Akceptuję <Link to="/regulamin" className={classes.link} target="_blank">regulamin akcji <Icon className={classes.linkIcon}>launch</Icon></Link>.</>
                                )} />
                            </FormGroup>
                        </FormControl>
                        {/* Akceptacja Umowy */}
                    </section>
                    <section className={classes.actions}>
                        <Button variant="contained" type="submit" color="primary">Wyślij</Button>
                    </section>
                </form>
            )}
        </SubPage>
    );
}

export default SubmitDevicePage;
