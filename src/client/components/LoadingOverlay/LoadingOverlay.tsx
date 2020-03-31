/* Libraries */
import React from 'react';
import clx from 'classnames';
import { CircularProgress, makeStyles } from '@material-ui/core';

type Props = {
    className?: string;
};

const useStyles = makeStyles({
    container: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10
    }
});

export const LoadingOverlay = (props: Props) => {
    const classes = useStyles();

    return (
        <div className={clx(classes.container, { [props.className]: !!props.className })}>
            <CircularProgress thickness={3} variant="indeterminate" />
        </div>
    );
};

export default LoadingOverlay;
