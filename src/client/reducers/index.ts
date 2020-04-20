import { combineReducers } from 'redux';

import devices from 'client/reducers/devices';
import deviceTypes from 'client/reducers/deviceTypes';
import lockers from 'client/reducers/lockers';
import receivers from 'client/reducers/receivers';
import program from 'client/reducers/program';
import schools from 'client/reducers/schools';
import ui from 'client/reducers/ui';
import user from 'client/reducers/user';

export default combineReducers({
    devices,
    deviceTypes,
    lockers,
    receivers,
    program,
    schools,
    ui,
    user
});
