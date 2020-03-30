import React, { useState } from 'react';
import { makeStyles, Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, withStyles } from '@material-ui/core';


import iconPlus from '../../assets/images/icon-plus.png';
import iconMinus from '../../assets/images/icon-minus.png';

type Props = {
    items: FaqItem[];
    title?: string;
    showToggleAll?: boolean;
};

type FaqItem = {
    question: string;
    answer: string;
};

const useStyles = makeStyles({
    title: {
        fontSize: '24px',
        fontWeight: 700
    },
    navigation: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '17px',
        justifyContent: 'space-between'
    },
    toggleLink: {
        color: '#6d7278',
        fontSize: '12px',
        cursor: 'pointer',
        '&::after': {
            content: '" / "'
        },
        '&:last-of-type::after': {
            content: '""'
        }
    },
    panel: {
        backgroundColor: '#f8f8f8',
        boxShadow: 'none',
        marginBottom: '12px',
        '&::before': {
            display: 'none'
        }
    },
    panelTitle: {
        display: 'flex',
        alignItems: 'center'
    },
    panelIcon: {
        width: '27px',
        height: '27px',
        marginRight: '35px'
    },
    panelContent: {
        paddingLeft: '62px'
    },
    question: {
        fontSize: '16px'
    }
});

const ExpansionPanelCustomSummary = withStyles({
    root: {
        display: 'flex',
        alignItems: 'center',
        minHeight: '56px',
        '&$expanded': {
            minHeight: '56px',
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

export function Faq (props: Props) {
    const classes = useStyles();
    const [ open, setOpen ] = useState(new Array(props.items.length).fill(false));

    function togglePanel (index: number) {
        return () => {
            const changed = [ ...open ];
            changed[index] = !open[index];

            setOpen(changed);
        };
    }

    function showAll () {
        setOpen(new Array(props.items.length).fill(true));
    }

    function hideAll () {
        setOpen(new Array(props.items.length).fill(false));
    }

    return (
        <>
            <nav className={classes.navigation}>
                {props.title && <Typography variant="h4" className={classes.title}>{props.title}</Typography>}
                {props.showToggleAll && (
                    <Typography variant="body2">
                        <span className={classes.toggleLink} onClick={showAll}>pokaż wszystko</span>
                        <span className={classes.toggleLink} onClick={hideAll}>zamknij wszystko</span>
                    </Typography>
                )}
            </nav>
            {props.items.map((item, index) => (
                <ExpansionPanel key={index} className={classes.panel} expanded={open[index]} onChange={togglePanel(index)}>
                    <ExpansionPanelCustomSummary className={classes.panelTitle}>
                        <img src={open[index] ? iconMinus : iconPlus} className={classes.panelIcon} />
                        <Typography variant="h6" className={classes.question}>{item.question}</Typography>
                    </ExpansionPanelCustomSummary>
                    <ExpansionPanelDetails>
                        <Typography variant="body1" className={classes.panelContent}>{item.answer}</Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            ))}
        </>
    );
}

export default Faq;
