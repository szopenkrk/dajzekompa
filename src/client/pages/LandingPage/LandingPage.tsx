import React from 'react';
import clx from 'classnames';
import { makeStyles } from '@material-ui/core';

/* Application files */
import logo from '../../assets/images/logo.svg';

import HeroBanner from '../../components/HeroBanner';
import Partners from '../../components/Partners';
import Separator from '../../components/Separator';
import Footer from '../../components/Footer/Footer';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    section: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    container: {
        width: '940px'
    },
    navigation: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '13px 0'
    },
    menu: {
        display: 'flex',
        listStyle: 'none',
        margin: 0,
        padding: 0
    },
    menuItem: {
        textTransform: 'uppercase',
        fontFamily: 'Roboto',
        fontSize: '15px',
        fontWeight: 500,
        padding: '12px'
    },
    main: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    separator: {
        margin: '20px 0'
    }
}));

export function LandingPage () {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <header className={classes.section}>
                <nav className={clx(classes.container, classes.navigation)}>
                    <img src={logo} />
                    <ul className={classes.menu}>
                        <li className={classes.menuItem}>O akcji</li>
                        <li className={classes.menuItem}>FAQ</li>
                        <li className={classes.menuItem}>Podaruj kompa</li>
                        <li className={classes.menuItem}>Zgłoś potrzebę</li>
                        <li className={classes.menuItem}>Regulamin</li>
                        <li className={classes.menuItem}>Zgłoś miasto</li>
                    </ul>
                </nav>
                <HeroBanner />
            </header>
            <main className={clx(classes.container, classes.main)}>
                <Partners />
                <Separator className={classes.separator} />
            </main>
            <Footer className={classes.container} />
        </div>
    );
}

export default LandingPage;
