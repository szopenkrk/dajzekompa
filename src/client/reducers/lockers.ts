import { AnyAction } from 'redux';

import { ReduxActionType, StateLockers } from 'client/model/Redux';

function getInitialState (): StateLockers {
    return [];
}

export default function (state: StateLockers = getInitialState(), action: AnyAction): StateLockers {
    switch (action.type) {
        case ReduxActionType.LOCKERS_ADD: {
            return state.concat(action.lockers);
        }
        default: return state;
    }
}
