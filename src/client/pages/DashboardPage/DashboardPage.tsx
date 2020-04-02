/* Libraries */
import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent, makeStyles } from '@material-ui/core';
import { useDispatch as reduxUseDispatch } from 'react-redux';

/* Model */
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { DeviceStatus } from 'common/model/Device';
import { ProgramSummaryStatusList } from 'common/model/Program';
import { ReduxState } from 'client/model/Redux';

/* Application files */
import { getDeviceStatusText, getDeviceStatusColor } from 'client/lib/device';
import { loadProgramSummary } from 'client/actions/program';
import ProportionBar from 'client/components/ProportionBar';
import LoadingOverlay from 'client/components/LoadingOverlay';
import ErrorBox from 'client/components/ErrorBox';

const useDispatch = () => reduxUseDispatch<ThunkDispatch<ReduxState, any, Action>>();

function getProportionsFromSummary (statuses: ProgramSummaryStatusList) {
    return  Object.entries(statuses).map(([ status, number ]) => ({
        label: getDeviceStatusText(DeviceStatus[status]),
        color: getDeviceStatusColor(DeviceStatus[status]),
        value: number
    }));
}

const useStyles = makeStyles({
    panelFull: {
        width: '100%'
    }
});

export function DashboardPage () {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [ error, setError ] = useState(false);
    const [ loading, setLoading ] = useState(true);
    const [ statuses, setStatuses ] = useState(null as ProgramSummaryStatusList);

    async function requestProgramSummary () {
        try {
            const summary = await dispatch(loadProgramSummary());
            setStatuses(summary.statuses);
        } catch (error) {
            setError(error.message);
        }

        setLoading(false);
    }

    useEffect(() => {
        requestProgramSummary();
    }, []);

    if (loading) return <LoadingOverlay />;
    if (error) return <ErrorBox>Nie udało się załadować statystyk.</ErrorBox>;

    return (
        <Card className={classes.panelFull}>
            <CardHeader title="Statusy" />
            <CardContent>
                <ProportionBar proportions={getProportionsFromSummary(statuses)} percentage />
            </CardContent>
        </Card>
    );
}

export default DashboardPage;
