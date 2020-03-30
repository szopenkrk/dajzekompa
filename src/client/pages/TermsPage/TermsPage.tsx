/* Libraries */
import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';

/* Application files */
import ProgramSummary from '../../components/ProgramSummary';
import Partners from '../../components/Partners';

const useStyles = makeStyles({
    container: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: '60px'
    },
    content: {
        width: '547px'
    },
    sidebar: {
        width: '226px',
        paddingTop: '10px',
        display: 'flex',
        flexDirection: 'column'
    },
    title: {
        fontWeight: 900,
        paddingBottom: '55px',
        textTransform: 'uppercase'
    }
});

export function TermsPage () {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <section className={classes.content}>
                <Typography variant="h2" className={classes.title}>Regulamin</Typography>
            </section>
            <aside className={classes.sidebar}>
                <ProgramSummary />
                <Partners vertical />
            </aside>
        </div>
    );
}

export default TermsPage;
