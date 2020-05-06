/* Models */
import { Request, Response } from 'express';
import { ProgramSummary, Region, ProgramSummaryStatusList } from 'common/model/Program';
import { APIRoute } from 'server/model/API';
import { HTTPMethod, HTTPCode } from 'server/model/HTTP';

/* Application files */
import knex from 'server/database/knex';
import Log from 'server/controller/Log';
import { respondSuccess, closeWithError } from 'server/lib/http';
import { DBTable } from 'server/model/DB';
import { DeviceStatus } from 'common/model/Device';

async function loadStatuses (callback: (r: ProgramSummaryStatusList) => void): Promise<void> {
    const statuses = await knex(DBTable.DEVICES).select('status').count('status as total').groupBy('status');
    const result = statuses.reduce((all, item) => {
        all[item.status] = parseInt(item.total, 10);

        return all;
    }, {} as ProgramSummaryStatusList);

    return callback(result);
}

async function loadRegions (callback: (r: Region[]) => void): Promise<void> {
    const regions = await knex(DBTable.CITIES).select('region').groupBy('region');
    const result = regions.map((item) => Region[item.region]);

    return callback(result);
}

export default {
    method: HTTPMethod.GET,
    url: '/api/program',
    controller: async (req: Request, res: Response) => {
        const programSummary: ProgramSummary = {
            statuses: {
                [DeviceStatus.RECEIVED]: 0,
                [DeviceStatus.SENT_TO_SERVICE]: 0,
                [DeviceStatus.IN_SERVICE]: 0,
                [DeviceStatus.SERVICE_COMPLETE]: 0,
                [DeviceStatus.SENT_TO_RECIPIENT]: 0,
                [DeviceStatus.COMPLETE]: 0
            },
            regions: [],
            needy: 0,
        };

        try {
            await Promise.all([
                loadStatuses((res) => programSummary.statuses = res),
                loadRegions((res) => programSummary.regions = res)
            ])
        } catch (error) {
            Log.error(error);

            return closeWithError(res, { error }, HTTPCode.INTERNAL_SERVER_ERROR);
        }

        return respondSuccess(res, programSummary);
    }
} as APIRoute;
