/* Models */
import { RawDevice } from 'common/model/Device';

export type DeviceForm = RawDevice & {
    ram: string;
    hdd: string;
    screenSize: string;
}
