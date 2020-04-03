import { combineReducers } from 'redux';

import devices from 'client/reducers/devices';
import receivers from 'client/reducers/receivers';
import program from 'client/reducers/program';
import ui from 'client/reducers/ui';
import user from 'client/reducers/user';

export default combineReducers({
    devices,
    receivers,
    program,
    ui,
    user
});
