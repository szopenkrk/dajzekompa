/* Libraries */
import React from 'react';
import { makeStyles, Typography, Button, useMediaQuery, useTheme } from '@material-ui/core';

/* Application files */
import flowDesktop from 'client/assets/images/parties-flow-desktop.png';
import flowMobile from 'client/assets/images/parties-flow-mobile.png';
import SubPage from 'client/pages/SubPage';
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    description: {
        lineHeight: 1.33,
        paddingBottom: 35
    },
    image: {
        width: '100%',
        paddingBottom: 40,
        [theme.breakpoints.down('sm')]: {
            width: 245,
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
    const theme = useTheme();
    const classes = useStyles();
    const mobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <SubPage title="O akcji">
            <Typography variant="subtitle1" className={classes.description}>
                W związku z epidemią koronawirusa szkoły rozpoczęły pracę z uczniami on-line. Niestety, <b>nie wszystkie dzieci, a także nie wszyscy nauczyciele</b> mają dostęp do komputera, tableta czy Internetu.
            </Typography>
            <Typography variant="subtitle1" className={classes.description}>
                <b>#DajżeKompa</b> - jeśli posiadasz <b>nieużywany sprzęt komputerowy przekaż go</b> na potrzeby naszej akcji. Będziemy razem walczyć z wykluczeniem cyfrowym.
            </Typography>
            <img src={mobile ? flowMobile : flowDesktop} className={classes.image} />
            <Typography variant="subtitle1" className={classes.description}>
                To bardzo proste: zgłoś chęć udziału w akcji przez naszą stronę internetową, przygotuj sprzęt, który chcesz przekazać: wyczyść prywatne pliki, zapakuj sprzęt i nadaj paczkę przez paczkomat InPost. Resztą zajmiemy się my. Zadbamy, aby sprzęt został poddany kwarantannie, zdezynfekowany, przygotowany do potrzeb zadań on-line i oczywiście dostarczymy go do osób, które go potrzebują. Co ważne - zostanie on u nich na zawsze. Zajmiemy się też wszystkimi kwestiami prawnymi i podatkowymi.
            </Typography>
            <Typography variant="subtitle1" className={classes.description}>
                Inicjatorem akcji są <b>krakowskie firmy</b> wspierane przez <b>Urząd Miasta Krakowa i Fundację Poland Business Run</b>. Do pomocy zgłosiło się <b>wiele osób chcących pomagać</b>, dzięki którym pomysł wsparcia dzieci w kilka dni przerodził się w rzeczywistość: to ludzie biznesu, informatycy, prawnicy, dziennikarze, a przede wszystkim darczyńcy.
            </Typography>
            <Typography variant="subtitle1" className={classes.description}>
                <b>Zaczynamy od Krakowa, z myślą, że poszerzymy akcję na kolejne miasta</b>. W stolicy Małopolski chcemy dostarczyć dzieciom <b>1000 komputerów</b> z dostępem do Internetu. Szukamy osób, które razem z nami zorganizują akcję w innych miastach.
            </Typography>
            <Typography variant="subtitle1" className={classes.description}>
                Cieszymy się, że powstaje wiele podobnych inicjatyw lokalnych, a także programy publiczne. Działamy we wspólnym celu, a potrzeby są ogromne. Tysiące dzieci jest wykluczonych cyfrowo.  <b>Razem możemy naprawdę wiele!</b>
            </Typography>
            <Typography variant="subtitle1" className={classes.description}>
                Podsumowując: <b>jesteś brakującym elementem naszej układanki</b>. Aby wszystko dobrze się ułożyło niewiele potrzeba – <b>po prostu #DajżeKompa</b>
            </Typography>
            <Typography variant="subtitle1" className={classes.description}>
                PS.: Nie zapomnij podzielić się tą informacją w swoich social mediach! #DajżeKompa
            </Typography>
            <div className={classes.actions}>
                <Button variant="contained" color="primary"><Link to="/podaruj-kompa">Podaruj kompa</Link></Button>
                <Button variant="outlined" color="primary"><Link to="/zglos-potrzebe">Zgłoś potrzebę</Link></Button>
            </div>
        </SubPage>
    );
}

export default AboutPage;
