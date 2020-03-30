import { combineReducers } from 'redux';

import ui from './ui';
import devices from './devices';
import program from './program';

export default combineReducers({
    ui,
    devices,
    program
});
