/* Models */
import { Request, Response } from 'express';
import { APIRoute } from 'server/model/API';
import { DBTable, DBSchemaDevice } from 'server/model/DB';
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
    url: '/api/devices/export',
    protected: true,
    controller: async (req: Request, res: Response) => {
        const results = await knex(DBTable.DEVICES).select() as DBSchemaDevice[];

        const csvHeaders = [
            'Id',
            'Rodzaj osoby',
            'Nazwa firmy',
            'NIP',
            'Imię',
            'Nazwisko',
            'Ulica',
            'Numer',
            'Miasto',
            'Kod pocztowy',
            'E-mail',
            'Numer konta',
            'Typ urządzenia',
            'Status',
            'Nazwa notebooka',
            'RAM',
            'HDD',
            'Rozmiar ekranu',
            'Kamera',
            'Mikrofon',
            'Głośniki',
            'Monitor',
            'Komentarze',
            'Zgoda TAP',
            'Zgoda INFC',
            'Zgoda DTCL',
            'Zgoda PBL'
        ];

        const csvContent = results.map((device) => [
            device.id,
            device.personType,
            device.companyName,
            device.nip,
            device.firstName,
            device.lastName,
            device.street,
            device.streetNumber,
            device.city,
            device.postcode,
            device.email,
            device.bankAccount,
            device.deviceType,
            device.status,
            device.notebookName,
            device.ram,
            device.hdd,
            device.screenSize,
            device.camera ? 'T' : 'N',
            device.microphone ? 'T' : 'N',
            device.speakers ? 'T' : 'N',
            device.monitor ? 'T' : 'N',
            device.comments.replace(/\n/g, ' '),
            formatDate(new Date(device.consentTap * 1000)),
            formatDate(new Date(device.consentInfc * 1000)),
            formatDate(new Date(device.consentDtcl * 1000)),
            formatDate(new Date(device.consentPbl * 1000))
        ]);

        const csv = [ csvHeaders, ...csvContent ]
            .map((i) => i.join(';'))
            .reduce((all, current) => all + `${current}\n`, '');

        res.setHeader('Content-Disposition', `attachment;filename=dajzekompa-devices-${formatDate(new Date())}`);

        return res.send(csv);
    }
} as APIRoute;
