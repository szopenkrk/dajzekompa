/* Libraries */
import React, { useState } from 'react';
import clx from 'classnames';
import { makeStyles, Typography } from '@material-ui/core';

/* Application files */
// import FaqItem from 'client/components/FaqItem';

type Props = {
    title?: string;
    showToggleAll?: boolean;
    children: React.ReactNode[];
    className?: string;
};

const useStyles = makeStyles({
    title: {
        fontSize: 24,
        fontWeight: 700
    },
    navigation: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        marginBottom: 17,
        justifyContent: 'space-between'
    },
    toggleLink: {
        color: '#6d7278',
        fontSize: 12,
        cursor: 'pointer',
        '&::after': {
            content: '" / "'
        },
        '&:last-of-type::after': {
            content: '""'
        }
    }
});

export function Faq ({ children, title, showToggleAll, className }: Props) {
    const classes = useStyles();
    const [ open, setOpen ] = useState(new Array(children.length).fill(false));

    function togglePanel (index: number) {
        return () => {
            const changed = [ ...open ];
            changed[index] = !open[index];

            setOpen(changed);
        };
    }

    function showAll () {
        setOpen(new Array(children.length).fill(true));
    }

    function hideAll () {
        setOpen(new Array(children.length).fill(false));
    }

    return (
        <div className={clx({ [className]: !!className })}>
            <nav className={classes.navigation}>
                {title && <Typography variant="h4" className={classes.title}>{title}</Typography>}
                {showToggleAll && (
                    <Typography variant="body2">
                        <span className={classes.toggleLink} onClick={showAll}>pokaż wszystko</span>
                        <span className={classes.toggleLink} onClick={hideAll}>zamknij wszystko</span>
                    </Typography>
                )}
            </nav>
            {React.Children.map(children, (child, index) => (
                React.cloneElement(child as React.ReactElement<any>, { open: open[index], onChange: togglePanel(index) })
            ))}
        </div>
    );
}

export default Faq;
