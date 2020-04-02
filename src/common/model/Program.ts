import { DeviceStatus } from 'common/model/Device';

export type ProgramSummary = {
    statuses: ProgramSummaryStatusList
};

export type ProgramSummaryStatusList = {
    [k in DeviceStatus]: number;
};
