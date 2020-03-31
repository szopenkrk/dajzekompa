/* Library */
import React from 'react';
import clx from 'classnames';
import { makeStyles, Button, Typography } from '@material-ui/core';

/* Application files */
import arrowRight from '../../assets/images/icon-arrow-right.svg';
import ProgramSummary from '../ProgramSummary';
import Separator from '../Separator';

const useStyles = makeStyles((theme) => ({
    section: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    container: {
        width: '940px',
        maxWidth: 'calc(100% - 20px)'
    },
    hero: {
        backgroundColor: '#f8f8f8',
        padding: '71px 0'
    },
    wrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        '@media (max-width: 850px)': {
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
        width: '538px',
        lineHeight: 1.33,
        maxWidth: '100%'
    },
    linkButton: {
        backgroundColor: 'transparent'
    },
    separator: {
        width: '538px',
        margin: '28px 0'
    },
    actions: {
        display: 'flex',
        marginTop: '25px',
        '& > *': {
            margin: theme.spacing(1),
        },
        '@media (max-width: 850px)': {
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
                    <Typography variant="h2" className={classes.title}>DAJŻE KOMPA</Typography>
                    <Typography variant="subtitle1" className={classes.description}>
                        <b>Polskie szkoły stanęły przed nie lada wyzwaniem!</b> Nauczanie on-line spadło na nie jak grom z jasnego nieba.... W większości
                        z nich zaczęto już pracować zdalnie, ale to nie oznacza, że wszyscy mają dostęp do komputera, tableta czy Internetu. <b>Niestety,
                        wiele dzieci, a także nauczycieli, nie posiada w domu sprzętu</b>, który pozwoliłby na uczenie i odrabianie lekcji on-line.
                    </Typography>
                    <Button color="primary" endIcon={<img src={arrowRight} />} className={classes.linkButton}>Czytaj więcej</Button>
                    <Separator />
                    <div className={classes.actions}>
                        <Button variant="contained" color="primary">Podaruj kompa</Button>
                        <Button variant="outlined" color="primary">Zgłoś potrzebę</Button>
                    </div>
                </div>
                <div className={classes.half}>
                    <ProgramSummary />
                </div>
            </div>
        </section>
    );
}

export default HeroBanner;
