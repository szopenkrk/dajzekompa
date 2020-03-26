import { combineReducers } from 'redux';

import ui from './ui';
import devices from './devices';

export default combineReducers({
    ui,
    devices
});
