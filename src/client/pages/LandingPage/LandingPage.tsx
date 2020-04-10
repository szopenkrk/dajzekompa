/* Libraries */
import React from 'react';
import clx from 'classnames';
import { makeStyles } from '@material-ui/core';
import { Switch, Route, useLocation } from 'react-router-dom';

/* Application files */
import MainMenu from 'client/components/MainMenu';
import HeroBanner from 'client/components/HeroBanner';
import Separator from 'client/components/Separator';
import Footer from 'client/components/Footer';

import HomePage from 'client/pages/HomePage';
import AboutPage from 'client/pages/AboutPage';
import FaqPage from 'client/pages/FaqPage';
import SubmitDevicePage from 'client/pages/SubmitDevicePage';
import SubmitNeedPage from 'client/pages/SubmitNeedPage';
import TermsPage from 'client/pages/TermsPage';
import SubmitCityPage from 'client/pages/SubmitCityPage';
import RodoPage from 'client/pages/RodoPage';
import InfoClausePage from 'client/pages/InfoClausePage';

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
        width: 940,
        maxWidth: 'calc(100% - 20px)'
    },
    main: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    separator: {
        margin: '20px 0'
    },
    separatorThin: {
        margin: 0
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
                <Separator className={classes.separatorThin} />
                <Switch>
                    <Route path="/" exact={true} component={HomePage} />
                    <Route path="/o-akcji" exact={true} component={AboutPage} />
                    <Route path="/faq" exact={true} component={FaqPage} />
                    <Route path="/podaruj-kompa" exact={true} component={SubmitDevicePage} />
                    <Route path="/zglos-potrzebe" exact={true} component={SubmitNeedPage} />
                    <Route path="/regulamin" exact={true} component={TermsPage} />
                    <Route path="/zglos-miasto" exact={true} component={SubmitCityPage} />
                    <Route path="/rodo" exact={true} component={RodoPage} />
                    <Route path="/klauzula" exact={true} component={InfoClausePage} />
                </Switch>
                <Separator className={classes.separator} />
            </main>
            <Footer className={classes.container} />
        </div>
    );
}

export default LandingPage;
