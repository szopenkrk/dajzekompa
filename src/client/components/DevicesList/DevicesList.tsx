/* Libraries */
import React, { useState, useEffect } from 'react'
import { useSelector as reduxUseSelector, useDispatch as reduxUseDispatch, TypedUseSelectorHook } from 'react-redux';
import { makeStyles, Typography, Chip, TableContainer, Table, TableBody, TableRow, TableCell, TableHead, Dialog, DialogTitle, IconButton, Icon, DialogContent, useMediaQuery, useTheme } from '@material-ui/core';

/* Models */
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { Device } from 'common/model/Device';
import { ReduxState } from 'client/model/Redux';

/* Application files */
import { getDeviceStatusColor, getDeviceStatusText } from 'client/lib/device';
import { list as listDevices } from 'client/actions/devices';
import ErrorBox from 'client/components/ErrorBox';
import DeviceDetails from 'client/components/DeviceDetails';
import LoadingOverlay from 'client/components/LoadingOverlay';

const useSelector = reduxUseSelector as TypedUseSelectorHook<ReduxState>;
const useDispatch = () => reduxUseDispatch<ThunkDispatch<ReduxState, any, Action>>();

const useStyles = makeStyles((theme) => ({
    tag: {
        marginRight: 10,
        marginTop: -2,
        borderRadius: 4,
        height: 'auto',
        fontSize: 12,
        fontWeight: 700,
        color: '#ffffff'
    },
    row: {
        cursor: 'pointer'
    },
    dialog: {
        width: 1200,
        maxWidth: '100%',
        padding: theme.spacing(3)
    },
    dialogTitle: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 0,
        [theme.breakpoints.down('xs')]: {
            padding: `${theme.spacing(2)}px 0`
        }
    },
    dialogContent: {
        padding: 0,
        [theme.breakpoints.down('xs')]: {
            height: '100%',
            display: 'flex',
            // alignItems: 'center' /* TODO: Causes dialog content hidden under title, investigate */
        }
    }
}));

export function DevicesList () {
    const classes = useStyles();
    const dispatch = useDispatch();
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down('xs'));
    const devices = useSelector((state) => state.devices);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState('');
    const [ detailsDialogOpen, setDetailsDialogOpen ] = useState(false);
    const [ selectedDevice, setSelectedDevice ] = useState(null);

    async function reqestListDevices () {
        setError('');
        setLoading(true);

        try {
            await dispatch(listDevices());
        } catch (error) {
            setError(error.message);
        }

        setLoading(false);
    }

    function toggleDetailsDialog (val?: boolean, device?: Device) {
        return () => {
            setSelectedDevice(device || null);

            if (typeof val !== 'undefined') return setDetailsDialogOpen(val);

            return setDetailsDialogOpen(!detailsDialogOpen);
        };
    }

    useEffect(() => {
        reqestListDevices();
    }, []);

    if (loading) return <LoadingOverlay />;
    if (error) return <ErrorBox>{error}</ErrorBox>;

    return (
        <>
            {devices.length === 0 && (
                <Typography variant="subtitle1">Brak urządzeń.</Typography>
            )}
            {devices.length > 0 && (
                <TableContainer>
                    <Table aria-label="Lista urządzeń" size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Typ</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {devices && devices.map((device, index) => (
                                <TableRow key={index} className={classes.row} onClick={toggleDetailsDialog(true, device)} hover>
                                    <TableCell>{device.type}</TableCell>
                                    <TableCell>
                                        <Chip style={{ backgroundColor: getDeviceStatusColor(device.status) }} label={getDeviceStatusText(device.status)} className={classes.tag} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            {detailsDialogOpen && selectedDevice && (
                <Dialog onClose={toggleDetailsDialog(false)} open={detailsDialogOpen} classes={{ paper: classes.dialog }} fullScreen={mobile}>
                    <DialogTitle className={classes.dialogTitle} disableTypography>
                        <Typography variant="h6">Szczegóły urządzenia</Typography>
                        <IconButton aria-label="Zamknij" onClick={toggleDetailsDialog(false)}>
                            <Icon>close</Icon>
                        </IconButton>
                    </DialogTitle>
                    <DialogContent className={classes.dialogContent}>
                        <DeviceDetails device={selectedDevice} />
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
}

export default DevicesList;
