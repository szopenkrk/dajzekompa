/* Libraries */
import React, { useState } from 'react';
import { useDispatch as reduxUseDispatch } from 'react-redux';

/* Models */
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { Receiver } from 'common/model/Receiver';
import { ReduxState } from 'client/model/Redux';
import { ReceiverForm } from 'client/model/Form';

/* Application files */
import { add as addReceiver } from 'client/actions/receivers';
import { TextField, makeStyles, useTheme, Button } from '@material-ui/core';
import LoadingOverlay from '../LoadingOverlay';
import ErrorBox from '../ErrorBox';

type Props = {
    onComplete?: (receiver: Receiver) => void;
};

const useDispatch = () => reduxUseDispatch<ThunkDispatch<ReduxState, any, Action>>();

const formModel = {
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    streetNumber: '',
    city: '',
    postcode: '',
    paczkomat: '',
} as ReceiverForm;

const useStyles = makeStyles((theme) => ({
    form: {
        paddingTop: theme.spacing(1)
    },
    input: {
        margin: `${theme.spacing(1)}px 0`,
        marginTop: 0
    }
}));

export function ReceiverAdd ({ onComplete }: Props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const theme = useTheme();
    const [ form, setForm ] = useState({ ...formModel });
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState('');

    async function onSubmit (e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setError('');
        setLoading(true);

        try {
            const receiver = await dispatch(addReceiver(form));

            if (onComplete) return onComplete(receiver);
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

    return (
        <>
            {error && <ErrorBox>{error}</ErrorBox>}
            {loading && <LoadingOverlay />}
            <form onSubmit={onSubmit} className={classes.form}>
                <TextField variant="outlined" label="Imię" className={classes.input} onChange={updateField('firstName')} fullWidth autoFocus />
                <TextField variant="outlined" label="Nazwisko" className={classes.input} onChange={updateField('lastName')} fullWidth />
                <TextField variant="outlined" label="E-mail" className={classes.input} onChange={updateField('email')} fullWidth />
                <TextField variant="outlined" label="Ulica" className={classes.input} onChange={updateField('street')} style={getHorizontalInputStyles(75, true)} />
                <TextField variant="outlined" label="Numer" className={classes.input} onChange={updateField('streetNumber')} style={getHorizontalInputStyles(25, false)} />
                <TextField variant="outlined" label="Kod pocztowy" className={classes.input} onChange={updateField('postcode')} style={getHorizontalInputStyles(35, true)} />
                <TextField variant="outlined" label="Miejscowość" className={classes.input} onChange={updateField('city')} style={getHorizontalInputStyles(65, false)} />
                {/*TODO*/}
                {/* Jaka szkołą -> pobranie listy szkół jeśli ktoś wybierze szkoła prywatna to leci alert szkoła prywatna nie wchodzi do programu */}
                {/*lista paczkomatów pobierana z jsona/csv dostarczonego od inpost*!/*/}
                <TextField variant="outlined" label="Adres Paczkomatu" className={classes.input} onChange={updateField('paczkomat')} style={getHorizontalInputStyles(65, false)} />
                <Button variant="contained" color="primary" type="submit" fullWidth>Dodaj</Button>
            </form>
        </>
    );
}

export default ReceiverAdd;
