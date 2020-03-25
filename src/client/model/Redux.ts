export enum ReduxActionType {
    UI_SET_LOADING = 'UI_SET_LOADING'
}

export type ReduxState = {
    ui: StateUI;
};

export type StateUI = {
    loading: boolean;
};