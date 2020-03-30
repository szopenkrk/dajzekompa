/* Libraries */
import React from 'react';
import clx from 'classnames';
import { Switch, Route } from 'react-router-dom';
import { makeStyles, Theme } from '@material-ui/core';

/* Application files */
import ListDevicesPage from '../ListDevicesPage';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
    },
    appBar: {
        transition: theme.transitions.create(['left'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    appbarShifted: {
        left: drawerWidth,
        transition: theme.transitions.create(['left'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        width: drawerWidth
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        position: 'relative',
        // marginTop: '64px',
        transition: theme.transitions.create('left', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    contentShift: {
        transition: theme.transitions.create('left', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        left: drawerWidth
    },
}));

export function AdminPage () {
    const classes = useStyles();
    // const [ open, setOpen ] = useState(false);

    // function toggleMenu (e: MouseEvent<HTMLButtonElement>) {
    //     e.stopPropagation();

    //     setOpen(!open);
    // }

    return (
        <section className={classes.container}>
            {/*
            <AppBar position="fixed" className={clx(classes.appBar, {
                [classes.appbarShifted]: open
            })}>
                <Toolbar>
                    <IconButton color="inherit" aria-label="Otwórz menu" onClick={toggleMenu} edge="start">
                        <Icon>menu</Icon>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer variant="persistent" anchor="left" open={open} className={classes.drawer} classes={{ paper: classes.drawerPaper }}>
                <List>
                    <Link to="/admin/devices">
                        <ListItem button>
                            <ListItemIcon><Icon>devices</Icon></ListItemIcon>
                            <ListItemText primary="Urządzenia" />
                        </ListItem>
                    </Link>
                </List>
            </Drawer>
            */}
            <main className={clx(classes.content, { [classes.contentShift]: false })}>
                <Switch>
                    <Route path="/admin/devices" component={ListDevicesPage} />
                </Switch>
            </main>
        </section>
    );
}

export default AdminPage;
