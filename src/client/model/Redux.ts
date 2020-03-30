import { Device } from './Device';
import { ProgramSummary } from './Program';

export enum ReduxActionType {
    UI_SET_LOADING = 'UI_SET_LOADING',
    DEVICES_LOAD = 'DEVICES_LOAD',
    PROGRAM_SUMMARY_LOAD = 'PROGRAM_SUMMARY_LOAD'
}

export type ReduxState = {
    ui: StateUI;
    program: StateProgram;
};

export type StateUI = {
    loading: boolean;
};

export type StateDevices = Device[];

export type StateProgram = ProgramSummary;
