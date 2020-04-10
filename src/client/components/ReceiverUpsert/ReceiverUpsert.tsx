/* Libraries */
import React, { useState, useEffect } from 'react';
import { useSelector as reduxUseSelector, useDispatch as reduxUseDispatch, TypedUseSelectorHook } from 'react-redux';
import { TextField, makeStyles, useTheme, Button, TextFieldProps, FormControl, RadioGroup, FormControlLabel, Radio, FormGroup, Checkbox, FormLabel } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { Link } from 'react-router-dom';

/* Models */
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { Receiver, ReceiverPersonType } from 'common/model/Receiver';
// import { Locker } from 'common/model/Locker';
import { ReduxState } from 'client/model/Redux';
// import { ReceiverForm } from 'client/model/Form';

/* Application files */
import { add as addReceiver, update as updateReceiver } from 'client/actions/receivers';
import { list as listLockers } from 'client/actions/lockers';
import { list as listSchools } from 'client/actions/schools';
import LoadingOverlay from 'client/components/LoadingOverlay';
import ErrorBox from 'client/components/ErrorBox';
import { FormField, ValidationResult, emptyModel, validateForm, validateField, create, desanitize } from 'client/lib/receiver';

type Props = {
    onComplete?: (receiver: Receiver) => void;
    receiver?: Receiver;
    noConsents?: boolean;
};

const useSelector = reduxUseSelector as TypedUseSelectorHook<ReduxState>;
const useDispatch = () => reduxUseDispatch<ThunkDispatch<ReduxState, any, Action>>();

