/* Libraries */
import React from 'react';
import { makeStyles, Typography, Button } from '@material-ui/core';

/* Application files */
import ProgramSummary from '../../components/ProgramSummary';
import Partners from '../../components/Partners';
import flow from '../../assets/images/parties-flow.png';

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
    description: {
        lineHeight: 1.33,
        paddingBottom: '35px'
    },
    image: {
        width: '100%',
        paddingBottom: '40px'
    },
    actions: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
            '&:first-of-type': {
                marginLeft: 0
            }
        },
    }
}));

export function AboutPage () {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <section className={classes.content}>
                <Typography variant="h2" className={classes.title}>O akcji</Typography>
                <Typography variant="subtitle1" className={classes.description}>
                    <b>Polskie szkoły stanęły przed nie lada wyzwaniem!</b> Nauczanie on-line spadło na nie jak grom z jasnego nieba.... W większości
                    z nich zaczęto już pracować zdalnie, ale to nie oznacza, że wszyscy mają dostęp do komputera, tableta czy Internetu. <b>Niestety,
                    wiele dzieci, a także nauczycieli, nie posiada w domu sprzętu</b>, który pozwoliłby na uczenie i odrabianie lekcji on-line.
                </Typography>
                <img src={flow} className={classes.image} />
                <Typography variant="subtitle1" className={classes.description}>
                    Jaki mamy na to pomysł? Jeśli w Twoim domowym bądź firmowym magazynie - a ostatnio zapewne znalazłeś/aś czas na porządki :) - zalega
                    <b> nieużywany sprzęt komputerowy, możesz przekazać go na potrzeby naszej akcji</b>. Procedura jest bardzo prosta: przede wszystkim
                    #zostańwdomu i zgłoś chęć udziału, zachowaj dla siebie prywatne pliki, a resztą zajmiemy się my. Zadbamy, aby sprzęt był zdezynfekowany,
                    poddany kwarantannie, przygotowany do potrzeb zadań on-line i oczywiście dostarczymy go do szkół, które potrzebują wsparcia.
                </Typography>
                <Typography variant="subtitle1" className={classes.description}>
                    Inicjatorem akcji jest firma <b>Talent Alpha</b> wspólnie z <b>Urzędem Miasta Krakowa</b> i <b>Fundacją Poland Business Run</b> oraz
                    lokalnymi firmami: Fixit, SSW Pragmatic Solutions, Sophilution. Zgłosiło się <b>mnóstwo osób</b>, dzięki którym pomysł wsparcia dzieciaków
                    w kilka dni przerodził się w rzeczywistość: to prawnicy, informatycy, ludzie biznesu, dziennikarze, a przede wszystkim darczyńcy.
                </Typography>
                <Typography variant="subtitle1" className={classes.description}>
                    Wiemy, że powstaje wiele inicjatyw lokalnych, a także programów pomocy rządowej, bardzo cieszymy się, że działamy we wspólnym celu,
                    bo potrzeby są ogromne. Tysiące dzieci jest wykluczonych cyfrowo. <b>Razem możemy naprawdę wiele!</b>
                </Typography>
                <Typography variant="subtitle1" className={classes.description}>
                    Podsumowując: <b>jesteś brakującym elementem naszej układanki</b>. Aby wszystko dobrze się ułożyło niewiele potrzeba –
                    <b>po prostu #dajżekompa</b>.
                </Typography>
                <Typography variant="subtitle1" className={classes.description}>
                    PS.: Nie zapomnij podzielić się tą informacją w swoich social mediach! #dajżekompa
                </Typography>
                <div className={classes.actions}>
                    <Button variant="contained" color="primary">Podaruj kompa</Button>
                    <Button variant="outlined" color="primary">Zgłoś potrzebę</Button>
                </div>
            </section>
            <aside className={classes.sidebar}>
                <ProgramSummary />
                <Partners vertical />
            </aside>
        </div>
    );
}

export default AboutPage;
