/* Models */
import { RawDevice } from 'common/model/Device';
import { Receiver } from 'common/model/Receiver';

export type DeviceForm = RawDevice & {
    ram: string;
    hdd: string;
    screenSize: string;
}

export type ReceiverForm = Receiver;
