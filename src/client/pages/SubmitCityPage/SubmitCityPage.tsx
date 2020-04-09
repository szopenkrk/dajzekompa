/* Libraries */
import React from 'react';
import clx from 'classnames';
import { makeStyles, Typography, useTheme, useMediaQuery } from '@material-ui/core';
import flowDesktop from 'client/assets/images/zglos-miasto-infografika-desktop.jpg';
import flowMobile from 'client/assets/images/parties-flow-mobile.png';

const useStyles = makeStyles((theme) => ({
    section: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    image: {
        width: '100%',
        paddingBottom: 40,
        [theme.breakpoints.down('sm')]: {
            width: 245,
            maxWidth: '100%'
        }
    },
    container: {
        width: 940,
        maxWidth: 'calc(100% - 20px)'
    },
    hero: {
        backgroundColor: '#f8f8f8',
        padding: '71px 0'
    },
    wrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            alignItems: 'center'
        }
    },
    half: {
        maxWidth: '100%'
    },
    title: {
        fontWeight: 900,
        padding: '14px 0'
    },
    description: {
        padding: '22px 0',
        width: 538,
        lineHeight: 1.33,
        maxWidth: '100%'
    },
    linkButton: {
        backgroundColor: 'transparent'
    },
    separator: {
        width: 538,
        margin: '28px 0'
    },
    actions: {
        display: 'flex',
        marginTop: 25,
        '& > *': {
            margin: theme.spacing(1),
        },
        [theme.breakpoints.down('sm')]: {
            justifyContent: 'center'
        }
    }
}));
export function SubmitCityPage () {
    const classes = useStyles();
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down('xs'));

    return (
        <section className={clx(classes.section, classes.hero)}>
            <div className={clx(classes.container, classes.wrapper)}>
                <div className={classes.half}>
                    <Typography variant="h2" className={classes.title}>Zgłoś Miasto</Typography>
                    <Typography variant="subtitle1" className={classes.description}>
                        Akcja #DajżeKompa urodziła się w Krakowie, jednak bardzo chcemy, by swoim zasięgiem objęła inne części kraju. Szukamy osób, które będą skłonne poświęcić swój czas, by pomagać innym.

                        <p>Jeśli jesteś gotowy podjąć się działania w Twoim mieście: </p>
                        <ol>
                          <li>Zbierz ekipę:</li>
                            <ol>
                                <li><b>Project Managerów</b> odpowiedzialnych za zarządzanie akcją</li>
                                <li>Osoby/firmy, które będą odpowiadały za serwis sprzętu</li>
                                <li>Firmę/ludzi, którzy zapewnią logistykę, czyli dostarczą paczki</li>
                                <li>Lokalne wsparcie marketingowe i PR-owe</li>
                            </ol>
                          <li>Zaangażuj niezbędne organy w Twoim urzędzie miasta - wydział edukacji i komunikacji</li>
                          <li>Następnie skontaktuj się z Fundacją Poland Business Run: dajzekompa@polandbusinessrun.pl</li>
                        </ol>
                        <img src={mobile ? flowMobile : flowDesktop} className={classes.image} />
                        <p>
                            <b>Co zapewniamy?</b>
                            <ol>
                                <li>Stronę i system do obsługi projektu</li>
                                <li>Podstawy prawne</li>
                                <li>Know how i doradztwo jak rozkręcić akcję</li>
                                <li>Materiały PR-owe i marketingowe</li>
                                <li>Satysfakcję z zaangażowania w dobrą sprawę</li>
                            </ol>
                        </p>
                    </Typography>
                </div>
            </div>
        </section>
    );
}

export default SubmitCityPage;
