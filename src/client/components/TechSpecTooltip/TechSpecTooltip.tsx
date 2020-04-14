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

export function TechSpecTooltip ({ children }: PropsWithChildren<{}>) {
    const classes = useStyles();

    return (
        <Tooltip title={(
            <>
                <Typography variant="h6">Jak sprawdzić parametry komputera?</Typography>
                <section className={classes.section}>
                    <Typography variant="body1"><b>Potrzebujemy następujących informacji:</b></Typography>
                    <Typography variant="body1"><b>Rozmiar dysku/dysków:</b> rozmiar dysku określamy w GB (gigabajty) lub TB (terabajty). 1000 GB = 1TB.</Typography>
                    <Typography variant="body1"><b>Pamięć RAM:</b> jej ilość wyrażamy w GB (gigabajty) np. 4 GB, 6 GB, 8 GB, 12 GB, 16 GB itp.</Typography>
                    <Typography variant="body1"><b>Procesor:</b> jego prędkość wyrażamy w GHz (gigaherce) np. 2,4 GHz, 3,7 GHz itp.</Typography>
                </section>
                <section className={classes.section}>
                    <Typography variant="body1"><u>Systemy z rodziny MacOS:</u></Typography>
                    <Typography variant="body1"><b>Rozmiar dysku/dysków:</b> kliknij w ikonę <b>Apple</b> w lewym górnym rogu ekranu > wybierz opcję <b>Ten Mac</b> > wybierz zakładkę <b>Pamięć Masowa</b> > zsumuj wartości dysków pomijając ewentualne dyski zewnętrzne</Typography>
                    <Typography variant="body1"><b>Procesor i Pamięć RAM:</b> kliknij w ikonę <b>Apple</b> > <b>Ten Mac</b> > wybierz zakładkę <b>Przegląd</b> i spisz wartości <i>Procesor</i> i <i>Pamięć</i></Typography>
                </section>
                <section className={classes.section}>
                    <Typography variant="body1"><u>Systemy z rodziny Windows:</u></Typography>
                    <Typography variant="body1"><b>Rozmiar dysku/dysków:</b> wejdź w  <b>Ten Komputer/Mój Komputer/Komputer</b> (znajdziesz go klikając np. <b>Eksplorator plików</b>) i zsumuj wartości dla dysków pomijając ewentualne dyski zewnętrzne</Typography>
                    <Typography variant="body1"><b>Procesor i Pamięć RAM:</b> wejdź w <b>Panel Sterowania</b> (znajdziesz go np. klikając w przycisk <b>Start</b> i wpisując „Panel Sterowania” w polu wyszukiwania > Znajdź opcję <b>System</b> (w niektórych wersjach Windows najpierw będziesz musiał wejść w <b>System i Zabezpieczenia</b>, a dopiero potem w <b>System</b>) spisz wartości dla pamięci RAM i dla procesora (czasem występują dwie wartości GHz, spisz tę większą).</Typography>
                </section>
            </>
        )} classes={{ popper: classes.container, tooltip: classes.tooltip }}>
            <abbr className={classes.link}>{children}</abbr>
        </Tooltip>
    );
}

export default TechSpecTooltip;
