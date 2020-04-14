/* Libraries */
import React from 'react';
import { Typography, useTheme, useMediaQuery, makeStyles } from '@material-ui/core';

/* Application files */
import Config from 'client/lib/config';
import SubPage from 'client/pages/SubPage';
import Separator from 'client/components/Separator';
import imageDesktop from 'client/assets/images/faq-cities-desktop.png';
import imageMobile from 'client/assets/images/faq-cities-mobile.png';

const useStyles = makeStyles((theme) => ({
    content: {
        fontFamily: 'Roboto',
        lineHeight: 1.5,
        letterSpacing: '0.00938em'
    },
    letteredList: {
        listStyleType: 'lower-alpha'
    },
    image: {
        maxWidth: '100%',
        paddingTop: theme.spacing(3)
    },
    separator: {
        margin: `${theme.spacing(2)}px 0`
    },
    link: {
        color: theme.palette.primary.main
    }
}));

export function SubmitCityPage () {
    const classes = useStyles();
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down('xs'));
    const mail = Config.CONTACT_EMAIL;

    return (
        <SubPage title="Zgłoś miasto">
            <section className={classes.content}>
                <Typography variant="body1">
                    Akcja #DajżeKompa urodziła się w Krakowie, jednak bardzo chcemy, by swoim zasięgiem objęła inne części kraju. Szukamy osób, które będą skłonne poświęcić swój czas, by pomagać innym.
                </Typography>
                <br />
                <Typography variant="body1">
                    Jeśli jesteś gotowy podjąć się działania w Twoim mieście:
                </Typography>
                <img src={mobile ? imageMobile : imageDesktop} className={classes.image} />
                <ol>
                    <li>
                        Zbierz ekipę:
                        <ol className={classes.letteredList}>
                            <li><b>Project Managerów</b> odpowiedzialnych za zarządzanie akcją</li>
                            <li>Osoby/firmy, które będą odpowiadały za <b>serwis</b> sprzętu</li>
                            <li>Firmę/ludzi, którzy zapewnią <b>logistykę</b>, czyli dostarczą paczki</li>
                            <li>Lokalne wsparcie <b>marketingowe i PR-owe</b></li>
                        </ol>
                    </li>
                    <li>Zaangażuj <b>niezbędne organy w Twoim urzędzie miasta</b> np. wydział edukacji lub komunikacji</li>
                    <li>Następnie skontaktuj się z <b>Fundacją Poland Business Run</b>: <a href={`mailto:${mail}`} className={classes.link}>{mail}</a></li>
                </ol>
                <Separator className={classes.separator} />
                <Typography variant="body1"><b>Co zapewniamy?</b></Typography>
                <ol>
                    <li>Stronę i system do obsługi projektu</li>
                    <li>Podstawy prawne, w tym wzory dokumentów</li>
                    <li>Know how i doradztwo jak rozkręcić akcję</li>
                    <li>Materiały PR-owe i marketingowe</li>
                    <li>Satysfakcję z zaangażowania w dobrą sprawę</li>
                </ol>
            </section>
        </SubPage>
    );
}

export default SubmitCityPage;
