/* Libraries */
import React, { PropsWithChildren } from 'react';
import { makeStyles, Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, withStyles } from '@material-ui/core';

/* Application files */
import iconPlus from 'client/assets/images/icon-plus.png';
import iconMinus from 'client/assets/images/icon-minus.png';

type Props = {
    title: string;
    open?: boolean;
    onChange?: (event: React.ChangeEvent<{}>, expanded: boolean) => void;
}

const useStyles = makeStyles({
    panel: {
        width: '100%',
        backgroundColor: '#f8f8f8',
        boxShadow: 'none',
        marginBottom: 12,
        '&::before': {
            display: 'none'
        }
    },
    panelTitle: {
        display: 'flex',
        alignItems: 'center'
    },
    panelIcon: {
        width: 27,
        height: 27,
        marginRight: 35
    },
    panelContent: {
        paddingLeft: 86,
        display: 'inline-block',
        fontFamily: 'Roboto',
        lineHeight: 1.5,
        letterSpacing: '0.00938em'
    },
    question: {
        fontSize: 16
    }
});

const ExpansionPanelCustomSummary = withStyles({
    root: {
        display: 'flex',
        alignItems: 'center',
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        }
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {
    }
})(ExpansionPanelSummary);

export function FaqItem ({ open, title, onChange, children }: PropsWithChildren<Props>) {
    const classes = useStyles();

    return (
        <ExpansionPanel className={classes.panel} expanded={open} onChange={onChange}>
            <ExpansionPanelCustomSummary className={classes.panelTitle}>
                <img src={open ? iconMinus : iconPlus} className={classes.panelIcon} />
                <Typography variant="h6" className={classes.question}>{title}</Typography>
            </ExpansionPanelCustomSummary>
            <ExpansionPanelDetails className={classes.panelContent}>
                {children}
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
}

export default FaqItem;
