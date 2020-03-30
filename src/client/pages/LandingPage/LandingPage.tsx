/* Libraries */
import React from 'react';
import clx from 'classnames';
import { makeStyles } from '@material-ui/core';
import { Switch, Route, useLocation } from 'react-router-dom';

/* Application files */
import MainMenu from '../../components/MainMenu';
import HeroBanner from '../../components/HeroBanner';
import Separator from '../../components/Separator';
import Footer from '../../components/Footer/Footer';

import HomePage from '../HomePage';
import AboutPage from '../AboutPage';
import FaqPage from '../FaqPage';

const useStyles = makeStyles(() => ({
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
    const location = useLocation();

    return (
        <div className={classes.root}>
            <header className={classes.section}>
                <MainMenu />
                {location.pathname === '/' && <HeroBanner />}
            </header>
            <main className={clx(classes.container, classes.main)}>
                <Separator />
                <Switch>
                    <Route path="/" exact={true} component={HomePage} />
                    <Route path="/o-akcji" exact={true} component={AboutPage} />
                    <Route path="/faq" exact={true} component={FaqPage} />
                </Switch>
                <Separator className={classes.separator} />
            </main>
            <Footer className={classes.container} />
        </div>
    );
}

export default LandingPage;
