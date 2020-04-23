/* Libraries */
import React, { useState } from 'react';
import { makeStyles, useTheme, Typography, FormControl, RadioGroup, FormControlLabel, Radio, TextField, TextFieldProps, Checkbox, FormLabel, FormGroup, Button } from '@material-ui/core';
import { useDispatch as reduxUseDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

/* Models */
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { Device, DevicePersonType, DeviceType, DeviceInputRequest } from 'common/model/Device';
import { ReduxState } from 'client/model/Redux';

/* Application files */
import Config from 'client/lib/config';
import { add as addDevice, update as updateDevice } from 'client/actions/devices';
import { FormField, ValidationResult, empty as emptyModel, validateForm, validateField, create } from 'client/lib/device';
import LoadingOverlay from 'client/components/LoadingOverlay';
import ErrorBox from 'client/components/ErrorBox';
import PhotoUploader from 'client/components/PhotoUploader';
import DeviceInfoForm from 'client/components/DeviceInfoForm';

type Props = {
    onComplete?: (device: Device) => void;
    device?: Device;
    noConsents?: boolean;
    buttonLabel?: string;
};

const useDispatch = () => reduxUseDispatch<ThunkDispatch<ReduxState, any, Action>>();

const useStyles = makeStyles((theme) => ({
    form: {
        paddingTop: theme.spacing(1)
    },
    title: {
        width: '100%',
        textAlign: 'center',
        padding: `${theme.spacing(2)}px 0`
    },
    input: {
        margin: `${theme.spacing(1)}px 0`,
        marginTop: 0
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
    link: {
        color: theme.palette.primary.main,
        textDecoration: 'underline'
    },
    consents: {
        padding: `${theme.spacing(2)}px 0`,
        '& label': {
            padding: `${theme.spacing(1)}px 0`,
            alignItems: 'start'
        }
    }
}));

export function DeviceUpsert ({ onComplete, device, noConsents, buttonLabel }: Props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const theme = useTheme();

    const [ form, setForm ] = useState(emptyModel());
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState('');
    const [ validation, setValidation ] = useState({} as ValidationResult);
    const [ pristine, setPristine ] = useState(create(true));

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
            const result = await dispatch(device ? updateDevice(device.id, form) : addDevice(form));

            if (onComplete) return onComplete(result);
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

    function validateSingleField (name: FormField, value?: any) {
        const result = validateField(name, value || form[name], { form });

        setValidation({ ...validation, ...result });
    }

    function updateField (name: FormField) {
        return (e: React.ChangeEvent<HTMLInputElement | any>, value?: any) => {
            if (typeof value === 'undefined') value = e.target.value;
            if (!pristine[name]) validateSingleField(name, value);

            setForm({  ...form, [name]: value });
        };
    }

    function onInputsChange (type: DeviceType, inputs: DeviceInputRequest[]) {
        updateField(FormField.DEVICE_TYPE)(null, type);
        updateField(FormField.INPUTS)(null, inputs);
    }

    function setDirty (name: FormField) {
        return () => {
            validateSingleField(name);
            if (!pristine[name]) return;

            setPristine({ ...pristine, [name]: false });
        };
    }

    function someConsentsNotAgreed () {
        return [
            !!validation[FormField.CONSENT_TERMS_AND_PRIVACY],
            !!validation[FormField.CONSENT_INFO_CLAUSE],
            !!validation[FormField.CONSENT_DATA_CLEANED]
        ].every(c => c);
    }

    function onError (error: string) {
        setError(error);
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

    return (
        <>
            {error && <ErrorBox>{error}</ErrorBox>}
            {loading && <LoadingOverlay />}
            <form onSubmit={onSubmit} className={classes.form} autoComplete="off">
                <Typography variant="h5" className={classes.title}>Dane osobowe</Typography>
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
                <Typography variant="h5" className={classes.title}>Urządzenie</Typography>
                <DeviceInfoForm onChange={onInputsChange} onError={onError} />
                <Typography variant="h5" className={classes.title}>Zdjęcia urządzenia</Typography>
                <PhotoUploader onChange={updateField(FormField.PHOTOS)} mime={['image/jpeg', 'image/png', 'image/bmp']} maxSize={3145728} />
                <Typography variant="h5" className={classes.title}>Dodatkowe informacje</Typography>
                <TextField variant="outlined" label="Dodatkowe informacje i komentarze" className={classes.input} onChange={updateField(FormField.COMMENTS)} multiline rows={3} fullWidth={true} />
                {!noConsents && (
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
                                    Wyrażam zgodę na zamieszczenie moich danych osobowych w postaci imienia i nazwiska lub nazwy firmy, na liście darczyńców biorących udział w Akcji, na stronie {Config.APP_URL}.
                                </>
                            )} />
                        </FormGroup>
                    </FormControl>
                )}
                <Button variant="contained" color="primary" type="submit" fullWidth>{buttonLabel || (device ? 'Zaktualizuj' : 'Dodaj')}</Button>
            </form>
        </>
    );
}

export default DeviceUpsert;
