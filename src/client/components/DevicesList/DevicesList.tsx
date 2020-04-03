/* Libraries */
import React, { useState, useEffect } from 'react'
import { useDispatch as reduxUseDispatch } from 'react-redux';
import { makeStyles, Typography, Chip, TableContainer, Table, TableBody, TableRow, TableCell, TableHead, Dialog } from '@material-ui/core';

/* Models */
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { Device, DeviceType } from 'common/model/Device';
import { ReduxState } from 'client/model/Redux';

/* Application files */
import { getDeviceStatusColor, getDeviceStatusText } from 'client/lib/device';
import { loadDevices } from 'client/actions/devices';
import ErrorBox from 'client/components/ErrorBox';
import DeviceDetails from 'client/components/DeviceDetails';
import LoadingOverlay from 'client/components/LoadingOverlay';

const useStyles = makeStyles({
    panel: {
        width: '100%'
    },
    panelPart: {
        display: 'flex'
    },
    content: {
        padding: 24,
        display: 'flex',
        flexWrap: 'wrap'
    },
    tag: {
        marginRight: 10,
        marginTop: -2,
        borderRadius: 4,
        height: 'auto',
        fontSize: 12,
        fontWeight: 700,
        color: '#ffffff'
    },
    iconWrapper: {
        display: 'flex',
        marginLeft: 5,
        alignItems: 'center'
    },
    icon: {
        fontSize: 18,
        marginRight: 3
    },
    row: {
        cursor: 'pointer'
    },
    dialog: {
        padding: 40,
        width: 1200,
        maxWidth: '100%'
    }
});

const useDispatch = () => reduxUseDispatch<ThunkDispatch<ReduxState, any, Action>>();

function getDeviceTypeText (type: DeviceType): string {
    switch (type) {
        case DeviceType.NOTEBOOK: return 'Laptop';
        case DeviceType.DESKTOP: return 'Desktop';
        default: return `${type}`;
    }
}

export function DevicesList () {
    const dispatch = useDispatch();
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState('');
    const [ devices, setDevices ] = useState(null as Device[]);
    const [ dialogOpen, setDialogOpen ] = useState(false);
    const [ selectedDevice, setSelectedDevice ] = useState(null);
    const classes = useStyles();

    async function requestLoadDevices () {
        setError('');
        setLoading(true);

        try {
            const devices = await dispatch(loadDevices());
            setDevices(devices);
        } catch (error) {
            setError(error.message);
        }

        setLoading(false);
    }

    function openDialog (device: Device) {
        return () => {
            setSelectedDevice(device);
            setDialogOpen(true);
        }
    }

    function closeDialog () {
        setDialogOpen(false);
        setSelectedDevice(null);
    }

    useEffect(() => {
        requestLoadDevices();
    }, []);

    return (
        <>
            {loading && (<LoadingOverlay />)}
            {error && (<ErrorBox>{error}</ErrorBox>)}
            {devices && devices.length === 0 && (
                <Typography variant="subtitle1">Brak urządzeń na liście.</Typography>
            )}
            {devices && devices.length > 0 && (
                <TableContainer>
                    <Table aria-label="Lista urządzeń" size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Typ</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Nazwa</TableCell>
                                <TableCell>Pamięć</TableCell>
                                <TableCell>Dysk twardy</TableCell>
                                <TableCell>Ekran</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {devices && devices.map((device, index) => (
                                <TableRow key={index} className={classes.row} onClick={openDialog(device)} hover>
                                    <TableCell>{getDeviceTypeText(device.deviceType)}</TableCell>
                                    <TableCell>
                                        <Chip style={{ backgroundColor: getDeviceStatusColor(device.status) }} label={getDeviceStatusText(device.status)} className={classes.tag} />
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {device.deviceType === DeviceType.NOTEBOOK ? device.notebookName : ''}
                                    </TableCell>
                                    <TableCell>{device.ram} GB</TableCell>
                                    <TableCell>{device.hdd} GB</TableCell>
                                    <TableCell>{device.screenSize}&quot;</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            {selectedDevice && (
                <Dialog onClose={closeDialog} open={dialogOpen} classes={{ paper: classes.dialog }}>
                    <DeviceDetails device={selectedDevice} />
                </Dialog>
            )}
        </>
    );
}

export default DevicesList;
