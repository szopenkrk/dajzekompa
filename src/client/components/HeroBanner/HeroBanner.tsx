/* Libraries */
import React from 'react';
import clx from 'classnames';
import { makeStyles, Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

/* Application files */
import arrowRight from 'client/assets/images/icon-arrow-right.svg';
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
                    <Typography variant="h2" className={classes.title}>DAJŻE KOMPA</Typography>
                    <Typography variant="subtitle1" className={classes.description}>
                        W związku z pandemią koronawirusa szkoły realizują naukę z uczniami on-line. Niestety, <b>nie wszystkie dzieci, a także nie wszyscy nauczyciele</b> mają dostęp do komputera czy tabletu.
                    </Typography>
                    <Typography variant="subtitle1" className={classes.description}>
                        <b>#DajżeKompa</b> - jeśli posiadasz <b>niepotrzebny sprzęt komputerowy, przekaż go</b> na potrzeby naszej akcji. Będziemy razem walczyć z wykluczeniem cyfrowym.
                    </Typography>
                    <Link to="/o-akcji">
                        <Button color="primary" endIcon={<img src={arrowRight} />} className={classes.linkButton}>Czytaj więcej</Button>
                    </Link>
                    <Separator />
                    <div className={classes.actions}>
                        <Link to="/podaruj-kompa"><Button variant="contained" color="primary">Podaruj kompa</Button></Link>
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
