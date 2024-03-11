import { Skeleton, TableCell, TableRow } from "@mui/material";

export const SkeletonItem = () => {
    return (
        <TableRow>
            <TableCell><Skeleton sx={{display: 'flex', maxWidth: '100%'}} variant="rounded"  height={20} /></TableCell>
            <TableCell><Skeleton sx={{display: 'flex', maxWidth: '100%'}} variant="rounded"  height={20} /></TableCell>
            <TableCell><Skeleton sx={{display: 'flex', maxWidth: '100%'}} variant="rounded"  height={20} /></TableCell>
            <TableCell><Skeleton sx={{display: 'flex', maxWidth: '100%'}} variant="rounded"  height={20} /></TableCell>
        </TableRow>
    );
};