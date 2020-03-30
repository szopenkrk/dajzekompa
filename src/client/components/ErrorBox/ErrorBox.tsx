import React, { ReactElement, ReactNode } from 'react';
import clx from 'classnames';
import { SnackbarContent, Icon, makeStyles } from '@material-ui/core';

type Props = {
    children: ReactNode;
    className?: string;
};

const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: '#d32f2f'
    },
    message: {
        display: 'flex',
        alignItems: 'center'
    },
    icon: {
        marginRight: '10px'
    }
}));

export const ErrorBox = (props: Props) => {
    const classes = useStyles();
    const message = (
        <span className={classes.message}>
            <Icon className={classes.icon}>error</Icon>
            <span>{props.children}</span>
        </span>
    ) as ReactElement<any>;
    const mergedClasses = clx(classes.container, {
        [props.className || '']: props.className
    });

    return (
        <SnackbarContent message={message} className={mergedClasses} />
    );
};

export default ErrorBox;
