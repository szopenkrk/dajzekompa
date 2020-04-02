/* Libraries */
import React, { useState } from 'react';
import { makeStyles, Paper, Button, TextField } from '@material-ui/core';

/* Models */
import { StateUser } from 'client/model/Redux';
import LoadingOverlay from '../LoadingOverlay';

type Props = {
    onSignIn: (email: string, password: string) => Promise<StateUser>;
};

enum FieldName {
    EMAIL = 'email',
    PASSWORD = 'password'
}

const useStyles = makeStyles((theme) => ({
    container: {
        width: 580,
        margin: '0 10px',
        padding: theme.spacing(2),
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            margin: 0
        }
    },
    button: {
        marginTop: theme.spacing(2)
    }
}));

export function SignIn (props: Props) {
    const classes = useStyles();
    const [ loading, setLoading ] = useState(false);
    const [ fields, setFields ] = useState({
        [FieldName.EMAIL]: '',
        [FieldName.PASSWORD]: ''
    });

    async function onSubmit (e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setLoading(true);

        try {
            await props.onSignIn(fields[FieldName.EMAIL], fields[FieldName.PASSWORD]);
        } catch (error) {
            setLoading(false);
        }
    }

    function updateField (name: FieldName) {
        return (e: React.ChangeEvent<HTMLInputElement>) => {
            setFields({
                ...fields,
                [name]: e.target.value
            });
        };
    }

    if (loading) return <LoadingOverlay />;

    return (
        <Paper className={classes.container}>
            <form onSubmit={onSubmit}>
                <TextField
                    variant="outlined"
                    type="text"
                    label="E-mail"
                    fullWidth={true}
                    margin="normal"
                    onChange={updateField(FieldName.EMAIL)} />
                <TextField
                    variant="outlined"
                    type="password"
                    label="Hasło"
                    fullWidth={true}
                    margin="normal"
                    onChange={updateField(FieldName.PASSWORD)} />
                <Button type="submit" variant="contained" color="primary" fullWidth={true} className={classes.button}>Zaloguj się</Button>
            </form>
        </Paper>
    );
}

export default SignIn;
