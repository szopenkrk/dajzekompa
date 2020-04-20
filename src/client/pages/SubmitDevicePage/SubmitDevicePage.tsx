/* Libraries */
import React, { useState, useEffect } from 'react';
import { useSelector as reduxUseSelector, useDispatch as reduxUseDispatch, TypedUseSelectorHook } from 'react-redux';
import { makeStyles, Typography, TextField, FormControlLabel, Radio, FormControl, RadioGroup, FormGroup, Checkbox, FormLabel, Button, Icon, useTheme, TextFieldProps } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';

/* Models */
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { DevicePersonType, DeviceType, DeviceInput, DeviceInputType } from 'common/model/Device';
import { ReduxState } from 'client/model/Redux';

/* Application files */
import { ValidationResult, emptyModel, create, FormField, validateField, validateForm, getDeviceTypeLabel, getDeviceInputLabel } from 'client/lib/device';
import { add as addDevice, getTypes as getDeviceTypes, getTypeInputs as getDeviceTypeInputs } from 'client/actions/devices';
import LoadingOverlay from 'client/components/LoadingOverlay';
import PhotoUploader from 'client/components/PhotoUploader';
import ErrorBox from 'client/components/ErrorBox';
import TechSpecTooltip from 'client/components/TechSpecTooltip';
import SubPage from 'client/pages/SubPage';

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
    radioGroup: {
        width: '100%',
        margin: `${theme.spacing(1)}px 0`,
        '& > div': {
            flexDirection: 'row'
        },
        '& label': {
            flex: 1
        }
    },
    verticalRadioGroup: {
        width: '100%',
        textAlign: 'left'
    },
    subtitle: {
        padding: '20px 0'
    },
    input: {
        width: '100%',
        margin: `${theme.spacing(1)}px 0`,
        marginTop: 0
    },
    link: {
        color: theme.palette.primary.main,
        textDecoration: 'underline'
    },
    legend: {
        textAlign: 'left',
        paddingTop: 10
    },
    actions: {
        display: 'flex',
        justifyContent: 'flex-end',
        paddingTop: theme.spacing(2),
        paddingBottom: 10
    },
    message: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    messageTitle: {
        textAlign: 'center',
        paddingBottom: theme.spacing(2)
    },
    consents: {
        padding: `${theme.spacing(2)}px 0`,
        textAlign: 'left',
        '& label': {
            padding: `${theme.spacing(1)}px 0`,
            alignItems: 'start'
        }
    }
}));

const useSelector = reduxUseSelector as TypedUseSelectorHook<ReduxState>;
const useDispatch = () => reduxUseDispatch<ThunkDispatch<ReduxState, any, Action>>();

