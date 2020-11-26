/* Libraries */
import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';

/* Application files */
import Config from 'client/lib/config';
import SubPage from 'client/pages/SubPage';

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
    title: {
        width: '100%',
        textAlign: 'center'
    }
}));

export function PrivacyPolicyPage () {
    const classes = useStyles();
    const mail = Config.CONTACT_EMAIL;

    return (
        <SubPage className={classes.container}>
            <p><b>Szanowny użytkowniku,</b></p>
            <p><b>Od dnia 25 maja 2018 r.</b> wszystkie podmioty przetwarzające dane osobowe, zobowiązane są do stosowania <i>Rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych i w sprawie swobodnego przepływu takich danych oraz uchylenia dyrektywy 95/46/WE</i> (Rozporządzenie ogólne o ochronie danych, zwane dalej: <b>RODO</b>).</p>
            <p>W związku z powyższym administrator serwisu internetowego www.dajzekompa.pl którym jest <b>Fundacja Poland Business Run</b> informuje, że w obrębie serwisu stosuje następującą <b>Politykę prywatności i ochrony danych osobowych</b>.</p>
            <Typography variant="h6" className={classes.title}>Polityka prywatności dla użytkowników Serwisu – uczestników Akcji „Dajże Kompa”</Typography>
            <p>Celem niniejszej Polityki Prywatności jest dostarczenie informacji o zasadach przetwarzania danych osobowych darczyńców, obdarowanych nauczycieli, dzieci i ich rodziców/opiekunów prawnych w ramach akcji charytatywnej „Dajże kompa” prowadzonej na zasadach opisanych regulaminem Akcji na stronie internetowej www.dajzekompa.pl.</p>
            <p>Akcja polega na zaangażowaniu środowisk biznesowych w działanie na rzecz społeczności lokalnych oraz środowisk potrzebujących wsparcia, w szczególności umożliwienie dzieciom ze środowisk wykluczenia cyfrowego naukę zdalną poprzez dostarczenie im odpowiedniego sprzętu komputerowego umożliwiającego pobieranie nauki w sposób zdalny.</p>
            <p>Rodzic/opiekun prawny zobowiązuje się przekazać Politykę Prywatności swoim dzieciom lub ich z nią zaznajomić w zrozumiałej dla nich formie, odpowiedniej do ich wieku.</p>
            <p>Zgodnie z art 13 ust 1 i 2 rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych i w sprawie swobodnego przepływu takich danych oraz uchylenia dyrektywy 95/46/WE (Rozporządzenie ogólne o ochronie danych („<b>RODO</b>”) oraz art. 14 ust. 1 i 2 RODO niniejszym informujemy, iż:</p>
            <ol>
                <li>Administratorem Pani/Pana danych osobowych jest Fundacja Poland Business Run z siedzibą w Krakowie (31-137), ul Siemiradzkiego 17/ 2, posiadająca REGON: 364424465, NIP: 6762507232, wpisana do rejestru stowarzyszeń, innych organizacji społecznych i zawodowych, fundacji oraz samodzielnych publicznych zakładów opieki zdrowotnej Krajowego Rejestru Sądowego pod numerem KRS 0000617320, której akta rejestrowe przechowywane są przez Sąd Rejonowy dla Krakowa – Śródmieścia w Krakowie, XI Wydział Gospodarczy KRS, tel. 123957811, e-mail: {mail}</li>
                <li>Administrator wyznaczył Inspektora Ochrony Danych z którym można się kontaktować pod adresem email: iod@iods.pl.</li>
                <li>
                    Pani/Pan dane osobowe podane podczas kontaktu z organizatorami akcji  ​będą przetwarzane wyłącznie w celu:
                    <ol className={classes.bracketedList}>
                        <li>zgłoszenia uczestnictwa w akcji „Dajże Kompa”, zmierzającego do zawarcia umowy, przekazania darowizny ​lub podejmowania innych działań na Pani/Pana żądanie przed zawarciem umowy (podstawa prawna: art. 6 ust. 1 lit b RODO),</li>
                        <li>zgłoszenia uczestnictwa w akcji „Dajże Kompa”, zamierzającego do otrzymania darowizny w postaci sprzętu komputerowego, a także w celu niezbędnego kontaktu w ramach ww. akcji (art. 6 ust. 1 lit. b RODO),</li>
                        <li>weryfikacji zgłoszenia osoby potencjalnie obdarowanej (dziecko lub nauczyciel) u dyrektorów szkół, pod kątem zgodności z wytycznymi regulaminu ww. akcji (art. 6 ust. 1 lit. a RODO),</li>
                        <li>realizacji obowiązków podatkowych i księgowo-rachunkowych oraz innych obowiązków prawnych ciążących na Administratorze (podstawa prawna: art. 6 ust. 1 lit c RODO),</li>
                        <li>umieszczenia danych osobowych na liście darczyńców – wyłącznie na podstawie Pani/Pana zgody (art. 6 ust. 1 lit. a RODO),</li>
                        <li>w zakresie danych osobowych uczestnika ww. akcji w zakresie w jakim jest to niezbędne do obsługi reklamacji - w celu realizacji prawnie uzasadnionego interesu Administratora polegającego na sprawnym wyjaśnieniu przyczyn reklamacji i załatwieniu sprawy – na podstawie art. 6 ust. 1 lit. f) RODO (uzasadniony interes prawny),</li>
                        <li>ewentualnego dochodzenia roszczeń lub obrony przed roszczeniami (art. 6 ust. 1 lit. f RODO) - w celu realizacji prawnie uzasadnionego interesu Administrator polegającego na obronie praw Administratora, tj. ustaleniu, dochodzeniu roszczeń lub praw Administratora lub obrony przed takimi roszczeniami</li>
                    </ol>
                </li>
                <li>Podanie danych osobowych jest dobrowolne, jednak konieczne do wzięcia udziału w akcji oraz zawarcia z nami umowy.</li>
                <li>Dane są pozyskiwane bezpośrednio od darczyńcy (tzw. dający kompa) oraz od obdarowanego w przypadku gdy jest nim nauczyciel. Dane osobowe obdarowanego dziecka w postaci jego imię, nazwisko, nazwa, nr szkoły, klasa są pozyskiwane od jego rodzica/opiekuna prawnego, a dane osobowe osób kontaktowych darczyńcy w zakresie imię, nazwisko, adres e- mail i nr telefonu mogą być pozyskiwane od darczyńcy.</li>
                <li>
                    Posiada Pani/Pan prawo do:
                    <ol className={classes.bracketedList}>
                        <li>Dostępu do treści swoich danych osobowych, czyli prawo do uzyskania potwierdzenia czy Administrator przetwarza dane oraz informacji dotyczących takiego przetwarzania,</li>
                        <li>Prawo do sprostowania danych, jeżeli dane przetwarzane przez Administratora są nieprawidłowe lub niekompletne,</li>
                        <li>Usunięcia lub ograniczenia przetwarzania danych osobowych – w sytuacji gdy przetwarzanie odbywa się na podstawie udzielonej Administratorowi zgody,</li>
                        <li>Przenoszenia danych,</li>
                        <li>Wniesienie sprzeciwu wobec przetwarzania danych na podstawie uzasadnionego interesu Administratora lub wobec przetwarzania w celu marketingu bezpośredniego,</li>
                        <li>Cofnięcia zgody w dowolnym momencie bez wpływu na zgodność z prawem przetwarzania, którego dokonano na podstawie zgody przed jej cofnięciem - jeżeli przetwarzanie odbywa się na podstawie udzielonej Administratorowi zgody – w przypadkach i na warunkach określonych w Rozporządzeniu ogólnym. Prawa wymienione w pkt 1-6 powyżej można zrealizować poprzez kontakt z Fundacją Poland Business Run, e-mail: {mail}.</li>
                    </ol>
                </li>
                <li>Pani/Pana dane osobowe mogą być przekazywane podmiotom przetwarzającym dane osobowe na zlecenie Administratora np. dostawcom usług IT i innym podmiotom przetwarzającym dane w celu określonych przez Administratora - przy czym takie podmioty przetwarzają dane wyłącznie na podstawie umowy z Administratorem.</li>
                <li>Odbiorcami Pani/Pana danych osobowych będą wyłącznie podmioty uprawnione do uzyskania danych osobowych na podstawie przepisów prawa, a także firma kurierska InPost sp. z o.o., z którą Administrator zawarł umowę udostępnienia danych. InPost sp. z o.o. z siedzibą przy ul. Wielickiej 28, 30-552 Kraków jest administratorem danych osobowych, w zakresie i w celach niezbędnych do doręczenia przesyłki w ramach ww. akcji, szczegółowe informacje na temat przetwarzania danych osobowych przez InPost Sp. z o.o. znajdują się w Polityce prywatności pod adresem: https://inpost.pl/polityka-prywatnosci. Pani/Pana dane osobowe będą przechowywane w bazie do momentu wycofania zgody na ich przetwarzanie lub przez czas niezbędny do realizacji umowy, okres rozpatrywania reklamacji, oraz wypełnianie obowiązków prawnych, ciążących na Administratorze (5 lat od końca roku podatkowego, w którym przekazane zostały dane osobowe) jak i okres przedawnienia roszczeń.</li>
                <li>Pani/Pana dane osobowe będą przechowywane w bazie do momentu wycofania zgody na ich przetwarzanie lub przez czas niezbędny do realizacji umowy, okres rozpatrywania reklamacji, oraz wypełnianie obowiązków prawnych, ciążących na Administratorze (5 lat od końca roku podatkowego, w którym przekazane zostały dane osobowe) jak i okres przedawnienia roszczeń.</li>
                <li>Posiada Pani/Pan prawo wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych, gdy uzasadnione jest, że Pana/Pani dane osobowe przetwarzane są przez administratora niezgodnie z przepisami Rozporządzenia ogólnego.</li>
                <li>Dane osobowe nie będą przetwarzane w sposób zautomatyzowany, w tym w formie profilowania.</li>
                <li>Dane osobowe nie będą przekazywane do organizacji międzynarodowych, jednakże mogą być przekazywane do państw trzecich niezapewniających odpowiedniego poziomu ochrony) (m.in. USA) poprzez korzystanie przez Administratora z narzędzi firm mających siedziby lub oddziały poza UE. Administrator przekazuje je wówczas wykorzystując mechanizmy transferowe zgodne z obowiązującym prawem. Więcej informacji o istniejących zabezpieczeniach wdrożonych przez Administratora w celu zapewnienia przetwarzania danych osobowych zgodnie z odpowiednimi przepisami, w przypadku przekazywania danych do państw trzecich oraz o możliwościach uzyskania kopii danych lub o miejscu udostępnienia danych można uzyskać kontaktując się z Administratorem pod adresem: dajzekompa@polandbusinessrun.pl.</li>
                <li>Administrator dokłada wszelkich starań, aby zapewnić wszelkie środki fizycznej, technicznej i organizacyjnej ochrony danych osobowych ​przed ich przypadkowym czy umyślnym zniszczeniem, utratą, zmianą, nieuprawnionym ujawnieniem, wykorzystaniem czy dostępem, zgodnie ze wszystkimi obowiązującymi przepisami.</li>
            </ol>
        </SubPage>
    );
}

export default PrivacyPolicyPage;
