/* Libraries */
import React from 'react';
import { makeStyles, Typography, Button, useMediaQuery, useTheme } from '@material-ui/core';
import {Link} from "react-router-dom";

/* Application files */
import Separator from 'client/components/Separator';
import Faq from 'client/components/Faq';
import SubPage from 'client/pages/SubPage';

const useStyles = makeStyles((theme) => ({
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
        answer: 'Szukamy głównie komputerów stacjonarnych, laptopów, tabletów, monitorów, klawiatur, myszek, kamerek, zestawów słuchawkowych, drukarek i innych działających urządzeń, które umożliwią dzieciom i nauczycielom podłączenie się do sieci i realizację nauki on-line.'
    },
    {
        question: 'Skąd mam wiedzieć czy mój komp jest potrzebny?',
        answer: 'Nieważny model, Mac vs. PC, Dell czy Acer, iPad vs Tablet Android - znajdziemy dobry dom dla twojego sprzętu*,  o ile jest w stanie obsłużyć nowoczesną przeglądarkę internetową, ma procesor 2,5 GHz (odpowiednik Intel Core 2 Duo i wzwyż), 4 GB RAM oraz kartę sieciową wifi (dowolną). Zalecany system Windows 10, ale jeśli go nie masz, to damy sobie radę. Generalnie, jeśli komputer nie jest bardzo stary, da się go odpalić, można na nim pisać i wszystko widać to wystarczy. Zanim sprzęt dotrze do dzieci i nauczycieli, wyślemy go do fachowca dla sprawdzenia, wgrania aktualnego oprogramowania i testowego uruchomienia.'
    },
    {
        question: 'Jak zgłosić sprzęt do oddania?',
        answer: 'Zrób zdjęcia wszystkim sprzętom, które chcesz przekazać. Wejdź na stronę www.dajzekompa.pl do zakładki „Podaruj Kompa”, wypełnij formularz i wgraj zdjęcia. Następnie czekaj na instrukcje, które zostaną przesłane na podany przez Ciebie e-mail. Poprosimy Cię o wydrukowanie etykiety, którą przykleisz na paczce, a także, ze względów podatkowych, o wypełnienie umowy darowizny na rzecz Fundacji lub wystawienie faktury o wartości jednego grosza.'
    },
    {
        question: 'Jak mam przygotować sprzęt?',
        answer: 'Zgraj wszystkie dane osobiste, po czym najlepiej zrób systemowy reset. Jeśli nie wiesz jak, nie martw się, nasi fachowcy wyczyszczą komputer za Ciebie. Następnie zapakuj sprzęt tak, jakbyś chciał go sprzedać na aukcji: jak najwięcej folii bąbelkowej dookoła i najlepiej, by był spakowany do jednego pudełka.'
    },
    {
        question: 'Jak wysłać paczkę?',
        answer: 'Dostawcą paczek będzie firma InPost. Podczas rejestracji zostaniesz poproszony o podanie swojego adresu e-mail, na który otrzymasz instrukcje oraz etykietę paczki InPost. Poprosimy Cię o jej wydrukowanie i przyklejenie na wierzchu paczki.'
    },
    {
        question: 'Jak moje dane osobowe będą chronione?',
        answer: 'Chronimy Twoje dane zgodnie z przepisami RODO. Twoje dane będą wykorzystywane tylko i wyłącznie na potrzeby akcji przez podmioty do tego upoważnione i nie będą przekazywane osobom trzecim. Tutaj możesz zobaczyć regulamin  opisujący szczegółowo politykę prywatności.'
    },
    {
        question: 'Skąd mam pewność, że mój komputer trafi do osoby potrzebującej?',
        answer: 'Listę uczniów i nauczycieli, którzy samodzielnie zgłoszą potrzebę poprzez stronę www.dajżekompa.pl zweryfikują, poprzez kontakt z Fundacją Poland Business Run, dyrektorzy szkół. Komputery trafią tylko do dzieci zagrożonych wykluczeniem cyfrowym oraz nauczycieli, którzy bez odpowiedniego sprzętu nie mogą realizować programu w sposób zdalny.'
    },
    {
        question: 'Co w sytuacji, kiedy po wysyłce sprzętu okaże się, że z przyczyn technicznych nie jest możliwe jego serwisowanie? ',
        answer: 'Po podpisaniu umowy lub wystawieniu FV właścicielem sprzętu staje się Fundacja Poland Business Run. Jeśli w trakcie serwisowania okaże się, że nie spełnia on wymagań technicznych, fundacja wraz z pracownikami serwisu podejmie decyzję na temat dalszego losu sprzętu (może zostać rozebrany na części lub zutylizowany). Prosimy raz jeszcze być zwrócił uwagę na minimalne dane techniczne sprzętu.'
    },
    {
        question: 'Czy ponoszę jakieś koszty związane z udziałem w akcji?',
        answer: 'Darczyńca nie ponosi żadnych kosztów. Odbiór komputera i jego przesyłkę zapewnia InPost, serwisowaniem zajmuje się firma FIXit. Po Twojej stronie zostaje tylko zgłoszenie sprzętu w formularzu, podpisanie umowy darowizny lub wystawienie faktury oraz przygotowanie go do wysyłki i sama wysyłka przez paczkomat.'
    },
    {
        question: 'A co z podatkiem?',
        answer: 'Zarówno darczyńca, jak i odbiorca nie muszą się martwić o kwestie podatkowe. Konieczne jest jednak wykonanie kilku prostych czynności. W mailu, który otrzymasz po wypełnieniu formularza na stronie, zostaniesz poproszony o wypełnienie umowy darowizny (dotyczy osób prywatnych lub firm) lub faktury (dotyczy firm) na kwotę jednego grosza i przesłanie jej do Fundacji Poland Business Run. Jest to konieczne ze względów podatkowych.'
    },
    {
        question: 'Czy ta akcja działa w moim mieście?',
        answer: 'Zaczęliśmy od Krakowa, mamy jednak nadzieję, że inicjatywa szybko ogarnie inne miasta. Zobacz na mapie czy tak się stało. Jeśli nie, może znasz ludzi, którzy chcieliby przejąć akcję w Twoim mieście. <Link to="/zglos-miasto"> Tu możesz zobaczyć jak to zrobić.</Link>'
    },
    {
        question: 'Czy ta akcja działa w moim mieście?',
        answer: 'Zaczęliśmy od Krakowa, mamy jednak nadzieję, że inicjatywa szybko ogarnie inne miasta. Zobacz na mapie czy tak się stało. Jeśli nie, może znasz ludzi, którzy chcieliby przejąć akcję w Twoim mieście. <Link to="/zglos-miasto"> Tu możesz zobaczyć jak to zrobić.</Link>'
    }
];

const items2 = [
    {
        question: 'Do kogo skierowana jest akcja?',
        answer: 'Akcja ma na celu wsparcie  krakowskich uczniów oraz nauczycieli, którzy na skutek braku lub niewystarczającej jakości posiadanego sprzętu nie są w stanie realizować w pełni nauki w formie online.'
    },
    {
        question: 'Co zrobić jeśli potrzebuję sprzętu? Gdzie mam się zgłosić?',
        answer: 'Wypełnij formularz zgłoszeniowy dostępny na stronie na naszej stronie w zakładce <Link to="/zglos-potrzebe">Zgłoś Potrzebę</Link>, zaznaczając w nim numer szkoły do której uczęszcza Twoje dziecko / w której uczysz. O weryfikację list organizatorzy poproszą dyrektorów szkół, którzy pomogą wyborze osób najbardziej potrzebujących. Osoby, które zostaną wytypowane do otrzymania sprzętu dostaną od nas zawiadomienie mailowo.'
    },
    {
        question: ' Czy akcja dotyczy tylko szkół państwowych czy również prywatnych?',
        answer: 'Akcja jest realizowana w ścisłej współpracy z Urzędem Miasta Krakowa i dotyczy szkół publicznych na terenie miasta.'
    },
    {
        question: 'Jestem dyrektorem / pracownikiem społecznym i znam osobę, która potrzebuje sprzętu. Jak mam zgłosić potrzebę?',
        answer: 'Poproś rodziców / opiekunów prawnych dziecka lub nauczyciela, który potrzebuje sprzętu o zgłoszenie się przez formularz na stronie www.dajzekompa.pl. Już dzisiaj z góry dziękujemy za pomoc w dotarciu do osób najbardziej potrzebujących. '
    },
    {
        question: 'Jak sprzęt dotrze do potrzebującego?',
        answer: 'Po serwisie i dezynfekcji sprzętu, którym zajmuje się firma Fixit, sprzęt zostanie przekazany firmie InPost, która zadba o jej doręczenie do właściwego paczkomatu, zgodnego z adresem zamieszkania osoby potrzebującej. Odbiorca dostanie powiadomienie na swój telefon, gdy paczka będzie gotowa do odbioru i będzie miał 48h na wyjęcie jej z paczkomatu zlokalizowanego możliwie jak najbliżej jego miejsca zamieszkania. '
    },
    {
        question: 'Co w przypadku, gdy paczka nie zostanie odebrana we właściwym czasie?',
        answer: 'Na odbiór paczki masz 48 godzin. Po tym czasie sprzęt wróci do firmy Fixit i będziemy kontaktować się z odbiorcą w celu sprawdzenia sytuacji.'
    },
    {
        question: 'Czy sprzęt będzie bezpieczny (poddany dezynfekcji)?',
        answer: 'Tak, każdy przekazany nam sprzęt poddawany jest 24-godzinnej kwarantannie w firmie serwisującej. Następnie jest wyczyszczony, a na koniec, po wykonaniu wszelkich czynności serwisujących zdezynfekowany. Po odebraniu paczki najlepiej odczekać 24 godziny przed jej otworzeniem.'
    },
    {
        question: 'Jestem opiekunem obdarowanego dziecka, czy zapłacę podatek?',
        answer: 'Nie będziesz musiał płacić podatku. Będziesz musiał jednak zaznaczyć odpowiednie zgody na stronie www.dajzekompa.pl podczas zgłaszania potrzeby na sprzęt..'
    },
    {
        question: 'Czy jako obdarowany ponoszę jakiekolwiek koszty związane z udziałem w akcji? ',
        answer: 'Nie, cała akcja dzięki wsparciu krakowskich firm oraz Urzędu Miasta Krakowa jest tak przygotowana, by osoba potrzebująca nie musiała ponosić żadnych kosztów związanych ze sprzętem lub jego dostarczeniem. '
    },
    {
        question: 'Na jak długo otrzymam sprzęt? ',
        answer: 'Sprzęt trafia do obdarowanego na stałe. Liczymy na to, że pomoże mu w nauce i rozwoju nie tylko w czasie kwarantanny, ale także później. '
    },
    {
        question: 'Nie mam internetu, co mam zrobić?',
        answer: 'Celem naszej akcji jest zaopatrzenie Twojego dziecka / Ciebie w sprawny sprzęt pozwalający na jak najlepszą realizację nauki online. Nie zapewniamy dostępu do Internetu. Wiemy jednak, że jest wiele firm i fundacji, które w dobie pandemii zdecydowały się zająć tą sprawą. Kontakt z nimi jest po Twojej stronie. Będziemy starać się informować o takich inicjatywach za pośrednictwem naszych kanałów komunikacji.'
    },
    {
        question: 'Otrzymałem komputer, co dalej?',
        answer: '1. Odczekaj minimum 24 godziny\n' +
            ' 2. Pozwól dziecku otworzyć paczkę\n' +
            ' 3. Zachęcamy do zrobienia filmiku lub zdjęcia (jak dziecko otwiera paczkę lub po otrzymaniu prezentu) i umieszczenia go na naszym kanale Facebooka Dajże Kompa i na Twój profil z hashtagiem #DajżeKompa\n' +
            ' 4. Użytkuj sprzęt zgodnie z przeznaczeniem\n'
    },
];

const items3 = [
    {
        question: 'Akcji #DajżeKompa nie ma w moim mieście? Dlaczego? Jak sprawić, by się pojawiła?',
        answer: 'Pierwszymi organizatorami akcji były firmy i instytucje z Krakowa. Każdy z nas poświęca swój czas równolegle do pracy zawodowej i często w czasie wolnym. Nie mamy więc możliwości działać we wszystkich miastach. Jesteśmy jednak bardzo otwarci na dołączanie się innych miejscowości i chętnie pomożemy w rozkręcaniu akcji. \n'
    },
    {
        question: 'Jak zainicjować akcję w Twoim mieście?',
        answer: '1. Zbierz ekipę: \n' +
            'a. Project Managerów odpowiedzialnych za zarządzanie akcją\n' +
            'b. Osoby/firmy, które będą odpowiadały za serwis sprzętu\n' +
            'c. Firmę/ludzi, którzy zapewnią logistykę, czyli dostarczą paczki\n' +
            'd.Lokalne wsparcie marketingowe i PR-owe \n' +
            '2. Zaangażuj niezbędne organy w Twoim urzędzie miasta np. wydział edukacji lub komunikacji\n' +
            '3. Następnie skontaktuj się z Fundacją Poland Business Run: dajzekompa@polandbusinessrun.pl\n'
    },
    {
        question: 'Na jaką pomoc możesz liczyć zaczynając akcję w Twoim mieście?',
        answer: '1. Stronę i system do obsługi projektu\n' +
            '2. Podstawy prawne, w tym wzory dokumentów\n' +
            '3. Know how i doradztwo jak rozkręcić akcję \n' +
            '4. Materiały PR-owe i marketingowe\n' +
            '5. Satysfakcję z zaangażowania w dobrą sprawę\n'
    },
]

export function FaqPage () {
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down('sm'));
    const classes = useStyles();

    return (
        <SubPage title="Faq">
            <h1>Weźże mi wytłumacz...</h1>
            <Faq items={items} title="Dla Kompo-dawców: " showToggleAll={!mobile} />
            <div className={classes.actions}>
                <Button variant="contained" color="primary"><Link to="/podaruj-kompa">Podaruj kompa</Link></Button>
            </div>
            <Separator className={classes.separator} />
            <Faq items={items2} title="Dla Kompo-biorców:" showToggleAll={!mobile} />
            <Separator className={classes.separator} />

            <Faq items={items3} title="Dla Ekip w Innych Miastach" showToggleAll={!mobile} />
            <Typography variant="body2">* Proszę o nie wysyłanie dosłownie złomu. Potrzebny jest działający sprzęt. Więc jak dobrze wiesz, że twój Commodore w piwnicy odał swój ostatni oddech w latach 90-tych, prosze nie przekazywać złomu dalej.</Typography>
        </SubPage>
    );
}

export default FaqPage;
