/* Libraries */
import React, { useState } from 'react';
import { makeStyles, Typography, Button, Icon } from '@material-ui/core';

/* Application files */
import SubPage from 'client/pages/SubPage';
import Separator from 'client/components/Separator';
import ReceiverAdd from "client/components/ReceiverAdd";

const useStyles = makeStyles({
    panel: {
        margin: '20px 0'
    },
    panelTitle: {
        fontWeight: 700
    },
    button: {
        marginTop: 20
    },
    list: {
        paddingLeft: 18,
        margin: 0,
        fontFamily: 'Roboto'
    },
    icon: {
        fontSize: 70,
        color: '#00b848',
        marginBottom: 20
    },
    actions: {
        display: 'flex',
        justifyContent: 'flex-end',
        paddingTop: 30,
        paddingBottom: 10
    },
    message: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    messageTitle: {
        textAlign: 'center'
    }
});

export function SubmitNeedPage () {
    const classes = useStyles();
    const [ complete, setComplete ] = useState(false);

    function finish () {
        setComplete(true);
    }

    function reset () {
        setComplete(false);
    }

    return (
        <SubPage title="Zgłoś potrzebę">
            {complete && (
                <div className={classes.message}>
                    <Icon className={classes.icon}>check_circle</Icon>
                    <Typography variant="h5" className={classes.messageTitle}>Dziękujemy!</Typography>
                    <Typography variant="body1" className={classes.messageTitle}>Twoje zgłoszenie zostało wysłane. Poinformujemy Cię o dalszych krokach.</Typography>
                    <section className={classes.actions}>
                        <Button variant="contained" color="primary" onClick={reset}>Zgłoś kolejną osobę</Button>
                    </section>
                </div>
            )}
            {!complete && <ReceiverAdd onComplete={finish} />}
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
        </SubPage>
    );
}

export default SubmitNeedPage;
