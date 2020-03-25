import { AnyAction } from 'redux';

import { ReduxActionType, StateUI } from '../model/Redux';

function getInitialState (): StateUI {
    return {
        loading: true
    };
}

export default function (state: StateUI = getInitialState(), action: AnyAction): StateUI {
    switch (action.type) {
        case ReduxActionType.UI_SET_LOADING: {
            return { ...state, loading: action.loading };
        }
        default: return state;
    }
}
