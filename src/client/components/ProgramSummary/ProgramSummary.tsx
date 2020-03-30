/* Libraries */
import React, { useState, useEffect } from 'react';
import clx from 'classnames';
import { useDispatch as reduxUseDispatch } from 'react-redux';
import { Typography, makeStyles } from '@material-ui/core';

/* Models */
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { ReduxState } from '../../model/Redux';

/* Application files */
import { loadProgramSummary } from '../../actions/program';
import LoadingOverlay from '../LoadingOverlay';

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
        width: '208px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        marginTop: '30px'
    },
    map: {
        height: '130px',
        padding: '20px 0'
    },
    counter: {
        display: 'flex',
        justifyContent: 'center',
        margin: '10px 0'
    },
    digit: {
        width: '44px',
        height: '44px',
        borderRadius: '25px',
        border: `2px solid ${theme.palette.primary.main}`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Roboto',
        fontSize: '30px',
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

    useEffect(() => {
        requestProgramSummary();
    }, []);

    async function requestProgramSummary () {
        setError('');
        setLoading(true);

        try {
            const summary = await dispatch(loadProgramSummary());
            setDevices(summary.totalDevices);
        } catch (error) {
            setError(error.message);
        }

        setLoading(false);
    }

    if (error) return null;

    return (
        <section className={clx(classes.container, { [props.className]: !!props.className })}>
            {loading && <LoadingOverlay />}
            {!loading && (
                <>
                    <Typography variant="subtitle2">Jesteśmy w:</Typography>
                    <div className={classes.map}>
                        {/* TODO: Add map */}
                    </div>
                    <Typography variant="subtitle2">PRZEKAZALIŚMY:</Typography>
                    <div className={classes.counter}>
                        {`${devices}`.split('').map((digit, index) => (
                            <span className={classes.digit} key={index}>{digit}</span>
                        ))}
                    </div>
                    <Typography variant="subtitle2">KOMPUTER{getPluralDeviceForm(devices).toUpperCase()}</Typography>
                </>
            )}
        </section>
    );
}

export default ProgramSummary;
