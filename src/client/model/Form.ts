/* Models */
import { Device } from 'common/model/Device';
import { Receiver } from 'common/model/Receiver';
import { Locker } from 'common/model/Locker';

export type DeviceForm = Device;

export type ReceiverForm = Omit<Receiver, 'locker'> & {
    locker: Locker;
};
