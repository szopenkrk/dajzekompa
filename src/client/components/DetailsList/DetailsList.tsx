import React from 'react';
import { Table, TableBody, TableRow, TableCell, makeStyles, TableHead } from '@material-ui/core';

type Props = {
    label?: string;
    data: {
        label: string;
        value: any;
        show?: boolean;
    }[];
}

const useStyles = makeStyles({
    detailsTable: {
        maxWidth: '400px',
        marginRight: '40px',
        marginBottom: '40px'
    },
    detailsTableLabel: {
        backgroundColor: 'rgba(0, 0, 0, .03)'
    },
    header: {
        backgroundColor: 'rgba(0, 0, 0, .03)'
    }
})

export function DetailsList (props: Props) {
    const classes = useStyles();

    return (
        <Table className={classes.detailsTable} {...(props.label ? { 'aria-label': props.label } : {})}>
            {props.label && (
                <TableHead>
                    <TableRow>
                        <TableCell align="center" colSpan={2} className={classes.header}>{props.label}</TableCell>
                    </TableRow>
                </TableHead>
            )}
            <TableBody>
                {props.data.filter((prop) => {
                    return typeof prop.show === 'undefined' || prop.show;
                }).map((prop, index) => (
                    <TableRow key={index}>
                        <TableCell className={classes.detailsTableLabel}>{prop.label}</TableCell>
                        <TableCell>{prop.value}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default DetailsList;