const useStyles = makeStyles((theme) => ({
    form: {
        paddingTop: theme.spacing(1)
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

export function ReceiverUpsert ({ onComplete, receiver, noConsents }: Props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const theme = useTheme();

    const lockers = useSelector((state) => state.lockers) || [];
    const schools = useSelector((state) => state.schools);

    const [ form, setForm ] = useState(emptyModel());
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState('');
    const [ validation, setValidation ] = useState({} as ValidationResult);
    const [ pristine, setPristine ] = useState(create(true));

    if (receiver && !form.locker) {
        const locker = lockers.find((l) => l.id === receiver.locker);

        if (locker) {
            const base = desanitize(receiver, lockers);
            const model = emptyModel({
                ...base,
                ...(noConsents ? {
                    consentTap: true,
                    consentInfc: true,
                    consentSchv: true,
                    consentCrtr: true
                } : {})
            });

            setForm(model);
        }
    }

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
            const result = await dispatch(receiver ? updateReceiver(receiver.id, form) : addReceiver(form));

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

    function setDirty (name: FormField) {
        return () => {
            validateSingleField(name);
            if (!pristine[name]) return;

            setPristine({ ...pristine, [name]: false });
        };
    }

    function createInputElement (name: FormField, label: string, full: boolean, focus: boolean, style: CSSProperties = {}, props: TextFieldProps = {}) {
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

    function someConsentsNotAgreed () {
        return [
            !!validation[FormField.CONSENT_TERMS_AND_PRIVACY],
            !!validation[FormField.CONSENT_INFO_CLAUSE],
            !!validation[FormField.CONSENT_INFO_CLAUSE],
            !!validation[FormField.CONSENT_CARETAKER]
        ].every(c => c);
    }

    useEffect(() => {
        setLoading(true);

        Promise.all([ dispatch(listLockers()), dispatch(listSchools()) ]).catch(() => {
            setError('Ups, coś poszło nie tak!');
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    return (
        <>
            {error && <ErrorBox>{error}</ErrorBox>}
            {loading && <LoadingOverlay />}
            <form onSubmit={onSubmit} className={classes.form}>
                <FormControl component="fieldset" className={classes.radioGroup}>
                    <RadioGroup name={FormField.PERSON_TYPE} defaultValue={ReceiverPersonType.STUDENT} onChange={updateField(FormField.PERSON_TYPE)}>
                        <FormControlLabel control={<Radio autoFocus />} label="Uczeń" value={ReceiverPersonType.STUDENT} />
                        <FormControlLabel control={<Radio />} label="Nauczyciel" value={ReceiverPersonType.TEACHER} />
                    </RadioGroup>
                </FormControl>
                <Autocomplete options={schools} getOptionLabel={(option) => option} onChange={updateField(FormField.SCHOOL)} onBlur={setDirty(FormField.SCHOOL)} value={form.school} renderInput={(props) => (
                    <TextField
                        {...props}
                        variant="outlined"
                        label="Nazwa szkoły"
                        className={classes.input}
                        error={!!validation[FormField.SCHOOL]}
                        helperText={validation[FormField.SCHOOL]}
                        fullWidth
                    />
                )} />
                {form[FormField.PERSON_TYPE] === ReceiverPersonType.STUDENT && createInputElement(FormField.SCHOOL_GRADE, 'Klasa', true, false)}
                {createInputElement(FormField.FIRST_NAME, 'Imię', true, false)}
                {createInputElement(FormField.LAST_NAME, 'Nazwisko', true, false)}
                {createInputElement(FormField.EMAIL, 'E-mail', true, false)}
                {createInputElement(FormField.PHONE, 'Numer telefonu', true, false)}
                {createInputElement(FormField.STREET, 'Ulica', true, false, getHorizontalInputStyles(75, true))}
                {createInputElement(FormField.STREET_NUMBER, 'Numer', true, false, getHorizontalInputStyles(25, false))}
                {createInputElement(FormField.POSTCODE, 'Kod pocztowy', true, false, getHorizontalInputStyles(35, true))}
                {createInputElement(FormField.CITY, 'Miejscowość', true, false, getHorizontalInputStyles(65, false))}
                <Autocomplete options={lockers} getOptionLabel={(option) => option.label} onChange={updateField(FormField.LOCKER)} onBlur={setDirty(FormField.LOCKER)} value={form.locker} renderInput={(props) => (
                    <TextField
                        {...props}
                        variant="outlined"
                        label="Paczkomat"
                        className={classes.input}
                        error={!!validation[FormField.LOCKER]}
                        helperText={validation[FormField.LOCKER]}
                        fullWidth
                    />
                )} />
                {!noConsents && (
                    <FormControl className={classes.consents} error={someConsentsNotAgreed()}>
                        <FormLabel component="legend">Wymagane zgody:</FormLabel>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox checked={form[FormField.CONSENT_TERMS_AND_PRIVACY]} onChange={updateField(FormField.CONSENT_TERMS_AND_PRIVACY)} />} label={(
                                <>
                                    Zapoznałam/em się i akceptuję <Link to="/regulamin" className={classes.link} target="_blank" rel="noopener norefferer">Regulamin Akcji „Dajże Kompa”</Link> oraz <Link to="/rodo" className={classes.link} target="_blank" rel="noopener norefferer">Politykę Prywatności</Link>. *
                                </>
                            )} />
                            <FormControlLabel control={<Checkbox checked={form[FormField.CONSENT_INFO_CLAUSE]} onChange={updateField(FormField.CONSENT_INFO_CLAUSE)} />} label={(
                                <>
                                    Przyjmuję do wiadomości, że Administratorem moich danych osobowych jest Fundacja Poland Business Run z siedzibą ul. Henryka Siemiradzkiego 17/2, 31-137 Kraków. Dane osobowe będą przetwarzane przede wszystkim w celu otrzymania darowizny. Szczegółowe informacje dotyczące przetwarzania danych znajdują się <Link to="/klauzula" className={classes.link} target="_blank" rel="noopener norefferer">tutaj</Link>. *
                                </>
                            )} />
                            <FormControlLabel control={<Checkbox checked={form[FormField.CONSENT_SCHOOL_VERIFICATION]} onChange={updateField(FormField.CONSENT_SCHOOL_VERIFICATION)} />} label={(
                                <>
                                    Wyrażam zgodę na weryfikację mojego zgłoszenia u właściwego dyrektora szkoły, w celu potwierdzenia czy przysługuje mi sprzęt zgodnie z regulaminem Akcji  „Dajże Kompa”. *
                                </>
                            )} />
                            <FormControlLabel control={<Checkbox checked={form[FormField.CONSENT_CARETAKER]} onChange={updateField(FormField.CONSENT_CARETAKER)} />} label={(
                                <>
                                    Oświadczam, że jestem opiekunem prawnym/rodzicem dziecka, którego dane zostały przeze mnie podane w formularzu. *
                                </>
                            )} />
                        </FormGroup>
                    </FormControl>
                )}
                <Button variant="contained" color="primary" type="submit" fullWidth>{receiver ? 'Zaktualizuj' : 'Dodaj'}</Button>
            </form>
        </>
    );
}

export default ReceiverUpsert;
