import React from 'react';
import { Typography, Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    actions: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: '50px'
    },
    button: {
        width: '50%',
        display: 'flex',
        justifyContent: 'center',
    }
});

export function RegisterPersonType () {
    const classes = useStyles();

    return (
        <>
            <Typography variant="h4">Na początek, jesteś osobą prywatną czy firmą?</Typography>
            <div className={classes.actions}>
                <div className={classes.button}>
                    <Button variant="contained" color="primary">Osobą prywatną</Button>
                </div>
                <div className={classes.button}>
                    <Button variant="contained" color="primary">Firmą</Button>
                </div>
            </div>
        </>
    )
}

export default RegisterPersonType;
