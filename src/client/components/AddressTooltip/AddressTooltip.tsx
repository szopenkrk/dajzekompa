/* Libraries */
import React, { PropsWithChildren } from 'react';
import { Tooltip, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: {
        maxWidth: '100%'
    },
    tooltip: {
        width: 600,
        maxWidth: '100%',
        boxSizing: 'border-box'
    },
    link: {
        color: theme.palette.primary.main,
        borderBottom: `3px dotted ${theme.palette.primary.main}`,
        cursor: 'default'
    },
    section: {
        paddingTop: theme.spacing(2)
    }
}));

export function AddressTooltip ({ children }: PropsWithChildren<{}>) {
    const classes = useStyles();

    return (
        <Tooltip title={(
            <>
                <Typography variant="h6">Dlaczego prosimy Cię o podanie adresu zamieszkania?</Typography>
                <section className={classes.section}>
                    <Typography variant="body1"><b>Gdyby komputer z jakiegoś powodu nie mógł być wysłany paczkomatem, skontaktujemy się z Tobą i wspólnie znajdziemy rozwiązanie.</b></Typography>
                </section>
            </>
        )} classes={{ popper: classes.container, tooltip: classes.tooltip }}>
            <abbr className={classes.link}>{children}</abbr>
        </Tooltip>
    );
}

export default AddressTooltip;
