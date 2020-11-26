/* Libraries */
import React from 'react';
import { makeStyles, Typography, useMediaQuery, useTheme } from '@material-ui/core';

/* Application files */
import Config from 'client/lib/config';
import Separator from 'client/components/Separator';
import Faq from 'client/components/Faq';
import SubPage from 'client/pages/SubPage';
import FaqItem from 'client/components/FaqItem';

import imageFlowGiversDesktop from 'client/assets/images/faq-givers-desktop.png';
import imageFlowGiversMobile from 'client/assets/images/faq-givers-mobile.png';
import imageFlowReceiversDesktop from 'client/assets/images/faq-receivers-desktop.png';
import imageFlowReceiversMobile from 'client/assets/images/faq-receivers-mobile.png';
import imageFlowCitiesDesktop from 'client/assets/images/faq-cities-desktop.png';
import imageFlowCitiesMobile from 'client/assets/images/faq-cities-mobile.png';

const useStyles = makeStyles((theme) => ({
    actions: {
        display: 'flex',
        justifyContent: 'center',
        padding: `${theme.spacing(2)}px 0`,
        '& > *': {
            margin: theme.spacing(1),
            '&:first-of-type': {
                marginLeft: 0
            }
        }
    },
    separator: {
        margin: '30px 0',
        backgroundColor: theme.palette.primary.main
    },
    link: {
        color: theme.palette.primary.main
    },
    letteredList: {
        listStyleType: 'lower-alpha'
    },
    faq: {
        paddingTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& ol': {
            paddingLeft: theme.spacing(2)
        }
    },
    image: {
        maxWidth: '100%',
        paddingTop: theme.spacing(2)
    }
}));

