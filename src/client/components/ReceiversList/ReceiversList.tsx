/* Application files */
import React, { useState, useEffect } from 'react';
import { useSelector as reduxUseSelector, useDispatch as reduxUseDispatch, TypedUseSelectorHook } from 'react-redux';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Typography, Fab, Icon, Dialog, makeStyles, useMediaQuery, useTheme, DialogTitle, IconButton, DialogContent } from '@material-ui/core';

/* Models */
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { Receiver } from 'common/model/Receiver';
import { ReduxState } from 'client/model/Redux';

/* Application files */
import { list as listReceivers } from 'client/actions/receivers';
import LoadingOverlay from 'client/components/LoadingOverlay';
import ErrorBox from 'client/components/ErrorBox';
import ReceiverUpsert from 'client/components/ReceiverUpsert';

const useSelector = reduxUseSelector as TypedUseSelectorHook<ReduxState>;
const useDispatch = () => reduxUseDispatch<ThunkDispatch<ReduxState, any, Action>>();

const useStyles = makeStyles((theme) => ({
    row: {
        cursor: 'pointer'
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2)
    },
    dialog: {
        width: 600,
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
            alignItems: 'center'
        }
    }
}));

export function ReceiversList () {
    const classes = useStyles();
    const dispatch = useDispatch();
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down('xs'));
    const receivers = useSelector((state) => state.receivers);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState('');
    const [ addDialogOpen, setAddDialogOpen ] = useState(false);
    const [ editDialogOpen, setEditDialogOpen ] = useState(false);
    const [ selectedReceiver, setSelectedReceiver ] = useState(null);

    async function requestListReceivers () {
        setError('');
        setLoading(true);

        try {
            await dispatch(listReceivers());
        } catch (error) {
            setError(error.message);
        }

        setLoading(false);
    }

    function toggleAddDialog (val?: boolean) {
        return () => {
            if (typeof val !== 'undefined') return setAddDialogOpen(val);

            return setAddDialogOpen(!addDialogOpen);
        };
    }

    function toggleEditDialog (val: boolean, receiver?: Receiver) {
        return () => {
            if (val) setSelectedReceiver(receiver);
            else setSelectedReceiver(null);

            if (typeof val !== 'undefined') return setEditDialogOpen(val);

            return setEditDialogOpen(!editDialogOpen);
        };
    }

    useEffect(() => {
        requestListReceivers();
    }, []);

    if (loading) return <LoadingOverlay />;
    if (error) return <ErrorBox>{error}</ErrorBox>;

    return (
        <>
            {receivers.length === 0 && (
                <Typography variant="subtitle1">Brak osób potrzebujących.</Typography>
            )}
            {receivers.length > 0 && (
                <TableContainer>
                    <Table aria-label="Lista osób potrzebujących" size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Imię i nazwisko</TableCell>
                                <TableCell>Miasto</TableCell>
                                <TableCell>Urządzeń</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {receivers.map((receiver, index) => (
                                <TableRow key={index} onClick={toggleEditDialog(true, receiver)} className={classes.row} hover>
                                    <TableCell>{receiver.firstName} {receiver.lastName}</TableCell>
                                    <TableCell>{receiver.city}</TableCell>
                                    <TableCell>0</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            <Fab aria-label="Dodaj osobę potrzebującą" color="primary" onClick={toggleAddDialog()} className={classes.fab}>
                <Icon>add</Icon>
            </Fab>
            {(addDialogOpen || editDialogOpen) && (
                <Dialog open={selectedReceiver ? editDialogOpen : addDialogOpen} onClose={selectedReceiver ? toggleEditDialog(false) : toggleAddDialog(false)} classes={{ paper: classes.dialog }} fullScreen={mobile}>
                    <DialogTitle className={classes.dialogTitle} disableTypography>
                        <Typography variant="h6">{selectedReceiver ? 'Zaktualizuj' : 'Dodaj'} osobę potrzebującą</Typography>
                        <IconButton aria-label="Zamknij" onClick={selectedReceiver ? toggleEditDialog(false) : toggleAddDialog(false)}>
                            <Icon>close</Icon>
                        </IconButton>
                    </DialogTitle>
                    <DialogContent className={classes.dialogContent}>
                        <ReceiverUpsert onComplete={toggleAddDialog(false)} {...(selectedReceiver ? { receiver: selectedReceiver } : {})} />
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
}

export default ReceiversList;
