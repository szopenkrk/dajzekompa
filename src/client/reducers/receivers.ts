import { AnyAction } from 'redux';

import { ReduxActionType, StateReceivers } from 'client/model/Redux';

function getInitialState (): StateReceivers {
    return [];
}

export default function (state: StateReceivers = getInitialState(), action: AnyAction): StateReceivers {
    switch (action.type) {
        case ReduxActionType.RECEIVERS_ADD: {
            return state.concat(action.receivers);
        }
        default: return state;
    }
}
