/* Libraries */
import React from 'react';
import { makeStyles, Typography, Button } from '@material-ui/core';

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
    actions: {
        display: 'flex',
        justifyContent: 'center',
        '& > *': {
            margin: theme.spacing(1),
            '&:first-of-type': {
                marginLeft: 0
            }
        },
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
        answer: ''
    },
    {
        question: 'Jak zgłosić sprzęt do oddania?',
        answer: ''
    },
    {
        question: 'Jak mam przygotować sprzęt?',
        answer: ''
    },
    {
        question: 'Gdzie mam zanieść paczkę?',
        answer: 'Stop! Zostań w domu!!! Jak zgłosisz że twój sprzęt jest gotowy do odbioru, wysyłamy samochód z kierowcą, aby bezpiecznie odebrać paczkę bezkontaktowo i przywieźć do serwisu komputerowego zanim trafi do dzieciaka.'
    },
    {
        question: 'Jak moje dane osobowe będą chronione?',
        answer: ''
    },
];

export function FaqPage () {
    const classes = useStyles();

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
                <ProgramSummary />
                <Partners vertical />
            </aside>
        </div>
    );
}

export default FaqPage;
