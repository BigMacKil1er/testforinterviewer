import { TableCell, TableRow } from "@mui/material";
import { itemObj } from "../../../app/types";

interface ITableItemProps {
    item: itemObj
}

export const TableItem:React.FC<ITableItemProps> = ({item}) => {
    return (
    <TableRow key={item.id}>
        <TableCell>{item.id}</TableCell>
        <TableCell align="right">{item.product}</TableCell>
        <TableCell align="right">{item.price}</TableCell>
        <TableCell align="right">{item.brand ? item.brand: 'Нет данных'}</TableCell>
    </TableRow>
    );
};