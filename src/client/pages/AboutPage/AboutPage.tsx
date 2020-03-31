/* Libraries */
import React from 'react';
import { makeStyles, Typography, Button, useMediaQuery } from '@material-ui/core';

/* Application files */
import ProgramSummary from '../../components/ProgramSummary';
import Partners from '../../components/Partners';
import Separator from '../../components/Separator';
import flowDesktop from '../../assets/images/parties-flow-desktop.png';
import flowMobile from '../../assets/images/parties-flow-mobile.png';

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
    description: {
        lineHeight: 1.33,
        paddingBottom: '35px'
    },
    image: {
        width: '100%',
        paddingBottom: '40px',
        '@media (max-width: 850px)': {
            width: '245px',
            maxWidth: '100%'
        }
    },
    actions: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
            '&:first-of-type': {
                marginLeft: 0
            }
        }
    }
}));

export function AboutPage () {
    const classes = useStyles();
    const mobile = useMediaQuery('(max-width: 850px)');

    return (
        <div className={classes.container}>
            <section className={classes.content}>
                <Typography variant="h2" className={classes.title}>O akcji</Typography>
                <Typography variant="subtitle1" className={classes.description}>
                    W związku z epidemią koronawirusa szkoły rozpoczęły pracę z uczniami on-line. Niestety, <b>nie wszystkie dzieci, a także nie wszyscy nauczyciele</b> mają dostęp do komputera, tableta czy Internetu.
                </Typography>
                <Typography variant="subtitle1" className={classes.description}>
                    <b>#DajżeKompa</b> - jeśli posiadasz <b>nieużywany sprzęt komputerowy przekaż go</b> na potrzeby naszej akcji. Będziemy razem walczyć z wykluczeniem cyfrowym.
                </Typography>
                <img src={mobile ? flowMobile : flowDesktop} className={classes.image} />
                <Typography variant="subtitle1" className={classes.description}>
                    To bardzo proste: zgłoś chęć udziału przez naszą stronę internetową, wyczyść prywatne pliki, zapakuj sprzęt i nadaj paczkę przez paczkomat InPost. Resztą zajmiemy się my. Zadbamy, aby sprzęt był poddany kwarantannie, zdezynfekowany, przygotowany do potrzeb zadań on-line i oczywiście dostarczymy go do osób, które go potrzebują. Co ważne - zostanie on u nich na zawsze. Zajmiemy się też wszystkimi kwestiami prawnymi i podatkowymi.
                </Typography>
                <Typography variant="subtitle1" className={classes.description}>
                    Inicjatorem akcji są <b>krakowskie firmy</b> wspierane przez <b>Urząd Miasta Krakowa i Fundację Poland Business Run</b>. Do pomocy zgłosiło się <b>wiele osób chcących pomagać</b>, dzięki którym pomysł wsparcia dzieciaków w kilka dni przerodził się w rzeczywistość: to ludzie biznesu, informatycy, prawnicy, dziennikarze, a przede wszystkim darczyńcy.
                </Typography>
                <Typography variant="subtitle1" className={classes.description}>
                    <b>Zaczynamy od Krakowa, z myślą, że poszerzymy akcję na kolejne miasta</b>. W stolicy Małopolski chcemy dostarczyć dzieciom <b>1000 komputerów</b> z zapewnieniem dostępu do Internetu. Szukamy osób, które razem z nami zorganizują akcję w innych miastach.
                </Typography>
                <Typography variant="subtitle1" className={classes.description}>
                    Cieszymy się, że powstaje wiele podobnych inicjatyw lokalnych, a także programy publiczne. Działamy we wspólnym celu, a potrzeby są ogromne. Tysiące dzieci jest wykluczonych cyfrowo. <b>Razem możemy naprawdę wiele!</b>
                </Typography>
                <Typography variant="subtitle1" className={classes.description}>
                    Podsumowując: <b>jesteś brakującym elementem naszej układanki</b>. Aby wszystko dobrze się ułożyło niewiele potrzeba – <b>po prostu #DajżeKompa</b>
                </Typography>
                <Typography variant="subtitle1" className={classes.description}>
                    PS.: Nie zapomnij podzielić się tą informacją w swoich social mediach! #DajżeKompa
                </Typography>
                <div className={classes.actions}>
                    <Button variant="contained" color="primary">Podaruj kompa</Button>
                    <Button variant="outlined" color="primary">Zgłoś potrzebę</Button>
                </div>
            </section>
            <aside className={classes.sidebar}>
                {mobile && <Separator />}
                <ProgramSummary />
                <Partners {...(mobile ? {} : { vertical: true })} />
            </aside>
        </div>
    );
}

export default AboutPage;
