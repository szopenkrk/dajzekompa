import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';

/* Application files */
import logoKrakow from '../../assets/images/logo-partner-krakow.png';
import logoTalentAlpha from '../../assets/images/logo-partner-talentalpha.png';
import logoBusinessRun from '../../assets/images/logo-partner-businessrun.png';
import logoPragmaticSolutions from '../../assets/images/logo-partner-sww.png';
import logoInpost from '../../assets/images/logo-partner-inpost.png';
import logoBkode from '../../assets/images/logo-partner-bkode.png';

type Props = {
    vertical?: boolean;
};

const useStyles = makeStyles({
    title: {
        padding: '32px 0',
        textAlign: 'center'
    },
    wrapper: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        flexDirection: props => (props as any).vertical ? 'column' : 'row'
    },
    partner: {
        maxHeight: '46px',
        padding: props => (props as any).vertical ? '20px 0' : '0 20px'
    }
});

export function Partners (props: Props) {
    const classes = useStyles(props);

    return (
        <>
            <Typography variant="body2" className={classes.title}>Organizatorzy i współorganizatorzy akcji:</Typography>
            <section className={classes.wrapper}>
                <img src={logoKrakow} className={classes.partner}  />
                <img src={logoTalentAlpha} className={classes.partner}  />
                <img src={logoBkode} className={classes.partner}  />
                <img src={logoBusinessRun} className={classes.partner}  />
                <img src={logoPragmaticSolutions} className={classes.partner}  />
                <img src={logoInpost} className={classes.partner}  />
            </section>
        </>
    );
}

export default Partners;