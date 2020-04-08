/* Libraries */
import { green, lightGreen, lime, amber, orange, deepOrange, grey } from '@material-ui/core/colors';

/* Models */
import { DeviceStatus } from 'common/model/Device';


export function getDeviceStatusColor (type: DeviceStatus): string {
    switch (type) {
        case DeviceStatus.RECEIVED: return deepOrange[700];
        case DeviceStatus.SENT_TO_SERVICE: return orange[700];
        case DeviceStatus.IN_SERVICE: return amber[700];
        case DeviceStatus.SERVICE_COMPLETE: return lime[700];
        case DeviceStatus.SENT_TO_RECIPIENT: return lightGreen[700];
        case DeviceStatus.COMPLETE: return green[700];
        default: return grey[700];
    }
}

export function getDeviceStatusText (status: DeviceStatus): string {
    switch (status) {
        case DeviceStatus.RECEIVED: return 'U darczyńcy';
        case DeviceStatus.SENT_TO_SERVICE: return 'Wysłano do serwisu';
        case DeviceStatus.IN_SERVICE: return 'W serwisie';
        case DeviceStatus.SERVICE_COMPLETE: return 'Serwis zakończony';
        case DeviceStatus.SENT_TO_RECIPIENT: return 'Wysłano do odbiorcy';
        case DeviceStatus.COMPLETE: return 'U odbiorcy';
        default: return 'Nieznany';
    }
}
