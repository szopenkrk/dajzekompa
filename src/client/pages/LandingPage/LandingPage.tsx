import React from 'react';
import { makeStyles, Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        textAlign: 'center'
    },
    title: {
        padding: '3vh 0'
    }
});

export function LandingPage () {
    const classes = useStyles();

    return (
        <main className={classes.root}>
            <Typography variant="h2" className={classes.title}>Projekt Miasto</Typography>
            <Link to="/register">
                <Button variant="contained" color="primary">Weź udział</Button>
            </Link>
        </main>
    );
}

export default LandingPage;
