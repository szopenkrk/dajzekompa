/* Models */
import { Request, Response } from 'express';
import { Receiver } from 'common/model/Receiver';
import { APIRoute } from 'server/model/API';
import { DBTable, DBSchemaReceiver } from 'server/model/DB';
import { HTTPMethod } from 'server/model/HTTP';

/* Application files */
import knex from 'server/database/knex';

function sanitizeReceiver (receivers: DBSchemaReceiver[]): Receiver[] {
    return receivers;
}

function pad (n: number, width: number, z: string = '0') {
    const s = n + '';

    return s.length >= width ? n : new Array(width - s.length + 1).join(z) + n;
}

export default {
    method: HTTPMethod.GET,
    url: '/api/receivers/download',
    controller: async (req: Request, res: Response) => {
        const results = await knex(DBTable.RECEIVERS).select().where('complete', true) as DBSchemaReceiver[];
        const receivers = sanitizeReceiver(results).map((r) => ({ ...r, phone: r.phone.replace('+48', '') }));

        const csvHeaders = ['email', 'telefon', 'rozmiar', 'paczkomat', 'numer_referencyjny', 'ubezpieczenie', 'za_pobraniem', 'imie_i_nazwisko', 'ulica', 'kod_pocztowy', 'miejscowosc', 'typ_przesylki'];
        const csvContent = receivers.map((receiver) => [
            receiver.email,
            receiver.phone,
            null,
            receiver.locker,
            null,
            null,
            '',
            `${receiver.firstName} ${receiver.lastName}`,
            `${receiver.street} ${receiver.streetNumber}`,
            receiver.postcode,
            receiver.city,
            'paczkomaty'
        ]);

        const csv = [ csvHeaders, ...csvContent ]
            .map((i) => i.join(';'))
            .reduce((all, current) => all + `${current}\n`, '');
        const date = new Date();
        const now = `${pad(date.getDate(), 2)}-${pad(date.getMonth(), 2)}-${date.getFullYear()}`;

        res.setHeader('Content-Disposition', `attachment;filename=inpost-${now}`);

        return res.send(csv);
    }
} as APIRoute;