export function SubmitDevicePage () {
    const classes = useStyles();
    const theme = useTheme();
    const dispatch = useDispatch();

    const deviceTypes = useSelector((state) => state.deviceTypes.types);
    const deviceInputs = useSelector((state) => state.deviceTypes.inputs);

    const [ form, setForm ] = useState(emptyModel());
    const [ loading, setLoading ] = useState(false);
    const [ complete, setComplete ] = useState(false);
    const [ error, setError ] = useState('');
    const [ validation, setValidation ] = useState({} as ValidationResult);
    const [ pristine, setPristine ] = useState(create(true));

    const url = window.location.host;
    const inputs = form[FormField.DEVICE_TYPE] ? deviceInputs[form[FormField.DEVICE_TYPE].id] || [] : [];

    async function onSubmit (e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const validationResult = validateForm(form);
        const passed = Object.values(validationResult).every((error) => !error);

        if (!passed) {
            setValidation(validationResult);
            setError('Proszę poprawić błędy poniżej.');

            return;
        }

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

    function updateField (name: FormField) {
        return (e: React.ChangeEvent<HTMLInputElement>, value?: any) => {
            if (typeof value === 'undefined') value = e.target.value;
            if (!pristine[name]) validateSingleField(name, value);

            setForm({ ...form, [name]: value });
        };
    }

    function setDirty (name: FormField) {
        return () => {
            validateSingleField(name);
            if (!pristine[name]) return;

            setPristine({ ...pristine, [name]: false });
        };
    }

    function deviceTypeChange (e: React.ChangeEvent<any>, value: DeviceType) {
        updateField(FormField.DEVICE_TYPE)(e, value);

        if (value) dispatch(getDeviceTypeInputs(value.id));
    }

    function validateSingleField (name: FormField, value?: any) {
        const result = validateField(name, value || form[name], { form });

        setValidation({ ...validation, ...result });
    }

    function someConsentsNotAgreed () {
        return [
            !!validation[FormField.CONSENT_TERMS_AND_PRIVACY],
            !!validation[FormField.CONSENT_INFO_CLAUSE],
            !!validation[FormField.CONSENT_DATA_CLEANED]
        ].every(c => c);
    }

    function createInputElement (name: FormField, label: string, full: boolean = true, focus: boolean = false, style: CSSProperties = {}, props: TextFieldProps = {}) {
        return (
            <TextField
                {...props}
                variant="outlined"
                label={label}
                className={classes.input}
                onChange={updateField(name)}
                onBlur={setDirty(name)}
                value={form[name]}
                error={!!validation[name]}
                helperText={validation[name]}
                autoFocus={focus}
                fullWidth={full}
                style={style} />
        );
    }

    function createDeviceInput (input: DeviceInput, key: number) {
        switch (input.type) {
            case DeviceInputType.TEXT: return (
                <TextField
                    key={key}
                    variant="outlined"
                    label={getDeviceInputLabel(input.name)}
                    className={classes.input}
                    onChange={updateField(name)}
                    onBlur={setDirty(name)}
                    // value={form[name]}
                    // error={!!validation[name]}
                    // helperText={validation[name]}
                    fullWidth={true} />
            );
            case DeviceInputType.RADIO: return (
                <FormControl key={key} component="fieldset" className={classes.verticalRadioGroup}>
                    <FormLabel component="legend">{getDeviceInputLabel(input.name)}</FormLabel>
                    <RadioGroup name={FormField.PERSON_TYPE} defaultValue={input.options[0].id} onChange={updateField(FormField.PERSON_TYPE)}>
                        {input.options.map((option, index) => (
                            <FormControlLabel key={index} control={<Radio />} label={option.name} value={option.id} />
                        ))}
                    </RadioGroup>
                </FormControl>
            );
            default: return null;
        }
    }

    function resetForm () {
        setLoading(false);
        setComplete(false);
        setError('');
        setForm(emptyModel());
    }

    useEffect(() => {
        setLoading(true);

        dispatch(getDeviceTypes()).catch(() => {
            setError('Ups, coś poszło nie tak.');
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    return (
        <SubPage title="Podaruj kompa">
            {loading && (<LoadingOverlay />)}
            {error && (<ErrorBox>{error}</ErrorBox>)}
            {complete && !error && (
                <div className={classes.message}>
                    <Icon className={classes.icon}>check_circle</Icon>
                    <Typography variant="h5" className={classes.messageTitle}>Dziękujemy za zgłoszenie.</Typography>
                    <Typography variant="body1" className={classes.messageTitle}>Twój sprzęt zostanie zweryfikowany pod względem technicznym i wrócimy do Ciebie mailowo z informacją o kolejnych krokach.</Typography>
                    <Typography variant="body1" className={classes.messageTitle}>Dziękujemy w imieniu wszystkich potrzebujących komputerów dzieci i nauczycieli!</Typography>
                    <section className={classes.actions}>
                        <Button variant="contained" color="primary" onClick={resetForm}>Podaruj jeszcze jeden</Button>
                    </section>
                </div>
            )}
            {!complete && (
                <form onSubmit={onSubmit} noValidate autoComplete="off" className={classes.form}>
                    <section>
                        <FormControl component="fieldset" className={classes.radioGroup}>
                            <RadioGroup name={FormField.PERSON_TYPE} defaultValue={DevicePersonType.PERSON} onChange={updateField(FormField.PERSON_TYPE)}>
                                <FormControlLabel control={<Radio autoFocus />} label="Osoba prywatna" value={DevicePersonType.PERSON} />
                                <FormControlLabel control={<Radio />} label="Firma" value={DevicePersonType.COMPANY} />
                            </RadioGroup>
                        </FormControl>
                        {form[FormField.PERSON_TYPE] === DevicePersonType.COMPANY && createInputElement(FormField.COMPANY_NAME, 'Nazwa firmy')}
                        {form[FormField.PERSON_TYPE] === DevicePersonType.COMPANY && createInputElement(FormField.NIP, 'NIP')}
                        {createInputElement(FormField.FIRST_NAME, 'Imię')}
                        {createInputElement(FormField.LAST_NAME, 'Nazwisko')}
                        {createInputElement(FormField.EMAIL, 'E-mail')}
                        {createInputElement(FormField.STREET, 'Ulica', true, false, getHorizontalInputStyles(75, true))}
                        {createInputElement(FormField.STREET_NUMBER, 'Numer', true, false, getHorizontalInputStyles(25, false))}
                        {createInputElement(FormField.POSTCODE, 'Kod pocztowy', true, false, getHorizontalInputStyles(35, true))}
                        {createInputElement(FormField.CITY, 'Miejscowość', true, false, getHorizontalInputStyles(65, false))}
                        {createInputElement(FormField.BANK_ACCOUNT, 'Numer konta')}
                    </section>
                    <Typography variant="h5" className={classes.subtitle}>Urządzenie</Typography>
                    <section>
                        <Autocomplete options={deviceTypes} getOptionLabel={(option) => getDeviceTypeLabel(option.name)} onChange={deviceTypeChange} onBlur={setDirty(FormField.DEVICE_TYPE)} value={form[FormField.DEVICE_TYPE]} renderInput={(props) => (
                            <TextField
                                {...props}
                                variant="outlined"
                                label="Typ urządzenia"
                                className={classes.input}
                                error={!!validation[FormField.DEVICE_TYPE]}
                                helperText={validation[FormField.DEVICE_TYPE]}
                                fullWidth
                            />
                        )} />
                        {
                            inputs.map((input, index) => (
                                createDeviceInput(input, index)
                            ))
                        }
                        <TechSpecTooltip>
                            <Typography variant="body2" style={{ textAlign: 'left' }}>Jak sprawdzić paremetry sprzętu?</Typography>
                        </TechSpecTooltip>
                    </section>
                    <Typography variant="h5" className={classes.subtitle}>Zdjęcia sprzętu</Typography>
                    <section>
                        <PhotoUploader onChange={updateField(FormField.PHOTOS)} mime={['image/jpeg', 'image/png', 'image/bmp']} maxSize={3145728} />
                    </section>
                    <Typography variant="h5" className={classes.subtitle}>Dodatkowe informacje</Typography>
                    <section>
                        <TextField variant="outlined" label="Dodatkowe informacje i komentarze" className={classes.input} onChange={updateField(FormField.COMMENTS)} multiline rows={3} />
                    </section>
                    <section style={{ marginTop: theme.spacing(2) }}>
                        <FormControl className={classes.consents} error={someConsentsNotAgreed()}>
                            <FormLabel component="legend">* - obowiązkowe</FormLabel>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox checked={form[FormField.CONSENT_TERMS_AND_PRIVACY]} onChange={updateField(FormField.CONSENT_TERMS_AND_PRIVACY)} />} label={(
                                    <>
                                        * Zapoznałam/em się i akceptuję <Link to="/regulamin" className={classes.link} target="_blank" rel="noopener norefferer">Regulamin Akcji „Dajże Kompa”</Link> oraz <Link to="/rodo" className={classes.link} target="_blank" rel="noopener norefferer">Politykę Prywatności</Link>.
                                    </>
                                )} />
                                <FormControlLabel control={<Checkbox checked={form[FormField.CONSENT_INFO_CLAUSE]} onChange={updateField(FormField.CONSENT_INFO_CLAUSE)} />} label={(
                                    <>
                                        * Przyjmuję do wiadomości, że Administratorem moich danych osobowych jest Fundacja Poland Business Run z siedzibą ul. Henryka Siemiradzkiego 17/2, 31-137 Kraków. Dane osobowe będą przetwarzane przede wszystkim w celu przekazania darowizny. Szczegółowe informacje dotyczące przetwarzania danych znajdują się <Link to="/klauzula" className={classes.link} target="_blank" rel="noopener norefferer">tutaj</Link>.
                                    </>
                                )} />
                                <FormControlLabel control={<Checkbox checked={form[FormField.CONSENT_DATA_CLEANED]} onChange={updateField(FormField.CONSENT_DATA_CLEANED)} />} label={(
                                    <>
                                        * Oświadczam, że przekazany przeze mnie sprzęt jest wyczyszczony z wszelkich danych osobowych oraz danych firmowych.
                                    </>
                                )} />
                                <FormControlLabel control={<Checkbox checked={form[FormField.CONSENT_PUBLIC_LIST]} onChange={updateField(FormField.CONSENT_PUBLIC_LIST)} />} label={(
                                    <>
                                        Wyrażam zgodę na zamieszczenie moich danych osobowych w postaci imienia i nazwiska lub nazwy firmy, na liście darczyńców biorących udział w Akcji, na stronie {url}.
                                    </>
                                )} />
                            </FormGroup>
                        </FormControl>
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
