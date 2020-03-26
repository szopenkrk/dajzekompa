import { Device } from './Device';

export enum ReduxActionType {
    UI_SET_LOADING = 'UI_SET_LOADING',
    DEVICES_LOAD = 'DEVICES_LOAD'
}

export type ReduxState = {
    ui: StateUI;
};

export type StateUI = {
    loading: boolean;
};

export type StateDevices = Device[];
