/* Libraries */
import React from 'react';
import { makeStyles, Typography, Button, useMediaQuery } from '@material-ui/core';

/* Application files */
import ProgramSummary from '../../components/ProgramSummary';
import Partners from '../../components/Partners';
import Separator from '../../components/Separator';

import Faq from '../../components/Faq';

const useStyles = makeStyles((theme) => ({
    container: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: '60px',
        '@media (max-width: 850px)': {
            flexDirection: 'column',
            alignItems: 'center'
        }
    },
    content: {
        width: '547px',
        maxWidth: 'calc(100% - 20px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    sidebar: {
        width: '226px',
        paddingTop: '10px',
        display: 'flex',
        flexDirection: 'column',
        '@media (max-width: 850px)': {
            width: 'auto',
            alignItems: 'center',
            marginTop: '20px'
        }
    },
    title: {
        fontWeight: 900,
        paddingBottom: '55px',
        textTransform: 'uppercase',
        width: '100%'
    },
    actions: {
        display: 'flex',
        justifyContent: 'center',
        '& > *': {
            margin: theme.spacing(1),
            '&:first-of-type': {
                marginLeft: 0
            }
        }
    },
    separator: {
        margin: '20px 0'
    }
}));

const items = [
    {
        question: 'Jakiego rodzaju sprzęt jest potrzebny?',
        answer: 'Szukamy głównie kompów, laptopów, wszelkich rodzajów Mac/Macbooków, tabletów, monitorów, klawiatur, myszek, kamery internetowy i innych działających sprzętów które umożliwią dzieciakom podłączenie się do sieci, aby kontaktować się z nauczycielami i odrabiać lekcje w domu.'
    },
    {
        question: 'Skąd mam wiedzieć czy mój komp jest potrzebny?',
        answer: 'Nieważny model, Mac vs. PC, Dell czy Acer, iPad vs Tablet Android - znajdziemy dobry dom dla twojego sprzętu*,  o ile jest w stanie obsłużyć nowoczesną przeglądarkę internetową. Jeśli da się odpalić kompa, można na nim pisać i wszystko widać to wystarczy. Zanim sprzęt dotrze do dzieciaków i nauczycieli, wyślemy go do fachowca dla sprawdzenia, wgrania aktualnego oprogramowania i testowego uruchomienia.'
    },
    {
        question: 'Jak zgłosić sprzęt do oddania?',
        answer: 'Zrób zdjęcia komputerowi i wszystkim sprzętom, które chcesz przekazać. Wejdź na naszą stronę do zakładki „Podaruj Kompa”, wypełnij formularz i wgraj zdjęcia. Następnie czekaj na instrukcje.'
    },
    {
        question: 'Jak mam przygotować sprzęt?',
        answer: 'Zgraj wszystkie dane osobiste, a następnie najlepiej zrób systemowy reset. Jeśli nie wiesz jak, nie martw się, nasi fachowcy wyczyszczą komputer za Ciebie. Następnie zapakuj sprzęt tak, jakbyś chciał sprzedawać go na aukcji: jak najwięcej folii bąbelkowej dookoła i najlepiej, by był spakowany do jednego pudełka.'
    },
    {
        question: 'Gdzie mam zanieść paczkę?',
        answer: 'Stop! Zostań w domu!!! Jak zgłosisz że twój sprzęt jest gotowy do odbioru, wysyłamy samochód z kierowcą, aby bezpiecznie odebrać paczkę bezkontaktowo i przywieźć do serwisu komputerowego zanim trafi do dzieciaka.'
    },
    {
        question: 'Jak wysłać paczkę?',
        answer: 'Dostawcą paczek będzie firma InPost. Podczas rejestracji zostaniesz poproszony o (...). Otrzymasz (...). '
    },
    {
        question: 'Jak moje dane osobowe będą chronione?',
        answer: 'Na podstawie danych prawników Chronimy Twoje dane zgodnie z przepisami RODO. Administratorem Twoich danych jest (...).'
    },
    {
        question: 'Skąd wiadomo, że mój komputer trafi do osoby potrzebującej?',
        answer: 'Nauczyciele i dyrektorzy szkół wskazują osoby najbardziej potrzebujące wsparcia. Dane weryfikuje Wydział Edukacji Miasta Krakowa. Komputery trafią tylko do dzieci zagrożonych wykluczeniem cyfrowym oraz nauczycieli, którzy bez odpowiedniego sprzętu nie mogą realizować programu w sposób zdalny.'
    },
    {
        question: 'A co z podatkiem?',
        answer: 'Zarówno darczyńca, jak i odbiorca nie muszą się martwić o kwestie podatkowe. Konieczne jest jednak wykonanie kilku prostych czynności (...)'
    },
    {
        question: 'Czy ta akcja działa w moim mieście?',
        answer: 'Zaczęliśmy od Krakowa, mamy jednak nadzieję, że akcja szybko ogarnie inne miasta. Zobacz na mapie czy tak się stało. Jeśli nie, może znasz ludzi, którzy chcieliby przejąć inicjatywę w Twoim mieście. Tu możesz zobaczyć jak to zrobić.'
    }
];

export function FaqPage () {
    const classes = useStyles();
    const mobile = useMediaQuery('(max-width: 850px)');

    return (
        <div className={classes.container}>
            <section className={classes.content}>
                <Typography variant="h2" className={classes.title}>Faq</Typography>
                <Faq items={items} title="Weźże mi wytłumacz..." showToggleAll />
                <div className={classes.actions}>
                    <Button variant="contained" color="primary">Podaruj kompa</Button>
                </div>
                <Separator className={classes.separator} />
                <Typography variant="body2">* Proszę o nie wysyłanie dosłownie złomu. Potrzebny jest działający sprzęt. Więc jak dobrze wiesz, że twój Commodore w piwnicy odał swój ostatni oddech w latach 90-tych, prosze nie przekazywać złomu dalej.</Typography>
            </section>
            <aside className={classes.sidebar}>
                {mobile && <Separator />}
                <ProgramSummary />
                <Partners {...(mobile ? {} : { vertical: true })} />
            </aside>
        </div>
    );
}

export default FaqPage;
