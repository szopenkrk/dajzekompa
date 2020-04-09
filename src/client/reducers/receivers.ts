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
        case ReduxActionType.RECEIVERS_UPDATE: {
            if (action.receivers.length === 0) return state;

            action.receivers.forEach((receiver) => {
                const foundIndex = state.findIndex((r) => r.id === receiver.id);

                if (foundIndex !== -1) state[foundIndex] = receiver;
            });

            return [ ...state ];
        }
        default: return state;
    }
}
