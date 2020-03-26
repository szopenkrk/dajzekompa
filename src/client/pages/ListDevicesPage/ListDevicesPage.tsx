/* Libraries */
import React, { useState, useEffect } from 'react';
import { useDispatch as reduxUseDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { makeStyles, Paper, ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails, withStyles, Chip, PropTypes, Icon, Table, TableBody, TableRow, TableCell } from '@material-ui/core';

/* Models */
import { Action } from 'redux';
import { ReduxState } from '../../model/Redux';

/* Application files */
import { Device, DeviceType, PersonType } from '../../model/Device';
import { loadDevices } from '../../actions/devices';
import LoadingOverlay from '../../components/LoadingOverlay';
import ErrorBox from '../../components/ErrorBox';

const useStyles = makeStyles({
    root: {
        padding: '10px',
        display: 'flex',
        justifyContent: 'center'
    },
    container: {
        padding: '3vw',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        // width: '44rem',
        width: '100%',
        '@media (min-width: 800px)': {
            padding: '24px'
        }
    },
    panel: {
        width: '100%'
    },
    panelPart: {
        display: 'flex'
    },
    content: {
        padding: '24px',
        display: 'flex',
        flexWrap: 'wrap'
    },
    tag: {
        marginRight: '10px',
        borderRadius: '4px',
        height: 'auto',
        fontSize: '12px'
    },
    iconWrapper: {
        display: 'flex',
        marginLeft: '5px',
        alignItems: 'center'
    },
    icon: {
        fontSize: '18px',
        marginRight: '3px'
    },
    detailsTable: {
        maxWidth: '400px',
        marginRight: '40px',
        marginBottom: '40px'
    },
    detailsTableLabel: {
        backgroundColor: 'rgba(0, 0, 0, .03)'
    },
    comments: {
        backgroundColor: 'rgba(0, 0, 0, .03)',
        padding: '10px'
    }
});

const ExpansionPanelCustomSummary = withStyles({
    root: {
        backgroundColor: 'rgba(0, 0, 0, .03)',
        marginBottom: -1,
        minHeight: 56,
        alignItems: 'center',
        '&$expanded': {
            minHeight: 56,
        },
    },
    content: {
        justifyContent: 'space-between',
    },
    expanded: {}
})(ExpansionPanelSummary);

const useDispatch = () => reduxUseDispatch<ThunkDispatch<ReduxState, any, Action>>();

function getDeviceColor (type: DeviceType): PropTypes.Color {
    switch (type) {
        case DeviceType.NOTEBOOK: return "primary";
        case DeviceType.DESKTOP: return "secondary";
        default: return "default";
    }
}

export function ListDevicesPage () {
    const dispatch = useDispatch();
    const [ expanded, setExpanded ] = useState(-1);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState('');
    const [ devices, setDevices ] = useState(null as Device[]);
    const classes = useStyles();

    useEffect(() => {
        requestLoadDevices();
    }, []);

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

    function expand (index) {
        return () => {
            if (expanded === index) setExpanded(-1);
            else setExpanded(index);
        };
    }

    return (
        <main className={classes.root}>
            <Paper variant="outlined" className={classes.container}>
                {loading && (<LoadingOverlay />)}
                {error && (<ErrorBox>{error}</ErrorBox>)}
                {devices && devices.map((device, index) => (
                    <ExpansionPanel key={index} className={classes.panel} square expanded={expanded === index} onChange={expand(index)}>
                        <ExpansionPanelCustomSummary aria-controls={`panel${index}-content`} id={`panel${index}-header`}>
                            <div className={classes.panelPart}>
                                <Chip color={getDeviceColor(device.deviceType)} label={device.deviceType} className={classes.tag} />
                                <Typography>
                                    {device.deviceType === DeviceType.NOTEBOOK ? device.notebookName : ''} (4GB/500GB/17")
                                </Typography>
                                {device.deviceType === DeviceType.DESKTOP && (
                                    <div className={classes.iconWrapper}>
                                        {!device.microphone && <Icon className={classes.icon}>mic_off</Icon>}
                                        {!device.camera && <Icon className={classes.icon}>videocam_off</Icon>}
                                        {!device.speakers && <Icon className={classes.icon}>volume_off</Icon>}
                                        {!device.monitor && <Icon className={classes.icon}>desktop_access_disabled</Icon>}
                                    </div>
                                )}
                            </div>
                            <div>
                                {device.personType === PersonType.COMPANY && (<Chip color="default" label="Firma" className={classes.tag}></Chip>)}
                            </div>
                        </ExpansionPanelCustomSummary>
                        <ExpansionPanelDetails className={classes.content}>
                            <Table className={classes.detailsTable} aria-label="Specyfikacja sprzętu">
                                <TableBody>
                                    <TableRow>
                                        <TableCell className={classes.detailsTableLabel}>Rozmiar ekranu</TableCell>
                                        <TableCell>{device.screenSize}"</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.detailsTableLabel}>RAM</TableCell>
                                        <TableCell>{device.ram}GB</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.detailsTableLabel}>HDD</TableCell>
                                        <TableCell>{device.hdd}GB</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                            <Table className={classes.detailsTable} aria-label="Dane kontaktowe">
                                <TableBody>
                                    {device.personType === PersonType.COMPANY && (
                                        <TableRow>
                                            <TableCell className={classes.detailsTableLabel}>Nazwa firmy</TableCell>
                                            <TableCell>{device.companyName}</TableCell>
                                        </TableRow>
                                    )}
                                    {device.personType === PersonType.COMPANY && (
                                        <TableRow>
                                            <TableCell className={classes.detailsTableLabel}>NIP</TableCell>
                                            <TableCell>{device.nip}</TableCell>
                                        </TableRow>
                                    )}
                                    {device.personType === PersonType.PERSON && (
                                        <TableRow>
                                            <TableCell className={classes.detailsTableLabel}>Imię</TableCell>
                                            <TableCell>{device.firstName}</TableCell>
                                        </TableRow>
                                    )}
                                    {device.personType === PersonType.PERSON && (
                                        <TableRow>
                                            <TableCell className={classes.detailsTableLabel}>Nazwisko</TableCell>
                                            <TableCell>{device.lastName}</TableCell>
                                        </TableRow>
                                    )}
                                    <TableRow>
                                        <TableCell className={classes.detailsTableLabel}>E-mail</TableCell>
                                        <TableCell>{device.email}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                            <div style={{ width: '100%' }}>
                                <Typography variant="subtitle1">Komentarze:</Typography>
                                <Typography variant="body2" className={classes.comments}>{device.comments}</Typography>
                            </div>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                ))}
            </Paper>
        </main>
    );
}

export default ListDevicesPage;
