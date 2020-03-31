/* Libraries */
import React from 'react';
import clx from 'classnames';
import { makeStyles } from '@material-ui/core';

type Props = {
    className?: string;
};

const useStyles = makeStyles({
    separator: {
        width: '100%',
        height: 1,
        backgroundColor: '#e8e8e8',
        border: 0
    }
});

export function Separator (props: Props) {
    const classes = useStyles();

    return (
        <hr className={clx(classes.separator, { [props.className]: !!props.className })} />
    );
}

export default Separator;
