/* Libraries */
import React, { useState, useEffect } from 'react';
import clx from 'classnames';
import { useDispatch as reduxUseDispatch } from 'react-redux';
import { Typography, makeStyles } from '@material-ui/core';

/* Models */
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { Region } from 'common/model/Program';
import { ReduxState } from 'client/model/Redux';

/* Application files */
import { loadProgramSummary } from 'client/actions/program';
import { needyNumberLoad } from 'client/actions/needyNumber';
import LoadingOverlay from 'client/components/LoadingOverlay';
import RegionMap from 'client/components/RegionMap';

type Props = {
    className?: string;
};

function getPluralDeviceForm (num: number) {
    const lastDigit = parseInt(`${num}`.split('').pop(), 10);

    if (num === 1) return '';
    if (num >= 5 && num <= 21) return 'ów';

    if (lastDigit >= 2 && lastDigit <= 4) return 'y';

    return 'ów';
}

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

const useDispatch = () => reduxUseDispatch<ThunkDispatch<ReduxState, any, Action>>();

export function ProgramSummary (props: Props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [ error, setError ] = useState('');
    const [ loading, setLoading ] = useState(true);
    const [ devices, setDevices ] = useState(0);
    const [ needy, setNeedy ] = useState(0);
    const [ regions, setRegions ] = useState([] as Region[]);

    async function requestProgramSummary () {
        setError('');
        setLoading(true);

        try {
            const summary = await dispatch(loadProgramSummary());
            const total = Object.keys(summary.statuses).reduce((all, current) => all + summary.statuses[current], 0);
            const needy = await dispatch(needyNumberLoad());
            const devicesGetFromCompanies = 229;
            setDevices(total + devicesGetFromCompanies);
            setNeedy(needy);
            setRegions(summary.regions);
        } catch (error) {
            setError(error.message);
        }

        setLoading(false);
    }

    useEffect(() => {
        requestProgramSummary();
    }, []);

    if (error) return null;

    return (
        <section className={clx(classes.container, { [props.className]: !!props.className })}>
            {loading && <LoadingOverlay noBackground />}
            {!loading && (
                <>
                    <Typography variant="subtitle2">Jesteśmy w:</Typography>
                    <div className={classes.map}>
                        <RegionMap active={regions} />
                    </div>
                    <Typography variant="subtitle2">Zgłoszono:</Typography>
                    <div className={classes.counter}>
                        {`${devices}`.split('').map((digit, index) => (
                            <span className={classes.digit} key={index}>{digit}</span>
                        ))}
                    </div>
                    <Typography variant="subtitle2">KOMPUTER{getPluralDeviceForm(devices).toUpperCase()}</Typography>
                    <br/><br/>
                    <Typography variant="subtitle2">Potrzebujących:</Typography>
                    <div className={classes.counter}>
                        {`${needy}`.split('').map((digit, index) => (
                            <span className={classes.digit} key={index}>{digit}</span>
                        ))}
                    </div>
                    <Typography variant="subtitle2">Dzieci</Typography>
                </>
            )}
        </section>
    );
}

export default ProgramSummary;
