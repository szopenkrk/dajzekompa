/* Libraries */
import React from 'react';
import { Map, TileLayer } from 'react-leaflet';
import { makeStyles } from '@material-ui/core';

type Props = {
    lat?: string;
    lng?: string;
    zoom?: string;
};

const useStyles = makeStyles({
    wrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        flexDirection: props => (props as any).vertical ? 'column' : 'row'
    },
});


export function Maps (props: Props) {
    const classes = useStyles(props);
    // const position = [props.lat, props.lng];
    return (
        <>
            <section className={classes.wrapper}>
            <Map center={[45.4, -75.7]} zoom={12}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
            </Map>
            </section>
        </>
    );
}

export default Maps;
