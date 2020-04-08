/* Models */
import { RawDevice } from 'common/model/Device';
import { Receiver } from 'common/model/Receiver';
import { Locker } from 'common/model/Locker';

export type DeviceForm = RawDevice & {
    ram: string;
    hdd: string;
    screenSize: string;
}

export type ReceiverForm = Receiver & {
    locker: Locker;
};
