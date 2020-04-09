import { AnyAction } from 'redux';

import { ReduxActionType, StateSchools } from 'client/model/Redux';

function getInitialState (): StateSchools {
    return [];
}

export default function (state: StateSchools = getInitialState(), action: AnyAction): StateSchools {
    switch (action.type) {
        case ReduxActionType.SCHOOLS_ADD: {
            return state.concat(action.schools);
        }
        default: return state;
    }
}
