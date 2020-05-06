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

export function AccountTooltip ({ children }: PropsWithChildren<{}>) {
    const classes = useStyles();

    return (
        <Tooltip title={(
            <>
                <Typography variant="h6">Po co mam podawać numer konta?</Typography>
                <section className={classes.section}>
                    <Typography variant="body1"><b>Numer konta jest potrzebny, gdyby ze względów podatkowych korzystniejsza byłaby dla Ciebie opcja sprzedaży (zamiast darowizny) za symboliczną złotówkę. Sprawdź to ze swoim księgowym.</b></Typography>
                </section>
            </>
        )} classes={{ popper: classes.container, tooltip: classes.tooltip }}>
            <abbr className={classes.link}>{children}</abbr>
        </Tooltip>
    );
}

export default AccountTooltip;
