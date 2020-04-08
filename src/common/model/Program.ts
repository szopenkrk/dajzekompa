import { DeviceStatus } from 'common/model/Device';

export type ProgramSummary = {
    statuses: ProgramSummaryStatusList;
    regions: Region[];
};

export type ProgramSummaryStatusList = {
    [k in DeviceStatus]: number;
};

export enum Region {
    ZACHODNIO_POMORSKIE = 'ZACHODNIO_POMORSKIE',
    POMORSKIE = 'POMORSKIE',
    WARMINSKO_MAZURSKIE = 'WARMINSKO_MAZURSKIE',
    PODLASKIE = 'PODLASKIE',
    KUJAWSKO_POMORSKIE = 'KUJAWSKO_POMORSKIE',
    WIELKOPOLSKIE = 'WIELKOPOLSKIE',
    MAZOWIECKIE = 'MAZOWIECKIE',
    LUBUSKIE = 'LUBUSKIE',
    LODZKIE = 'LODZKIE',
    LUBELSKIE = 'LUBELSKIE',
    SWIETOKRZYSKIE = 'SWIETOKRZYSKIE',
    DOLNOSLASKIE = 'DOLNOSLASKIE',
    OPOLSKIE = 'OPOLSKIE',
    SLASKIE = 'SLASKIE',
    MALOPOLSKIE = 'MALOPOLSKIE',
    PODKARPACKIE = 'PODKARPACKIE'
}
