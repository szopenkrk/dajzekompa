/* Libraries */
import React from 'react';
import clx from 'classnames';
import { makeStyles, Typography } from '@material-ui/core';

/* Application files */
import ProgramSummary from 'client/components/ProgramSummary';
import Separator from 'client/components/Separator';

const useStyles = makeStyles((theme) => ({
    section: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
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
        paddingTop: theme.spacing(3),
        width: 538,
        lineHeight: 1.33,
        maxWidth: '100%',
        '&:last-of-type': {
            paddingBottom: theme.spacing(3)
        }
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

export function HeroBanner () {
    const classes = useStyles();

    return (
        <section className={clx(classes.section, classes.hero)}>
            <div className={clx(classes.container, classes.wrapper)}>
                <div className={classes.half}>
                    <Typography variant="h4" className={classes.title}>AKCJA #DAJŻEKOMPA ZAKOŃCZONA - DZIĘKUJEMY ORGANIZATOROM, WSZYSTKIM PARTNEROM I DARCZYŃCOM, KTÓRZY SPRAWILI, ŻE XXX KRAKOWSKICH UCZNIÓW MOGŁO W PEŁNI KORZYSTAĆ Z NAUKI ZDALNEJ 
</Typography>
                    <Typography variant="subtitle1" className={classes.description}>
                        W związku z pandemią koronawirusa szkoły realizują naukę z uczniami on-line. Niestety, <b>nie wszystkie dzieci, a także nie wszyscy nauczyciele</b> mają dostęp do komputera czy tabletu.
                    </Typography>
                    <Typography variant="subtitle1" className={classes.description}>
                        <b>##DajżeKompa - powstało, aby walczyć z wykluczeniem cyfrowym.</b> -  Inicjatorem akcji były  <b>krakowskie firmy</b> wspierane przez <b>Urząd Miasta Krakowa i Fundację Poland Business Run</b>
                    </Typography>
                    <Typography variant="subtitle1" className={classes.description}>
                        Do pomocy zgłosiło się <b>wiele osób</b>, dzięki którym pomysł wsparcia dzieci w kilka dni przerodził się w rzeczywistość: to ludzie biznesu, informatycy, prawnicy, dziennikarze, a przede wszystkim darczyńcy. Dzięki naszym 
                    </Typography>
                    <Typography variant="subtitle1" className={classes.description}>
                        pomocnikom udało się zebrać <b>kilkaset sztuk sprzętu komputerowego, poddać go czynnościom serwisowym, zdezynfekować i wysłać do najbardziej potrzebujących rodzin z Krakowa.</b> 
                    </Typography>
                    <Typography variant="subtitle1" className={classes.description}>
                        Do akcji zgłosiło się ponad 1400 potrzebujących osób i niestety nie byliśmy w stanie pomóc wszystkim, ale cieszy nas to, co udało się osiągnąć:
                    </Typography>
                    <Separator />
                </div>
                <div className={classes.half}>
                    <ProgramSummary />
                </div>
            </div>
        </section>
    );
}

export default HeroBanner;
