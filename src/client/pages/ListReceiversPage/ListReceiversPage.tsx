import React from 'react';
import { Toolbar, Button, Icon, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    toolbar: {
        padding: 0
    }
});

export function ListReceivers () {
    const classes = useStyles();

    return (
        <Toolbar className={classes.toolbar}>
            <Button variant="contained" color="primary" startIcon={<Icon>add</Icon>}>Dodaj</Button>
        </Toolbar>
    );
}

export default ListReceivers;
