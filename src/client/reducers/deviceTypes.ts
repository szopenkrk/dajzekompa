import { AnyAction } from 'redux';

import { ReduxActionType, StateDeviceTypes } from 'client/model/Redux';

function getInitialState (): StateDeviceTypes {
    return {
        types: [],
        inputs: {}
    };
}

export default function (state: StateDeviceTypes = getInitialState(), action: AnyAction): StateDeviceTypes {
    switch (action.type) {
        case ReduxActionType.DEVICE_TYPES_ADD: {
            return { ...state, types: state.types.concat(action.deviceTypes) };
        }
        case ReduxActionType.DEVICE_INPUTS_ADD: {
            state.inputs[action.deviceType] = action.inputs;

            return { ...state, inputs: { ...state.inputs } };
        }
        default: return state;
    }
}
