/* Libraries */
import React, { useState, useEffect } from 'react';
import { useSelector as reduxUseSelector, useDispatch as reduxUseDispatch, TypedUseSelectorHook } from 'react-redux';
import { TextField, makeStyles, useTheme, Button, TextFieldProps } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

/* Models */
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { Receiver } from 'common/model/Receiver';
// import { Locker } from 'common/model/Locker';
import { ReduxState } from 'client/model/Redux';
// import { ReceiverForm } from 'client/model/Form';

/* Application files */
import { add as addReceiver, update as updateReceiver } from 'client/actions/receivers';
import { list as listLockers } from 'client/actions/lockers';
import { list as listSchools } from 'client/actions/schools';
import LoadingOverlay from 'client/components/LoadingOverlay';
import ErrorBox from 'client/components/ErrorBox';
import { FormField, ValidationResult, emptyModel, validateForm, validateField, create } from 'client/lib/receiver';

type Props = {
    onComplete?: (receiver: Receiver) => void;
    receiver?: Receiver;
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
    }
}));

export function ReceiverUpsert ({ onComplete, receiver }: Props) {
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

        if (locker) setForm(emptyModel({ ...receiver, locker }));
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
        const result = validateField(name, value || form[name]);

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
                <Autocomplete options={schools} getOptionLabel={(option) => option} onChange={updateField(FormField.SCHOOL)} onBlur={setDirty(FormField.SCHOOL)} value={form.school} renderInput={(props) => (
                    <TextField
                        {...props}
                        variant="outlined"
                        label="Nazwa szkoły"
                        className={classes.input}
                        error={!!validation[FormField.SCHOOL]}
                        helperText={validation[FormField.SCHOOL]}
                        autoFocus
                        fullWidth
                    />
                )} />
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
                <Button variant="contained" color="primary" type="submit" fullWidth>{receiver ? 'Zaktualizuj' : 'Dodaj'}</Button>
            </form>
        </>
    );
}

export default ReceiverUpsert;
