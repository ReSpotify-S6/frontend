import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import {toSentenceCase} from "./StringExtensions";
import Box from "@mui/material/Box";
import {visuallyHidden} from "@mui/utils";
import PropTypes from "prop-types";

interface EnhancedTableHeadProps {
    onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
    order: 'asc' | 'desc';
    orderBy: string;
    dataLabels: Array<string>;
    actionColumnVisibility: boolean;
}

export default function EnhancedTableHead(props: EnhancedTableHeadProps) {
    const {
        order,
        orderBy,
        onRequestSort,
        dataLabels,
        actionColumnVisibility
    } = props;

    function createSortHandler(property: string) {
        return (event: React.MouseEvent<unknown>) => onRequestSort(event, property);
    }

    return (
        <TableHead>
            <TableRow>
                {dataLabels.map((label) => (
                    <TableCell
                        key={label}
                        align='left'
                        padding='normal'
                        sortDirection={orderBy === label ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === label}
                            direction={orderBy === label ? order : 'asc'}
                            onClick={createSortHandler(label)}
                        >
                            {toSentenceCase(label)}
                            {orderBy === label ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
                {actionColumnVisibility &&
                    <TableCell align='right' padding='normal'>Actions</TableCell>
                }
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    dataLabels: PropTypes.array.isRequired,
};
