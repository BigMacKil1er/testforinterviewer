import { Stack, Table, TableBody, TableCell,TableHead, TableRow } from "@mui/material";
import { SkeletonItem, TableItem } from "../../../features/ui";
import { Item } from "../../../shared/ui/Item";
import { itemObj } from "../../../app/types";

interface ITableProps {
    limitedItems: itemObj[]
    dontHaveData: boolean
}

export const TableProducts:React.FC<ITableProps> = ({ dontHaveData, limitedItems}) => {

    return (
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell align="right">Name</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Brand</TableCell>
                </TableRow>
            </TableHead>

            <TableBody>
                {dontHaveData && 
                <TableRow>
                    <TableCell>
                        <Stack>
                            <Item>No results, repeat the request</Item>
                        </Stack>
                    </TableCell>
                </TableRow>}
        
                {limitedItems.length === 0 && !dontHaveData &&
                <>
                    <SkeletonItem />
                    <SkeletonItem />
                    <SkeletonItem />
                </>}
                
                {limitedItems?.map(item => 
                <TableItem item={item} key={item.id}/>)}
            </TableBody>
        </Table>
    );
};