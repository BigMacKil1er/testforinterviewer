import { Table, TableBody, TableCell,TableHead, TableRow } from "@mui/material";
import { SkeletonItem, TableItem } from "../../../features/ui";
import { Item } from "../../../shared/ui/Item";
import { itemObj } from "../../../app/types";
import { theme } from "../../../app/styles/theme";

interface ITableProps {
    limitedItems: itemObj[]
    dontHaveData: boolean
}

export const TableProducts:React.FC<ITableProps> = ({ dontHaveData, limitedItems}) => {
    const colorText = {color: theme.palette.primary.contrastText }
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell sx={colorText}>ID</TableCell>
                    <TableCell sx={colorText} align="right">Name</TableCell>
                    <TableCell sx={colorText} align="right">Price</TableCell>
                    <TableCell sx={colorText} align="right">Brand</TableCell>
                </TableRow>
            </TableHead>

            <TableBody>
                {dontHaveData && 
                <TableRow>
                    <TableCell>
                            <Item sx={{color: 'black'}}>No results, repeat the request</Item>
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