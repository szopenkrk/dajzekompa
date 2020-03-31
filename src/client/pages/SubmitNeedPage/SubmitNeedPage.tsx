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
    panelTitle: {
        fontWeight: 700
    },
    button: {
        marginTop: '20px'
    },
    list: {
        paddingLeft: '18px',
        margin: 0,
        fontFamily: 'Roboto'
    }
});

export function SubmitNeedPage () {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <section className={classes.content}>
                <Typography variant="h2" className={classes.title}>Zgłoś potrzebę</Typography>
                <article className={classes.panel}>
                    <Typography variant="body1" className={classes.panelTitle}>Potrzebujesz sprzętu?</Typography>
                    <Typography variant="body1">Zgłoś się do swojej szkoły - wychowawcy, nauczyciela lub dyrektora. Dyrektorzy szkół lub osoby przez nich wyznaczone mogą wnioskować o sprzęt dla Ciebie.</Typography>
                </article>
                <Separator />
                <article className={classes.panel}>
                    <Typography variant="body1" className={classes.panelTitle}>Jestem dyrektorem lub osobą przez niego wyznaczoną. Jak mam zgłosić potrzebę na Waszej stronie?</Typography>
                    <Typography variant="body1">Wejdź do zakładki „Zgłoś Potrzebę” i wypełnij formularz podając dane swoje i osoby potrzebującej. Listę osób, które otrzymają sprzęt ostatecznie zweryfikuje Wydział Edukacji Urzędu Miasta Krakowa - w pierwszej kolejności paczki dostaną osoby najbardziej zagrożone wykluczeniem cyfrowym. Dostaniesz powiadomienie czy osoby zgłoszone przez Ciebie otrzymają sprzęt.</Typography>
                    <Button variant="outlined" color="primary" className={classes.button}>Zgłoś szkołę</Button>
                </article>
                <Separator />
                <article className={classes.panel}>
                    <Typography variant="body1" className={classes.panelTitle}>Jak sprzęt dotrze do potrzebującego?</Typography>
                    <Typography variant="body1">Sprzęt zostanie wysłany przez firmę serwisującą FIXIT i będzie do odebrania w najbliższym paczkomacie. Dostaniesz zawiadomienie na swój telefon, gdy paczka będzie gotowa do odbioru i będziesz miał 48h na wyjęcie jej z paczkomatu.</Typography>
                </article>
                <Separator />
                <article className={classes.panel}>
                    <Typography variant="body1" className={classes.panelTitle}>Czy sprzęt będzie bezpieczny (poddany dezynfekcji)?</Typography>
                    <Typography variant="body1">Tak, każdy przekazany nam sprzęt poddawany jest 24-godzinnej kwarantannie w firmie serwisującej. Następnie jest wyczyszczony, a na koniec, po wykonaniu wszelkich czynności serwisujących zdezynfekowany. Po odebraniu paczki najlepiej odczekać 24h przed otwarciem.</Typography>
                </article>
                <Separator />
                <article className={classes.panel}>
                    <Typography variant="body1" className={classes.panelTitle}>Czy zapłacę podatek?</Typography>
                    <Typography variant="body1">Nie będziesz musiał płacić podatku. Będziesz musiał jednak wypełnić odpowiednie dokumenty i dostarczyć je do nas. (na podstawie opinii prawników)</Typography>
                </article>
                <Separator />
                <article className={classes.panel}>
                    <Typography variant="body1" className={classes.panelTitle}>Otrzymałem komputer, co dalej?</Typography>
                        <ol className={classes.list}>
                            <li><Typography variant="body1">Wypełnij dołączone do paczki dokumenty i wyślij na adres: (...)</Typography></li>
                            <li><Typography variant="body1">Zachęcamy do zrobienia zdjęcia i wysłania do nas na profil (...). z hashtagiem #DajżeKompa</Typography></li>
                            <li><Typography variant="body1">Użytkuj sprzęt zgodnie z przeznaczeniem</Typography></li>
                        </ol>
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
