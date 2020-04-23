/* Libraries */
import React, { useState } from 'react';
import { makeStyles, Typography, Button, Icon, useTheme, useMediaQuery } from '@material-ui/core';

/* Application files */
import SubPage from 'client/pages/SubPage';
import Separator from 'client/components/Separator';
import ReceiverUpsert from "client/components/ReceiverUpsert";
import { Link } from 'react-router-dom';

import flowImageDesktop from 'client/assets/images/faq-receivers-desktop.png';
import flowImageMobile from 'client/assets/images/faq-receivers-mobile.png';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    panel: {
        margin: '20px 0'
    },
    panelTitle: {
        fontWeight: 700
    },
    button: {
        marginTop: 20
    },
    list: {
        paddingLeft: 18,
        margin: 0,
        fontFamily: 'Roboto'
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
    link: {
        color: theme.palette.primary.main
    },
    separator: {
        margin: `${theme.spacing(3)}px 0`
    },
    footer: {
        width: '100%'
    }
}));

export function SubmitNeedPage () {
    const classes = useStyles();
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down('xs'));

    const [ complete, setComplete ] = useState(false);

    function finish () {
        setComplete(true);
    }

    function reset () {
        setComplete(false);
    }

    return (
        <SubPage title="Zgłoś potrzebę">
            <section className={classes.container}>
                <img src={mobile ? flowImageMobile : flowImageDesktop} />
                {complete && (
                    <div className={classes.message}>
                        <Icon className={classes.icon}>check_circle</Icon>
                        <Typography variant="h5" className={classes.messageTitle}>Dziękujemy!</Typography>
                        <Typography variant="body1" className={classes.messageTitle}>Twoje zgłoszenie zostało wysłane. Poinformujemy Cię o dalszych krokach.</Typography>
                        <section className={classes.actions}>
                            <Button variant="contained" color="primary" onClick={reset}>Zgłoś kolejną osobę</Button>
                        </section>
                    </div>
                )}
                {!complete && <ReceiverUpsert onComplete={finish} buttonLabel="Wyślij" />}
                <Separator className={classes.separator} />
                <div className={classes.footer}>
                    <Typography variant="body1" className={classes.panelTitle}>Masz pytania?</Typography>
                    <Typography variant="body1">Zajrzyj do działu <Link to="/faq" className={classes.link}>FAQ</Link>.</Typography>
                </div>
            </section>
        </SubPage>
    );
}

export default SubmitNeedPage;
