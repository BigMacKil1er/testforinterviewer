import { Skeleton, TableCell, TableRow } from "@mui/material";
import { theme } from "../../../app/styles/theme";

export const SkeletonItem = () => {
    return (
        <TableRow>
            <TableCell><Skeleton sx={{display: 'flex', maxWidth: '100%', backgroundColor: theme.palette.primary.contrastText}} variant="rounded"  height={20} /></TableCell>
            <TableCell><Skeleton sx={{display: 'flex', maxWidth: '100%', backgroundColor: theme.palette.primary.contrastText}} variant="rounded"  height={20} /></TableCell>
            <TableCell><Skeleton sx={{display: 'flex', maxWidth: '100%', backgroundColor: theme.palette.primary.contrastText}} variant="rounded"  height={20} /></TableCell>
            <TableCell><Skeleton sx={{display: 'flex', maxWidth: '100%', backgroundColor: theme.palette.primary.contrastText}} variant="rounded"  height={20} /></TableCell>
        </TableRow>
    );
};