/* Libraries */
import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';

type Props = {
    proportions: {
        color: string;
        value: number;
        label?: string;
    }[];
    percentage?: boolean;
}

const useStyles = makeStyles({
    root: {
        width: '100%',
        height: 20,
        color: '#ffffff',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex'
    },
    element: {
        height: '100%',
        textAlign: 'center'
    }
});

export function ProportionBar (props: Props) {
    const classes = useStyles();
    const total = props.proportions.reduce((all, current) => all + current.value, 0);

    return (
        <div className={classes.root}>
            {props.proportions.map((element, index) => (
                <div className={classes.element} key={index} style={{ backgroundColor: element.color, width: `${element.value / total * 100}%` }}>
                    <Typography variant="caption">{element.label} ({(element.value / total * 100).toFixed(1)}%)</Typography>
                </div>
            ))}
        </div>
    );
}

export default ProportionBar;
