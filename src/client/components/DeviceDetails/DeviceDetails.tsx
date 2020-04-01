/* Libraries */
import React from 'react';

/* Models */
import { Device, PersonType } from 'common/model/Device';
import { makeStyles, Typography, Chip, Paper } from '@material-ui/core';

/* Application files */
import { getDeviceStatusColor, getDeviceStatusText } from 'client/lib/device';
import DetailsList from 'client/components/DetailsList';

type Props = {
    device: Device;
}

const useStyles = makeStyles({
    statusWrapper: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        marginBottom: 10
    },
    tag: {
        marginRight: 10,
        marginTop: -2,
        borderRadius: 4,
        height: 'auto',
        fontSize: 12,
        fontWeight: 700,
        color: '#ffffff',
        marginLeft: 5
    },
    horizontally: {
        display: 'flex'
    },
    comments: {
        backgroundColor: 'rgba(0, 0, 0, .03)',
        padding: 10
    },
    gallery: {
        width: '100%',
        display: 'flex'
    },
    thumbnail: {
        width: 300,
        height: 300,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundOrigin: 'content-box',
        padding: 10,
        border: '1px solid rgba(0, 0, 0, 0.23)',
        margin: '10px 5px'
    }
});

export function DeviceDetails ({ device }: Props) {
    const classes = useStyles();

    return (
        <>
            <div className={classes.statusWrapper}>
                <Typography variant="subtitle2">Status:</Typography>
                <Chip style={{ backgroundColor: getDeviceStatusColor(device.status) }} label={getDeviceStatusText(device.status)} className={classes.tag} />
            </div>
            <div className={classes.horizontally}>
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
            </div>
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
        </>
    );
}

export default DeviceDetails;
