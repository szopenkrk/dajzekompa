/* Models */
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { Device } from 'common/model/Device';
import { ProgramSummary } from 'common/model/Program';
import { Receiver } from 'common/model/Receiver';
import { Locker } from 'common/model/Locker';

export enum ReduxActionType {
    DEVICES_ADD = 'DEVICES_ADD',
    PROGRAM_SUMMARY_LOAD = 'PROGRAM_SUMMARY_LOAD',
    UI_SET_LOADING = 'UI_SET_LOADING',
    USER_SIGNIN = 'USER_SIGNIN',
    USER_SIGNOUT = 'USER_SIGNOUT',
    RECEIVERS_ADD = 'RECEIVERS_ADD',
    RECEIVERS_UPDATE = 'RECEIVERS_UPDATE',
    LOCKERS_ADD = 'LOCKERS_ADD',
    SCHOOLS_ADD = 'SCHOOLS_ADD',
    NEEDY_NUMBER = 'NEEDY_NUMBER',
}

export type ReduxState = {
    devices: StateDevices;
    program: StateProgram;
    ui: StateUI;
    user: StateUser;
    receivers: StateReceivers;
    lockers: StateLockers;
    schools: StateSchools;
};

export type ReduxThunkAction<T> = ThunkAction<Promise<T>, ReduxState, undefined, Action<ReduxActionType>>;

export type StateUI = {
    loading: boolean;
};

export type StateUser = {
    token?: string;
    email: string;
    firstName: string;
    lastName: string;
};

export type StateDevices = Device[];

export type StateReceivers = Receiver[];

export type StateLockers = Locker[];

export type StateProgram = ProgramSummary;

export type StateSchools = string[];
