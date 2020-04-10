/* Libraries */
import React from 'react';
import { Link } from 'react-router-dom';

/* Application files */
import Config from 'client/lib/config';
import SubPage from 'client/pages/SubPage';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: {
        fontSize: '0.875rem',
        fontFamily: 'Roboto',
        color: 'rgba(0, 0, 0, 0.87)',
        paddingTop: theme.spacing(3),
        '& ol': {
            paddingLeft: theme.spacing(3)
        },
        '& li': {
            padding: `${theme.spacing(1)}px 0`
        }
    },
    bracketedList: {
        counterReset: 'item',
        listStyle: 'none',
        '& > li::before': {
            content: 'counter(item) ") "',
            counterIncrement: 'item',
            marginLeft: '-1.2em'
        }
    },
    letteredList: {
        listStyleType: 'lower-alpha'
    },
    link: {
        color: theme.palette.primary.main,
        textDecoration: 'underline'
    },
    title: {
        width: '100%',
        textAlign: 'center'
    }
}));

export function RodoPage () {
    const classes = useStyles();
    const mail = Config.CONTACT_EMAIL;
    const url = window.location.host;

    function getLinkToPage (path: string, text: string, classes: string) {
        return <Link to={`${url}/#/${path}`} className={classes} target="_blank" rel="noopener norefferer">{text}</Link>;
    }

    return (
        <SubPage className={classes.container}>
            <p>
                <b>Szanowny użytkowniku,</b>
                <br /><br />
                <b>Od dnia 25 maja 2018 r.</b> wszystkie podmioty przetwarzające dane osobowe, zobowiązane są do stosowania <i>Rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych i w sprawie swobodnego przepływu takich danych oraz uchylenia dyrektywy 95/46/WE</i> (Rozporządzenie ogólne o ochronie danych, zwane dalej: <b>RODO</b>).
                <br /><br />
                W związku z powyższym administrator serwisu internetowego {getLinkToPage('', url, classes.link)} którym jest <b>Fundacja Poland Business Run</b> oraz dla spełnienia obowiązku informacyjnego określonego w art. 13 RODO informuje, że w obrębie serwisu stosuje następującą <b>Politykę prywatności</b>:
            </p>
            <br />
            <Typography variant="h6" className={classes.title}>Polityka Prywatności i Ochrony Danych Osobowych RODO w serwisie internetowym {url}</Typography>
            <br />
            <Typography variant="body1" className={classes.title}><b>Informacje ogólne</b></Typography>
            <ol>
                <li>Polityka Prywatności określa zasady przetwarzania i ochrony danych osobowych przekazanych przez Użytkowników w związku z korzystaniem przez nich ze strony internetowej <b>Fundacji Poland Business Run</b> pod adresem {getLinkToPage('', url, classes.link)}.</li>
                <li>Administratorem danych zawartych w serwisie jest <b>Fundacja Poland Business Run</b>, z siedzibą w ul. Siemiradzkiego 17/2, 31-137.</li>
                <li>
                    W trosce o bezpieczeństwo powierzonych nam danych osobowych wdrożyliśmy procedury które mają zapobiec naruszenia bezpieczeństwa danych osobowych. Obowiązujące procedury są zgodne z obowiązującym prawem, w szczególności z:
                    <ol className={classes.bracketedList}>
                        <li>Rozporządzeniem Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych i w sprawie swobodnego przepływu takich danych oraz uchylenia dyrektywy 95/46/WE,</li>
                        <li>Ustawą o ochronie danych osobowych z dnia 10 maja 2018 r.,</li>
                        <li>Ustawą o świadczeniu usług drogą elektroniczną 18 lipca 2002 r.</li>
                    </ol>
                </li>
                <li>Dane Osobowe mogą być przetwarzane na podstawie zgody wyrażonej przez Użytkownika oraz w przypadkach, w których przepisy prawa upoważniają Administratora do przetwarzania danych osobowych w celu realizacji zawartej pomiędzy stronami umowy, na podstawie przepisów prawa lub gdy przetwarzanie jest niezbędne do celów wynikających z prawnie uzasadnionych interesów realizowanych przez Administratora.</li>
                <li>
                    Serwis realizuje funkcje pozyskiwania informacji o użytkownikach i ich zachowaniach:
                    <ol className={classes.bracketedList}>
                        <li>
                            Poprzez dobrowolne wprowadzenie do formularza następujących informacji:
                            <ol className={classes.letteredList}>
                                <li>w zakresie: danych osobowych darczyńcy będącego osobą fizyczną, w tym jednoosobowego przedsiębiorcy tj.: imienia, nazwiska, danych adresowych, adresu e-mail, nr telefonu, danych sprzętu komputerowego, dla celów przekazania sprzętu w postaci komputera („Sprzęt”) w ramach Akcji, skontaktowania się ze mną w tym celu oraz do odbioru Sprzętu – na podstawie art. 6 ust. 1 lit. b RODO;</li>
                                <li>w zakresie: danych osobowych osób wskazanych do kontaktu od przedsiębiorcy tj.: imienia, nazwiska, danych adresowych, adresu e-mail, nr telefonu, danych sprzętu w postaci komputera, dla celów przekazania sprzętu w postaci komputera („Sprzęt”), w związku z zawartą umową oraz w ramach Akcji, skontaktowania się ze mną w tym celu oraz do odbioru Sprzętu – na podstawie art. 6 ust. 1 lit. b RODO;</li>
                                <li>w zakresie: danych osobowych obdarowanego, tj. nauczyciela lub dziecka oraz jego rodzica/opiekuna prawnego tj.: imienia, nazwiska, danych adresowych, adresu e-mail, nr telefonu oraz imienia i nazwiska dziecka (jeżeli dotyczy), nazwa i numer szkoły podstawowej do której uczęszcza dziecko/ w której pracuje nauczyciel dla celów przekazania darowizny, dostarczenia dziecku Sprzętu w ramach Akcji, skontaktowania się z rodzicem/opiekunem w tym celu oraz do odbioru tego Sprzętu – na podstawie art. 6 ust. 1 lit. b RODO;</li>
                                <li>w zakresie: danych osobowych Kontrahenta oraz osób kontaktowych Kontrahenta: imienia, nazwiska, firmy, adresu prowadzenia działalności gospodarczej, numeru NIP, numeru rachunku bankowego, adresu do korespondencji, adresu e-mail – w celu realizacji obowiązków prawnych ciążących na administratorze w związku z realizacją umowy – tj. na podstawie art. 6 ust. 1 lit c) RODO, a także w celu ustalenia, dochodzenia lub obrony roszczeń (art. 6 ust. 1 lit. f RODO)</li>
                            </ol>
                        </li>
                        <li>Poprzez kody monitorujące ruch na stronie www (w tym m.in. poprzez zapisywanie w urządzeniach końcowych pliki cookies - tzw. „ciasteczka”),</li>
                        <li>Serwis może zapisać ponadto informacje o parametrach połączenia (w tym oznaczenie czasu, adres IP).</li>
                    </ol>
                </li>
                <li>Dane zbierane w ust. 5 lit. pkt 1 lit. a-e są wykorzystane w celu zawarcia umowy oraz wypełniania obowiązków prawnych ciążących na Administratorze. Dane zbierane w ust. 5 pkt 2 i 3 nie są w żaden sposób wykorzystywane do celów marketingowych lub do identyfikacji użytkownika, służą wyłącznie celom statystycznym.</li>
                <li>Dane podane w formularzach pod adresem {url} są przetwarzane wyłącznie w celu realizacji zgłoszenia.</li>
                <li>Dane osobowe użytkowników pozostawione w naszym serwisie nie zostaną udostępnione ani przekazane do krajów trzecich lub organizacji międzynarodowych.<br />Dane osobowe pozostawione w formularzu zgłoszeniowym mogą być przekazane do naszych partnerów, z którymi Administrator zawarł stosowną umowę udostępnienia bądź powierzenia danych osobowych.</li>
                <li>Do danych osobowych zawartych w formularzu przysługuje wgląd osobie fizycznej, która je tam umieściła. Osoba ta ma również prawo do dostępu do swoich danych, prawo do ich sprostowania, prawo żądania usunięcia lub ograniczenia przetwarzania, prawo do przenoszenia danych, wniesienie sprzeciwu wobec przetwarzania oraz cofnięcia zgody na przetwarzanie – w przypadkach i na warunkach określonych w Rozporządzeniu ogólnym. Szczegółowy zakres uprawnień Użytkownika podanych został w znajdującej się poniżej klauzuli informacyjnej.</li>
                <li>Zastrzegamy sobie prawo do zmiany w polityce prywatności, na które może wpłynąć rozwój technologii internetowej, ewentualne zmiany prawa w zakresie ochrony danych osobowych oraz rozwój naszego serwisu internetowego. O wszelkich zmianach będziemy informować w sposób widoczny i zrozumiały.</li>
                <li>W serwisie mogą pojawiać się linki do innych stron internetowych, zwłaszcza w artykułach, wiadomościach oraz w postaci obrazków. Takie strony internetowe nie są w żaden sposób nadzorowane przez nasz serwis. Strony te mogą posiadać własne polityki dotyczące prywatności oraz regulaminy, z którymi zalecamy się zapoznać.</li>
            </ol>
            <Typography variant="body1" className={classes.title}><b>Informacje o plikach cookies.</b></Typography>
            <ol>
                <li>Serwis korzysta z plików cookies (tzw. „ciasteczka”), które stanowią dane informatyczne, w szczególności pliki tekstowe, które przechowywane są w urządzeniu końcowym Użytkownika Serwisu i przeznaczone są do korzystania ze stron internetowych Serwisu. Cookies zazwyczaj zawierają nazwę strony internetowej, z której pochodzą, czas przechowywania ich na urządzeniu końcowym oraz unikalny numer. Podmiotem zamieszczającym na urządzeniu końcowym Użytkownika Serwisu pliki cookies oraz uzyskującym do nich dostęp jest operator Serwisu {getLinkToPage('', url, classes.link)}}.</li>
                <li>
                    Pliki cookies wykorzystywane są w następujących celach:
                    <ol className={classes.letteredList}>
                        <li>tworzenia statystyk, które pomagają zrozumieć, w jaki sposób Użytkownicy Serwisu korzystają ze stron internetowych, co umożliwia ulepszanie ich struktury i zawartości,</li>
                        <li>utrzymanie sesji Użytkownika Serwisu (po zalogowaniu), dzięki której Użytkownik nie musi na każdej podstronie Serwisu ponownie wpisywać loginu i hasła;</li>
                        <li>określania profilu użytkownika w celu wyświetlania mu dopasowanych materiałów w sieciach reklamowych, w szczególności sieci Google.</li>
                        <li>zapamiętania zmiany rozmiaru czcionki i kontrastu</li>
                    </ol>
                </li>
                <li>W ramach Serwisu stosowane są dwa zasadnicze rodzaje plików cookies: „sesyjne” (session cookies) oraz „stałe” (persistent cookies). Cookies „sesyjne” są plikami tymczasowymi, które przechowywane są w urządzeniu końcowym Użytkownika do czasu wylogowania, opuszczenia strony internetowej lub wyłączenia oprogramowania (przeglądarki internetowej). „Stałe” pliki cookies przechowywane są w urządzeniu końcowym Użytkownika przez czas określony w parametrach plików cookies lub do czasu ich usunięcia przez Użytkownika.</li>
                <li>Oprogramowanie do przeglądania stron internetowych (przeglądarka internetowa) zazwyczaj domyślnie dopuszcza przechowywanie plików cookies w urządzeniu końcowym Użytkownika. Użytkownicy Serwisu mogą dokonać zmiany ustawień w tym zakresie. Przeglądarka internetowa umożliwia usunięcie plików cookies. Możliwe jest także automatyczne blokowanie plików cookies. Szczegółowe informacje na ten temat zawiera pomoc lub dokumentacja przeglądarki internetowej. Ograniczenia stosowania plików cookies mogą wpłynąć na niektóre funkcjonalności dostępne na stronach internetowych Serwisu.</li>
                <li>Pliki cookies zamieszczane w urządzeniu końcowym Użytkownika Serwisu i wykorzystywane mogą być również przez współpracujących z operatorem Serwisu reklamodawców oraz partnerów. Zalecamy przeczytanie polityki ochrony prywatności tych firm, aby poznać zasady korzystania z plików cookie wykorzystywane w statystykach: Polityka ochrony prywatności Google Analytics. Pliki cookie mogą być wykorzystane przez sieci reklamowe, w szczególności sieć Google, do wyświetlenia reklam dopasowanych do sposobu, w jaki użytkownik korzysta z Serwisu. W tym celu mogą zachować informację o ścieżce nawigacji użytkownika lub czasie pozostawania na danej stronie. W zakresie informacji o preferencjach użytkownika gromadzonych przez sieć reklamową Google użytkownik może przeglądać i edytować informacje wynikające z plików cookies przy pomocy narzędzia: https://www.google.com/ads/preferences/</li>
            </ol>
            <p>
                W razie wątpliwości odnośnie zapisów niniejszej polityki prywatności prosimy o kontakt poprzez adres e-mail: {mail}.
            </p>
        </SubPage>
    );
}

export default RodoPage;
