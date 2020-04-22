/* Libraries */
import React from 'react';
import { Typography, TableContainer, TableBody, TableRow, TableCell, Table, makeStyles } from '@material-ui/core';

/* Application files */
import Config from 'client/lib/config';
import SubPage from 'client/pages/SubPage';

const useStyles = makeStyles((theme) => ({
    container: {
        fontSize: '0.875rem',
        fontFamily: 'Roboto',
        color: 'rgba(0, 0, 0, 0.87)',
        paddingTop: theme.spacing(3),
        '& ol, & ul': {
            paddingLeft: theme.spacing(3)
        },
        '& li': {
            padding: `${theme.spacing(1)}px 0`
        }
    },
    table: {
        '& td': {
            verticalAlign: 'top',
            border: 0
        }
    },
    highlight: {
        color: theme.palette.primary.main
    },
    letteredList: {
        listStyleType: 'lower-alpha'
    },
    title: {
        width: '100%',
        textAlign: 'center',
        padding: `${theme.spacing(1)}px 0`
    }
}));

export function TermsPage () {
    const classes = useStyles();
    const url = window.location.host;
    const mail = Config.CONTACT_EMAIL;

    return (
        <SubPage className={classes.container}>
            <Typography variant="h5" className={classes.title}>Regulamin akcji &quot;Dajże kompa&quot;</Typography>
            <br />
            <p>Niniejszy Regulamin określa zasady świadczenia i korzystania z usług świadczonych drogą elektroniczną oferowanych przez Właściciela Serwisu za pośrednictwem strony internetowej dostępnej pod adresem <span className={classes.highlight}>{url}</span> oraz zasady prowadzenia akcji charytatywnej „Dajże Kompa” organizowanej przez Fundację.</p>
            <br />
            <Typography variant="h6" className={classes.title}>1. Postanowienia ogólne</Typography>
            <ol>
                <li>Organizatorem akcji jest Fundacja Poland Business Run z siedzibą w Krakowie, ul. Siemiradzkiego 17/2, 31-137 Kraków (zwana w dalszej części regulaminu Fundacją)</li>
                <li>Partnerami akcji są Wydział Edukacji Urzędu Miasta Krakowa, BKode sp. z o.o., Spaczyński Szczepaniak i Wspólnicy sp.k., FIXIT SA, Talent Alpha sp. z o. o., InPost</li>
                <li>Niniejszy Regulamin określa zasady świadczenia i korzystania z usług świadczonych drogą elektroniczną oferowanych przez Właściciela Serwisu za pośrednictwem strony internetowej dostępnej pod adresem <span className={classes.highlight}>{url}</span> oraz zasady prowadzenia akcji charytatywnej „Dajże Kompa” organizowanej przez Fundację.</li>
            </ol>
            <Typography variant="h6" className={classes.title}>2. Definicje</Typography>
            <p>Na potrzeby Regulaminu zostają uzgodnione definicje wskazane poniżej.</p>
            <TableContainer>
                <Table className={classes.table}>
                    <TableBody>
                        <TableRow>
                            <TableCell><b>Dający kompa</b></TableCell>
                            <TableCell>
                                Użytkownik, który wysyła wypełniony formularz z zakładki „Podaruj Kompa”, przekazując w ten sposób Fundacji Sprzęt.
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><b>Dajże kompa</b></TableCell>
                            <TableCell>
                                prowadzona przez Fundację akcja charytatywna mająca na celu zaangażowanie środowisk biznesowych w działanie na rzecz społeczności lokalnych oraz środowisk potrzebujących wsparcia, w szczególności umożliwienie dzieciom ze środowisk wykluczenia cyfrowego naukę zdalną poprzez dostarczenie im odpowiedniego sprzętu komputerowego umożliwiającego pobieranie nauki w sposób zdalny; a także umożliwienie nauczycielom niewyposażonym w odpowiedni sprzęt komputerowy prowadzenie zajęć dydaktycznych w formie zdalnej.
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><b>Etykieta</b></TableCell>
                            <TableCell>
                                etykieta nadawcza obejmująca dane umożliwiające Firmie Kurierskiej dostarczenie Sprzętu
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><b>Firma kurierska</b></TableCell>
                            <TableCell>
                                przedsiębiorca świadczący na rzecz Fundacji usługi przyjmowania, przemieszczania i doręczenia przesyłek obejmujących Sprzęt.
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><b>Fundacja</b></TableCell>
                            <TableCell>
                                Fundacja Poland Business Run z siedzibą w Krakowie, ul. Henryka Siemiradzkiego, nr 17, lok. 2, 31-137 Kraków, wpisana do Rejestru Stowarzyszeń, Innych Organizacji Społecznych i Zawodowych, Fundacji i Publicznych Zakładów Opieki Zdrowotnej Krajowego Rejestru Sądowego prowadzonego przez Sąd Rejonowy dla Krakowa - Śródmieścia, XI Wydział Gospodarczych pod nr KRS 0000617320, NIP 6762507232, REGON 364424465, adres poczty elektronicznej biuro@polandbusinessrun.pl.
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><b>Obdarowany</b></TableCell>
                            <TableCell>
                                dziecko albo nauczyciel, którego zgłoszenie do akcji Dajże Kompa przeszło pozytywną weryfikację – do którego trafi nabyty w ramach akcji Sprzęt.
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><b>Paczkomat</b></TableCell>
                            <TableCell>
                                elektroniczna szafa depozytowa (urządzenie) należąca i obsługiwana przez Firmę Kurierską InPost, umożliwiająca samoobsługowe nadanie przesyłki obejmującej Sprzęt.
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><b>Polityka prywatności</b></TableCell>
                            <TableCell>
                                dokument informujący o sposobie przetwarzania danych osobowych w akcji Dajże Kompa, do pobrania w zakładce (podstronie) Serwisu pod adresem: {`${url}/#/polityka-prywatnosci`}.
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><b>Regulamin</b></TableCell>
                            <TableCell>
                                niniejszy regulamin Serwisu, dostępny do pobrania w zakładce (podstronie) Serwisu pod adresem: {`${url}/#/regulamin`}.
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><b>Serwis</b></TableCell>
                            <TableCell>
                                portal internetowy dostępny pod adresem: {url}.
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><b>Sprzęt</b></TableCell>
                            <TableCell>
                                komputer stacjonarny lub laptop oraz inny sprzęt komputerowy taki jak tablety, monitory, drukarki, zestawy słuchawkowe i kamery, który Dający Kompa zgłasza do Dajże Kompa wypełniając formularz w zakładce „Podaruj Kompa”.
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><b>Użytkownik</b></TableCell>
                            <TableCell>
                                każda osoba fizyczna odwiedzająca Serwis.
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <Typography variant="h6" className={classes.title}>3. Warunki korzystania z serwisu, odpowiedzialność</Typography>
            <ol>
                <li>
                    Użytkownik zobowiązuje się do zapoznania się z Regulaminem i przestrzegania jego postanowień.
                </li>
                <li>
                    Korzystanie z Serwisu wymaga posługiwania się sprawnymi urządzeniami elektronicznymi (jak komputery, tablety, telefony komórkowe), mającymi połączenie z siecią Internet, za pośrednictwem zainstalowanych na nich aplikacji mobilnych lub następujących przeglądarek internetowych: najnowsze wersje przeglądarek: Google Chrome, Mozilla Firefox, Internet Explorer, Edge, Safari, Opera (w ich najnowszych wersjach).
                </li>
                <li>
                    Wypełnienie formularzy znajdujących się w zakładce „Podaruj Kompa” lub „Zgłoś Potrzebę”, dostępnych w ramach podstron Serwisu, wymaga posiadania aktywnego adresu e-mail.
                </li>
                <li>
                    Fundacja zastrzega, że korzystanie z Serwisu może wiązać się ze standardowym ryzykiem związanym z wykorzystaniem sieci Internet i rekomenduje Użytkownikom przedsięwzięcie odpowiednich kroków w celu ich zminimalizowania.
                </li>
                <li>
                    Fundacja dokłada wszelkich starań w celu zapewnienia prawidłowego funkcjonowania Serwisu. W przypadku wystąpienia awarii i błędów technicznych spowodowanych kłopotami ze sprzętem bądź oprogramowaniem, Fundacja podejmie działania pozwalające w jak największym stopniu ograniczyć negatywne skutki zaistniałych problemów technicznych w stosunku do Użytkowników. Konieczne przerwy techniczne planowane będą przez Fundację w miarę możliwości w godzinach nocnych, celem zminimalizowania ich skutków wobec Użytkowników.
                </li>
                <li>
                    Zabrania się Użytkownikowi publikowania lub dostarczania w ramach Serwisu w jakikolwiek sposób jakichkolwiek treści bezprawnych.
                </li>
                <li>
                    Niedopuszczalne są czynności Użytkownika mogące w jakikolwiek sposób utrudniać działanie Serwisu. W przypadku stwierdzenia przez Fundację, że Użytkownik podejmuje takie czynności, Fundacja podejmie wszelkie niezbędne działania dozwolone prawem, mające na celu powstrzymanie Użytkownika od takich czynności oraz naprawienie poniesionej przez Fundację szkody z tego tytułu.
                </li>
                <li>
                    Ilekroć Regulamin opisuje potrzebę podjęcia działań przez osoby potrzebujące lub Obdarowanych będących uczniami, rozumie się, że czynności tych mogą dokonywać przedstawiciele ustawowi tychże osób – w zakresie w jakim wynika to z ograniczeń prawnych lub potrzeby udzielenia dziecku zwykłej codziennej pomocy.
                </li>
            </ol>
            <Typography variant="h6" className={classes.title}>4. Warunki akcji &quot;Dajże kompa&quot;</Typography>
            <br />
            <b>[Dający kompa]</b>
            <ol>
                <li>
                    Dający Kompa, w celu wzięcia udziału w akcji Dajże Kompa poprzez przekazanie Sprzętu, wypełnia formularz z zakładki Serwisu „Podaruj Kompa”. Dający Kompa zobowiązuje się podać w formularzu zgodne z prawdą dane osobowe, informacje dotyczące Sprzętu oraz załączyć zdjęcie Sprzętu.
                </li>
                <li>
                    Sprzęt powinien spełniać następujące (minimalne) wymagania techniczne: procesor 2,5 GHz (Intel Core 2 Duo lub następne wersje albo odpowiednik), 4 GB RAM oraz kartę sieciową WiFi. Zalecany jest system Windows 10. Warunkiem koniecznym jest usunięcie ze Sprzętu z wszelkich danych przed przekazaniem tego Sprzętu.
                </li>
                <li>
                    Stan techniczny Sprzętu musi pozwalać mu na prawidłowe uruchomienie oraz realizację podstawowych operacji, takich jak uruchomienie i korzystanie z przeglądarki internetowej, instalację i korzystanie z pakietu biurowego (jak MS Office), instalację i uruchomienie aplikacji umożliwiających komunikację na odległość w czasie rzeczywistym (optymalnie, w zakresie obrazu i dźwięku).
                </li>
                <li>
                    Wzięcie udziału w akcji Dajże Kompa wymaga także zaakceptowania przez Dającego Kompa Regulaminu oraz Polityki Prywatności.
                </li>
                <li>
                    Wysyłając formularz opisany w pkt 1 powyżej Dający Kompa zobowiązuje się przenieść na Fundację własność Sprzętu i wydać ją w sposób opisany w pkt 8 poniżej – pod warunkiem akceptacji Sprzętu przez Fundację, zgodnie z postanowieniami poniżej
                </li>
                <li>
                    Po przesłaniu formularza Fundacja niezwłocznie zweryfikuje, czy zgłoszenie spełnia wymagania techniczne określone w pkt. 2 powyżej i poinformuje Dającego Kompa o wyniku weryfikacji – przesyłając wiadomość na adres e-mail wskazany przez Dającego Kompa.
                </li>
                <li>
                    Z chwilą powiadomienia Dającego Kompa o pozytywnej weryfikacji zgłoszonego przez niego Sprzętu, Fundacja zobowiązuje się do odebrania Sprzętu przekazanego przez Dającego Kompa i zapłaty na rzecz Dającego Kompa ceny w wysokości 1 PLN (słownie: jednego złotego). Do powyższej kwoty zostanie doliczony podatek VAT w wysokości wynikającej z przepisów. Dający Kompa wystawi, zgodnie z instrukcjami otrzymanymi od Fundacji w wiadomości e-mail, fakturę opiewającą na opisaną wyżej kwotę.
                </li>
                <li>
                    Opisana w postanowieniu poprzedzającym cena zostanie zapłacona na rzecz Dającego Kompa przelewem bankowym na rachunek bankowy wskazany przez Dającego Kompa w formularzu, w terminie 30 dni od dnia otrzymania przez Fundację prawidłowo wystawionej faktury. Za dzień dokonania zapłaty Strony uznają dzień obciążenia rachunku Fundacji.
                </li>
                <li>
                    Dający Kompa może przekazać należne mu wynagrodzenie na cele statutowe Fundacji poprzez wypełnienie formularza umowy darowizny otrzymanego od Fundacji w wiadomości e-mail po zgłoszeniu Sprzętu za pośrednictwem Serwisu.
                </li>
                <li>
                    Wraz z informacją o pomyślnej weryfikacji zgłoszenia Dający Kompa otrzyma Etykietę z adresem wysyłki Sprzętu (w formie elektronicznej). Dający Kompa:
                    <ol className={classes.letteredList}>
                        <li>usunie z pamięci Sprzętu wszelkie dane, które się na nim znajdują;</li>
                        <li>przygotuje Sprzęt do wysyłki – w szczególności umieści go w opakowaniu chroniącym Sprzęt przed uszkodzeniami mechanicznymi;</li>
                        <li>naklei na przygotowane opakowanie ze Sprzętem Etykietę oraz umieści przesyłkę we wskazanym Paczkomacie.</li>
                    </ol>
                </li>
                <li>
                    Dający Kompa zobowiązuje się, przed przekazaniem Sprzętu do doręczenia Fundacji w sposób opisany powyżej, do usunięcia z niego wszelkich osobistych danych i programów komputerowych, a w szczególności programów komputerowych umożliwiających zdalny dostęp do Sprzętu lub blokujących możliwość korzystania ze Sprzętu (instrukcję w tym zakresie obejmuje zakładka Serwisu dostępna pod adresem {`${url}/#/faq`}.
                </li>
                <li>
                    Dający Kompa zobowiązuje się, że Sprzęt nie będzie w swojej pamięci zawierał jakichkolwiek bezprawnych treści.
                </li>
            </ol>
            <b>[Transport Sprzętu, Fundacja]</b>
            <ol start={13}>
                <li>
                    Fundacja obdaruje Sprzętem przekazanym przez Dającego Kompa Obdarowanych, którzy wypełnią formularz dla obdarowanego i następnie pozytywnie zweryfikowanych w porozumieniu z Dyrektorami szkół samorządowych z terenu Krakowa.
                </li>
                <li>
                    Fundacja dostarczy Sprzęt na adres Obdarowanych za pośrednictwem Firmy Kurierskiej lub w inny sposób gwarantujący dostarczenie Sprzętu w należytym stanie.
                </li>
            </ol>
            <b>[Obdarowani]</b>
            <ol start={15}>
                <li>
                    Osoby potrzebujące (lub ich przedstawiciele ustawowi) mogą zgłaszać chęć udziału w projekcie (otrzymania Sprzętu) poprzez formularz dostępny w serwisie {`${url}/#/podaruj-kompa`}.
                </li>
                <li>
                    Fundacja w porozumieniu z Dyrektorami szkół samorządowych na terenie Krakowa, znając stan posiadanego przez siebie sprzętu podejmie decyzję o przyznaniu obdarowanemu Sprzętu.
                </li>
                <li>
                    Wypełnienie formularza nie jest równoznaczne z przyznaniem Sprzętu.
                </li>
                <li>
                    W przypadku pozytywnej weryfikacji Obdarowany otrzyma drogą e-mail potwierdzenie od Fundacji o otrzymaniu Sprzętu.
                </li>
                <li>
                    Sprzęt zostanie wysłany do bliskiego adresowi Obdarowanego Paczkomatu.
                </li>
                <li>
                    Obowiązki Obdarowanego:
                    <ol className={classes.letteredList}>
                        <li>odebranie przesyłki ze wskazanego Paczkomatu w ciągu 48h od przysłania mu powiadomienia na telefon o gotowości paczki do odbioru.</li>
                        <li>korzystanie ze Sprzętu zgodnie z przeznaczeniem, przede wszystkim w celach edukacyjnych.</li>
                    </ol>
                </li>
                <li>
                    W ramach akcji Dajże Kompa Fundacja może przekazywać Obdarowanym nieodpłatnie także inny rodzaj sprzętu komputerowego lub umożliwiającego łączność (jak routery internetowe), uzyskane od partnerów, w tym od innych fundacji. Przekazanie to nastąpić może tylko w przypadku, kiedy Fundacja dysponuje tego rodzaju Sprzętem.
                </li>
                <li>
                    Liczba Obdarowanych będzie uzależniona od ilości przekazanego przez Darczyńców Sprzętu. Fundacja zastrzega, że w każdej chwili może zadecydować o wstrzymaniu przyjmowania zgłoszenia od Obdarowanych – o czym będzie informować za pośrednictwem Serwisu.
                </li>
                <li>
                    Zarząd Fundacji Poland Business Run zastrzega sobie prawo do nieprzyznania Sprzętu, pomimo tego, że wszelkie warunki określone w niniejszym Regulaminie zostały spełnione.
                </li>
                <li>
                    Zarząd Fundacji Poland Business Run nie ma obowiązku uzasadnienia podjętych decyzji i nie jest zobowiązany do udzielania odpowiedzi na złożone wnioski oraz informowania o podjętych decyzjach. Od decyzji Zarządu nie przysługują środki odwoławcze.
                </li>
            </ol>
            <Typography variant="h6" className={classes.title}>5. Dane osobowe</Typography>
            <p>W przypadku dziecka rodzic/opiekun prawny zobowiązuje się do przekazania dziecku wszelkich informacji dotyczących przetwarzania jego danych osobowych w zrozumiały sposób.</p>
            <ol>
                <li>
                    Administratorem danych osobowych jest Fundacja Poland Business Run, z siedzibą ul. Henryka Siemiradzkiego 17/2, 31-137 Kraków. Z Administratorem można kontaktować się pod adresem siedziby lub pod adresem e-mail: {mail}.
                </li>
                <li>
                    Administrator wyznaczył Inspektora Ochrony Danych, z którym można się kontaktować pod adresem e-mail: iod@iods.pl.
                </li>
                <li>
                    Dane osobowe są przetwarzane przede wszystkim w celu:
                    <ul>
                        <li>zawarcia umowy sprzedaży lub podejmowania innych działań na żądanie sprzedającego przed zawarciem z nami umowy (podstawa prawna: art. 6 ust. 1 lit. b RODO),</li>
                        <li>weryfikacji zgłoszenia Obdarowanego u właściwego dyrektora szkoły (art. 6 ust. 1 lit. a RODO),</li>
                        <li>przekazania darowizny, której przedmiotem jest sprzęt komputerowy (podstawa prawna: art. 6 ust. 1 lit. b RODO),</li>
                        <li>udostępnienia danych osobowych Dającego Kompa na liście darczyńców, znajdującej się w serwisie www.dajzekompa.pl, wyłącznie na podstawie zgody (art. 6 ust. 1 lit. a RODO),</li>
                        <li>realizacji obowiązków podatkowych i księgowo-rachunkowych oraz innych obowiązków prawnych ciążących na Administratorze (podstawa prawna: art. 6 ust. 1 lit. c RODO),</li>
                        <li>ewentualnego dochodzenia roszczeń lub obrony przed roszczeniami (art. 6 ust. 1 lit. f RODO).</li>
                    </ul>
                </li>
                <li>
                    Osobom, których dane są przetwarzane przysługują prawa i wolności, zgodnie z postanowieniami RODO.
                </li>
                <li>
                    Szczegółowe informacje na temat ochrony danych osobowych zostały opisane na Stronie {url} w Polityce Prywatności.
                </li>
            </ol>
            <Typography variant="h6" className={classes.title}>6. Reklamacje</Typography>
            <ol>
                <li>
                    Wszelkie reklamacje dotyczące działania Serwisu lub akcji Dajże Kompa, Użytkownicy mogą składać drogą elektroniczną na adres mailowy Fundacji: {mail}
                </li>
                <li>
                    Reklamacja powinna zawierać: słowo Reklamacja w tytule maila, imię, nazwisko i adres e-mail Użytkownika, jak również dokładny opis i powód reklamacji.
                </li>
                <li>
                    Reklamacje rozpatrywane będą w terminie do 30 dni od dnia ich otrzymania
                </li>
                <li>
                    Reklamacje rozpatrywane będą na podstawie niniejszego Regulaminu.
                </li>
                <li>
                    O decyzji w zakresie rozstrzygnięcia reklamacji Użytkownik zostanie powiadomiony wiadomością e-mail wysłaną na adres, z którego reklamacja została wysłana.
                </li>
            </ol>
            <Typography variant="h6" className={classes.title}>7. Prawa autorskie</Typography>
            <p>Autorskie prawa majątkowe do utworów zamieszczonych w Serwisie przysługują Fundacji lub innym podmiotom działającym w porozumieniu z Fundacją. Użytkownik nie jest uprawniony do korzystania z takich utworów w jakimkolwiek szerszym zakresie niż wynikającym z przepisów ustawy o prawie autorskim w zakresie dozwolonego użytku. Użytkownik nie jest uprawniony do korzystania z jakichkolwiek znaków towarowych umieszczonych w Serwisie.</p>
            <Typography variant="h6" className={classes.title}>8. Postanowienia końcowe</Typography>
            <ol>
                <li>
                    Fundacja zastrzega sobie prawo do zmiany treści Regulaminu. Zmiany Regulaminu dokonywane będą poprzez zamieszczenie nowej treści Regulaminu na odpowiedniej podstronie Serwisu.
                </li>
                <li>
                    Zmieniony Regulamin wchodzi w życie w terminie wskazanym w nowej treści Regulaminu, lecz nie krótszym niż 7 dni od momentu udostępnienia zmienionego Regulaminu.
                </li>
                <li>
                    Sądem właściwym do rozstrzygania wszelkich ewentualnych sporów związanych z akcją Dajże Kompa jest sąd właściwy dla siedziby Fundacji, chyba że co innego wynika z bezwzględnie obowiązujących przepisów prawa.
                </li>
                <li>
                    Pytania lub uwagi techniczne odnośnie działania Serwisu mogą być kierowane na adres: {mail}.
                </li>
                <li>
                    Pytania dotyczące Dajże Kompa lub chęć nawiązania współpracy w ramach akcji mogą być kierować na adres: dajzekompa@polandbusinessrun.pl
                </li>
            </ol>
            <Typography variant="caption">Wersja z dnia 10.04.2020 r.</Typography>
        </SubPage>
    );
}

export default TermsPage;
