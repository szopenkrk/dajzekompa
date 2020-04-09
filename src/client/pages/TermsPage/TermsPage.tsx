/* Libraries */
import React from 'react';
import { Typography, TableContainer, TableBody, TableRow, TableCell, Table, makeStyles } from '@material-ui/core';

/* Application files */
import Config from 'client/lib/config';
import SubPage from 'client/pages/SubPage';

const useStyles = makeStyles((theme) => ({
    title: {
        textTransform: 'uppercase',
        fontWeight: 500,
        textAlign: 'center'
    },
    section: {
        fontSize: '0.875rem',
        fontFamily: 'Roboto',
        color: 'rgba(0, 0, 0, 0.87)',
        paddingTop: theme.spacing(3)
    },
    table: {
        '& td': {
            verticalAlign: 'top',
            border: 0
        }
    },
    highlight: {
        color: theme.palette.primary.main,
        fontWeight: 400
    }
}));

export function TermsPage () {
    const classes = useStyles();
    const url = window.location.host;
    const mail = Config.CONTACT_EMAIL;
    const limit = Config.RECEIVERS_LIMIT;

    function getServicePageUrl (path: string): string {
        return `${url}/#/${path}`;
    }

    return (
        <SubPage>
            <Typography variant="h5" className={classes.title}>Regulamin serwisu internetowego akcji "Dajże kompa"</Typography>
            <section className={classes.section}>
                Niniejszy Regulamin określa zasady świadczenia i korzystania z usług świadczonych drogą
                elektroniczną oferowanych przez Właściciela Serwisu za pośrednictwem strony internetowej
                dostępnej pod adresem <span className={classes.highlight}>{url}</span> oraz zasady prowadzenia akcji charytatywnej „Dajże Kompa”
                organizowanej przez Fundację.
            </section>
            <section className={classes.section}>
                <Typography variant="h5">1. Definicje</Typography>
                <br />
                Na potrzeby Regulaminu zostają uzgodnione definicje wskazane poniżej.
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
                                    Prowadzona przez Fundację akcja charytatywna mająca na celu zaangażowanie środowisk biznesowych w działanie na rzecz społeczności lokalnych oraz środowisk potrzebujących wsparcia, w szczególności poprzez dostarczenie dzieciom ze środowisk wykluczenia cyfrowego odpowiedniego sprzętu komputerowego umożliwiającego pobieranie nauki w sposób zdalny; a także umożliwienie nauczycielom niewyposażonym w odpowiedni sprzęt komputerowy prowadzenie zajęć dydaktycznych w formie zdalnej.
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><b>Etykieta</b></TableCell>
                                <TableCell>
                                    Etykieta nadawcza obejmująca dane umożliwiające Firmie Kurierskiej dostarczenie Sprzętu Fundacji.
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><b>Firma kurierska</b></TableCell>
                                <TableCell>
                                    Przedsiębiorca świadczący na rzecz Fundacji usługi przyjmowania, przemieszczania i doręczenia przesyłek obejmujących Sprzęt.
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
                                    Osoba potrzebująca, której zgłoszenie do akcji Dajże Kompa przeszło pozytywną weryfikacje – do którego trafi nabyty w ramach akcji Sprzęt.
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><b>Osoba potrzebująca</b></TableCell>
                                <TableCell>
                                    Dziecko uczęszczające do szkoły samorządowej, które z powodu braku właściwego urządzenia nie ma możliwości lub ma znacznie utrudnioną możliwość uczestniczenia w zajęciach edukacyjnych w sposób zdalny; albo odpowiednio nauczyciel pracujący w szkołach samorządowych.
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><b>Paczkomat</b></TableCell>
                                <TableCell>
                                    Elektroniczna szafa depozytowa (urządzenie) należąca i obsługiwana przez Firmę Kurierską, umożliwiająca nadanie przesyłki obejmującej Sprzęt samoobsługowo.
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><b>Polityka prywatności</b></TableCell>
                                <TableCell>
                                    Dokument informujący o sposobie przetwarzania danych osobowych w akcji Dajże Kompa, do pobrania w zakładce (podstronie) Serwisu pod adresem: <span className={classes.highlight}>{getServicePageUrl('rodo')}</span>.
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><b>Regulamin</b></TableCell>
                                <TableCell>
                                    Niniejszy regulamin Serwisu, dostępny do pobrania w zakładce (podstronie) Serwisu pod adresem: <span className={classes.highlight}>{getServicePageUrl('regulamin')}</span>.
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><b>Serwis</b></TableCell>
                                <TableCell>
                                    Portal internetowy dostępny pod adresem: <span className={classes.highlight}>{url}</span>.
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><b>Sprzęt</b></TableCell>
                                <TableCell>
                                    Komputer stacjonarny lub laptop, który Dający Kompa zgłasza do Dajże Kompa wypełniając formularz w zakładce „Podaruj Kompa”.
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><b>Użytkownik</b></TableCell>
                                <TableCell>
                                    Każda osoba fizyczna odwiedzająca Serwis.
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </section>
            <section className={classes.section}>
                <Typography variant="h5">2. Warunki korzystania z serwisu, odpowiedzialność</Typography>
                <TableContainer>
                    <Table className={classes.table}>
                        <TableBody>
                            <TableRow>
                                <TableCell>2.1</TableCell>
                                <TableCell>
                                    Użytkownik zobowiązuje się do zapoznania się z Regulaminem i przestrzeganiajego postanowień.
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>2.2</TableCell>
                                <TableCell>
                                    Korzystanie z Serwisu wymaga posługiwania się sprawnymi urządzeniami elektronicznymi (jak komputery, tablety, telefony komórkowe), mającymi połączenie z siecią Internet, za pośrednictwem zainstalowanych na nich aplikacji mobilnych lub następujących przeglądarek internetowych: Microsoft Edge, Mozilla Firefox, Google Chrome, Safari.
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>2.3</TableCell>
                                <TableCell>
                                    Wypełnienie formularzy znajdujących się w zakładce „Podaruj Kompa” lub „Zgłoś Potrzebę”, dostępnych w ramach podstron Serwisu, wymaga posiadania aktywnego adresu e-mail.
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>2.4</TableCell>
                                <TableCell>
                                    Fundacja zastrzega, że korzystanie z Serwisu może wiązać się ze standardowym ryzykiem związanym z wykorzystaniem sieci Internet i rekomenduje Użytkownikom przedsięwzięcie odpowiednich kroków w celu ich zminimalizowania.
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>2.5</TableCell>
                                <TableCell>
                                    Fundacja dokłada wszelkich starań w celu zapewnienia prawidłowego funkcjonowania Serwisu. W przypadku wystąpienia awarii i błędów technicznych spowodowanych kłopotami ze sprzętem bądź oprogramowaniem, Fundacja podejmie działania pozwalające w jak największym stopniu ograniczyć negatywne skutki zaistniałych problemów technicznych w stosunku do Użytkowników. Konieczne przerwy techniczne planowane będą przez Fundację w miarę możliwości w godzinach nocnych, celem zminimalizowania ich skutków wobec Użytkowników.
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>2.6</TableCell>
                                <TableCell>
                                    Zabrania się Użytkownikowi publikowania lub dostarczania w ramach Serwisu w jakikolwiek sposób jakichkolwiek treści bezprawnych.
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>2.7</TableCell>
                                <TableCell>
                                    Niedopuszczalne są czynności Użytkownika mogące w jakikolwiek sposób utrudniać działanie Serwisu. W przypadku stwierdzenia przez Fundację, że Użytkownik podejmuje takie czynności, Fundacja podejmie wszelkie niezbędne działania dozwolone prawem, mające na celu powstrzymanie Użytkownika od takich czynności oraz naprawienie poniesionej przez Fundację szkody z tego tytułu.
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>2.8</TableCell>
                                <TableCell>
                                    Ilekroć Regulamin opisuje potrzebę podjęcia działań przez Osoby potrzebujące lub Obdarowanych będących uczniami, rozumie się, że czynności tych mogą dokonywać przedstawiciele ustawowi tychże osób – w zakresie w jakim wynika to z ograniczeń prawnych lub potrzeby udzielenia dziecku zwykłej codziennej pomocy.
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </section>
            <section className={classes.section}>
                <Typography variant="h5">3. Warunki akcji "Dajże kompa"</Typography>
                <br />
                <b>[Dający kompa]</b>
                <TableContainer>
                    <Table className={classes.table}>
                        <TableBody>
                            <TableRow>
                                <TableCell>3.1</TableCell>
                                <TableCell>
                                    Dający Kompa, w celu wzięcia udziału w akcji Dajże Kompa poprzez przekazanie Sprzętu, wypełnia formularz z zakładki Serwisu „Podaruj Kompa”. Dający Kompa zobowiązuje się podać w formularzu zgodne z prawdą dane osobowe, informacje dotyczące Sprzętu oraz załączyć zdjęcie Sprzętu.
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>3.2</TableCell>
                                <TableCell>
                                    Sprzęt powinien spełniać następujące wymagania techniczne: procesor 2,5 GHz (Intel Core 2 Duo lub następne wersje albo odpowiednik), 4 GB RAM oraz kartę sieciową WiFi. Zalecany jest system Windows 10, nie jest to jednak warunek konieczny.
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>3.3</TableCell>
                                <TableCell>
                                    Stan techniczny Sprzętu musi pozwalać mu na prawidłowe uruchomienie oraz realizację podstawowych operacji, takich jak uruchomienie i korzystanie z przeglądarki internetowej, instalacja i korzystanie z pakietu biurowego (jak MS Office), instalacja i uruchomienie aplikacji umożliwiających komunikację na odległość w czasie rzeczywistym (optymalnie, w zakresie obrazu i dźwięku).
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>3.4</TableCell>
                                <TableCell>
                                    Wzięcie udziału w akcji Dajże Kompa wymaga także zaakceptowania przez Dającego Kompa Regulaminu, Polityki Prywatności oraz wyrażenia zgody na przetwarzanie danych osobowych podanych w formularzu.
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>3.5</TableCell>
                                <TableCell>
                                    Wysyłając formularz opisany w pkt 3.1 powyżej Dający Kompa zobowiązuje się przenieść na Fundację własność Sprzętu i wydać ją w sposób opisany w pkt 3.8 poniżej, za wynagrodzeniem w wysokości 1 grosza (słownie: jednego grosza) za jedną sztukę Sprzętu – pod warunkiem akceptacji sprzętu przez Fundację, zgodnie z postanowieniami poniżej.
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>3.6</TableCell>
                                <TableCell>
                                    Po przesłaniu formularza Fundacja niezwłocznie zweryfikuje, czy zgłoszenie spełnia wymagania techniczne określone w punkcie 3.2 powyżej i poinformuje Dającego Kompa o wyniku weryfikacji – przesyłając wiadomość na adres e-mail wskazany przez Dającego Kompa.
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>3.7</TableCell>
                                <TableCell>
                                    Z chwilą powiadomienia Dającego Kompa o pozytywnej weryfikacji zgłoszonego przez niego Sprzętu, Fundacja zobowiązuje się do odebrania Sprzętu przekazanego przez Dającego Kompa oraz do zapłaty na rzecz Dającego Kompa ceny w wysokości 1 (jednego) grosza. W celu uniknięcia wątpliwości potwierdza się, że z chwilą wskazanego wyżej powiadomienia dochodzi pomiędzy Dającym Kompa a Fundacją do zawarcia umowy sprzedaży, w ramach której dojdzie do odpłatnej dostawy Sprzętu.
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>3.8</TableCell>
                                <TableCell>
                                    Opisana w postanowieniu poprzedzającym cena zostanie zapłacona na rzecz Dającego Kompa przelewem bankowym na rachunek bankowy wskazany przez Dającego Kompa w formularzu, w terminie 30 dni od dnia pozytywnej weryfikacji Sprzętu, zgodnie z postanowieniem poprzedzającym. Za dzień dokonania zapłaty Strony uznają dzień obciążenia rachunku Fundacji.Q
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>3.9</TableCell>
                                <TableCell>
                                    Wraz z informacją o pomyślnej weryfikacji zgłoszenia Dający Kompa otrzyma Etykietę z adresem wysyłki Sprzętu (w formie elektronicznej). Dający Kompa:
                                    <TableContainer>
                                        <Table className={classes.table}>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell>3.9.1</TableCell>
                                                    <TableCell>
                                                        przygotuje Sprzęt do wysyłki – w szczególności umieści go w opakowaniu chroniącym Sprzęt przed uszkodzeniami mechanicznymi;
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>3.9.2</TableCell>
                                                    <TableCell>
                                                        naklei na przygotowane opakowanie ze Sprzętem Etykietę oraz umieści przesyłkę we wskazanym Paczkomacie.
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>3.10</TableCell>
                                <TableCell>
                                    W przypadku braku możliwości wydrukowania Etykiety przez Dającego Kompa, będzie on mógł skontaktować się z Fundacją za pośrednictwem zakładki Serwisu: <span className={classes.highlight}>{getServicePageUrl('kontakt')}</span>, w celu zorganizowania alternatywnego sposobu dostarczenia Fundacji przesyłki ze Sprzętem.
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>3.11</TableCell>
                                <TableCell>
    Dający Kompa zobowiązuje się, przed przekazaniem Sprzętu do doręczenia Fundacji w sposób opisany powyżej, do usunięcia z niego wszelkich osobistych danych i programów komputerowych, a w szczególności programów komputerowych umożliwiających zdalny dostęp do Sprzętu lub blokujących możliwość korzystania ze Sprzętu (instrukcję w tym zakresie obejmuje zakładka Serwisu dostępna pod adresem <span className={classes.highlight}>{getServicePageUrl('faq')}</span>).
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>3.12</TableCell>
                                <TableCell>
                                    Dający Kompa zobowiązuje się, że Sprzęt nie będzie w swojej pamięci zawierał jakichkolwiek bezprawnych treści.
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>3.13</TableCell>
                                <TableCell>
                                    Fundacja będzie prowadziła spis darczyńców. Dający Kompa może wyrazić zgodę na umieszczenie w spisie przy wypełnianiu formularza.
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <b>[Transport Sprzętu, Fundacja]</b>
                <TableContainer>
                    <Table className={classes.table}>
                        <TableBody>
                            <TableRow>
                                <TableCell>3.14</TableCell>
                                <TableCell>
                                    Fundacja obdaruje Sprzętem przekazanym przez Dającego Kompa Obdarowanych, po pod warunkiem przejścia przez nich pozytywnej weryfikacji dokonywanej przez dyrektorów szkół samorządowych.
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>3.15</TableCell>
                                <TableCell>
                                    Fundacja dostarczy Sprzęt na adres Obdarowanych za pośrednictwem Firmy Kurierskiej lub w inny sposób gwarantujący dostarczenie Sprzętu w należytym stanie.
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <b>[Obdarowani]</b>
                <TableContainer>
                    <Table className={classes.table}>
                        <TableBody>
                            <TableRow>
                                <TableCell>3.16</TableCell>
                                <TableCell>
                                    Osoby potrzebujące (lub, w ich imieniu, ich przedstawiciele ustawowi) mogą zgłaszać chęć udziału w projekcie (otrzymania Sprzętu) poprzez wypełnienie formularza w zakładce „Zgłoś Potrzebę” danymi dziecka (lub w odpowiednim zakresie danymi przedstawiciela ustawowego). Formularz może zostać wypełniony wyłącznie bezpośrednio przez Osoby potrzebujące (lub przedstawicieli ustawowych Osób potrzebujących), Fundacja nie przewiduje możliwości zgłoszenia do Dajże Kompa osób trzecich.
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>3.17</TableCell>
                                <TableCell>
                                    Przesłanie wypełnionego formularza nie jest jednoznaczne z otrzymaniem Sprzętu. Przydzielenie Sprzętu Osobom potrzebującym nastąpi przez Fundację w porozumieniu z władzami samorządowymi oraz dyrektorami szkół samorządowych. Dyrektorzy szkół potwierdzą czy Osoba potrzebująca powinna otrzymać Sprzęt.
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>3.18</TableCell>
                                <TableCell>
                                    Wzięcie udziału w akcji Dajże Kompa wymaga zaakceptowania przez Osoby potrzebujące Regulaminu, Polityki Prywatności, wyrażenia zgody na przetwarzanie danych osobowych oraz w przypadku zgłaszania dziecka oświadczenia o byciu jego opiekunem prawnym / rodzicem.
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>3.19</TableCell>
                                <TableCell>
                                    Fundacja poinformuje Osobę potrzebującą o wyniku weryfikacji – przesyłając wiadomość na adres e-mail wskazany przez Osobę potrzebującą w formularzu.
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>3.20</TableCell>
                                <TableCell>
                                    Sprzęt zostanie wysłany do bliskiego adresowi Obdarowanego Paczkomatu.
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>3.21</TableCell>
                                <TableCell>
                                    Obowiązki Obdarowanego:
                                    <TableContainer>
                                        <Table className={classes.table}>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell>3.21.1</TableCell>
                                                    <TableCell>
                                                        odebranie przesyłki z paczkomatu w ciągu 48h od przysłania im powiadomienia na telefon o gotowości paczki do odbioru.
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>3.21.2</TableCell>
                                                    <TableCell>
                                                        wypełnienie załączonych do przesyłki dokumentów oraz przesłanie ich na adres <span className={classes.highlight}>{mail}</span>.
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>3.21.3</TableCell>
                                                    <TableCell>
                                                        korzystanie ze Sprzętu zgodnie z przeznaczeniem, przede wszystkim w celach edukacyjnych.
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>3.22</TableCell>
                                <TableCell>
                                    W ramach akcji Dajże Kompa Fundacja może przekazywać Obdarowanym nieodpłatnie także inny rodzaj sprzętu komputerowego lub umożliwiającego łączność (jak routery internetowe), uzyskane od partnerów, w tym od innych fundacji.
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>3.23</TableCell>
                                <TableCell>
                                    Liczba Obdarowanych będzie uzależniona od ilości przekazanego przez Darczyńców Sprzętu. Fundacja zastrzega, że po osiągnięciu <span className={classes.highlight}>{limit}</span> zgłoszeń może przestać przyjmować zgłoszenia od Osób potrzebujących – o czym będzie informować za pośrednictwem Serwisu.
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </section>
            <section className={classes.section}>
                <Typography variant="h5">4. Dane osobowe</Typography>
                <TableContainer>
                    <Table className={classes.table}>
                        <TableBody>
                            <TableRow>
                                <TableCell>4.1</TableCell>
                                <TableCell>
                                    Administratorem danych osobowych w ramach Dajże Kompa jest Fundacja Poland Business Run z siedzibą przy ul. Henryka Siemiradzkiego, nr 17, lok. 2, 31-137 Kraków.
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>4.2</TableCell>
                                <TableCell>
                                    Dane osobowe są przetwarzane w celu i w związku z organizacją Dajże Kompa, w szczególności dla celów pozyskania sprzętu od Dających Kompa oraz rozdysponowania sprzętu Obdarowanym będącym beneficjentami Dajże Kompa.
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>4.3</TableCell>
                                <TableCell>
                                    Osobom, których dane są przetwarzane przysługuje szereg praw wobec ich danych osobowych, które mogą wykonać kontaktując się z administratorem w sposób wskazany w Polityce Prywatności [podświetlony link].
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>4.4</TableCell>
                                <TableCell>
                                    Szczegółowe informacje na temat ochrony danych osobowych zostały opisane w Polityce Prywatności [podświetlony link] dostępnej na stronie internetowej Serwisu: www.dajzekompa.pl.
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </section>
            <section className={classes.section}>
                <Typography variant="h5">5. Reklamacje</Typography>
                <TableContainer>
                    <Table className={classes.table}>
                        <TableBody>
                            <TableRow>
                                <TableCell>5.1</TableCell>
                                <TableCell>
                                    Wszelkie reklamacje dotyczące działania Serwisu lub akcji Dajże Kompa, Użytkownicy mogą składać drogą elektroniczną na adres mailowy Fundacji: <span className={classes.highlight}>{mail}</span>.
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>5.2</TableCell>
                                <TableCell>
                                    Reklamacja powinna zawierać: imię, nazwisko i adres e-mail Użytkownika, jak również dokładny opis i powód reklamacji.
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>5.3</TableCell>
                                <TableCell>
                                    Reklamacje rozpatrywane będą w terminie 14 dni od dnia ich otrzymania przez Użytkownika.
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>5.4</TableCell>
                                <TableCell>
                                    Reklamacje rozpatrywane będą na podstawie niniejszego Regulaminu.
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>5.5</TableCell>
                                <TableCell>
                                    O decyzji w zakresie rozstrzygnięcia reklamacji Użytkownik zostanie powiadomiony wiadomością e-mail wysłaną na adres, z którego reklamacja została wysłana.
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </section>
            <section className={classes.section}>
                <Typography variant="h5">6. Prawa autorskie</Typography>
                <br />
                Autorskie prawa majątkowe do utworów zamieszczonych w Serwisie przysługują Fundacji lub innym podmiotom działającym w porozumieniu z Fundacją. Użytkownik nie jest uprawniony do korzystania z takich utworów w jakimkolwiek szerszym zakresie niż wynikającym z przepisów ustawy o prawie autorskim w zakresie dozwolonego użytku. Użytkownik nie jest uprawniony do korzystania z jakichkolwiek znaków towarowych umieszczonych w Serwisie.
            </section>
            <section className={classes.section}>
                <Typography variant="h5">7. Postanowienia końcowe</Typography>
                <TableContainer>
                    <Table className={classes.table}>
                        <TableBody>
                            <TableRow>
                                <TableCell>7.1</TableCell>
                                <TableCell>
                                    Fundacja zastrzega sobie prawo do zmiany treści Regulaminu. Zmiany Regulaminu dokonywane będą poprzez zamieszczenie nowej treści Regulaminu na odpowiedniej podstronie Serwisu.
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>7.2</TableCell>
                                <TableCell>
                                    Zmieniony Regulamin wchodzi w życie w terminie wskazanym w nowej treści Regulaminu, lecz nie krótszym niż 7 dni od momentu udostępnienia zmienionego Regulaminu.
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>7.3</TableCell>
                                <TableCell>
                                    Sądem właściwym do rozstrzygania wszelkich ewentualnych sporów związanych z akcją Dajże Kompa jest sąd właściwy dla siedziby Fundacji, chyba że co innego wynika z bezwzględnie obowiązujących przepisów prawa.
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>7.4</TableCell>
                                <TableCell>
                                    Pytania lub uwagi techniczne odnośnie działania Serwisu mogą być kierowane na adres: <span className={classes.highlight}>{mail}</span>.
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>7.5</TableCell>
                                <TableCell>
                                    Pytania dotyczące Dajże Kompa lub chęć nawiązania współpracy w ramach akcji mogą być kierować na adres: <span className={classes.highlight}>{mail}</span>.
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </section>
            <Typography variant="caption">Wersja z dnia 08.04.2020 r.</Typography>
        </SubPage>
    );
}

export default TermsPage;
