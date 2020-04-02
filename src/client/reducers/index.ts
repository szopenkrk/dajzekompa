import { combineReducers } from 'redux';

import devices from 'client/reducers/devices';
import program from 'client/reducers/program';
import ui from 'client/reducers/ui';
import user from 'client/reducers/user';

export default combineReducers({
    devices,
    program,
    ui,
    user
});
