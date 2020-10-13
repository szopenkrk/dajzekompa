/* Libraries */
import React from 'react';
import clx from 'classnames';
import { Typography, makeStyles } from '@material-ui/core';

/* Models */

/* Application files */

import RegionMap from 'client/components/RegionMap';
import { Region } from 'common/model/Program';

type Props = {
    className?: string;
};
const useStyles = makeStyles((theme) => ({
    container: {
        width: 208,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        marginTop: 30
    },
    map: {
        height: 130,
        padding: '20px 0'
    },
    counter: {
        display: 'flex',
        justifyContent: 'center',
        margin: '10px 0'
    },
    digit: {
        width: 44,
        height: 44,
        borderRadius: 25,
        border: `2px solid ${theme.palette.primary.main}`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Roboto',
        fontSize: 30,
        fontWeight: 900,
        margin: '0 2px'
    }
}));

export function ProgramSummary (props: Props) {
    const classes = useStyles();
   
    return (
        <section className={clx(classes.container, { [props.className]: !!props.className })}>
                <>
                    <Typography variant="subtitle2">Jesteśmy w:</Typography>
                    <div className={classes.map}>
                        <RegionMap active={[Region.MALOPOLSKIE]} />
                    </div>
                    <Typography variant="subtitle2">Zgłoszono:</Typography>
                    <div className={classes.counter}>
                        
                            <span className={classes.digit} key="1">4</span>
                            <span className={classes.digit} key="2">2</span>
                            <span className={classes.digit} key="3">5</span>
                       
                    </div>
                    <Typography variant="subtitle2">KOMPUTERÓW</Typography>
                    <br/><br/>
                    <Typography variant="subtitle2">Potrzebujących:</Typography>
                    <div className={classes.counter}>
                        
                            <span className={classes.digit} key="1">1</span>
                            <span className={classes.digit} key="2">4</span>
                            <span className={classes.digit} key="3">4</span>
                            <span className={classes.digit} key="4">2</span>
                        
                    </div>
                    <Typography variant="subtitle2">Dzieci</Typography>
                </>
        </section>
    );
}

export default ProgramSummary;
