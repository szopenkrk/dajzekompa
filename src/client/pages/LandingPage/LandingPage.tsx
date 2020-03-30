/* Libraries */
import React from 'react';
import clx from 'classnames';
import { makeStyles } from '@material-ui/core';
import { Switch, Route, useLocation } from 'react-router-dom';

/* Application files */
import MainMenu from '../../components/MainMenu';
import HeroBanner from '../../components/HeroBanner';
import Separator from '../../components/Separator';
import Footer from '../../components/Footer';

import HomePage from '../HomePage';
import AboutPage from '../AboutPage';
import FaqPage from '../FaqPage';
import SubmitDevicePage from '../SubmitDevicePage';
import SubmitNeedPage from '../SubmitNeedPage';
import TermsPage from '../TermsPage';
import SubmitCityPage from '../SubmitCityPage';
import RodoPage from '../RodoPage';

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
                    <Route path="/podaruj-kompa" exact={true} component={SubmitDevicePage} />
                    <Route path="/zglos-potrzebe" exact={true} component={SubmitNeedPage} />
                    <Route path="/regulamin" exact={true} component={TermsPage} />
                    <Route path="/zglos-miasto" exact={true} component={SubmitCityPage} />
                    <Route path="/rodo" exact={true} component={RodoPage} />
                </Switch>
                <Separator className={classes.separator} />
            </main>
            <Footer className={classes.container} />
        </div>
    );
}

export default LandingPage;
