import React from 'react';
import { CircularProgress, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    container: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.75)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export const LoadingOverlay = () => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <CircularProgress thickness={3} variant="indeterminate" />
        </div>
    );
};

export default LoadingOverlay;
