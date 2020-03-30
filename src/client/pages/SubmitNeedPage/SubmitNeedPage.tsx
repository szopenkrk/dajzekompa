/* Libraries */
import React from 'react';
import { makeStyles, Typography, Button } from '@material-ui/core';

/* Application files */
import ProgramSummary from '../../components/ProgramSummary';
import Partners from '../../components/Partners';
import Separator from '../../components/Separator';

const useStyles = makeStyles({
    container: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: '60px'
    },
    content: {
        width: '547px'
    },
    sidebar: {
        width: '226px',
        paddingTop: '10px',
        display: 'flex',
        flexDirection: 'column'
    },
    title: {
        fontWeight: 900,
        paddingBottom: '55px',
        textTransform: 'uppercase'
    },
    panel: {
        margin: '20px 0'
    },
    button: {
        marginTop: '20px'
    }
});

export function SubmitNeedPage () {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <section className={classes.content}>
                <Typography variant="h2" className={classes.title}>Zgłoś potrzebę</Typography>
                <article className={classes.panel}>
                    <Typography variant="body1"><b>Jak zgłosić potrzebę na kompa?</b></Typography>
                    <Typography variant="body1">Zgłoś się do swojego nauczyciela. Dyrektorzy szkół lub osoby przez nich wyznaczone mogą złożyć taki wniosek.</Typography>
                </article>
                <Separator />
                <article className={classes.panel}>
                    <Typography variant="body1"><b>Jestem dyrektorem/osobą wyznaczoną. Jak zgłosić potrzebę na stronie?</b></Typography>
                    <Typography variant="body1">Wejdź do zakładki (...), wypełnij i wyślij formularz.</Typography>
                    <Button variant="outlined" color="primary" className={classes.button}>Zgłoś szkołę</Button>
                </article>
                <Separator />
                <article className={classes.panel}>
                    <Typography variant="body1"><b>Jak sprzęt dotrze do potrzebującego?</b></Typography>
                    <Typography variant="body1">Komputer i inny sprzęt zostanie odebrany od firmy serwisującej przez (...) i zawieziony prosto pod adres osoby potrzebującej.</Typography>
                </article>
                <Separator />
                <article className={classes.panel}>
                    <Typography variant="body1"><b>Czy będzie bezpieczny (dezynfekcja)?</b></Typography>
                    <Typography variant="body1">Poddany kwarantannie w firmie serwisującej - 24 godziny, następnie wyczyszczony, a na koniec, po wykonaniu wszelkich czynności serwisowych - zdezynfekowany. Najlepiej po odebraniu wstrzymać się z otworzeniem na 24 godziny.</Typography>
                </article>
                <Separator />
                <article className={classes.panel}>
                    <Typography variant="body1"><b>Czy będę musiał coś zapłacić?</b></Typography>
                    <Typography variant="body1">Nie (na podstawie opinii prawników).</Typography>
                </article>
            </section>
            <aside className={classes.sidebar}>
                <ProgramSummary />
                <Partners vertical />
            </aside>
        </div>
    );
}

export default SubmitNeedPage;