export function FaqPage () {
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down('sm'));
    const classes = useStyles();
    const mail = Config.CONTACT_EMAIL;

    return (
        <SubPage title="Faq">
            <Typography variant="h6">Weźże mi wytłumacz...</Typography>
            <Faq title="Dla Kompo-dawców" showToggleAll={!mobile} className={classes.faq}>
                <img src={mobile ? imageFlowGiversMobile : imageFlowGiversDesktop} className={classes.image} />
                <FaqItem title="Jakiego rodzaju sprzęt jest potrzebny?">
                    Szukamy głównie komputerów stacjonarnych i laptopów. Dodatkowo: tabletów, monitorów, klawiatur, myszek, kamerek, zestawów słuchawkowych, drukarek i innych działających urządzeń, które umożliwią dzieciom i nauczycielom podłączenie się do sieci i realizację nauki on-line.
                </FaqItem>
                <FaqItem title="Skąd mam wiedzieć czy mój komp jest potrzebny?">
                Nieważny model, Mac vs. PC, Dell czy Acer, iPad vs Tablet Android, o ile jest w stanie obsłużyć
nowoczesną przeglądarkę internetową, ma procesor 2,5 GHz (odpowiednik Intel Core 2 Duo i
wzwyż), 4 GB RAM oraz kartę sieciową WI-FI (dowolną). Zalecany system to Windows 10, ale
jeśli go nie masz, to damy sobie radę. Prosimy o niewysyłanie elektrośmieci. Potrzebujemy
działającego sprzętu, więc jeśli Twój Commodore64 w piwnicy oddał swój ostatni oddech w lat
90-tych, to niech tam zostanie. Zanim sprzęt dotrze do dzieci i nauczycieli, wyślemy go do
fachowca dla sprawdzenia, wgrania aktualnego oprogramowania i testowego uruchomienia.
                </FaqItem>
                <FaqItem title="Jak zgłosić sprzęt do oddania?">
                Skontaktuj się z nami przez wiadomość mailową na adres: dajzekompa@polandbusinessrun.pl
                </FaqItem>
                <FaqItem title="Jak mam przygotować sprzęt?">
                Zgraj wszystkie dane osobiste, możesz także zrobić systemowy reset. Jeśli nie będziesz
umiał/mógł tego zrobić dane wyczyści nasz serwis komputerowy. Zapakuj sprzęt tak, jakbyś
chciał go sprzedać na aukcji: jak najwięcej folii bąbelkowej dookoła, papierowy karton. Tak, aby
trafił bezpiecznie do firmy serwisującej.
                </FaqItem>
                <FaqItem title="Jak wysłać paczkę?">
                Razem omówimy formę odbioru sprzętu od Ciebie, natomiast obdarowany będzie mógł go odebrać poprzez Paczkomat.
                </FaqItem>
                <FaqItem title="Jak moje dane osobowe będą chronione?">
                Chronimy Twoje dane zgodnie z przepisami RODO. Twoje dane będą wykorzystywane tylko i wyłącznie na potrzeby akcji przez podmioty do tego upoważnione i nie będą przekazywane osobom trzecim. Tutaj możesz zobaczyć regulamin opisujący szczegółowo politykę prywatności.
                </FaqItem>
                <FaqItem title="Skąd mam pewność, że mój komputer trafi do osoby potrzebującej?">
                Listę uczniów i nauczycieli, którzy samodzielnie zgłosili potrzebę poprzez stronę www.dajżekompa.pl zweryfikowali poprzez kontakt z Fundacją Poland Business Run dyrektorzy szkół. Komputery trafią tylko do dzieci zagrożonych wykluczeniem cyfrowym oraz nauczycieli, którzy bez odpowiedniego sprzętu nie mogą realizować programu w sposób zdalny.
                </FaqItem>
                <FaqItem title="Co w sytuacji, kiedy po wysyłce sprzętu okaże się, że z przyczyn technicznych nie jest możliwe jego serwisowanie?">
                Po podpisaniu umowy lub wystawieniu FV właścicielem sprzętu staje się Fundacja Poland Business Run. Jeśli w trakcie serwisowania okaże się, że nie spełnia on wymagań technicznych, fundacja wraz z pracownikami serwisu podejmie decyzję na temat dalszego losu sprzętu (może zostać rozebrany na części lub zutylizowany). Prosimy raz jeszcze byś zwrócił uwagę na minimalne dane techniczne sprzętu.
                </FaqItem>
                <FaqItem title="Czy ponoszę jakieś koszty związane z udziałem w akcji?">
                Darczyńca nie ponosi żadnych kosztów. Odbiór komputera zapewnia akcja (m.in. InPost), serwisowaniem zajmuje się firma FIXit. Po Twojej stronie zostaje tylko zgłoszenie sprzętu w formularzu, podpisanie umowy darowizny lub wystawienie faktury oraz przygotowanie komputera do wysyłki.
                </FaqItem>
                <FaqItem title="A co z podatkiem?">
                Zarówno darczyńca, jak i odbiorca nie muszą się martwić o kwestie podatkowe. Konieczne jest jednak wykonanie kilku prostych czynności. Zostaniesz poproszony o wypełnienie umowy darowizny (dotyczy osób prywatnych lub firm) lub faktury (dotyczy firm) na kwotę jednej złotówki i przesłanie jej do Fundacji Poland Business Run. Jest to konieczne ze względów podatkowych.
                </FaqItem>
                <FaqItem title="Gdzie działacie?">
                Działamy na terenie Krakowa i pomagamy krakowskim rodzinom. Współpracujemy głównie z lokalnymi firmami, ale nie tylko. Jeśli jesteś z innej części Polski czy nawet świata i masz nieużywany sprzęt komputerowy, prosimy, skontaktuj się z nami.
                </FaqItem>
                {/* <FaqItem title="A co z podatkami, kiedy chcę przekazać laptopa lub tablet?">
                    Przekazanie laptopów oraz tabletów nastąpi w formie darowizny. W wiadomości e-mail prześlemy Ci odpowiednią umowę do wypełnienia. Na podstawie aktualnego Rozporządzenia darowizna laptopów i tabletów, które nam przekazujesz, jest opodatkowana stawką 0%. Oznacza to, że nie będziesz musiał zapłacić VATu od darowizny, ani dokonywać ewentualnej korekty VATu naliczonego. Wciąż jednak występuje konieczność wykazania tej transakcji w deklaracji VAT jako sprzedaż opodatkowana stawką 0% - pole 13 deklaracji VAT-7(20), wskazując jako podstawę opodatkowania wartość rynkową laptopa lub tabletu. Powiadom o tym swojego księgowego.
                </FaqItem>
                <FaqItem title="A co z podatkami, kiedy chcę przekazać sprzęt innego rodzaju?">
                    Przekazanie sprzętu innego niż objęty Rozporządzeniem nastąpi w formie sprzedaży. Fundacja przeleje złotówkę na podany przez Ciebie numer konta w formularzu z zakładki „Podaruj kompa”. W wiadomości e-mail otrzymasz dokładniejsze instrukcje oraz dane potrzebne do wystawienia faktury lub rachunku.
                    Jeżeli jednak wypełniając formularz zaznaczysz, że chcesz przekazać należną Ci złotówkę na cele statutowe Fundacji, w wiadomości e-mail prześlemy Ci umowę darowizny do wypełnienia i wówczas Fundacja nie dokona przelewu. Zachęcamy Cię do tego rozwiązania. Upewnij się tylko, czy będzie ono dla Ciebie odpowiednie pod względem podatkowym.
                </FaqItem>
                <FaqItem title="Po co mam podawać numer konta?">
                    Numer konta jest nam potrzebny, aby przelać Ci na konto symboliczną złotówkę jako zapłatę za przekazany nam sprzęt, jeśli przekazując go wybierzesz opcję sprzedaży, a nie darowizny. Dzięki temu nie musisz się martwić kwestiami podatkowymi. Więcej informacji znajdziesz w odpowiedzi na pytanie „A co z podatkami, kiedy chcę przekazać sprzęt innego rodzaju?”.
                </FaqItem>
                <FaqItem title="Dlaczego prosimy Cię o podanie adresu zamieszkania?">
                    Może się okazać, że z różnych powodów komputer nie będzie mógł być nadany przez paczkomat (np. będzie za duży). Znajdziemy wtedy rozwiązanie, aby odebrać go od Ciebie bezpośrednio.
                </FaqItem>
                <FaqItem title="Czy można zawieźć sprzęt osobiście? Gdzie?">
                Niestety nie ma takiej opcji. Chcemy, aby przekazywanie sprzętu odbywało się bezkontaktowo, dlatego też zachęcamy do korzystania z paczkomatów.
                </FaqItem> */}
            </Faq>
            <Typography variant="caption">
                * Prosimy o niewysyłanie elektrośmieci. Potrzebujemy działającego sprzętu. Więc jeśli Twój Commodore64 w piwnicy oddał swój ostatni oddech w lat 90-tych, to niech tam zostanie.
            </Typography>
            <Separator className={classes.separator} />
            <Faq title="Dla Kompo-biorców" showToggleAll={!mobile} className={classes.faq}>
                <img src={mobile ? imageFlowReceiversMobile : imageFlowReceiversDesktop} className={classes.image} />
                <FaqItem title="Do kogo skierowana jest akcja?">
                Akcja ma na celu wsparcie krakowskich uczniów oraz nauczycieli, którzy na skutek braku lub niewystarczającej jakości posiadanego sprzętu nie są w stanie realizować w pełni nauki w formie on-line.
                </FaqItem>
                <FaqItem title="Czy akcja dotyczy tylko szkół państwowych czy również prywatnych?">
                Akcja jest realizowana w ścisłej współpracy z Urzędem Miasta Krakowa i dotyczy szkół publicznych na terenie miasta.
                </FaqItem>
                <FaqItem title="Jak sprzęt dotrze do potrzebującego?">
                Po serwisie i dezynfekcji sprzętu, którym zajmuje się firma Fixit, sprzęt zostanie przekazany firmie InPost, która zadba o jej doręczenie do właściwego paczkomatu, zgodnego z adresem zamieszkania osoby potrzebującej. Odbiorca dostanie powiadomienie na swój telefon, gdy paczka będzie gotowa do odbioru i będzie miał 48h na wyjęcie jej z paczkomatu zlokalizowanego możliwie jak najbliżej jego miejsca zamieszkania.
                </FaqItem>
                <FaqItem title="Co w przypadku, gdy paczka nie zostanie odebrana we właściwym czasie?">
                Na odbiór paczki masz 48 godzin. Po tym czasie sprzęt wróci do firmy Fixit i będziemy kontaktować się z odbiorcą w celu sprawdzenia sytuacji.
                </FaqItem>
                <FaqItem title="Czy sprzęt będzie bezpieczny (poddany dezynfekcji)?">
                    Tak, każdy przekazany nam sprzęt poddawany jest 24-godzinnej kwarantannie w firmie serwisującej. Następnie jest wyczyszczony, a na koniec, po wykonaniu wszelkich czynności serwisujących zdezynfekowany. Po odebraniu paczki najlepiej odczekać 24 godziny przed jej otwarciem.
                </FaqItem>
                <FaqItem title="Czy jako obdarowany poniosę jakiekolwiek koszty związane z udziałem w akcji?">
                Nie, cała akcja dzięki wsparciu krakowskich firm oraz Urzędu Miasta Krakowa jest tak przygotowana, by osoba potrzebująca nie musiała ponosić żadnych kosztów związanych ze sprzętem lub jego dostarczeniem.
                </FaqItem>
                <FaqItem title="Na jak długo otrzymam sprzęt?">
                Sprzęt trafia do obdarowanego na zawsze. Liczymy na to, że pomoże mu w nauce i rozwoju nie tylko w czasie kwarantanny, ale także później.
                </FaqItem>
                <FaqItem title="Nie mam Internetu, co mam zrobić?">
                    Celem naszej akcji jest zaopatrzenie Twojego dziecka/Ciebie w sprawny sprzęt pozwalający na jak najlepszą realizację nauki on-line. Nie zapewniamy dostępu do Internetu. Wiemy jednak, że jest wiele firm i fundacji, które w dobie pandemii zdecydowały się zająć tą potrzebą. Kontakt z nimi jest po Twojej stronie. <b>Będziemy</b> starać się <b>informować</b> o takich inicjatywach za pośrednictwem naszych kanałów komunikacji.
                </FaqItem>
                <FaqItem title="Otrzymałem komputer, co dalej?">
                    <ol>
                        <li>Odczekaj minimum 24 godziny</li>
                        <li>Pozwól dziecku otworzyć paczkę :)</li>
                        <li>Zachęcamy do zrobienia filmiku lub zdjęcia (jak dziecko otwiera paczkę lub po otrzymaniu prezentu) i umieszczenia go na naszym kanale Facebook Dajże Kompa (@DajzeKompa) i na Twój profil z hashtagiem #DajżeKompa</li>
                        <li>Użytkuj sprzęt zgodnie z przeznaczeniem</li>
                    </ol>
                </FaqItem>
                <FaqItem title="Jak przebiega proces weryfikacji uczniów?">
                    Fundacja jest w stałym kontakcie ze szkołami, otrzymuje od dyrektorów listy z nazwiskami uczniów, którzy najpilniej potrzebują pomocy. Na tej podstawie Fundacja podejmuje decyzje. Jeśli nazwisko ucznia zgłoszonego przez formularz znajduje się na tej liście, uważamy, że jest pozytywnie zweryfikowany.
                </FaqItem>
                <FaqItem title="Jak długo będzie trwała akcja?">
                    Akcję planowaliśmy do czasu powrotu dzieci do szkoły, ale sytuacja zmienia się dynamicznie.
                </FaqItem>
                <FaqItem title="Wypełniłem formularz, kiedy otrzymam sprzęt dla dziecka?">
                Niestety nie jesteśmy w stanie podać czasu oczekiwania na komputery i laptopy. Możemy dać tylko to, co dostaniemy. Staramy się ze wszystkich sił, ale potrzeby są znacznie większe niż ilość sprzętu, którym dysponujemy. Czasu wymaga także przegląd sprzętu i weryfikacja potrzebujących. Bardzo prosimy o cierpliwość.
                </FaqItem>
            </Faq>
            <Separator className={classes.separator} />
            <Faq title="Dla Ekip w innych Miastach" showToggleAll={!mobile} className={classes.faq}>
                <img src={mobile ? imageFlowCitiesMobile : imageFlowCitiesDesktop} className={classes.image} />
                <FaqItem title="Akcji #DajżeKompa nie ma w moim mieście? Dlaczego? Jak sprawić, by się pojawiła?">
                    Pierwszymi organizatorami akcji były firmy i instytucje z Krakowa. Każdy z nas poświęca swój czas równolegle do pracy zawodowej i często w czasie wolnym. Nie mamy więc możliwości działać we wszystkich miastach. Jesteśmy jednak bardzo otwarci na dołączanie się innych miejscowości i chętnie pomożemy w rozkręcaniu akcji.
                </FaqItem>
                <FaqItem title="Jak zainicjować akcję w Twoim mieście?">
                    <ol>
                        <li>
                            Zbierz ekipę:
                            <ol className={classes.letteredList}>
                                <li><b>Project Managerów</b> odpowiedzialnych za zarządzanie akcją</li>
                                <li>Osoby/firmy, które będą odpowiadały za <b>serwis</b> sprzętu</li>
                                <li>Firmę/ludzi, którzy zapewnią <b>logistykę</b>, czyli dostarczą paczki</li>
                                <li>Lokalne wsparcie <b>marketingowe i PR-owe</b></li>
                            </ol>
                        </li>
                        <li>Zaangażuj <b>niezbędne organy w Twoim urzędzie miasta</b> np. wydział edukacji lub komunikacji</li>
                        <li>Następnie skontaktuj się z <b>Fundacją Poland Business Run</b>: {mail}</li>
                    </ol>
                </FaqItem>
                <FaqItem title="Na jaką pomoc możesz liczyć zaczynając akcję w Twoim mieście?">
                    <ol>
                        <li>Stronę i system do obsługi projektu</li>
                        <li>Podstawy prawne, w tym wzory dokumentów</li>
                        <li>Know how i doradztwo jak rozkręcić akcję</li>
                        <li>Materiały PR-owe i marketingowe</li>
                        <li>Satysfakcję z zaangażowania w dobrą sprawę</li>
                    </ol>
                </FaqItem>
                <FaqItem title="W moim mieście jest już podobna inicjatywa, czy warto angażować się w jeszcze jedną?">
                    Cieszymy się, że powstaje wiele podobnych inicjatyw lokalnych, a także programy publiczne. Im więcej tym lepiej! Działamy we wspólnym celu, a potrzeby są ogromne. Tysiące dzieci są wykluczone cyfrowo.
                </FaqItem>
                <FaqItem title="Niedługo zapewne dzieci wrócą do szkół, czy warto jeszcze się angażować?">
                    Naszym celem jest walka z wykluczeniem cyfrowym nie tylko w czasie kryzysu. Według danych Centrum Cyfrowego, co czwarte dziecko w Polsce musi współdzielić sprzęt komputerowy z innymi domownikami. Wiele dzieci nie ma odpowiedniego sprzętu w ogóle. Chcemy to zmieniać.
                </FaqItem>
            </Faq>
        </SubPage>
    );
}

export default FaqPage;

