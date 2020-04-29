/* Models */
import { Request, Response } from 'express';
import { APIRoute } from 'server/model/API';
import { DBTable, DBSchemaReceiver } from 'server/model/DB';
import { HTTPMethod } from 'server/model/HTTP';

/* Application files */
import knex from 'server/database/knex';

function pad (n: number, width: number, z: string = '0') {
    const s = n + '';

    return s.length >= width ? n : new Array(width - s.length + 1).join(z) + n;
}

function formatDate (d: Date): string {
    if (!d) return '';

    return `${pad(d.getDate(), 2)}-${pad(d.getMonth() + 1, 2)}-${d.getFullYear()}`;
}

export default {
    method: HTTPMethod.GET,
    url: '/api/receivers/export',
    protected: true,
    controller: async (req: Request, res: Response) => {
        const results = await knex(DBTable.RECEIVERS).select() as DBSchemaReceiver[];

        const csvHeaders = [
            'Id',
            'Rodzaj osoby',
            'Imię',
            'Nazwisko',
            'Imię opiekuna',
            'Nazwisko opiekuna',
            'Ulica',
            'Numer',
            'Miasto',
            'Kod pocztowy',
            'E-mail',
            'Telefon',
            'Paczkomat',
            'Szkoła',
            'Klasa',
            'Zgoda TAP',
            'Zgoda INFC',
            'Zgoda SCHV',
            'Zgoda CRTR'
        ];

        const csvContent = results.map((receiver) => [
            receiver.id,
            receiver.personType,
            receiver.firstName,
            receiver.lastName,
            receiver.caretakerFirstName,
            receiver.caretakerLastName,
            receiver.street,
            receiver.streetNumber,
            receiver.city,
            receiver.postcode,
            receiver.email,
            receiver.phone,
            receiver.locker,
            receiver.school,
            receiver.grade,
            formatDate(new Date(receiver.consentTap * 1000)),
            formatDate(new Date(receiver.consentInfc * 1000)),
            formatDate(new Date(receiver.consentSchv * 1000)),
            formatDate(new Date(receiver.consentCrtr * 1000))
        ]);

        const csv = [ csvHeaders, ...csvContent ]
            .map((i) => i.join(';'))
            .reduce((all, current) => all + `${current}\n`, '');

        res.setHeader('Content-Disposition', `attachment;filename=dajzekompa-receivers-${formatDate(new Date())}`);

        return res.send(csv);
    }
} as APIRoute;
