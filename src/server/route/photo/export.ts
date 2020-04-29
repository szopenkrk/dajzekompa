/* Models */
import { Request, Response } from 'express';
import { APIRoute } from 'server/model/API';
import { DBTable, DBSchemaPhoto } from 'server/model/DB';
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
    url: '/api/photos/export',
    protected: true,
    controller: async (req: Request, res: Response) => {
        const results = await knex(DBTable.PHOTOS).select() as DBSchemaPhoto[];

        const csvHeaders = [
            'Id',
            'ID urządzenia',
            'URL'
        ];

        const csvContent = results.map((receiver) => [
            receiver.id,
            receiver.deviceId,
            receiver.url
        ]);

        const csv = [ csvHeaders, ...csvContent ]
            .map((i) => i.join(';'))
            .reduce((all, current) => all + `${current}\n`, '');

        res.setHeader('Content-Disposition', `attachment;filename=dajzekompa-photos-${formatDate(new Date())}`);

        return res.send(csv);
    }
} as APIRoute;
