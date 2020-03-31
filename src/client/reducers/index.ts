import { combineReducers } from 'redux';

import ui from 'client/reducers/ui';
import devices from 'client/reducers/devices';
import program from 'client/reducers/program';

export default combineReducers({
    ui,
    devices,
    program
});
