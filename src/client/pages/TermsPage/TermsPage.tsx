/* Libraries */
import React from 'react';
import { makeStyles, Typography, useMediaQuery } from '@material-ui/core';

/* Application files */
import ProgramSummary from '../../components/ProgramSummary';
import Partners from '../../components/Partners';
import Separator from '../../components/Separator';

const useStyles = makeStyles({
    container: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: '60px',
        '@media (max-width: 850px)': {
            flexDirection: 'column',
            alignItems: 'center'
        }
    },
    content: {
        width: '547px',
        maxWidth: 'calc(100% - 20px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    sidebar: {
        width: '226px',
        paddingTop: '10px',
        display: 'flex',
        flexDirection: 'column',
        '@media (max-width: 850px)': {
            width: 'auto',
            alignItems: 'center',
            marginTop: '20px'
        }
    },
    title: {
        fontWeight: 900,
        paddingBottom: '55px',
        textTransform: 'uppercase',
        width: '100%'
    }
});

export function TermsPage () {
    const classes = useStyles();
    const mobile = useMediaQuery('(max-width: 850px)');

    return (
        <div className={classes.container}>
            <section className={classes.content}>
                <Typography variant="h2" className={classes.title}>Regulamin</Typography>
            </section>
            <aside className={classes.sidebar}>
                {mobile && <Separator />}
                <ProgramSummary />
                <Partners {...(mobile ? {} : { vertical: true })} />
            </aside>
        </div>
    );
}

export default TermsPage;
