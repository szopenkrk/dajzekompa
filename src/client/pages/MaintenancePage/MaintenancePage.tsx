/* Libraries */
import React from 'react';
import { Paper, Typography, Icon, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        padding: '30px',
        textAlign: 'center'
    },
    container: {
        padding: '30px'
    },
    icon: {
        fontSize: '70px',
        color: '#f8bb06'
    }
});

export function MaintenancePage () {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper variant="outlined" className={classes.container}>
                <Icon className={classes.icon}>warning</Icon>
                <Typography variant="h2">Strona w budowie</Typography>
            </Paper>
        </div>
    );
}

export default MaintenancePage;
