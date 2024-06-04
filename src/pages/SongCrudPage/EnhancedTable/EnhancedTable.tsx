/*
*   Reference: https://mui.com/material-ui/react-table/
*/

import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import EnhancedTableToolbar from "./EnhancedTableToolbar";
import EnhancedTableHead from "./EnhancedTableHead";
import {IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { toSentenceCase } from './StringExtensions';

// function descendingComparator(a: object, b: object, orderBy: string) {
//     if (b[orderBy] < a[orderBy]) {
//         return -1;
//     }
//     if (b[orderBy] > a[orderBy]) {
//         return 1;
//     }
//     return 0;
// }

// function getComparator(order: "asc" | "desc", orderBy: string) {
//     return order === 'desc'
//         ? (a: object, b: object) => descendingComparator(a, b, orderBy)
//         : (a: object, b: object) => -descendingComparator(a, b, orderBy);
// }

interface EnhancedTableProps {
    entityName: string;
    rows: Array<object>;
    setCreateDialogState?: (state: boolean) => void;
    setUpdateDialogState?: (state: boolean) => void;
    setDeleteDialogState?: (state: boolean) => void;
    setSelectedTarget: (target: object) => void;
    format: (value: unknown, dataLabel: string) => unknown;
    excludeColumns?: Array<string>;
    compactViewEnabled: boolean;
    rowsPerPageOptions?: Array<number>;
    title: string;
}

// Rows are sorted by the first column in descending order.
// The first value of the rows MUST be a unique identifier, or else functionality will break.
export default function EnhancedTable(props: EnhancedTableProps) {
    const {
        entityName,
        rows,
        setCreateDialogState,
        setUpdateDialogState,
        setDeleteDialogState,
        setSelectedTarget,
        format,
        excludeColumns,
        compactViewEnabled,
        rowsPerPageOptions,
        title
    } = props;

    const [order, setOrder] = React.useState<'asc' | 'desc'>('asc');
    const [page, setPage] = React.useState<number>(0);
    const [dense, setDense] = React.useState<boolean>(!compactViewEnabled);
    const [rowsPerPage, setRowsPerPage] = React.useState<number>(rowsPerPageOptions?.[0] || 5);
    const [orderBy, setOrderBy] = React.useState<string>('');

    //const dataLabels = Object.keys(rows[0] || {});
    const dataLabels = Object.keys(rows[0] || {}).filter((label) => !excludeColumns?.includes(label));

    function getDefaultTitle(entityName?: string) {
        return entityName
            ? (toSentenceCase(entityName) + (entityName.charAt(entityName.length - 1) === 's' ? 'es' : 's'))
            : 'Entities';
    }


    function handleRequestSort(_: unknown, property: string) {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    }

    function handleChangePage (_: unknown, newPage: number) {
        setPage(newPage);
    }

    function handleChangeRowsPerPage(event: React.ChangeEvent<HTMLInputElement>) {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }

    function handleChangeDense(event: React.ChangeEvent<HTMLInputElement>) {
        setDense(event.target.checked);
    }

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows?.length) : 0;

    function handleCreate() {
        setCreateDialogState?.(true);
    }

    function handleEdit(row: object) {
        setSelectedTarget(row);
        setUpdateDialogState?.(true);
    }

    function handleDelete(row: object) {
        setSelectedTarget(row);
        setDeleteDialogState?.(true);
    }


    function defaultFormat(value: unknown): string {
        switch(typeof value) {
            case null:
            case 'undefined':
                return 'N/A';
            case 'boolean':
                return value ? 'Yes' : 'No';
            case 'object':
                if (Array.isArray(value)) {
                    return value.join(', ');
                }
                return JSON.stringify(value);
            default:
                return value as string;
        }
    }

    return (
        <Box sx={{
            py: 1, px: 2,
            border: 2, borderRadius: 5,
            borderColor: 'primary.main',
            backgroundColor: 'background.paper',
            color: 'text.primary',  
            boxShadow: 4,
            width: 'auto'
        }}>
            <EnhancedTableToolbar
                title={title || getDefaultTitle(entityName)}
                onClickAddNew={setCreateDialogState && handleCreate}
            />
            <TableContainer>
                <Table
                    sx={{minWidth: 750}}
                    aria-labelledby="tableTitle"
                    size={dense ? 'small' : 'medium'}
                >
                    <EnhancedTableHead
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                        dataLabels={dataLabels}
                        actionColumnVisibility={!!(setUpdateDialogState && setDeleteDialogState)}
                    />
                    <TableBody>
                        {Array.isArray(rows) && rows
                            // .sort(getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                // @ts-ignore
                                const rowEnum = dataLabels.map((k) => row[k]);

                                return (
                                    <TableRow
                                        hover
                                        // key={rowEnum[0]}
                                    >
                                        {rowEnum.map((value, index) =>
                                            (<TableCell align="left" key={`${rowEnum[0]}-${index}`}>
                                                {format ? format(value, dataLabels[index]) as unknown as string : defaultFormat(value) as unknown as string}
                                            </TableCell>))}
                                        <TableCell align="right" key={`actions-${rowEnum[0]}`}>
                                            {setUpdateDialogState &&
                                                <IconButton onClick={() => handleEdit(row)} key={`button-edit-${rowEnum[0]}`}>
                                                    <EditOutlinedIcon sx={{'&:hover': {color: 'mediumseagreen',}}} key={`icon-edit-${rowEnum[0]}`}/>
                                                </IconButton>
                                            }
                                            {setDeleteDialogState &&
                                                <IconButton onClick={() => handleDelete(row)} key={`button-delete-${rowEnum[0]}`}>
                                                    <DeleteIcon sx={{'&:hover': {color: 'red',}}} key={`icon-delete-${rowEnum[0]}`}/>
                                                </IconButton>
                                            }
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        {emptyRows > 0 && (
                            <TableRow style={{height: (dense ? 33 : 53) * emptyRows}}>
                                <TableCell colSpan={6}/>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box sx={{
                display: 'flex',
                border: 1,
                borderRadius: 2,
                boxShadow: 2,
                mb: 1,
                mt: 1
            }}>
                <FormControlLabel
                    sx={{flex: 1, ml: 2,}}
                    control={<Switch checked={dense} onChange={handleChangeDense}/>}
                    label="Compact view"
                />
                <TablePagination
                    rowsPerPageOptions={rowsPerPageOptions || [5, 10, 25]}
                    component="div"
                    count={rows?.length || 0}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Box>
        </Box>
    );
}