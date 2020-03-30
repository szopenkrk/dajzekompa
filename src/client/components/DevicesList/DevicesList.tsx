/* Libraries */
import React, { useState, useEffect } from 'react';
import clx from 'classnames';
import { useDispatch as reduxUseDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { makeStyles, Paper, ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails, withStyles, Chip, PropTypes, Icon } from '@material-ui/core';

/* Models */
import { Action } from 'redux';
import { ReduxState } from '../../model/Redux';

/* Application files */
import { Device, DeviceType, PersonType, DeviceStatus } from '../../model/Device';
import { loadDevices } from '../../actions/devices';
import LoadingOverlay from '../LoadingOverlay';
import DetailsList from '../DetailsList';
import ErrorBox from '../ErrorBox';

const useStyles = makeStyles({
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
    comments: {
        backgroundColor: 'rgba(0, 0, 0, .03)',
        padding: '10px'
    },
    gallery: {
        width: '100%',
        display: 'flex'
    },
    thumbnail: {
        width: '300px',
        height: '300px',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundOrigin: 'content-box',
        padding: '10px',
        border: '1px solid rgba(0, 0, 0, 0.23)',
        margin: '10px 5px'
    },
    statusWrapper: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px'
    },
    status: {
        marginLeft: '5px'
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

function getDeviceStatusText (type: DeviceStatus): string {
    switch (type) {
        case DeviceStatus.RECEIVED: return 'Otrzymano wniosek';
        case DeviceStatus.SENT_TO_SERVICE: return 'Wysłano do serwisu';
        case DeviceStatus.IN_SERVICE: return 'W serwisie';
        case DeviceStatus.SENT_TO_RECIPIENT: return 'Wysłano do odbiorcy';
        case DeviceStatus.COMPLETE: return 'Dostarczono do potrzebującego';
    }
}

export function DevicesList () {
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
        <>
            {loading && (<LoadingOverlay />)}
            {error && (<ErrorBox>{error}</ErrorBox>)}
            {devices && devices.length === 0 && (
                <Typography variant="subtitle1">Brak urządzeń na liście.</Typography>
            )}
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
                        <div className={classes.statusWrapper}>
                            <Typography variant="subtitle2">Status:</Typography>
                            <Chip label={getDeviceStatusText(device.status)} className={clx(classes.tag, classes.status)} />
                        </div>
                        <DetailsList label="Specyfikacja sprzętu" data={[
                            { label: 'Rozmiar ekranu', value: `${device.screenSize}"` },
                            { label: 'RAM', value: `${device.ram}GB` },
                            { label: 'HDD', value: `${device.hdd}GB` }
                        ]} />
                        <DetailsList label="Dane kontaktowe" data={[
                            { label: 'Nazwa firmy', value: device.companyName, show: device.personType === PersonType.COMPANY },
                            { label: 'NIP', value: device.nip, show: device.personType === PersonType.COMPANY },
                            { label: 'Imię', value: device.firstName, show: device.personType === PersonType.PERSON },
                            { label: 'Nazwisko', value: device.lastName, show: device.personType === PersonType.PERSON },
                            { label: 'E-mail', value: device.email }
                        ]} />
                        {device.comments && (
                            <div style={{ width: '100%', marginBottom: '20px' }}>
                                <Typography variant="subtitle1">Komentarze:</Typography>
                                <Typography variant="body2" className={classes.comments}>
                                    {device.comments.split('\n').map((item, index) => (
                                        <span key={index}>
                                            {item}
                                            <br />
                                        </span>
                                    ))}
                                </Typography>
                            </div>
                        )}
                        <Paper className={classes.gallery} elevation={0}>
                            {device.photos.map((photo, index) => (
                                <article key={index} className={classes.thumbnail} style={{ backgroundImage: `url("${photo}")`}}></article>
                            ))}
                        </Paper>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            ))}
        </>
    );
}

export default DevicesList;
