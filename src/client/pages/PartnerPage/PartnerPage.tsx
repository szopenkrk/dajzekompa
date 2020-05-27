/* Libraries */
import React from 'react';
import { makeStyles, Typography, Button, useMediaQuery, useTheme } from '@material-ui/core';

/* Application files */
import flowDesktop from 'client/assets/images/faq-givers-desktop.png';
import flowMobile from 'client/assets/images/faq-givers-mobile.png';
import SubPage from 'client/pages/SubPage';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
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

export function PartnerPage () {
    const theme = useTheme();
    const classes = useStyles();
    const mobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <SubPage title="Partnarzy akcji">
            <section className={classes.container}>
                <Typography variant="subtitle1" className={classes.description}>
                    W związku z pandemią koronawirusa szkoły realizują naukę z uczniami on-line. Niestety, <b>nie wszystkie dzieci, a także nie wszyscy nauczyciele</b> mają dostęp do komputera czy tabletu.
                </Typography>
                <Typography variant="subtitle1" className={classes.description}>
                    <b>#DajżeKompa</b> - jeśli posiadasz <b>niepotrzebny sprzęt komputerowy, przekaż go</b> na potrzeby naszej akcji. Będziemy razem walczyć z wykluczeniem cyfrowym.
                </Typography>
                <img src={mobile ? flowMobile : flowDesktop} className={classes.image} />
                <Typography variant="subtitle1" className={classes.description}>
                    To bardzo proste: <b>zgłoś chęć udziału</b> w akcji przez naszą stronę internetową, <b>przygotuj sprzęt</b>, który chcesz przekazać, wyczyść prywatne pliki, zapakuj sprzęt i <b>nadaj paczkę</b> przez paczkomat InPost. <b>Resztą zajmiemy się my</b>. Zadbamy, aby sprzęt został poddany kwarantannie, zdezynfekowany, przygotowany do potrzeb zadań on-line i oczywiście dostarczymy go do osób, które go potrzebują. Co ważne - <b>zostanie on u nich na zawsze</b>. Zajmiemy się też wszystkimi kwestiami prawnymi i podatkowymi.
                </Typography>
                <Typography variant="subtitle1" className={classes.description}>
                    Inicjatorem akcji są <b>krakowskie firmy</b> wspierane przez <b>Urząd Miasta Krakowa i Fundację Poland Business Run</b>. Do pomocy zgłosiło się <b>wiele osób</b>, dzięki którym pomysł wsparcia dzieci w kilka dni przerodził się w rzeczywistość: to ludzie biznesu, informatycy, prawnicy, dziennikarze, a przede wszystkim darczyńcy.
                </Typography>
                <Typography variant="subtitle1" className={classes.description}>
                    <b>Zaczynamy od Krakowa, z myślą, że poszerzymy akcję na kolejne miasta</b>. W samej stolicy Małopolski chcemy dostarczyć dzieciom przynajmniej <b>1000 komputerów</b> z dostępem do Internetu. Szukamy osób, które razem z nami zorganizują akcję w innych miastach.
                </Typography>
                <Typography variant="subtitle1" className={classes.description}>
                    Cieszymy się, że powstaje wiele podobnych inicjatyw lokalnych, a także programy publiczne. Działamy we wspólnym celu, a potrzeby są ogromne. Tysiące dzieci jest wykluczonych cyfrowo. <b>Razem możemy naprawdę wiele!</b>
                </Typography>
                <Typography variant="subtitle1" className={classes.description}>
                    Podsumowując: <b>jesteś brakującym elementem naszej układanki</b>. Aby wszystko dobrze się ułożyło niewiele potrzeba – <b>po prostu #DajżeKompa</b>
                </Typography>
                <Typography variant="subtitle1" className={classes.description}>
                    PS.: Nie zapomnij podzielić się tą informacją w swoich social mediach #DajżeKompa
                </Typography>
                <div className={classes.actions}>
                    <Link to="/podaruj-kompa"><Button variant="contained" color="primary">Podaruj kompa</Button></Link>
                    <Link to="/zglos-potrzebe"><Button variant="outlined" color="primary">Zgłoś potrzebę</Button></Link>
                </div>
            </section>
        </SubPage>
    );
}

export default PartnerPage;
