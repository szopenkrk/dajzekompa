/* Libraries */
import React, { useState } from 'react';
import { makeStyles, Typography, Button, Icon } from '@material-ui/core';

/* Application files */
import SubPage from 'client/pages/SubPage';
import DeviceUpsert from 'client/components/DeviceUpsert';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    icon: {
        fontSize: 70,
        color: '#00b848',
        marginBottom: 20
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
}));

export function SubmitDevicePage () {
    const classes = useStyles();

    const [ complete, setComplete ] = useState(false);

    function finish () {
        setComplete(true);
    }

    function reset () {
        setComplete(false);
    }

    return (
        <SubPage title="Podaruj kompa">
            <section className={classes.container}>
                {complete && (
                    <div className={classes.message}>
                        <Icon className={classes.icon}>check_circle</Icon>
                        <Typography variant="h5" className={classes.messageTitle}>Dziękujemy za zgłoszenie.</Typography>
                        <Typography variant="body1" className={classes.messageTitle}>Twój sprzęt zostanie zweryfikowany pod względem technicznym i wrócimy do Ciebie mailowo z informacją o kolejnych krokach.</Typography>
                        <Typography variant="body1" className={classes.messageTitle}>Dziękujemy w imieniu wszystkich potrzebujących komputerów dzieci i nauczycieli!</Typography>
                        <section className={classes.actions}>
                            <Button variant="contained" color="primary" onClick={reset}>Podaruj jeszcze jeden</Button>
                        </section>
                    </div>
                )}
                {!complete && <DeviceUpsert onComplete={finish} buttonLabel="Wyślij" />}
            </section>
        </SubPage>
    );
}

export default SubmitDevicePage;
