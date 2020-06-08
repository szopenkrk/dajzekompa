/* Libraries */
import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';

/* Application files */
// import flowDesktop from 'client/assets/images/faq-givers-desktop.png';
// import flowMobile from 'client/assets/images/faq-givers-mobile.png';
import SubPage from 'client/pages/SubPage';
import Partners from 'client/components/Partners';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    description: {
        lineHeight: 1.33,
        paddingBottom: 35
    },
    image: {
        width: '100%',
        paddingBottom: 40,
        [theme.breakpoints.down('sm')]: {
            width: 245,
            maxWidth: '100%'
        }
    },
    actions: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
            '&:first-of-type': {
                marginLeft: 0
            }
        }
    }
}));

export function PartnerPage () {
    // const theme = useTheme();
    const classes = useStyles();
    // const mobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <SubPage title="Partnerzy akcji">
            <section className={classes.container}>
                <Typography variant="subtitle1" className={classes.description}>
                <b>Współorganizatorzy</b>, czyli pomysłodawcy i realizatorzy projektu.
                </Typography>
                <Partners />
            </section>
        </SubPage>
    );
}

export default PartnerPage;
